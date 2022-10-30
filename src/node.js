export default class Node {
  _flag = false;
  _isClicked = false;
  _numberOfMines = 0;
  _value;
  _coordinates;

  constructor(value, x, y) {
    this._value = value;
    this._coordinates = { x: x, y: y };
  }

  addMines() {
    this._numberOfMines += 1;
  }

  click() {
    this._isClicked = true;
  }

  flagNode() {
    this._flag = !this._flag;
  }

  setValue(value) {
    this._value = value;
  }

  get coordinates() {
    return this._coordinates;
  }

  get flag() {
    return this._flag;
  }

  get isClicked() {
    return this._isClicked;
  }

  get numberOfMines() {
    return this._numberOfMines;
  }

  get value() {
    return this._value;
  }
}
