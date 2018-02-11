---
layout: post
title:  "[Try Hello World] Level1 수박수박수박수박수박수?"
category: [Solve Algorithm!, tryhelloworld]
tags:
  - Alogorithm
  - Level1
comments: true
---

## 수박수박수박수박수박수?
water_melon함수는 정수 n을 매개변수로 입력받습니다.

길이가 n이고, 수박수박수...와 같은 패턴을 유지하는 문자열을 리턴하도록 함수를 완성하세요.

예를들어 n이 4이면 '수박수박'을 리턴하고 3이라면 '수박수'를 리턴하면 됩니다.

- 내가 푼 것

```python
def water_melon(n):
    bowl = []
    su = "수"
    bak = "박"

    for i in range(1, n+1):
        if i % 2 == 0:
            bowl.append(bak)
        else:
            bowl.append(su)

    result = ''.join(bowl)

    return result

print("n이 3인 경우: " + water_melon(3));
print("n이 4인 경우: " + water_melon(4));
```

- 다른 사람 풀이

```python
def water_melon(n):
    s = "수박" * n
    return s[:n]
```

### *소감*
- 허무하게도 저렇게 간단한 방법이 있었다니... 분발해야겠다.
