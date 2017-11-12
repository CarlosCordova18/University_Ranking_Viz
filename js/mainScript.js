// For datamaps, i need the short ISO3 name of each country, this function gets it for each country in the dataset
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

// Resources:
// Table Lens: http://bl.ocks.org/jfreels/6734025
// Datamaps: https://github.com/markmarkoh/datamaps/blob/master/README.md#getting-started
// Stacked bar chart: https://bl.ocks.org/mbostock/3886208

// Main function, just call the others functions
function draw(data) {
    'use strict'
    createTable(data);
    createMap(data);
    createStackedBar(data);
}

