---
layout: post
title:  "[장고 기본편] 6. Migrations"
category: [travel]
tags:
  - Django
  - AskDjango
  - Migrations
  - Fields
comments: true
---

>| ٩(๑òωó๑)۶ 아, 아, 마이크 테스트 |<br>
이 마크다운은 이진석 선생님의 'Ask Django VOD 장고 기본편(Feat.여행 블로그 만들기)'를 토대로 작성되었습니다.

<br>
# Migrations
- 초기에 테이블 최초 생성만 가능하고 변경된 내용은 반영하지 않는 `syncdb` 명령어가 있었지만, django-south 프로젝트가 킥스타터 펀딩을 통해, Django 1.7에 마이그레이션을 포함하였다.
- 모델 변경내역 히스토리 관리가 가능
- 모델의 변경내열을 데이터베이스 스키마(데이터베이스 데이터 구조)로 반영시키는 효율적인 방법을 제공

<br>
#### 관련 명령어
\# 'python manage.py' 는 공통이므로 생략하겠습니다.
- `makemigrations <app-name>` : 마이그레이션 파일(초안) 생성
- `migrate <app-name>` : 해당 마이그레이션 파일을 DB에 반영

```text
[모델 내역 #4]            
[모델 내역 #3]                        [DB Schema #3]
[모델 내역 #2] ---> [변경 내역 #2] ---> [DB Schema #2]
[모델 내역 #1]      [변경 내역 #1]      [DB Schema #1]
<Django 모델>     <마이그레이션파일>       <데이터베이스>
```
- 내역이 하나 생기면 알아서 데이터베이스에 반영되면 좋겠지만, 장고는 2단계를 거친다.
- 1단계: makemigrations 명령으로 (어떤식으로 데이터베이스 내용을 변경시키겠다는)작업지시서 생성
  - 이 작업 후에 개발자는 필히 해당 파일을 열어서 확인하는 과정이 필요하다.
  - 반영이 안 된 마이그레이션은 제거해도 무관하다.
- 2단계: migrate 명령으로 데이터베이스에 반영
- 왜 굳이 2단계인가?
  - 모델 내역 그대로 데이터베이스 반영되는 것은 매우 위험한 일이 될 수 있다.
  - 어떤 작업을 수행할 것인지에 대한 내역서를 만드는 것은 일종의 안정장치이다.

- `showmigrations <app-name>` : 마이그레이션 적용 현황
- `sqlmigrate <app-name> <migration-number>` : 지정 마이그레이션에 대한 SQL을 볼 수 있다.

<br>
###### 마이그레이션 되돌리기
1. `./manage.py migrate <app-name> <migration-number>` 명령어 입력.
2. 되돌린만큼의 마이그레이션을 삭제한다.
3. `./manage.py showmigrations`을 통해서 지워졌는지 확인

<br>
#### **Migrate** (Forward/Backward)
> Forward/Backward 명령어가 따로 있는 것이 아니라 `migrate` 명령어 하나로 다 해결할 수 있다.

- `./manage.py migrate <app-name>`
  - 미적용 마이그레이션 파일부터 최근 마이그레이션 파일까지 "Forward 마이그레이션"이 순차적으로 수행
- `./manage.py migrate <app-name> <migration-file-name>`
  - 지정된 마이그레이션 파일이 현재 적용된 마이그레이션보다 이전이라면 이후의 마이그레이션을 취소하고 마지막 상태의 마이그레이션을 지정된 마이그레이션으로 사용하겠다는 뜻(Backward)
  - 그 반대로 이후의 마이그레이션이라면 해당 마이그레이션만 수행하겠다는 의미이다.(Forward)
- `./manage.py migrate zero`
  - 모든 마이그레이션을 취소하겠다는 의미이다.

<br>
### **id 필드**
- 모든 데이터베이스 테이블에는 각 Row의 식별기준인 `기본키(Primary Key)`가 필요하다.
    - 즉, 중복되는 데이터가 없다.(데이터베이스의 무결성)
- Django 에서는 기본키로 id 필드(AutoField)가 디폴드로 지정되어 있다.
- 기본키는 줄여서 `pk`로 접근 가능

<br>
### 기존에 없는 필수필드를 추가하고 마이그레이션 할 때
- 여기에서 필수필드란? blank, null 옵션을 주지 않은 것
- 필수필드이기 때문에 이전 데이터가 해당 컬럼값을 가지고 있지 않다면, 반드시 넣어줘야한다.
- 따라서 마이그레이션을 할 때, 아래와 같은 질의를 던진다.
  - 선택1) 지금 값을 입력
  - 선택2) 모델 클래스를 수정하고 다시 명령어를 수행

```text
You are trying to add a non-nullable field 'author' to post without a default; we can't do that (the database needs something to populate existing rows).
Please select a fix:
 1) Provide a one-off default now (will be set on all existing rows with a null value for this column)
 2) Quit, and let me add a default in models.py
Select an option:

# 추가한 필수 필드에 어떤 값을 채워넣어야할 지 모르겠으니
1)장고 모델의 디폴트 값을 제공해주겠다.
2)사용자가 임의로 값을 지정을 하든, 옵션 필드로 변경을 하든 하겠다.
를 선택하시오
```
###### 1번 선택 시 :-)
```text
Select an option: 1
Please enter the default value now, as valid Python
The datetime and django.utils.timezone modules are available, so you can do e.g. timezone.now
Type 'exit' to exit this prompt
>>> 'anonymous'
```
- 빈 컬럼에 대하여 'anonymous' 값을 주겠다.
- 반드시 필드 타입에 맞춰서 줄 것


<br>
### *결론*
마이그레이션은 모든 테이블 Row에 대한 컬럼이 추가되므로 데이터 양이 방대하면 문제가 발생할 수 있다. 애초에 설계를 신중하게 하는 것을 지향할 것
