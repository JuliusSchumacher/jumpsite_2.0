$(document).ready(function(){
	$('.box').hover(function() {
		$(this).addClass('highlighted');
	}, function() {
		$(this).removeClass('highlighted');
	});
});