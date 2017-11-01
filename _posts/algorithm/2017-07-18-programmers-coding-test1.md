---
layout: post
title:  "[Programmers Summer Coding] 원형으로 연결되어 있는 n개의 스티커"
category: [Solve Algorithm!]
tags:
  - Alogorithm
comments: true
---

N개의 스티커가 원형으로 연결되어 있다. 다음 그림은 N = 8인 경우의 예시다.

![circle-sticker]({{site.url}}/assets/circle-sticker.jpg ){: .center-image }

원형으로 연결된 스티커에서 몇 장의 스티커를 뜯어내어 뜯어낸 스티커에 적힌 숫자의 합이 최대가 되도록 한다.

단 스티커 한 장을 뜯어내면 양쪽으로 인접해있는 스티커는 찢어져서 사용할 수 없다.

**제한 사항**
- sticker는 원형으로 연결된 스티커의 각 칸에 적힌 숫자가 순서대로 들어있는 배열로, 길이(N)는 1 이상 100,000 이하이다.
- sticker의 각 원소는 스티커의 각 칸에 적힌 숫자이며, 각 칸에 적힌 숫자는 1이상 100이하의 자연수이다.
- 원형의 스티커 모양을 위해 sticker 배열의 첫 번째 원소와 마지막 원소가 서로 연결되어 있다.

**입출력 예**

| sticker | answer |
|:--|:--:|
| [14, 6, 5, 11, 3, 9, 2, 10] | 36 |    
| [1, 3, 2, 5, 4] | 8  |

- 6, 11, 9, 10이 적힌 스티커를 떼어 냈을 때 36으로 최대가 됨
- 3, 5가 적힌 스티커를 떼어 냈을 때 8로 최대가 됨

### 내 풀이

```python
from functools import reduce

def solution(array_list):
    sum_value = 0
    even_end = len(array_list)-2
    sum_num = []
    sum_list = []
    result = 0

    for i in range(len(array_list)):
        if array_list[i] != array_list[0]:
            front_value = array_list[:i-1:]
            del array_list[:i-1:]
            array_list.extend(front_value)

        if (len(array_list)-1) % 2 == 0:
            sum_num = array_list[:even_end:2]
            sum_value = reduce(lambda x, y: x+y, sum_num)
        else:
            sum_num = array_list[::2]
            sum_value = reduce(lambda x, y: x+y, sum_num)
        sum_list.append(sum_value)

    for j in range(len(sum_list)):
        if result < sum_list[j]:
            result = sum_list[j]

    return(result)

array_list1 = [1, 3, 2, 5, 4]
array_list2 = [14, 6, 5, 11, 3, 9, 2, 10]
print(solution(array_list1), solution(array_list2))
```

- 코드가 굉장히 길고 if문과 for문 남용...

### 다른 사람 풀이

```python
def get_max_sum(num_list):    
    return max([x for x in num_list[:-1:2]], [x for x in num_list[1::2]], key=sum)

num_list = [14, 6, 5, 11, 3, 9, 2, 10]
get_max_sum(num_list)
```

- 코드가 짧고 보기 좋다. 존경스럽다.
