/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/
var svg = d3.select("#chart-area").append("svg");

svg.attr("width", 600).attr("height", 400);

d3.json("data/revenues.json").then( res => {
  console.log(res);




  svg.append("rect")
    .attr("x",20)
    .attr("y",20)
    .attr("width",20)
    .attr("height",20)
    .attr("fill","green");


})
.catch(errror => console.log(errror));

