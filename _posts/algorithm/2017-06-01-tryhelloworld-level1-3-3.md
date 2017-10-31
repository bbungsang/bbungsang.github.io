---
layout: post
title:  "[Try Hello World] Level1 서울에서 김서방 찾기"
category: [Solve Algorithm!, tryhelloworld]
tags:
  - Alogorithm
  - Level1
comments: true
---

## 서울에서 김서방 찾기
findKim 함수는 String형 배열 seoul을 매개변수로 받습니다.

seoul의 element중 "Kim"의 위치 x를 찾아, "김서방은 x에 있다"는 String을 반환하세요.

seoul에 "Kim"은 오직 한 번만 나타나며 잘못된 값이 입력되는 경우는 없습니다.

- 내가 푼 것

```python
def findKim(seoul):
    kimIdx = 0
    for i in range(len(seoul)):
        if seoul[i] == "Kim":
            kimIdx = i

    return "김서방은 {}에 있다".format(kimIdx)

print(findKim(["Queen", "Tod", "Kim"]))

```

- 다른 사람 풀이

```python
def findKim(seoul):
    return "김서방은 {}에 있다".format(seoul.index('Kim'))
```
