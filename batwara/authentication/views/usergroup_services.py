from django.shortcuts import render
import uuid 
from django.http import JsonResponse
import random,json
from twilio.rest import Client
from ..models import *
from django.views.decorators.csrf import csrf_exempt
from configuration import constants,message
from datetime import datetime

# To create the group
@csrf_exempt
def create_group(request):
    try:
        user_request = json.loads(request.body)
        if not ('group_description' in user_request or  'group_name' in user_request or 'user_id' in user_request['user_id']):
            return JsonResponse({'status': 'fail'},status=constants.HTTP_400_BAD_REQUEST,safe=False)

        # To create the group..
        group_name, group_description,user_id = user_request['group_name'], user_request['group_description'],user_request['user_id']

        #To check the group is already exist or not for group created user. - created by validation pending..
        # is_group_present = Group.objects.filter(group_name=group_name).first()
        group_id = uuid.uuid4()
        usergroup_id = uuid.uuid4()

        user_data = Users.objects.filter(user_id = user_id).first()

        # Create the group
        save_group = Group(
            group_id = group_id,
            group_name = group_name,
            group_description = group_description,
            group_created_by = user_id
        )
        
        # Add default memeber of group.
        save_subgroup = UserGroup(
            usergroup_id = usergroup_id,
            user_id =user_data,
            group_id = save_group,
            is_delete= False
        )
        save_group.save()
        save_subgroup.save()
        return JsonResponse({'status':'success','group_id':group_id,'usergroup_id':usergroup_id},safe=False,status=constants.HTTP_201_CREATED)
        
    except Exception as error:
        print(error)
        return JsonResponse({'status': 'fail'},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

# To create the group
@csrf_exempt
def add_user_in_group(request):
    try:
        user_request = json.loads(request.body)
        if not ('phone' in user_request and 'group_id' in user_request and 'usergroup_id' in user_request):
            return JsonResponse({'status': constants.FAIL,'message':message.INVALID_REQUEST_BODY_MESSAGE},status=constants.HTTP_400_BAD_REQUEST,safe=False)

        # To create the group..
        phone, group_id,usergroup_id = user_request['phone'], user_request['group_id'], user_request['usergroup_id']
        is_phone_exist = Users.objects.filter(user_phone=phone).first()
        if not is_phone_exist:
            user_id = uuid.uuid4()
            save_user_register = Users(
                user_id =user_id,
                user_phone = user_request['phone'],
                user_password = constants.EMPTY,
                first_name = user_request['first_name'],
                last_name = user_request['last_name'],
                user_mail = constants.EMPTY,
            )
            save_user_register.save()
            print("user entry not exist")
        else:
            user_id = is_phone_exist.user_id
            print("user entry already exist in tank")

        user_data = Users.objects.filter(user_id=user_id).first()
        group_data = Group.objects.filter(group_id=group_id).first()
        is_user_already_exist_group = UserGroup.objects.filter(user_id=user_id,group_id=group_id).first()
        if not (is_user_already_exist_group or user_data or user_data):
            #Create the foreign releation with User & Group tables.
            save_group = UserGroup(
                usergroup_id = usergroup_id,
                group_id = group_data,
                user_id =user_data,
                is_delete= False
            )
            save_group.save()
        else:
            print("User already exist in group")
            return JsonResponse({'status': 'fail','message':'Already exist'},status=constants.HTTP_400_BAD_REQUEST,safe=False)
        return JsonResponse({'status':'success','usergroup_id':usergroup_id},safe=False,status=constants.HTTP_201_CREATED)
        
    except Exception as error:
        print(error)
        return JsonResponse({'status': 'fail'},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

# Get the groups
@csrf_exempt
def get_user_group(request):
    try:
        user_request = json.loads(request.body)
        if not ('user_id' in user_request):
            return JsonResponse({'status': 'fail'},status=constants.HTTP_400_BAD_REQUEST,safe=False)

        user_id = user_request['user_id']
        get_group_id = list(UserGroup.objects.filter(user_id=user_id,is_delete=False).values_list('group_id',flat=True))
        print(get_group_id)

        if not get_group_id:
            get_user_group_data = []
        
        get_user_group_data = Group.objects.filter(group_id__in=get_group_id).values()
        return JsonResponse({'status':'success','data':list(get_user_group_data)},safe=False,status=constants.HTTP_200_OK)

    except Exception as error:
        
        print(error)
        return JsonResponse({'status': 'fail'},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

# Create Expenses!
@csrf_exempt
def create_expense(request):
    try:
        user_request = json.loads(request.body)
        if not user_request:
            return JsonResponse({'status': 'fail'},status=constants.HTTP_400_BAD_REQUEST,safe=False)

        description, group_id, paid_by, amount,user_ids = user_request['description'], user_request['group_id'], user_request['paid_by'], user_request['amount'], user_request['user_ids']
        expenses_id = uuid.uuid4()
        expense_created_date = datetime.now().date()

        user_data = Users.objects.filter(user_id=paid_by).first()
        group_data = Group.objects.filter(group_id=group_id).first()

        save_expenses = Expenses(
            expenses_id = expenses_id,
            description= description,
            amount = amount,
            paid_by = user_data,
            group_id = group_data,
            date = expense_created_date
        )
        save_expenses.save()

        expenses_id_data = Expenses.objects.filter(expenses_id=expenses_id).first()
        group_member_no = len(user_ids)
        sharable_amount = amount/group_member_no
        print(group_member_no)
        for user_shares in user_ids:
            user_shares_id = user_shares['user_id']
            print(user_shares_id)
            user_shares_data = Users.objects.filter(user_id=user_shares_id).first()

            save_expenses_shares = ExpensesShares(
                expenses_shares_id = uuid.uuid4(),
                expenses_id = expenses_id_data,
                user_id =user_shares_data,
                amount = sharable_amount,
            )
            save_expenses_shares.save()

        return JsonResponse({'status':'success','data':expenses_id},safe=False,status=constants.HTTP_200_OK)

    except Exception as error:
        print(error)
        return JsonResponse({'status': 'fail'},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

# Get the member of groups!
@csrf_exempt
def get_user_group_members(request):
    try:
        user_request = json.loads(request.body)
        if not ('group_id' in user_request):
            return JsonResponse({'status': 'fail'},status=constants.HTTP_400_BAD_REQUEST,safe=False)

        group_id = user_request['group_id']
        get_user_id_of_group = list(UserGroup.objects.filter(group_id=group_id,is_delete=False).values_list('user_id',flat=True))

        if not get_user_id_of_group:
            get_user_id_of_group = []
        
        get_user_id_data = Users.objects.filter(user_id__in=get_user_id_of_group).values()
        return JsonResponse({'status':'success','data':list(get_user_id_data)},safe=False,status=constants.HTTP_200_OK)

    except Exception as error:
        print(error)
        return JsonResponse({'status': 'fail'},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

#Set the group to delete status..
@csrf_exempt    
def group_set_to_delete(request):
    try:
        user_request = json.loads(request.body)
        if not(user_request and 'group_id' in user_request or 'group_name' in user_request):
            return JsonResponse({'status': 'fail'},status=constants.HTTP_400_BAD_REQUEST,safe=False)
        group_id,group_name= user_request['group_id'], user_request['group_name']
        set_to_delete_group = Group.objects.filter(group_id=group_id,group_name=group_name).first()

        #Set the group to delete status..
        if set_to_delete_group:
            set_to_delete_group.is_delete = True
            set_to_delete_group.save()
            return JsonResponse({'status':'success','message':'Group Deleted'},safe=False,status=constants.HTTP_200_OK)
        return JsonResponse({'status':'fail','message':'Group not exist'},safe=False,status=constants.HTTP_403_FORBIDDED)
    except Exception as error:
        print(error)
        return JsonResponse({'status': 'fail'},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)






