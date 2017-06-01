---
layout: post
tag: [python_basic]
title:  "파이썬 크롤링 라이브러리 - 뷰티풀수프"
category: [library]
---

## 뷰티풀수프(BeautifulSoup)
- 뷰티풀수프는 HTML과 XML로부터 데이터를 뽑기위한 라이브러리이다.
- 문서를 뷰티풀수프에 넣으면 객체가 나오는데, 이 객체는 문서롤 내포한 데이터 구조로 나타낸다.<br><br>

#### 데이터 구조를 파싱하는 방법
```python
soup.title
# <title>The bbungsnag's story</title>

soup.title.string
# The bbugnsang's story

soup.p['class']
# return class value

soup.find_all('a')
# a 태그에 해당하는 모든 값을 리스트로 반환

soup.find(id='bbungsang')
# id='bbungsang'에 해당하는 a 태그 값 파싱

for link in soup.find_all('a'):
  print(link.get('href'))
# a href 값 연속해서 파싱

soup.get_text()
# 페이지 텍스트 모두 파싱
```
<br><br>
## 해석기
뷰티플수프는 파이썬 기본 라이브러리에 있는 HTML 해석기를 지원하지만, 또한 제 3의 해석기도 지원한다. 그 대표적인 해석기로 lxml 해석기가 있다.

#### 각 해석기의 장단점
해석기 | 장점 | 단점
-|-|-
BeautifulSoup(markup, 'html.parser') | 적절한 속도 | 특정 버전에서만 관대함
BeautifulSoup(markup, 'lxml') | 아주 빠름 | 외부 C 라이브러리 의존
BeautifulSoup('lxml', 'lxml') | 아주 빠르고 유일하게 XML 해석기 지원 | 외부 C 라이브러리 의존

## 객체의 종류
#### 태그
태그객체 생성  

```html
soup = BeautifulSoup('<b class="boldest">Bold</b>')
tag = soup.b
```

- 태그마다 이름이 있고 `<태그객체>.name`으로 접근한다.

- 태그는 속성을 여러개 가질 수 있다. `<태그객체>['class']` 으로 접근하면 해당 값인 `boldest`가 반환된다.

- `<태그객체>.attrs`로 접근하면 `{'class' : 'boldest' }` 딕셔너리 형태로 반환된다.

- `<태그객체>.string.replace_with(NotBold)` 문자열을 다른 문자열로 바꾼다 `<b class='boldest'>NotBold</b>`
