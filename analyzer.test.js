/* eslint-disable no-console */
/* global describe context before it*/

const chai = require('chai');
const expect = chai.expect;

const Grid     = require('./grid');
const Analyzer = require('./analyzer');

describe('analyzer', function() {
  describe('when given something else than a grid', function() {
      it('throws an error', function() {
        expect(function () {new Analyzer('coucou')}).to.throw('wrong argument')
      })
  })

  describe('.result', function() {
    describe('check by column', function() {
      describe('when given a winner grid with four chips aligned in a column', function() {
        it('returns "win"', function() {
            // given
            let grid = new Grid();

            //when
            grid.add(1, 'red')
            grid.add(1, 'red')
            grid.add(1, 'red')
            grid.add(1, 'red')

            let analyzer = new Analyzer(grid);

            //then
            expect(analyzer.result()).to.equal('win')
        })
      })

      describe('when given a grid with only 3 chips aligned in a column', function() {
        it('returns "continue"', function() {
          // given
          let grid = new Grid();

          //  when
          grid.add(1, 'red')
          grid.add(1, 'red')
          grid.add(1, 'red')

          let analyzer = new Analyzer(grid);

          // then
          expect(analyzer.result()).to.equal('continue')
        })
      })

      describe('when given a grid with 4 chips aligned not in first column', function() {
        it('returns "continue"', function() {
          //given
          let grid = new Grid();

          //when
          grid.add(2, 'red')
          grid.add(2, 'red')
          grid.add(2, 'red')
          grid.add(2, 'red')

          let analyzer = new Analyzer(grid);

          //then
          expect(analyzer.result()).to.equal('win')
        })
      })

      describe('when given a grid with 4 chips aligned, 3 red and 1 yellow', function () {
        it('returns "continue"', function () {
          //given
          let grid = new Grid();

          //when
          grid.add(1, 'yellow')
          grid.add(1, 'red')
          grid.add(1, 'red')
          grid.add(1, 'red')

          let analyzer = new Analyzer(grid);

          //then
          expect(analyzer.result()).to.equal('continue')
        })
      })

      describe('when given a grid with 4 yellow chips aligned, 3 red and 1 yellow', function () {
        it('returns "continue"', function () {
          //given
          let grid = new Grid();

          //when
          grid.add(1, 'red')
          grid.add(1, 'yellow')
          grid.add(1, 'yellow')
          grid.add(1, 'yellow')
          grid.add(1, 'yellow')


          let analyzer = new Analyzer(grid);

          //then
          expect(analyzer.result()).to.equal('win')
        })
      })


    })

    describe('check by line', function() {
      describe('when given a winner grid with four chips aligned in a line', function() {
        it('returns "win"', function() {
            // given
            let grid = new Grid();

            //when
            grid.add(1, 'red')
            grid.add(2, 'red')
            grid.add(3, 'red')
            grid.add(4, 'red')

            let analyzer = new Analyzer(grid);

            //then
            expect(analyzer.result()).to.equal('win')
        })
      })

      describe('when given a winner grid with four chips aligned in a line in the middle', function() {
        it('returns "win"', function() {
            // given
            let grid = new Grid();

            //when
            grid.add(2, 'yellow')
            grid.add(3, 'red')
            grid.add(4, 'red')
            grid.add(5, 'red')
            grid.add(2, 'red')
            grid.add(3, 'red')
            grid.add(4, 'red')
            grid.add(5, 'red')

            let analyzer = new Analyzer(grid);

            //then
            expect(analyzer.result()).to.equal('win')
        })
      })
    })

    describe('check by diagonal', function() {
      describe('when given a grid with 4 chips aligned', function(){
        it('returns win', function(){
          //given
          let grid = new Grid();

          //when
          grid.add(1, 'yellow')
          grid.add(1, 'yellow')
          grid.add(1, 'yellow')
          grid.add(1, 'red')

          grid.add(2, 'yellow')
          grid.add(2, 'yellow')
          grid.add(2, 'red')

          grid.add(3, 'yellow')
          grid.add(3, 'red')

          grid.add(4, 'red')

          let analyzer = new Analyzer(grid);

          //then
          expect(analyzer.result()).to.equal('win')
        })
      })

      describe('when given a grid with 4 chips aligned but one line above', function(){
        it('returns win', function(){
          //given
          let grid = new Grid();

          //when
          grid.add(1, 'red')
          grid.add(1, 'yellow')
          grid.add(1, 'yellow')
          grid.add(1, 'yellow')
          grid.add(1, 'red')

          grid.add(2, 'yellow')
          grid.add(2, 'yellow')
          grid.add(2, 'yellow')
          grid.add(2, 'red')

          grid.add(3, 'yellow')
          grid.add(3, 'red')
          grid.add(3, 'red')

          grid.add(4, 'red')
          grid.add(4, 'red')

          let analyzer = new Analyzer(grid);

          //then
          expect(analyzer.result()).to.equal('win')
        })
      })

      describe('when given a grid with 4 chips aligned from 2nd row and 4th column', function(){
        it('returns win', function(){
          //given
          let grid = new Grid();

          //when
          grid.add(4, 'red')
          grid.add(4, 'yellow')
          grid.add(4, 'yellow')
          grid.add(4, 'red')
          grid.add(4, 'red')

          grid.add(5, 'yellow')
          grid.add(5, 'red')
          grid.add(5, 'yellow')
          grid.add(5, 'red')

          grid.add(6, 'red')
          grid.add(6, 'yellow')
          grid.add(6, 'red')

          grid.add(7, 'yellow')
          grid.add(7, 'red')

          let analyzer = new Analyzer(grid);

          //then
          expect(analyzer.result()).to.equal('win')
        })
      })

      describe('when given a grid with 4 chips aligned from last (6th) row and last (7th) column', function(){
        it('returns win', function(){
          //given
          let grid = new Grid();

          //when
          grid.add(7, 'red')
          grid.add(7, 'red')
          grid.add(7, 'red')
          grid.add(7, 'yellow')
          grid.add(7, 'yellow')
          grid.add(7, 'red')

          grid.add(6, 'yellow')
          grid.add(6, 'yellow')
          grid.add(6, 'yellow')
          grid.add(6, 'red')
          grid.add(6, 'red')

          grid.add(5, 'red')
          grid.add(5, 'red')
          grid.add(5, 'yellow')
          grid.add(5, 'red')

          grid.add(4, 'yellow')
          grid.add(4, 'yellow')
          grid.add(4, 'red')


          let analyzer = new Analyzer(grid);

          //then
          expect(analyzer.result()).to.equal('win')
        })
      })
    })

    describe('when given a full grid with no 4 chips aligned', function() {
      it('returns "tie"', function() {
        // given
        let grid = new Grid();
        for(let columnIndex = 0; columnIndex <= 6; columnIndex++) {
          let colors = ['red', 'yellow'];
          let color_bottom = colors[columnIndex%2]
          let color_top = colors[(columnIndex+1)%2]

          for (let rowIndex = 0; rowIndex <= 5; rowIndex++) {
            if (rowIndex <=2) grid.add(columnIndex+1, color_bottom);
            else grid.add(columnIndex+1, color_top);
          }
        }

        // assert
        let analyzer = new Analyzer(grid);
        expect(analyzer.result()).to.equal('tie')
      })
    })
  })
})
