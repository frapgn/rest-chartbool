
var dateValue = $('#date').val('2017-01-01');

var salesArchive = {};

var salesByMonth = {
    gennaio: 0,
    febbraio: 0,
    marzo: 0,
    aprile: 0,
    maggio: 0,
    giugno: 0,
    luglio: 0,
    agosto: 0,
    settembre: 0,
    ottobre: 0,
    novembre: 0,
    dicembre: 0,
};

var individualSales = {};

// Chiamata per #line-chart
$.ajax({
    url: 'http://157.230.17.132:4024/sales',
    method: 'GET',
    success: function(data) {
        updateSalesByMonth(data);
        var objectForLine = dataForLine();
        makeLineChart(objectForLine.months, objectForLine.salesAmounts);
        console.log(typeof data[0].amount);
    }
});

// Chiamata per #pie-chart
$.ajax({
    url: 'http://157.230.17.132:4024/sales',
    method: 'GET',
    success: function(data) {
        updateIndividualSales(data);
        console.log(individualSales);
        var objectForPie = dataForPie();
        console.log(objectForPie);
        makePieChart(objectForPie.salesmans, objectForPie.salesAmounts);
    }
});

$('#btn-update-database').click(updateDatabase);
// $('#btn-update-database').click(function() {
//     // console.log(moment($('#date').val()).format('DD/MM/YYYY'));
//     // console.log(typeof parseInt($('#amount').val()));
// });

function updateDatabase() {
    $.ajax({
        url: 'http://157.230.17.132:4024/sales',
        method: 'POST',
        data: {
            salesman: $('#salesmans-select').val(),
            amount: parseInt($('#amount').val()),
            date: moment($('#date').val()).format('DD/MM/YYYY')
        },
        success: function() {
            $('#salesmans-select').val('');
            $('#amount').val('');

        }
    })

}

function updateSalesByMonth(array) {
    for (var i = 0; i < array.length; i++) {
        var originalDate = moment(array[i].date, 'DD-MM-YYYY').locale('it');
        var month = originalDate.format('MMMM');
        salesByMonth[month] += parseInt(array[i].amount);
    }
};

function updateIndividualSales(array) {
    for (var i = 0; i < array.length; i++) {
        if(individualSales[array[i].salesman] === undefined) {
            individualSales[array[i].salesman] = 0;
        }
        individualSales[array[i].salesman] += parseInt(array[i].amount);
    }
};

function dataForLine() {
    var months = [];
    var salesAmounts = [];

    for (var key in salesByMonth) {
        // console.log(key);
        months.push(key);
        salesAmounts.push(salesByMonth[key]);
    }
    // console.log(months, salesAmounts);
    return {
        months: months,
        salesAmounts: salesAmounts
    }

};

function dataForPie() {
    var salesmans = [];
    var salesAmounts = [];

    for (var key in individualSales) {
        // console.log(key);
        salesmans.push(key);
        salesAmounts.push(individualSales[key]);
    }
    // console.log(months, salesAmounts);
    return {
        salesmans: salesmans,
        salesAmounts: salesAmounts
    }

};

function makeLineChart(months,salesAmounts) {
    var ctx = $('#line-chart');
    var chart = new Chart(ctx, {

        type: 'line',
        data: {
            datasets: [{
                label: 'Vendite Mensili',
                data: salesAmounts,
                backgroundColor: 'rgba(173,216,230 ,0.5 )',
                borderColor: 'rgba(67, 113, 152, .8)',
                pointStyle: 'circle',
                radius: 6
            }],
            labels: months
        }
    });
};

function makePieChart(salesmans,salesAmounts) {
    var ctx = $('#pie-chart');
    var chart = new Chart(ctx, {
        type: 'pie',
        data: {
            datasets: [{
                label: 'Vendite individuali',
                data: salesAmounts,
                backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#71cece']
            }],
            labels: salesmans
        }
    });
};
