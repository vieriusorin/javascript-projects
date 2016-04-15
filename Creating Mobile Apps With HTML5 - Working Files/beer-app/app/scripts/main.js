'use strict'
var hideShowFunction = function(evt) {
	var eventTarget = $(evt.target);
	$()
	var data = eventTarget.data();
	$('.view').removeClass('active');
	$(data.target).addClass('active').eve;

	renderTemplate(data.target, data.item);
}

var renderTemplate = function(target, itemId) {
	var targetTemplate = target + '-template';
	var source = $(targetTemplate).html();
	var template = Handlebars.compile(source);
	//var data = {beers: beers};
	//var data = {title: "This is the title", body: "This is the body!"};
	// actual data!
	var data;
	if (itemId) { 
		var arr = $.grep( beers, function(beer, i){
			return beer.id == itemId;
		});

		data = arr[0];
	}
	else {
		data = { beers: beers };
	}
	var html = template(data);
	$(target).html(html);
}

$(document).ready(function() {

	// event listeners
	$('body').on('click', '.view-switcher', function(evt) {
		hideShowFunction(evt);
	})
})

// storage
var beers;

if (Modernizr.localstorage) {
	if (localStorage.beers) {
		beers = JSON.parse(localStorage.beers);
	} else {
		beers = []
	}
} 
else {
	console.log('Does not work');
}

// init
renderTemplate('#full-list');
