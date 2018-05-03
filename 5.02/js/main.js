/* Project 1 - Star Break Coffee */

var margin = { left: 80, right: 20, top: 70, bottom: 60 };
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var flag = true;

//Transision definition
var t = d3.transition().duration(2500);

var svg = d3.select("#chart-area")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
var g = svg.append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//X axis
var xAxisGroup = g.append("g")
  .attr("class", "x-axis")
  .attr("transform", "translate(0, " + height + ")");

//Y axis
var yAxisGroup =
  g.append("g")
    .attr("class", "y-axis");

//X label
g.append("text")
  .attr("class", "x axis-label")
  .attr("x", width / 2)
  .attr("y", height + 50)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("Month");

//Y label
var yLabel = g.append("text")
  .attr("class", "y axis-label")
  .attr("x", - (height / 2))
  .attr("y", -60)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Revenue");

//X domain

var x = d3.scaleBand()
  .range([0, width])
  .paddingInner(0.3)
  .paddingOuter(0.3);
//Y domain
var y = d3.scaleLinear()

  .range([height, 0]);

d3.json("data/revenues.json").then(data => {
  data.map(data => data.revenue = +data.revenue)
  data.map(data => data.profit = +data.profit)
  console.log(data);

  d3.interval(() => {
    //Simulate changing data elments length
    var newData = flag ? data : data.slice(1);

    this.update(newData);
    flag = !flag;
  }, 3000);
  //Run first time
  this.update(data);
})
  .catch(error => console.log(error));

//Update data


function update(data) {
  var value = flag ? "revenue" : "profit";
  //Domain
  x.domain(data.map(d => d.month));
  y.domain([0, d3.max(data, d => d[value])]);
  //X axis
  var xAxisCall = d3.axisBottom(x);
  this.xAxisGroup.transition(t).call(xAxisCall);
  //Y axis
  var yAxisCall = d3.axisLeft(y)
    .tickFormat(d => `$ ${d}`);
  this.yAxisGroup.transition(t).call(yAxisCall);

  //Join new data with old elements.
  var rects = g.selectAll("rect")
    .data(data, (d)=> d.month);

  //Exit old elements not present on new data
  rects.exit()
    .attr("fill", "red")
    .transition(t)
    .attr("y", y(0)) //Zerowanie wartości do animacji exit
    .attr("height", 0) //Zerowanie wartości do animacji exit
    .remove();

  //Update old elements present in new data
  rects.transition(t)
    .attr("x", d => x(d.month))
    .attr("y", d => y(d[value]))
    .attr("width", x.bandwidth)
    .attr("height", d => height - y(d[value]));

    //Enter new elements present in new data
  rects.enter()
    .append("rect")
      .attr("fill", "green")
      .attr("x", d => x(d.month))
      .attr("width", x.bandwidth)
      .attr("y", y(0)) // Wartość początkowa do animacji
      .attr("height", 0) // Wartość początkowa do animacji
      //and Update old element present in new data
      .merge(rects)
      .transition(t)
        .attr("x", d => x(d.month))
        .attr("width", x.bandwidth)
        .attr("y", d => y(d[value]))
        .attr("height", d => height - y(d[value]));

  var label = flag ? "Revenue" : "Profit";
  this.yLabel.text(label);
}