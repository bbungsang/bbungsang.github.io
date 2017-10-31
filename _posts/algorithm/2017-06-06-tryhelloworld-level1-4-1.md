---
layout: post
title:  "[Try Hello World] Level1 문자열 다루기 기본"
category: [Solve Algorithm!, tryhelloworld]
tags:
  - Alogorithm
  - Level1
comments: true
---

## 문자열 다루기 기본
alpha_string46함수는 문자열 s를 매개변수로 입력받습니다.

s의 길이가 4혹은 6이고, 숫자로만 구성되있는지 확인해주는 함수를 완성하세요.

예를들어 s가 "a234"이면 False를 리턴하고 "1234"라면 True를 리턴하면 됩니다.


- 내가 푼 것

```python
def alpha_string46(s):
    num_list = []
    for i in range(0, 10):
        num_list.append(str(i))

    if len(s) != 4 and len(s) != 6:
        return False

    for j in range(len(s)):
        if s[j] not in num_list:
            return False
    return True

print( alpha_string46("a23415") )
print( alpha_string46("031779") )
```

- 다른 사람 풀이

```python
def alpha_string46(s):
    return s.isdigit() and len(s) in [4, 6]
```
