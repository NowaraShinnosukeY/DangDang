import json
from datetime import datetime

from main_index.captcha.image import ImageCaptcha
from django.core.paginator import Paginator
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

from main_index.car import Car, Car_item
from main_index.models import TBook, TCategory, TUser, TShop, TAddress, TOrder, TOrders
import random,string,hashlib


# Create your views here.


car = Car()
def main_index(request):
    categorys = TCategory.objects.all()
    comment = TBook.objects.all().order_by('-publish_time')
    newbooks = comment[:8]
    new_hot = TBook.objects.all().order_by('-publish_time','-sales')[:5]
    user = request.session.get('username')
    if user:
        return render(request,'index.html',{'categorys':categorys,'comment':comment,'newbooks':newbooks,'new_hot':new_hot,'username':TUser.objects.get(email_address=user).nickname})
    return render(request,'index.html',{'categorys':categorys,'comment':comment,'newbooks':newbooks,'new_hot':new_hot})

def show_details(request):
    id = request.GET.get('id')
    book = TBook.objects.get(id=id)
    username = request.session.get('username')
    category = TCategory.objects.get(id=book.category_id)
    if category.parentid_id:
        pcategory = TCategory.objects.get(id=category.parentid_id)
        if username:
            username = TUser.objects.get(email_address=username).nickname
            return render(request,'Book details.html',{'book':book,'username':username,'category':category,'pcategory':pcategory})
        return render(request,'Book details.html',{'book':book,'category':category,'pcategory':pcategory})
    return render(request,'Book details.html',{'book':book,'category':category})


def show_booklist(request):
    categorys = TCategory.objects.all()
    # 获取点击的类别
    username = request.session.get('username')
    if username:
        username = TUser.objects.get(email_address=username).nickname
    cid = request.GET.get('cid')
    cc = TCategory.objects.get(id=cid)
    # 无上级分类，一级分类
    if cc.parentid_id is None:
        books = TBook.objects.filter(category__id=cid)
        if not books:
            second = TCategory.objects.filter(parentid__id=cid)
            for i in second:
                books = books | TBook.objects.filter(category__id=i.id)
    # 有上级分类，二级分类
    else:
        books = TBook.objects.filter(category__id=cid)

    if request.GET.get('sort'):
        sortss = request.GET.get('sort')
        sorts = sortss[:-1]
        rev = sortss[-1]
        # 排序项为 price
        if sorts == 'price':
            if rev == '0':
                books = books.order_by('last_price')
            else:
                books = books.order_by('-last_price')
    pagtor = Paginator(list(books),per_page=2)
    page = request.GET.get('page',1)
    if request.GET.get('sort'):
        return render(request,'booklist.html',{'categorys':categorys,'cid':cid,'category':cc,'books':books,'pagtor':pagtor.page(page),'pages':pagtor,'page':int(page),'sort':sortss,'username':username})
    return render(request,'booklist.html',{'categorys':categorys,'cid':cid,'category':cc,'books':books,'pagtor':pagtor.page(page),'pages':pagtor,'page':int(page),'username':username})

def register(request):
    return render(request,'register.html')

def login(request):
    if request.COOKIES.get('username'):
        username = request.COOKIES.get('username')
        password = request.COOKIES.get('password')
        if TUser.objects.filter(email_address=username,password=password):
            url = request.session.get('url')
            if url:
                return redirect(url)
            return redirect('main_index:index')
        return render(request,'login.html')
    return render(request,'login.html')

def saveurl(request):
    request.session['url'] = request.POST.get('url')
    return HttpResponse('ok')

def loginlogic(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    save = request.POST.get('save')
    user = TUser.objects.filter(email_address=username)
    if user:
        method = user[0].method
        secretpwd = hashlib.sha256()
        secretpwd.update((password + method).encode())
        secretpwd = secretpwd.hexdigest()
        if secretpwd == user[0].password:
            if request.session.get('url'):
                response = HttpResponse(request.session.get('url'))
            else:
                response = HttpResponse('ok')
            request.session['username'] = username
            print(save == 'true')
            if save == 'true':
                response.set_cookie('username', username,max_age= 7 * 24 * 3600)
                response.set_cookie('password', secretpwd,max_age= 7 * 24 * 3600)
            else:
                response.set_cookie('username', username)
                response.set_cookie('password', secretpwd)
            # 存car的session
            if request.session.get('car'):
                car = request.session.get('car')
                for i in car.car:
                    if TShop.objects.filter(userid_id=user[0].id,bookid_id=i.book):
                        book = TShop.objects.get(userid_id=user[0].id,bookid_id=i.book)
                        book.booknum += i.number
                        book.save()
                    else:
                        TShop.objects.create(userid_id=user[0].id,bookid_id=i.book,booknum=i.number)
            # 找出购物车表中是否有该用户,有的话将表中数据添入session，没有为 空
            if TShop.objects.filter(userid=TUser.objects.get(email_address=username).id):
                ushop = TShop.objects.filter(userid=TUser.objects.get(email_address=username).id)
                global car
                # 用于创建 session car
                car = Car()
                for i in ushop:
                    car.addcar(i.bookid_id, i.booknum)
                request.session['car'] = car
            return response
        else:
            return HttpResponse('用户名或密码错误')
    return HttpResponse('用户名或密码错误')

def checkUserName(request):
    username = request.POST.get('username')
    if TUser.objects.filter(email_address=username):
        return HttpResponse('用户名已存在~')
    return HttpResponse('用户名可用')
    
def registlogic(request):
    username = request.POST.get('username')
    nickname = request.POST.get('nickname')
    password = request.POST.get('password')
    method = ''.join(random.sample(string.ascii_lowercase,10))
    secretpwd = hashlib.sha256()
    secretpwd.update((password+method).encode())
    secretpwd = secretpwd.hexdigest()
    TUser.objects.create(email_address=username,nickname=nickname,password=secretpwd,status=1,method=method)
    request.session['username'] = username
    request.session['password'] = secretpwd
    return HttpResponse('注册成功')

def getCaptcha(request):
    image = ImageCaptcha()
    code = ''.join(random.sample(string.ascii_uppercase+string.ascii_lowercase+string.digits,4))
    request.session['code'] = code
    data = image.generate(code)
    return HttpResponse(data,'image/png')

def checkCode(request):
    code = request.POST.get('code')
    if code.upper() == request.session['code'].upper():
        return HttpResponse('正确')
    return HttpResponse('错误')

def signOut(request):
    response = HttpResponse(request.POST.get('url'))
    # 删除cookies 和 session
    response.delete_cookie('username')
    response.delete_cookie('password')
    request.session.flush()
    car = Car()
    global car
    return response

def registok(request):
    username = request.session.get('username')
    url = request.session.get('url')
    if url :
        return render(request, 'register ok.html', {'name': username,'url':url})
    return render(request,'register ok.html',{'name':username})

def defaultdata(car_item):
    carss = []
    #购物车类
    if isinstance(car_item,Car):
        for i in car_item.car:
            carss.append([i.book,i.number])
        return {'car':carss}
    #书model类
    else:
        return {'name':car_item.name,'picture':car_item.picture,'firstprice':car_item.first_price,'lastprice':car_item.last_price}

def carsdetail(request):
    username = request.session.get('username')
    cars = request.session.get('car')
    if cars:
        cars = defaultdata(cars)
    else:
        return HttpResponse('no data')
    # 登录状态
    if username:
        user = TUser.objects.get(email_address=username).id
        ucar = TShop.objects.filter(userid=user)
        # 用户有购物车表
        if ucar:
            booksid = ucar.values('bookid_id')
            # 存放未登录状态下的购物车信息
            booksid_list = []
            for i in list(booksid):
                booksid_list.append(i['bookid_id'])
            # 有 session car
            if cars:
                for j in cars['car']:
                    if j[0] in booksid_list:
                        # 更新购物车表
                        TShop.objects.get(userid_id=user, bookid_id=j[0]).booknum = j[1]
                    else:
                        TShop.objects.create(userid_id=user, bookid_id=j[0], booknum=j[1])
        # 用户没有购物车表
        else:
            for i in cars['car']:
                TShop.objects.create(userid_id=user, bookid_id=i[0], booknum=i[1])
        books = []
        # 更新完的总数据
        ub = TShop.objects.filter(userid_id=user)
        for i in ub:
            books.append(TBook.objects.get(id=i.bookid_id))
        return JsonResponse(books, safe=False, json_dumps_params={'default': defaultdata})
    # 未登录状态
    else:
        cars = request.session.get('car')
        if cars:
            cars = defaultdata(cars)
            books = []
            for i in cars['car']:
                book = TBook.objects.get(id=i[0])
                books.append(book)
            return JsonResponse(books,safe=False,json_dumps_params={'default':defaultdata})
        else:
            return HttpResponse('no data')


def cars(request):
    username = request.session.get('username')
    cars = request.session.get('car')
    if cars:
        cars = defaultdata(cars)
        if username:
            return render(request,'car.html',{'car':cars,'username':TUser.objects.get(email_address=username).nickname})
        return render(request,'car.html',{'car':cars})
    if username:
        return render(request,'car.html',{'username':TUser.objects.get(email_address=username).nickname})
    return render(request,'car.html')

def addintocar(request):
    bookid = request.GET.get('bookid')
    number = request.GET.get('number',1)
    if request.session.get('car'):
        car = request.session['car']
    else:
        global car
    car.addcar(int(bookid),int(number))
    request.session['car'] = car
    if request.session.get('username'):
        username = TUser.objects.get(email_address=request.session.get('username'))
        if TShop.objects.filter(userid_id=username.id,bookid_id=int(bookid)):
            ubook = TShop.objects.get(userid_id=username.id, bookid_id=int(bookid))
            ubook.booknum += int(number)
            ubook.save()
        else:
            TShop.objects.create(userid_id=username.id, bookid_id=int(bookid),booknum=int(number))
    return HttpResponse('添加成功')

def changeintocar(request):
    bookid = request.POST.get('bookid')
    number = request.POST.get('number')
    if request.session['car']:
        car = request.session['car']
    global car
    car.changecar(int(bookid),int(number))
    request.session['car'] = car
    if request.session.get('username'):
        username = TUser.objects.get(email_address=request.session.get('username'))
        book = TShop.objects.get(userid_id=username.id,bookid_id=int(bookid))
        book.booknum = int(number)
        book.save()
        return HttpResponse('database change ok')
    return HttpResponse('ok')

def delintocar(request):
    bookid = request.POST.get('bookid')
    if request.session['car']:
        car = request.session['car']
    if ',' in bookid:
        bookids = eval('['+bookid+']')
        print(bookids,type(bookids))
        for i in bookids:
            car.delcar(i)
        request.session['car'] = car
        if request.session.get('username'):
            username = TUser.objects.get(email_address=request.session.get('username'))
            for i in bookids:
                book = TShop.objects.get(userid_id=username.id, bookid_id=i)
                book.delete()
    else:
        car.delcar(int(bookid))
        request.session['car'] = car
        if request.session.get('username'):
            username = TUser.objects.get(email_address=request.session.get('username'))
            book = TShop.objects.get(userid_id=username.id, bookid_id=int(bookid))
            book.delete()
    return HttpResponse('Del is OK')

def indentlogic(request):
    user = request.session.get('username')
    if user:
        if request.session.get('car'):
            car = request.session.get('car')
            total = request.POST.get('totalprice')
            print(total,type(total))
            car.firstprice = float(total[1:])
            request.session['car'] = car
            return HttpResponse('OK!')
        else:
            return HttpResponse('NO books!')
    else:
        return HttpResponse('Not in login!')

def defaultaddr(addr):
    return {'id':addr.id,'name':addr.username,'zipcode':addr.zipcode,'phonenumber':addr.phonenumber,'telephone':addr.telephone,'addressname':addr.address}

def indent(request):
    car = request.session.get('car')
    if car:
        car = defaultdata(car)
    else:
        car = ''
    user = request.session.get('username')
    if user:
        userid = TUser.objects.get(email_address=user).id
        username = TUser.objects.get(email_address=user).nickname
        if TAddress.objects.filter(userid_id=userid):
            address = TAddress.objects.filter(userid_id=userid).values('id','address')
            return render(request,'indent.html',{'car':car,'address':address,'username':username})
        else:
            return render(request,'indent.html',{'car':car,'username':username})
    else:

        return render(request,'indent.html',{'car':car})

def getaddr(request):
    addrid = request.POST.get('id')
    addr = TAddress.objects.get(id=int(addrid))
    return JsonResponse(addr,safe=False,json_dumps_params={'default':defaultaddr})

def addaddress(request):
    name = request.POST.get('name')
    detailaddr = request.POST.get('detailaddr')
    zipcode = request.POST.get('zipcode')
    mobilephone = request.POST.get('mobilephone')
    telephone = request.POST.get('telephone')
    userid = TUser.objects.get(email_address=request.session.get('username')).id
    address = TAddress.objects.create(username=name,address=detailaddr,zipcode=zipcode,phonenumber=mobilephone,telephone=telephone,userid_id=userid)
    return HttpResponse(address.id)

def addorder(request):
    # 生成随机订单号
    orderid = int(''.join(random.sample(string.digits,8)))
    createtime = str(datetime.now())[:-7]
    price = request.session.get('car').firstprice
    addressid = request.POST.get('id')
    userid = TUser.objects.get(email_address=request.session.get('username')).id
    status = 'Done!'
    TOrder.objects.create(order_id=orderid,create_date=createtime,price=price,address_id=addressid,user_id=userid,status=status)
    car = request.session.get('car')
    booksid = []
    for i in car.carid:
        booksid.append(str(i))
    booksid = ','.join(booksid)
    booksnum = 0
    booknum = []
    for i in car.car:
        booksnum += i.number
        booknum.append(str(i.number))
    booknum=','.join(booknum)
    TOrders.objects.create(order_id=orderid,book_id=booksid,book_num=booknum,total_price=car.firstprice,total_books=booksnum)
    orderinfo = [orderid,booksnum,TAddress.objects.get(id=int(addressid)).username,car.firstprice]
    request.session['orderinfo'] = orderinfo
    print(request.session.get('orderinfo'))

    return HttpResponse('生成订单成功！')

def indentok(request):
    orderinfo = request.session.get('orderinfo')
    car = request.session.get('car')
    if request.session.get('username'):
        username = TUser.objects.get(email_address=request.session.get('username')).nickname
        return render(request,'indent ok.html',{'orderid':orderinfo[0],'booksnum':orderinfo[1],'name':orderinfo[2],'totalprice':orderinfo[3],'username':username,'car':car})
    else:
        return redirect('main_index:index')

def delcar(request):
    # 删除session car，添加订单表数据
    if request.session.get('car'):
        del request.session['car']
    usercar = TShop.objects.filter(userid=TUser.objects.get(email_address=request.session.get('username')).id)
    usercar.delete()
    print('delcar')
    return HttpResponse('del is ok')