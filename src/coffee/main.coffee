CANVAS = document.getElementById("myCanvas")
CONTEXT = CANVAS.getContext("2d")

class Clock
  constructor: () ->
    @hello = "Helloooooo World!"
    @ctx = CONTEXT


  draw: () ->
    @ctx.beginPath();
    @ctx.arc(0,0,100,0,2*Math.PI);
    @ctx.stroke();

  helloWorld: () ->
    console.log @hello

clock = new Clock()
path = new Path();
path.strokeColor = 'black';
start = new Point(100, 100);
path.moveTo(start);
path.lineTo(start + [ 100, -50 ]);