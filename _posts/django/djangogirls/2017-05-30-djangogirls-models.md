---
layout: post
title:  "장고 모델"
category: [Do 장고걸스!, djangogirls]
tags:
  - Django
  - Djangogirls
  - Models
comments: true
---

## 장고 모델

> `User` <---> `Django` <---> `DataBase`

- User가 데이터를 요청하면, Django가 클라이언트로부터 입력받은 정보를 DataBase에 전달한다.
- DataBase가 데이터를 꺼내어 응답하면, 그 응답을 다시 Django가 User에게 전달한다.
- 장고 프로젝트는 SQLite3 DB가 기본으로 설정되어 있다. (실 서비스에서는 그다지 적합하지는 않다.)
- 원래 DB Table을 만들고 조회/추가/수정/삭제 하기 위해서는 SQL을 써야만 한다. 하지만 장고가 지원해주는 Django Model을 쓰면, 직접 SQL을 작성하지 않고도 [ORM]()을 통해 SQL을 작성할 수 있다.
- 장고 모델은 파이썬 클래스 문법형태로 정의한다.

### 블로그에 어떤 내용을 저장할 것인지 설계하기
- 다음은 모델 클래스명, 사용할 필드, 필드 목적에 대하여 설계한 것이다.

```docker
Post        # 저장 단위에 대한 이름
--- 속성 ---
title       # 제목
text        # 내용
author      # 작성자
created_at  # 생성 날짜
pub_at      # 발행 날짜

```

### 어플리케이션 제작하기
`python manage.py startapp <생성할 앱의 이름>`
- manage.py 명령어를 입력할 시, 항상 manage.py 가 있는 디렉토리에서 입력해야 한다.
- 어플리케이션 생성후, settings의 INSTALLED_APPS에 명시함으로써 Django에게 해당 어플리케이션을 `사용할 것`임을 알려줘야 한다.

[settings.py]
```python
INSTALLED_APPS = [
  'django.contrib.admin',
  'django.contrib.auth', ...
  'blog', # 반드시 ,(콤마)를 붙이자
]
```

[models.py]

```python
from django.db import models
from django.utils import timezone

class Post(models.Model):
    author = models.ForeignKey('auth.User')
    title = models.CharField(max_lenght=200) # 길이 제한 있는 문자열
    text = models.TextField() # 길이 제한 없는 문자열
    created_date = models.DateTimeField(default=timezone.now) # 포스트 생성시 현재 시간이 자동으로 기입된다.
    published_date = models.DateTimeField(blank=True, null=True)

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title
```

- 코드를 작성했다고 해서 데이터베이스가 바로 생성되는 것은 아니다. 반드시 마이그레이션 작업을 해야 데이터베이스가 생성된다.

#### [모델의 마이그레이션 파일 생성]
<br>
`python manage.py makemigrations blog`
- blog 앱을 타겟으로 마이그레이션 맵을 만들겠다는 명령어이다.


마이그레이션 파일을 테이블에 적용 : `python manage.py migrate blog`
- migrate는 마이그레이션 생성에 전혀 이상이 없으면, 이를 그대로 데이터베이스에 반영하겠다는 뜻이다.

## Django 관리자

[blog/admin.py]

```python
from django.contrib import admin
from .models import Post # 같은 경로의 models.py에서 Post 테이블을 불러옴.

admin.site.register(Post) # 이 등록만으로도 장고 Admin에서 Post 모델을 사용할 수 있음.
```

- `python manage.py runserver 0:9000` : 9000번 포트에서 열겠다는 표현.
- `python manage.py createsuperuser` : 슈퍼 유저 생성
