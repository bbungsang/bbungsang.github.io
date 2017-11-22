---
layout: post
title:  "[장고 기본편] 3. URLConf와 정규표현식"
category: [여행 블로그 만들기, travel]
tags:
  - Django
  - Travel Blog
comments: true
---

>이 마크다운은 이진석 선생님의 'Ask Django VOD 장고 기본편(Feat.여행 블로그 만들기)'를 토대로 작성되었습니다.

- 프로젝트/settings.py 최상위 URLConf 모듈을 지정한다.

```python
ROOT_URLCONF = 'mysite/urls' # mysite/urls.py
```
- 장고서버로 HTTP 요청이 들어올 때마다, URL 매핑 리스트를 처음부터 끝까지 순차적으로 검색한다.
- 적합한 URL 을 찾지 못 하면, 404 Page Not Found 페이지를 보여준다.

[어플리케이션/urls.py]
```python
from django.conf.urls import url
from . import views # 현재 디렉토리 어플리케이션/ 에서 views 파일 임포트

urlpatterns = [
    url(r'^$', views.post_list), # 포스팅 목록, views 에서 post_list 라는 함수 자체를 호출
    url(r'^new/$', views.post_new, name='post_new'), # 새 포스팅
    url(r'^(?P<id>\d+)/$', views.post_detail, name='post_detail'), # 포스팅 보기
    ...
]
```
### 정규표현식 풀이
***r'^(?P<id>\d+)/$'***
- `^`와 `$` : 시작과 끝을 표현한다.
- `(?P)` : 이 영역의 문자열에 정규표현식을 적용해서
- `\d+` : 1이상의 숫자인 패턴에 부합된다면,
- `<id>` : 'id'라는 변수명으로 인자를 넘기겠다.
- *id 변수명으로 넘어간 인자의 모든 값들은 모두 문자열 타입이다.*

[Example]
```python
# [어플리케이션/urls.py]

url(r'^sum/(?P<x>\d+)/(?P<y>\d+)/$', views.mysum)
# url 주소는 sum/ 으로 시작, 그 다음 들어갈 경로는 x 를 인자로 받으며 숫자 패턴이고, 그 다음 들어갈 경로는 y 를 인자로 받으며 숫자 패턴이다.
# 뷰의 mysum 함수로 x, y값의 파라미터가 전달되어 함수를 실행하게 된다.

# [어플리케이션/views.py]

def mysum(request, x, y):
  return HttpResponse(int(x) + int(y))
# request와 url 경로를 통해 전달받은 x, y값을 인자를 받아서 x + y의 값으로 응답한다.
```
<br><br>
## *정리 : 프로젝트와 앱을 생성하기까지*
1. 프로젝트 생성 : `django-admin startproject <프로젝트명>`
2. 프로젝트 디렉토리의 settings.py 설정
3. 앱 생성 : `python manage.py startapp <앱이름>`
4. 프로젝트/settings.py의 INSTALLED_APPS에 어플리케이션 등록
5. 앱/urls.py 파일 생성 후, 프로젝트/urls.py 에서 앱 URLConf 설정 include

```python
from django.conf.urls import include, urls

urlpatterns = [
  url(r'^앱이름/', include('앱이름.urls', namespace='앱이름')),
]
```
