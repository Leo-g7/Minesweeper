import { NodeValue } from './enums.js';

export default class GridHtml {
  _clock = null;
  _grid = null;
  _firstClick = false;
  _playing = true;

  constructor(clock, grid) {
    this._clock = clock;
    this._grid = grid;
  }

  discorverAdjacentNodes(y, x) {
    for (let i = -1; i <= 1; i = i + 2) {
      if (this._grid.body[y + i]) this.onClickNode(x, y + i);
      if (this._grid.body[y][x + i]) this.onClickNode(x + i, y);
    }
  }

  generateGrid() {
    for (let i = 0; i < this._grid.body.length; i++) {
      const line = document.createElement('div');

      line.classList.add('line');
      for (let j = 0; j < this._grid.body[i].length; j++) {
        const node = document.createElement('div');

        node.classList.add('node');
        node.setAttribute('id', `${i}-${j}`);
        node.onclick = () => {
          this.onClickNode(j, i);
        };

        node.addEventListener('contextmenu', (e) => this.rightclick(e, i, j));
        line.appendChild(node);
      }
      document.getElementById('grid').appendChild(line);
    }
  }

  isNodeNotClickable(x, y) {
    return this._grid.body[y][x].isClicked || this._grid.body[y][x].flag || !this._playing;
  }

  onFirstClickNode(x, y) {
    this._clock.startClock();
    this._grid.setMines(this._grid.body[y][x]);
    this._firstClick = true;
  }

  onClickNode(x, y) {
    if (!this._firstClick) {
      this.onFirstClickNode(x, y);
    }

    if (this.isNodeNotClickable(x, y)) return;

    const node = document.getElementById(`${y}-${x}`);
    this._grid.clickNode(x, y);

    if (this._grid.body[y][x].value === NodeValue.blank) {
      const numberOfMines = this._grid.body[y][x].numberOfMines;

      if (numberOfMines) node.insertAdjacentText('beforeend', numberOfMines);
      else {
        this.discorverAdjacentNodes(y, x);
      }

      this.getNodeColor(node, numberOfMines);
      if (this._grid.isWon()) {
        document.getElementById('result').insertAdjacentText('beforeend', 'Victoire');
        this._clock.stopClock();
        this._playing = false;
      }
    } else {
      node.insertAdjacentText('beforeend', '💣');
      document.getElementById('result').insertAdjacentText('beforeend', 'Défaite');
      this._clock.stopClock();
      this._playing = false;
    }
  }

  rightclick(e, y, x) {
    e.preventDefault();

    if (this._grid.body[y][x].isClicked || !this._playing) return;

    this._grid.body[y][x].flagNode();

    const node = document.getElementById(`${y}-${x}`);

    if (this._grid.body[y][x].flag) {
      node.insertAdjacentText('beforeend', '🚩');
    } else {
      node.removeChild(node.firstChild);
    }
  }

  getNodeColor(node, numberOfMines) {
    const colorClasses = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'height'];

    node.classList.add(colorClasses[numberOfMines] + 'Mine');
  }
}
