from django.db import models
from api.user.models import CustomUser
from api.product.models import Product

# Create your models here.


class Order(models.Model):
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, null=True, blank=True)

    product_name = models.CharField(max_length=500)
    total_products = models.CharField(max_length=500, default=0)
    transaction_id = models.CharField(max_length=150, default=0)
    total_amount = models.CharField(max_length=50, default=0)

    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
