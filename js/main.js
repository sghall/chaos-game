APP.onResize();

$(window).on("resize", function() {
  APP.onResize();
});

APP.interval = setInterval(function () {
  APP.addPoint();
  APP.count++;
  if (APP.count > 20000) {
    clearInterval(APP.interval);
  }
}, 0);