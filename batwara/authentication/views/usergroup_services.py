from django.shortcuts import render
import uuid 
from django.http import JsonResponse
import random,json
from twilio.rest import Client
from ..models import *
from django.views.decorators.csrf import csrf_exempt
from configuration import constants

# To create the group
@csrf_exempt
def create_group(request):
    try:
        user_request = json.loads(request.body)
        if not ('group_description' in user_request or 'group_name' in user_request):
            return JsonResponse({'status': 'fail'},status=constants.HTTP_400_BAD_REQUEST,safe=False)

        # To create the group..
        group_name, group_description = user_request['group_name'], user_request['group_description']
        group_id = uuid.uuid4()
        save_group = Group(
            group_id = group_id,
            group_name = group_name,
            group_description = group_description,
        )
        save_group.save()
        return JsonResponse({'status':'success','group_id':group_id},safe=False,status=constants.HTTP_201_CREATED)
        
    except Exception as error:
        print(error)
        return JsonResponse({'status': 'fail'},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)


# To create the group
@csrf_exempt
def user_group(request):
    try:
        user_request = json.loads(request.body)
        if not ('user_id' in user_request or 'group_id' in user_request):
            return JsonResponse({'status': 'fail'},status=constants.HTTP_400_BAD_REQUEST,safe=False)

        # To create the group..
        user_id, group_id = user_request['user_id'], user_request['group_id']
        user_data = Users.objects.filter(user_id=user_id).first()
        group_data = Group.objects.filter(group_id=group_id).first()
        usergroup_id = uuid.uuid4()

        #Create the foreign releation with User & Group tables.
        save_group = UserGroup(
            usergroup_id = usergroup_id,
            user_id =user_data,
            group_id = group_data
        )
        save_group.save()
        return JsonResponse({'status':'success','usergroup_id':usergroup_id},safe=False,status=constants.HTTP_201_CREATED)
        
    except Exception as error:
        print(error)
        return JsonResponse({'status': 'fail'},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

# Get the group member
@csrf_exempt
def get_group_member(request):
    try:
        user_request = json.loads(request.body)
        if not ('user_id' in user_request):
            return JsonResponse({'status': 'fail'},status=constants.HTTP_400_BAD_REQUEST,safe=False)

        user_id = user_request['user_id']
        get_group_id = list(UserGroup.objects.filter(user_id=user_id).values_list())
        print(get_group_id)
        get_group_id = list(UserGroup.objects.filter(user_id=user_id).values_list('group_id',flat=True))
        print(get_group_id)

        if not get_group_id:
            get_user_group_data = []
        
        get_user_group_data = Group.objects.filter(group_id__in=get_group_id).values()
        return JsonResponse({'status':'success','data':list(get_user_group_data)},safe=False,status=constants.HTTP_200_OK)

    except Exception as error:
        print(error)
        return JsonResponse({'status': 'fail'},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

