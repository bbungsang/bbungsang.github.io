---
layout: post
title:  "[Try Hello World] Level2 이상한 문자 만들기"
category: [Solve Algorithm!, algorithm]
tags:
  - Alogorithm
  - Level2
comments: true
---

## 이상한 문자 만들기
toWeirdCase 함수는 문자열 s를 매개변수로 입력받습니다.

문자열 s에 각 단어의 짝수번째 인덱스 문자는 대문자로, 홀수번째 인덱스 문자는 소문자로 바꾼 문자열을 리턴하도록 함수를 완성하세요.

예를 들어 s가 "try hello world"라면 첫 번째 단어는 "TrY", 두 번째 단어는 "HeLlO", 세 번째 단어는 "WoRlD"로 바꿔 "TrY HeLlO WoRlD"를 리턴하면 됩니다.

**주의** 문자열 전체의 짝/홀수 인덱스가 아니라, 단어(공백을 기준)별로 짝/홀수 인덱스를 판단합니다.

- 내 풀이

```python
def toWeirdCase(s):
	for idx, ele in enumerate(s):
		if s[idx] == " ":
			return s[:idx] + " " + toWeirdCase(s[idx+1:])
		elif idx % 2 == 0:
			s = s[:idx] + s[idx].upper() + s[idx+1:]
		else:
			s = s[:idx] + s[idx].lower() + s[idx+1:]
	return s

print("결과 : {}".format(toWeirdCase("try hello world")));
```

- 다른 사람 풀이

```python
def toWeirdCase(s):
    return " ".join(["".join([x.lower() if i%2 else x.upper() for i,x in enumerate(w)]) for w in s.split()])
```

### *소감*
- 재귀가 편해서 재귀를 활용하려고 한다. 하지만 재귀함수와 컴프리헨션을 같이 사용하고 싶은데 그 방법은 잘 모르겠다. 이에 대해 좀 더 고민해봐야겠다.
- enumerate() 메서드를 알고 있었지만 잘 사용하지는 못했다. 이번 문제를 풀고 해당 함수가 제법 유용하다는 것을 알게되었다. 자주 사용해야지.