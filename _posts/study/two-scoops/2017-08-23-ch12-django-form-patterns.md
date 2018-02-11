---
layout: post
title:  "[12장] 폼 패턴들"
category: [두숟갈 스터디, two-scoops]
tags:
  - Django
comments: true
---

## 패턴 1: 간단한 모델폼과 기본 유효성 검사기

### 제네릭 뷰
- 뷰에서 모델에 기반을 둔 ModelForm 을 자동 생성한다.
- 생성된 ModelForm 이 모델의 기본 필드 유효성 검사기를 이용하게 된다.

### 유효성 검사기

[core/validators.py]

```python
from django.core.exceptions import ValidationError


def validate_tasty(value):
    """ 단어가 'Tasty'로 시작되지 않으면 ValidationError 발생 """
    if not value.startswith('Tasty'):
        msg = 'Must start with Tasty'
        raise ValidationError(msg)
```

### 모델 상속(Model Inheritance)
- Abstract Base Classes
- Multi-table Inheritance
- Proxy Model

### Abstract Base Classes
- 가장 특별하지 않은 상속 방법

[config/models.py]

```python
from django.db import models

from .validators import validate_tasty


class TastyTitleAbstractModel(models.Model):
    title = models.CharField(
        max_length=255,
        validators=[validate_tasty]
    )

	# TastyTitleAbstractModel 을 추상화 모델로 만들어 준다.
    class Meta:
        abstract = True
```

- 부모 모델인 TastyTitleAbstractModel 이 실제로 또는 물리적으로 존재하지 않는 가상 클래스가 된다.
- 자식 모델들은 부모 모델의 필드와 속성 함수들을 다 물려받아 실체가 있는 DB 테이블이 된다.
- 즉, 자식 모델들이 부모 모델 없이 독립적인 DB 테이블로 존재하며, 자식과 부모의 상속 관계는 실재하지 않는 것이 된다.
- 공통된 필드가 많이 있는 모델 클래스들이 있을 때 유용하다.

```python
from django.db import models

from core.models import TastyTitleAbstractModel


class Cake(TastyTitleAbstractModel):
    color = models.CharField(max_length=24)
```

- TastyTitleAbstractModel 클래스를 상속받는 모델들은 `title` 이 'Tasty'로 시작되지 않을 경우 유효성 검사 에러를 발생시킨다.

![title-error]({{ site.url }}/assets/title_error.png){: .center-image }

---

## 패턴 2: 모델폼에서 커스텀 폼 필드 유효성 검사기 이용

[flavors/forms.py]

```python
class CakeForm(forms.ModelForm):
    """ 커스텀 폼 """
    def __init__(self, *args, **kwargs):
        super(CakeForm, self).__init__(*args, **kwargs)
        self.fields["title"].vlidators.append(validate_tasty)
        self.fields["color"].vlidators.append(validate_tasty)

    class Meta:
        model = Cake
```

[flavors/views.py]

```python
class CakeActionMixin(object):
    model = Cake
    fields = (
        'title',
        'color',
    )

    @property
    def success_msg(self):
        return NotImplemented

    def form_valid(self, form):
        messages.info(self.request, self.success_msg)
        return super(CakeActionMixin, self).form_valid(form)


class CakeCreateView(LoginRequiredMixin, CakeActionMixin, CreateView):
    success_msg = 'created'
    form_class = CakeForm


class CakeUpdateView(LoginRequiredMixin, UpdateView):
    success_msg = 'updated'
    form_class = CakeForm


class CakeDetailView(DetailView):
    model = Cake
```

- CakeCreateView, CakeUpdateView 에서 입력된 데이터 유효성 검사를 위해 CakeForm 이용
- 패턴1, 2: validate_tasty() 코드를 변경하지 않고 이용할 수 있다. 해당 코드를 새로운 곳에 임포트하는 것만으로 바로 이용할 수 있다.

---

## 패턴 3: 유효성 검사의 클린 상태 오버라이딩 하기
- 다중 필드에 대한 유효성 검사
- 이미 유효성 검사가 끝난 데이터베이스의 데이터가 포함된 유효성검사
- 커스텀 로직으로 clean() 또는 clean_<field name>() 을 오버라이딩 할 수 있는 최적의 경우

#### 어째서 유효성 검사에 또 한 번의 유효성 검사를 거치는가?
- clean() 메서드는 두 개 혹은 그 이상의 필드들에 대해 서로 간의 유효성 검사가 가능하다.
- 이미 유효성 검사를 일부 마친 데이터에 대해 불필요한 데이터베이스 연동을 줄일 수 있다.

---

## 패턴 4: 폼 필드 해킹하기(두 개의 CBV, 두 개의 폼, 한 개의 모델)
- 나중에 입력할 데이터를 위해 `blank=True`가 명시돼있는 필드를 포함하여 레코드를 생성하는 경우가 있다.

#### MyUser Model

```python
class MyUser(AbstractUser):
	my_photo = CustomImageField(
        upload_to='user/%Y/%m/%d',
        blank=True,
    )
	email = models.EmailField(
        blank=True,
    )
	nickname = models.CharField(
        max_length=24,
        blank=True
    )
```

- ModelForm 에서 사용자가 기본으로 username, password 필드를 입력해야하지만,
- my_photo, email, nickname 필드는 입력하지 않아도 되도록 구성되어 있다.
- 사용자가 처음 username, password 필드만 입력한 상태로 이용하는 데 문제가 없지만,
- 나중에 사용자가 튜터 등록할 때, my_photo, email, nickname 필드를 추가적으로 업데이트하는 것이 가능하도록 구성한 것이다.

#### TutorRegister Form

[나쁜 예제] - 따라하지 말 것! 모델 필드 정의를 반복해서 이용

```python
class TutorRegisterForm(forms.ModelForm):
	my_photo = forms.ImageField(required=True)
	email = forms.CharField(required=True)
	nickname = forms.CharField(required=True)

	class Meta:
		model = MyUser
```

[좋은 예제] - ModelForm \__init__() 메서드에서 새로운 속성을 적용

```python
class TutorRegisterForm(forms.ModelForm):
	class Meta:
		model = MyUser

	def __init__(self, *args, **kwargs):
		# 필드 오버로드 전 원래 __init__ 메서드 호출
		super(TutorRegisterForm, self).__init__(*args, **kwargs)
		self.fields["my_photo"].required = True
		self.fields["email"].required = True
		self.fields["nickname"].required = True
```

#### 상속을 통해 코드 줄이기

```python
class SignUpForm(forms.ModelForm):
	class Meta:
		model = MyUser
		fields = ('username', 'password')

class TutorRegisterForm(SignUpForm):
	def __init__(self, *args, **kwargs):
		super(TutorRegisterForm, self).__init__(*args, **kwargs)
		self.fields["my_photo"].required = True
		self.fields["email"].required = True
		self.fields["nickname"].required = True

	class Meta(SignUpForm.Meta):
		fields = ('username', 'password', 'my_photo', 'email', 'nickname')
```

#### 폼 클래스를 이용한 뷰

```python
class SignUpView(CreateView):
	model = MyUser
	form_class = SignUpForm

class TutorRegisterView(UpdateView):
	model = MyUser
	form_class = TutorRegisterForm
```
