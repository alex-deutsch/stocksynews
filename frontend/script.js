$(document).ready(function () {
	reloadStocksNews();
});

function reloadStocksNews() {

	var url = "https://api.iextrading.com/1.0/stock/market/batch";
	var symbols = "<?php echo getConfigValue('stocksy_stocks'); ?>";
	var types 	= "news,logo";
	var last 	= "5";
	var queryURLQuotes = url + "?symbols=" + symbols + "&types=" + types + "&last=" + last;
	
	$.get(queryURLQuotes).done(function(data){
		$("#stocks_news_table").empty();
		var j = 0;
		var i = 0;
		while(j < 8) { 
				for(key in data){
						var news = data[key].news;
						var logo = data[key].logo;
						if(news.length > i) {
							$("#stocks_news_table").append("<tr></tr>");
							$("#stocks_news_table tr:last").append("<td><img height='20' src='" + logo.url + "'></img></td>");
							$("#stocks_news_table tr:last").append("<td width='100%'>" + news[i].headline + "</td>");
							j++;
						}
					}
				i++;
			}
	});

		// reload every 100 minutes
		window.setTimeout(function() {
			reloadStocksNews();
		}, 6000000);
}
