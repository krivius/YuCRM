function showCryptos(){
    $.get('https://min-api.cryptocompare.com/data/price?fsym=USDT&tsyms=BTC,ETH,XRP,BNB,ADA,ETC,LTC,DOT', function(data){
        let cryptos = '';
        $.each(data, function (k,v) {
            cryptos+='<div class="crypto-info" crypto="'+k+'">' +
                        '<h4>'+k+'/<span class="usdt">USDT</span></h4>' +
                        '<h2>'+(1/v).toFixed(4)+'</h2>'+
                        '<h3 class="showGraph">Смотреть график</h3>'+
                    '</div>';
        });
        $("#crypto-wrapper").html(cryptos);
    });
}


$(document).ready(function(){
    showCryptos();
    window.setInterval(function () {  //обновляем данные раз в 15 секунд
        showCryptos();
    }, 15000);

    $("#crypto-wrapper").on("click", ".showGraph",  function () {
        let crypto = $(this).parents(".crypto-info").attr("crypto");
        console.log("Динамика курса валюты " + crypto + "/USDT");
        $.get('https://min-api.cryptocompare.com/data/v2/histoday?fsym='+crypto+'&tsym=USD&limit=30', function(data){ //дергаем истурию курса валюты в доллару
            let history = data.Data.Data; //WTF?! Seriously?...
            console.log(history);
            let prices = [];
            $.each(history, function (key, value) {
                prices.push(value.high);
                // console.log(date.getDate()+'.'+date.getMonth()+1);
            });

            const chart = Highcharts.chart('container', {
                chart: {
                    type: 'line'
                },
                title: {
                    text: "Динамика курса валюты " + crypto + "/USDT"
                },
                xAxis: {
                    categories: [crypto]
                },
                yAxis: {
                    title: {
                        text: 'Цена'
                    }
                },
                series: [{
                    name: crypto,
                    data: prices
                }]
            });

            $( "#chart" ).dialog({
                modal: true,
                width: 1000,

            });
        });
    });


});

