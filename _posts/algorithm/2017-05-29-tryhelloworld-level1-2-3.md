---
layout: post
title:  "[Try Hello World] Level1 정수제곱근 판별하기"
category: [Solve Algorithm!, tryhelloworld]
tags:
  - Alogorithm
  - Level1
comments: true
---

## 정수제곱근 판별하기
nextSqaure함수는 정수 n을 매개변수로 입력받습니다.

n이 임의의 정수 x의 제곱이라면 x+1의 제곱을 리턴하고, n이 임의의 정수 x의 제곱이 아니라면 'no'을 리턴하는 함수를 완성하세요.

예를들어 n이 121이라면 이는 정수 11의 제곱이므로 (11+1)의 제곱인 144를 리턴하고, 3이라면 'no'을 리턴하면 됩니다.

- 내가 푼 것

```python
def nextSqure(n):
    sqrt = n ** (1/2)
    if (sqrt % 1) == 0:
    	return (sqrt + 1) ** 2
    return "no"

print("결과 : {}".format(nextSqure(169)));
```

- 다른 사람 풀이

```python
def nextSqure(n):
    for x in range(1, n):
        if x ** 2 == n:
            return (x+1) ** 2
    return "no"
```
