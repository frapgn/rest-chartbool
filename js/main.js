
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
        updateSalesByMonth();
    }
});

function updateSalesByMonth() {
    for (var i = 0; i < data.length; i++) {
        var originalDate = moment(data[i].date, 'DD-MM-YYYY').locale('it');
        // console.log(originalDate);
        var month = originalDate.format('MMMM');
        // console.log(month);
        salesByMonth[month] += data[i].amount;
        // console.log(salesByMonth[month]);
    }
    console.log(salesByMonth);
}

function dataForCharts() {
    var months = [];
    var salesAmounts = [];
};
