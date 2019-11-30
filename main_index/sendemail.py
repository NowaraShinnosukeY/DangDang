import os
from django.core.mail import EmailMultiAlternatives
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "DangDang.settings")
if __name__ == '__main__':
# 1. 发给谁 2. 从哪儿发 3. 发点啥
    to = ['2918715084@qq.com']
    from_email = 'youngyshu@gmail.com'
    subject = 'test'
    comment = 'test1'
    html_content = '<a href="http://www.baidu.com">test</a>'
    msg = EmailMultiAlternatives(html_content, from_email=from_email, body=comment, to=to)
    msg.send()