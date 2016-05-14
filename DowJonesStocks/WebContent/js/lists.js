var index = 0;

function prevTable() {
	index -= 1;
	addTable();
}
function nextTable() {
	index += 1;
	addTable();
}
function addTable() {
	var jqXHR = $.ajax({ 
		  type : 'GET',
		  dataType : 'json',
	      url: 'json/0510.json', 
	      async: false,
	   });     
	var myList = JSON.parse(jqXHR.responseText);

	if (index <= 0)
		document.getElementById("prev").innerHTML = "";
	else
		document.getElementById("prev").innerHTML = "prev";
	if (index > myList.length/20)
		document.getElementById("next").innerHTML = "";
	else
		document.getElementById("next").innerHTML = "next";

	document.getElementById("indexRange").innerHTML = (20*index+1).toString() + " - " + (20*(index+1)+1).toString()
														+ " out of " + myList.length.toString();

    var columns = addAllColumnHeaders(myList);
    var table = document.getElementById("excelDataTable");
    for (var i = 20*index ; i < 20*(index+1) && i < myList.length ; i++) {
    	 var row$ = document.createElement('tr');
      	 for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
      		 var cellValue = myList[i][columns[colIndex]];
       		 if (cellValue == null) { cellValue = ""; }
       		 var cell = document.createElement('td');
       		 cell.appendChild(document.createTextNode(cellValue));
       		 row$.appendChild(cell);
       	 }
       	 table.appendChild(row$);
    }
    
}
 
 // Adds a header row to the table and returns the set of columns.
 // Need to do union of keys from all records as some records may not contain
 // all records
function addAllColumnHeaders(myList)
 {
     var columnSet = [];
     var headerTr$ = document.createElement('tr');
     var table = document.getElementById("excelDataTable");
     table.innerHTML = "";
     for (var i = 0 ; i < myList.length ; i++) {
         var rowHash = myList[i];
         for (var key in rowHash) {
        	 if (columnSet.indexOf(key) <= -1) {
                 columnSet.push(key);
                 var header = document.createElement('th');
                 header.appendChild(document.createTextNode(key));
                 headerTr$.appendChild(header);
        	 }
         }
     }
     table.appendChild(headerTr$);

     return columnSet;
 }