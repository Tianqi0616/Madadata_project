/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var req = __webpack_require__(1);
	req.keys().forEach(function(key){
	    req(key);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./screener.js": 2,
		"./utils.js": 3
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 1;


/***/ },
/* 2 */
/***/ function(module, exports) {

	var xScale;
	var yScale;

	var width = 600, height = 400;
	// SVG画布边缘与图表内容的距离
	var padding = {top: 35, right: 20, bottom: 30, left: 0};

	var app = app || {};

	(function () {
		'use strict';
		app.Screener = {
			line: function (title, data) {

				var data = data;
			    var main = d3.select('.container .main');
			    
			    var line = d3.svg.line()
			    			.x(function(d1) {
			    				return xScale(d1.x);
			    			})
			    			.y(function(d1) {
			    				return yScale(d1.changeRate);
			    			})
			    	        .interpolate('linear');
			    
			     main.append('path')
			    .attr('class', 'line')
			    .attr("id", title)
			    .attr('d', line(data));
			     
			},

			destroy: function (title) {
				d3.select("#" + title).remove();
			},
			
			info: function (title) {
				
				function printInfo(myList, title) {

					var jsonString = JSON.stringify(myList["Date"]);
					jsonString = jsonString.substr(1, jsonString.length-2);
					jsonString = jsonString.concat("\n");
					jsonString = jsonString.concat("Symbol: ").concat(title).concat("\n");
					jsonString = jsonString.concat("Open: ").concat(myList["Open"]).concat("\n");
					jsonString = jsonString.concat("Close: ").concat(myList["Close"]).concat("\n");
					jsonString = jsonString.concat("High: ").concat(myList["High"]).concat("\n");
					jsonString = jsonString.concat("Low: ").concat(myList["Low"]);
					return jsonString;
				}
				
				var jqXHR = $.ajax({ 
					  type : 'GET',
					  dataType : 'json',
				      url: 'json/0510.json', 
				      async: false,
				   });     
				var myList = JSON.parse(jqXHR.responseText);
				//var info = "";
				for (var i = 0 ; i <  myList.length ; i++) {
					if ( title.localeCompare(myList[i]["Symbol"]) == 0 ){				
				        return printInfo(myList[i], title);// JSON.stringify(myList[i]));		         
					}
				}			
				

			}
		};
	})();



	function addScreener() {
		
	    var main = d3.select('.container').append('svg')
	    			.append('g').classed('main', true)          
	    			.attr('transform', "translate(" + padding.top + ',' + padding.left + ')');
	    // 模拟数据
		var dataset = [
			              {x: 0, y: -1}, {x: 1, y: -0.02},
			              {x: 2, y: 0}, {x: 3, y: 0.02},
			              {x: 4, y: 0.05}, {x: 5, y: 0.06},
			              {x: 6, y: 4}];
	    // 创建x轴的比例尺(线性比例尺)
	    xScale = d3.scale.linear()
	    			//.domain(["02-May-2016", "03-May-2016", "04-May-2016", "05-May-2016",
	    			  //       "06-May-2016", "09-May-2016", "10-May-2016"])
	            .domain(d3.extent(dataset, function(d) {
	                return d.x;
	            }))
	            .range([0, width - padding.left - padding.right]);

	    // 创建x轴
	    var xAxis = d3.svg.axis()
	            .scale(xScale)
	            .ticks(7)
	            .orient('bottom');
	    
	    // 添加SVG元素并与x轴进行“绑定”
	    main.append('g')
	            .attr('class', 'axis')
	            .attr('transform', 'translate(0,' + (height - padding.top - padding.bottom) + ')')
	            .call(xAxis);
	    
	    // 创建y轴的比例尺(线性比例尺)
	    yScale = d3.scale.linear()
	            .domain([d3.min(dataset, function(d) { return d.y; }), 
	                     d3.max(dataset, function(d) { return d.y; })])
	            .range([6*(height - padding.top - padding.bottom)/5, (height - padding.top - padding.bottom)/5]);
	    // 创建y轴
	    var yAxis = d3.svg.axis()
	            .scale(yScale)
	            .ticks(10)
	            .orient('left');

	    // 添加SVG元素并与y轴进行“绑定”
	    main.append('g')
	            .attr('class', 'axis')
	            .call(yAxis);
	    
	}



/***/ },
/* 3 */
/***/ function(module, exports) {

	var app = app || {};

	(function () {
		'use strict';

		app.Utils = {
			uuid: function () {
				/*jshint bitwise:false */
				var i, random;
				var uuid = '';

				for (i = 0; i < 32; i++) {
					random = Math.random() * 16 | 0;
					if (i === 8 || i === 12 || i === 16 || i === 20) {
						uuid += '-';
					}
					uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
						.toString(16);
				}

				return uuid;
			},


			pluralize: function (count, word) {
				return count === 1 ? word : word + 's';
			},

			store: function (namespace, data) {
				if (data) {
					return localStorage.setItem(namespace, JSON.stringify(data));
				}

				var store = localStorage.getItem(namespace);
				return (store && JSON.parse(store)) || [];
			},

			extend: function () {
				var newObj = {};
				for (var i = 0; i < arguments.length; i++) {
					var obj = arguments[i];
					for (var key in obj) {
						if (obj.hasOwnProperty(key)) {
							newObj[key] = obj[key];
						}
					}
				}
				return newObj;
			}
		};
		
	})();




/***/ }
/******/ ]);