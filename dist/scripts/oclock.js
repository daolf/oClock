
/*
  EXAMPLE Class
 */

(function() {
  var root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.EXAMPLE = (function() {
    function EXAMPLE() {
      this.hello = "Hello World!";
    }

    EXAMPLE.prototype.helloWorld = function() {
      return console.log(this.hello);
    };

    return EXAMPLE;

  })();

}).call(this);

(function() {
  jQuery(function() {
    var example, root;
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    example = new root.EXAMPLE();
    return example.helloWorld();
  });

}).call(this);
