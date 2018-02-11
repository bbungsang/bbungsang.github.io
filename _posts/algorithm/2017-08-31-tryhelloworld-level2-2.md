---
layout: post
title:  "[Try Hello World] Level2 JadenCase문자열 만들기"
category: [Solve Algorithm!, tryhelloworld]
tags:
  - Alogorithm
  - Level2
comments: true
---


## JadenCase문자열 만들기
Jaden_Case함수는 문자열 s을 매개변수로 입력받습니다.

s에 모든 단어의 첫 알파벳이 대문자이고, 그 외의 알파벳은 소문자인 문자열을 리턴하도록 함수를 완성하세요

예를 들어 s가 "3people unFollowed me for the last week"라면 "3people Unfollowed Me For The Last Week"를 리턴하면 됩니다.

- 내 풀이 1

```python
def Jaden_Case(s):
	li = s.split()
	result = li[0][0].upper() + li[0][1::].lower()
	if len(li) == 1:
		return result
	s = s.replace(li[0] + " ", "")
	return result + " " + Jaden_Case(s)     

print(Jaden_Case("3people unFollowed me for the last week"))
```

- 내 풀이 2

```python
def Jaden_Case(n):
    test = n.split()
    r = []
    for i in test:
        answer = i.title()
        if answer[0].isdigit():
            answer = answer.lower()
        r.append(answer)
    return ' '.join(r)

print(Jaden_Case("3people is not sTudent"))
```

- 다른 사람 풀이

```python
def Jaden_Case(s):
    answer =[]
    for i in range(len(s.split())):
        answer.append(s.split()[i][0].upper() + s.split()[i].lower()[1:])
    return " ".join(answer)

print(Jaden_Case("3people unFollowed me for the last week"))
```

### *소감*
- 재귀함수에 꽂혀서 재귀를 이용해 풀어보았다. 이게 아닌데? 이게 맞는건가? 고민하면서 풀었는데, `title()`이라는 내장 함수로 깔끔하고 신속하게 풀 수 있다는 것을 알고 굉장히 허무했었다.
- 하지만 title()을 쓰면, `3people` 이 `3People` 이 되기 때문에 문제의 취지와 맞지 않는다. 그렇기 때문에 문제에 맞추어 title()을 사용하여 다시 풀어보았다.
- 문제를 풀게 되면, 자연스럽게 리스트와 for문을 사용하게 되는데 파이써닉한 방법인 컴프리헨션을 잘 활용하도록 습관을 들여야겠다.
