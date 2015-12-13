var CLOCK_SPEED, CLOCK_WIDTH, Clock, clock;

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
        console.log(this);
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
        console.log(this);
        return this.rotate(CLOCK_SPEED / 60, self.from);
      }
    });
    this.container = new Path.Circle({
      center: this.center,
      radius: CLOCK_WIDTH,
      strokeColor: 'black',
      strokeWidth: 3
    });
  }

  return Clock;

})();

clock = new Clock(100, 100);
