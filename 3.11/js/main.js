//Definicja marginesów
var margin = { left: 100, right: 10, top: 10, bottom: 150 };

//Definicja obszaru wykresu
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

//Definicja obszaru płótna
var svg = d3.select("#chart-area").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom);

//Definicja obszaru grupy z przesunięciem od lewej i od góry
var g = svg.append("g")
	.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

//Podpis osi x
g.append("text")
	.attr("class", "x axis-label")
	.attr("x", width / 2) // Współrzędna x, dokładnie środek poziomy grupy
	.attr("y", height + 140) // Współrzędna y, 140 od dolnego końca grupy
	.attr("font-size", "20px")
	.attr("text-anchor", "middle") // Kotwica na tekście
	.text("The world's tallest buildings");

//Podpis osi y
g.append("text")
	.attr("class", "y axis-label")
	.attr("x", - (height / 2)) // Współrzędna x, dokładnie środek pionowy grupy
	.attr("y", - 60) // Współrzędna y, -60 od lewego początku grupy
	.attr("font-size", "20px")
	.attr("text-anchor", "middle") // Kotwica na tekście
	.attr("transform", "rotate(-90)")
	.text("Height (m)");

d3.json("data/buildings.json").then((data) => {
	data.map(data => data.height = +data.height);
	console.log(data);

	//Funkcja scaleBand tworzy automatycznie wymiar(bandwith) na zadanym obszarze
	//uzwględniając padding i range, z ilości elementów podanych w domain

	var x = d3.scaleBand() // Definicja wartości funkcji scaleBand
		.domain(data.map(d => d.name)) // Mapowanie nazw budynków z tablicy
		.range([0, width])
		.paddingInner(0.3)
		.paddingOuter(0.3);

	var y = d3.scaleLinear() // Definicja wartości funkcji scaleLinear
		.domain([0, d3.max(data, d => d.height)]) // d3.max wyciąga wartość maksymalną z tablicy
		.range([height, 0]); //!!! Tutaj obrócono skalę. Najwyższy kończy się na wspóżędnej 0.

	//Definicja osi x
	var xAxisCall = d3.axisBottom(x);
	g.append("g")
		.attr("class", "x-axis")
		.call(xAxisCall) // Wywołujemy oś x
		.attr("transform", "translate(0, " + height + ")") //W przypadku osi x konieczne jest ustawienie przesunięcia od góry
		.selectAll("text") // Wybór etykiet wykresu
			.attr("text-anchor", "end") // Zakotwiczenie etykiet  na końcu tekstu
			.attr("x", "-5") // Odsunięcie etykiet od punktu zakotwiczenia x
			.attr("y", "10") // Odsunięcie etykiet od punktu zakotwiczenia y
			.attr("transform", "rotate(-40)"); //Obrót etykiet

	//Definicja osi y
	var yAxisCall = d3.axisLeft(y)
	.ticks(3) // Ilość punktów na skali (gęstość)
	.tickFormat(d => d + "m"); // Definicja jednostek przy osi y

	g.append("g")
		.attr("class", "y-axis")
		.call(yAxisCall); // Wywołujemy oś y

	//Definicja kształtów(kolumn) wykresu
	var columns = g.selectAll("rect")
		.data(data);

	//Definicja rozmieszczenia kształtów  w powiązaniu z funkcją 
	//scaleBand()-> zmienna "x" i scaleLinear() -> zmienna "y"
	columns.enter()
		.append("rect")
		.attr("x", d => x(d.name))
		.attr("y", d => y(d.height)) //!!! Współżędne początku kolumn w przypadku obrócenia
		// wykresu zaczynają się nie od 0 tylko od końca.
		.attr("width", x.bandwidth) // Wyliczany automatycznie przez scaleBand
		.attr("height", (d) => height - y(d.height)) //!!! W przypadku obrócenia skali
		// ten atrybut zwraca wysokość 0 dla najwyższego budynku
		.attr("fill", "blue");

})
	.catch(error => console.log(error));