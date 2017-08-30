---
layout: post
title:  "[10장] 클래스 기반 뷰"
category: [두숟갈 스터디, two-scoops]
tags:
  - Django
comments: true
---

## 장고의 뷰
- 장고의 뷰는 요청 객체를 받고 응답 객체를 반환하는 내장 함수이다.
- `함수 기반 뷰`는 뷰 함수 자체가 내장 함수이고,
- `클래스 기반 뷰`는 뷰 클래스가 내장 함수를 반환하는 as_view() 클래스 메서드를 제공한다.
- 요즘 대부분의 웹 프로젝트에서 제네릭 클래스 기반 뷰(GCBV)를 이용하여 장고의 장점을 최대한 살리고 있다.

### 클래스 기반 뷰를 이용할 때 가이드 라인
- 뷰 코드 양은 적으면 적을수록 좋다. 즉, 뷰는 `간단명료`해야 한다.
- 뷰 안에서 같은 코드를 반복적으로 이용하지 말자.
- `뷰`는 `프레젠테이션 로직`에서 관리하도록, `비즈니스 로직`은 `모델`에서 처리하자.
- 400, 404, 500 에러 핸들링에 클래스 기반 뷰는 이용하지 않는다.

#### 프레젠테이션 로직과 비즈니스 로직
- 프레젠테에션 로직: 말 그대로 보여주기 위한 로직, 화면상의 디자인 구성을 의한 로직을 일컫는다.
- 비즈니스 로직: 어떤 값을 얻기 위해 데이터의 처리를 수행하는 로직을 일컫는다.


> **궁금한 점:** 109p를 보면, 장고의 기본형에서 제네릭 클래스 기반 뷰를 위한 주요 믹스인이 빠져있다고 돼있습니다. 그 중에 LoginRequiredMixin이 있는데요, 하지만 장고 최신 버전에서는 장고 기본형에서 LoginRequiredMixin을 제공해줍니다. 이 책이 장고 구버전을 토대로 작성돼서 그런건지, 제네릭 클래스의 경우 장고 기본형에서 제공해주는 LoginRequiredMixin과 호환되지 않는 것인지 궁금합니다.

> **➜** 최신버전에서 제공해주는 장고 기본형 LoginRequiredMixin은 모듈 braces의 LoginRequiredMixin을 그대로 가져온 것입니다.

---

## 클래스 기반 뷰 ღෆ 믹스인
- 믹스인이란 실체화(인스턴스화)된 클래스가 아니라 상속해 줄 기능을 제공하는 클래스를 의미한다.
- 다중 상속을 해야 할 때, 믹스인을 쓰면 클래스에 더 나은 기능과 역할을 제공한다.

#### 믹스인을 이용해서 뷰 클래스를 제작할 때, 상속에 관한 규칙
1. 장고가 제공하는 `기본 뷰`는 항상 `오른쪽`으로 진행한다
2. `믹스인`은 기본 뷰에서부터 `왼쪽`으로 진행한다
3. 믹스인은 파이썬의 `기본 객체 타입을 상속`해야한다

---

## GCBV를 언제 사용해야할까?
\- **View :** 어디에서든 이용 가능한 기본 뷰 <br />
\- **RedirectView :** 사용자를 다른 URL로 리다이렉트 <br />
\- **TemplateView :** 장고 HTML 템플릿을 보여줄 때 <br />
\- **ListView :** 객체 목록 <br />
\- **DetailView :** 객체를 보여줄 때 <br />
\- **FormView :** 폼 전송 <br />
\- **CreateView :** 객체를 만들 때 <br />
\- **UpdatedView :** 객체를 업데이트할 때 <br />
\- **DeleteView :** 객체를 삭제 <br />

### 인증된 사용자에게만 장고 CBV 혹은 GCBV 접근 가능하게 하기
- django.contrib.auth.decorators.login_required **데코레이터**를 사용해도 되지만,
- 대부분의 예제들이 정형화된 틀에 박혀 있는 문제점이 있다.
- 데코레이터를 사용하지 않는 다른 방법으로는 **django-brace**에서 **LoginRequiredMixin**을 사용하는 것이다.

[데코레이터 사용]

```python
from django.views.generic import CreateView
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required

from .models import Post


class PostCreate(CreateView):
	model = Post

	@method_decorator(login_required(login_url='/member/login/'))
	def dispatch(self, *args, **kwargs):
		return super(PostCreate, self).dispatch(*args, **kwargs)
```

[믹스인 사용]

```python
from django.views.generic import CreateView
from brace.views import LoginRequiredMixin

from .models import Post


class PostCreate(LoginRequiredMixin, CreateView):
	model = Post
```

---

### 뷰에서 폼을 이용하여 커스텀 액션 구현하기
- 클래스 기반 뷰에서도 중복되는 폼 코드 사용 시, 장고 폼을 활용할 수 있다. 해당 폼 유효성 검사를 하기 위해서 `form_valid()`가 자리잡게 된다.

```python
from django.views.generic import CreateView
from brace.views import LoginRequiredMixin

from .models import Post


class PostCreate(LoginRequiredMixin, CreateView):
	form_class = PostForm
	# success_url = '/post/' + post_pk + '/'

	def form_valid(self, form):
		# 커스텀 로직
		return super(PostCrate, self).form_valid(form)
```

- form_valid()는 유효한 폼 양식 데이터가 POST 요청일 때 호출된다.
- 반환형은 django.http.HttpResponseRedirect 가 된다.

### 뷰 객체 이용하기
- 콘텐츠를 렌더링하는 데 클래스 기반 뷰를 사용한다면, 렌더링용 메서드와 속성을 제공하는 뷰 객체를 호출하는 방법을 고려해 볼 수 있다.

> **궁금한 점:** 121p 예제 10.11에서 폼을 사용한 부분이 어딘가요?

> **➜** 책이 잘못된 듯;
