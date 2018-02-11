---
layout: post
title:  "[TypeScript] About TypeScript"
category: [TypeScript, typescript]
tags:
  - JavaScript
  - TypeScript
comments: true
---

## What's TypeScript?
`HTML5`의 등장은 Flash, Silverlight, ActiveX 등 Plug-in에 의존하는 기존의 구축 방식을 `JavaScript`로 대체시켰다. 이는 과거에 서버에서 담당하는 많은 업무를 클라이언트 측으로 이동시켰고, JavaScript의 위상을 높아지게 하였다.

JavaScript는 Java 또는 Python과 같은 Class 기반 객체지향 언어에 익숙한 개발자에게 혼란과 디버그, 테스트 공수가 증가하는 등의 문제를 야기시킬 수 있기 때문에 대규모 개발시에는 주의해야 한다.

> #### JavaScript의 다른 객체지향 언어와 구별되는 대표적인 특징
- Prototype-based Object Oriented Language
- Scope와 this
- 동적 타입(dynamic typed) 언어 혹은 느슨한 타입(loosely typed) 언어 

이와 같은 JavaScript의 태생적 문제를 극복하기 위한 노력의 일환으로 CoffeeScript, Dart, Haxe 등의 `AltJS(JavaScript 대체 언어)`가 등장했다.

### TypeScript
- TypeScript 또한 AltJS의 하나로, C#의 창시자인 Anders Hejlsberg의 주도로 Microsoft에서 개발하였다.
- 2012년에 발표한 오픈 소스로 정적 타이핑, 클래스, 모듈, Decorator 등과 같은 객체지향적인 부분을 지원하는 JavaScript의 슈퍼셋이다.

![](/assets/javascript_superset.png){: .center-image}

> #### TypeScript의 주요 특징
JavaScript + 정적타입 + 객체지향적 문법 = JavaScript의 Superset

## History and Goal
#### 타입스크립트의 핵심 개발자인 Anders hejlsberg 曰
- 자바스크립트가 대규모 어플리케이션에 적합하지 않다는 내부 팀과 고객사의 불평들을 대응하기 위해 만들어졌다.
- 클래스, 모듈, 정적 타이핑과 같은 것들을 통해 자바스크립트 강화 + 최소한의 표준을 시작으로 대규모 JavaScript 어플리케이션을 간단하게 만드는 것이 목표이다.

## Why use?
### 1. 정적 타이핑으로 컴파일 시점에 타입을 체크
에러가 발생할 경우 컴파일 타임 에러가 런타임 에러보다 낫다.

> #### 정적타이핑과 동적타이핑
**[정적 타이핑]**
- Compile-Time 때, type checking을 수행
- 처음 변수의 타입이 정해지면 그 후에도 변경할 수 있다.
>
**[동적 타이핑]**
- Run-Time 때, type checking을 수행 <br />
- 변수의 타입이 프로그램의 어느 시점에서든 변경이 가능하다.

> #### 컴파일 타임 에러와 런타임 에러
**[컴파일 타임 에러]**
- 문법상에서의 에러가 많다.
- 키워드 맞춤법이 틀리거나 필요한 문장 부호를 빠뜨리거나 선언되지 않는 변수 사용 등
>
**[런타임 에러]**
- 문법상으로는 에러가 없지만 실행시켰을 떄 에러가 나는 경우
- 0으로 나눌 때, 무한 루프에 빠질 때, Null point error, 존재하지 않는 메모리 위치에 접근하려 할 때 등 

### 2. 인터페이스, 추상 클래스 등 객체 지향 프로그래밍 패턴의 도입
- OOP 언어에 익숙한 개발자의 JavaScript 프로젝트에 대한 진입 장벽을 낮춘다.
- OOP가 갖는 장점을 활용하여 JavaScript를 대규모 프로젝트에 적용할 수 있다.

### 3. 문서화
- 제대로 된 Type annotation은 그 자체로 문서화이다.
- 자바스크립트 문서화 도구인 JSDoc가 type annotation을 지원하는 것과 일맥상통.

### 4. 지원
- 커뮤니티의 노력으로 운영되는 다른 언어들에 반해 TypeScript는 공식적으로 MS 지원을 받는다.
- 인기있는 Vim, Webstorm, Atom 등과 같은 인기있는 에디터들이 모두 지원한다.

> #### CoffeeScript VS TypeScript
- CoffeeScript는 다른 언어(완전히 다른 문법을 배워야 하며, 언어의 철학이 별도로 존재),
- TypeScript는 자바스크립트의 상위언어집합으로, Anders Heglsberg가 "자바스크립트를 알고 있다면 타입스크립트는 이미 알고 있는 것, 결국엔 자바스크립트이다."라고 하였다.
- CoffeeScript는 정적 타입의 특성을 갖지 않는다.

## 참고
[PoiemaWeb - TypeScript 소개와 개발 환경 구축](http://poiemaweb.com/typescript-introduction)
