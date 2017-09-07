---
layout: post
title:  "도커 명령어"
category: [도커, docker]
tags:
  - Docker
comments: true
---

> Project Root Directory 바로 하위 Dockerfile 은 eb deploy 할 때, 자동으로 docker build 가 실행된다.

### sudo 없이 명령어 사용하기
- docker는 기본적으로 root 권한이 필요하다.
- root가 아닌 사용자가 sudo 없이 명령어를 사용하려면 해당 사용자를 docker 그룹에 추가해야한다.

```
>>> sudo usermod -aG docker $USER(현재 사용자) / bbungsang('bbungsang'이라는 사용자)
```

### 설치 확인하기

```
>>> docker version
```

- `Client`와 `Server`가 각각 존재하고 있음을 확인할 수 있다.
- 도커 커맨드를 입력하면 도커 클라이언트가 도커 서버로 명령을 전송하고 결과를 받아서 터미널에 출력해주는 것이다.

### 컨테이너 실행하기

- docker 실행 명령어

```
>>> docker run [OPTIONS] IMAGE[:TAG|@DIGEST] [COMMAND] [ARG...]
```

- 'ubuntu:16.04 컨테이너를 생성하고 컨테이너 내부에 진입하기

```
>>> docker run ubuntu:16.04
# 정상적으로 실행됐지만 무엇을 하라고 명령어를 따로 전달하지 않았기 때문에 생성 혹은 (존재할 경우)실행되자마자 종료된다.

>>> docker run --rm -it ubuntu:16.04 /bin/bash
# -rm : 프로세스 종료시 컨테이너 자동 제거
# -it : -i와 -t를 동시에 사용한 것, 터미널에서 키보드 입력을 위한 옵션
# /bin/bash : 컨테이너 내부에 들어가기 위해 bash 쉘 실행

>>> exit
# bash 쉘 종료, 컨테이너도 같이 종료된다.
```

### 기본 명령어

```
>>> docker ps
# 컨테이너 목록 확인

>>> docker stop [OPTIONS] CONTAINER [CONTAINER...]
# 실행 중인 컨테이너 중지, 띄어쓰기로 구분하여 여러개 중지가 가능하다.

>>> docker rm [OPTIONS] CONTAINER [CONTAINER...]
# 컨데이너 제거, 여러개 제거 가능

>>> docker images [OPTIONS] [REPOSITORY[:TAG]]
# 이미지 목록 확인

>>> docker pull [OPTIONS] NAME[:TAG|@DIGEST]
# 이미지 다운로드

>>> docker rmi [OPTIONS] IMAGE [IMAGE...]
# 이미지 삭제
```

## 도커 실행 후 자동 서버 실행 스크립트

### [.dockerfile/Docker.ubuntu] : 변하지 않을 과정으로, 확정된 부분을 미리 생성한 것이다.


- 해당 스크립트에서는 y/n 에 대해 대답할 수 없기 때문에 -y 옵션을 줘야한다.

```docker
# ubuntu 에서 시작
FROM            ubuntu:16.04
# 관리자
MAINTAINER      bbungsang@gmail.com

RUN             apt-get -y update
RUN             apt-get install -y python-pip
RUN             apt install -y git vim
```

- 의존성 패키지 설치 후, pyenv 설치

```docker
RUN             apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev \
libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev xz-utils
RUN             curl -L https://raw.githubusercontent.com/yyuu/pyenv-installer/master/bin/pyenv-installer | bash
```

- ~/.bash_profile 파일 설정 추가 후, 파이썬 3.6.1 설치

```docker
RUN             echo 'export PATH="/home/ubuntu/.pyenv/bin:$PATH"' >> ~/.bash_profile
RUN             echo 'eval "$(pyenv init -)"' >> ~/.bash_profile
RUN             echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.bash_profile
RUN             . ~/.bash_profile
ENV             PATH /root/.pyenv/bin:$PATH

RUN             pyenv install 3.6.1
```

- zhs 설치 후, pyenv를 ~/.zshrc 에 적용, 가상환경 생성

```docker
RUN             apt-get -y install zsh
RUN             wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true
RUN             chsh -s /usr/bin/zsh

RUN             echo 'export PATH="/home/ubuntu/.pyenv/bin:$PATH"' >> ~/.zshrc
RUN             echo 'eval "$(pyenv init -)"' >> ~/.zshrc
RUN             echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.zshrc

# 가상환경 'elass' 생성
RUN             pyenv virtualenv 3.6.1 elass
```

- uWSGI, Nginx, supervisor 설치

```docker
##
# uWSGI install
#   virtualenv 내부에서 pip isntall 을 해줘야한다.
#   local 에서는 pyenv virtualenv elass 명령어를 실행하면 자동으로 가상환경이 적용되었지만,
#   도커에서는 그럴 수 없으므로, 직접 찾아서 작업할 수 있도록 경로를 다 기입해야 한다.
#   가상환경 내부 binary 의 pip 를 실행해서 install uwsgi
##
RUN             /root/.pyenv/versions/elass/bin/pip install uwsgi
RUN             apt-get -y install nginx
RUN             apt-get -y install supervisor
```

> **[dockerfile 작성후 이미지 빌드 명령어]** <br>
> `docker build -t eb_ubuntu . -f .dockerfiles/Dockerfile.ubuntu` <br>
> - docker build -t <사용할 이미지 이름> <프로젝트 경로( . : 커맨드라인을 실행하는 현재 위치)> -f \<Dockerfile이 존재하는 경로>