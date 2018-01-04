---
layout: post
title:  "[JS Variable] 전역 변수와 지역 변수"
category: [JavaScript, javascript]
tags:
  - JavaScript
comments: true
---

## 전역 변수
전역 변수란 제일 바깥 범위, 함수 안에 포함되지 않은 변수를 뜻한다. 즉, `window 객체`에 변수를 만드는 것이다.

> #### window 객체와 document 객체
- window 객체는 브라우저 전체를 담당한다.
- document 객체는 `window 객체의 속성`으로 웹사이트만 담당하여 html에 관한 것들을 다룬다. 즉, html 태그를 선택하고 조작할 수 있다. (window 객체 <-- document 객체)
- window는 글로벌 객체로서 모든 객체를 다 포함하고 있기 때문에 생략이 가능하다. 즉, `window.alert("Hi")`의 경우, `alert("Hi")`만 써도 무방하다.
>
```javascript
var global = "전역 변수";
console.log(window.global);
// "전역 변수"
```

### 전역 변수를 만드는 일은 최대한 지양하자. Why?
- 전역 변수가 많이 선언될 수록 메모리 누수율이 높아지게 되고 이는 애플리케이션의 성능 문제를 초래할 수 있다. 
- 여러 함수의 접근으로 값이 변경될 경우, 의도치 않은 결과값을 얻을 수 있다. 
- 협업을 할 때, 우연의 일치로 같은 변수 이름을 사용해서 이전의 변수를 덮어쓰는 불상사를 일으킬 수 있다.

## 지역 변수
지역 변수란 함수 안에 변수를 선언하는 것이며, 함수 내부에서 return하거나 전역 변수에 할당하는 것이 아니라면 해당 함수 범위 내에서만 유효하다.




