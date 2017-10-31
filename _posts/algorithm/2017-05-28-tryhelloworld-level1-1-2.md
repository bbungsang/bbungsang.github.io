---
layout: post
title:  "[Try Hello World] Level1 핸드폰 번호 가리기"
category: [Solve Algorithm!, tryhelloworld]
tags:
  - Alogorithm
  - Level1
comments: true
---

## 핸드폰 번호 가리기

별이는 헬로월드텔레콤에서 고지서를 보내는 일을 하고 있습니다.

개인정보 보호를 위해 고객들의 전화번호는 맨 뒷자리 4자리를 제외한 나머지를 ` * ` 으로 바꿔야 합니다.

전화번호를 문자열 s로 입력받는 hide_numbers함수를 완성해 별이를 도와주세요.

예를들어 s가 01033334444 면 \*\*\*\*\*\*\*4444 를 리턴하고, 027778888 인 경우는 \*\*\*\*\*8888 을 리턴하면 됩니다.

- 내가 푼 것

```python
def hide_numbers(s):
    hide = len(s) - 4
    change = '*' * hide
    return s.replace(s[0:hide], change)

print("결과 : " + hide_numbers('01033334444'));
```

- 다른 사람 풀이

```python
import re

def hide_numbers(s):
    p = re.compile(r'\d(?=\d{4})')
    return p.sub("*", s, count = 0)

# 아래는 테스트로 출력해 보기 위한 코드입니다.
print("결과 : " + hide_numbers('01033334444'));
print("결과 : " + hide_numbers('027778888'));
```

### *소감*
- 정규표현식을 활용한 풀이가 와닿았다. 다음에 정규표현식으로 문제에 접근해봐야지!
