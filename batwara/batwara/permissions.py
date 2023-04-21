
from configuration import config
from configuration import message,constants
from django.shortcuts import redirect
from django.http import JsonResponse
import json
import jwt

# Description: This function check user is authentacated before accessing system
class UserAccessPermission:

    def __init__(self,get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_view(self, request,view_func, view_args, view_kargs):
        try:
            print(request.path)
            # if (request.path == '/authentication/user_register/' or request.path =='/authentication/send-otp/' or request.path =='/authentication/opt_authentication/'):
            #     return None

            # authorization_header = request.headers.get('Authorization')
            # if authorization_header:
            #     print("authorization exist")

            # # Split the Authorization header value to get the token
            #     auth_parts = authorization_header.split()
            #     if len(auth_parts) == 2 and auth_parts[0].lower() == constants.TOKEN_TYPE:
            #         token = auth_parts[1]
            #         try:
            #             print("token exist")
                        
            #             # Decode the token using a secret key
            #             decode_token=jwt.decode(token, constants.SECRET_KEY, verify_exp=True, algorithms=['HS256'])
            #             return None
            #         except jwt.exceptions.InvalidTokenError:
            #             return JsonResponse({'status': 'fail','message':'Unauthorized'},safe=False,status=constants.HTTP_401_UNAUTHORIZED)
            #     return JsonResponse({'status': 'fail','message':'Unauthorized'},safe=False,status=constants.HTTP_401_UNAUTHORIZED)
            
            # return JsonResponse({'status': 'fail','message':'Bearer token required'},safe=False,status=constants.HTTP_401_UNAUTHORIZED)
            return None
        except Exception as error:
            print(error)
            return JsonResponse({'data':'error','message':'Unauthorized'},safe=False,status=constants.HTTP_401_UNAUTHORIZED)
      