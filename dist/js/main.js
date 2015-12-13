var CLOCK_SPEED, CLOCK_WIDTH, Clock, click, clock;

CLOCK_WIDTH = 40;

CLOCK_SPEED = 2;

Clock = (function() {
  function Clock(x, y) {
    var self;
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    self = this;
    this.center = new Point(x, y);
    this.from = new Point(x, y);
    this.to = new Point(x, y - (CLOCK_WIDTH - 5));
    this.minuteHand = new Path.Line({
      from: this.from,
      to: this.to,
      strokeColor: 'black',
      strokeCap: 'round',
      strokeWidth: 4,
      onFrame: function(event) {
        return this.rotate(CLOCK_SPEED, self.from);
      }
    });
    this.hourHand = new Path.Line({
      from: this.from,
      to: this.to,
      strokeColor: 'black',
      strokeCap: 'round',
      strokeWidth: 4,
      onFrame: function(event) {
        return this.rotate(CLOCK_SPEED / 2, self.from);
      }
    });
    this.container = new Path.Circle({
      center: this.center,
      radius: CLOCK_WIDTH,
      strokeColor: 'black',
      strokeWidth: 3
    });
    this.group = new Group({
      children: [minuteHand, hourHand],
      transformContent: false,
      postition: this.center
    });
    return;
  }

  Clock.prototype.pause = function() {
    return this.minuteHand.onFrame = function(event) {
      return this.rotate(0);
    };
  };

  Clock.prototype.play = function() {
    var thisFrom;
    thisFrom = this.from;
    this.minuteHand.onFrame = function(event) {
      console.log(this.getRotation());
      return this.rotate(CLOCK_SPEED, thisFrom);
    };
    return this.hourHand.onFrame = function(event) {
      return this.rotate(CLOCK_SPEED, thisFrom);
    };
  };

  Clock.prototype.goto = function(state) {};

  return Clock;

})();

clock = new Clock(100, 100);

click = 0;

document.onclick = function() {
  if (click % 2) {
    console.log(clock);
    clock.pause();
    return click++;
  } else {
    clock.play();
    return click++;
  }
};
