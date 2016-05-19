/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/
var app = app || {};

(function () {
	'use strict';
	
	var TodoItem = app.TodoItem;

	var ENTER_KEY = 13;

	var TodoApp = React.createClass({
		getInitialState: function () {
			return {
				newTodo: ''
			};
		},

		handleChange: function (event) {
			this.setState({newTodo: event.target.value});
		},

		handleNewTodoKeyDown: function (event) {
			if (event.keyCode !== ENTER_KEY) {
				return;
			}

			event.preventDefault();

			var val = this.state.newTodo.trim();

			if (val) {
				this.props.model.addTodo(val);
				this.setState({newTodo: ''});
			}
		},

		destroy: function (todo) {
			this.props.model.destroy(todo);
		},


		render: function () {
			var footer;
			var main;
			var todos = this.props.model.todos;

			var todoItems = todos.map(function (todo) {
				return (
					<TodoItem
						key={todo.id}
						todo={todo}
						onDestroy={this.destroy.bind(this, todo)}
					/>
				);
			}, this);

			if (todos.length) {
				main = (
					<section className="main">
						<ul className="todo-list">
							{todoItems}
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
							value={this.state.newTodo}		
							onKeyDown={this.handleNewTodoKeyDown}
							onChange={this.handleChange}
							autoFocus={true}
						/>			
					</header>
					{main}				
				</div>
			);
		}
	});

	var model = new app.TodoModel('react-stocks');

	function render() {
		React.render(
			<TodoApp model={model}/>,
			document.getElementsByClassName('app')[0]
		);
	}

	model.subscribe(render);
	render();
})();