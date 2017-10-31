---
layout: post
title:  "[Try Hello World] Level1 약수의 합"
category: [Solve Algorithm!, tryhelloworld]
tags:
  - Alogorithm
  - Level1
comments: true
---

## 약수의 합
어떤 수를 입력받아 그 수의 약수를 모두 더한 수 sumDivisor 함수를 완성해 보세요.

예를 들어 12가 입력된다면 12의 약수는 [1, 2, 3, 4, 6, 12]가 되고, 총 합은 28이 되므로 28을 반환해 주면 됩니다.

- 내 풀이

```python
from functools import reduce

def sumDivisor(num):
    divisor = []
    for i in range(num):
        if num % (i+1) == 0:
            divisor.append(i+1)
    return reduce(lambda x, y: x + y, divisor)
```

- 다른 사람 풀이

```python
def sumDivisor(num):
    return sum([ i for i in range(1,num+1) if num%i==0])
```
