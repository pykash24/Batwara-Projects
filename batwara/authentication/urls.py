from django.urls import path
from . import views

urlpatterns = [
    path('send-otp/', views.send_otp, name='send_otp'),
    path('user_register/', views.user_register, name='user_register'),
    path('opt_authentication/', views.opt_authentication, name='opt_authentication'),
    path('create_group/', views.create_group, name='create_group'),
    path('add_user_in_group/', views.add_user_in_group, name='add_user_in_group'),
    path('get_user_group_member/', views.get_user_group_member, name='get_user_group_member'),
    path('create_expense/', views.create_expense, name='create_expense'),
    path('token_decode/', views.token_decode, name='token_decode')
]
