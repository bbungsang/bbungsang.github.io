---
layout: post
title:  "[Try Hello World] Level5 2 x n 타일링"
category: [Solve Algorithm!, tryhelloworld]
tags:
  - Alogorithm
  - Level5
comments: true
---

1x1 정사각형 2개가 붙어 있는 타일이 있습니다. 이 타일을 이용하여 총 2xN 의 보드판을 채우려고 합니다.

타일은 가로, 세로 두 가지 방향으로 배치할 수 있습니다.

보드판의 길이 N이 주어질 때, 2xN을 타일로 채울 수 있는 경우의 수를 반환하는 tiling 함수를 완성하세요.

예를들어 N이 7일 경우 아래 그림이 타일을 배치할 수 있는 한 경우입니다.

![tiles]({{site.url}}/assets/tiles.png){: .image-center }

단, 리턴하는 숫자가 매우 커질 수도 있으므로 숫자가 5자리를 넘어간다면 맨 끝자리 5자리만 리턴하세요.

예를 들어 N = 2일 경우 가로로 배치하는 경우와 세로로 배치하는 경우가 있을 수 있으므로 2를 반환해 주면 됩니다.

하지만 만약 답이 123456789라면 56789만 반환해주면 됩니다. 리턴하는 숫자의 앞자리가 0일 경우 0을 제외한 숫자를 리턴하세요.

리턴타입은 정수형이어야 합니다.

- 내 풀이

```python
def tiling(n):
	a, b = 0, 1

	for i in range(n):
		a, b = b, a+b

	answer = b % 100000
	return answer

print(tiling(4))
```

- 다른 사람 풀이

```python
from math import factorial

def comb(n,k):
    f=factorial
    return f(n)//(f(k)*f(n-k))

def tiling(n):
    s=int(n%2)
    t=int((n-s)/2)
    answer=0
    while s<=n:
        answer+=comb(s+t,s)
        s+=2
        t-=1
    return int(str(answer)[-5:])
```

### *소감*
- 그림을 그리면서 규칙을 살펴보니, 피보나치 수열이었다. 그래서 피보나지 수열 푸는 방식으로 풀었다.
- 알고보면 간단한 문제였는데 다른 사람의 경우 함수를 더 정의한다든지, 모듈을 임포트한다든지 여러 방법으로 접근하였다.
- 문과적 기질이 빛을 발휘한 문제였던 것 같다.
