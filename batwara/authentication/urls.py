from django.urls import path
from . import views

urlpatterns = [
    path('send-otp/', views.send_otp, name='send_otp'),
    path('user_register/', views.user_register, name='user_register'),
    path('opt_authentication/', views.opt_authentication, name='opt_authentication'),
    path('create_group/', views.create_group, name='create_group'),
    path('user_group/', views.user_group, name='user_group'),
    path('get_group_member/', views.get_group_member, name='get_group_member')
]
