---
layout: post
title:  "[Try Hello World] Level2 2016년"
category: [Solve Algorithm!, algorithm]
tags:
  - Alogorithm
  - Level2
comments: true
---

## 2016년

2016년 1월 1일은 금요일입니다. 2016년 A월 B일은 무슨 요일일까요? 두 수 A,B를 입력받아 A월 B일이 무슨 요일인지 출력하는 getDayName 함수를 완성하세요.

요일의 이름은 일요일부터 토요일까지 각각

`SUN,MON,TUE,WED,THU,FRI,SAT`

를 출력해주면 됩니다. 예를 들어 A=5, B=24가 입력된다면 5월 24일은 화요일이므로 `TUE` 를 반환하면 됩니다.

- 내 풀이

```python
from datetime import date

def getDayName(a,b):
    week_list = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
    week_int = date(2016, a, b).weekday()
    return week_list[week_int]

#아래 코드는 테스트를 위한 출력 코드입니다.
print(getDayName(1,3))
```

- 다른 사람 풀이

```python
def getDayName(a,b):
    months = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    days = ['FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU']
    return days[(sum(months[:a-1])+b-1)%7]
```

## *소감*
- 다른 사람의 경우 내장 함수 안 쓰고 푼 좋은 예인 것 같다.
