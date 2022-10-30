export default class Clock {
  _clock = { minutes: 0, secondes: 0 };
  _start = false;

  constructor() {}

  currentTime() {
    if (this._start) {
      this._clock.secondes += 1;

      if (this._clock.secondes === 60) {
        this._clock.minutes += 1;
        this._clock.secondes = 0;
      }

      const minutes = this._clock.minutes < 10 ? '0' + this._clock.minutes : this._clock.minutes;
      const secondes =
        this._clock.secondes < 10 ? '0' + this._clock.secondes : this._clock.secondes;

      let time = minutes + ':' + secondes;

      document.getElementById('timer').innerText = time;

      let t = setTimeout(() => {
        this.currentTime();
      }, 1000);
    }
  }

  startClock() {
    this._start = true;
    this.currentTime();
  }

  stopClock() {
    this._start = false;
  }

  get start() {
    return this._start;
  }
}
