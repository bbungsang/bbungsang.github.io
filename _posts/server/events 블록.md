```
##
# events 블록
#	- 네트워크 동작 방법과 관련된 설정값을 가진다.
# 	- http, server, location 블록과는 상속 관계를 갖지 않는다. 
##
```

sudo 권한을 deploy 유저에게 위임
sudo -u deploy /home/ubuntu/.pyenv/versions/<pyenv-name>/bin

uwsgi --ini .config_secret/uwsgi/deploy.ini 만 입력하면 permission denied 된다. 왜? ubuntu 계정이 depoly 권한만 접근할 수 있는 uwsgi 를 실행하려 했기 때문. 따라서 sudo -u deploy /home/ubunt/.pyenv/versions/<pyenv-name>/ 를 앞에 더 기입해야한다.

실행 후, ec2.sock 과 ec2.pid 가 생성된다.

root 계정 권한 수정 
chown -R deploy:deploy /tmp/