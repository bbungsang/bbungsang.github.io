---
layout: post
title:  "[Try Hello World] Level1 제일 작은 수 제거하기"
category: [Solve Algorithm!, tryhelloworld]
tags:
  - Alogorithm
  - Level1
comments: true
---

## 제일 작은 수 제거하기
rm_small함수는 list타입 변수 mylist을 매개변수로 입력받습니다.

mylist 에서 가장 작은 수를 제거한 리스트를 리턴하고, mylist의 원소가 1개 이하인 경우는 []를 리턴하는 함수를 완성하세요.

예를들어 mylist가 [4,3,2,1]인 경우는 [4,3,2]를 리턴 하고, [10, 8, 22]면 [10, 22]를 리턴 합니다.

- 내가 푼 것

```python
def rm_small(mylist):
    min = 0

    if len(mylist) <= 1:
    	mylist = []
    else:
        min = mylist[0]

        for i in range(len(mylist)):
            if min > mylist[i]:
                min = mylist[i]

        mylist.remove(min)

    return mylist

my_list = [1, 2, 3, 4]
print("결과 {} ".format(rm_small(my_list)))
```

- 다른 사람 풀이

```python
def rm_small(mylist):
    return [i for i in mylist if i > min(mylist)]
```

```python
def rm_small(mylist):
    del(mylist[mylist.index(min(mylist))])
    return mylist
```

### *소감*
- for문 사용을 줄이고 파이써닉한 내장 함수를 잘 활용하도록 노력해야겠다.
