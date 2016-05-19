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

