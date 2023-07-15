from django.urls import path
from . import views

urlpatterns = [
    path('sign_up_send_otp/', views.sign_up_send_otp, name='sign_up_send_otp'),
    path('sign_up_otp_verification/', views.sign_up_otp_verification,name='sign_up_otp_verification'),
    path('sign_in_send_otp/', views.sign_in_send_otp, name='sign_in_send_otp'),
    path('sign_in_otp_verification/', views.sign_in_otp_verification,name='sign_in_otp_verification'),
    path('user_register/', views.user_register, name='user_register'),
    path('set_up_profile/', views.set_up_profile, name='set_up_profile'),
    path('user_authentication/', views.user_authentication,name='user_authentication'),
    path('create_group/', views.create_group, name='create_group'),
    path('add_user_in_group/', views.add_user_in_group, name='add_user_in_group'),
    path('get_user_group/', views.get_user_group, name='get_user_group'),
    path('create_expense/', views.create_expense, name='create_expense'),
    # path('token_decode/', views.token_decode, name='token_decode'),
    path('get_user_group_members/', views.get_user_group_members, name='get_user_group_members'),
    path('group_set_to_delete/', views.group_set_to_delete, name='group_set_to_delete'),
    path('update_expenses/', views.update_expenses, name='update_expenses'),
    path('remove_user_from_group/', views.remove_user_from_group, name='remove_user_from_group'),
    path('mail_sent/', views.mail_sent, name='mail_sent'),#not working
    path('get_user_details/', views.get_user_details, name='get_user_details'),
    path('get_all_users/', views.get_all_users, name='get_all_users'),
    path('get_user_group_expenses/', views.get_user_group_expenses, name='get_user_group_expenses'),
    path('get_user_expense_details/', views.get_user_expense_details, name='get_user_expense_details'),

]
