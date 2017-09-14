---
layout: post
title:  "[DRF] Authentication API Reference"
category: [DRF, drf]
tags:
  - Django
comments: true
---

## BasicAuthentication
- 이 인증 체계는 username과 password에 대해 HTTP 기본 인증을 사용한다. 하지만 기본 인증은 일반적으로 테스트에 적합하다.
- 인증을 성공하면, `request.user`는 `장고 User 인스턴스`가 될 것이고, `request.auth`는 `None`이 될 것이다.  
- 인증되지 않은 요청에 대하여 권한이 거부되면 HTTP 401 Unauthorized 응답을 WWW-Authenticate 헤더와 같이 돌려받는다.

## SessionsAuthentication
- 세션 인증 체계는 장고 기본 세션 백엔드를 사용한다.
- 성공적으로 인증이 이뤄졌다면, `request.user`는 `장고 유저 인스턴스`가 될 것이고 `request.auth`는 `None`이 될 것이다.
- 인증되지 않은 요청에 대하여 권한이 거부되면, `HTTP 403 Forbidden 응답`을 돌려받는다.
- 만약 세션 인증을 AJAX 스타일의 API와 사용한다면, PUT, PATCH, POST 또는 DELETE 요청과 같은 안전하지 않은 HTTP 메서드 호출을 할 경우 `CSRF token을 포함`시켜야 한다.

### 전통적인 인증 방식(세션 인증 방식)

![session login]({{site.url}}/assets/session-login.png){: .center-image }

**1.** 사용자는 username과 password를 로그인 폼을 통해 제출한다. <br>
**2.** 서버는 Request에 대하여 DB를 순회하여 일치하는 user 정보가 있는지를 검증한다. Request가 유효하면 세션을 생성하고 세션 정보를 Response 헤더에 포함시켜 반환한다. <br>
**3.** 클라이언트는 인증된 사용자만 접근할 수 있는 페이지에 액세스할 때, 모든 Request 헤더에 세션 정보를 포함시킨다. <br>
**4.** 만약 세션 정보가 유효하면 서버측에서 사용자의 접근을 허용하고 그에 따른 렌더링된 HTML 내용을 반환한다.<br>

### 세션 로그인의 문제점

- **서버 확장시 세션 정보의 동기화 문제 발생 :** 서버 1에서 로그인을 성공했어도, 새로고침을 통해 서버2로 접근하게 되면 서버는 인증이 안됐다고 판단한다.
- **서버 세션 저장소의 부하 :** 세션은 정보를 서버에 저장한다. 하지만 세션을 각 서버에 저장하지 않고 세션 전용 DB 서버에 저장해도 문제가 생긴다. 모든 요청 시 DB 서버에 조회를 해야하기 때문에 DB 부하를 일으킬 수 있다.
- **웹&앱 간의 상이한 쿠키-세션 처리 로직 :** 웹과 앱의 쿠키 처리 방법이 다르고, 다른 Client가 생겨나면 그에 맞는 쿠키-세션을 처리해야 한다.

## TokenAuthentication
세션의 문제를 해결하는 최선의 방법은 토큰이다.

![token login]({{site.url}}/assets/token-login.png){: .center-image }

> **토큰 기반 인증을 왜 사용할까? : 프론트엔드 프로젝트와 백엔드의 독립적인 개발**
>
- 토큰 기반 인증에서 `토큰`은 요청 `헤더`를 통해 전달된다. 이를 `Stateless`라고 하는데, JSON형태의 HTTP 요청을 만들 수 있는 클라이언트라면 누구든지 서버로 요청을 보낼 수 있다는 것을 의미한다.
- 대부분의 웹 어플리케이션 내에서 `View`는 백엔드에서 렌더링이 되고, 그 결과가 브라우저로 반환된다. 이는 프론트엔드의 로직이 백엔드 코드와 의존성이 있다는 것을 의미하는데,
- 토큰 기반 인증에서 백엔드 코드는 렌더링된 HTML 대신 `JSON 응답을 반환`할 것이고, 프론트엔드는 반환된 HTML을 받아쓰는 것이 아닌, 경량화되고 압축된 버전의 독립적인 코드를 `CDN`에 넣어둘 수 있게된다.
- 사용자가 웹 페이지에 접속하면 HTML 컨텐츠는 CDN에서 제공되고, 페이지 내용은 인증 헤더의 토큰을 사용하는 API 서버에 의해 생성되어 프론트엔드와 백엔드의 독립적인 운용을 가능케한다.
- 토큰 기반 인증에서 토큰은 헤더 내에 포함되기 때문에 CSRF를 방지할 수 있다.

**1. 토큰 인증 체계를 사용하기 위해서는 `settings`의 `INSTALLED_APPS 설정`에 `rest_framework.authtoken`을 추가해야 한다.**

```
INSTALLED_APPS = (
    [...]
    'rest_framework.authtoken'
)
```

**2. rest_framework.authtoken 앱은 `Django 데이터베이스 마이그레이션을 제공`하기 때문에 설정을 변경한 후에 `migrate를 실행`해야 한다.**

![]({{site.url}}/assets/after_add_authtoken_migration.png){: .center-image }

- python manage.py migrate 명령어 실행

![]({{site.url}}/assets/authtoken_running_migrations.png){: .center-image }

- migrate 실행 후 아래와 같이 데이터베이스 테이블이 생성된 것을 확인할 수 있다.

![]({{site.url}}/assets/db_table_list.png){: .center-image }

- Token 테이블의 필드들

![]({{site.url}}/assets/db_authtoken_token_fields.png){: .center-image }

**3. 토큰 생성하기**

유저에 대하여 토큰을 생성해야하는데, **MyUser 모델에 토큰을 생성하는 함수를 정의** 하고 로그인 시 새로운 유저라면 토큰을 생성하고, 기존 유저라면 기존 토큰 값을 가져오도록 하려고 한다.

[MyUser 모델]

```python
class MyUser(AbstractUser):
	[...]

    def get_user_token(self, user_pk):
    	return Token.objects.get_or_create(user_id=user_pk)
```

[Login 시리얼라이저]

```python
class LoginSerializer(serializers.Serializer):
    """ 로그인 """
    username = serializers.CharField(max_length=36, write_only=True)
    password = serializers.CharField(max_length=64, write_only=True)
    user_type = serializers.CharField(max_length=1, )

    def validate(self, data):
        [...]

        token, created = user.get_user_token(user.pk)

        ret = {
            'token': token.key,
            'user': {
                'user_pk': user.pk,
                'username': username,
                [...]
            }
        }
        return ret
```

[Login 뷰]

```python
class LoginView(APIView):
    """ 로그인 """

    def post(self, request, format=None):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            ret = serializer.validated_data
        return Response(ret)
```

포스트맨으로 로그인 실행 예

![]({{site.url}}/assets/login_token_value.png){: .center-image }

- 성공적으로 인증이 이뤄졌다면, `request.user`는 `장고 유저 인스턴스`가 될 것이고 `request.auth`는 `rest_framework.authtoken.models.Token의 인스턴스`가 될 것이다.

**4. 클라이언트가 인증하려면 토큰 키가 인증 HTTP 헤더에 포함되어야한다. 키에는 두 문자열을 공백으로 구분하여 문자열 리터럴 "Token"을 접두어로 사용해야한다.**

```
Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b
```

**5. View에서 토큰 기반 인증을 사용하기 위해서는 Settings에 토큰 기반  인증을 사용할 것임을 선언해야 한다. 그렇지 않다면 Header에 아무리 토큰을 실어도 request.user가 AnonymousUser로 인식된다.**

```
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    )
}
```

**6. 인증이 필요한 뷰 실행**

![]({{site.url}}/assets/register_tutor.png){: .center-image }

- 헤더에 토큰을 실지 않으면 MyUser가 필요한 코드를 실행할 때, 'MyUser matching query does not exist' 오류를 뿜뿜한다.
- 토큰 인증을 기반으로 유저를 인증하는 것인데 토큰이 존재하지 않는 것이면 당연히 유저 또한 MyUser 테이블에 존재하지 않는 것이기 때문이다.

### 참고자료
- [Django rest framework 공식문서 - Authentication](http://www.django-rest-framework.org/api-guide/authentication/)
- [토큰 기반 인증](http://behonestar.tistory.com/37)

<br>
