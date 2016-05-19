/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
var app = app || {};

(function () {
	'use strict';

	var Utils = app.Utils;
	var Screener = app.Screener;
	// Generic "model" object. You can use whatever
	// framework you want. For this application it
	// may not even be worth separating this logic
	// out, but we do this to demonstrate one way to
	// separate out parts of your application.
	app.StockModel = function (key) {
		this.key = key;
		//this.stocks = Utils.store(key);
		this.stocks = [];
		this.onChanges = [];
	};

	app.StockModel.prototype.subscribe = function (onChange) {
		this.onChanges.push(onChange);
	};

	app.StockModel.prototype.inform = function () {
		Utils.store(this.key, this.stocks);
		this.onChanges.forEach(function (cb) { cb(); });
	};

	app.StockModel.prototype.addStock = function (title) {
		this.stocks = this.stocks.concat({
			id: Utils.uuid(),
			title: Screener.info(title),
			symbol: title,
			//completed: false,
			screener: Screener.line(title),
		});
		this.inform();
	};

	app.StockModel.prototype.destroy = function (stock) {
		Screener.destroy(stock.symbol);
		this.stocks = this.stocks.filter(function (candidate) {
			return candidate !== stock;
		});
		this.inform();
	};

})();