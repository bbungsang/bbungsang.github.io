---
layout: post
title:  "[Try Hello World] Level3 시저 암호"
category: [Solve Algorithm!, tryhelloworld]
tags:
  - Alogorithm
  - Level3
comments: true
---

어떤 문장의 각 알파벳을 일정한 거리만큼 밀어서 다른 알파벳으로 바꾸는 암호화 방식을 시저 암호라고 합니다.

A를 3만큼 밀면 D가 되고 z를 1만큼 밀면 a가 됩니다. 공백은 수정하지 않습니다.

보낼 문자열 s와 얼마나 밀지 알려주는 n을 입력받아 암호문을 만드는 caesar 함수를 완성해 보세요.

- “a B z”,4를 입력받았다면 “e F d”를 리턴합니다.

### 내 코드

[파이썬]

```python
import string


def caesar(st, n):
    s = list(x for x in st)
    upper = string.ascii_uppercase
    lower = string.ascii_lowercase
    if n > 25:
        n %= 26
    for i in range(len(s)):
        if s[i] in upper:
            if upper.index(s[i])+n > 25:
                s[i] = upper[n-(26-upper.index(s[i]))]
            else:
                s[i] = upper[upper.index(s[i])+n]
            elif s[i] in lower:
                if lower.index(s[i])+n > 25:
                    s[i] = lower[n-(26-lower.index(s[i]))]
                else:
                    s[i] = lower[lower.index(s[i])+n]
    return "".join(s)

# 실행을 위한 테스트 코드입니다.
print(caesar("a B z", 30))
```

[자바]

```java
import java.util.Arrays;

class Caesar {
    String caesar(String s, int n) {
        String[] str = s.split("");
        String[] upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        String[] lower = "abcdefghijklmnopqrstuvwxyz".split("");
        String result = "";
        n %= 26;

        for(int i=0; i<str.length; i++) {
            if(Arrays.asList(upper).contains(str[i])) {
                if(Arrays.asList(upper).indexOf(str[i])+n > 25) {
                    str[i] = upper[n-(26-Arrays.asList(upper).indexOf(str[i]))];
                } else {
                    str[i] = upper[Arrays.asList(upper).indexOf(str[i])+n];
                }
            } else if(Arrays.asList(lower).contains(str[i])) {
                if(Arrays.asList(lower).indexOf(str[i])+n > 25) {
                    str[i] = lower[n-(26-Arrays.asList(lower).indexOf(str[i]))];
                } else {
                    str[i] = lower[Arrays.asList(lower).indexOf(str[i])+n];
                }
            }
            result += str[i];
        }
        return result;
    }
    public static void main(String[] args) {
        Caesar c = new Caesar();
        System.out.println(c.caesar("a B z", 31));
    }
}
```

### 다른 사람 풀이

[파이썬]

```python
def caesar(s, n):
    result = ""
    for ch in s:
        if ch == ' ':
            result = result + ch
            continue
        enc = ord(ch) + n
        if ch.isupper():
            enc = (ord(ch) - ord('A') + n) % 26 + ord('A')
        elif ch.islower():
            enc = (ord(ch) - ord('a') + n) % 26 + ord('a')
        result = result + chr(enc)

    return result
```

[자바]

```java
class Caesar {
    String caesar(String s, int n) {
        String result = "";
    n = n % 26;
    for (int i = 0; i < s.length(); i++) {
      char ch = s.charAt(i);
      if (Character.isLowerCase(ch)) {
        ch = (char) ((ch - 'a' + n) % 26 + 'a');
      } else if (Character.isUpperCase(ch)) {
        ch = (char) ((ch - 'A' + n) % 26 + 'A');
      }
      result += ch;
    }
        return result;
    }

    public static void main(String[] args) {
        Caesar c = new Caesar();
        System.out.println("s는 'a B z', n은 4인 경우: " + c.caesar("a B z", 4));
    }
}

```

> **파이썬 내장 함수** <br /><br />
`ord()` <br />
문자의 아스키 코드 값을 리턴
>
```
>>> ord('a)
97
>>> ord('0')
48
```
>
`chr()` <br />
아스키 코드 값을 입력받아 그 코드에 해당하는 문자를 출력
>
```
>>> chr(97)
a
>>> chr(48)
0
```

> **자바 내장 함수** <br /><br />
`Character.isLowerCase(char ch), Character.isUpperCase(char ch)` <br />
인자 값이 알파벳 소문자 혹은 대문자 여부에 따라서 true/false를 반환

### 소감
새로운 문법과 유용한 쓰임새에 대해서 알 수 있었다. 앞으로 문제를 풀 때 많이 참고해야지.


