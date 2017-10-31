---
layout: post
title:  "[Try Hello World] Level2 자연수를 뒤집어 리스트로 만들기"
category: [Solve Algorithm!, tryhelloworld]
tags:
  - Alogorithm
  - Level2
comments: true
---

## 자연수를 뒤집어 리스트로 만들기
digit_reverse함수는 양의 정수 n을 매개변수로 입력받습니다.

n을 뒤집어 숫자 하나하나를 list로 표현해주세요.

예를 들어 n이 12345이면 [5,4,3,2,1]을 리턴하면 됩니다.

- 내 풀이

```python
def digit_reverse(n):
	return [n % 10**i // 10**(i-1) for i in range(1, len(str(n))+1)]

print("결과 : {}".format(digit_reverse(12345)));
```

- 다른 사람 풀이

```python
def digit_reverse(n):
    return [int(x) for x in str(n)][::-1]
```

### *소감*
- 컴프리헨션을 리스트로 받고, 또 해당 리스트를 슬라이스로 받을 수 있다는 것을 알게되었다.
