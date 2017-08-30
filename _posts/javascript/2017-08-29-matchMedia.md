---
layout: post
title:  "자바스크립트에 미디어쿼리를 사용하는 법, matchMedia()"
category: [JavaScript, javascript]
tags:
  - JavaScript
  - CSS
comments: true
---

## 자바스크립트에서 CSS 미디어쿼리 사용하기
- 웹사이트를 반응형으로 만들기위해서 **CSS 미디어쿼리** 를 사용해야 한다.
- CSS 미디어쿼리를 사용하면 다양한 크기의 디바이스가 존재하는 상황에서도 모두 적절한 화면을 제공할 수 있다.

#### 내 이야기
- 반응형에 자바스크립트가 적용되는 경우, oo 사이즈에서는 A 자바스크립트가 적용돼야하지만 xx 사이즈에서도 해당 자바스크립트가 적용될 경우 화면이 굉장히 부자연스러워질 수 있다.
- 나 같은 경우는 `사이드바`가 (15인치 풀스크린)화면에 드러나면 그 만큼 화면이 옆으로 밀리고, 사이드바가 사라지게 되면 영역이 본래 크기로 돌아가게 하고 싶어서 자바스크립트를 사용했다.
- 적용이 잘된 것을 확인하고 꿀잠을 자려고 하는데!
- 잠을 자기 전엔 웹툰을 보는 것이 인지상정 아닌가? 다 구독하고 문득 생각나서 내 블로그로 이동했다.    
- 이럴수가, 화면이 작아지면 `사이드바`(좌우)가 `드롭다운 형태`(상하)로 바뀌는데, 위아래로 메뉴가 이동할 때 마다 화면이 좌우로도 움직이더이다.
- 그 까닭은 자바스크립트를 화면이 클 때, 작을 때의 분기처리를 하지않았기 때문이었다.
- 그런데 자바스크립트는 {% raw %}@media{% endraw %}를 어떻게 쓰는걸까?

#### JavaScript에도 CSS 미디어쿼리를 처리할 수 있는 matchMedia 함수가 존재한다.

```
var m = matchMedia("CSS 미디어쿼리");
```

- 위와 같이 CSS에서 사용하는 미디어쿼리문을 그대로 사용할 수 있다.

```
m.media // "CSS 미디어쿼리"
m.matches // true
```

- `matchMedia()` 는 **MediaQueryList** 를 반환하는데 이 객체는 `media` 와 `metches` 라는 두 프로퍼티를 갖고있다.
- `media` 는 미디어쿼리 문자열을 반환하고, `matcheds` 는 현재 화면이 미디어쿼리 범위에 들어가면 `true` 를 반환한다.

[예제]

```java
if (matchMedia("(max-width: 768px)").matches){
  $('.fa-bars').click(function () {
    if ($('#sidebar > ul').is(":visible") === true) {
      $('#sidebar').css({
      });
      $('#sidebar > ul').hide();
      $("#container").addClass("sidebar-closed");
    } else {
      $('#sidebar > ul').show();
      $('#sidebar').css({
      });
      $("#container").removeClass("sidebar-closed");
    }
  });
} else {
  $('.fa-bars').click(function () {
    if ($('#sidebar > ul').is(":visible") === true) {
      $('#sidebar').css({ // 사이드바가 없을 때
          'margin-left': '-210px',
          'transition': '0.5s'
      });
      $('#content').css({
        'margin-left': '10px',
        'width': '69.5%',
        'transition': '0.5s'
      });
      $('#widget').css({
        'width': '29%'
      });
      $('#sidebar > ul').hide();
      $("#container").addClass("sidebar-closed");
    } else {
      $('#sidebar > ul').show();
      $('#sidebar').css({
          'margin-left': '0',
          'transition': '0.5s'
      });
      $('#content').css({
        'margin-left': '220px',
        'width': '59%',
        'transition': '0.5s'
      });
      $('#widget').css({
        'width': '25%'
      });
      $("#container").removeClass("sidebar-closed");
    }
  });
}
```

> 자스알못이라 틀린 내용이 다소 포함될 수 있으니 양해부탁드립니다.
