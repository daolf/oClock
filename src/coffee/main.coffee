SCREEN_WIDTH = screen.availWidth
SCREEN_HEIGHT = screen.availHeight
CLOCK_SPEED = 2
BLANK_SPACE = 5
CLOCK_WIDTH = Math.floor((SCREEN_WIDTH - 36* BLANK_SPACE ) / 74)
console.log CLOCK_WIDTH
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

DOTMAP = [
  [ "_", "_",
    "F", "7",
    "L", "J",
    "F", "7",
    "L", "J",
    "_", "_"
  ]
]

class Clock
  constructor: (x = 0, y = 0) ->
    self = @
    @center = new Point(x, y)
    @from = new Point(x, y)
    @toUp = new Point(x, y - (CLOCK_WIDTH - 5 ))
    @toDown = new Point(x, y + (CLOCK_WIDTH - 5 ))
    
    @minuteHand = new Path.Line
      from: @from
      to: @toUp
      strokeColor: 'black'
      strokeCap: 'round'
      strokeWidth: 4
      applyMatrix: false
      onFrame: (event) ->
        this.rotate(CLOCK_SPEED, self.from)

    @hourHand = new Path.Line
      from: @from
      to: @toDown
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
      strokeWidth: 2
  
  pause: ->
    @hourHand.onFrame = (event) ->
      this.rotate(0)

  play: ->
    thisFrom = @from
    @minuteHand.onFrame = (event) ->
      this.rotate(CLOCK_SPEED, thisFrom)
    @hourHand.onFrame = (event) ->
      this.rotate(CLOCK_SPEED/2, thisFrom)

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
      when "L" then this.setHandPosition(180,90)
      when "F" then this.setHandPosition(-90,180)
      when "7" then this.setHandPosition(0,-90)
      when "J" then this.setHandPosition(90,0)
      when "|" then this.setHandPosition(180,180)
      when "_" then this.setHandPosition(90,90)


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

  play: ->
    for clock in @clocks
      clock.play()

class ClockDots
  constructor: (x = 0, y = 0) ->
    s = BLANK_SPACE + CLOCK_WIDTH*2
    @clocks = [
      new Clock(x + s,y)      , new Clock(x + 2*s, y)       , 
      new Clock(x + s,y + s)  , new Clock(x + 2*s, y + s)   , 
      new Clock(x + s,y + s*2), new Clock(x + 2*s, y + s*2) , 
      new Clock(x + s,y + s*3), new Clock(x + 2*s, y + s*3) , 
      new Clock(x + s,y + s*4), new Clock(x + 2*s, y + s*4) , 
      new Clock(x + s,y + s*5), new Clock(x + 2*s, y + s*5) 
    ]

  play: ->
    for clock in @clocks
      clock.play()

  shape: (digit) ->
    mapToApply = DOTMAP[digit]
    for clock, index in @clocks
      clock.setState(mapToApply[index])
    

class ArtPiece

  constructor: ->
    s = BLANK_SPACE + CLOCK_WIDTH*2
    beginX = CLOCK_WIDTH
    @hour = new ClockNumber(beginX, 100)
    @hour2 = new ClockNumber(beginX + 5 * s, 100)
    @dot = new ClockDots(beginX + 10 * s, 100)
    @minute = new ClockNumber(beginX + 12 * s, 100)
    @minute2 = new ClockNumber(beginX + 17 * s, 100)
    @dot2 = new ClockDots(beginX + 22 * s, 100)
    @second = new ClockNumber(beginX + 24 * s, 100)
    @second2 = new ClockNumber(beginX + 29 * s, 100)

  play: ->
    console.log "Play"
    @hour.play()
    @hour2.play()
    @dot.play()
    @minute.play()
    @minute2.play()
    @dot2.play()
    @second.play()
    @second2.play()

  setTime: ->
    d = new Date()
    hours = d.getHours()
    minutes =  d.getMinutes()
    seconds = d.getSeconds()
    getTen = (number) -> Math.floor(number/10)

    @hour.shape(getTen(hours))
    @hour2.shape(hours%10)
    @dot.shape(0)
    @minute.shape(getTen(minutes))
    @minute2.shape(minutes%10)
    @dot2.shape(0)
    @second.shape(getTen(seconds))
    @second2.shape(seconds%10)

artPiece = new ArtPiece()

play = (artPiece) ->
  artPiece.play()
  setTimeout (->
    setTime artPiece 
  ), 3500

setTime = (artPiece) ->
  artPiece.setTime()
  setTimeout (->
    play artPiece
  ), 6000

setTimeout (->
  setTime artPiece
), 3500

