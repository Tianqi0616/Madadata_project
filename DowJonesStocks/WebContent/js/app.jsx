/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/
var app = app || {};

(function () {
	'use strict';
	
	var StockItem = app.StockItem;

	var ENTER_KEY = 13;

	var StockApp = React.createClass({
		getInitialState: function () {
			return {
				newStock: ''
			};
		},

		handleChange: function (event) {
			this.setState({newStock: event.target.value});
		},

		handleNewStockKeyDown: function (event) {
			if (event.keyCode !== ENTER_KEY) {
				return;
			}

			event.preventDefault();

			var val = this.state.newStock.trim();

			if (val) {
				this.props.model.addStock(val);
				this.setState({newStock: ''});
			}
		},

		destroy: function (stock) {
			this.props.model.destroy(stock);
		},


		render: function () {
			var footer;
			var main;
			var stocks = this.props.model.stocks;

			var stockItems = stocks.map(function (stock) {
				return (
					<StockItem
						key={stock.id}
						stock={stock}
						onDestroy={this.destroy.bind(this, stock)}
					/>
				);
			}, this);

			if (stocks.length) {
				main = (
					<section className="main">
						<ul className="stock-list">
							{stockItems}
						</ul>
					</section>
				);
			}

			return (
				<div>
					<header className="header">
						<input
							className="new-stock"
							placeholder="Enter a symbol to add a stock to the customized screener"
							value={this.state.newStock}		
							onKeyDown={this.handleNewStockKeyDown}
							onChange={this.handleChange}
							autoFocus={true}
						/>			
					</header>
					{main}				
				</div>
			);
		}
	});

	var model = new app.StockModel('react-stocks');

	function render() {
		React.render(
			<StockApp model={model}/>,
			document.getElementsByClassName('app')[0]
		);
	}

	model.subscribe(render);
	render();
})();