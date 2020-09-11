---
layout: post
title:  "[Hacker Rank] Taum And B'day"
category: []
tags:
  - Algorithm
  - HackerRank
  - Javascript
comments: true
---

## [Taum And B'day](https://www.hackerrank.com/challenges/taum-and-bday/problem) | Easy

Taum is planning to celebrate the birthday of his friend, Diksha. There are two types of gifts that Diksha wants from Taum: one is black and the other is white.
To make her happy, Taum has to buy b black gifts and w white gifts.

* The cost of each black gift is bc units.
* The cost of every white gift is wc units.
* The cost of converting each black gift into white gift or vice versa is z units.

Help Taum by deducing the minimum amount he needs to spend on Diksha's gifts.

For example, if Taum wants to buy b = 3 black gifts and w = 5 white gifts at a cost of bc = 3, wc = 4 and conversion cost z = 1, we see that he can buy a black gift for 3 and convert it to a white gift for 1, making the total cost of each white gift 4.

That matches the cost of a white gift, so he can do that or just buy black gifts and white gifts. Either way, the overall cost is

3 * 3 + 5 * 4 = 29.

#### Function Description

Complete the function taumBday in the editor below. It should return the minimal cost of obtaining the desired gifts.

taumBday has the following parameter(s):

* b: the number of black gifts
* w: the number of white gifts
* bc: the cost of a black gift
* wc: the cost of a white gift
* z: the cost to convert one color gift to the other color

#### Input Format

The first line will contain an integer t, the number of test cases.

The next t pairs of lines are as follows:
- The first line contains the values of integers b and w.
- The next line contains the values of integers bc, wc, and z.

#### Output Format

t lines, each containing an integer: the minimum amount of units Taum needs to spend on gifts.

#### Sample Input

```
5
10 10
1 1 1
5 9
2 3 4
3 6
9 1 1
7 7
4 2 1
3 3
1 9 2
```

#### Sample Output

```
20
37
12
35
12
```

### My Solution (Javascript)

```javascript
function taumBday(b, w, bc, wc, z) {
  const black = BigInt(b)
  const white = BigInt(w)
  const blackCost = BigInt((bc > wc + z) ? wc + z : bc)
  const whiteCost = BigInt((wc > bc + z) ? bc + z : wc)
  return (blackCost * black) + (whiteCost * white)
}

const l1 = [
  [10, 10, 1, 1, 1, 20],
  [5, 9, 2, 3, 4, 37],
  [3, 6, 9, 1, 1, 12],
  [7, 7, 4, 2, 1, 35],
  [3, 3, 1, 9, 2, 12]
]
l1.forEach(([b, w, bc, wc, z, er]) => {
  const r1 = taumBday(b, w, bc, wc, z)
  console.log(`실행 결과: ${r1}, 기대값: ${er}`)
})
```
