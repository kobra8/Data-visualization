/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/

d3.json("data/ages.json").then(function (data) {
  data.map(d => d.age = +d.age) // Konwersja typów ze stringa na number: str = +str

  var svg = d3.select("#chart-area").append("svg")
    .attr("width", 600)
    .attr("height", 400);

  var circles = svg.selectAll('circle').data(data); //Wybiera wszystkie circle, choc jeszcze nie istnieją

  circles.enter() // enter umożliwia uzycie funkcji i iteruje po danych
    .append("circle")
    .attr("cx", (d, i) => (i * 50) + 25)
    .attr("cy", 50)
    .attr("r", d => d.age)
    .attr("fill", d => d.name == "Tony" ? "blue" : "red");
}).catch(error => console.log(error));

