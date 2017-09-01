---
layout: post
title:  "[Try Hello World] Level1 스트링을 숫자로 바꾸기"
category: [Solve Algorithm!, algorithm]
tags:
  - Alogorithm
  - Level1
comments: true
---

## 스트링을 숫자로 바꾸기
strToInt 메소드는 String형 str을 매개변수로 받습니다.

str을 숫자로 변환한 결과를 반환하도록 strToInt를 완성하세요.

예를들어 str이 "1234"이면 1234를 반환하고, "-1234"이면 -1234를 반환하면 됩니다.

str은 부호(+,-)와 숫자로만 구성되어 있고, 잘못된 값이 입력되는 경우는 없습니다.

- 내가 푼 것

```python
def strToInt(String str):
    if type(str) == str:
    	return int(str)
    else:
        return str(str)

print(strToInt(-25));
```
