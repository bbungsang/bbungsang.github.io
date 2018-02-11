---
layout: post
title:  "[Try Hello World] Level1 짝수와 홀수"
category: [Solve Algorithm!, tryhelloworld]
tags:
  - Alogorithm
  - Level1
comments: true
---

## 짝수와 홀수
evenOrOdd 메소드는 int형 num을 매개변수로 받습니다. num이 짝수일 경우 "Even"을 반환하고 홀수인 경우 "Odd"를 반환하도록 evenOrOdd에 코드를 작성해 보세요.

num은 0이상의 정수이며, num이 음수인 경우는 없습니다.

- 내가 푼 것

```python
def evenOrOdd(num):
  return "Even" if num % 2 == 0 else "Odd"

print("결과 : " + evenOrOdd(3))
print("결과 : " + evenOrOdd(2))
```

- 다른 사람 풀이

```python
def evenOrOdd(num):
    return num % 2 and "Odd" or "Even"
```
