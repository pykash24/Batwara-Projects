from django.http import JsonResponse
from configuration import message,constants,config
import requests
import json
from authentication.models import *

# METHOD: return_object_func
# DESCRIPTION: This is common function for return success/fail json response -  
# AUTHOR: Vikas Tomar
# Date: 04/02/2023
def return_object_func(status_code,response_message,param_dict={}):
    data = {}
    if param_dict:
        for key in param_dict:
            data[key] = param_dict[key]
    return_object = {
        constants.STATUS_CODE: str(status_code),
        constants.MESSAGE: response_message,
        constants.DATA: data
    }
    return return_object

# METHOD: print_error
# DESCRIPTION: 
# AUTHOR: Vikas Tomar
# Date: 04/02/2023
def print_error(func_name,error=''):
    print(str(func_name) + " : " + str(error))


def get_group_creator(group_created_by):
    try:
        user_id = group_created_by
        user_record = UsersID.objects.filter(user_id=user_id).first()
        if user_record:
            return user_record.full_name
        return constants.EMPTY
    except Exception as error:
        print_error("get_group_creator",error)
        return constants.EMPTY

def get_group_member_count(group_id):
    try:
        group_id = group_id
        record_count = UserGroup.objects.filter(group_id=group_id).count()
        return record_count
    except Exception as error:
        print_error("get_group_creator",error)
        return constants.ZERO_COUNT