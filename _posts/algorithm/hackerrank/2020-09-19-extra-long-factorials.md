---
layout: post
title:  "[Hacker Rank] Extra Long Factorials"
category: [hackerrank]
tags:
  - Algorithm
  - HackerRank
  - Javascript
comments: true
---

## [Extra Long Factorials](https://www.hackerrank.com/challenges/extra-long-factorials/problem) | Medium

The factorial of the integer n, written n!, is defined as:

> n! = n X (n - 1) X (n - 2) X ... X 3 X 2 X 1

Calculate and print the factorial of a given integer.

For example, if n = 30, we calculate 30 X 29 X 28 X ... X 2 X 1 and get 265252859812191058636308480000000.

#### Function Description

Complete the extraLongFactorials function in the editor below. It should print the result and return.

extraLongFactorials has the following parameter(s):

* n: an integer

**Note:** Factorials of n > 20 can't be stored even in a 64 - bit long long variable.
Big integers must be used for such calculations. Languages like Java, Python, Ruby etc. can handle big integers, but we need to write additional code in C/C++ to handle huge values.

We recommend solving this challenge using BigIntegers.

#### Input Format

Input consists of a single integer n

#### Output Format

Print the factorial of n.

#### Sample Input

```
25
```

#### Sample Output

```
15511210043330985984000000
```

### My Solution

```javascript
function extraLongFactorials(n) {
  return [...Array(n)].reduce((a, _, i) => a * BigInt(i + 1), 1n).toString()
}

const r1 = extraLongFactorials(25)
console.log(`실행 결과: ${r1}, 기대값: 15511210043330985984000000`)
const r2 = extraLongFactorials(45)
console.log(`실행 결과: ${r2}, 기대값: 119622220865480194561963161495657715064383733760000000000`)
```
