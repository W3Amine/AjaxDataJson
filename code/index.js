let jsonData; //array impoted from json file

function getData() {  //  get data from the file and give it to th jsonData letiable
	$.ajax({
		url: "index.json", // specifiyning the url of the json file
		type: "GET",// precise the method 
		dataType: "json", //precise file type
		success: function (data) {
			jsonData = data;  //asigning data to jsonData
			showData(jsonData); // build table and replace the parameter with jsonData
		},
	});
}

getData();  //  invoke the function that gets the data  and asign it to the array






// build the function that builds the films data tables
function showData(data) {

	let table = document.getElementById("tBody");
	table.innerHTML = "";
	// get the table id from html
	for (let i = 0; i < data.length; i++) {
		let row = "";
		//first row build
	 row +=
			`<tr>
					 <td>${data[i].title}</td>
					 <td>${data[i].director}</td>
					 <td>${data[i].runtime} <span> min</span></td>
					 <td>${data[i].year}</td>
						 <td>
							 <img src="${data[i].poster}" width="100" alt="Poster">
						 </td>
						 <td>  `  ;
		for (let j = 0; j < data[i].festivals.length; j++) {
		 row += ` <li>${data[i].festivals[j]}</li> `
		};
	 row += `</td><td>`;
		for (let j = 0; j < data[i].actors.length; j++) {
		 row += ` <li>${data[i].actors[j].firstName + " " + data[i].actors[j].lastName + ' : ' + data[i].actors[j].nationality}</li> `
		};
	 row += `</td></tr> `;
		// creation of reaplaceds to apear in html
		table.innerHTML += row;
	}
}



















//  search 
let searchResult = [];
SearchInput.oninput = function(){
  searchResult.length = 0 ;
  jsonData.forEach( (index) => {
    if(index.title.toLowerCase().startsWith(SearchInput.value.toLowerCase())){
      searchResult.push(index);
    }

    showData(searchResult);

  } );

}



//  sort table th i
document.querySelectorAll("i").forEach( (ele) => {
  
  ele.onclick = function(){
let title = ele.getAttribute("data-title");
let order = ele.getAttribute("data-order");

if( order === "up" ){

  arr = jsonData.sort((a,b) => (a[title] > b[title]) ? -1 : ((b[title] > a[title]) ? 1 : 0));
  showData(arr);

} else if(  order === "down" ) {

  arr = jsonData.sort((a,b) => (a[title] > b[title]) ? 1 : ((b[title] > a[title]) ? -1 : 0));
    showData(arr);

}

  }

} );
