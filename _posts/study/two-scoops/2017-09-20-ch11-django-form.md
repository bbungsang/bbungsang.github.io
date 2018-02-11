---
layout: post
title:  "[11장] 장고 폼의 기초"
category: [두숟갈 스터디, two-scoops]
tags:
  - Django
  - Django Form
comments: true
---

## 장고 폼을 이용하여 입력 데이터에 대한 유효성 검사하기
장고 폼은 파이썬 딕셔너리의 **유효성을 검사** (딕셔너리 안에 해당 key와 value 여부, input 조건등 검사)에 최상의 도구이다.

```docker
유효성 검사는 3단계의 메서드 실행으로 이뤄지는데, form 객체를 is_valid()할 때 검사가 실행된다.

[1단계] to_python()
	- 유효성 검사의 첫 번째 단계로서, 값을 올바른 데이터 유형으로 강제 변환하고, 가능하지 않을 경우 	ValidationError를 발생시킨다. 즉 FloatField일 경우, 데이터를 Python float 타입으로 강제 	변환시킨다.

[2단계] validate()
	-  올바른 데이터 유형으로 변환된 값을 유효성 검사기에 적합한지 검사한다. 리턴되는 값은 없다.

[3단계] run_validators()
	- 위 단계를 거친 후, 유효성 검사기를 통해 잘못 입력된 값에 대하여 ValidationError를 일으킨다.

clean()은 위 3단계를 올바른 순서로 실행하고 오류를 전파한다. 유효성 검사를 통과한 깨끗한 데이터를 반환한 다음 폼의 cleaned_data 사전에 삽입한다.
```
 
뷰 단에서 유효성 검사 코드를 추가할 수 있지만, 매번 데이터가 바뀔 때마다 복잡한 유효성 검사 코드를 필요에 맞게 유지 관리하는 것은 매우 번거로운 일이다.

### HTML 폼에서 POST 메서드 이용하기
- 모든 HTML 폼은 POST 메서드를 이용하여 데이터를 전송하게 된다.
- 폼에서 POST 메서드를 이용하지 않는 유일한 경우는 `검색 폼`이다. 검색 폼은 일반적으로 `어떤 데이터도 변경하지 않기 때문`이다. 이럴 경우 GET 메서드를 이용할 수 있다.

### 데이터를 변경하는 HTTP 폼은 언제나 [CSRF]() 보안을 이용해야 한다.
`CSRF(Cross SIte Request Forgery protection), 교차 사이트 요청 위조 방지`는 사용자가 로그아웃하지 않고 유효한 세션을 계속 유지할 때 발생할 수 있는 공격으로부터 보호하는 메커니즘이다. 
CSRF 보안을 사용하지 않으면 치명적인 보안 문제를 일으킬 수 있으므로 항상 [장고의 CSRF](https://docs.djangoproject.com/en/1.11/ref/csrf/) 보안을 이용할 것을 충고한다.
장고의 `CsrfViewMiddleware`를 사이트 전체에 대한 보호막으로 이용함으로써 일일이 손으로 csrf_protect를 뷰에 데코레이팅하지 않아도 된다.
CSRF 보안을 잠시 꺼 두어도 되는 경우로는 API를 제작할 때를 들 수 있다. django-tastypie나 django-rest-framework의 API 프레임워크에서는 이러한 처리를 자동으로 다해주기 때문이다.

### AJAX를 통해 데이터 추가하기
- [AJAX]()를 통해 데이터를 추가할 때는 반드시 장고의 [CSRF]() 보안을 이용해야 한다.
- [CSRF]() 보안을 이용하기 위해서는 먼저 CSRF 토큰을 얻어야 하는데, 이를 수행하는 방법은 CSRF_USE_SESSIONS 설정 사용 여부에 따라 다르다.

**1. CSRF\_USE\_SESSIONS = False**

- 처음으로 사이트에 방문하면 쿠키를 저장하게 되는데, 이 쿠키는 `csrftoken`에 대한 정보도 저장되어있다. 그리고 그 이후부터는 데이터를 전송할 때, HTTP Header에 이 쿠키 정보를 포함하여 전송한다.
- 장고는 `csrftoken` 쿠키에 `csrfmiddlewaretoken`에 저장된 값과 동일한 값이 저장된다.

#### csrftoken cookie 가져오기 

jQuery를 사용할 경우

```java
{% raw %}
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

jQuery.ajax({
    type: 'PUT',
    url: host+'/api/users/'+id+'/',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(data),
    beforeSend: function (xhr) {
         xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    },
    success: function(data) {
        
    },
    error: function(e) {
        
    }
});
{% endraw %}
```

[JavaScript Cookie 라이브러리](https://github.com/js-cookie/js-cookie/)를 통해 csrftoken 쿠키를 얻을 경우

```java
var csrftoken = Cookies.get('csrftoken');
```

**2. CSRF\_USE\_SESSIONS = True**

- CSRF_USE_SESSIONS를 활성화한 경우, HTML에 CSRF 토큰을 포함시키고 자바스크립트를 통하여 DOM으로부터 토큰을 읽어야한다.

```java
{% raw %}
{% csrf_token %}
<script type="text/javascript">
// using jQuery
var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
</script>
{% endraw %}
```

- 마지막으로 AJAX 요청에 헤더를 설정해야하며 jQuery 1.5.1 이상의 settings.crossDomain을 사용하여 요청을 다른 도메인으로 보내지 않도록 보호해야 한다.

```java
{% raw %}
function csrfSafeMethod(method) {
    // 이 HTTP 메서드는 CSRF 보호를 요청하지 않는다.
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});
{% endraw %}
```

---

## 장고 폼에 인스턴스 속성 추가하기 
때때로 장고 폼의 clean(), clean_<field-name>(), save() 메서드에 추가로 폼 이스턴스 속성이 필여할 경우가 있다. 이럴 경우에는 `request.user` 객체를 이용하면 된다.

**[Form]**

```python
import [...]


class TasterForm(forms.ModelForm):
	class Meta:
		model = Taster
		
	def __init__(self, *args, **kwargs):
		# user 속성을 폼에 추가하기
		self.user = kwargs.pop('user')
		super(TasterForm, self).__init__(*args, **kwargs)
```

`super()`를 호출하기 이전에 `self.user`와 `kwargs`를 호출했다. 크리스토퍼 램배커(Christopher Lambacher)에 의하면 이러한 방식이 폼을 더 강력하게, 특히 다중 상속을 이용할 때 강력한 효과를 발휘한다고 한다.

**[View]**

```python
import [...]


class TasterUpdateView(LoginRequireMixin, UpdateVeiw):
	model = Taster
	form_class = TasterForm
	success_url = "/someplace/"
	
	def get_form_kwargs(self):
	""" 키워드 인자로 폼 추가 """
		# 폼 kwargs 가져오기
		kwargs = super(TasterUpdateVIew, self).get_form_kwargs()
		# kwargs의 user 업데이트
		kwargs['user'] = self.request.user
		return kwargs	
```

---

## 폼 유효성 검사하는 방법
`form.is_valid()`가 호출될 때, 여러가지 일이 다음 순서로 진행된다.

**1.** 폼이 데이터를 받으면 form.is\_valid()는 form.full_clean()을 호출한다. <br>
**2.** form.full\_clean()은 폼 필드들과 각각의 필드 유효성을 하나하나 검사하면서 다음과 같은 과정을 수행한다.

```docker
a. 필드에 들어온 데이터에 대해 to_python()을 이용하여 파이썬 형식으로 변환하거나 변활할 때 문제가 생기면 ValidationError를 일으킨다.
b. 커스텀 유효성 검사기를 포함한 각 필드에 특별한 유효성을 검사하고 문제가 있으면 ValidationError를 일으킨다.
c. 폼에 clean_<field-name>()이 있으면 이를 실행한다.
```

**3.** form.furll_clean()이 form.clean()을 실행한다. 참고로 ModelForm의 경우, form 데이터를 자동으로 모델 인스턴스로 설정하는데, ORM을 통해 모델 인스턴스를 저장할 때는 해당 모델의 clean() 메서드가 호출되지 않는다.

### ModelForm 데이터는 폼에 먼저 저장되 이후 모델 인스턴스에 저장된다.
ModelForm에서 폼 데이터는 두 가지 각기 다른 단계를 통해 저장된다.

1. 먼저 폼데이터가 폼 인스턴스에 저장된다.
2. 그 다음에 폼 데이터가 모델 인스턴스에 저장된다.

form.save()가 적용되기 전까지는 ModelForm이 모델 인스턴스로 저장되지 않기 때문에 이렇게 분리된 과정 자체를 장점으로 활용할 수 있다.

## 참고자료
- 장고 공식문서 https://docs.djangoproject.com/en/1.11/ref/csrf/