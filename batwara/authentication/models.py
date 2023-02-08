from django.db import models

# Create your models here.
 
class Users(models.Model):
    user_id = models.CharField(max_length=256,unique=True)
    user_phone = models.CharField(max_length=256,null=True)
    user_password = models.CharField(max_length=256,null=True)
    user_created_on =  models.DateField(auto_now_add=True)
    first_name = models.CharField(max_length=256,null=True)
    last_name = models.CharField(max_length=256,null=True)
    user_mail = models.CharField(max_length=256,null=True)
    
    class Meta:
        db_table = "users_tank"

class TempOtp(models.Model):
    otp_id = models.CharField(max_length=256,null=True)
    user_id = models.CharField(max_length=256,null=True)
    user_phone = models.CharField(max_length=256,null=True)
    user_otp = models.CharField(max_length=256,null=True)
    user_created_on =  models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "temp_otp"


class Group(models.Model):
    group_id = models.CharField(max_length=256,unique=True,null=True)
    group_name = models.CharField(max_length=256,null=True)
    group_description = models.CharField(max_length=256,null=True)
    user_created_on =  models.DateTimeField(auto_now_add=True)
    is_delete = models.BooleanField(null=True,default=False)

    class Meta:
        db_table = "group"

class UserGroup(models.Model):
    usergroup_id = models.CharField(max_length=256,null=True)
    user_id = models.ForeignKey(Users,on_delete=models.CASCADE,to_field='user_id')
    group_id = models.ForeignKey(Group,on_delete=models.CASCADE,to_field='group_id')

    class Meta:
        db_table = "user_group"

class Expenses(models.Model):
    expenses_id = models.CharField(max_length=256,null=True)
    description = models.CharField(max_length=256,null=True)
    amount = models.CharField(max_length=256,null=True)
    paid_by = models.ForeignKey(Users,on_delete=models.CASCADE,to_field='user_id')
    group_id = models.ForeignKey(Group,on_delete=models.CASCADE,to_field='group_id')
    date = models.DateField(null=True)

    class Meta:
        db_table = "expenses"




