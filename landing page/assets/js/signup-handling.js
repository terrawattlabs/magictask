$('.success').hide();


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

var referrer = getUrlParameter('ref');
console.log(referrer);



$( ".signup-form" ).submit(function( event ) {
  event.preventDefault();
 console.log(event.target[0].value);

var data = {"email": event.target[0].value,
	"referrer": referrer 
};

$.ajax({
  type: "POST",
  url: 'http://jacksserver.herokuapp.com/magictask/newsignup',
  data: data,
  success: function(d){
		applyCode(d);
		console.log(d);
		ga('send', 'event', 'signup', 'signup-form');
	  },

  dataType: "text",
  crossDomain : true
});


});

function applyCode (c){
	$('#info').hide();
	$('.success').show();
	$('.code').text(c);
};

function goToAnchor(anchor) {
  var loc = document.location.toString().split('#')[0];
  document.location = loc + '#' + anchor;
  return false;
};















// var data = {"hello": "world"};

// console.log('should have run the ajax call');

// $.ajax({
//   type: "POST",
//   url: 'http://jacksserver.herokuapp.com/magictask/newsignup',
//   data: data,
//   success: function(d){
//   	console.log(d);
//   },

//   dataType: "text",
//   crossDomain : true
// });