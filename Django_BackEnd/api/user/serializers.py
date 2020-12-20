from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import authentication_classes, permission_classes
# decorators allows you to overwrite the code remotly which is prewrite in django
from .models import CustomUser


class UserSerializer(serializers.HyperlinkedModelSerializer):
    #for creating New user     
    def create(self, validated_data):
        #we are poping password from validated_data
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        
        instance.save()
        return instance
    
    #serializing all the data means converting data into JSON formate
    class Meta:
        #we create a model CustomUser in which we define all the custom fields
        model = CustomUser
        #we not define password in our model for security 
        extra_kwargs = {'password': {'write_only': True}}
        #here we serializes all the fields
        #we are using inheritance here so we have to serilize is_active, is_staff, is_superuser us well
        fields = ('name', 'email', 'password', 'phone', 'gender',
                  'is_active', 'is_staff', 'is_superuser')
        
