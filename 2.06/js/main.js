/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/

var data = [25,20,10,5,10,20,25]

var svg = d3.select("#chart-area").append("svg")
  .attr("width", 600)
  .attr("height", 400);

  var circles = svg.selectAll('circle').data(data); //Wybiera wszystkie circle, choc jeszcze nie istnieją

  circles.enter() // enter umożliwia uzycie funkcji i iteruje po danych
    .append("circle")
      .attr("cx", (d,i) => (i * 50) + 25 )
      .attr("cy", 50)
      .attr("r", d => d)
      .attr("fill", "red");
