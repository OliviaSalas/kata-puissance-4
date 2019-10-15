'use strict'


let Grid = class Grid 
{
   constructor() {
      this.columns = 7
      this.lines = 6
      this.grid = this.initializeGrid()
   }

   initializeGrid() {
      return Array(this.columns).fill('').map(x => Array(this.lines).fill(''))
   }

   state() {
      return this.grid
   }

   add (columnNumber, color) 
   {
      if (!Number.isInteger(columnNumber) || columnNumber > this.columns || columnNumber < 0) 
         throw new Error('bad column number')

      if (!['yellow', 'red'].includes(color)) 
         throw new Error('bad color')

      var firstEmptyRow = this.grid[columnNumber-1].findIndex(x => x === '')
      
      if (firstEmptyRow === -1) 
         throw new Error('column full')
      
      this.grid[columnNumber-1][firstEmptyRow] = color
   }

   empty() {
      this.grid = this.initializeGrid()
   }
}


module.exports = Grid

