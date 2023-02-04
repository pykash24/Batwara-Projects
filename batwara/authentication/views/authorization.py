from django.shortcuts import render
import uuid 
from django.http import JsonResponse
import random,json
from twilio.rest import Client
from ..models import *
from django.views.decorators.csrf import csrf_exempt

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
        return JsonResponse({'status': 'fail'},safe=False)

#h-3RNImuTqfVTSawZoHrV-0dUO0W45EgPZg_kiDV
# View to generate and send the OTP
@csrf_exempt
def send_otp(request):
    try:
        user_request = json.loads(request.body)
        user_phone = user_request['user_phone']
        print(user_phone)

        # To check the phone is register or not
        is_user_present = Users.objects.filter(user_phone=user_phone).first()

        if not is_user_present:
            return JsonResponse({'status': 'No Account Found, Please SignUp!'},safe=False)

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
        return JsonResponse({'status': 'success','otp_id':otp_id},safe=False)
    except Exception as error:
        print(error)
        return JsonResponse({'status': 'fail'},safe=False)
# View to generate and send the OTP
@csrf_exempt
def user_register(request):
    try:
        user_request = json.loads(request.body)
        if not ('user_phone' in user_request or 'user_password' in user_request):
            return JsonResponse({'data':'request body error'},safe=False)
        user_phone = user_request['user_phone']
        user_password = user_request['user_password']
        print(user_phone)
        is_user_present = Users.objects.filter(user_phone=user_phone)
        print(is_user_present)
        if bool(is_user_present):
            return JsonResponse({'data':'Already present'},safe=False)

        save_user_register = Users(
            user_id = uuid.uuid4(),
            user_phone = user_request['user_phone'],
            user_password = user_request['user_password']
        )
        save_user_register.save()
        print("registeration successfully")
        # Return a success response
        return JsonResponse({'data': 'success'},safe=False)
    except Exception as error:
        print(error)
        return JsonResponse({'data': 'error'},safe=False)

# User OTP authentication
@csrf_exempt
def opt_authentication(request):
    try:
        user_request = json.loads(request.body)
        if not ('user_phone' in user_request or 'user_otp' in user_request or 'otp_id' in user_request):
            return JsonResponse({'data':'request body error'},safe=False)

        user_phone = user_request['user_phone']
        otp_id = user_request['otp_id']

        #To check the otp has been generated for respectivity phone or not.
        is_otp_generated = TempOtp.objects.filter(user_phone=user_phone,otp_id=otp_id).first()
        if not is_otp_generated:
            return JsonResponse({'data': 'Please login re-again'},safe=False)

        sent_user_otp = is_otp_generated.user_otp

        #To check the generated otp is same as user pass otp
        if not sent_user_otp == user_request['user_otp']:
            return JsonResponse({'data': 'Invalid OTP'},safe=False)
        delete_otp_generated = TempOtp.objects.filter(user_phone=user_phone,otp_id=otp_id).delete()
        return JsonResponse({'data': 'success','token':'temp_user_token'},safe=False)
    except Exception as error:
        print(error)
        return JsonResponse({'data': 'error'},safe=False)

