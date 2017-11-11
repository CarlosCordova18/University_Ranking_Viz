// For datamaps, i'll create one field more, the shortname of the country using this function
function getShortName(name) {
    switch(name) {
        case 'Argentina': return 'ARG';
        case 'Australia': return 'AUS';
        case 'Austria': return 'AUT';
        case 'Bangladesh': return 'BGD';
        case 'Belarus': return 'BLR';
        case 'Belgium': return 'BEL';
        case 'Brazil': return 'BRA';
        case 'Canada': return 'CAN';
        case 'Chile': return 'CHL';
        case 'China': return 'CHN';
        case 'Colombia': return 'COL';
        case 'Cyprus': return 'CYP';
        case 'Czech Republic': return 'CZE';
        case 'Denmark': return 'DNK';
        case 'Egypt': return 'EGY';
        case 'Estonia': return 'EST';
        case 'Finland': return 'FIN';
        case 'France': return 'FRA';
        case 'Germany': return 'DEU';
        case 'Ghana': return 'GHA';
        case 'Greece': return 'GRC';
        case 'Hong Kong': return 'HKG';
        case 'Hungary': return 'HUN';
        case 'Iceland': return 'ISL';
        case 'India': return 'IND';
        case 'Indonesia': return 'IDN';
        case 'Iran': return 'IRN';
        case 'Israel': return 'ISR';
        case 'Italy': return 'ITA';
        case 'Japan': return 'JPN';
        case 'Jordan': return 'JOR';
        case 'Kenya': return 'KEN';
        case 'Latvia': return 'LVA';
        case 'Lebanon': return 'LBN';
        case 'Lithuania': return 'LTU';
        case 'Luxembourg': return 'LUX';
        case 'Macau': return 'MAC';
        case 'Malaysia': return 'MYS';
        case 'Mexico': return 'MEX';
        case 'Morocco': return 'MAR';
        case 'Netherlands': return 'NLD';
        case 'New Zealand': return 'NZL';
        case 'Nigeria': return 'NGA';
        case 'Norway': return 'NOR';
        case 'Oman': return 'OMN';
        case 'Pakistan': return 'PAK';
        case 'Poland': return 'POL';
        case 'Portugal': return 'PRT';
        case 'Qatar': return 'QAT';
        case 'Republic of Ireland': return 'IRL';
        case 'Romania': return 'ROU';
        case 'Russian Federation': return 'RUS';
        case 'Saudi Arabia': return 'SAU';
        case 'Serbia': return 'SRB';
        case 'Singapore': return 'SGP';
        case 'Slovakia': return 'SVK';
        case 'Slovenia': return 'SVN';
        case 'South Africa': return 'ZAF';
        case 'South Korea': return 'PRK';
        case 'Spain': return 'ESP';
        case 'Sweden': return 'SWE';
        case 'Switzerland': return 'SWZ';
        case 'Taiwan': return 'TWN';
        case 'Thailand': return 'THA';
        case 'Turkey': return 'TUR';
        case 'Uganda': return 'UGA';
        case 'Ukraine': return 'UKR';
        case 'United Arab Emirates': return 'ARE';
        case 'United States of America': return 'USA';
        case 'United Kingdom': return 'GBR';
        default: return 'ERROR';
    }
}

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
            countries[countryName] = { number: 1, fillColor: undefined };
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
    console.log(paletteScale(1));
    console.log(paletteScale(30));
    // This is the final dataset that will be passed to plot the map in the screen
    for (var country in countries) {
        if (countries.hasOwnProperty(country)) {
            var element = countries[country];
            // console.log(element.number);
            countries[country].fillColor = paletteScale(element.number);
        }
    }
    console.log(countries);
    // Render map
    var map = new Datamap({
        element: document.getElementById('container__map'),
        projection: 'mercator', // big world map
        // Countries don't listed in dataset will be painted with this color
        fills: { defaultFill: '#e8ebef' },
        data: countries,
        geographyConfig: {
            borderColor: '#DEDEDE',
            highlightBorderWidth: 2,
            highlightFillColor: function(geo) {
                return geo['fillColor'] || '#e8ebef';
            },
            // Only change border color
            highlightBorderColor: '#B7B7B7',
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