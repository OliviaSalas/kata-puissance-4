/* eslint-disable no-console */
/* global describe context before it*/

const chai = require('chai')
const expect = chai.expect

const Referee = require('./referee')
const Grid = require('./grid')
const Analyzer = require('./analyzer')

describe('#Referee', function()
{
  describe('.whoseTurnIsIt', function() {
    describe('when no players have played yet', function() {
      it('returns yellow', function() {
        // given
        let referee = new Referee();

        // assert
        expect(referee.whoseTurnIsIt()).to.equal('yellow');
      })
    })
  })

  describe('.currentPlayerPlays', function() {
    it('changes the grid', function() {
      // given
      let grid = new Grid();
      let analyzer = new Analyzer(grid);
      let referee = new Referee(analyzer, grid);
      let originalBottomLeftValue = grid.grid[0][0];

      // when
      let columnNumber = 1;
      referee.currentPlayerPlays(columnNumber)

      // assert
      let modifiedBottomLeftValue = grid.grid[0][0];
      expect(modifiedBottomLeftValue).to.not.equal(originalBottomLeftValue)
    })

    it('change the current player', function() {
      // given
      let grid = new Grid();
      let analyzer = new Analyzer(grid);
      let referee = new Referee(analyzer, grid);
      let originalPlayerColor = referee.whoseTurnIsIt();

      // when
      let columnNumber = 1;
      referee.currentPlayerPlays(columnNumber);

      // assert
      let newPlayerColor = referee.whoseTurnIsIt();
      expect(newPlayerColor).to.not.equal(originalPlayerColor);
    })
  })

  describe('.getGameState', function() {
    describe('when the game just started', function() {
      it ('returns "Game not finished yet"', function() {
        // given
        let grid = new Grid();
        let analyzer = new Analyzer(grid);
        let referee = new Referee(analyzer, grid);

        // assert
        expect(referee.getGameState()).to.equal('Game not finished yet');
      })
    })

    describe('when there is a tie', function() {
      it ('returns "Tie !"', function() {
        // given
        let grid = new Grid();
        let analyzer = new Analyzer(grid);
        let referee = new Referee(analyzer, grid);

        for (let startingColumn = 1; startingColumn <= 5; startingColumn+=2) {
          for (let i = 1; i <= 3; i++) {
            referee.currentPlayerPlays(startingColumn);
            referee.currentPlayerPlays(startingColumn+1);
          }
          for (let i = 1; i <= 3; i++) {
            referee.currentPlayerPlays(startingColumn+1);
            referee.currentPlayerPlays(startingColumn);
          }
        }
        for (let i = 1; i <= 6; i++) {
          referee.currentPlayerPlays(7);
        }

        // assert
        expect(referee.getGameState()).to.equal('Tie !');
      })
    })
    describe('when the yellow player wins', function() {
      it ('returns "yellow wins !', function() {
        // given
        let grid = new Grid();
        let analyzer = new Analyzer(grid);
        let referee = new Referee(analyzer, grid);

        // when
        referee.currentPlayerPlays(1);
        referee.currentPlayerPlays(2);
        referee.currentPlayerPlays(1);
        referee.currentPlayerPlays(2);
        referee.currentPlayerPlays(1);
        referee.currentPlayerPlays(3);
        referee.currentPlayerPlays(1);

        // assert
        expect(referee.getGameState()).to.equal('yellow wins !');
      })
    })

  })
})
