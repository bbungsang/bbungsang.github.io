---
layout: post
title:  "[Try Hello World] Level1 삼각형 출력하기"
category: [Solve Algorithm!, algorithm]
tags:
  - Alogorithm
  - Level1
comments: true
---

## 삼각형 출력하기
printTriangle 메소드는 양의 정수 num을 매개변수로 입력받습니다.<br>
다음을 참고해 \*(별)로 높이가 num인 삼각형을 문자열로 리턴하는 printTriangle 메소드를 완성하세요.<br>
printTriangle이 return하는 String은 개행문자('\n')로 끝나야 합니다.

- 내가 푼 것

```python
def printTriangle(num):
	star_list = []
	for i in range(1, num + 1):
            star_list.append("*" * i + "\n")

	return ''.join(star_list)

print( printTriangle(5) )
```

- 다른 사람 풀이

```python
def printTriangle(num):
    return ''.join(['*'*i + '\n' for i in range(1,num+1)])
```

#### *소감*
- 내가 푸는 방식은 아무래도 파이써닉함에서 한참 벗어나는 것 같다. 알고리즘을 단계별로 차차 풀어나가고 다른 사람 풀이도 열심히 참고하여 문법을 익히는 게 우선인 듯 하다.
