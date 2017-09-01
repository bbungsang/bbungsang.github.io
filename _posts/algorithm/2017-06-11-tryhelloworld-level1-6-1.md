---
layout: post
title:  "[Try Hello World] Level1 최대공약수와 최소공배수"
category: [Solve Algorithm!, algorithm]
tags:
  - Alogorithm
  - Level1
comments: true
---

## 최대공약수와 최소공배수
두 수를 입력받아 두 수의 최대공약수와 최소공배수를 반환해주는 gcdlcm 함수를 완성해 보세요.

배열의 맨 앞에 최대공약수, 그 다음 최소공배수를 넣어 반환하면 됩니다.

예를 들어 gcdlcm(3,12) 가 입력되면, [3, 12]를 반환해주면 됩니다.

- 내 풀이

```python
from fractions import gcd

def gcdlcm(a, b):
    return [gcd(a,b), a*b/gcd(a,b)]

print(gcdlcm(3,12))
```

- 다른 사람 풀이

```python
def gcdlcm(a, b):
    c, d = max(a, b), min(a, b)
    t = 1
    while t > 0:
        t = c % d
        c, d = d, t
    answer = [c, int(a*b/c)]

    return answer
```

### *소감*
- 최대공약수, 최소공배수 문제의 경우, 수학적 접근이 미숙해서 결국 검색으로 찾은 gcd 모듈을 사용하였다.
- 모듈에 의존하기보다는 코드가 길어지더라도 원리를 알고 직접 풀어보는 시간을 갖는 것이 중요한 것 같다.
