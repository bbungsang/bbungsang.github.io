---
layout: post
title:  "[Try Hello World] Level2 최솟값 만들기"
category: [Solve Algorithm!, tryhelloworld]
tags:
  - Alogorithm
  - Level2
comments: true
---


## 최솟값 만들기

자연수로 이루어진 길이가 같은 수열 A,B가 있습니다. 최솟값 만들기는 A, B에서 각각 한 개의 숫자를 뽑아 두 수를 곱한 값을 누적하여 더합니다. 이러한 과정을 수열의 길이만큼 반복하여 최종적으로 누적된 값이 최소가 되도록 만드는 것이 목표입니다.

예를 들어 A = [1, 2] , B = [3, 4] 라면 <br />
**1.** A에서 1, B에서 4를 뽑아 곱하여 더합니다. <br />
**2.** A에서 2, B에서 3을 뽑아 곱하여 더합니다.

수열의 길이만큼 반복하여 최솟값 10을 얻을 수 있으며, 이 10이 최솟값이 됩니다. <br />
수열 A,B가 주어질 때, 최솟값을 반환해주는 getMinSum 함수를 완성하세요.


### 내 코드

[파이썬]

```python
def getMinSum(a, b):
    sort_a = sort_list(a)
    sort_b = sort_list(b)
    result = 0
    
    for idx in range(0, len(a)):
        result += a[idx]*b[len(a)-idx-1]
    return result
    
def sort_list(li):
    for idx in range(len(li)-1):
        if li[idx] > li[idx+1]:
            li[idx], li[idx+1] = li[idx+1], li[idx]
    if li[0] > li[1]:
        li[0], li[1] = li[1], li[0]
    return li

print(getMinSum([1, 2, 3], [4, 5, 6]))
```

[자바]

```java
class TryHelloWorld {
    int idx;
    public int getMinSum(int []A, int []B) {
        int answer = 0;
        for(idx=0; idx<A.length; idx++) {
            answer += A[idx]*B[(A.length-1)-idx];
        }
        return answer;
    }
    public int[] getSortedArray(int[] array) {
        int temp;
        for(idx=0; idx<array.length-2; idx++) {
            if(array[idx] > array[idx+1]) {
                temp = array[idx];
                array[idx] = array[idx+1];
                array[idx+1] = temp;
            }
        }
        if(array[0] > array[1]) {
            temp = array[0];
            array[0] = array[1];
            array[1] = temp;
        }
        return array;
    }
    public static void main(String[] args) {
        TryHelloWorld test = new TryHelloWorld();
        int []A = {1,2,3};
        int []B = {4,5,6};
        System.out.println(test.getMinSum(A,B));
    }
}
```