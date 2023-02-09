from django.shortcuts import render
import uuid 
from django.http import JsonResponse
import random,json
from twilio.rest import Client
from ..models import *
from django.views.decorators.csrf import csrf_exempt
from configuration import constants
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
        )
        
        # Add default memeber of group.
        save_subgroup = UserGroup(
            usergroup_id = usergroup_id,
            user_id =user_data,
            group_id = save_group
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
        if not ('user_id' in user_request and 'group_id' in user_request and 'usergroup_id' in user_request):
            return JsonResponse({'status': 'fail'},status=constants.HTTP_400_BAD_REQUEST,safe=False)

        # To create the group..
        user_id, group_id,usergroup_id = user_request['user_id'], user_request['group_id'], user_request['usergroup_id']
        user_data = Users.objects.filter(user_id=user_id).first()
        group_data = Group.objects.filter(group_id=group_id).first()

        #Create the foreign releation with User & Group tables.
        save_group = UserGroup(
            usergroup_id = usergroup_id,
            group_id = group_data,
            user_id =user_data
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
        group_member_no = user_ids.length()
        print(group_member_no)
        for user_shares in user_ids:
            user_shares_id = user_shares['user_id']
            user_shares_data = Users.objects.filter(user_id=user_shares_id).first()

            save_expenses_shares = ExpensesShares(
                expenses_shares_id = uuid.uuid4(),
                expenses_id = expenses_id_data,
                user_id =user_shares_data,
                amount = "200",
            )
            save_expenses_shares.save()

        return JsonResponse({'status':'success','data':expenses_id},safe=False,status=constants.HTTP_200_OK)

    except Exception as error:
        print(error)
        return JsonResponse({'status': 'fail'},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)





