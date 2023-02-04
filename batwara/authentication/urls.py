from django.urls import path
from . import views

urlpatterns = [
    path('send-otp/', views.send_otp, name='send_otp'),
    path('user_register/', views.user_register, name='user_register'),
    path('opt_authentication/', views.opt_authentication, name='opt_authentication')
]
