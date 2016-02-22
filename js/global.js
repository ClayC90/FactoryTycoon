$(function() {
	$.fn.money = function(){
		value = "\u20AC " + this[0];
		return value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
	}
});