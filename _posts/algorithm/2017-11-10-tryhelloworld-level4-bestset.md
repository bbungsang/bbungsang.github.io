---
layout: post
title:  "[Try Hello World] Level4 최고의 집합"
category: [Solve Algorithm!, tryhelloworld]
tags:
  - Alogorithm
  - Level4
comments: true
---

## 최고의 집합
자연수 N개로 이루어진 집합 중에, 각 원소의 합이 S가 되는 수의 집합은 여러 가지가 존재합니다. 최고의 집합은, 위의 조건을 만족하는 집합 중 각 원소의 곱이 최대가 되는 집합을 의미합니다. 

집합 원소의 개수 n과 원소들의 합 s가 주어지면, 최고의 집합을 찾아 원소를 오름차순으로 반환해주는 bestSet 함수를 만들어 보세요. 

만약 조건을 만족하는 집합이 없을 때는 배열 맨 앞에 –1을 담아 반환하면 됩니다. 예를 들어 n=3, s=13이면 [4,4,5]가 반환됩니다.
(자바는 집합이 없는 경우 크기가 1인 배열에 -1을 담아 반환해주세요.)

### 내 풀이

[파이썬]

```python
{% raw %}
def bestSet(n, s):
    return [s//n for i in range(n-s%n)] + [s//n+1 for rem in range(s%n)]

# 테스트를 위한 실행 코드
print(bestSet(3,13))
{% endraw %}
```

[자바1]

```java
{% raw %}
import java.util.Arrays;

public class BestSet {
    public int[] bestSet(int n, int s) {
        int[] result = new int[n];
        if(n > s) {
            result[0] = -1;
            return result;
        }
        for(int i=0; i<n; i++) {
            result[i] = (int)Math.floor(s/n);
            if(i>n-s%n-1) {
                result[i] = (int)Math.floor(s/n)+1;
            }
        }
        return result;
    }
    public static void main(String[] args) {
        BestSet bs = new BestSet();
        //아래는 테스트로 출력해 보기 위한 코드입니다.
        System.out.println(Arrays.toString(bs.bestSet(3, 14)));
    }
}
{% endraw %}
```

[자바2] : System.arraycopy() 사용

```java
{% raw %}
import java.util.Arrays;

public class BestSet {
    public int[] bestSet(int n, int s) {
        int i;
        int[] ele1 = new int[n-s%n];
        for(i=0; i<n-s%n; i++;) {
            ele1[i] = (int)Math.floor(s/n);
        }
        int[] ele2 = new int[s%n];
        for(i=0; i<s%n; i++) {
            ele2[i] = ele1[0]+1;
        }
        int[] result = new int[n];
        System.arraycopy(ele1, 0, result, 0, ele1.length);
        System.arraycopy(ele2, 0, result, ele1.length, ele2.length);
        return result 
    }
    public static void main(String[] args) {
        BestSet bs = new BestSet();
        //아래는 테스트로 출력해 보기 위한 코드입니다.
        System.out.println(Arrays.toString(bs.bestSet(3, 14)));
    }
}
{% endraw %}
```

### 느낀점
자바로 처음에 System.arraycopy()를 사용하여 풀었다. 파이썬에서 풀었던 방식을 적용하려 하다보니 배열을 병합할 방식을 찾았고, 그 방식 중 하나가 System.arraycopy()로 복사하는 형식으로 병합된 형태의 배열을 만드는 방법이 있었다.

> **# System.arraycopy()** <br />
- Object src: 복사하고자 하는 소스, 즉 원본  <br />
- int srcPos: 어느 부분부터 읽어올지에 대한 위치  <br />
- Object dest: 복사하려는 대상  <br />
- int destPos : 어느 부분부터 사용할지에 대한 위치  <br />
- int length: 원본에서 얼마큼 읽어올지에 대한 길이 입력  <br /><br />
[예제] - 복사 범위 외 인덱스는 0으로 채워진다. <br />
int[] ori = {1, 2, 3, 4, 5}; // 복사할 대상 <br />
int[] copy = new int[5]; <br />
System.arraycopy(ori, 0, copy, 0, 3); <br />
System.out.print(copy); // [1, 2, 3, 0, 0] 

하지만 문제의 규칙을 다시 생각해보니 for문과 if문으로도 간단하게 풀 수 있다는 것을 깨닫게 되어 방법 1로 다시 풀어서 제출했다 ;) 새로운 문법을 알고 적용한다는 것은 어렵지만 재밌는 것 같다.