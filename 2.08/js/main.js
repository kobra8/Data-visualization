/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

var svg = d3.select("#chart-area").append("svg");

d3.json("data/buildings.json").then((data)=> {
    data.map(data => data.height = +data.height);
    console.log(data);

})
.catch(error => console.log(error));