
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
}

$.ajax({
    url: 'http://157.230.17.132:4024/sales',
    method: 'GET',
    success: function(data) {
        updateSalesByMonth(data);
        dataForCharts();
        makeLineChart();
    }
});

function updateSalesByMonth(array) {
    for (var i = 0; i < array.length; i++) {
        var originalDate = moment(array[i].date, 'DD-MM-YYYY').locale('it');
        // console.log(originalDate);
        var month = originalDate.format('MMMM');
        // console.log(month);
        salesByMonth[month] += array[i].amount;
        // console.log(salesByMonth[month]);
    }
    console.log(salesByMonth);
}

var months = [];
var salesAmounts = [];

function dataForCharts() {

    for (var key in salesByMonth) {
        // console.log(key);
        months.push(key);
        salesAmounts.push(salesByMonth[key]);
    }
    console.log(months, salesAmounts);
};

function makeLineChart() {
    var ctx = $('#lineChart');
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
}
