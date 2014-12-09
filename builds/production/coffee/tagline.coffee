$ = require 'jquery'

do fill = (item = 'The creative minds in Art') -> 
	$('.tagline').append "#{item}"
fill