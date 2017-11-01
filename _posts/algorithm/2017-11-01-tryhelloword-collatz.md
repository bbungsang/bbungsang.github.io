---
layout: post
title:  "[Try Hello World] Level2 콜라츠 추측"
category: [Solve Algorithm!, tryhelloworld]
tags:
  - Alogorithm
  - Level1
comments: true
---


## 콜라츠 추측

1937년 Collatz란 사람에 의해 제기된 이 추측은, 입력된 수가 짝수라면 2로 나누고, 홀수라면 3을 곱하고 1을 더한 다음, 결과로 나온 수에 같은 작업을 1이 될 때까지 반복할 경우 모든 수가 1이 된다는 추측입니다. 

예를 들어, 입력된 수가 6이라면 6→3→10→5→16→8→4→2→1 이 되어 총 8번 만에 1이 됩니다. collatz 함수를 만들어 입력된 수가 몇 번 만에 1이 되는지 반환해 주세요. 단, 500번을 반복해도 1이 되지 않는다면 –1을 반환해 주세요.

### 내 코드

[파이썬]

```python
def collatz(num):
    repeat = 0;
    while num != 1:
        if num % 2 == 0:
            num = num / 2        
        elif repeat > 500:
            repeat = -1
            break;
        else:
            num = num * 3 + 1
        repeat += 1
    return repeat
```

[자바]

```java
class Collatz {
    public int collatz(int num) {
        int repeat = 0;
        while (num != 1) {
            if (num % 2 == 0) {
                num = num / 2;
            } else if (repeat > 500) {
                repeat = -1;
                break;
            } else {
                num = num * 3 + 1;
            }
            repeat++;
        }
        return repeat;
    }

    public static void main(String[] args) {
        Collatz c = new Collatz();
        System.out.println(c.collatz(6));
    }
}
```

### 다른 사람 코드

[파이썬]

```python
def collatz(num):
    for i in range(500):
        num = num / 2 if num % 2 == 0 else num*3 + 1
        if num == 1:
            return i + 1
    return -1
```

[자바]

```java
class Collatz {
    public int collatz(int num) {
        int answer = 0;
        for (int i = 0; i < 500; i++) {
            num = num % 2 == 0 ? num / 2 : num * 3 + 1;
            if (num == 1) return i + 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        Collatz c = new Collatz();        
        System.out.println(c.collatz(6));
    }
}
```