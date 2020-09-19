---
layout: post
title:  "[Hacker Rank] Equalize the Array"
category: [hackerrank]
tags:
  - Algorithm
  - HackerRank
  - Javascript
comments: true
---

## [Equalize the Array](https://www.hackerrank.com/challenges/equality-in-a-array/problem) | Easy

Karl has an array of integers. He wants to reduce the array until all remaining elements are equal. Determine the minimum number of elements to delete to reach his goal.

For example, if his array is `arr = [1, 2, 2, 3]`, we see that he can delete the 2 elements 1 and 3 leaving `arr = [2, 2]`.
He could also delete both twos and either the 1 or the 3, but that would take 3 deletions.

The minimum number of deletions is 2.

#### Function Description

Complete the equalizeArray function in the editor below. It must return an integer that denotes the minimum number of deletions required.

equalizeArray has the following parameter(s):

* arr: an array of integers

#### Input Format

The first line contains an integer n, the number of elements in arr.
The next line contains n space-separated integers arr[i].

#### Output Format

Print a single integer that denotes the minimum number of elements Karl must delete for all elements in the array to be equal.

#### Sample Input

```
5
3 3 2 1 3
```

#### Sample Output

```
2
```

### My Solution

```javascript
function equalizeArray(arr) {
  const numMap = {}
  let maxValue = 0

  return arr.reduce((a, c) => {
    if (numMap[c]) {
      numMap[c] += 1
    } else {
      numMap[c] = 1
    }

    const value = numMap[c] || 1
    a += 1

    if (value > maxValue) {
      a -= (value - maxValue)
      maxValue = value
    }

    return a
  }, 0)
}

const r1 = equalizeArray([3, 3, 2, 1, 3])
console.log(`실행 결과: ${r1}, 기대값: 2`)
const r2 = equalizeArray([1, 2, 3, 1, 2, 3, 3, 3])
console.log(`실행 결과: ${r2}, 기대값: 4`)
```
