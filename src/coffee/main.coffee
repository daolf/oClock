CLOCK_WIDTH = 40
CLOCK_SPEED = 2

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
        this.rotate(CLOCK_SPEED/2, self.from)

    @container = new Path.Circle
      center: @center
      radius: CLOCK_WIDTH
      strokeColor: 'black'
      strokeWidth: 3

    return
  
  pause: ->
    @hourHand.onFrame = (event) ->
      this.rotate(0)

  play: ->
    thisFrom = @from
    @minuteHand.onFrame = (event) ->
      this.rotate(CLOCK_SPEED/2, thisFrom)
    @hourHand.onFrame = (event) ->
      this.rotate(CLOCK_SPEED, thisFrom)

  goto: (hand, angle) ->
    thisFrom = @from
    hand.onFrame = (event) ->
      if angle > 0
        diff = angle - hand.getRotation()
      else 
        diff = Math.abs(hand.getRotation() - angle)

      if diff > CLOCK_SPEED
        this.rotate(CLOCK_SPEED, thisFrom)
      else if diff < CLOCK_SPEED
        this.rotate(diff, thisFrom)
        this.rotate(0 , thisFrom)
        this.onFrame = undefined
  
  setHandPosition: (minutePosition, hourPostion) ->
    this.goto(this.hourHand,minutePosition)
    this.goto(this.minuteHand,hourPostion)


  setState: (state) ->
    switch state
      when "PLAY" then this.play()
      when "PAUSE" then this.pause()
      when "3" then this.setHandPosition(0,90)
      when "6" then this.setHandPosition(0,180)
      when "9" then this.setHandPosition(0,-90)
      when "0" then this.setHandPosition(0,0)
      when "VERTICAL" then this.setHandPosition(0,180)
      when "HORIZONTAL" then this.setHandPosition(-90,90)


clock = new Clock(100,100)
clock.setState("PLAY")

click = 0
document.onclick = ->
  clock.setState("6")
