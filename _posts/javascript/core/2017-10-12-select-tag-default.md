---
layout: post
title:  "select 태그의 selected 옵션 차등 부여하기"
category: [JavaScript, javascript]
tags:
  - JavaScript
  - selectedIndex
comments: true
---

> **배경 :** 책 카테고리에 대해서 select, option 태그 적용<br>
> **이슈 :** 어떤 책이든지 상관없이 첫 번째 option의 value인 '언어'만 세팅된다.<br>
> **하려는 일 :** 책 제목에 따라서 option의 value를 다르게 세팅<br>
> **해결 방법 :** if문 분기 처리 + include() + `selectedIndex` 활용

![]({{site.url}}/assets/select1.png){: .center-image}

## selectedIndex 활용 예시

```javascript
if (title.includes('운영체제') || title.includes('리눅스') || title.includes('OS')) {
      document.getElementById('id_category').selectedIndex = 1;
    }
    else if (title.includes('알고리즘') || title.includes('자료구조') || title.includes('Algorithm')) {
      document.getElementById('id_category').selectedIndex = 2;
    }
    else if (title.includes('네트워크') || title.includes('TCP') || title.includes('IP') || title.includes('프로토콜')) {
      document.getElementById('id_category').selectedIndex = 3;
    }
    else if (title.includes('데이터베이스') || title.includes('SQL') || title.includes('DB')) {
      document.getElementById('id_category').selectedIndex = 4;
    }
```

- `title.include('...☆')` 책 제목에 '...☆'에 해당하는 문자열이 존재하면,
- id가 id_category인 select 태그의 selected 옵션을 각각 해당하는 index에 맞게 부여한다.

#### 결과

![]({{site.url}}/assets/select2.png){: .center-image}