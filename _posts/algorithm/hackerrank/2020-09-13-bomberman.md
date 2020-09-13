---
layout: post
title:  "[Hacker Rank] The Bomberman Game"
category: [hackerrank]
tags:
  - Algorithm
  - HackerRank
  - Javascript
comments: true
---

## [The Bomberman Game](https://www.hackerrank.com/challenges/bomber-man/problem) | Medium


Bomberman lives in a rectangular grid. Each cell in the grid either contains a bomb or nothing at all.

Each bomb can be planted in any cell of the grid but once planted, it will detonate after exactly 3 seconds.
Once a bomb detonates, it's destroyed — along with anything in its four neighboring cells. 
This means that if a bomb detonates in cell i, j, any valid cells (i ± 1, j) and (i, j ± 1) are cleared.
If there is a bomb in a neighboring cell, the neighboring bomb is destroyed without detonating, so there's no chain reaction.

Bomberman is immune to bombs, so he can move freely throughout the grid. Here's what he does:
* Initially, Bomberman arbitrarily plants bombs in some of the cells, the initial state.
* After one second, Bomberman does nothing.
* After one more second, Bomberman plants bombs in all cells without bombs, thus filling the whole grid with bombs. No bombs detonate at this point.
* After one more second, any bombs planted exactly three seconds ago will detonate. Here, Bomberman stands back and observes.
* Bomberman then repeats steps 3 and 4 indefinitely.

Note that during every second Bomberman plants bombs, the bombs are planted simultaneously (i.e., at the exact same moment), and any bombs planted at the same time will detonate at the same time.

Given the initial configuration of the grid with the locations of Bomberman's first batch of planted bombs, determine the state of the grid after N seconds.

#### Function Description

Complete the bomberMan function in the editory below. It should return an array of strings that represent the grid in its final state.

bomberMan has the following parameter(s):

* n: an integer, the number of seconds to simulate
* grid: an array of strings that represents the grid

#### Input Format

The first line contains three space-separated integers r, c, and n, The number of rows, columns and seconds to simulate.
Each of the next r lines contains a row of the matrix as a single string of c characters. The . character denotes an empty cell, and the O character (ascii 79) denotes a bomb.

#### Output Format

Print the grid's final state. This means R lines where each line contains C characters, and each character is either a . or an O (ascii 79). This grid must represent the state of the grid after n seconds.

### My Solution (feat. Javascript)

```javascript
function bomberMan(n, grid) {
  if (n === 1) return grid

  let g = plantbombs(grid)

  grid = grid.map((c) => c.split(''))
  const x = (n - 2) % 2
  const y = Math.floor((n - 2) / 2) % 2

  if (x) {
    detonate(grid, g)
    if (y) {
      grid = [...g]
      g = plantbombs(grid)
      detonate(grid, g)
    }
  } else {
    g = plantbombs(grid)
  }

  return g.map((c) => c.join(''))
}

function plantbombs(grid) {
  return Array.from(Array(grid.length), () => Array(grid[0].length).fill('O'))
}

function detonate(grid, g) {
  for (let i = 0; i < (grid.length); i++) {
    grid[i].forEach((cell, j) => {
      if (cell === 'O') {
        g[i][j] = '.'
        if (g[i][j - 1]) g[i][j - 1] = '.'
        if (g[i][j + 1]) g[i][j + 1] = '.'
        if (g[i + 1]) g[i + 1][j] = '.'
        if (g[i - 1]) g[i - 1][j] = '.'
      }
    }, '')
  }
}

const r1 = bomberMan(3, ['.......', '...O...', '....O..', '.......', 'OO.....', 'OO.....'])
console.log(`실행 결과: ${r1}, 기대값: ${['OOO.OOO', 'OO...OO', 'OOO...O', '..OO.OO', '...OOOO', '...OOOO']}`)
const r2 = bomberMan(5, ['.......', '...O.O.', '....O..', '..O....', 'OO...OO', 'OO.O...'])
console.log(`실행 결과: ${r2}, 기대값: ${['.......', '...O.O.', '...OO..', '..OOOO.', 'OOOOOOO', 'OOOOOOO']}`)
```
