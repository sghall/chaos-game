(function (){
  var APP = {};
  var width = 2, height = 2;
  var pointsArray = [];
  var basePoint = {x: 0, y: 0};
  var svg = d3.select("#main-svg")
  var colors = ['#006600','#663333','#CC0033','#330099'];

  APP.times = 10000;
  APP.count = 0;

  function getCoords(x, y) {
    p = random(1,1000);
    return p <= 701 ? {c: 0, x: 0.81 * x + 0.07  * y + 0.12, y: -0.04 * x + 0.84 * y + 0.195}: 
           p <= 851 ? {c: 1, x: 0.18 * x - 0.25  * y + 0.12, y: 0.27  * x + 0.23 * y + 0.02 }:
           p <= 980 ? {c: 2, x: 0.19 * x + 0.275 * y + 0.16, y: 0.238 * x - 0.14 * y + 0.12 }:
           {c: 3, x: 0.0235 * x + 0.087 * y + 0.11, y: 0.045 * x + 0.1666 * y};
  }

  function random(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  function renderPoint(data) {
    svg.append("circle")
      .attr("class", "fractalPoint")
      .style("fill", colors[data.c])
      .style("opactiy", .5)
      .attr("cx", data.x)
      .attr("cy", data.y)
      .attr("r", .002)
  }

  APP.addPoint = function () {
    var xy = getCoords(basePoint.x, basePoint.y);
    basePoint = xy;
    renderPoint({c: xy.c, x: xy.x + width / 5, y: xy.y + height / 10});
  }

  APP.onResize = function () {
    var aspect = 2 / 2, chart = $("#main-svg");
    var targetWidth = chart.parent().width();
    chart.attr("width", targetWidth);
    chart.attr("height", targetWidth / aspect);
  }

  window.APP = APP;

}())