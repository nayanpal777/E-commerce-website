from django.urls import path, include
from rest_framework.authtoken import views
from .views import home

urlpatterns = [
    path('', home, name="api.home"),
    path('category/', include('api.category.urls')),
    path('product/', include('api.product.urls')),
    path('user/', include('api.user.urls')),
    path('order/', include('api.order.urls')),
    path('payment/', include('api.payment.urls')),

    #for generating token we use this in this project we are not using this we have custom token-auth
    path('api-token-auth/', views.obtain_auth_token, name='api_token_auth'),
]