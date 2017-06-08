---
layout: post
title:  "[장고 기본편] 2. DjangoApp, URLConf, Template"
category: [travel]
tags:
  - Django
  - AskDjango
  - URLConf
  - 템플릿
comments: true
---

>| ٩(๑òωó๑)۶ 아, 아, 마이크 테스트 |<br>
이 마크다운은 이진석 선생님의 'Ask Django VOD 장고 기본편(Feat.여행 블로그 만들기)'를 토대로 작성되었습니다.

## 프로젝트 시작!
#### \> 항상 manage.py 가 있는 디렉토리상에서 장고 커맨드를 입력할 것

0) 프로젝트 생성 : `django-admin startapp <app-name>`<br>
1) 앱 디렉토리 생성 : `python manage.py startapp blog`<br>
2) 앱을 프로젝트에 등록 : <프로젝트명>/settings.py *콤파에 유의할 것*

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'blog', # 'blog' 앱 등록
]
# 현재 장고 앱으로 위 6개가 등록되어 있음.
# django.contrib : 단순한 디렉토리 경로 장고에서 기본으로 제공되는 앱들이 이 contrib 안에 있다.
```
3) 첫 뷰 생성
[앱이름/views.py]
```python
from django.shortcuts import render

def post_list(request):
    return render(request, 'blog/post_list.html') # 반드시 앱 이름을 쓰고 그 뒤에 파일명 쓰기
```
4) 어플리케이션 디렉토리에 urls.py 생성 후 경로 설정<br>
[앱이름/urls.py]
```python
from django.conf.urls import url
from . import views

urlpatterns = [
  url(r'^$', view.post_list)
]
```
- 기본 경로에 대한 url 을 지정해주지 않았기 때문에 page not found를 응답한다.

5) 프로젝트 디렉토리의 urls.py 변경 include
[프로젝트명/urls.py]
```python
from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
  url(r'^admin/', admin.site,urls),
  url(r'^blog/', include('blog.urls')),
]
```
- 서버를 구동시킨 후, 해당 주소 끝에 `/blog/` 를 붙이면 템플릿이 없어서 생기는 오류창이 뜬다.

6) `앱이름/templates/앱이름/post_list.html` 생성하고 `http:lobcalhost:8000/blog/`로 접속해본다.
