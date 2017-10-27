---
layout: post
title:  "첫 장고 프로젝트!"
category: [Do 장고걸스!, djangogirls]
tags:
  - Django
  - Djangogirls
  - Blog
comments: true
---

> [장고걸스 튜토리얼](https://tutorial.djangogirls.org/ko/)을 토대로 작성한 것입니다. 이 장은 장고 프로젝트를 시작하고 장고가 유지해야 하는 특정 구조를 구성합니다.

## 장고 설치 후, 기본 골격 만들어주는 스크립트 실행
먼저, 장고 프로젝트에 대한 작업은 `가상환경(virtualenv) 안`에서 해야한다. <br>
\- [파이썬 가상환경 구성하기](https://tutorial.djangogirls.org/ko/django_installation/)

### **Mac 혹은 Linux** 에서 프로젝트 생성하기

<p class="quote">
  <b style="color: skyblue;">[Tip]</b> 명령어 끝에 .(마침표) : 현재 디렉토리에 장고를 설치하라는 표시이다.
</p>

아래 명령어를 통해 `장고 Rule`에 따른 새로운 프로젝트 디렉토리와 파일들을 생성해준다.

```
>>> django-admin startproject <프로젝트명> .
```

디렉토리와 파일명은 중요하기 때문에 **마음대로 변경하거나 다른 곳으로 옮겨서는 안된다.**

```
djangogirls
├── [...]
├── manage.py
└── mysite
        settings.py
        urls.py
        wsgi.py
        __init__.py
```

- **manage.py :** 사이트 관리를 도와준다. 다른 설치 작업 없이 바로 웹 서버를 시작할 수 있다.
- **settings.py :** 웹 설정이 있다.
- **urls.py :** urlresolver가 사용하는 패턴 목록을 포함한다. 즉 어디로 자원을 전달해야 하는지 판단한다.

### 설정 변경
현재 장고 프로젝트를 진행하기 위한 기본 설정이 담겨있는 코드이다. 다음과 같은 추가적인 설정이 필요하다.

**[project-directory/mysite/settings.py]**

```python
import os
from os.path import abspath, dirname, join

BASE_DIR = join(abspath(__file__), '..', '..')
```

- **__file__** : /home/bbungsang/projects/django/djangogirls/djangogirls/mysite/settings.py
- **앞의 '..'** : /home/bbungsang/projects/django/djangogirls/djangogirls/mysite
- **뒤의 '..'** : /home/bbungsang/projects/django/djangogirls/djangogirls

<p style="font-weight: bold; color: #8d8d8d; margin: 25px 0;">정확한 시간 넣기</p>

django 내에서 날짜/시간을 보여주고 저장할 때 반영할 시간을 지정해준다.

```
TIME_ZONE = 'Asia/Soeul'
```

<p style="font-weight: bold; color: #8d8d8d; margin: 25px 0;">정적파일 경로 추가</p>

```
STATIC_URL = '/static' <br>
STATIC_ROOT = os.path.join(BASE_DIR, 'static')<br>
```

위와 같이 이 경로는 `/home/bbungsang/projects/django/djangogirls/djangogirls/static` 을 의미한다.

### 데이터베이스 설정

(sqlite3 사용 전제)

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
```

### 설정이 다 끝났다면, 단 *3step* 만으로 웹어플리케이션을 실행할 수 있다.

> **Step1)** 데이터베이스를 생성하기 위해 콘솔 창에서 `python manage.py migrate` 를 실행해야하는데, 이 때, `djangogirs`(project-directory) 안에 있는 `manage.py` 파일이 필요하다. <br /><br />
> **Step2)** 콘솔창에 `python manage.py runserver` 명령을 실행한다.  <br /><br />
> **Step3)** : 끝으로, 브라우저에 `http://127.0.0.1:8000/`를 입력하면 개발 서버가 뜬다.

![it_worked]({{site.url}}/assets/it_worked.png){: .center-image}
