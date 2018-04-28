/* Project 1 - Star Break Coffee */

var margin = {left: 80, right: 20, top: 70, bottom: 60};
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var svg = d3.select("#chart-area")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    var g = svg.append('g')
    .attr("transform", "translate("+ margin.left + "," + margin.top +")");

  g.append("text")
    .attr("class", "x axis-label")
    .attr("x", width / 2)
    .attr("y", height + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Month");
  
  g.append("text")
    .attr("class", "y axis-label")
    .attr("x", - (height / 2))
    .attr("y", -60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenue");

d3.json("data/revenues.json").then( data => {
  data.map( data => data.revenue = +data.revenue)
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
   
  var yAxisCall = d3.axisLeft(y)
    .ticks(10)
    .tickFormat(d => `$ ${d}`);

    g.append("g")
      .attr("class", "y-axis")
      .call(yAxisCall);

  var rects = g.selectAll("rect")
  .data(data);
  rects.enter()
    .append("rect")
      .attr("x", d => x(d.month))
      .attr("y", d => y(d.revenue))
      .attr("width", x.bandwidth)
      .attr("height", d => height - y(d.revenue))
      .attr("fill","green");
})

.catch(errror => console.log(errror));

