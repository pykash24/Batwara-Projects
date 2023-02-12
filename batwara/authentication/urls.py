from django.urls import path
from . import views

urlpatterns = [
    path('send-otp/', views.send_otp, name='send_otp'),
    path('user_register/', views.user_register, name='user_register'),
    path('opt_authentication/', views.opt_authentication, name='opt_authentication'),
    path('create_group/', views.create_group, name='create_group'),
    path('add_user_in_group/', views.add_user_in_group, name='add_user_in_group'),
    path('get_user_group/', views.get_user_group, name='get_user_group'),
    path('create_expense/', views.create_expense, name='create_expense'),
    path('token_decode/', views.token_decode, name='token_decode'),
    path('get_user_group_members/', views.get_user_group_members, name='get_user_group_members'),
    path('group_set_to_delete/', views.group_set_to_delete, name='group_set_to_delete')
    
]
