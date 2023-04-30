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
        if (
            'group_description' not in user_request
            and 'group_name' not in user_request
            and 'user_id' not in user_request['user_id']
        ):
            return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},status=constants.HTTP_400_BAD_REQUEST,safe=False)

        #To create the group..
        group_name, group_description,user_id = user_request['group_name'], user_request['group_description'],user_request['user_id']
        group_id = uuid.uuid4()
        usergroup_id = uuid.uuid4()

        #create the user reference foreign key if exist
        user_data = UsersID.objects.filter(user_id = user_id).first()
        if not user_data:
            return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},status=constants.HTTP_403_FORBIDDED,safe=False)

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
        result = {'group_name':group_name,'group_id':group_id,'usergroup_id':usergroup_id}
        return JsonResponse({message.STATUS_KEY: message.SUCCESS_MESSAAGE,message.DATA_MESSAGE:result},safe=False,status=constants.HTTP_201_CREATED)

    except Exception as error:
        print(error)
        return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

# To create the group
@csrf_exempt
def add_user_in_group(request):
    try:
        user_request = json.loads(request.body)
        if not ('phone' in user_request and 'group_id' in user_request and 'usergroup_id' in user_request):
            return JsonResponse({message.STATUS_KEY: constants.FAIL,'message':message.INVALID_REQUEST_BODY_MESSAGE},status=constants.HTTP_400_BAD_REQUEST,safe=False)

        # To create the group..
        phone, group_id,usergroup_id = user_request['phone'], user_request['group_id'], user_request['usergroup_id']
        is_phone_exist = UsersID.objects.filter(user_phone=phone).first()
        if not is_phone_exist:
            user_id = uuid.uuid4()
            save_user_register = UsersID(
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

        user_data = UsersID.objects.filter(user_id=user_id).first()
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
            return JsonResponse({message.STATUS_KEY: message.ERROR_KEY,'message':'Already exist'},status=constants.HTTP_400_BAD_REQUEST,safe=False)
        return JsonResponse({message.STATUS_KEY:message.SUCCESS_MESSAAGE,'usergroup_id':usergroup_id},safe=False,status=constants.HTTP_201_CREATED)
        
    except Exception as error:
        print(error)
        return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

# Get the groups
@csrf_exempt
def get_user_group(request):
    try:
        user_request = json.loads(request.body)
        if not ('user_id' in user_request):
            return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},status=constants.HTTP_400_BAD_REQUEST,safe=False)

        user_id = user_request['user_id']
        get_group_id = list(UserGroup.objects.filter(user_id=user_id,is_delete=False).values_list('group_id',flat=True))
        print(get_group_id)

        if not get_group_id:
            get_user_group_data = []
        
        get_user_group_data = Group.objects.filter(group_id__in=get_group_id).values()
        return JsonResponse({message.STATUS_KEY:message.SUCCESS_MESSAAGE,message.DATA_MESSAGE:list(get_user_group_data)},safe=False,status=constants.HTTP_200_OK)

    except Exception as error:
        print(error)
        return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

# Create Expenses!
@csrf_exempt
def create_expense(request):
    try:
        user_request = json.loads(request.body)
        if not user_request:
            return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},status=constants.HTTP_400_BAD_REQUEST,safe=False)

        description, group_id, paid_by, amount,user_ids = user_request['description'], user_request['group_id'], user_request['paid_by'], user_request['amount'], user_request['user_ids']
        expenses_id = uuid.uuid4()
        expense_created_date = datetime.now().date()

        user_data = UsersID.objects.filter(user_id=paid_by).first()
        group_data = Group.objects.filter(group_id=group_id).first()

        #check the user data or group data of user reference is exist.
        if not(user_data or group_data):
            return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},status=constants.HTTP_400_BAD_REQUEST,safe=False)

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

        #Shares expenses into listed users equally.
        for user_shares in user_ids:
            user_shares_id = user_shares['user_id']
            user_shares_data = UsersID.objects.filter(user_id=user_shares_id).first()
            save_expenses_shares = ExpensesShares(
                expenses_shares_id = uuid.uuid4(),
                expenses_id = expenses_id_data,
                user_id =user_shares_data,
                amount = sharable_amount,
            )
            save_expenses_shares.save()

        return JsonResponse({message.STATUS_KEY:message.SUCCESS_MESSAAGE,message.DATA_MESSAGE:expenses_id},safe=False,status=constants.HTTP_200_OK)

    except Exception as error:
        print(error)
        return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

# Get the member of groups!
@csrf_exempt
def get_user_group_members(request):
    try:
        user_request = json.loads(request.body)
        if not ('group_id' in user_request):
            return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},status=constants.HTTP_400_BAD_REQUEST,safe=False)

        group_id = user_request['group_id']
        get_user_id_of_group = list(UserGroup.objects.filter(group_id=group_id,is_delete=False).values_list('user_id',flat=True))

        if not get_user_id_of_group:
            get_user_id_of_group = []
        
        get_user_id_data = UsersID.objects.filter(user_id__in=get_user_id_of_group).values()
        return JsonResponse({message.STATUS_KEY:message.SUCCESS_MESSAAGE,message.DATA_MESSAGE:list(get_user_id_data)},safe=False,status=constants.HTTP_200_OK)

    except Exception as error:
        print(error)
        return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

#Set the group to delete status..
@csrf_exempt    
def group_set_to_delete(request):
    try:
        user_request = json.loads(request.body)
        if not(user_request and 'group_id' in user_request or 'group_name' in user_request):
            return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},status=constants.HTTP_400_BAD_REQUEST,safe=False)
        group_id,group_name= user_request['group_id'], user_request['group_name']
        set_to_delete_group = Group.objects.filter(group_id=group_id,group_name=group_name).first()

        #Set the group to delete status..
        if set_to_delete_group:
            set_to_delete_group.is_delete = True
            set_to_delete_group.save()
            return JsonResponse({message.STATUS_KEY:message.SUCCESS_MESSAAGE,'message':'Group Deleted'},safe=False,status=constants.HTTP_200_OK)
        return JsonResponse({message.STATUS_KEY:message.ERROR_KEY,'message':'Group not exist'},safe=False,status=constants.HTTP_403_FORBIDDED)
    except Exception as error:
        print(error)
        return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

#Update the expenses & share the expenses of group members
@csrf_exempt
def update_expenses(request):
    try:
        user_request = json.loads(request.body)
        if not user_request:
            return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},status=constants.HTTP_400_BAD_REQUEST,safe=False)

        expenses_id,amount,user_ids = user_request['expenses_id'], user_request['amount'], user_request['user_ids']
        expenses_id_data = Expenses.objects.filter(expenses_id=expenses_id).first()
        if not expenses_id_data:
            return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},status=constants.HTTP_400_BAD_REQUEST,safe=False)

        expenses_id_data.amount = amount
        expenses_id_data.save()
        group_member_no = len(user_ids)
        sharable_amount = amount/group_member_no

        #Reference of expenses sharses id
        expenses_id_data = Expenses.objects.filter(expenses_id=expenses_id).first()
        
        #Delete the old 
        delete_expenses_share = ExpensesShares.objects.filter(expenses_id=expenses_id)
        if delete_expenses_share:
            delete_expenses_share.delete()
        
        #Update the updated expenses shares to group member
        for user_shares in user_ids:
            user_shares_id = user_shares['user_id']
            user_shares_data = UsersID.objects.filter(user_id=user_shares_id).first()
            save_expenses_shares = ExpensesShares(
                expenses_shares_id = uuid.uuid4(),
                expenses_id = expenses_id_data,
                user_id =user_shares_data,
                amount = sharable_amount,
            )
            save_expenses_shares.save()        
        updated_expenses_shares = ExpensesShares.objects.filter(expenses_id=expenses_id).values()
        return JsonResponse({message.STATUS_KEY:message.SUCCESS_MESSAAGE,'message':'Data updated successfully',message.DATA_MESSAGE:list(updated_expenses_shares)},safe=False,status=constants.HTTP_200_OK)
    except Exception as error:
        print(error)
        return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

#Remove the user from group!
@csrf_exempt
def remove_user_from_group(request):
    try:
        user_request = json.loads(request.body)
        if not (user_request and 'user_id' in user_request and 'group_id' in user_request and 'usergroup_id' in user_request):
            return JsonResponse({message.STATUS_KEY: message.ERROR_KEY,'message':'Invalid request body'},status=constants.HTTP_400_BAD_REQUEST,safe=False)
        user_id,group_id,usergroup_id = user_request['user_id'], user_request['group_id'],user_request['usergroup_id']

        #Get the user id reference
        user_data = UsersID.objects.filter(user_id=user_id).first()
        if not user_data:
            return JsonResponse({message.STATUS_KEY: message.ERROR_KEY,'message':'Not found!'},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

        #Check the user exist in group
        is_user_exist_in_group = UserGroup.objects.filter(user_id=user_data.user_id,usergroup_id=usergroup_id,is_delete=constants.BOOLEAN_FALSE).first()
        if not is_user_exist_in_group:
            return JsonResponse({message.STATUS_KEY: message.ERROR_KEY,'message':'Not found'},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

        #Remove the user from group
        is_user_exist_in_group.is_delete=True
        is_user_exist_in_group.save()
        return JsonResponse({message.STATUS_KEY:message.SUCCESS_MESSAAGE,'message':'Data updated successfully'},safe=False,status=constants.HTTP_200_OK)
    except Exception as error:
        print(error)
        return JsonResponse({message.STATUS_KEY: message.ERROR_KEY,'message':'Internal server error'},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

# Get the user details
@csrf_exempt
def get_user_details(request):
    try:
        user_request = json.loads(request.body)
        if not ('user_id' in user_request):
            return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},status=constants.HTTP_400_BAD_REQUEST,safe=False)
        user_id = user_request['user_id']
        user_details_json = UsersID.objects.filter(user_id=user_id).values()
        return JsonResponse({message.STATUS_KEY:message.SUCCESS_MESSAAGE,message.DATA_MESSAGE:list(user_details_json)},safe=False,status=constants.HTTP_200_OK)
    except Exception as error:
        print(error)
        return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

