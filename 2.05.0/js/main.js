/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/
var svg = d3.select("#chart-area").append("svg")
  .attr("width", 600)
  .attr("height", 600);

  var circle = svg.append("circle")
    .attr("cx",200)
    .attr("cy", 200)
    .attr("r", 100)
    .attr("fill","blue");
    
  var rectangle = svg.append("rect")
    .attr("x",10)
    .attr("y",10)
    .attr("width",150)
    .attr("height",80)
    .attr("fill","green");
  
  var ellpise = svg.append('ellipse')
  .attr('cx', 300)
  .attr('cy', 400)
  .attr('rx', 100)
  .attr('ry', 50)
  .attr('fill', "red");

 var line = svg.append('line')
  .attr('x1',20) 
  .attr('y1',500) 
  .attr('x2',580) 
  .attr('y2',500) 
  .attr('stroke','orange') 
  .attr('stroke-width', 3);