---
layout: post
title:  "[Try Hello World] Level1 평균 구하기"
category: [Solve Algorithm!, algorithm]
tags:
  - Alogorithm
  - Level1
comments: true
---

## 평균 구하기
함수를 완성해서 매개변수 list의 평균값을 return하도록 만들어 보세요.
어떠한 크기의 list가 와도 평균값을 구할 수 있어야 합니다.

- 내 풀이

```python
def average(list):
    avg = 0
    sum = 0

    for i in list:
    	sum += i

    avg = sum / len(list)
    return avg

# 아래는 테스트로 출력해 보기 위한 코드입니다.
list = [5,3,4]
print("평균값 : {}".format(average(list)));
```

- 다른 사람 풀이

```python
def average(list):
    if len(list) == 0:
        return 0

    return sum(list) / len(list)

# 아래는 테스트로 출력해 보기 위한 코드입니다.
list = [5,3,4]
print("평균값 : {}".format(average(list)));
```

### *소감*
- sum() 메서드를 활용하면 더욱 간단하다는 것을 알게됐다.
