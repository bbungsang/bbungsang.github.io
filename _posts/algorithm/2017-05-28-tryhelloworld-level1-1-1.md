---
layout: post
title:  "[Try Hello World] Level1 x만큼 간격이 있는 n개의 숫자"
category: [Solve Algorithm!, algorithm]
tags:
  - Alogorithm
  - Level1
comments: true
---

## x만큼 간격이 있는 n개의 숫자
number_generator함수는 x와 n을 입력 받습니다.

2와 5를 입력 받으면 2부터 시작해서 2씩 증가하는 숫자를 5개 가지는 리스트를 만들어서 리턴합니다.

[2,4,6,8,10]

4와 3을 입력 받으면 4부터 시작해서 4씩 증가하는 숫자를 3개 가지는 리스트를 만들어서 리턴합니다.

[4,8,12]

이를 일반화 하면 x부터 시작해서 x씩 증가하는 숫자를 n개 가지는 리스트를 리턴하도록 함수 number_generator를 완성하면 됩니다.

- 내가 푼 것

```python
def number_generator(x, n):
    list = []
    for i in range(n):
        data = x * (i + 1)
        list.append(data)
    return list

print(number_generator(3,5))
```

- 다른 사람 풀이

```python
def number_generator(x, n):
    return [i * x + x for i in range(n)]

print(number_generator(2, 5))
```

### *소감*
- 컴프리헨션 공부하자!