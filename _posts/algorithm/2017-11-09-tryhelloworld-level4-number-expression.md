---
layout: post
title:  "[Try Hello World] Level4 숫자의 표현"
category: [Solve Algorithm!, tryhelloworld]
tags:
  - Alogorithm
  - Level4
comments: true
---

## 숫자의 표현
수학을 공부하던 민지는 재미있는 사실을 발견하였습니다. 그 사실은 바로 연속된 자연수의 합으로 어떤 숫자를 표현하는 방법이 여러 가지라는 것입니다. 예를 들어, 15를 표현하는 방법은 <br />
(1+2+3+4+5) <br />
(4+5+6) <br />
(7+8) <br />
(15) <br />
로 총 4가지가 존재합니다. 숫자를 입력받아 연속된 수로 표현하는 방법을 반환하는 number_expression 함수를 만들어 민지를 도와주세요. 예를 들어 15가 입력된다면 4를 반환해 주면 됩니다.

### 내 풀이

[파이썬]

```python
def number_expression(num):
    count = 1
    for i in range(1, num-1):
        sum = i
        for j in range(i+1, num):
            sum += j
            if sum == num:
                count += 1
                break
            elif sum > num:
                break
    return count

# 테스트를 위한 실행 코드
print(number_expression(5));
```

[자바]

```java
public class Expressions {
    public int expressions(int num) {
        int count = 1;
        for(int i=1; i<num-1; i++) {
            int sum = i;
            for(int j=i+1; j<num; j++) {
                sum += j;
                if(sum == num) {
                    count++;
                    break;
                } else if(sum > num) {
                    break;
                }	
            }	
        }
        return count;
    }

    public static void main(String args[]) {
        Expressions expressions = new Expressions();
        // 아래는 테스트로 출력해 보기 위한 코드입니다.
        System.out.println(expressions.expressions(5));
    }
}
```