---
layout: post
title:  "[Try Hello World] Level4 공항 건설하기"
category: [Solve Algorithm!, tryhelloworld]
tags:
  - Alogorithm
  - Level4
comments: true
---

## 공항 건설하기
1보다 큰 N개의 도시 중 한 곳에 공항을 지을 예정입니다. 사람들의 편의를 위해 공항으로부터 각 사람들까지의 도시간 이동 거리가 최소가 되는 도시에 짓기로 하였습니다. 편의상 도시는 일직선상에 놓여있다고 가정하며 좌표의 범위는 음수가 포함됩니다. 또한 좌표는 정렬되어 있지 않습니다. 직선상의 위치와 그 도시에 사는 사람들의 수가 주어질 때, 공항을 지을 도시의 위치를 반환해주는 함수 chooseCity 함수를 완성하세요. 거리가 같은 도시가 2개 이상일 경우 위치가 더 작은 쪽의 도시를 선택하면 됩니다. 예를 들어 다음과 같은 정보의 도시가 있다고 가정해 봅시다.

|위치|1|2|3|
|:---:|:---:|:---:|:---:|
|인구수|5|2|3|

이 살 경우, 각각의 도시에 공항을 지었을 때의 사람들의 이동 거리는 **8, 8, 12** 이므로 1번 또는 2번에 지을 수 있지만, **1의 위치가 더 작으므로 1을 반환**해주면 됩니다.

### 내 풀이

**[파이썬 1]**

```python
import copy

def my_choose_city1(n, city):
    tmp = copy.deepcopy(city)
    for i in range(0, n):
        sum_value = 0
        s = tmp[i][0] # s는 자기 자신 self의 의미
        for j in range(0, n):
            sum_value += tmp[j][1]*abs(tmp[j][0]-s)
            city[i][1] = sum_value
    return sorted(city, key=lambda dis: dis[1])[0][0]

# 테스트 코드
print(chooseCity(3, [[1, 5], [2, 2], [3, 3]]))
```

`이동 거리 += 인구수 * 절대값(자기 자신의 위치 - 이동할 도시의 위치)`이다. 이동 거리를 구하면 인구수가 무의미해지기 때문에 인구수에 해당하는 인덱스에 이동 거리 값으로 치환했다. 각각의 이동 거리를 다 구하고 치환시킨 후, 이동 거리가 작은 값을 기준으로 분류한다. sorted()는 기본적으로 0번 인덱스를 기준으로 정렬하기 때문에 이동 거리가 같은 값일 경우, 위치가 낮은 순으로 정렬할 것이다. 최종적으로 city의 0번 인덱스의 0번 인덱스, 1이 답에 해당한다.

하지만 이 방법은 리스트 항목만큼 시간을 쓰기 때문에 인덱스가 클 경우 시간 오버를 초래한다.

**[파이썬 2]**

```python
def my_choose_city2(n,city):
    city.sort() # sort()는 기본적으로 0번 인덱스를 기준으로 정렬
    result = city[0][0]
    left, right = 0, sum([city[i][1] for i in range(n)])
    for i in range(n-1):
        left += city[i][1]
        right -= city[i][1]
        if right > left:
            result = city[i+1][0]
    return result
```



이 풀이 방식은 [Pignuante](https://pignuante.github.io/2017-06-21/TryHelloWorldLevel4_2/)님이 푼 원리를 참고한 것이다.

먼저 위치를 기준으로 정렬을 한다. 그 이유는 중간 위치가 기준이 되기 때문이다.
해당 문제는 인구수에 따라서 최적의 이동 거리를 산출하기 때문에 총 인구수를 구한 뒤, 중간 위치를 기준으로 좌측에 총 인구수의 절반이 우측에 그 나머지 절반이 분포하고 있을 것이라 예측하는 방식을 전제로 한다. 
즉, 인구가 평균에 가까울수록, 혹은 클수록 최적의 이동 거리를 만들어낸다. 

각 인덱스에 해당하는 인구수만큼 left는 더하고(좌측의 인구수 증가) right(좌측만큼 인구수 탈락)는 뺀다. 만약 우측 인구 점유율이 좌측 점유율보다 크면 최적의 이동 거리는 뒤에 존재할 것이므로 result는 i+1 인덱스가 된다.

### 다른 사람 풀이

**[파이썬]**

```python
def other_choose_city(n,city):
    city.sort(key=lambda x: x[0])
    total = sum([x[1] for x in city])
    s = 0
    for i in range(n):
        s += city[i][1]
        if s >= (total // 2): 
            break
    return city[i][0]
```

