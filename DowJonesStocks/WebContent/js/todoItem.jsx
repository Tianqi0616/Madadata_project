/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
var app = app || {};

(function () {
	'use strict';

	var ESCAPE_KEY = 27;
	var ENTER_KEY = 13;

	app.TodoItem = React.createClass({

		getInitialState: function () {
			return {editText: this.props.todo.title};
		},

		render: function () {
			return (
				<li>
					<div className="view" id="view">
						<label id="Label">
							{this.props.todo.title}
						</label>
						<button className="destroy" onClick={this.props.onDestroy} />
					</div>
				</li>
			);
		}
	});
})();