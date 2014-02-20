APP.onResize();

$(window).on("resize", function() {
  APP.onResize();
});

APP.interval = setInterval(function () {
  APP.addPoint();
  APP.count++;
  $("#progress").text(d3.format(".2%")(APP.count/APP.times) + " " + d3.format(",")(APP.count) + "/" + d3.format(",")(APP.times));
  if (APP.count >= APP.times) {
    clearInterval(APP.interval);
  }
}, 0);