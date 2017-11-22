---
layout: post
title:  "[장고 기본편] 5. Model"
category: [여행 블로그 만들기, travel]
tags:
  - Django
  - Travel Blog
comments: true
---

>이 마크다운은 이진석 선생님의 'Ask Django VOD 장고 기본편(Feat.여행 블로그 만들기)'를 토대로 작성되었습니다.

## SQL(Structured Query Language)
- Query : 정보 수집 요청에 쓰이는 컴퓨터 언어
- SQL : 관계형 데이터베이스 관리 시스템(RDBMS)의 데이터를 관리하기 위해 설계된 프로그래밍 언어
- 장고의 `Model`은 RDBMS만을 지원한다.
- 장고는 `Model`을 통해 SQL을 생성하고 실행한다.

## Django Model
- 장고 모델은 장고의 내장 ORM(Object Relational Mapping)이다.
  - ORM이란? 데이터베이스와 객체 지향 프로그래밍 언어 간의 호환되지 않는 데이터를 변환하는 프로그래밍 기법
- SQL을 직접 작성하지 않아도 장고 모델을 통해 데이터베이스로의 접근이 가능하다.
- 즉, `Model`은 <파이썬 클래스> 와 <데이터베이스 테이블> 을 매핑한다.
  - Model Instance : DB 테이블의 Row
  - 예를 들어 blog앱 Post모델이면, 데이터베이스의 blog_post테이블과 매핑하고, blog앱 Comment모델이면, blog_comment테이블과 매핑을 한다.
- 데이터베이스 테이블의 구조 및 타입을 먼저 설계하고 모델을 정의한다. 이 때 모델 클래스명은 단수형

```python
from django.db import models

class Post(models.Model):
    title = models.CharField(
      max_length=100,
      verbose_name='제목',
      help_text='포스팅 제목을 입력해주세요. 최대 100자 내외',
    ) # 길이 제한이 있는 문자열

    content = models.TextField(
      verbose_name='내용'
    ) # 길이 제한이 없는 문자열

    acreated_at = models.DateTimeField(
      auto_now_add=True
    ) # 최초 저장될 때 최초 저장 일시

    updated_at = models.DateTimeField(
      auto_now=True
    ) # 갱신 시 저장 일시

```

#### 장고에서 지원하는 모델 필드 타입
- Field Tyeps : AutoField, BooleanField, CharField, DateTimeField, FileField, ImangeField, TextField...
- Relation ship Types : ForeignKey, ManyToManyField, OneToOneField...

### 필드 옵션
- 필드마다 고유 옵션이 있고,
- 모든 필드에 공통으로 쓸 수 있는 옵션이 있다.
  - null(DB Option) : DB 필드에 NULL 허용 여부(Default : False)
  - unique(DB Option) : 유일성 여부
  - blank : 입력값 유효성(validation) 검사 시 empty 값 허용 여부(Default : False)
  - choices(form widget용) : select box ('저장될 값', 'UI에 보여질 레이블')
  - validators : 입력값 유효성 검사를 수행할 함수를 여러 개 지정
    - 이메일만 받기, 최대 길이 제한, 최소값 제한...
    - 인자로 받는 값이 해당 함수 목적에 맞지 않으면, 목적에 맞지 않다는 안내 메세지와 함께 실행이 중단됨
  - verbose_name : 필드 레이블. 지정되지 않으면 필드명이 쓰여짐
  - help_text(form widget 용) : 필드 입력 도움말
