---
layout: post
title:  "[AWS] 4. AWS 서버 다루기"
category: [aws]
tags:
  - aws
  - django
comments: true
---
## AWS 서버 실행하기

서버 실행 at 터미널
> ssh -i ~/.ssh/bbungsang.pem ubuntu@ec2-11-111-111-11.ap-northeast-2.compute.amazonaws.com

<br>

##### \- 해당 서버에 처음 접속한 것이라면 마치 처음으로 우분투 리눅스 운영체제를 실행하는 것과 같은 것이므로 필요한 패키지를 설치해야한다.

#### python-pip 설치
sudo apt-get install python-pip

#### zsh 설치
sudo apt-get install zsh

#### oh-my-zsh 설치
sudo curl -l http://install.ohmyz.sh | sh

#### Default shell 변경
sudo chsh ubuntu -s /usr/bin/zsh

#### pyenv requirements 설치
sudo apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev \
libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev xz-utils

#### pyenv 설치
curl -L https://raw.githubusercontent.com/yyuu/pyenv-installer/master/bin/pyenv-installer | bash

#### pyenv 설정을 .zshrc 에 기록
vi ~/.zshrc <br>
export PATH="/home/ubuntu/.pyenv/bin:$PATH" <br>
eval "$(pyenv init -)" <br>
eval "$(pyenv virtualenv-init -)"

### aws cli 통해서 로컬에 인스턴스 파일 전송하기
로컬 컴퓨터와 Linux 인스턴스 간에 파일을 전송하는 방법은 SCP(Secure Copy)를 사용하는 것이다.

1. (선택사항) `aws ec2 get-console-output --instance-id <해당 인터페이스의 아이디>` 을 통해 얻은 SSH HOST KEY FINGERPRINTS 와 aws 페이지의 finger prints 와 비교한다.

2. 명령 쉘에서 지정한 private key 파일의 위치로 이동한다.

3. chomod 를 사용하여 private key 파일을 공개적으로 볼 수 있는지 확인한다. `chmod 400 my-key-pair.pem`

4. 인스턴스의 Public DNS 를 사용하여 인스턴스 파일을 전송한다.
  - `scp -i ~/.ssh/bbungsang.pem -r /home/bbungsang/deploy-ec2 ubuntu@ec2-11-111-111-11.ap-northeast-2.compute.amazonaws.com:/srv/deploy_ec2`
  - 그 전에, AWS 서버의 root 위치의 /srv/ 의 사용자 권한을 살펴보고 권한자가 root 라면, `sudo chown -R ubuntu:ubuntu /srv/` 를 통해서 권한을 바꿔준다. 이를 통해서 ubuntu 계정이 접근하면, 쓰기 권한을 받을 수 있다.

> 명령어 살펴보기  (๑•̀ㅂ•́)و✧
- scp -i ~/.ssh/bbungsang.pem -r /home/bbungsang/deploy-ec2 ubuntu@ec2-11-111-111-11.ap-northeast-2.compute.amazonaws.com:/srv/deploy_ec2
- scp 는 원래 파일 1개만 업로드한다. 하지만 폴더 자체를 업로드하고 싶다면, 옵션 사항을 주면 된다.
- **-r .** : `r` 은 recursive `.` 은 앞에 설정한 현재 폴더를 가리킨다.
- 현재 폴더의 모든 내용을 ubuntu server 의 deploy_ec2 라는 폴더 안에 업로드한다는 의미를 가지고 있다.

### 간단한 명령어로 로컬 인스턴스 파일 전송하기
[~/.zshrc]
```python
[...]
alias con-ec2="ssh -i ~/.ssh/bbungsang.pem ubuntu@ec2-11-111-111-11.ap-northeast-2.compute.amazonaws.com"
alias delete-ec2="scp -i ~/.ssh/bbungsang.pem /home/bbungsang/deploy-ec2 ubuntu@ec2-11-111-111-11.ap-northeast-2.compute.amazonaws.com rm -rf /srv/deploy_ec2"
alias scp-ec2-ori="scp -i ~/.ssh/bbungsang.pem -r /home/bbungsang/deploy-ec2 ubuntu@ec2-11-111-111-11.ap-northeast-2.compute.amazonaws.com:/srv/deploy_ec2"
alias scp-ec2="delete-ec2 && scp-ec2-ori"
```
- 'con-ec2', 'scp-ec2' 의 간단한 명령어를 통해서 서버 실행과 인스턴스 파일 업로드가 가능해진다.
