import { Difficulty, NodeValue } from './enums.js';
import Node from './node.js';

export default class Grid {
  _difficulty = Difficulty.easy;
  _body = [];
  _numberClickedNodes = 0;
  _numberOfMines = 0;
  _height = 0;
  _width = 0;

  constructor(difficulty = Difficulty.easy) {
    this._difficulty = difficulty;

    this.setGridLength();
    this.setGrid();
  }

  clickNode(x, y) {
    if (this._body[y][x].value === NodeValue.blank) this._numberClickedNodes += 1;

    this._body[y][x].click();
  }

  increaseNumberOfMines(node) {
    for (let i = node.coordinates.y - 1; i <= node.coordinates.y + 1; i++) {
      for (let j = node.coordinates.x - 1; j <= node.coordinates.x + 1; j++) {
        if (this._body[j] && this._body[j][i]) {
          this._body[i][j].addMines();
        }
      }
    }
  }

  isWon() {
    if (this._height * this._width - 5 === this._numberClickedNodes) return true;
    else return false;
  }

  mineNotAdjacent(x, y) {
    let isMineNotAdjacent = true;

    for (let i = -1; i <= 1; i = i + 2) {
      if (
        (this._body[y + i] &&
          this._body[y + i][x] &&
          this._body[y + i][x].value === NodeValue.mine) ||
        (this._body[y] && this._body[y][x + i] && this._body[y][x + i].value === NodeValue.mine)
      ) {
        isMineNotAdjacent = false;
      }
    }

    return isMineNotAdjacent;
  }

  setGrid() {
    const nodes = [];

    for (let i = 0; i < this._height; i++) {
      const line = [];
      for (let j = 0; j < this._width; j++) {
        const node = new Node(NodeValue.blank, j, i);
        line.push(node);
        nodes.push(node);
      }
      this._body.push(line);
    }
  }

  setGridLength() {
    if (this._difficulty === Difficulty.easy) {
      (this._height = 10), (this._width = 10);
    } else if (this._difficulty === Difficulty.medium) {
      (this._height = 15), (this._width = 15);
    } else {
      (this._height = 25), (this._width = 25);
    }
  }

  setMines(firstNode) {
    if (this._difficulty === Difficulty.easy) {
      this._numberOfMines = 5;
    } else if (this._difficulty === Difficulty.medium) {
      this._numberOfMines = 10;
    } else {
      this._numberOfMines = 15;
    }

    for (let i = 0; i < this._numberOfMines; i++) {
      this.setSingleMine(firstNode);
    }
  }

  setSingleMine(firstNode) {
    let x, y;

    while (true) {
      y = Math.floor(Math.random() * this._height);
      x = Math.floor(Math.random() * this._width);

      if (
        (x !== firstNode._coordinates.x || y !== firstNode._coordinates.y) &&
        this.mineNotAdjacent(x, y)
      ) {
        break;
      }
    }

    const node = this._body[y][x];

    node.setValue(NodeValue.mine);
    this.increaseNumberOfMines(node);
  }

  get body() {
    return this._body;
  }
}
