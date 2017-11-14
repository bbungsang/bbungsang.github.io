---
layout: post
title:  "[Try Hello World] Level4 땅따먹기 게임"
category: [Solve Algorithm!, tryhelloworld]
tags:
  - Alogorithm
  - Level4
comments: true
---

## 땅따먹기 게임

영희는 땅따먹기 게임에 푹 빠졌습니다. 땅따먹기 게임의 땅은 총 N행 4열로 나누어져 있고, 모든 칸에는 점수가 쓰여 있습니다. 땅을 밟으면서 한 행씩 내려올 때, 영희는 각 행의 4칸 중 1칸만 밟으면서 내려올 수 있습니다. 땅따먹기 게임에는 같은 열을 연속해서 밟을 수가 없는 특수 규칙이 있습니다. 즉, 1행에서 (5)를 밟았다면, 2행의 (8)은 밟을 수가 없게 됩니다. 마지막 행까지 모두 내려왔을 때, 점수가 가장 높은 사람이 게임의 승자가 됩니다. 여러분이 hopscotch 함수를 제작하여 영희가 최대 몇 점을 얻을 수 있는지 알려주세요. 예를 들어 <br />
1 2 3 5 <br />
5 6 7 8 <br />
4 3 2 1 <br />
의 땅이 있다면, 영희는 각 줄에서 (5), (7), (4) 땅을 밟아 16점을 최고점으로 받을 수 있으며, hopscotch 함수에서는 16을 반환해주면 됩니다.

### 내 풀이

[파이썬]

```python
def change_zero(li):
    li[li.index(max(li))] = 0
    return li
    
def hopscotch(board, size):
    return sum([max(board[0])] + [max(change_zero(board[i+1])) if board[i].index(max(board[i])) == board[i+1].index(max(board[i+1])) else max(board[i+1]) for i in range(len(board)-1)])

# 테스트를 위한 실행 코드
board =  [[7, 6, 9, 6], [9, 3, 2, 2], [3, 8, 7, 10], [1, 1, 4, 1]]
print(hopscotch(board, 4))
```

[자바]

```java
{% raw %}
class Hopscotch {
    public int get_max(int[] li) {
        int temp = 0;
        for(int i=0; i<li.length; i++){
            for(int j=i+1; j<li.length; j++){
                if(li[i] < li[j]) {
                    temp = li[i];
                    li[i] = li[j];
                    li[j] = temp;
                }
            }
        }
        return li[0];
    }
    public int hopscotch(int[][] board, int size) {
        int[] result = {0, 0, 0, 0};
        int [] tmp = board[0];
        int[] bowl = new int[3];
        for(int i=1; i<board.length; i++) {
            for(int j=0; j<board[0].length; j++) {
                System.arraycopy(tmp, (int)Math.floor((3-j)/3), bowl, 0, 1);
                System.arraycopy(tmp, (int)Math.floor((7-j)/3), bowl, 1, 1);
                System.arraycopy(tmp, (int)Math.floor((11-j)/3), bowl, 2, 1);
                result[j] = board[i][j] + get_max(bowl);
            }
            System.arraycopy(result, 0, tmp, 0, tmp.length);;
        }
        return get_max(result);
    }
    public static void main(String[] args) {
        Hopscotch c = new Hopscotch();
        int[][] test = {{ 1, 2, 3, 5 }, { 5, 6, 7, 8 }, { 4, 3, 2, 1 }};
        // 아래는 테스트로 출력해 보기 위한 코드입니다.
        System.out.println(c.hopscotch(test, 3));
    }
}
{% endraw %}
```

위 코드는 다른 사람의 파이썬 풀이 방식을 적용하여 푼 것이다.

### 다른 사람 풀이

[파이썬]

```python
def hopscotch(board, size):
    accum = [0] * len(board[0])
    
    for row in board:
        tmp = accum[:]
        for i in range(len(row)):
        accum[i] = row[i] + max(tmp[:i] + tmp[i+1:])
    return max(accum)
```

### 느낀점
나는 알고리즘을 풀 때 수학적으로 접근하기 보다는 직관적으로 접근하는 경향이 짙다. 다른 사람의 풀이에서 i가 자기의 열일 경우를 제외하고 더하여 최대값을 구하는 식의 사고가 감탄스러웠다. 나도 그러한 사고를 하도록 노력해야겠다. 
