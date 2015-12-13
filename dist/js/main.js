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
      applyMatrix: false,
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
      applyMatrix: false,
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
    return;
  }

  Clock.prototype.pause = function() {
    return this.hourHand.onFrame = function(event) {
      return this.rotate(0);
    };
  };

  Clock.prototype.play = function() {
    var thisFrom;
    thisFrom = this.from;
    this.minuteHand.onFrame = function(event) {
      return this.rotate(CLOCK_SPEED / 2, thisFrom);
    };
    return this.hourHand.onFrame = function(event) {
      return this.rotate(CLOCK_SPEED, thisFrom);
    };
  };

  Clock.prototype.goto = function(hand, angle) {
    var thisFrom;
    thisFrom = this.from;
    return hand.onFrame = function(event) {
      var diff;
      if (angle > 0) {
        diff = angle - hand.getRotation();
      } else {
        diff = Math.abs(hand.getRotation() - angle);
      }
      if (diff > CLOCK_SPEED) {
        return this.rotate(CLOCK_SPEED, thisFrom);
      } else if (diff < CLOCK_SPEED) {
        this.rotate(diff, thisFrom);
        this.rotate(0, thisFrom);
        return this.onFrame = void 0;
      }
    };
  };

  Clock.prototype.setHandPosition = function(minutePosition, hourPostion) {
    this.goto(this.hourHand, minutePosition);
    return this.goto(this.minuteHand, hourPostion);
  };

  Clock.prototype.setState = function(state) {
    switch (state) {
      case "PLAY":
        return this.play();
      case "PAUSE":
        return this.pause();
      case "3":
        return this.setHandPosition(0, 90);
      case "6":
        return this.setHandPosition(0, 180);
      case "9":
        return this.setHandPosition(0, -90);
      case "0":
        return this.setHandPosition(0, 0);
      case "VERTICAL":
        return this.setHandPosition(0, 180);
      case "HORIZONTAL":
        return this.setHandPosition(-90, 90);
    }
  };

  return Clock;

})();

clock = new Clock(100, 100);

clock.setState("PLAY");

click = 0;

document.onclick = function() {
  return clock.setState("6");
};
