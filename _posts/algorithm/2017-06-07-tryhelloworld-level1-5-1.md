---
layout: post
title:  "[Try Hello World] Level1 딕셔너리 정렬"
category: [Solve Algorithm!, algorithm]
tags:
  - Alogorithm
  - Level1
comments: true
---


## 딕셔너리 정렬
딕셔너리는 들어있는 값에 순서가 없지만, 키를 기준으로 정렬하고 싶습니다. 그래서 키와 값을 튜플로 구성하고, 이를 순서대로 리스트에 넣으려고 합니다.

예를 들어 {"김철수":78, "이하나":97, "정진원":88}이 있다면, 각각의 키와 값을

- ("김철수", 78)
- ("이하나", 97)
- ("정진원", 88)

과 같이 튜플로 분리하고 키를 기준으로 정렬해서 다음과 같은 리스트를 만들면 됩니다.

예: [ ("김철수", 78), ("이하나", 97), ("정진원", 88) ]

다음 sort_dictionary 함수를 완성해 보세요.

- 내가 푼 것

```python
def sort_dictionary(dic):
    re_arrange = []
    sort_name = sorted(tuple(dic))
    for i in range(len(sort_name)):
    	re_arrange.append((sort_name[i], dic[sort_name[i]]))
    return re_arrange

print( sort_dictionary( {"김철수":78, "이하나":97, "정진원":88} ))
```

- 다른 사람 풀이

```python
def sort_dictionary(dic):
    return sorted(dic.items(), key=lambda x: x[0])
```
