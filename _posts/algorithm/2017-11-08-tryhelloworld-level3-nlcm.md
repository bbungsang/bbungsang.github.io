---
layout: post
title:  "[Try Hello World] Level3 N개의 최소공배수"
category: [Solve Algorithm!, tryhelloworld]
tags:
  - Alogorithm
  - Level3
comments: true
---

## N개의 최소공배수
두 수의 최소공배수(Least Common Multiple)란 입력된 두 수의 배수 중 공통이 되는 가장 작은 숫자를 의미합니다. 예를 들어 2와 7의 최소공배수는 14가 됩니다. 정의를 확장해서, n개의 수의 최소공배수는 n 개의 수들의 배수 중 공통이 되는 가장 작은 숫자가 됩니다. nlcm 함수를 통해 n개의 숫자가 입력되었을 때, 최소공배수를 반환해 주세요. 예를들어 [2,6,8,14] 가 입력된다면 168을 반환해 주면 됩니다.

### 내 풀이

[파이썬]

```python
{% raw %}
from functools import reduce

def my_nlcm(num):
    return reduce(lambda x, y: (x*y)//get_gcd(x, y), num)

# 최대공약수 구하기: 유클리드 호제법 적용
def get_gcd(x, y):
    while y:
        x, y = y, x%y
    return x
    
# 실행을 위한 테스트 코드
print(my_nlcm([2, 6, 8, 14]))
{% endraw %}
```

[자바 1] : 주어진 함수에 변형을 가하지 않기 위해 for문 사용

```java
{% raw %}
import java.util.Arrays;

class NLCM {
    public long nlcm(int[] num) {
        // int[] -> long[] 형변환 람다식
        long[] longNum = Arrays.stream(num).mapToLong(i -> i).toArray();
        for(int i=0; i<longNum.length-1; i++){
            longNum[i+1] = (long)Math.floor((longNum[i]*longNum[i+1]/get_gcd(longNum[i], longNum[i+1])));
        }
        return longNum[longNum.length-1];
    }
    public long get_gcd(long x, long y){
        long temp;
        while(y > 0){
            temp = x%y;
            x = y;
            y = temp;
        }
        return x;
    }
    public static void main(String[] args) {
        NLCM c = new NLCM();
        int[] ex = {2,6,8,14};
        System.out.println(c.nlcm(ex));
    }
}
{% endraw %}
```

[자바 2] : 자바 람다식 reduce() 활용

```java
{% raw %}
import java.util.Arrays;

class NLCM {
    public long nlcm(long[] num) {
        return Arrays.stream(num).reduce((x, y) -> (long)Math.floor((x*y)/get_gcd(x,y))).getAsLong();
    }
    public long get_gcd(long x, long y){
        long temp;
        do {
            temp = x%y;
            x = y;
            y = temp;
        } while(y > 0);
        return x;
    }
    public static void main(String[] args) {
        NLCM c = new NLCM();
        long[] ex = {2,6,8,14};
        System.out.println(c.nlcm(ex));
    }
}
{% endraw %}
```

### 소감
파이썬 사랑합니다. 파이썬은 10~20분 이내에 푸는데, 자바 생소해서 그런지 신경써야 할 것도 파이썬에 비해 너무 많아서 문제를 한 번 풀기가 너무 힘들다. 

**이슈 1)** 이번에 자바 코드가 두 개인 것은 자바 람다식인 reduce()를 사용하면 정말 간단하게 풀리는 것을 확인할 수 있다. 하지만 문제에서 주어진 함수의 원형은 int[] 타입이다. 답은 맞지만 원형에 변형을 가해서 테스트에서 계속 오류가 발생, 그래서 int[] 인자를 우선 받은 뒤, long[] 타입으로 바꾸고 for문을 사용하여 답을 제출했다.

**이슈 2)** 자바는 파이썬과 다르게 여러 타입이 존재하고 반드시 그 타입을 선언해줘야 한다. 이 문제에서 긴 배열이 주어질 경우, 당연히 최소공배수의 값은 커질 수 밖에 없었다. 즉, int 로는 답을 표현하기에 한계가 있었던 것, 찾아본 결과 자바에서 int 타입의 저장 공간은 32bits, 값 범위가 -2147483648 ~ 2147483647 이다. 답을 도출하는 과정에서 그 최대값인 2147483647가 넘는 경우가 발생하면 음수로 표현되어 계속 이상한 값을 반환하였다. 그래서 전부 long 타입으로 변환했다.

자바로 알고리즘을 풀면서 웹개발을 공부했을 때는 미처 몰랐던 부분이 굉장히 많았다. 굳이 안 해도 간단한 기능 구현에는 문제가 없었기 때문이었다. 요즘 진짜 많이 배운다. 컴파일러 언어를 배워야한다고 양태환 강사님이 누차 말씀하셨는데 맞는 말씀인 것 같다. 