(function (){
  var APP = {};

  var msgeArray = [];
  var svg = d3.select("#chatlog").append("svg").attr("width", 600).attr("height", 800);
  var colors = d3.scale.ordinal().range(['#967448','#3d3356','#187300','#5085b6','#ba365d','#f58337','#85ab8f']);

  function coords (x, y, p) {
    return p <= 701 ? {x: 0.81 * x + 0.07  * y + 0.12, y: -0.04 * x + 0.84 * y + 0.195}: 
           p <= 851 ? {x: 0.18 * x - 0.25  * y + 0.12, y: 0.27  * x + 0.23 * y + 0.02 }:
           p <= 980 ? {x: 0.19 * x + 0.275 * y + 0.16, y: 0.238 * x - 0.14 * y + 0.12 }:
           {x: 0.0235 * x + 0.087 * y + 0.11, y: 0.045 * x + 0.1666 * y};
  }

  // w1(x,y)=(0.81x+0.07y+0.12, -0.04x+0.84y+0.195)
  // w2(x,y)=(0.18x-0.25y+0.12, 0.27x+0.23y+0.02)
  // w3(x,y)=(0.19x+0.275y+0.16, 0.238x-0.14y+0.12)
  // w4(x,y)=0.0235x+0.087y+0.11, 0.045x+0.1666y)
  // p1=0.701, p2=0.150, p3=0.129, p4=0.020

  function renderFractal(data) {
    var usableHeight = 475;
    var yScale = d3.scale.ordinal().rangeRoundBands([0, usableHeight], .1);

    yScale.domain(data.map(function (d) { return d.objectId; }));

    svg.selectAll(".fractalGroup")
        .data(data, function(d) { return d.objectId; })
        .enter()
          .append("g")
            .attr("class", "fractalGroup")
            .attr("transform", function (d) { return "translate(1000," + (yScale(d.objectId) - usableHeight) + ")"; })
            .style("fill-opacity", .5)
            .each(function (d, i) {
              d3.select(this)
                .append("circle")
                  .style("fill", function (d) { return colors(d.username) })
                  .style("opacity", .4)
                  .attr("cx", 28)
                  .attr("cy", yScale.rangeBand())
                  .attr("r", 20)
              });

    svg.selectAll(".fractalGroup")
        .data(data, function (d) { return d.objectId; })
          .transition()
          .duration(500)
          .attr("transform", function (d) { return "translate(0," + (d.y0 = yScale(d.objectId)) + ")"; })
          .style("fill-opacity", 1);

    svg.selectAll(".fractalGroup")
        .data(data, function (d) { return d.objectId; })
        .exit()
          .transition()
          .duration(500)
          .attr("transform", function (d) { return "translate(1000," + (d.y0 - usableHeight/4) + ")"; })
          .style("fill-opacity", 0)
          .remove();
  }

}())