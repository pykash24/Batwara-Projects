from django.shortcuts import render

from django.http import JsonResponse
import random
from twilio.rest import Client

# Function to generate a random OTP
# def generate_otp():
#     return str(random.randint(1000, 9999))

# # Function to send the OTP via SMS
# def send_otp_via_sms(otp, to_number):
#     try:
#         # Your Account SID and Auth Token from twilio.com/console
#         account_sid = 'AC713f0910e5644de5d33deb336a21d8e8'
#         auth_token = '1f2a443035e3b8084abb315cce60ac5f'
#         client = Client(account_sid, auth_token)

#         message = client.messages.create(
#             to=to_number,
#             from_='+14698296521',
#             body='Your OTP is: ' + otp
#         )
#         print(message.sid)
#     except Exception as error:
#         print(error)
#         return JsonResponse({'status': 'fail'},safe=False)
# #h-3RNImuTqfVTSawZoHrV-0dUO0W45EgPZg_kiDV
# # View to generate and send the OTP
# def send_otp(request):
#     try:
#         # Generate the OTP
#         otp = generate_otp()

#         # Send the OTP to the specified contact number
#         send_otp_via_sms(otp, '+918860509917')

#         # Return a success response
#         return JsonResponse({'status': 'success', 'otp': otp})
#     except Exception as error:
#         print(error)
#         return JsonResponse({'status': 'fail'},safe=False)


# View to generate and send the OTP
def send_otp(request):
    try:
        # Generate the OTP
        otp = generate_otp()

        # Send the OTP to the specified contact number
        send_otp_via_sms(otp, '+918860509917')

        # Return a success response
        return JsonResponse({'status': 'success', 'otp': otp})
    except Exception as error:
        print(error)
        return JsonResponse({'status': 'fail'},safe=False)
