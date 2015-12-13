CLOCK_WIDTH = 20
CLOCK_SPEED = 2
BLANK_SPACE = 10
MAP = [
  #0
  [ "F", "_", "_", "_", "7",
    "|", "F", "_", "7", "|",
    "|", "|", "|", "|", "|",
    "|", "|", "|", "|", "|",
    "|", "L", "_", "J", "|",
    "L", "_", "_", "_", "J"
  ],
  #1
  [ "F", "_", "_", "7", "_",
    "|", "|", "|", "|", "_",
    "L", "7", "|", "|", "_",
    "_", "|", "|", "|", "_",
    "_", "|", "|", "|", "_",
    "_", "L", "_", "J", "_"
  ],
  #2
  [ "F", "_", "_", "_", "7",
    "L", "_", "_", "7", "|",
    "F", "_", "_", "J", "|",
    "|", "F", "_", "_", "J",
    "|", "L", "_", "_", "7",
    "L", "_", "_", "_", "J"
  ],
  #3
  [ "F", "_", "_", "_", "7",
    "L", "_", "_", "7", "|",
    "F", "_", "_", "J", "|",
    "L", "_", "_", "7", "|",
    "F", "_", "_", "J", "|",
    "L", "_", "_", "_", "J"
  ],
  #4
  [ "F", "7", "_", "F", "7",
    "|", "|", "_", "|", "|",
    "|", "L", "_", "J", "|",
    "L", "_", "_", "7", "|",
    "_", "_", "_", "|", "|",
    "_", "_", "_", "L", "J"
  ],
  #5
  [ "F", "_", "_", "_", "7",
    "|", "F", "_", "_", "J",
    "|", "L", "_", "_", "7",
    "L", "_", "_", "7", "|",
    "F", "_", "_", "J", "|",
    "L", "_", "_", "_", "J"
  ],
  #6
  [ "F", "_", "_", "_", "7",
    "|", "F", "_", "_", "J",
    "|", "L", "_", "_", "7",
    "|", "F", "_", "7", "|",
    "|", "L", "_", "J", "|",
    "L", "_", "_", "_", "J"
  ],
  #7
  [ "F", "_", "_", "_", "7",
    "L", "_", "_", "7", "|",
    "_", "_", "_", "|", "|",
    "_", "_", "_", "|", "|",
    "_", "_", "_", "|", "|",
    "_", "_", "_", "L", "J"
  ],
  #8
  [ "F", "_", "_", "_", "7",
    "|", "F", "_", "7", "|",
    "|", "L", "_", "J", "|",
    "|", "F", "_", "7", "|",
    "|", "L", "_", "J", "|",
    "L", "_", "_", "_", "J"
  ],
  #9
  [ "F", "_", "_", "_", "7",
    "|", "F", "_", "7", "|",
    "|", "L", "_", "J", "|",
    "L", "_", "_", "7", "|",
    "F", "_", "_", "J", "|",
    "L", "_", "_", "_", "J"
  ],

]

class Clock
  constructor: (x = 0, y = 0) ->
    self = @
    @center = new Point(x, y)
    @from = new Point(x, y)
    @to = new Point(x, y - (CLOCK_WIDTH - 5 ))
    
    @minuteHand = new Path.Line
      from: @from
      to: @to
      strokeColor: 'black'
      strokeCap: 'round'
      strokeWidth: 4
      applyMatrix: false
      onFrame: (event) ->
        this.rotate(CLOCK_SPEED, self.from)

    @hourHand = new Path.Line
      from: @from
      to: @to
      strokeColor: 'black'
      strokeCap: 'round'
      strokeWidth: 4
      applyMatrix: false
      onFrame: (event) ->
        this.rotate(CLOCK_SPEED, self.from)

    @container = new Path.Circle
      center: @center
      radius: CLOCK_WIDTH
      strokeColor: 'black'
      strokeWidth: 3
  
  pause: ->
    @hourHand.onFrame = (event) ->
      this.rotate(0)

  play: ->
    thisFrom = @from
    @minuteHand.onFrame = (event) ->
      this.rotate(CLOCK_SPEED, thisFrom)
    @hourHand.onFrame = (event) ->
      this.rotate(CLOCK_SPEED, thisFrom)

  goto: (hand, angle) ->
    thisFrom = @from
    hand.onFrame = (event) ->
      if angle > 0
        diff = angle - hand.getRotation()
      else 
        diff = Math.abs(hand.getRotation() - angle)

      if Math.abs(diff) > CLOCK_SPEED
        this.rotate(CLOCK_SPEED, thisFrom)
      else if Math.abs(diff) < CLOCK_SPEED
        this.rotate(diff, thisFrom)
        this.rotate(0 , thisFrom)
        this.onFrame = undefined
  
  setHandPosition: (minutePosition, hourPostion) ->
    this.goto(this.hourHand,minutePosition)
    this.goto(this.minuteHand,hourPostion)


  setState: (state) ->
    switch state
      #State have fancy names to make mapping easier with visual help
      when "PLAY" then this.play()
      when "PAUSE" then this.pause()
      when "L" then this.setHandPosition(0,90)
      when "F" then this.setHandPosition(90,180)
      when "7" then this.setHandPosition(180,-90)
      when "J" then this.setHandPosition(-90,0)
      when "|" then this.setHandPosition(0,180)
      when "_" then this.setHandPosition(-90,90)


class ClockNumber
  constructor: (x = 0, y = 0) ->
    s = BLANK_SPACE + CLOCK_WIDTH*2
    @clocks = [
      new Clock(x + s,y)      , new Clock(x + 2*s, y)       , new Clock(x + 3*s, y)       , new Clock(x + 4*s, y)       , new Clock(x + 5*s, y),
      new Clock(x + s,y + s)  , new Clock(x + 2*s, y + s)   , new Clock(x + 3*s, y + s)   , new Clock(x + 4*s, y + s)   , new Clock(x + 5*s, y + s),
      new Clock(x + s,y + s*2), new Clock(x + 2*s, y + s*2) , new Clock(x + 3*s, y + s*2) , new Clock(x + 4*s, y + s*2) , new Clock(x + 5*s, y + s*2),
      new Clock(x + s,y + s*3), new Clock(x + 2*s, y + s*3) , new Clock(x + 3*s, y + s*3) , new Clock(x + 4*s, y + s*3) , new Clock(x + 5*s, y + s*3),
      new Clock(x + s,y + s*4), new Clock(x + 2*s, y + s*4) , new Clock(x + 3*s, y + s*4) , new Clock(x + 4*s, y + s*4) , new Clock(x + 5*s, y + s*4),
      new Clock(x + s,y + s*5), new Clock(x + 2*s, y + s*5) , new Clock(x + 3*s, y + s*5) , new Clock(x + 4*s, y + s*5) , new Clock(x + 5*s, y + s*5)
    ]

  shape: (digit) ->
    mapToApply = MAP[digit]
    for clock, index in @clocks
      clock.setState(mapToApply[index])
    

# clock = new Clock(100, 100)
# document.onclick = ->
#   clock.setState("_")

clock = new ClockNumber(100, 100)
document.onclick = ->
  clock.shape(8)
