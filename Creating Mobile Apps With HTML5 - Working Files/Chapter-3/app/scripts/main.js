var hideShowFunction = function (evt) {
	var eventTarget = $(evt.target);
  	var data = eventTarget.data();
  	$('.view').removeClass('active');
  	$(data.target).addClass('active');
}

$('body').on('click', '.view-switcher', function(evt){
	hideShowFunction(evt);
});

if (Modernizr.localstorage) {
	var beers = [
		{ 
			"title" : "Pliny the Elder",
			"description" : "Great!", 
			"image" : null, 
			"location" :  {"latitude": 37, "longitude": 122 } //is better
		},
		{ 
			"title" : "Pliny the Elder",
			"description" : "Great!", 
			"image" : null, 
			"location" :  {"latitude": 37, "longitude": 122 } //is better
		},
		{ 
			"title" : "Pliny the Elder",
			"description" : "Great!", 
			"image" : null, 
			"location" :  {"latitude": 37, "longitude": 122 } //is better
		}
	];
}
else {
	console.log('does not work');
}

