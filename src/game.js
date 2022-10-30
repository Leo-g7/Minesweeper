import Clock from './clock.js';
import Grid from './grid.js';
import GridHtml from './gridHtml.js';

export default class Game {
  _grid;
  _clock;

  pauseButon(clock) {
    document.getElementById('pause').onclick = () => {
      if (clock.start) {
        clock.stopClock();
      } else {
        clock.startClock();
      }
    };
  }

  refreshGame() {
    this._clock.stopClock();
    document.getElementById('timer').innerText = '00:00';
    document.getElementById('result').innerText = '';
    const node = document.getElementById('grid');
    while (node.firstChild) node.removeChild(node.firstChild);

    this.startGame(Number(document.getElementById('difficulty').value));
  }

  startGame(difficulty) {
    this._grid = new Grid(difficulty);
    this._clock = new Clock();
    this.pauseButon(this._clock);
    new GridHtml(this._clock, this._grid).generateGrid(this._grid);

    document.getElementById('replay').onclick = () => {
      this.refreshGame();
    };

    document.getElementById('difficulty').addEventListener('change', (event) => {
      this.refreshGame();
    });
  }
}
