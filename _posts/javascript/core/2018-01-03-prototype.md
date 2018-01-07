---
layout: post
title:  "[JS Function] 프로토타입에 대해서"
category: [JavaScript, javascript]
tags:
  - JavaScript
comments: true
---

자바스크립트는 OOP(객체지향 언어)는 아니지만 클래스의 개념은 존재한다고 한다. `프로토타입`을 통해 클래스와 유사한 형태를 구현할 수 있기 때문에 자바스크립트를 흔히 프로토타입 기반 언어라고 한다. 프로토타입이 도대체 뭘까?

> **사전적 의미:** 대량 생산에 앞서 미리 제작해보는 원형 또는 시제품. <br /><br />
<i style="color: skyblue; font-size: 14px;">네이버 지식 백과에서 발췌</i>

## 프로토타입 기반 프로그래밍?
- 프로토타입은 `원형, 원본`이라는 의미를 가지고 있으며, 자바스크립트에서 프로토타입은 `객체의 원형`이라는 뜻이다.
- 프로토타입은 클래스와 같은 역할을 하며, `function`과 `new 연산자`를 통해 OOP의 클래스를 표현할 수 있다.

![](/assets/new_ryan.png){: .center-image}

![](/assets/prototype_ex.png){: .center-image}

- `constructor`: 생성자는 f Ryan()이다.
- `__proto__`: Ryan 객체를 만들어내기 위해 사용된 객체 원형으로의 연결고리, 해당 객체의 프로토타입.
- 즉, new 연산자를 통해 만들어진 인스턴스는 f Ryan() 프로토타입을 사용하여 만들어졌다는 의미이다.

### prototype object와 prototype link

![](/assets/prototype_ex2.png){: .center-image}

- 원형 객체에서 this 키워드로 고정시킨 값은 this 키워드가 그 값을 가르키기 때문에 값을 변경할 수 없다. (new 연산자로 생성된 인스턴스는 원형 객체에서 this 키워드로 바인딩된 프로퍼티만 접근할 수 있다.)
- 하지만 prototype 속성을 통해서 값을 할당하면, `Ryan.prototype`이라는 빈 Object에 새로운 식별자일 경우 프로퍼티의 추가, 기존 식별자일 경우 값을 변경하는 형태로 프로토타입 오브젝트의 프로퍼티를 인스턴스들이 공유할 수 있다.


