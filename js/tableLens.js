function createTable(data) {
    // Create table
    var table = d3.select('#table__lens')
    .attr("cellspacing", "0");
    // Create colgroup to change width of the columns
    var colgroup = table.append('colgroup');
    // Create header element of the table
    var thead = table.append('thead')
    // Create body element of the table
    var	tbody = table.append('tbody');
    // Array of columns to be displayed
    var columns = [
    'World_Rank',
    'University_Name',
    'Research_Rating',
    'Teaching_Rating',
    'Industry_Income_Rating',
    'Citations_Rating',
    ];
    var titles = [
    '#',
    'University',
    'Research',
    'Teaching',
    'Industry Income',
    'Citations',
    ];

    // Create a col element for each column and its id to add styles to them
    colgroup.selectAll('col')
    .data(titles).enter()
    .append('col')
    .attr('id', function (title, i) { return 'col'+ (i+1); });

    // Create the header row
    thead.append('tr')
    .selectAll('th')
    .data(titles).enter()
    .append('th')
    .attr('class', 'header__row')
    .text(function (title) { return title; });

    // Create a row for each element in the dataset
    var rows = tbody.selectAll('tr')
    .data(data)
    .enter()
    .append('tr');

    // Columns for Name, Rank and Country (NOMINAL)
    var textColumns = columns.slice(0, 2);
    var nameAndData = rows.selectAll('.text')
    .data(function (row) {
    return textColumns.map(function (column) {
    return {column: column, value: row[column]};
    });
    })
    .enter()
    .append('td')
    .attr("class", "text__column")
    .text(function (d) { return d.value; });

    /***** Column for Research Rating *****/
    // Select just the required field
    var researchColumn = columns.slice(2, 3);
    // Create a <td> element with and svg nested to it for each element on the dataset
    var researchRatingSvg = rows.selectAll('.research_rating')
        .data(function (row) {
            return researchColumn.map(function (column) {
            return {column: column, value: row[column]};
            });
        })
        .enter()
        .append('td')
        .attr("class", ".research_rating")
        .append('svg')
            .attr('width', '100%')         
            .attr('height', '25');
        
    // Create the rectangles for the bars and asign a scaled with to them
    researchRatingSvg.append('rect')
    .attr('height', '100%')
    .attr('fill', '#F6CF71')
    .attr('class', 'research__bar')
    .attr('width', function(d) { return d.value + '%'; });

    // Add a value label to each of the bars
    researchRatingSvg.append('text')
    .attr('y', 25/2)
    .attr('x', 2)
    .attr('dy', '.4em')
    .attr('class', 'label__number')
    .text(function(d) { return d.value } );


    /***** Column for Teaching Rating *****/
    // Select just the required field
    var teachingColumn = columns.slice(3, 4);
    // Create a <td> element with and svg nested to it for each element on the dataset
    var teachingRatingSvg = rows.selectAll('.teaching_rating')
        .data(function (row) {
            return teachingColumn.map(function (column) {
            return {column: column, value: row[column]};
            });
        })
        .enter()
        .append('td')
            .attr("class", ".teaching_rating")
            .append('svg') 
                .attr('width', '100%')           
                .attr('height', '25');

    // Create the rectangles for the bars and asign a scaled with to them
    teachingRatingSvg.append('rect')
    .attr('height', '100%')
    .attr('fill', '#66C5CC')
    .attr('class', 'teaching__bar')
    .attr('width', function(d) { return d.value + '%'});

    // Add a value label to each of the bars
    teachingRatingSvg.append('text')
    .attr('y', 25/2)
    .attr('x', 2)
    .attr('dy', '.4em')
    .attr('class', 'label__number')
    .text(function(d) { return d.value } );

    /***** Column for Industry Income Rating *****/
    // Select just the required field
    var industryColumn = columns.slice(4, 5);
    // Create a <td> element with and svg nested to it for each element on the dataset
    var industryRatingSvg = rows.selectAll('.industry_rating')
        .data(function (row) {
            return industryColumn.map(function (column) {
            return {column: column, value: row[column]};
            });
        })
        .enter()
        .append('td')
            .attr("class", ".industry_rating")
            .append('svg')    
                .attr('width', '100%')        
                .attr('height', '25');

    // Create the rectangles for the bars and asign a scaled with to them
    industryRatingSvg.append('rect')
    .attr('height', '100%')
    .attr('fill', '#F89C74')
    .attr('class', 'industry__bar')
    .attr('width', function(d) { return d.value + '%'; });

    // Add a value label to each of the bars
    industryRatingSvg.append('text')
    .attr('y', 25/2)
    .attr('x', 1)
    .attr('dy', '.4em')
    .attr('class', 'label__number')
    .text(function(d) { return d.value } );

    /***** Column for Citation Rating *****/
    // Select just the required field
    var citationsColumn = columns.slice(5, 6);
    // Create a <td> element with and svg nested to it for each element on the dataset
    var citationsRatingSvg = rows.selectAll('.citations_rating')
        .data(function (row) {
            return citationsColumn.map(function (column) {
            return {column: column, value: row[column]};
            });
        })
        .enter()
        .append('td')
            .attr("class", ".citations_rating")
            .append('svg')    
                .attr('width', '100%')        
                .attr('height', '25');

    // Create the rectangles for the bars and asign a scaled with to them
    citationsRatingSvg.append('rect')
    .attr('height', '100%')
    .attr('fill', '#B3B3B3')
    .attr('class', 'citations__bar')
    .attr('width', function(d) { return d.value + '%'; });

    // Add a value label to each of the bars
    citationsRatingSvg.append('text')
    .attr('y', 25/2)
    .attr('x', 1)
    .attr('dy', '.4em')
    .attr('class', 'label__number')
    .text(function(d) { return d.value } );

    return table;
}