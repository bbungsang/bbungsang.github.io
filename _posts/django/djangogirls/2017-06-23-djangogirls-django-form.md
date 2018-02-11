---
layout: post
title:  "장고 폼"
category: [Do 장고걸스!, djangogirls]
tags:
  - Django
  - Djangogirls
comments: true
---

> [장고걸스 튜토리얼](https://tutorial.djangogirls.org/ko/)을 토대로 작성한 것입니다. 이 장은 장고 폼에 대한 개념을 간략히 설명하고, 연관된 뷰, URL, 템플릿을 작성합니다.

장고 폼은 HTML의 복잡한 태그 없이 아주 간단히 양식을 만들 수 있고, `ModelForm`을 통하여 자동으로 모델에 결과물을 저장할 수 있다. 또한 장고 폼은 입력받은 데이터에 대한 유효성 검사를 하는 데 최상의 도구이다.

### blog 디렉토리 안에 폼 파일 만들기

```
blog
└── forms.py
```

[blog/forms.py]

```python
from django import forms

from .models import Post

class PostForm(forms.ModelForm):

    class Meta:
        model = Post
        fields = ('title', 'text',)
```

- PostForm은 만들 폼의 이름이고, ModelForm을 사용하기 위해 (forms.ModelForm)을 상속받는다.
- `class Meta` 에서 model 변수를 통해 Post 모델을 사용할 것임을 명시하고, 폼에 쓰일 필드로 'title'과 'text'를 튜플 형태로 fields 변수에 할당한다.

### 템플릿에서 폼 사용하기
