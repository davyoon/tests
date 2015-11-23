var $ = require('jquery');
var blah = require('./buttons/button.js');
require('./next.js');

var button = $('<button/>').html('click me').on('click', function(){
	alert('hi');
})

$('body').append(button);