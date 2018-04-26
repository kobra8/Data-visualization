
var svg = d3.select("#chart-area").append("svg")
.attr("width", 400)
.attr("height", 400);

d3.json("data/buildings.json").then((data)=> {
    data.map(data => data.height = +data.height);
    console.log(data);

    var y = d3.scaleLinear() // Definicja wartości funkcji scaleLinear
        .domain([0, 828])
        .range([0, 400]);
    
    var columns = svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i)=> i * 60)
    .attr("y", 20)
    .attr("width", 40)
    .attr("height", (d)=> y(d.height)) // Uzycie funkcji scaleLinear
    .attr("fill", "blue");

})
.catch(error => console.log(error));