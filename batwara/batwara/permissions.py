
from configuration import config
from configuration import message,constants
from django.shortcuts import redirect
from django.http import JsonResponse
import json

# Description: This function check user is authentacated before accessing system
class UserAccessPermission:
    def __init__(self,get_response):
        self.get_response = get_response
    def __call__(self, request):
        response = self.get_response(request)
        return response
    def process_view(self, request,view_func, view_args, view_kargs):
        try:
            print(request)
            print("request path",request.path)
            user_request = json.loads(request.body)
            print(user_request)
            if True:
                print("working")
                return None
        except Exception as error:
            print(error)
            return JsonResponse({'data':'error'})
      