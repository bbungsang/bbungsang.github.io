---
layout: post
title:  "[Try Hello World] Level3 멀리 뛰기"
category: [Solve Algorithm!, tryhelloworld]
tags:
  - Alogorithm
  - Level3
comments: true
---

## 멀리 뛰기
효진이는 멀리 뛰기를 연습하고 있습니다. 효진이는 한번에 1칸, 또는 2칸을 뛸 수 있습니다. 칸이 총 4개 있을 때, 효진이는 <br />
(1칸, 1칸, 1칸, 1칸) <br />
(1칸, 2칸, 1칸) <br />
(1칸, 1칸, 2칸) <br />
(2칸, 1칸, 1칸) <br />
(2칸, 2칸) <br />
의 5가지 방법으로 맨 끝 칸에 도달할 수 있습니다. 멀리뛰기에 사용될 칸의 수 n이 주어질 때, 효진이가 끝에 도달하는 방법이 몇 가지인지 출력하는 jumpCase 함수를 완성하세요. 예를 들어 4가 입력된다면, 5를 반환해 주면 됩니다.

### 내 풀이

[파이썬]

```python
def jumpCase(num):
    a, b = 1, 1
    while num > 1:
        a, b = b, a+b
        num -= 1
    return b

# 테스트를 위한 실행 코드
print(jumpCase(4))
```

[자바]

```java
class JumpCase {
    public int jumpCase(int num) {
        int a = 1, b = 1, temp = 0;
        while(num > 1) {
            temp = a;
            a = b;
            b = temp + a;
            num--;
        }
        return b;
    }
      
    public static void main(String[] args) {
        JumpCase j = new JumpCase();
        System.out.println(j.jumpCase(4));
    }
}
```