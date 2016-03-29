var users = [
	{
		name: 'John Doe',
		gender: 'male',
		hobby: 'pets, movies',
		avatar : 'img-avatar-02.png'
	},
	{
		name: 'Jane Doe',
		gender: 'female',
		hobby: 'pets, movies, party',
		avatar : 'img-avatar-03.png'
	},
	{
		name: 'Ronald',
		gender: 'male',
		hobby: 'movies, travel',
		avatar : 'img-avatar-04.png'
	},
	{
		name: 'Christopher',
		gender: 'male',
		hobby: 'pets, travel, music, vodka',
		avatar : 'img-avatar-05.png'
	},
	{
		name: 'Lucy',
		gender: 'female',
		hobby: 'pets, music, travel',
		avatar : 'img-avatar-01.png'
	},
	{
		name: 'John Doe',
		gender: 'male',
		hobby: 'pets',
		avatar : 'img-avatar-02.png'
	},
	{
		name: 'John Doe',
		gender: 'male',
		hobby: 'pets',
		avatar : 'img-avatar-03.png'
	},
	{
		name: 'John Doe',
		gender: 'male',
		hobby: 'pets',
		avatar : 'img-avatar-04.png'
	},
	{
		name: 'Jenifer Doe',
		gender: 'female',
		hobby: 'pets, movies, travel',
		avatar : 'img-avatar-05.png'
	},
	{
		name: 'John Doe',
		gender: 'male',
		hobby: 'pets',
		avatar : 'img-avatar-01.png'
	},
	{
		name: 'John Doe',
		gender: 'male',
		hobby: 'pets',
		avatar : 'img-avatar-02.png'
	}
];

$(function() {
	var btnSearch = $('.form-inline .btn-search');
	var results = $('#results');

	var hobby = $('#filter').val();

	function search(e) {
		e.preventDefault();
		var gender = $('#gender').val();
		
		var resultsHtml = '';
		var usersLength = users.length;

		for (var i = 0; i < usersLength; i++) {

			if (gender === 'all' || gender == users[i].gender ){

				if(hobby == '' || hobby == users[i].gender ) {
					resultsHtml += 
						'<div class="media person-row">'+
						  '<div class="media-left media-middle">'+
						    '<a href="#">'+
						      '<img class="media-object" src="images/' + users[i].avatar + ' " alt="">'+
						    '</a>'+
						  '</div>'+
						  '<div class="media-body person-info">'+
						    '<h4 class="media-heading">' + users[i].name + '</h4>'+
						    '<p class="hobby">' + users[i].hobby + '</p>'+
						    '<button class="btn btn-primary">Add as friend</button>'+
						  '</div>'+
						'</div>'
				}
			}
		}

		$(results).html(resultsHtml);
	}

	$(btnSearch).on('click', search);
})