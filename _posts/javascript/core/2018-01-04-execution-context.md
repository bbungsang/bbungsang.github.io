---
layout: post
title:  "[JS Execution] 실행 컨텍스트"
category: [JavaScript, javascript]
tags:
  - JavaScript
comments: true
---

## 실행 컨텍스란?
자바스크립트 코드는 크게 global 코드, function 코드, eval 코드 세 가지로 분류되며, 이 모든 코드는 실행 컨텍스트에서 실행이 된다.

![](/assets/execution_context.png){: .center-image}

### 전역 실행 컨텍스트(Global Execution Context)
- 프로그램이 실행되면, 최초로 window 객체의 속성들(전역 변수, 함수 포함)이 모두 GEC로 들어오게 된다.
- GEC는 Stack의 최하단에 오직 하나만 존재하며 프로그램이 끝날 때까지 존재하여 모든 멤버가 그 내용을 공유할 수 있다.
- GEC의 상단으로 (Function 혹은 Eval)컨텍스트가 순차적으로 쌓이고 실행후 제거된다.

### 함수 실행 컨텍스트(Function Execution Context)

```
function func(x) { console.log(x) }
func("a")
func("b")
func("c")
```

- FCE는 GEC의 모든 코드에 접근할 수 있다.
- 함수가 호출되면, 실행의 흐름이 FEC로 진입하여 실행된다. 기본적으로 하나의 함수는 무한대의 컨텍스트를 생성할 수 있다.
- 위 예제의 경우, 함수가 다른 인자를 가지고 3번 호출되었기 때문에 각기 다른 3개의 FEC가 생성된다. 즉, 동일한 함수의 실행이라도 기존 컨텍스트의 재활용이 아닌 새로운 컨텍스트를 계속 생성하게 된다.

## 실행 컨텍스트의 동작 방식
- 실행 컨텍스트는 `Stack`이라는 영역에 차곡차곡 쌓이게 되고, 나중에 들어온 컨텍스트가 스택의 최상단에 위치하게 된다. **(선입후출)** 
- 최상단에 위치하는 컨텍스트를 `callee`라고 일컫으며, 이는 `현재 실행되고 있는 컨텍스트`를 의미한다.
- 이 callee는 caller를 통해서 실행하게 되는데, caller는 Stack의 최상단에 위치한 실행 컨텍스트를 가리킨다. 이 때 callee는 `Active Context`라는 이름을 가지게 된다.
- 최상단의 실행 컨텍스트인 callee는 작업을 마치면, return을 하거나 exception을 일으키며 Stack을 빠져나가게 된다.

![](/assets/global_context.jpg){: .center-image}

## 실행 컨텍스트의 구조
각각의 실행 컨텍스트는 크게 3가지의 형태로 구성되어 있으며, 언제나 1개의 `변수 객체(VO) -> 스코프 체인(SC) -> This Value` 속성 모두가 Object 형식으로 저장된다. (자바스크립트 Object 데이터 타입이 아니기 때문에 사용자가 접근할 방법이 없다.)

![](/assets/ec_structure.jpg){: .center-image}

### 변수 객체(Variable Object)
#### Lexical Environment
- 컨텍스트에서 선언된 변수, 함수들의 `참조값`을 저장하는 객체이다.
- 식별자(변수, 함수 이름)를 참조값으로 변환할 때 사용된다. 즉, 생성 후 값이 변할 수 있다.

#### Variable Enviroment
- `함수 선언식(함수 표현식은 제외)`, `변수`나 `매개 변수(prameter)`와 `인수 정보(arguments)`를 담는 곳이다.
- 생성 후 절대로 값이 변하지 않는다.

> #### 전역 컨텍스트와 함수 컨텍스트의 변수 객체
- 전역 컨텍스트의 변수 객체는 전역 변수와 전역 함수
- 함수 컨텍스트의 변수 객체는 arguments, 내부 함수, 지역 변수

> #### 왜 함수 표현식은 호이스팅이 불가능할까?
- 함수 선언식은 해당 함수의 선언, 초기화와 할당을 동시에 하지만, 함수 표현식은 선언과 초기화 단계가 분리되어 진행된다. 함수가 실행되는 시점에 초기화와 할당이 이뤄지기 때문에 초기화가 되지 않은 시점에 호출하면 ReferenceError를 일으킨다.
- 실행 시점에만 작동하고 사라지므로 다른 함수의 전달 인자로 전달될 수 있으며, 바로 호출될 수 있다. 

### 스코프 체인(Scope Chain)
- 중첩된 함수 스코프의 레퍼런스를 차례로 저장하고 있는 것으로, 현재 실행 컨텍스트(callee 혹은 Activation Object)에서 시작하여 상위 컨텍스트의 Activation Object를 가리키며 마지막에는 전역 객체를 가리킨다.
- 엔진은 이를 통해 변수의 스코프를 파악하며, 함수가 중첩 상태일 때 하위 함수 내에서 상위 함수의 유효범위까지 참조할 수 있는 것은 스코프 체인을 검색했기 때문이다.
- 즉, 중첩된 함수는 외부 함수(부모 함수)의 스코프가 내부 함수(자식 함수)의 스코프 체인에 포함된다.

### This Value
- this에 할당되는 값은 함수 호출 패턴에 의해 결정되며, 따로 설정되어 있지 않으면 window 객체를 가리킨다. 이 this를 바꾸기위해 [new 연산자]({{ site.url }}/javascript/2018/01/05/create-object.html)를 호출하는 방법이 있다.

## 참고
[PoiemaWeb - 실행 컨텍스트와 자바스크립트의 동작 원리](http://poiemaweb.com/js-execution-context)

  