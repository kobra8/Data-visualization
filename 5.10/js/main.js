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

//Osie
var xAxisGroup = g.append("g")
	.attr("class", "x-axis")
	.attr("transform", "translate(0, " + height + ")");
var yAxisGroup = g.append("g")
	.attr("class", "y-axis");

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


//Domena

var x

var y

// Obróbka danych

d3.json("data/data.json").then((data) => {
	console.log(data);

	//Interval
	//data.forEach((x, i) => {
	var count = 0;
	d3.interval(() => {
		console.log(data[count].year) //(x[i].year)
		count++
	}, 2000);

	//	});
})
	.catch(error => console.log(error));

// Update data function
function update(data) {
	var xAxisCall = d3.axisBottom(x)



}