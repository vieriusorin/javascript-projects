//functions
var hideShowFunction = function (evt) {
	var eventTarget = $(evt.target);
  	var data = eventTarget.data();
  	$('.view').removeClass('active');
  	$(data.target).addClass('active');

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

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

var saveEntry = function(result) {
  var highestId = Math.max.apply(Math, beers.map(function(o){return o.id;}));
  result.id = highestId > 0 ? highestId + 1 : 1;
  beers.push(result);
  localStorage.beers = JSON.stringify(beers);
}

var editEntry = function(result) {
  var resultInt = parseInt(result.id);
  result.id = resultInt;
  for (i in beers) {
    if (beers[i].id === resultInt ) {
      beers[i] = result;
      localStorage.beers = JSON.stringify(beers);
      break;
    }
  }
}

//event listeners
$('body').on('click', '.view-switcher', function(evt){
	hideShowFunction(evt);
});

$('body').on('submit','#add-form', function(evt){
  var result = $(this).serializeObject();
  saveEntry(result);
  renderTemplate('#full-list');
  return false;
});

$('body').on('submit','#edit-form', function(evt){
  var result = $(this).serializeObject();
  editEntry(result);
  renderTemplate('#full-list');
  return false;
});

//storage
var beers;
if (Modernizr.localstorage) {
  if (localStorage.beers) {
    beers = JSON.parse(localStorage.beers);
  }
  else {
    beers = [];
  }
}
else {
	console.log('does not work');
}

//init
renderTemplate('#full-list');
