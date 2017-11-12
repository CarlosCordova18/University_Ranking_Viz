// This function maps each rank into the range that corresponds to it
function getRange(rank) {
    // If this is a number
    if (+rank) {
        if (+rank <= 100) {
            // First range
            return "Between 1 and 100";
        } else if (+rank <= 200) {
            // Second range
            return "Between 100 and 200";
        }
    } else {
        // This is a string
        if (rank == "201-250" || rank == "251-300") {
            // Third range
            return "Between 200 and 300";
        } else if (rank == "301-350" || rank == "351-400") {
            // Fourth range
            return "Between 300 and 400";
        } else if (rank == "401-500") {
            // Fifth range
            return "Between 400 and 500";
        } else if (rank == "501-600") {
            // Sixth range
            return "Between 500 and 600";
        } else if (rank == "601-800") {
            // Seventh range
            return "Between 600 and 800";
        } else {
            // Just for debug purposes
            return "ERROR";
        }
    }
}

function createStackedBar(dataset) {
    // This works as a dictionary to save the dataset
    var countries = { };
    // Auxiliars
    var countryName, rank;

    // Go through all the dataset counting the universities in each ranking for each country
    for (var i = 0; i < dataset.length; i++) {
        countryName = dataset[i]['Country'];
        rank = getRange(dataset[i]['World_Rank']);
        if (countries[countryName]) {
            countries[countryName][rank]++;
        } else {
            countries[countryName] = { 
                'State': countryName,
                'Between 600 and 800': 0,
                'Between 500 and 600': 0,
                'Between 400 and 500': 0,
                'Between 300 and 400': 0,
                'Between 200 and 300': 0,
                'Between 100 and 200': 0,
                'Between 1 and 100': 0
            }
            countries[countryName][rank]++;
        }
    }
    // Now we want an array of objects, not a dictionary, this is the purpose of 'dataset'
    var dataset = [];
    for (var country in countries) {
        if (countries.hasOwnProperty(country)) {
            var element = countries[country];
            dataset.push(element);
        }
    }
    // Create the stacked bar chart
    var margin = {top: 20, right: 20, bottom: 170, left: 40},
    width = 1150 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .rangeRound([height, 0]);

    // Color palettes from carto.com/carto-colors/
    var color = d3.scale.ordinal()
        // .range(["#ecda9a","#efc47e","#f3ad6a","#f7945d","#f97b57","#f66356","#ee4d5a"]);
        .range(["#f3e79b","#fac484","#f8a07e","#eb7f86","#ce6693","#a059a0","#5c53a5"]);

    // The x axis will be at the bottom
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    // The y axis in the left
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));

    var svg = d3.select("#stackedBar").append("svg")
        .attr("id", "stackedBarSvg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Map the colors for each atribute of the object, except State atribute
    color.domain(d3.keys(dataset[0]).filter(function(key) { return key !== "State"; }));

    // Get the total universities for each country
    dataset.forEach(function(d) {
        var y0 = 0;
        d.universities = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
        d.total = d.universities[d.universities.length - 1].y1;
    });

    // Sort the countries based on their total universities
    dataset.sort(function(a, b) { return b.total - a.total; });

    // The domain in the x-axis is the state name
    x.domain(dataset.map(function(d) { return d.State; }));
    // The domain in the y-axis is the greatest number of universities and 0
    y.domain([0, d3.max(dataset, function(d) { return d.total; })]);

    // Create the x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
    .selectAll("text")
        .attr("y", 0)
        .attr("x", -9)
        .attr("dy", ".35em")
        // Rotate the labels because they are to large
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "end")
        .style("fill", "white")
        .style("font-weight", "bold")
        .style("font-size", ".95rem");

    // Create the y-axis
    svg.append("g")
        .attr("class", "y axis")
        .style("fill", "white")
        .call(yAxis)
        // Add a "legend" to the axis
        .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .style("fill", "white")
            .text("# Universities");

    var state = svg.selectAll(".state")
        .data(dataset)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) { return "translate(" + x(d.State) + ",0)"; });

    // Add the bars
    state.selectAll("rect")
        .data(function(d) { return d.universities; })
        .enter().append("rect")
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.y1); })
        .attr("height", function(d) { return y(d.y0) - y(d.y1); })
        .style("fill", function(d) { return color(d.name); });

    // Add a legend
    var legend = svg.selectAll(".legend")
        .data(color.domain().slice().reverse())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; })
        .style("fill", "white");
}