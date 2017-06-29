---
layout: post
title:  "[AWS] 1. 장고 settings 설정하기"
category: [aws]
tags:
  - aws
  - django
  - json
comments: true
---

## 1. 가상 환경 만든 후, 장고 프로젝트 실행하기

```python
> pyenv virtualenv 3.4.3 deploy-ec2
# 해당 디렉토리 이동 후 가상 환경 적용
> pyenv local deploy-ec2
# 장고 설치 후 프로젝트 생성하기
> django-admin startproject deploy-ec2
```
<br>
## 2. settings 설정하기
#### 디렉토리 구조

```txt
project_folder/
    .config_secret/
        settings_common.json
        settings_debug.json
        settings_deploy.json
    .config
        # 기존 settings.py 는 제거한다.
        settings
            __init__
            base.py
            debug.py
        [...]
    django_app/
    [...]
```
<br>
#### .config_secret 의 json 파일
- `배포 환경`과 `로컬 환경`에서 사용할 시크릿 값 설정
- <주의> json 파일의 경우, 마지막 항목에 `,`를 붙이지 않는다.
- [settings_common.json/settings_debug.json/
settings_deploy.json]()

<br>
#### 기존의 settings.py 를 가져오되 아래와 같이 설정을 추가
**[base.py]**
```python
# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ROOT_DIR = os.path.dirname(BASE_DIR)

# .config_secret 디렉토리, 하위 파일 경로 설정
CONFIG_SECRET_DIR = os.path.join(ROOT_DIR, '.config_secret')
CONFIG_SECRET_COMMON_FILE = os.path.join(CONFIG_SECRET_DIR, 'settings_common.json')
CONFIG_SECRET_DEBUG_FILE = os.path.join(CONFIG_SECRET_DIR, 'settings_debug.json')
CONFIG_SECRET_DEPLOY_FILE = os.path.join(CONFIG_SECRET_DIR, 'settings_deploy.json')

# config_secret 변수에 CONFIG_SECRET_COMMON_FILE 경로의 파일을 읽은 값을 할당
config_secret_common = json.loads(open(CONFIG_SECRET_COMMON_FILE).read())

# SECURITY WARNING: keep the secret key used in production secret!
# config_secret_common 내의 django 키값 안의 secret_key 값 할당
SECRET_KEY = config_secret_common['django']['secret_key']

# debug.py 에서 명시해주므로 아래 코드는 주석 처리한다.
# DEBUG = True
# ALLOWED_HOSTS = []
```
**[debug.py]**
```python
from .base import *

config_secret_debug = json.loads(open(CONFIG_SECRET_DEBUG_FILE).read())

DEBUG = True
ALLOWED_HOSTS = config_secret_debug['django']['allowed_hosts']
```
- *DEBUG* 와 *ALLOWED_HOSTS* 에 따라서 runserver 명령어가 달라진다.
- `./manage.py runserver` ➜ <br>
`./manage.py runserver --settings=config.settings.base` ➜ <br>
`./manage.py runserver --settings=config.settings.debug`
