function createMap(data) {
    // This array will be used to save the ISO 3 name of the country and the number of universities that are located in the country
    var countries = {};
    // Variables used to make later the color palette
    var maxValue = 0, minValue = 900;
    // Auxiliar variable
    var countryName;
    for (var i = 0; i < data.length; i++) {
        countryName = getShortName(data[i]['Country']);
        if (countries[countryName]) {
            countries[countryName].number++;
        } else {
            countries[countryName] = { number: 1, fillColor: undefined};
        }
        // Set the new max or new min
        if (countries[countryName].number < minValue) {
            minValue = countries[countryName].number;
        } else if (countries[countryName].number > maxValue) {
            maxValue = countries[countryName].number;
        }
    }

    // We need to colorize every country based on "number of universities in the ranking"
    // Create palette (using min/max series-value)
    var paletteScale = d3.scale.linear().domain([minValue,maxValue]).range(["#fde0c5","#eb4a40"]);
    // This is the final dataset that will be passed to plot the map in the screen
    for (var country in countries) {
        if (countries.hasOwnProperty(country)) {
            var element = countries[country];
            // console.log(element.number);
            countries[country].fillColor = paletteScale(element.number);
        }
    }
    // Render map
    var map = new Datamap({
        element: document.getElementById('container__map'),
        projection: 'mercator', // big world map
        // Countries don't listed in dataset will be painted with this color
        fills: { defaultFill: 'white' },
        data: countries,
        geographyConfig: {
            borderColor: 'black',
            highlightBorderWidth: 2,
            highlightFillColor: function(geo) {
                return geo['fillColor'] || '#e8ebef';
            },
            // Only change border color
            highlightBorderColor: 'black',
            // Show desired information in tooltip
            popupTemplate: function(geo, data) {
                // don't show tooltip if country don't present in dataset
                if (!data) { return ; }
                // tooltip content
                return ['<div class="hoverinfo">',
                    '<strong>', geo.properties.name, '</strong>',
                    '<br># of Universities: <strong>', data.number, '</strong>',
                    '</div>'].join('');
            }
        }
    });
}