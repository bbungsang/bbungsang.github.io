---
layout: post
title:  "[DRF] Authentication 적용하기"
category: [DRF, drf]
tags:
  - Django
  - REST API
comments: true
---

- Authentication은 View의 시작, Permission이 수행되기 전에 실행된다.
- 인증 스키마는 클래스 단위로 정의되며, 각 클래스에 대해 인증을 시도한다. 성공적으로 인증을 한 클래스의 반환 값을 사용하여 `request.user` 및 `request.auth`를 설정한다.
- **클래스가 인증되지 않으면** request.user(User와 관련이 있다.)는 `AnonymousUser 인스턴스`로 설정되고, request.auth(Token과 관련이 있다.)는 `None`으로 설정된다.

## Authentication의 조건
일반적으로 우리가 제작한 API 데이터를 누구나 편집하거나 삭제할 수 있으며 아무런 제한이 없다. 그렇기 때문에 다음과 같은 추가 기능이 필요하다.

- 가공된 데이터는, 데이터를 제작한 사람과 늘 관련이 있다.
- 오직 인증된 유저만 데이터를 가공할 수 있다.
- 데이터를 제작한 사람만 수정하거나 삭제할 수 있다.
- 인증되지 않은 요청들(로그인 안 한 유저 혹은 해당 데이터 작성자가 아닌 유저)은 '읽기 전용'으로만 접근해야한다.

## Authentication 설정하기

기본 인증 스키마는 `settings`에서 `DEFAULT_AUTHENTICATION_CLASSES`를 사용하여 설정할 수 있다.

```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        [... 여러 종류의 인증 스키마]
    )
}
```

## API 뷰에 Authentication 적용하기

### CBV

`APIView`에서 `authentication_classes`를 통해 튜플 형태의 단위별 Authentication을 설정할 수 있다.

```python
class ExampleView(APIView):
	# 첫 번째 인증 클래스는 응답 유형을 결정할 때 사용한다.
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
    	[...]
```

- `DEFAULT_AUTHENTICATION_CLASSES`를 설정하면, 설정한 기본 인증 제도 하에 이 DRF를 실행하겠다는 의미를 전제하고 있다. 즉, 기본적으로 SessionAuthentication(모든 페이지에 세션 인증 반영)을 설정했고, 특정 페이지만 TokenAuthentication으로 인증할 경우, 해당 View에 별도로 선언해야 한다.

### FBV

또는 `@api_view` 데코레이터를 통해 FBV에서 설정할 수도 있다.

```python
@api_view(['GET'])
@authentication_classes((SessionAuthentication, BasicAuthentication))
@permission_classes((IsAuthenticated,))
def example_view(request):
	[...]
```

## 인증되지 않고 거부된 요청에 따른 응답
인증되지 않은 요청으로 권한이 거부될 때, 2개의 에러코드가 발생할 수 있다.

- **HTTP 401 Unauthorized** : `WWW-Authenticate` 헤더가 항상 포함, 클라이언트에 인증 방법 제시한다.

```
HTTP/ 1.1 401 Unauthorized
WWW-Authenticate: Basic realm="api" # 이 부분으로 인증 종류 판별
```

- **HTTp 403 Permissions Denied** : `WWW-Authenticate` 헤더가 포함되지 않는다. 요청은 성공적으로 인증됐지만 요청을 수행할 수 있는 사용 권한이 거부 된 경우 사용된다.   
