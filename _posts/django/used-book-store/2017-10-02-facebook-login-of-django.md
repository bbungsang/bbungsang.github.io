---
layout: post
title:  "페이스북 로그인 플로우 직접 빌드 in Django"
category: [Django Project, Used Book Store]
tags:
  - Django
  - Social Login
comments: true
---

> facebook for developers의 [Facebook 로그인 문서](https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow)를 참고하여 작성하였습니다. <br>
> 틀린 내용이 있다면 언제든 문의주세요:D

### 로그인 대화 상자 호출 및 리다이렉션 URL 설정하기

```html
{% raw %}
<a href="https://www.facebook.com/v2.9/dialog/oauth?client_id={{ facebook_app_id }}&redirect_uri={{ site_url }}{% url 'member:facebook_login' %}&scope=email">페이스북 로그인</a>
{% endraw %}
```

- 페이스북 로그인을 클릭하면 페이스북 로그인 대화 상자가 호출되고, 인증 성공시 페이스북 로그인 뷰를 실행하게 된다.
- 엔드포인트 필수 매개변수로는 `client_id`, `redirect_uri`가 있다.
- **client_id**는 앱 등록후 발급받은 앱 ID이며, **redirect_uri**는 인증 성공후 장고 어플리케이션에서 회원가입 혹은 로그인을 하도록 리다이렉트 할 URL이다.
- 예를 들어 내 사이트의 경우, **http://localhost:8000/member/login/facebook**에서 페이스북 로그인 뷰를 실행하므로 이 주소가 **redirect_uri**가 된다.
- {% raw %}`{{ facebook_app_id }}`와 `{{ site_url }}`은 `context_processor`에 별도로 지정해 놓은 장고 템플릿 태그이다. {% endraw %}

#### 내 프로젝트 디렉토리 구조(페이스북 로그인 위주)

![]({{site.url}}/assets/facebook_login_project_structure.png){: .center-image }

### ID 확인
액세스 토큰을 생성하기 전에 사용자가 응답 데이터가 있는 사용자인지 확인해야 한다. 선택적 매개변수인 `response_type`에 따라 여러 다른 방식으로 ID 확인을 수행할 수 있다.

- **code** : 각 로그인 요청에 고유한 암호화된 문자열로, `서버에서 토큰을 처리`할 때 유용하다. 코드가 수신되면 엔드포인트를 사용하여 액세스 토큰과 교환을 해야한다. 이 호출에서 `앱 시크릿 코드`가 사용되므로 서버 간에 이루어져야 한다. (시크릿 코드는 클라이언트 코드에 있지 않아야 한다.)

```python
code = request.GET.get('code')
```

### 액세스 토큰과 코드의 교환
액세스 토큰을 얻으려면 다음과 같이 엔드포인트에 HTTP GET 요청을 한다.

```
GET https://graph.facebook.com/v2.10/oauth/access_token?
   client_id={app-id}
   &redirect_uri={redirect-uri}
   &client_secret={app-secret}
   &code={code-parameter}
```

<br>
**[파이썬 in Django]** <br>
utils/apis/get_information.py `get_facebook_access_token()`

```python
def get_facebook_access_token(request, code):
    exchange_access_token_url = 'https://graph.facebook.com/v2.9/oauth/access_token'
    redirect_uri = '{}{}'.format(
        settings.SITE_URL,
        request.path,
    )
    exchange_access_token_url_params = {
        'client_id': settings.FACEBOOK_APP_ID,
        'redirect_uri': redirect_uri,
        'client_secret': settings.FACEBOOK_SECRET_CODE,
        'code': code,
    }

    # requests를 사용하여 GET 요청
    response = requests.get(
        exchange_access_token_url,
        params=exchange_access_token_url_params,
    )

    # 응답받은 데이터 json 형태로 변형
    result = response.json()

    # 응답받은 결과값에 'access_token'이라는 key가 존재하면,
    if 'access_token' in result:
        # access_token key의 value를 반환
        return result['access_token']
    elif 'error' in result:
        raise Exception(result)
    else:
        raise Exception('Unknown Error')
```

### 액세스 토큰 검사하기
graph API 엔드포인트를 사용하여 액세스토큰의 검사를 수행할 수 있다.

```
GET graph.facebook.com/debug_token?
     input_token={token-to-inspect}
     &access_token={app-token-or-admin-token}
```

- **input_token** : 검사가 필요한 토큰
- **access_token** : 개발자의 액세스 토큰

**[파이썬 in Django]** <br>
utils/apis/get_information `facebook_debug_token()`

```python
def debug_token(input_token):
    access_token = '{}|{}'.format(
        settings.FACEBOOK_APP_ID,
        settings.FACEBOOK_SECRET_CODE,
    )
    debug_token_url = 'https://graph.facebook.com/debug_token'
    debug_token_url_params = {
        'input_token': input_token,
        'access_token': access_token,
    }
    response = requests.get(debug_token_url, debug_token_url_params)
    result = response.json()

    if 'error' in result['data']:
        raise DebugTokenException(result)

    return result
```

성공적인 응답을 받으면 다음과 같은 형태의 데이터를 가져올 것이다.

```json
{
    "data": {
        "app_id": 138483919580948,
        "application": "봉자달봉중고서점",
        "expires_at": 1352419328,
        "is_valid": true,
        "issued_at": 1347235328,
        "metadata": {
            "sso": "iphone-safari"
        },
        "scopes": [
            "email",
            "publish_actions"
        ],
        "user_id": 1207059
    }
}
```

### 사용자 정보 가져오기
이렇게 얻은 `access_token`과 `user_id` 필드를 통해 사용자 정보를 가져올 수 있다.

```
GET graph.facebook.com/v2.9/{user_id}?
     access_token={access_token}
     &fields={가져오고자하는 필드, 'field1,field2,field3...'의 문자열 형태}
```

<br>
**[파이썬 in Django]** <br>
utils/apis/get_information `facebook_get_user_info()`

```python
def facebook_get_user_info(user_id, access_token):
    url_user_info = 'https://graph.facebook.com/v2.9/{user_id}'.format(user_id=user_id)
    url_user_info_params = {
        'access_token': access_token,
        'fields': ','.join([
            'id',
            'email',
            'picture',
        ])
    }
    response = requests.get(url_user_info, params=url_user_info_params)
    result = response.json()

    return result
```

<br><br>

## 페이스북 로그인 실행하기

### 페이스북 전용 유저 매니저

```python
class MyUserManager(DefaultUserManager):
	def get_or_create_facebook_user(self, user_info):
		username = user_info.get('email', '')
		my_photo = user_info.get('picture', '')
		nickname = '{}_{}'.format(
			self.model.USER_TYPE_FACEBOOK,
			user_info['id']
		)

	user, user_created = self.get_or_create(
		username=username,
		user_type=self.model.USER_TYPE_FACEBOOK,
		my_photo=my_photo['data']['url'],
		nickname=nickname,
	)

	return user
```

### 페이스북 로그인 뷰

```python
def facebook_login(request):
    code = request.GET.get('code')

    # code가 없으면 에러 메세지를 request에 추가하고 이전 페이지로 redirect
    if not code:
        return error_message_and_redirect_referer(request)

    try:
        access_token = get_facebook_access_token(request, code)
        debug_result = facebook_debug_token(access_token)
        user_info = facebook_get_user_info(user_id=debug_result['data']['user_id'], access_token=access_token)
        user = MyUser.objects.get_or_create_facebook_user(user_info)

        django_login(request, user)
        return redirect('book:main')
    except GetAccessTokenException as e:
        print(e.code)
        print(e.message)
        return error_message_and_redirect_referer(request)
    except DebugTokenException as e:
        print(e.code)
        print(e.message)
        return error_message_and_redirect_referer(request)
```

[>> 카카오 로그인]()

<br>
