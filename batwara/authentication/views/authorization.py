from django.shortcuts import render
import uuid 
from django.http import JsonResponse
import random,json
from twilio.rest import Client
from ..models import *
from django.views.decorators.csrf import csrf_exempt
from configuration import constants
import jwt,time
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
from django.db.models import Q
import threading
import pyotp
import secrets


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

# View to generate and send the OTP
@csrf_exempt
def user_register(request):
    try:
        user_request = json.loads(request.body)
        if not ('user_phone' in user_request or 'full_name' in user_request or 'nation' in user_request):
            return JsonResponse({'data':'request body error'},safe=False,status=constants.HTTP_400_BAD_REQUEST)
        
        user_phone,nation,full_name= user_request['user_phone'],user_request['nation'],user_request['full_name']
        is_user_present = Users.objects.filter(user_phone=user_phone)
        if bool(is_user_present):
            return JsonResponse({'data':'Already present'},safe=False,status=constants.HTTP_400_BAD_REQUEST)
        
        # # convert into hash password values
        # sha256_hash_pasword = hashlib.sha256(user_password.encode()).hexdigest()
        user_id = str(uuid.uuid4())
        save_user_register = Users(
            user_id = str(user_id),
            user_phone = user_phone,
            full_name = full_name,
            nation=nation,
            is_deleted = False

        )
        save_user_register.save()

        #calling mail invaition function parallel
        thread1 = threading.Thread(target=new_member_mail_inviation, args=(request,))

        # Start threads
        thread1.start()
        data = {"user_id":user_id}
        return JsonResponse({constants.STATUS: 'success',"data":data},safe=False,status=constants.HTTP_200_OK)
    except Exception as error:
        print(error)
        return JsonResponse({constants.STATUS: 'error'},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

""" User OTP authentication """ 
@csrf_exempt
def sign_in_otp_verification(request):
    try:
        user_request = json.loads(request.body)
        if not ('user_phone' in user_request or 'user_otp' in user_request or 'otp_unique_id' in user_request):
            return JsonResponse({'data':'request body error'},safe=False,status=constants.HTTP_400_BAD_REQUEST)

        user_phone = user_request['user_phone']
        otp_unique_id = user_request['otp_unique_id']
        user_otp = user_request['user_otp']

        #To check the otp has been generated for respectivity phone or not.
        is_otp_generated = TempOtp.objects.filter(otp_unique_id=otp_unique_id).first()
        if not is_otp_generated:
            return JsonResponse({constants.STATUS: 'error',constants.MESSAGE:"please re-sent otp"},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

        user_id = is_otp_generated.user_id
        is_valid = validate_totp(user_id, user_otp)

        #To check the generated otp is same as user pass otp
        if not is_valid:
            return JsonResponse({constants.STATUS: 'error','data': 'Invalid OTP'},safe=False,status=constants.HTTP_400_BAD_REQUEST)
        
        # save_user_details = user_register(request)
        # print(save_user_details)
        user_token = generate_token(request)
        if not user_token:
            return JsonResponse({constants.STATUS: 'error','data': 'Invalid OTP'},safe=False,status=constants.HTTP_400_BAD_REQUEST)

        delete_otp_generated = TempOtp.objects.filter(otp_unique_id=otp_unique_id).delete()
        return JsonResponse({constants.STATUS: "success",'token':user_token},safe=False,status=constants.HTTP_200_OK)
    except Exception as error:
        print(error)
        return JsonResponse({constants.STATUS: 'error'},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)


""" """ 
@csrf_exempt
def sign_up_otp_verification(request):
    try:
        user_request = json.loads(request.body)
        if not ('user_phone' in user_request or 'user_otp' in user_request or 'otp_unique_id' in user_request or 'full_name' in request or 'nation' in user_request):
            return JsonResponse({'data':'request body error'},safe=False,status=constants.HTTP_400_BAD_REQUEST)

        user_phone = user_request['user_phone']
        otp_unique_id = user_request['otp_unique_id']
        user_otp = user_request['user_otp']
        full_name = user_request['full_name']

        #To check the otp has been generated for respectivity phone or not.
        is_otp_generated = TempOtp.objects.filter(otp_unique_id=otp_unique_id).first()
        if not is_otp_generated:
            return JsonResponse({constants.STATUS: 'error',constants.MESSAGE:"please re-sent otp"},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

        user_id = is_otp_generated.user_id
        is_valid = validate_totp(user_id, user_otp)

        #To check the generated otp is same as user pass otp
        if not is_valid:
            return JsonResponse({constants.STATUS: 'error','data': 'Invalid OTP'},safe=False,status=constants.HTTP_400_BAD_REQUEST)
        
        save_user_details = user_register(request)
        print(save_user_details)
        user_token = generate_token(request)
        if not user_token:
            return JsonResponse({constants.STATUS: 'error','data': 'Invalid OTP'},safe=False,status=constants.HTTP_400_BAD_REQUEST)

        delete_otp_generated = TempOtp.objects.filter(otp_unique_id=otp_unique_id).delete()
        return JsonResponse({constants.STATUS: "success",'token':user_token},safe=False,status=constants.HTTP_200_OK)
    except Exception as error:
        print(error)
        return JsonResponse({constants.STATUS: 'error'},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)


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

# Generate a TOTP
def generate_totp(secret_key):
    totp = pyotp.TOTP(secret_key, interval=60, digits=6)
    # Get the current TOTP code
    otp = totp.now()
    # Get the expiry time of the current TOTP code
    otp_expiry_time = totp.interval - (int(time.time()) % totp.interval)
    # Return the TOTP code and expiry time
    return otp,otp_expiry_time


"""
    METHOD: sign_in_send_otp
    DESCRIPTION: 
    AUTHOR: Vikas Tomar
    Date: 16/04/2023
"""
@csrf_exempt
def sign_in_send_otp(request):
    try:
        user_request = json.loads(request.body)
        if not ('user_phone' in user_request):
            return JsonResponse({'data':'request body error'},safe=False,status=constants.HTTP_400_BAD_REQUEST)
        user_phone= user_request['user_phone']

        # To check the phone is register or not
        is_user_present = Users.objects.filter(user_phone=user_phone).first()

        if not is_user_present:
            return JsonResponse({constants.STATUS:"error",constants.MESSAGE: message.ACCOUNT_DOES_NOT_EXIST_DO_SIGN_UP},safe=False,status=constants.HTTP_400_BAD_REQUEST)

        user_id = str(is_user_present.user_id)
        nation = str(is_user_present.nation)

        # Generate a TOTP and send it to the user
        secret_key,otp_unique_id = generate_secret_key(user_id)
        otp,otp_expiry_time= generate_totp(secret_key)

        user_phone_with_country_prefix = nation + user_phone

        # Send the OTP to the specified contact number
        send_otp_via_sms(otp, user_phone_with_country_prefix)
        return JsonResponse({'status': 'success','otp_unique_id':otp_unique_id},safe=False,status=constants.HTTP_200_OK)
    except Exception as error:
        print(error)
        return JsonResponse({'status': 'fail'},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)



"""
    METHOD: sign_up_send_otp
    DESCRIPTION: 
    AUTHOR: Vikas Tomar
    Date: 16/04/2023
"""
@csrf_exempt
def sign_up_send_otp(request):
    try:
        user_request = json.loads(request.body)
        if not ('user_phone' in user_request or 'nation' in user_request,):
            return JsonResponse({'data':'request body error'},safe=False,status=constants.HTTP_400_BAD_REQUEST)
        user_phone,nation= user_request['user_phone'],user_request['nation']

        # To check the phone is register or not
        is_user_present = Users.objects.filter(user_phone=user_phone).first()

        if is_user_present:
            return JsonResponse({constants.STATUS:"error",constants.MESSAGE: message.ACCOUNT_ALREADY_EXIST_DO_SIGN_IN},safe=False,status=constants.HTTP_400_BAD_REQUEST)
        
        user_id = str(uuid.uuid4())

        # Generate a TOTP and send it to the user
        secret_key,otp_unique_id = generate_secret_key(user_id)
        otp,otp_expiry_time= generate_totp(secret_key)

        user_phone_with_country_prefix = nation + user_phone

        # Send the OTP to the specified contact number
        send_otp_via_sms(otp, user_phone_with_country_prefix)
        return JsonResponse({'status': 'success','otp_unique_id':otp_unique_id},safe=False,status=constants.HTTP_200_OK)
    except Exception as error:
        print(error)
        return JsonResponse({'status': 'fail'},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)



"""
    METHOD: generate_secret_key
    DESCRIPTION: 
    AUTHOR: Vikas Tomar
    Date: 16/04/2023
"""
def generate_secret_key(user_id):

    #Generate a random 32-character string
    secret_key = pyotp.random_base32()

    #To save the otp in local database
    user_id = user_id
    
    # Save the secret key to the database for the user
    is_user_secret_key_exist = TempOtp.objects.filter(user_id=user_id).first()
    if is_user_secret_key_exist:
        otp_unique_id=str(is_user_secret_key_exist.otp_unique_id)
        is_user_secret_key_exist.secret_key = secret_key
        is_user_secret_key_exist.save()
    else:
        otp_unique_id = str(uuid.uuid4())
        temp_save_opt = TempOtp(
            otp_unique_id = otp_unique_id,
            user_id = str(user_id),
            secret_key=secret_key
        )
        temp_save_opt.save()
    return secret_key,otp_unique_id

# Function to validate a TOTP code for a given user
def validate_totp(user_id, otp):
    # Save the secret key to the database for the user
    is_user_secret_key_exist = TempOtp.objects.filter(user_id=user_id).first()
    if is_user_secret_key_exist:
        # Get the user's secret key
        secret_key =is_user_secret_key_exist.secret_key
        # Create a TOTP object with a 60 second interval and 6 digits
        totp = pyotp.TOTP(secret_key, interval=60, digits=6)
        # Get the current time
        current_time = int(time.time())
        # Check if the code is valid within a 3-minute window (1 minute before and 1 minute after the current time)
        for offset in [-1, 0, 1]:
            if totp.at(current_time + offset*60) == otp:
                return True
    return False

