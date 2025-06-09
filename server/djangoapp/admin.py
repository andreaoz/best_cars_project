from django.contrib import admin
from .models import CarMake, CarModel


# Register your models here.
class CarMakeAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')

class CarModelAdmin(admin.ModelAdmin):
    list_display = ('car_make', 'name', 'type', 'year')

    def car_make(self,obj):
        return f'{obj.CarMake.name}'
    car_make.short_description = 'Brand'


# Register models here
admin.site.register(CarMake, CarMakeAdmin)
admin.site.register(CarModel, CarModelAdmin)
