var Clock, clock;

Clock = (function() {
  function Clock() {
    this.hello = "Hello World!";
  }

  Clock.prototype.helloWorld = function() {
    return console.log(this.hello);
  };

  return Clock;

})();

console.log("hello");

clock = new Clock();

clock.helloWorld();
