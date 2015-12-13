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
      onFrame: (event) ->
        console.log @
        this.rotate(CLOCK_SPEED, self.from)

    @hourHand = new Path.Line
      from: @from
      to: @to
      strokeColor: 'black'
      strokeCap: 'round'
      strokeWidth: 4
      onFrame: (event) ->
        console.log @
        this.rotate(CLOCK_SPEED/60, self.from)

    @container = new Path.Circle
      center: @center
      radius: CLOCK_WIDTH
      strokeColor: 'black'
      strokeWidth: 3
    

clock = new Clock(100,100)
