---
layout: post
title:  "[Javascript Core] 함수 선언과 함수 리터럴"
category: [JavaScript, javascript]
tags:
  - JavaScript
comments: true
---

함수는 모든 언어에서 핵심 개념이지만 자바스크립트에서 특히 강력하다고 한다. 어떤 점이 강력하다는 것일까?

> - (...)
- [프로토타입]() 객체를 통해 공통되는 동작을 공유한다.

## 함수선언(Function Declaration)
함수 문장(Function Statement)으로, `실행 가능한 코드 블럭이 아니다.`
함수의 정의를 나타내는 문장으로 코드 해석에 따른 `수행 경로가 존재하지 않는다.`
실행하여도 어떠한 결과도 반환되지 않는다는 의미로 함수선언문을 클래스와 동일한 개념으로 이해해도 된다.

함수 호이스팅 o


## 함수표현(Function Expression)
변수에 저장
다른 함수에 전달
정의하여 바로 호출

함수 호이스팅 x, 호이스팅에 영향을 받지 않는다, 클로저로 사용, 콜백으로 사용