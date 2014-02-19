(function (){
  var APP = {};
  var width = 800, height = 600;
  var pointsArray = [];
  var basePoint = {x: width / 2, y: height / 2 };
  var svg = d3.select("#svg-container").append("svg").attr("width", width).attr("height", height);
  var colors = d3.scale.ordinal().range(['#967448','#3d3356','#187300','#5085b6','#ba365d','#f58337','#85ab8f']);

  function getCoords (x, y) {
    p = _.random(1,1000);
    return p <= 701 ? {x: 0.81 * x + 0.07  * y + 0.12, y: -0.04 * x + 0.84 * y + 0.195}: 
           p <= 851 ? {x: 0.18 * x - 0.25  * y + 0.12, y: 0.27  * x + 0.23 * y + 0.02 }:
           p <= 980 ? {x: 0.19 * x + 0.275 * y + 0.16, y: 0.238 * x - 0.14 * y + 0.12 }:
           {x: 0.0235 * x + 0.087 * y + 0.11, y: 0.045 * x + 0.1666 * y};
  }

  APP.addPoint = function () {
    var xy = getCoords(basePoint.x, basePoint.y);
    basePoint = xy;
    console.log("basePoint", basePoint);
    pointsArray.push({objectId: _.unqueId('p_'), x: xy.x, y: xy.y});
    renderFractal(pointsArray);
  }

  // w1(x,y)=(0.81x+0.07y+0.12, -0.04x+0.84y+0.195)
  // w2(x,y)=(0.18x-0.25y+0.12, 0.27x+0.23y+0.02)
  // w3(x,y)=(0.19x+0.275y+0.16, 0.238x-0.14y+0.12)
  // w4(x,y)=0.0235x+0.087y+0.11, 0.045x+0.1666y)
  // p1=0.701, p2=0.150, p3=0.129, p4=0.020

  function renderFractal(data) {

    svg.selectAll(".fractalPoint")
      .data(data, function (d) { return d.objectId; })
      .enter()
        .append("circle")
          .attr("class", "fractalPoint")
          .style("fill", "blue")
          .style("opacity", .4)
          .attr("cx", 0)
          .attr("cy", 0)
          .attr("r", 3);

    svg.selectAll(".fractalPoint")
      .data(data, function (d) { return d.objectId; })
        .transition()
        .duration(500)
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; })
        .style("fill-opacity", 1);

    svg.selectAll(".fractalPoint")
      .data(data, function (d) { return d.objectId; })
      .exit()
        .transition()
        .duration(500)
        .attr("cx", 1000)
        .attr("cy", 1000)
        .style("fill-opacity", 0)
        .remove();
  }
  window.APP = APP;

}())