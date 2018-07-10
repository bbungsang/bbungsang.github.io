---
layout: post
title:  "[Javascript Core] 객체 리터럴과 new 연산자"
category: [JavaScript, javascript]
tags:
  - JavaScript
comments: true
---

## new 연산자
### 객체지향 언어에서 new 연산자(Java를 예로 들어보자.)
- 기본 타입과 참조 타입은 이미 기본으로 있는 것이지만, 사용자 정의 클래스의 경우는 Runtime 환경에서 생성되는 데이터 타입이기 때문에 Heap 영역에 할당된다.
- new 연산자는 인스턴스를 생성해주는 역할을 하고, 이 방법으로 변수에 인스턴스를 할당하면 해당 객체의 실제 데이터가 아닌 참조값을 갖는다. 즉, Heap 영역에 데이터를 저장할 공간을 할당받고 사용하고자 하는 클래스(데이터 타입)의 참조값을 변수에 반환하는 것이다.
- 클래스(데이터 타입)의 인스턴스를 핸들링하기 위해서는 new 연산자를 통해 참조값을 저장한 객체로만 접근이 가능하다.

![](/assets/java_new.png){: .center-image}

### JavaScript에서 new 연산자
new 연산자로 인스턴스를 생성할 경우, <br />
\#1. 멤버가 없는 객체 생성 <br />
\#2. 프로토타입 객체의 프로토타입을 가리킴 <br />
\#3. 프로토타입 객체의 생성자 호출 후, `this 포인터`로 새로 만든 객체에 전달 <br />
\#4. 생성자는 전달 인자에 따라 객체를 초기화한다.

```javascript
// 프로토타입 생성
function A(member) {
	this.member = member
}

// 인스턴스 생성
const a = new A("Ryan") // A {name: "Ryan"}

/*
* 인스턴스 생성 과정
* 1. a = {}
* 2. a.__proto__ = A.prototype
* 3. A가 실행되며 A의 this 키워드가 a를 가리킨다.
* 4. A {name: "Ryan"}
*/
```

new 없이 인스턴스를 생성했다면 생성자 내부 this가 전역을 가리킨다. 생성자 내부에 this.member 와 같이 정의했을 경우, 전역 객체에 member라는 새로운 프로퍼티가 생성된다.

> #### 3. this 포인터로 새로 만든 객체에 전달
this 포인터가 가리키는 프로퍼티만 new 연산자로 만든 인스턴스에 전달된다.
>
```javascript
function A() {
  let name = "피카츄"
  this.color = "yellow"
}
a = new A() // A {color: "yellow"}
a.name // undefined
a.color // yellow
```

## 객체 리터럴 VS new 연산자

### 객체 리터럴
- 객체 리터럴로 객체생성 방법으로는 prototype 영역 정의를 할 수 없다.
- 선언과 동시에 인스턴스를 생성한다. (즉, new 연산자가 필요없다.)

### new 연산자
- prototype 영역을 사용하기 위해 객체 생성 전에 정의를 미리 해야한다.
- 생성된 객체(인스턴스)가 공유하는 메소드를 정의하기 위해서는 prototype 영역을 사용해야한다.