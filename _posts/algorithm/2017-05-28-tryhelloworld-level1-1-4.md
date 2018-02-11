---
layout: post
title:  "[Try Hello World] Level1 자릿수 더하기"
category: [Solve Algorithm!, tryhelloworld]
tags:
  - Alogorithm
  - Level1
comments: true
---

## 자릿수 더하기
sum_digit함수는 자연수를 전달 받아서 숫자의 각 자릿수의 합을 구해서 return합니다.
예를들어 number = 123이면 1 + 2 + 3 = 6을 return하면 됩니다.
sum_digit함수를 완성해보세요.

- 내가 푼 것

```python
def sum_digit(number):
    str_num = str(number)
    # bowl = ""
    sum = 0
    for i in range(len(str_num)):
        sum += int(str_num[i-1])
        # if i == len(str_num) - 1:
        #     bowl += str_num[i] + "="
        # else:
        #     bowl += str_num[i] + "+"

    return sum

print("결과 : {}".format(sum_digit(123)));
```

- 다른 사람 풀이

```python
def sum_digit(number):
    if number < 10:
        return number;
    return (number % 10) + sum_digit(number // 10)
```

```python
def average(list):
    avg = 0
    sum = 0

    for i in list:
    	sum += i

    avg = sum / len(list)
    return avg

list = [5,3,4]
print("평균값 : {}".format(average(list)));
```
