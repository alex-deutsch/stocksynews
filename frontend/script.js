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
				if (j < 7) {
				for(key in data){
					var i = 0;
						var news = data[key].news;
						var logo = data[key].logo;
						$.each(news, function() {
							if (i < 3){
								$("#stocks_news_table").append("<tr></tr>");
								$("#stocks_news_table tr:last").append("<td><img height='20' src='" + logo.url + "'></img></td>");
								$("#stocks_news_table tr:last").append("<td width='100%'>" + this.headline + "</td>");
							i++; 
							}
						});
						j++;
					}
				}
	});

		// reload every 10 minutes
		window.setTimeout(function() {
			reloadStocksNews();
		}, 6000000);
}
