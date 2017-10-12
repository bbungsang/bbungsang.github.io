---
layout: post
title:  "자바스크립트 정규표현식"
category: [JavaScript, javascript]
tags:
  - JavaScript
  - 정규표현식
comments: true
---

- 자바스크립트에서 정규표현식 패턴은 여는 `/`와 닫는 `/` 사이에 기술하면 된다.
- **[주의]** 정규표현식 패턴은 문자열이 아니기 때문에 작은따옴표나 큰따옴표를 사용하면 안된다.

### 정규표현식 특수 문자
> 예제에 사용할 문자 : **"hellllo1234!"**

| 문자 | 일치 | 예제 |
|:--:|:--:|:--|
|^|입력한 값의 시작|`/^hello/` "hello" 와 일치|
|$|입력한 값의 끝|`/lo$/` "lo" 와 일치|
|*|0번 이상 반복|`/el*/` "ellll"와 일치|
|?|0번 또는 1번 반복|`/el?/` "el" 와 일치|
|+|1번 이상 반복|`/el?/` "ellll" 와 일치|
|{n}|정확한 횟수 n번 반복|`/el{1}/` "el" 와 일치, `/el{2}/` "ell" 와 일치|
|{n,}|n번 이상 반복|`/el{2}/` "ellll" 와 일치, "el" 와 불일치|
|{n,m}|최소 n번, 최대 m번 반복|`/el{2}/` "ellll" 와 일치, "el" 와 불일치|
|\b|단어 경계 값의 시작|`/\bhell/` "hell" 와 일치|
|\B|단어 경계를 제외한 모든 문자|`/\Bl/` "l" 와 일치, `/\Bh/`의 경우, 첫 경계 단어인 "h" 와 일치|
|\d|0부터 9까지의 숫자|`/\d{3}/` "123" 와 일치, default는 {2}|
|\D|숫자를 제외한 모든 문자|`/\D{3}/` "hel" 와 일치, default는 {2}|
|\w|단어 문자(숫자 포함)|`/\w{8}/` "hellllo1" 와 일치, default는 {2}|
|\W|단어 문자가 아닌 문자, 특수 문자|`/\W/` "!" 와 일치|
|\n|줄바꿈||
|\s|하나의 공백 문자||
|\S|공백 문자가 아닌 모든 문자||
|[...]|대괄호 안의 모든 문자||

### 직접 자바스크립트에서 활용한 예시

![]({{site.url}}/assets/regexp1.png){: .center-image} <br>
![]({{site.url}}/assets/regexp2.png){: .center-image}

> 배경 : 검색한 결과를 readonly 옵션이 있는 input 창에 세팅 <br>
> 이슈 : 검색어에 해당하는 키워드에 `b태그`가 삽입되어 있다. <br>
> 하려는 일 : 세팅되는 b태그 제거 
> 해결 방법 : 자바스크립트 정규표현식 활용

```javascript
var obj = eval("(" + $('input:checkbox:checked').val() + ")");
var title = (obj.title).replace(/[</b>]/g, "");
document.getElementById('title').value = obj.title;
```

`/[</b>]/g` : 대괄호 안의 <, /, b, > 에 해당하는 모든 문자, `g`는 전역 검색을 의미. 즉, 첫 번째 일치 결과에서 멈추지 않고 전체 문자열에 대해 패턴을 검색하는 것을 의미한다.

#### 결과

![]({{site.url}}/assets/regexp3.png){: .center-image}

