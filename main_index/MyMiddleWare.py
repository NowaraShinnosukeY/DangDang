from django.shortcuts import redirect
from django.utils.deprecation import MiddlewareMixin
from .models import TUser

class MyMiddleware(MiddlewareMixin):  # 自定义的中间件
    def __init__(self, get_response):  # 初始化
        super().__init__(get_response)

    # view处理请求前执行
    def process_request(self, request):  # 某一个view
        if 'regist' in request.path or 'login' in request.path or 'admin' in request.path :
            pass
        elif 'DangDang' not in request.path:
            return redirect('main_index:index')
        else:
            username = request.COOKIES.get('username')
            password = request.COOKIES.get('password')
            if (username and password):
                user = TUser.objects.get(email_address = username,password = password)
                if user:
                    request.session['username'] = username
                else:
                    pass
            else:
                pass

    # 在process_request之后View之前执行
    def process_view(self, request, view_func, view_args, view_kwargs):
        print("view:", request, view_func, view_args, view_kwargs)

    # view执行之后，响应之前执行
    def process_response(self, request, response):
        print("response:", request, response)
        return response  # 必须返回response

    # 如果View中抛出了异常
    def process_exception(self, request, ex):  # View中出现异常时执行
        print("exception:", request, ex)