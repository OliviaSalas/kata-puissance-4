'use strict'
const Grid = require('./grid');
const Analyzer = require('./analyzer');

let Referee = class Referee {
  constructor(analyzer, grid) {
    this.analyzer = analyzer;
    this.grid = grid;
    this.turn = 0;
  }

  whoseTurnIsIt() {
    return ['yellow', 'red'][this.turn%2];
  }

  currentPlayerPlays(columnNumber) {
    this.grid.add(columnNumber, this.whoseTurnIsIt());
    if (this.analyzer.result() != 'win') this.turn++;
  }

  getGameState() {
    let analyzerResult = this.analyzer.result();
    if (analyzerResult === 'continue') {
      return 'Game not finished yet';
    } else if (analyzerResult ==='tie') {
      return 'Tie !';
    } else {
      return this.whoseTurnIsIt() + ' wins !';
    }
  }
}

module.exports = Referee;
