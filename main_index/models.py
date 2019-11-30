# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=80)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class TAddress(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    username = models.CharField(db_column='UserName', max_length=255, blank=True, null=True)  # Field name made lowercase.
    address = models.CharField(db_column='Address', max_length=255, blank=True, null=True)  # Field name made lowercase.
    zipcode = models.CharField(db_column='Zipcode', max_length=255, blank=True, null=True)  # Field name made lowercase.
    phonenumber = models.CharField(db_column='PhoneNumber', max_length=255, blank=True, null=True)  # Field name made lowercase.
    telephone = models.CharField(db_column='TelePhone', max_length=255, blank=True, null=True)  # Field name made lowercase.
    userid = models.ForeignKey('TUser', models.DO_NOTHING, db_column='UserID', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 't_address'


class TBook(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=255, blank=True, null=True)  # Field name made lowercase.
    writer = models.CharField(db_column='Writer', max_length=255, blank=True, null=True)  # Field name made lowercase.
    publish = models.CharField(db_column='Publish', max_length=255, blank=True, null=True)  # Field name made lowercase.
    publish_time = models.DateField(db_column='Publish_time', blank=True, null=True)  # Field name made lowercase.
    version = models.IntegerField(db_column='Version', blank=True, null=True)  # Field name made lowercase.
    book_isbn = models.CharField(db_column='Book_ISBN', max_length=255, blank=True, null=True)  # Field name made lowercase.
    words = models.IntegerField(db_column='Words', blank=True, null=True)  # Field name made lowercase.
    pages = models.IntegerField(db_column='Pages', blank=True, null=True)  # Field name made lowercase.
    book_size = models.IntegerField(db_column='Book_size', blank=True, null=True)  # Field name made lowercase.
    paper = models.CharField(db_column='Paper', max_length=255, blank=True, null=True)  # Field name made lowercase.
    pack = models.CharField(db_column='Pack', max_length=255, blank=True, null=True)  # Field name made lowercase.
    category = models.ForeignKey('TCategory', models.DO_NOTHING, db_column='Category_id', blank=True, null=True)  # Field name made lowercase.
    category_0 = models.CharField(db_column='Category', max_length=255, blank=True, null=True)  # Field name made lowercase. Field renamed because of name conflict.
    first_price = models.FloatField(db_column='First_price', blank=True, null=True)  # Field name made lowercase.
    last_price = models.FloatField(db_column='Last_price', blank=True, null=True)  # Field name made lowercase.
    editor_commend = models.TextField(db_column='Editor_Commend', blank=True, null=True)  # Field name made lowercase.
    content_introduction = models.TextField(db_column='Content_introduction', blank=True, null=True)  # Field name made lowercase.
    writer_introduction = models.TextField(db_column='Writer_introduction', blank=True, null=True)  # Field name made lowercase.
    catalogs = models.TextField(db_column='Catalogs', blank=True, null=True)  # Field name made lowercase.
    media_comment = models.TextField(db_column='Media_comment', blank=True, null=True)  # Field name made lowercase.
    picture = models.CharField(db_column='Picture', max_length=255, blank=True, null=True)  # Field name made lowercase.
    product_image = models.CharField(db_column='Product_image', max_length=255, blank=True, null=True)  # Field name made lowercase.
    series_name = models.CharField(db_column='Series_name', max_length=255, blank=True, null=True)  # Field name made lowercase.
    print_time = models.DateField(db_column='Print_time', blank=True, null=True)  # Field name made lowercase.
    impression = models.CharField(db_column='Impression', max_length=255, blank=True, null=True)  # Field name made lowercase.
    stock = models.IntegerField(db_column='Stock', blank=True, null=True)  # Field name made lowercase.
    shelves_date = models.DateField(db_column='Shelves_date', blank=True, null=True)  # Field name made lowercase.
    score = models.DecimalField(db_column='Score', max_digits=3, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    status = models.IntegerField(db_column='Status', blank=True, null=True)  # Field name made lowercase.
    sales = models.IntegerField(db_column='Sales', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 't_book'


class TCategory(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    type = models.CharField(db_column='Type', max_length=255, blank=True, null=True)  # Field name made lowercase.
    total = models.IntegerField(db_column='Total', blank=True, null=True)  # Field name made lowercase.
    parentid = models.ForeignKey('self', models.DO_NOTHING, db_column='ParentID', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 't_category'


class TOrder(models.Model):
    order_id = models.AutoField(db_column='Order_id', primary_key=True)  # Field name made lowercase.
    create_date = models.DateTimeField(db_column='Create_date', blank=True, null=True)  # Field name made lowercase.
    price = models.FloatField(db_column='Price', blank=True, null=True)  # Field name made lowercase.
    address = models.ForeignKey(TAddress, models.DO_NOTHING, db_column='Address_id', blank=True, null=True)  # Field name made lowercase.
    user = models.ForeignKey('TUser', models.DO_NOTHING, db_column='User_id', blank=True, null=True)  # Field name made lowercase.
    status = models.CharField(db_column='Status', max_length=255, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 't_order'


class TOrders(models.Model):
    order = models.ForeignKey(TOrder, models.DO_NOTHING, db_column='Order_ID', blank=True, null=True)  # Field name made lowercase.
    book_id = models.CharField(max_length=255, blank=True, null=True)
    book_num = models.CharField(max_length=255, blank=True, null=True)
    total_price = models.FloatField(db_column='Total_price', blank=True, null=True)  # Field name made lowercase.
    total_books = models.IntegerField(db_column='Total_books', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 't_orders'


class TShop(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    userid = models.ForeignKey('TUser', models.DO_NOTHING, db_column='UserID')  # Field name made lowercase.
    bookid = models.ForeignKey(TBook, models.DO_NOTHING, db_column='BookID', blank=True, null=True)  # Field name made lowercase.
    booknum = models.IntegerField(db_column='BookNum', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 't_shop'


class TUser(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    email_address = models.CharField(db_column='Email_Address', max_length=255, blank=True, null=True)  # Field name made lowercase.
    nickname = models.CharField(db_column='NickName', max_length=255, blank=True, null=True)  # Field name made lowercase.
    password = models.CharField(db_column='Password', max_length=255, blank=True, null=True)  # Field name made lowercase.
    status = models.IntegerField(db_column='Status', blank=True, null=True)  # Field name made lowercase.
    method = models.CharField(db_column='Method', max_length=255, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 't_user'
