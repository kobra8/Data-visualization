/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

var svg = d3.select("#chart-area").append("svg")
    .attr("width", 400)
    .attr("height", 400);

d3.json("data/buildings.json").then((data) => {
    data.map(data => data.height = +data.height);
    console.log(data);

    //Funkcja scaleBand tworzy automatycznie wymiar(bandwith) na zadanym obszarze
    //uzwględniając padding i range, z ilości elementów podanych w domain

    var x = d3.scaleBand() // Definicja wartości funkcji scaleBand
        .domain(data.map(d => d.name)) // Mapowanie nazw budynków z tablicy
        .range([0, 400])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    var y = d3.scaleLinear() // Definicja wartości funkcji scaleLinear
        .domain([0, d3.max(data, d => d.height)]) // d3.max wyciąga wartość maksymalną z tablicy
        .range([0, 400]);

    var columns = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => x(d.name))
        .attr("y", 20)
        .attr("width", x.bandwidth) // Wyliczany automatycznie przez scaleBand
        .attr("height", (d) => y(d.height)) // Uzycie funkcji scaleLinear
        .attr("fill", "blue");

})
    .catch(error => console.log(error));