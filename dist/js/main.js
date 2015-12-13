var CANVAS, CONTEXT, Clock, clock, path, start;

CANVAS = document.getElementById("myCanvas");

CONTEXT = CANVAS.getContext("2d");

Clock = (function() {
  function Clock() {
    this.hello = "Helloooooo World!";
    this.ctx = CONTEXT;
  }

  Clock.prototype.draw = function() {
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 100, 0, 2 * Math.PI);
    return this.ctx.stroke();
  };

  Clock.prototype.helloWorld = function() {
    return console.log(this.hello);
  };

  return Clock;

})();

clock = new Clock();

path = new Path();

path.strokeColor = 'black';

start = new Point(100, 100);

path.moveTo(start);

path.lineTo(start + [100, -50]);
