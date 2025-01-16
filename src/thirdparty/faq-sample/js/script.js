// SECE FAQ

$(document).ready(function() {
	// faq
    $('.section.faq-block .faq-items .faq-item .question').on('click', function(event) {
    	event.preventDefault();
    	$(this).parent('.faq-item').toggleClass('open');
    	$(this).parent('.faq-item').find('.answer').slideToggle('fast');
    });
});