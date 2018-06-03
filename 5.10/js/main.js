/* Project 2 - Gapminder Clone */

// Obszar wykresu
var margin = { left: 80, right: 20, top: 50, bottom: 100 };
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

var area = d3.scaleLinear()
	.domain([2000, 1400000000])
	.range([25 * Math.PI, 1500 * Math.PI]);

var color = d3.scaleOrdinal(d3.schemePastel2)


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

// Obróbka danych
d3.json("data/data.json").then((data) => {
	console.log(data);

//	console.log("Filtered: ", dataFiltered)

	//Interval
	var count = 0;
	d3.interval(() => {
		//	console.log(data[count].countries) //(x[i].year)
		console.log(count);
		var dataFiltered = data[count].countries.filter(x => {
			return x.income !== null && x.life_exp !== null && x.population !== null
		});

		this.update(dataFiltered);
		count++
		if (count === data.length) {
			count = 0;
		}
	}, 500);
})
	.catch(error => console.log(error));

// Update data function
function update(data) {
	var bubbles = g.selectAll("circle")
		.data(data);

	bubbles.exit()
		.attr("class", "exit" )
		.remove();	

	bubbles.enter()
		.append("circle")
		.merge(bubbles)
		.attr("cx", d => x(d.income))
		.attr("cy", d => y(d.life_exp))
		.attr("r", d => Math.sqrt(area(d.population) / Math.PI))
		.attr("fill", d => color(d.continent))




}