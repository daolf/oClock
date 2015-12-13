var BLANK_SPACE, CLOCK_SPEED, CLOCK_WIDTH, Clock, ClockNumber, MAP, clock;

CLOCK_WIDTH = 40;

CLOCK_SPEED = 2;

BLANK_SPACE = 10;

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
        return this.rotate(CLOCK_SPEED, self.from);
      }
    });
    this.container = new Path.Circle({
      center: this.center,
      radius: CLOCK_WIDTH,
      strokeColor: 'black',
      strokeWidth: 3
    });
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
      return this.rotate(CLOCK_SPEED, thisFrom);
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
      if (Math.abs(diff) > CLOCK_SPEED) {
        return this.rotate(CLOCK_SPEED, thisFrom);
      } else if (Math.abs(diff) < CLOCK_SPEED) {
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
      case "L":
        return this.setHandPosition(0, 90);
      case "F":
        return this.setHandPosition(90, 180);
      case "7":
        return this.setHandPosition(180, -90);
      case "J":
        return this.setHandPosition(-90, 0);
      case "|":
        return this.setHandPosition(0, 180);
      case "_":
        return this.setHandPosition(-90, 90);
    }
  };

  return Clock;

})();

MAP = [["F", "_", "_", "_", "7", "|", "F", "_", "7", "|", "|", "|", "|", "|", "|", "|", "|", "|", "|", "|", "|", "L", "_", "J", "|", "L", "_", "_", "_", "J"]];

ClockNumber = (function() {
  function ClockNumber(x, y) {
    var s;
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    s = BLANK_SPACE + CLOCK_WIDTH * 2;
    this.clocks = [new Clock(x + s, y), new Clock(x + 2 * s, y), new Clock(x + 3 * s, y), new Clock(x + 4 * s, y), new Clock(x + 5 * s, y), new Clock(x + s, y + s), new Clock(x + 2 * s, y + s), new Clock(x + 3 * s, y + s), new Clock(x + 4 * s, y + s), new Clock(x + 5 * s, y + s), new Clock(x + s, y + s * 2), new Clock(x + 2 * s, y + s * 2), new Clock(x + 3 * s, y + s * 2), new Clock(x + 4 * s, y + s * 2), new Clock(x + 5 * s, y + s * 2), new Clock(x + s, y + s * 3), new Clock(x + 2 * s, y + s * 3), new Clock(x + 3 * s, y + s * 3), new Clock(x + 4 * s, y + s * 3), new Clock(x + 5 * s, y + s * 3), new Clock(x + s, y + s * 4), new Clock(x + 2 * s, y + s * 4), new Clock(x + 3 * s, y + s * 4), new Clock(x + 4 * s, y + s * 4), new Clock(x + 5 * s, y + s * 4), new Clock(x + s, y + s * 5), new Clock(x + 2 * s, y + s * 5), new Clock(x + 3 * s, y + s * 5), new Clock(x + 4 * s, y + s * 5), new Clock(x + 5 * s, y + s * 5)];
  }

  ClockNumber.prototype.shape = function(digit) {
    var clock, i, index, len, mapToApply, ref, results;
    mapToApply = MAP[digit];
    ref = this.clocks;
    results = [];
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      clock = ref[index];
      results.push(clock.setState(mapToApply[index]));
    }
    return results;
  };

  return ClockNumber;

})();

clock = new ClockNumber(100, 100);

document.onclick = function() {
  return clock.shape(0);
};
