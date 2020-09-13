---
layout: post
title:  "[Javascript] Prototype - 1"
category: []
tags:
  - Javascript
  - OOP
  - Functional Programming
comments: true
---

### 자바스크립트는 함수형 프로그래밍 언어?
어느 날, 이 아무개 친구가 나에게 물었다.
"Javascript는 함수형 프로그래밍 언어잖아, 다른 객체지향 프로그래밍 언어와 비교해서 말해줄 수 있어?"
그 질문을 듣고 나는 Javascript가 함수형 프로그래밍 언어라고 생각하면서 사용한 적이 없는데 왜 저런 질문을 할까?라는 생각이 들었다.

사실 나는 함수형 프로그래밍 언어에 대해 잘 모른다. 그런데 어떻게 Javascript는 함수형 프로그래밍 언어라고 생각하고 사용한 적이 없다고 결단을 내렸을까?
함수형 프로그래밍 언어의 `언어`를 `사고`로 치환해서 생각해 보았다.
그렇다. 그 동안 나는 Javascript를 객체지향 프로그래밍 사고에 입각해서 사용해 왔던 것이다.

Javascript에는 함수형 프로그래밍을 할 수 있도록 도와주는 기능이 있지만 나는 함수형으로 사고하여 프로그래밍을 한 적이 없다.
어떻게 Javascript에서 객체지향 프로그래밍을 했던 걸까? 객체지향 프로그래밍을 할 수 있도록 해준 `프로토타입`에 대해 알아보고자 한다.

### 프로토타입
우리가 흔히 알고 있는 Java나 C++는 클래스를 기반으로 객체지향 프로그래밍이 가능하다. 이와 달리 자바스크립트는 프로토타입을 기반으로 객체지향 프로그래밍을 할 수 있다.
Javascript는 클래스를 통해 객체를 생성하지 않고 클래스 없이 객체를 생성할 수 있다. (하지만 ES2015부터 class 키워드를 지원하기 시작했으나, 문법적인 양념일 뿐이며 자바스크립트는 여전히 프로토타입 기반의 언어다.)

Javascript의 모든 객체는 자신의 부모 역할을 담당하고 있는 객체와 연결되어 있고, 부모 역할을 담당하고 있는 객체의 프로퍼티를 상송 받아 사용할 수 있다.
부모 역할을 담당하는 객체를 일컫어 `프로토타입`이라고 한다.

### [[Prototype]]
각각의 객체는 `[[Prototype]]`이라는 속성을 가지는데 자신의 프로토타입이 되는 다른 객체를 가리킨다.
`[[Prototype]]`의 값은 null 또는 `[[Prototype]]` 객체이며 `__proto__` accessor property로 접근할 수 있다.

아래 코드를 보자.
pockmon 객체는 `__proto__` 프로퍼티로 자신의 부모 객체인 `Object.prototype`을 가리킨다.

```javascript
const pokemon = {
  name: '피카츄',
}

console.log(pokemon.__proto__ === Object.prototype) // true
```

도대체 `__proto__`는 무엇일까?

우리가 pokemon 객체의 프로퍼티에 접근할 때, 우선 pokemon 객체가 프로퍼티를 갖고 있는지 확인한다.
프로퍼티를 갖고 있지 않을 때에는 pokemon 객체의 `__proto__`가 프로퍼티를 갖고 있는지 확인한다.
만약 프로퍼티를 pokemon 객체의 `__proto__`에서 찾을 수 없다면 그 다음엔 pokemon 객체의 `__proto__`의 `__proto__`에서 찾을 것이다.

이와 같이 계속 `__proto__` 에서 값을 찾고 `__proto__`가 없을 때 비로소 프로토타입 체이닝 검사를 마치고 프로퍼티의 값이 `undfined`라고 결론 짓는다.

```javascript
const pokemon = {
  name: '피카츄',
}

pokemon.__proto__ = { type: '전기' }
pokemon.__proto__.__proto__ = { attack: '10만볼트' }

console.log(pokemon.name) // 피카츄
console.log(pokemon.type) // 전기
console.log(pokemon.attack) // 10만볼트
console.log(pokemon.gender) // undefined
```

객체를 생성할 때 프로토타입은 결정된다. 결정된 프로토타입 객체는 다른 임의의 객체로 변경할 수 있다. 이것은 부모 객체인 프로토타입을 동적으로 변경할 수 있다는 것을 의미한다.
이러한 특징을 활용하여 객체의 상속을 구현할 수 있다.

### 함수 객체의 prototype 프로퍼티
함수도 객체이므로 `[[Prototype]]`을 갖는다. 그러나 함수 객체는 일반 객체와 달리 `prototype` 프로퍼티도 갖는다.

#### [[Prototype]]
* 함수를 포함한 모든 객체가 가지고 있다.
* 객체의 입장에서 자신의 부모 역할을 하는 프로토타입 객체를 가리키며 함수 객체의 경우 `Function.prototype`을 가리킨다.

```javascript
function Pokemon(name) {
  this.name = name
}

console.log(Pokemon.__proto__ === Function.prototype) // true
```

#### prototype 프로퍼티
* 함수 객체만 가지고 있는 프로퍼티이다.
* 함수 객체가 생성자로 사용될 때 생성된 인스턴스의 부모 역할을 하는 객체(프로토타입)를 가리킨다.

```javascript
function Pokemon(name) {
  this.name = name
}

const pikachu = new Pokemon('피카츄')

console.dir(Pokemon) // prototype 프로퍼티가 있다.
console.dir(pikachu) // prototype 프로퍼티가 없다.

console.log(Pokemon.prototype === pikachu.__proto__) // true
```

## 참고 자료
* [Poiemaweb - 5.14 Prototype](https://poiemaweb.com/js-prototype)
* [MDN - 상속과 프로토타입](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain)
