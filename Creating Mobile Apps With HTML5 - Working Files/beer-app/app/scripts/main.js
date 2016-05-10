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

  if ($(target).find('#add-location').length > 0){
    getCurrentLocation(renderCurrentLocation);
  }
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
  if (result.location){
    result.location = JSON.parse(result.location);
  }
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

navigator.getUserMedia = 
  navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || false;

var localMediaStream;

var fallback = function(){
  alert('this is the fallback');
}

var accessCamera = function(data){
  if (navigator.getUserMedia) {
    navigator.getUserMedia(
      {video: true},
      function(stream){
        var video = document.querySelector('#' + data + '-video');
        video.src = window.URL.createObjectURL(stream);
        localMediaStream = stream;
        //swap out the button!
        var cameraTemplate = '#' + data + '-photo';
        renderTemplate(cameraTemplate);
        $('.access-camera').hide();
      }, fallback
    );
    var cameraTemplate = '#' + data + '-photo';
    renderTemplate(cameraTemplate);
    $('.access-camera').hide();
  }
  else {
    alert('no dice');
  }
};

var shootPhoto = function(data){
  var canvas = document.querySelector('#' + data + '-photo-canvas');
  var ctx = canvas.getContext('2d');
  var video = document.querySelector('#' + data + '-video');
  if(localMediaStream){
    ctx.drawImage(video, 0, 0)
    var canvasData = canvas.toDataURL('image/webp');
    document.querySelector('#' + data +'-photo-image').src = canvasData;
    document.querySelector('#' + data + '-photo-input').value = canvasData;
  }
};

var displayOnlineStatus = document.getElementById("network-status");

var isOnline = function () {
  displayOnlineStatus.innerHTML = "Online";
  displayOnlineStatus.className = "label-success label pull-right";
};
var isOffline = function ()   {
  displayOnlineStatus.innerHTML = "Offline";
  displayOnlineStatus.className = "label-danger label pull-right";
};

var getCurrentLocation = function(cb) {
  if(Modernizr.geolocation){
    navigator.geolocation.getCurrentPosition(cb);
  }
  else {
    //do something else
  }
};

var renderCurrentLocation = function(location) {
  var target = $('#add-location');
  var source = $('#add-location-template').html();
  var template = Handlebars.compile(source);
  location.string = JSON.stringify(location.coords);
  var data = {location: location};
  var html = template(data);
  $(target).html(html);
}

var final_transcript = '';
var recognizing = false;

var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

recognition.onstart = function() {
  recognizing = true;
};

recognition.onresult = function(event) {
  final_transcript = event.results[0][0].transcript;
};

recognition.onend = function() {
  recognizing = false;
  if (!final_transcript) {
    return;
  }
  $('.description').html(final_transcript);
};

recognition.onerror = function(event) {
  //handle errors here
};

var toggleTranscription = function(evt){
  var btn = evt.target;
  if (recognizing) {
    recognition.stop();
    btn.innerHTML = 'Transcribe';
    return;
  }
  final_transcript = '';
  btn.innerHTML = 'Stop';
  recognition.start();
};


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

$('body').on('click', '.access-camera', function(){
  var data = this.dataset.camera;
  accessCamera(data);
});

$('body').on('click', '.shoot', function(){
  var data = this.dataset.camera;
  shootPhoto(data);
});

if (window.addEventListener){
  window.addEventListener("online", isOnline, false);
  window.addEventListener("offline", isOffline, false);
}
else {
  document.body.ononline = isOnline;
  document.body.onoffline = isOffline;
}

$('body').on('click', '.transcribe', function(evt){
  toggleTranscription(evt);
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
