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
        user_phone = '+91' + user_phone

        # To check the phone is register or not
        is_user_present = Users.objects.filter(user_phone=user_phone).first()

        if not is_user_present:
            return JsonResponse({'status': 'No Account Found, Please SignUp!'},safe=False)

        # Generate the OTP
        otp = generate_otp()

        # Send the OTP to the specified contact number
        send_otp_via_sms(otp, user_phone)
        print(opt)

        user_id = is_user_present.user_id
        temp_save_opt = TempOtp(
            otp_id = user_id,
            user_phone = user_phone,
            user_opt = opt
        )
        temp_save_opt.save()

        # Return a success response
        return JsonResponse({'status': 'success'},safe=False)
    except Exception as error:
        print(error)
        return JsonResponse({'status': 'fail'},safe=False)

@csrf_exempt
# View to generate and send the OTP
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


@csrf_exempt
def opt_authentication(request):
    try:
        user_request = json.loads(request.body)
        if not ('user_phone' in user_request or 'user_otp' in user_request):
            return JsonResponse({'data':'request body error'},safe=False)

        is_opt_generated = TempOtp.object.filter(user_phone=user_phone).first()
        if not is_opt_generated:
            return JsonResponse({'data': 'Please login re-again'},safe=False)

        sent_user_opt = is_opt_generated.user_opt

        if not sent_user_opt == user_request['user_phone']:
            return JsonResponse({'data': 'Invalid OTP'},safe=False)
        return JsonResponse({'data': 'success','token':'temp_token'},safe=False)
    except Exception as error:
        print(error)
        return JsonResponse({'data': 'error'},safe=False)

