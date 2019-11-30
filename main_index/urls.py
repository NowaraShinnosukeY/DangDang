from django.urls import path
from main_index import views
app_name = 'main_index'

urlpatterns = [
    path('index/', views.main_index,name='index'),
    path('bookdetail/', views.show_details,name='bookdetail'),
    path('booklist/', views.show_booklist,name='booklist'),
    path('register/', views.register,name='register'),
    path('login/', views.login,name='login'),
    path('loginlogic/', views.loginlogic,name='loginlogic'),
    path('checkusername', views.checkUserName,name='checkusername'),
    path('registlogic/', views.registlogic,name='registlogic'),
    path('getCaptcha/', views.getCaptcha,name='getcaptcha'),
    path('checkcode/', views.checkCode,name='checkcode'),
    path('signout/', views.signOut,name='signout'),
    path('registok/', views.registok,name='registok'),
    path('saveurl/', views.saveurl,name='saveurl'),
    path('cars/', views.cars,name='car'),
    path('addintocar/', views.addintocar,name='addintocar'),
    path('carsdetail/', views.carsdetail,name='carsdetail'),
    path('changeintocar/', views.changeintocar,name='changeintocar'),
    path('delintocar/', views.delintocar,name='delintocar'),
    path('indent/', views.indent,name='indent'),
    path('indentlogic/', views.indentlogic,name='indentlogic'),
    path('getaddr/', views.getaddr,name='getaddr'),
    path('addorder/', views.addorder,name='addorder'),
    path('indentok/', views.indentok,name='indentok'),
    path('addaddress/', views.addaddress,name='addaddress'),
    path('delcar/', views.delcar,name='delcar'),
]