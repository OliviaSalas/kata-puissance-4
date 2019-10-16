'use strict'
const Grid = require('./grid');


let Analyzer = class Analyzer
{
    constructor(grid) {
        this.grid = grid;
        if (!(grid instanceof Grid)) throw new Error('wrong argument')
    }

    result() {
        let win, full;
        win = this.checkColumn(win) || this.checkLine(win) || this.checkRightDiagonal(win) || this.checkLeftDiagonal(win);
        full = this.checkIfFull();

        if(win) return 'win'
        else if(full) return 'tie'
        return 'continue'
    }

    checkIfFull() {
      for(let columnIndex = 0; columnIndex <= 6; columnIndex++) {
        if (!this.grid.grid[columnIndex].join('').match(/^(red|yellow){6}$/)) return false;
      }
      return true;
    }

    checkRightDiagonal(win) {
        let diagonal = '';
        for (let rowColumn = 0; rowColumn <= 3; rowColumn++) {
            for (let rowIndex = 3; rowIndex <= 5; rowIndex++) {
                let firstColumnIndex = rowColumn;
                let firstRowIndex = rowIndex;

                while ((firstRowIndex >= 0) && (firstColumnIndex < 7)) {
                    diagonal += this.grid.grid[firstColumnIndex][firstRowIndex];
                    firstRowIndex--;
                    firstColumnIndex++;
                }

                if (diagonal) {
                    ['red', 'yellow'].forEach(x => {
                        if (diagonal.includes(x.repeat(4))) {
                            win = true;
                        }
                    });
                }
                diagonal = '';
            }
        }
        return win;
    }

    checkLeftDiagonal(win) {
        let diagonal = '';
        for (let columnIndex = 3; columnIndex <= 6; columnIndex++) {
            for (let rowIndex = 3; rowIndex <= 5; rowIndex++) {
                let firstColumnIndex = columnIndex;
                let firstRowIndex = rowIndex;

                while ((firstRowIndex >= 0) && (firstColumnIndex >= 0)) {
                    diagonal += this.grid.grid[firstColumnIndex][firstRowIndex];
                    firstRowIndex--;
                    firstColumnIndex--;
                }

                if (diagonal) {
                    ['red', 'yellow'].forEach(x => {
                        if (diagonal.includes(x.repeat(4))) {
                            win = true;
                        }
                    });
                }
                diagonal = '';
            }
        }
        return win;
    }

    checkColumn(win) {
        for (let i = 0; i < 7; i++) {
            ['red', 'yellow'].forEach(x => {
                if (this.grid.grid[i].join('').includes(x.repeat(4))) {
                    win = true;
                }
            });
        }
        return win;
    }

    checkLine(win) {
        let line;
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                line += this.grid.grid[j][i];
            }
            ['red', 'yellow'].forEach(x => {
                if (line.includes(x.repeat(4))) {
                    win = true;
                }
            });
            line = '';
        }
        return win;
    }
}

module.exports = Analyzer
