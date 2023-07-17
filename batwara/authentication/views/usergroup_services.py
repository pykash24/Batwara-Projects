from django.shortcuts import render
import uuid 
from django.http import JsonResponse
import random,json
from twilio.rest import Client
from ..models import *
from django.views.decorators.csrf import csrf_exempt
from configuration import constants,message
from datetime import datetime
from common_functions import *
# To create the group
@csrf_exempt
def create_group(request):
    try:
        user_request = json.loads(request.body)
        if (
            'group_description' not in user_request
            and 'group_name' not in user_request
            and 'user_id' not in user_request['user_id']
            and 'user_add_on' not in user_request['user_add_on']
        ):
            return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},status=constants.HTTP_400_BAD_REQUEST,safe=False)

        #To create the group..
        group_name, group_description,user_id,user_add_on= user_request['group_name'], user_request['group_description'],user_request['user_id'],user_request['user_add_on']
        group_id = uuid.uuid4()
        usergroup_id = uuid.uuid4()

        #create the user reference foreign key if exist
        user_data = UsersID.objects.filter(user_id = user_id).first()
        if not user_data:
            return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},status=constants.HTTP_400_BAD_REQUEST,safe=False)

        # Create the group
        save_group = Group(
            group_id = group_id,
            group_name = group_name,
            group_description = group_description,
            group_created_by = user_id
        )

        # Add default member of group.
        save_subgroup = UserGroup(
            usergroup_id = usergroup_id,
            user_id =user_data,
            group_id = save_group,
            is_delete= False
        )
        save_group.save()
        save_subgroup.save()
        result = {'group_name':group_name,'group_id':group_id,'usergroup_id':usergroup_id}
        
        
        add_user_request_body = {
            "user_add_on":user_add_on,
            "group_id" :group_id,
            "usergroup_id":usergroup_id
        }
        add_users_on_group = add_user_in_group(add_user_request_body)
        print("response",add_users_on_group)
        if add_users_on_group.status_code != constants.HTTP_200_OK:
            return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)
        return JsonResponse({message.STATUS_KEY: message.SUCCESS_MESSAGE,message.DATA_MESSAGE:result},safe=False,status=constants.HTTP_201_CREATED)
    except Exception as error:
        print(error)
        return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

# To create the group
@csrf_exempt
def add_user_in_group(request):
    try:
        if type(request) is str or type(request) is dict:
            user_request = request
        else:
            user_request = json.loads(request.body)
        if (
            'group_id' not in user_request
            or 'usergroup_id' not in user_request
        ):
            return JsonResponse({message.STATUS_KEY: constants.FAIL,'message':message.INVALID_REQUEST_BODY_MESSAGE},status=constants.HTTP_400_BAD_REQUEST,safe=False)

        group_id, usergroup_id,user_add_on= user_request['group_id'], user_request['usergroup_id'],user_request['user_add_on']

        for user_data in user_add_on:
            phone,nation,full_name = user_data['phone'],user_data['nation'],user_data['full_name'],

            """To create the group.. """
            if is_phone_exist := UsersID.objects.filter(
                user_phone=phone
            ).first():
                user_id = is_phone_exist.user_id
                print("user entry already exist in tank")

            else:
                user_id = uuid.uuid4()
                save_user_register = UsersID(
                    user_id =user_id,
                    user_phone = phone,
                    password = constants.EMPTY,
                    full_name =full_name ,
                    nation = nation,
                    is_deleted = constants.BOOLEAN_FALSE,
                    is_activate=constants.BOOLEAN_FALSE
                )
                save_user_register.save()
                print("user entry not exist")
            user_data = UsersID.objects.filter(user_id=user_id).first()
            group_data = Group.objects.filter(group_id=group_id).first()
            if is_user_already_exist_group := UserGroup.objects.filter(
                user_id=user_id, group_id=group_id
            ).first():
                print("User already exist in group")
            else:
                #Create the foreign relation with User & Group tables.
                save_group = UserGroup(
                    usergroup_id = usergroup_id,
                    group_id = group_data,
                    user_id =user_data,
                    is_delete= False
                )
                save_group.save()
        return JsonResponse({message.STATUS_KEY:message.SUCCESS_MESSAGE,'usergroup_id':usergroup_id},safe=False,status=constants.HTTP_200_OK)

    except Exception as error:
        print(error)
        return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

# Get the groups
@csrf_exempt
def get_user_group(request):
    try:
        user_request = json.loads(request.body)
        if 'user_id' not in user_request:
            return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},status=constants.HTTP_400_BAD_REQUEST,safe=False)

        user_id,result= user_request['user_id'],[]
        get_group_id = list(UserGroup.objects.filter(user_id=user_id,is_delete=False).values_list('group_id',flat=True))
        print(get_group_id)

        if not get_group_id:
            get_user_group_data = []

        get_user_group_data = Group.objects.filter(group_id__in=get_group_id).values()
    
        for data in list(get_user_group_data):
            data['group_creator'] = get_group_creator(data['group_created_by'])
            data['total_member'] = get_group_member_count(data['group_id'])

        return JsonResponse({message.STATUS_KEY:message.SUCCESS_MESSAGE,message.DATA_MESSAGE:list(get_user_group_data)},safe=False,status=constants.HTTP_200_OK)

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

        return JsonResponse({message.STATUS_KEY:message.SUCCESS_MESSAGE,message.DATA_MESSAGE:expenses_id},safe=False,status=constants.HTTP_200_OK)

    except Exception as error:
        print(error)
        return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

# Get the member of groups!
@csrf_exempt
def get_user_group_members(request):
    try:
        user_request = json.loads(request.body)
        if 'group_id' not in user_request:
            return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},status=constants.HTTP_400_BAD_REQUEST,safe=False)

        group_id = user_request['group_id']
        get_user_id_of_group = list(UserGroup.objects.filter(group_id=group_id,is_delete=False).values_list('user_id',flat=True))

        if not get_user_id_of_group:
            get_user_id_of_group = []

        get_user_id_data = UsersID.objects.filter(user_id__in=get_user_id_of_group).values('user_id','full_name')
        return JsonResponse({message.STATUS_KEY:message.SUCCESS_MESSAGE,message.DATA_MESSAGE:list(get_user_id_data)},safe=False,status=constants.HTTP_200_OK)

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
        if set_to_delete_group := Group.objects.filter(
            group_id=group_id, group_name=group_name
        ).first():
            set_to_delete_group.is_delete = True
            set_to_delete_group.save()
            return JsonResponse({message.STATUS_KEY:message.SUCCESS_MESSAGE,'message':'Group Deleted'},safe=False,status=constants.HTTP_200_OK)
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

        if delete_expenses_share := ExpensesShares.objects.filter(
            expenses_id=expenses_id
        ):
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
        return JsonResponse({message.STATUS_KEY:message.SUCCESS_MESSAGE,'message':'Data updated successfully',message.DATA_MESSAGE:list(updated_expenses_shares)},safe=False,status=constants.HTTP_200_OK)
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
        return JsonResponse({message.STATUS_KEY:message.SUCCESS_MESSAGE,'message':'Data updated successfully'},safe=False,status=constants.HTTP_200_OK)
    except Exception as error:
        print(error)
        return JsonResponse({message.STATUS_KEY: message.ERROR_KEY,'message':'Internal server error'},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

# Get the user details
@csrf_exempt
def get_user_details(request):
    try:
        user_request = json.loads(request.body)
        if 'user_id' not in user_request:
            return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},status=constants.HTTP_400_BAD_REQUEST,safe=False)
        user_id = user_request['user_id']
        user_details = UsersID.objects.filter(user_id=user_id).first()

        if not user_details:
            print("user not exist")
            return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},status=constants.HTTP_400_BAD_REQUEST,safe=False)

        user_details_json = {
            "full_name":user_details.full_name,
            "user_phone":user_details.user_phone,
        }

        if is_user_profile := UserDetails.objects.filter(
            user_id=user_id
        ).first():
            user_details_json['account_verified'] = is_user_profile.account_verified
            user_details_json['mail'] = is_user_profile.mail
            user_details_json['address'] = is_user_profile.address
            user_details_json['gender'] = is_user_profile.gender
            user_details_json['is_profile_set'] = constants.BOOLEAN_TRUE
            user_details_json['account_verified'] = is_user_profile.account_verified
        else:
            user_details_json['is_profile_set'] = constants.BOOLEAN_FALSE
            print("user details not exist")
        return JsonResponse(
            {
                message.STATUS_KEY: message.SUCCESS_MESSAGE,
                message.DATA_MESSAGE: [user_details_json],
                
            },
            safe=False,
            status=constants.HTTP_200_OK,
        )
    except Exception as error:
        print(error)
        return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)
    
""" To set the user profile"""
@csrf_exempt
def set_up_profile(request):
    try:
        user_request = json.loads(request.body)
        if (
            'user_id' not in user_request
            and 'gender' not in user_request
            and 'mail' not in user_request
            and 'address' not in user_request
            ):
            return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},status=constants.HTTP_400_BAD_REQUEST,safe=False)

        user_id,gender,mail,address= user_request['user_id'],user_request['gender'],user_request['mail'],user_request['address']
        user_details = UsersID.objects.filter(user_id=user_id).first()
        print("user_details",user_details)
        if not user_details:
            return JsonResponse({message.STATUS_KEY: message.ERROR_KEY,'message':'User not exist'},status=constants.HTTP_400_BAD_REQUEST,safe=False)

        if is_user_profile_set := UserDetails.objects.filter(
            user_id=user_id
        ).first():
            is_user_profile_set.mail = mail
            is_user_profile_set.gender = gender
            is_user_profile_set.address = address
            is_user_profile_set.save()
            return JsonResponse({message.STATUS_KEY:message.SUCCESS_MESSAGE,'message':'Profile update successful'},safe=False,status=constants.HTTP_200_OK)

        """ Set the user profile if user details not exist"""
        set_user_profile = UserDetails(
            unique_id = str(uuid.uuid4()),
            user_id = user_details,
            address = address,
            mail = mail,
            password = user_details.password,
            gender = gender,
            account_verified = False,
            is_deleted= False
        )
        set_user_profile.save()
        return JsonResponse({message.STATUS_KEY:message.SUCCESS_MESSAGE,'message':'Data updated successfully'},safe=False,status=constants.HTTP_200_OK)
    except Exception as error:
        print(error)
        return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)


""" To set the user profile"""
@csrf_exempt
def get_all_users(request):
    try:
        user_details = UsersID.objects.filter(is_deleted=constants.BOOLEAN_FALSE).values('full_name','user_id','user_phone','nation')
        return JsonResponse({message.STATUS_KEY:message.SUCCESS_MESSAGE,'message':'Data retrieved successfully','data':list(user_details)},safe=False,status=constants.HTTP_200_OK)
    except Exception as error:
        print(error)
        return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)


""" To set the user profile"""
@csrf_exempt
def get_user_group_expenses(request):
    try:
        user_request = json.loads(request.body)
        if (
            'group_id' not in user_request
            and 'user_id' not in user_request
            ):
            return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},status=constants.HTTP_400_BAD_REQUEST,safe=False)
        
        group_id,user_id= user_request['group_id'],user_request['user_id']
        expenses_query = Expenses.objects.filter(group_id=group_id).values('expenses_id','description','date','group_id','paid_by','amount')

        for data in list(expenses_query):
            expenses_id = data['expenses_id']
            expenses_amount = data['amount']

            """ To check the user paid and requestor are same and get the requstor name"""
            if user_id == data['paid_by']:
                data['paid_by'] = constants.YOU
            else:
                data['paid_by'] = get_group_creator(data['paid_by'])
            
            expenses_shared_list= ExpensesShares.objects.filter(expenses_id=expenses_id,user_id=user_id).values('user_id','amount')
            if expenses_shared_list:
                data['is_user_involved'] = constants.BOOLEAN_TRUE
                # expenses_amount_list= ExpensesShares.objects.filter(expenses_id=expenses_id).exclude(user_id=user_id).values('amount')
                amount_diff = expenses_amount - expenses_shared_list[0]['amount']
                if data['paid_by'] == constants.YOU:
                    data['expenses_description'] = "you lent " + str(amount_diff)
                else:
                    data['expenses_description'] = "you borrowed " + str(amount_diff)
            else:
                data['is_user_involved'] = constants.BOOLEAN_FALSE
                data['expenses_description'] = constants.EMPTY

         

        return JsonResponse({message.STATUS_KEY:message.SUCCESS_MESSAGE,'message':'Data retrieved successfully','data':list(expenses_query)},safe=False,status=constants.HTTP_200_OK)

    except Exception as error:
        print("get_user_group_expenses",error)
        return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)


""" To set the user profile"""
@csrf_exempt
def get_user_expense_details(request):
    try:
        user_request = json.loads(request.body)
        if (
            'expenses_id' not in user_request
            and 'user_id' not in user_request
            ):
            return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},status=constants.HTTP_400_BAD_REQUEST,safe=False)
        result = []
        expenses_id, user_id = user_request['expenses_id'],user_request['user_id']
        expenses_shared_list= ExpensesShares.objects.filter(expenses_id=expenses_id).values('user_id','amount')
        if expenses_shared_list:
            for data in expenses_shared_list:
                data['full_name'] = get_group_creator(data['user_id'])
        return JsonResponse({message.STATUS_KEY:message.SUCCESS_MESSAGE,'message':'Data retrieved successfully','data':list(expenses_shared_list)},safe=False,status=constants.HTTP_200_OK)

    except Exception as error:
        print("get_user_group_expenses",error)
        return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)

    
@csrf_exempt
def delete_user_expense_details(request):
    try:
        user_request = json.loads(request.body)
        if not user_request:\
            return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},status=constants.HTTP_400_BAD_REQUEST,safe=False)
        expenses_id = user_request['expenses_id']
        
        delete_user_expenses = Expenses.objects.filter(expenses_id=expenses_id).first()
        if not delete_user_expenses:
            return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},status=constants.HTTP_400_BAD_REQUEST,safe=False)
            
        delete_user_expenses.is_delete = constants.BOOLEAN_TRUE
        delete_user_expenses.save()
        """Update the status of expenses share"""
        expenses_share_query = ExpensesShares.objects.filter(expenses_id=expenses_id).exists()
        if expenses_share_query:
            expenses_share_query = ExpensesShares.objects.filter(expenses_id=expenses_id).update(is_delete=constants.BOOLEAN_TRUE)
        else:
            print("No matching objects found.")
        return JsonResponse({message.STATUS_KEY:message.SUCCESS_MESSAGE,'message':'Data delete successfully'},safe=False,status=constants.HTTP_200_OK)
    except Exception as error:
        print("delete_user_expense_details",error)
        return JsonResponse({message.STATUS_KEY: message.ERROR_KEY},safe=False,status=constants.HTTP_500_INTERNAL_SERVER_ERROR)
