class Clock
  constructor: () ->
    @hello = "Hello World!"


  helloWorld: () ->
    console.log @hello

console.log "hello"
clock = new Clock()
clock.helloWorld()
