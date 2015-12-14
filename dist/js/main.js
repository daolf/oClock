var ArtPiece, BLANK_SPACE, CLOCK_SPEED, CLOCK_WIDTH, Clock, ClockDots, ClockNumber, DOTMAP, MAP, SCREEN_HEIGHT, SCREEN_WIDTH;

SCREEN_WIDTH = screen.availWidth;

SCREEN_HEIGHT = screen.availHeight;

CLOCK_SPEED = 2;

BLANK_SPACE = 10;

CLOCK_WIDTH = (SCREEN_WIDTH - 24 * BLANK_SPACE) / 24 / 2;

MAP = [["F", "_", "_", "_", "7", "|", "F", "_", "7", "|", "|", "|", "|", "|", "|", "|", "|", "|", "|", "|", "|", "L", "_", "J", "|", "L", "_", "_", "_", "J"], ["F", "_", "_", "7", "_", "|", "|", "|", "|", "_", "L", "7", "|", "|", "_", "_", "|", "|", "|", "_", "_", "|", "|", "|", "_", "_", "L", "_", "J", "_"], ["F", "_", "_", "_", "7", "L", "_", "_", "7", "|", "F", "_", "_", "J", "|", "|", "F", "_", "_", "J", "|", "L", "_", "_", "7", "L", "_", "_", "_", "J"], ["F", "_", "_", "_", "7", "L", "_", "_", "7", "|", "F", "_", "_", "J", "|", "L", "_", "_", "7", "|", "F", "_", "_", "J", "|", "L", "_", "_", "_", "J"], ["F", "7", "_", "F", "7", "|", "|", "_", "|", "|", "|", "L", "_", "J", "|", "L", "_", "_", "7", "|", "_", "_", "_", "|", "|", "_", "_", "_", "L", "J"], ["F", "_", "_", "_", "7", "|", "F", "_", "_", "J", "|", "L", "_", "_", "7", "L", "_", "_", "7", "|", "F", "_", "_", "J", "|", "L", "_", "_", "_", "J"], ["F", "_", "_", "_", "7", "|", "F", "_", "_", "J", "|", "L", "_", "_", "7", "|", "F", "_", "7", "|", "|", "L", "_", "J", "|", "L", "_", "_", "_", "J"], ["F", "_", "_", "_", "7", "L", "_", "_", "7", "|", "_", "_", "_", "|", "|", "_", "_", "_", "|", "|", "_", "_", "_", "|", "|", "_", "_", "_", "L", "J"], ["F", "_", "_", "_", "7", "|", "F", "_", "7", "|", "|", "L", "_", "J", "|", "|", "F", "_", "7", "|", "|", "L", "_", "J", "|", "L", "_", "_", "_", "J"], ["F", "_", "_", "_", "7", "|", "F", "_", "7", "|", "|", "L", "_", "J", "|", "L", "_", "_", "7", "|", "F", "_", "_", "J", "|", "L", "_", "_", "_", "J"]];

DOTMAP = [["_", "_", "F", "7", "L", "J", "F", "7", "L", "J", "_", "_"]];

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
    this.toUp = new Point(x, y - (CLOCK_WIDTH - 5));
    this.toDown = new Point(x, y + (CLOCK_WIDTH - 5));
    this.minuteHand = new Path.Line({
      from: this.from,
      to: this.toUp,
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
      to: this.toDown,
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
      strokeWidth: 2
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
        return this.setHandPosition(180, 90);
      case "F":
        return this.setHandPosition(-90, 180);
      case "7":
        return this.setHandPosition(0, -90);
      case "J":
        return this.setHandPosition(90, 0);
      case "|":
        return this.setHandPosition(180, 180);
      case "_":
        return this.setHandPosition(90, 90);
    }
  };

  return Clock;

})();

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

ClockDots = (function() {
  function ClockDots(x, y) {
    var s;
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    s = BLANK_SPACE + CLOCK_WIDTH * 2;
    this.clocks = [new Clock(x + s, y), new Clock(x + 2 * s, y), new Clock(x + s, y + s), new Clock(x + 2 * s, y + s), new Clock(x + s, y + s * 2), new Clock(x + 2 * s, y + s * 2), new Clock(x + s, y + s * 3), new Clock(x + 2 * s, y + s * 3), new Clock(x + s, y + s * 4), new Clock(x + 2 * s, y + s * 4), new Clock(x + s, y + s * 5), new Clock(x + 2 * s, y + s * 5)];
  }

  ClockDots.prototype.shape = function(digit) {
    var clock, i, index, len, mapToApply, ref, results;
    mapToApply = DOTMAP[digit];
    ref = this.clocks;
    results = [];
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      clock = ref[index];
      results.push(clock.setState(mapToApply[index]));
    }
    return results;
  };

  return ClockDots;

})();

ArtPiece = (function() {
  function ArtPiece() {
    var beginX, s;
    s = BLANK_SPACE + CLOCK_WIDTH * 2;
    beginX = CLOCK_WIDTH;
    this.hour = new ClockNumber(beginX, 100);
    this.hour2 = new ClockNumber(beginX + 5 * s, 100);
    this.dot = new ClockDots(beginX + 10 * s, 100);
    this.minute = new ClockNumber(beginX + 12 * s, 100);
    this.minute2 = new ClockNumber(beginX + 17 * s, 100);
  }

  return ArtPiece;

})();

new ArtPiece();

document.onclick = function() {
  hour.shape(1);
  hour2.shape(8);
  dot.shape(0);
  minute.shape(4);
  return minute2.shape(3);
};
