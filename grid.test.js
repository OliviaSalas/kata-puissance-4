/* eslint-disable no-console */
/* global describe context before it*/

const chai = require('chai')
const expect = chai.expect

const Grid = require('./grid')

describe('#grid', function()
{
   let grid

   beforeEach('initialize empty grid', function() {
      grid = new Grid()
   })

   context('empty grid', function() 
   { 
      it('should return empty grid', function() 
      {
         // WHEN 
         grid = new Grid()

         // THEN
         const expectedResult = Array(grid.columns).fill('').map(x => Array(grid.lines).fill(''))
         expect(grid.state()).to.deep.equal(expectedResult)
      })

      context('with bad color', function()
      {
         it('should throw error', function() 
         {
            // THEN
            expect(function () {grid.add(1,'lol')}).to.throw('bad color')
         })
         it('should throw error', function() 
         {
            // THEN
            expect(function () {grid.add(1,111)}).to.throw('bad color')
         })
      })

      context('with good color', function()
      {
         it('should not throw error', function() 
         {
            // THEN
            expect(function () { grid.add(1,'yellow') }).to.not.throw()
         })

         context('with bad column number', function()
         {
            it('should throw error', function() 
            {
               // THEN
               expect(function () { grid.add(grid.columns+1,'yellow') }).to.throw('bad column number')
            })
            it('should throw error', function() 
            {
               // THEN
               expect(function () { grid.add("lol",'yellow') }).to.throw('bad column number')
            })
         })

         context('with good column number', function()
         {
            it('should not throw an error', function() 
            {
               // THEN
               expect(function () { grid.add(1,'yellow') }).to.not.throw()
            })

            it('should add the chip at the top', function() 
            {
               // GIVEN
               grid.add(1, "red")
      
               // WHEN
               grid.add(1, "yellow")
               
               // THEN
               expect(grid.state()[0][0]).to.equal("red")
               expect(grid.state()[0][1]).to.equal("yellow")
            })
      
            it('should stop adding in column after 6 chips', function() 
            {
               // GIVEN
               for (i = 0 ; i < grid.lines ; i++) {
                  grid.add(1, "red")
               }
               
               // THEN
               expect(function () {grid.add(1,'yellow')}).to.throw('column full')
               expect(grid.state()[0]).not.contains("yellow")
            })
         })
      })

   })



   context('grid is not empty', function() 
   {
      it ('sould be emptied', function() 
      {  
         // GIVEN
         grid.add(1, "red")

         // WHEN
         grid.empty()
         
         // THEN
         expectedResult = Array(grid.columns).fill('').map(x => Array(grid.lines).fill(''))
         expect(grid.state()).to.deep.equal(expectedResult)
      })
   })


})
