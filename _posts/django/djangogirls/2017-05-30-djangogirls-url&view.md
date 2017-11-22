---
layout: post
title:  "장고 URL과 뷰"
category: [Do 장고걸스!, djangogirls]
tags:
  - Django
  - Djangogirls
comments: true
---

> [장고걸스 튜토리얼](https://tutorial.djangogirls.org/ko/)을 토대로 작성한 것입니다. 이 장은 URL과 View에 대해 간략히 설명하고 내용을 작성합니다.

## URL
URL은 웹 주소다. 인터넷의 모든 페이지는 고유한 URL을 가지고 있어야하며, 어플리케이션은 URL에 따라서 다른 내용을 불러온다.

장고의 경우, `URL Configuration`을 사용하는데, 장고에서 URL과 일치하는 뷰를 찾기 위한 패턴의 집합을 일컫는다.

**장고 프로젝트 구조**

```
djangogirls
    [...]
    manage.py
    blog
        models.py
        views.py
        urls.py
    mysite
        settings.py
        urls.py
        wsgi.py
        __init__.py
```

**[blog/urls.py]**

```python
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.post_list, name='post_list'),
]
```

`name='post_list'`는 URL에 이름을 붙인 것으로 뷰를 식별한다.

**[mysite/urls.py]**

```python
url(r'^admin/', admin.site.urls),
# 장고가 admin/ 로 시작하는 모든 URL을 VIEW와 대조하여 찾아낸다. URL은 무수히 많으므로 정규표현식을 사용한다.

url(r'blog/', include('blog.urls')),
# http://127.0.0.1:8000/ 로 들어오는 모든 접속 요청을 blog.urls 로 전송
# blog.urls 에 정의되어 있는 부분을 mysite.urls에서도 사용할 수 있도록 가져오는 역할 : include
# blog/urls.py 에서 blog/... 주소를 사용할 때, 일일이 'blog/' 부분을 기입해야하는데, mysite/urls.py 에서 선언하면 그러한 수고를 덜 수 있다.
# 또한 blog/ 뒤에 $를 붙이지 않도록 주의한다. blog/urls.py 에서 특정 view 함수를 연결할 때에만 붙여준다.
```

**[사용된 정규표현식]**

<p class="quote">
  ^post/(\d+)/$
</p>

- **^post/** : url이 *post/* 로 **시작**
- **(\\d+)** : *숫자*가 한 개 이상
- **/$** : url 마지막이 */* 로 **끝남**

## 뷰(view)
어플리케이션의 '로직'을 넣는 곳으로, `모델`에서 필요한 정보를 받아와 `템플릿`에 전달하는 역할을 한다. URL을 통해 호출되며 함수 기반 뷰와 클래스 기반 뷰가 있다.

### 렌더
장고에서 지원해주는 템플릿 기반 시스템, 복잡한 문자열을 보다 쉽게 작업할 수 있도록 도와준다.

**[blog/view.py]**

```python
from django.http import HttpResponse
from django.shortcuts import render

def post_list(request):
  return render(request, 'blog/post_list.html') # Template Loader
```

`post_list`라는 `함수(def)`를 만들어 요청을 넘겨받고, 응답 내용을 `blog/post_list.html`에서 보여준다는 의미이다.

파일을 저장하고, 브라우저에서 http://127.0.0.1:8000/ 로 접속하면,

![]({{site.url}}/assets/template_error.png){: .center-image }

아직 `blog/template/blog/post_list.html` 을 아직 안 만들었기 때문에 템플릿 오류가 발생한다.
