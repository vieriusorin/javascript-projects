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
			"id" : "1",
			"title": "Pliny the Elder",
			"description": "Good!",
			"image": null,
			"location": { "latitude": 37, "longitude": 122}
		},
		{
			"id" : "2",
			"title": "Pliny the Younger",
			"description": "Great!",
			"image": null,
			"location": { "latitude": 37, "longitude": 122}
		},
		{
			"id" : "3",
			"title": "Racer 5",
			"description": "Reliable!",
			"image": null,
			"location": { "latitude": 37, "longitude": 122}
		}
	];

	localStorage.beers = JSON.stringify(beers);
}
else {
	console.log('does not work');
}