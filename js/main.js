
var salesArchive = {};

$.ajax({
    url: 'http://157.230.17.132:4024/sales',
    method: 'GET',
    success: function(data) {
        for (var i = 0; i < 2; i++) {
            var date = moment().month(data[i].date).locale('it').format('MMMM');
            console.log(date);
            if(salesArchive[date] === undefined){
                salesArchive[date] = date;
            }
            // console.log(salesArchive);
        }
    }
});
