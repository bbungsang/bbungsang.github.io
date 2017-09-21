---
layout: post
title:  "[14장] 템플릿 태그와 필터"
category: [두숟갈 스터디, two-scoops]
tags:
  - Django
  - Django Template
comments: true
---

장고 템플릿은 단순히 장고 템플릿 언어를 사용하여 마크업된 파이썬 문자열이다. 장고는 수십 가지 기본 템플릿 [태그]()와 [필터]()를 제공한다.

템플릿 태그는 {% raw %}`{%` 와 `%}`{% endraw %}로 둘러쌓인다.

```html
{% raw %}
{% if user.is_authenticated %}
	Hello, {{ user.username }}.
{% endif %}
{% endraw %}
```

필터는 변수 및 태그 인수의 값을 변환한다.

```html
{% raw %}
{{ django|title }}
{% endraw %}
```

템플릿 태그를 커스텀할 경우 아래와 같은 경우는 참고할 만한 최고의 방법론이 된다.

- 모든 기본 템플릿과 태그의 이름은 명확하고 직관적이어야 한다.
- 모든 기본 템플릿과 태그는 각각 한 가지 목적만을 수행한다.
- 기본 템플릿과 태그는 영속 데이터에 변형을 가하지 않는다.

## 1. 필터
### 1-1. 필터는 함수다.
필터는 `장고 템플릿 안`에서 `파이썬을 이용`할 수 있게 해주는 `데코레이터를 가진 함수`일 뿐이다. 즉, 필터는 일반 함수들처럼 호출될 수 있다는 의미이기도 하다.

### 1-2. 필터의 재사용
하지만 대부분의 장고 템플릿 필터 로직은 다른 라이브러리를 상속했기 때문에 장고 템플릿 필터의 코드를 재사용하기 보다는 상속했던 라이브러리를 바로 임포트하여 사용하는 것을 권장한다.

즉 예를 들어 `django.template.defaultfilters.slugify`를 임포트할 필요 없이 `django.utils.text.slugify`를 바로 임포트하여 사용하면 된다. 

```python
# /template/defaultfilters.py

from django.utils.text import slugify as _slugify

@register.filter(is_safe=True)
@stringfilter
def slugify(value):
    return _slugify(value)
```

```python
# /utils/text.py

@keep_lazy(str, SafeText)
def slugify(value, allow_unicode=False):
    value = str(value)
    if allow_unicode:
        value = unicodedata.normalize('NFKC', value)
    else:
        value = unicodedata.normalize('NFKD', value).encode('ascii', 'ignore').decode('ascii')
    value = re.sub(r'[^\w\s-]', '', value).strip().lower()
    return mark_safe(re.sub(r'[-\s]+', '-', value))
```

> 필터 자체를 임포트하면 코드에서 추상화된 레벨이 하나 더해지므로 훗날 디버깅이 필요할 때 약간 복잡해질 우려도 있다. 또한 두 개의 인자만을 받을 수 있는 기능적 제약 때문에 필터를 복잡하게 응용하기가 매우 어렵다.

### 1-3. 그렇다면 필터를 언제 사용해야하는가?
필터는 데이터의 외형을 수정하는 데 매우 유용하다. 따라서 REST API 혹은 다른 출력 포맷에서 손쉽게 재사용할 수 있다.

## 2. 템플릿 태그
### 2-1. 템플릿 태그들은 디버깅하기가 쉽지 않다. 
복잡한 템플릿 태그들은 디버깅하기 까다롭다. 이 경우 로그와 테스트를 통해 도움을 받을 수 있다.

### 2-2. 템플릿 태그는 재사용하기가 어렵다.
출력 포맷은 동일 템플릿 태그를 이용하여 처리하기란 쉽지 않은 일이다. 여러 종류의 포맷이 필요하다면 다른 뷰에서도 ㅜ십게 접근할 수 있도록 템플릿 태그 안의 모든 로직을 utils.py로 옮기는 것을 고려해보자.

### 2-3. 템플릿 태그의 성능
- 템플릿 태그 안에 또 다른 템플릿을 로드할 경우 심각한 성능 문제를 야기할 수 있다. 따라서 장고에서 어떻게 템플릿이 로드되는지에 대한 깊은 이해가 필요하다.
- 커스텀 템플릿 태그가 많은 템플릿을 로드한다면, [로드된 템플릿을 캐시하는 방법](https://docs.djangoproject.com/en/1.8/ref/templates/api/#django.template.loaders.cached.Loader)을 고려할 수 있다.

### 2-4. 언제 템플릿 태그를 사용할 것인가
HTML을 렌더링하는 작업이 필요할 때 사용할 것을 권장한다.

### 2-5. 템플릿 태그 라이브러리 이름 짓기와 템플릿 테그 모듈 로드하기
[커스텀 템플릿](https://docs.djangoproject.com/en/1.11/howto/custom-template-tags/) 언어로 표현하고자 하는 것은 아래 그림과 같다.<br><br>

![]({{site.url}}/assets/custom_template.png){: .center-image } <br>

배찌라는 닉네임 뒤 괄호 안 username 일부를 가리고, '*' 문자로 표현하기와 데이터베이스에 IntegerField로 등록되는  별점 데이터를 별 이모티콘으로 표현하기이다.  

**[django 1.8 버전]**

템플릿 태그 라이브러리 작명 관례는 `<app_name>_tags.py`다.

```python
# django_app/book/book_tags.py

from django import template

register = template.Library()


@register.filter
def star(value):
    return "⭐" * value


@register.filter
def hide(value):
    return value.replace(value[4:], "*****")
```

settings에 해당 템플릿 태그를 사용할 것임을 선언해야 한다.

```python
# django_app/config/settings.py

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            TEMPLATE_DIR,
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'libraries': {
                'book_tags': 'book.book_tags',
            },
        },
    },
]
```

HTML에서 사용

```html
{% raw %}
{% extends 'common/base.html' %}

{% load book_tags %}
{% endraw %}
```

**[django 1.10 버전]**

파이썬 파일을 만들고 settings에 별도로 선언하는 이전 버전과 달리 사용하려는 앱에 `templatetags`라는 이름의 파이썬 패키지를 생성하고 파일을 작성하면, 장고 자체에서 자동으로 인식하여 해당 템플릿 태그를 사용할 수 있도록 한다.

```python
# django_app/book/templatetags/comment.py

from django import template

register = template.Library()


@register.filter
def star(value):
    return "⭐" * value


@register.filter
def hide(value):
    return value.replace(value[4:], "*****")
```

HTML에서 사용

```html
{% raw %}
{% extends 'common/base.html' %}

{% load comment %}
{% endraw %}
```

## 마치며...
지금 시중에 번역되어 있는 책은 장고 1.8 버전이다. 그렇기 때문에 최신 버전의 장고에 적용하는 면에 있어서 적합하지 않는 부분이 많은 것 같다.