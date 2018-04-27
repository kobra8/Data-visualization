/* Project 1 - Star Break Coffee */

var margin = {left: 40, right: 20, top: 10, bottom: 30};
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var g = d3.select("#chart-area")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("transform", "translate("+ margin.left + "," + margin.top +")");

d3.json("data/revenues.json").then( data => {
  data.map( data => data.revenue = + data.revenue)
  console.log(data);

  var x = d3.scaleBand()
      .domain(data.map( d => d.month))
      .range([0, width])
      .paddingInner(0.3)
      .paddingOuter(0.3);

  var y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.revenue)])
      .range([height, 0]);  

  var xAxisCall = d3.axisBottom(x);
    g.append("g")
    .attr("class", "x-axis")
    .call(xAxisCall)
    .attr("transform","translate(0, "+ height +")")
    .attr("y", "10")

  g.append("rect")
    .attr("x",20)
    .attr("y",20)
    .attr("width",20)
    .attr("height",20)
    .attr("fill","green");


})
.catch(errror => console.log(errror));

