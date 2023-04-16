from django.shortcuts import render
import uuid 
from django.http import JsonResponse
import random,json
from twilio.rest import Client
from ..models import *
from django.views.decorators.csrf import csrf_exempt
from configuration import constants
import jwt
import datetime
from datetime import timedelta
import hashlib
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from configuration import message
from django.template import Context, Template
from io import BytesIO, StringIO
from xhtml2pdf import pisa
from django.core.mail import send_mail
from configuration import templates
# Function to generate a random OTP
def generate_otp():
    return str(random.randint(1000, 9999))

# Function to send the OTP via SMS
def send_otp_via_sms(otp, to_number):
    try:
        # Your Account SID and Auth Token from twilio.com/console
        account_sid = 'AC713f0910e5644de5d33deb336a21d8e8'
        auth_token = '1f2a443035e3b8084abb315cce60ac5f'
        client = Client(account_sid, auth_token)

        message = client.messages.create(
            to=to_number,
            from_='+14698296521',
            body='Your OTP is: ' + otp
        )
        print(message.sid)
    except Exception as error:
        print(error)
        return JsonResponse({'status': 'fail'},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

#h-3RNImuTqfVTSawZoHrV-0dUO0W45EgPZg_kiDV
# View to generate and send the OTP
@csrf_exempt
def send_otp(request):
    try:
        print("running")
        user_request = json.loads(request.body)
        if not ('user_phone' in user_request):
            return JsonResponse({'data':'request body error'},safe=False,status=constants.HTTP_400_BAD_REQUEST)
        user_phone = user_request['user_phone']

        # To check the phone is register or not
        is_user_present = Users.objects.filter(user_phone=user_phone).first()

        if not is_user_present:
            return JsonResponse({'status': 'No Account Found, Please SignUp!'},safe=False,status=constants.HTTP_204_NO_CONTENT)

        # Generate the OTP
        otp = generate_otp()
        user_phone_with_country_prefix = '+91' + user_phone

        # Send the OTP to the specified contact number
        send_otp_via_sms(otp, user_phone_with_country_prefix)

        #To save the otp in local database
        user_id = is_user_present.user_id
        otp_id = uuid.uuid4()
        temp_save_opt = TempOtp(
            otp_id = otp_id,
            user_id = str(user_id),
            user_phone = user_phone,
            user_otp = otp
        )
        temp_save_opt.save()

        # Return a success response
        return JsonResponse({'status': 'success','otp_id':otp_id},safe=False,status=constants.HTTP_200_OK)
    except Exception as error:
        print(error)
        return JsonResponse({'status': 'fail'},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

# View to generate and send the OTP
@csrf_exempt
def user_register(request):
    try:
        user_request = json.loads(request.body)
        if not ('user_phone' in user_request or 'user_password' in user_request or 'first_name' in user_request or 'last_name' in user_request or 'user_mail' in user_request):
            return JsonResponse({'data':'request body error'},safe=False,status=constants.HTTP_400_BAD_REQUEST)
        user_phone = user_request['user_phone']
        user_password = user_request['user_password']
        print(user_phone)
        is_user_present = Users.objects.filter(user_phone=user_phone)
        print(is_user_present)
        if bool(is_user_present):
            return JsonResponse({'data':'Already present'},safe=False)
        
        # convert into hash password values
        sha256_hash_pasword = hashlib.sha256(user_password.encode()).hexdigest()

        save_user_register = Users(
            user_id = uuid.uuid4(),
            user_phone = user_request['user_phone'],
            user_password = sha256_hash_pasword,
            first_name = user_request['first_name'],
            last_name = user_request['last_name'],
            user_mail = user_request['user_mail'],
        )
        save_user_register.save()
        mail_inviation = new_member_mail_inviation(request)
        print(mail_inviation)
        # Return a success response
        return JsonResponse({'data': 'success'},safe=False,status=constants.HTTP_200_OK)
    except Exception as error:
        print(error)
        return JsonResponse({'data': 'error'},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

# User OTP authentication
@csrf_exempt
def opt_authentication(request):
    try:
        print("working")
        user_request = json.loads(request.body)
        if not ('user_phone' in user_request or 'user_otp' in user_request or 'otp_id' in user_request):
            return JsonResponse({'data':'request body error'},safe=False,status=constants.HTTP_400_BAD_REQUEST)

        user_phone = user_request['user_phone']
        otp_id = user_request['otp_id']

        #To check the otp has been generated for respectivity phone or not.
        is_otp_generated = TempOtp.objects.filter(user_phone=user_phone,otp_id=otp_id).first()
        if not is_otp_generated:
            return JsonResponse({'data': 'Please login re-again'},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

        sent_user_otp = is_otp_generated.user_otp

        #To check the generated otp is same as user pass otp
        if not sent_user_otp == user_request['user_otp']:
            return JsonResponse({'data': 'Invalid OTP'},safe=False)
        
        user_token = generate_token(request)
        if not user_token:
            return JsonResponse({'data': 'Invalid OTP'},safe=False)

        delete_otp_generated = TempOtp.objects.filter(user_phone=user_phone,otp_id=otp_id).delete()
        print("working")
        return JsonResponse({'data': 'success','token':user_token},safe=False,status=constants.HTTP_200_OK)
    except Exception as error:
        print(error)
        return JsonResponse({'data': 'error'},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)


# User OTP authentication
@csrf_exempt
def user_authenticaton(request):
    try:
        user_request = json.loads(request.body)
        if not ('user_mail' in user_request or 'user_password' in user_request):
            return JsonResponse({'data':'request body error'},safe=False,status=constants.HTTP_400_BAD_REQUEST)
        
        user_password,user_mail= user_request['user_password'],user_request['user_mail']

        """ convert into hash password values """
        sha256_hash_pasword = hashlib.sha256(user_password.encode()).hexdigest()

        """ To check is user is valid or not"""
        is_user_valid =Users.objects.filter(user_password=sha256_hash_pasword,user_mail=user_mail).first()
        if not is_user_valid:
            return JsonResponse({constants.STATUS:"error",constants.MESSAGE:"Invalid Creditinals"},safe=False,status=constants.HTTP_401_UNAUTHORIZED)
        
        user_token = generate_token(request)
        return JsonResponse({'data': 'success','token':user_token},safe=False,status=constants.HTTP_200_OK)
    except Exception as error:
        print(error)
        return JsonResponse({'data': 'error'},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

# User token generate...
def generate_token(request):
    try:
        expiry_time = datetime.datetime.now()+timedelta(minutes=constants.TOKEN_EXPIRY)
        encoded_jwt = jwt.encode({"app_id": constants.APP_ID, "exp": expiry_time}, constants.SECRET_KEY, algorithm="HS256")
        return encoded_jwt
        # return JsonResponse({'data': 'success','token':encoded_jwt},safe=False,status=constants.HTTP_200_OK)
    except Exception as error:
        print(error)
        return False

# @csrf_exempt
# def token_decode(request):
#     try:
#         user_request = json.loads(request.body)
#         if user_request:
#             token = user_request['token']
#             secret = user_request['phone']
#         decode_token=jwt.decode(token, secret, verify_exp=True, algorithms=['HS256'])
#         return JsonResponse({'data': 'success','token':decode_token},safe=False,status=constants.HTTP_200_OK)
#     except Exception as error:
        # print(error)
        # return JsonResponse({'data': 'error'},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
def mail_sent(request):
    try:
        if type(request) is dict:
            user_request = request
        else:
            user_request = json.loads(request.body)

        #Mail sending details
        sender_email = constants.MAIL_SENDER 
        # receiver_email = sankey_email #commnent for testing perspective
        receiver_email = "vikastomar2409@outlook.com"

        #Changes the subject the user request of payslip.
        mail_subject = "Testing" 

        #Changes the mail body according the user requirments
        mail_body ="Body"
       
        #mail sending after render html to pdf
        msg = EmailMultiAlternatives(mail_subject, mail_body, sender_email, [receiver_email])
        # pdf = render_to_pdf(html_text)
        # msg.attach(attached_file_name, pdf)
        msg.send()
        pass
    except Exception as error:
        print(error)
        return JsonResponse({"status_code": str(constants.HTTP_500_INTERNAL_SERVER_ERROR),'data': 'error'},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)


"""
    METHOD: render_to_pdf
    DESCRIPTION: To convert the html template to pdf format values.
    AUTHOR: Vikas Tomar
    Date: 06/04/2023
"""
@csrf_exempt
def render_to_pdf(employee_template: str):
    try:
        context_dict = {}
        template = Template(employee_template)
        context = Context(context_dict)
        html = template.render(context)
        result = BytesIO()
        pdf = pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")), result)
        if not pdf.err:
            return result.getvalue()
        return None
    except Exception as error:
        print(error)
        return JsonResponse({"status_code": "500", "message": "Internal server error"}, safe=False)
    

@csrf_exempt
def new_member_mail_inviation(request):
    try:
        user_request = json.loads(request.body)
        if not ('user_phone' in user_request or 'user_password' in user_request or 'first_name' in user_request or 'last_name' in user_request or 'user_mail' in user_request):
            return JsonResponse({'data':'request body error'},safe=False,status=constants.HTTP_400_BAD_REQUEST) 
        user_mail = user_request['user_mail']

        subject = templates.NEW_MEMBER_MAIL_INVIATION_SUBJECT
        message = templates.NEW_MEMBER_MAIL_INVIATION_BODY
        message = message.replace('first_name',user_request['first_name'])
        from_email = constants.MAIL_SENDER
        recipient_list = [user_mail]
        send_mail(subject, message, from_email, recipient_list)
        return JsonResponse({'data': 'success'},safe=False,status=constants.HTTP_200_OK)
    except Exception as error:
        print(error)
        return JsonResponse({"status_code": "500", "message": "Internal server error"}, safe=False)
    


