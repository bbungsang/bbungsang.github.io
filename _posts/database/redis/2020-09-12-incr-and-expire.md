---
layout: post
title:  "[Redis] INCR 명령어와 INCRBYFLOAT 명령어"
category: [redis]
tags:
  - Database
  - NoSQL
  - Redis
comments: true
---

## INCR
* 숫자를 1씩 증가시킨다.
* 데이터베이스에 KEY가 없을 경우, KEY를 SET하고 0을 기준으로 1을 더한다.
* 단, VALUE가 레디스의 가장 큰 야의 정수 범위(2^63 − 1)를 초과했을 경우 에러가 발생한다.

```redis
> SET count 0
OK
> INCR count
1
> INCR count
2
> GET count
"2"
> DEL count
1
> INCR count
1
> GET count
"1"
> SET count 234293482390480948029348230948
OK
> INCR count
ERR value is not an integer or out of range
```

## INCRBYFLOAT
* 지정한 숫자만큼 증가시킨다.
* 데이터베이스에 KEY가 없을 경우, KEY를 SET하고 0을 기준으로 지정한 숫자만큼 더한다.
* 음수도 지정할 수 있다.

```redis
> SET count 0
OK
> INCRBYFLOAT count 0.3
"0.3"
> INCRBYFLOAT count 0.3
"0.6"
> DEL count
1
> INCRBYFLOAT count 0.3
"0.3"
> INCRBYFLOAT count 0.3
"0.6"
> INCRBYFLOAT count -0.3
"0.3"
> INCRBYFLOAT count -0.3
"0"
```
