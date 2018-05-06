/* Project 2 - Gapminder Clone */

// Obszar wykresu
var margin = { left: 80, right: 20, top: 70, bottom: 60 };
var width = 800 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var tr = d3.transition().duration(1500);

var svg = d3.select("#chart-area")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom);

var g = svg.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Etykiety
var xLabel = g.append("text")
	.attr("class", "x axis-label")
	.attr("x", width / 2)
	.attr("y", height + 50)
	.attr("font-size", "20px")
	.attr("text-anchor", "middle")
	.text("GDP per capita ($)");

var yLabel = g.append("text")
	.attr("class", "y axis-label")
	.attr("x", height / 2)
	.attr("y", - 60)
	.attr("font-size", "20px")
	.attr("text-anchor", "middle")
	.attr("transform", "rotate(-90)")
	.text("Life expentancy (years)");

//Scale
var x = d3.scaleLog()
	.domain([300, 150000])
	.range([0, width])
	.base(10);

var y = d3.scaleLinear()
	.domain([0, 90])
	.range([height, 0]);

// Obróbka danych

d3.json("data/data.json").then((data) => {
	console.log(data);
	var newData = data[200].countries.filter(x => x.income !== null);
	console.log(newData)
	//Interval
	// var count = 0;
	// d3.interval(() => {
	// 	console.log(data[count].year) //(x[i].year)
	// 	count++
	// }, 2000);



	//Osie
	var xAxisCall = d3.axisBottom(x)
		.tickValues([400, 4000, 40000])
		.tickFormat(d => `$ ${d}`)
	g.append("g")
		.attr("class", "x-axis")
		.attr("transform", "translate(0, " + height + ")")
		.call(xAxisCall);

	var yAxisCall = (d3.axisLeft(y))
	g.append("g")
		.attr("class", "y-axis")
		.call(yAxisCall);

	this.update(...data[200].countries);

})
	.catch(error => console.log(error));

// Update data function
function update(data) {
	console.log(data)
	var bubbles = g.selectAll("circle")
		.data(data);
	bubbles.enter()
		.append("circle")
			.attr("cx", x(d => d.income))
			.attr("cy", y(d => d.life_exp))
			.attr("r", 10)
			.attr("fill", "orange")



}