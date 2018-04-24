/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/


d3.json("data/buildings.json").then((data)=> {
    data.map(data => data.height = +data.height);
    console.log(data);
    
    var svg = d3.select("#chart-area").append("svg")
    .attr("width", 500)
    .attr("height", 500);
    var columns = svg.selectAll("rect").data(data);

    columns.enter().append("rect")
    .attr("x", (d, i)=> i * 50)
    .attr("y", 50)
    .attr("width", 30)
    .attr("height", (d)=> d.height)
    .attr("fill", "blue");

})
.catch(error => console.log(error));