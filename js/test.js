(function(){
	cb = function(data){
	
	//this is the bit that's broken
	$.each(data.items, function(i,val) {
		var title;
		if (val.title === ""){ title="No title"; }else{ title = val.title; }
		$("#results").append($('<li class="grid-33 mobile-grid-100"><img width="100%" data-src='+ val.media.m +' src='+ val.media.m +'/><div class="grid-100 mobile-grid-100"><h1>'+title+'</h1><h2>Author: '+ val.author+'</h2></div></li>'));
	});
	};
	
	var tags = 'london';
	var script = document.createElement('script');
	script . src ='http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=cb&tags=' + tags;
	document.head.appendChild(script);
	
	
	function handleKeyPress(dir){
		var selectedImg = $('#results li img.selected'),
			index = selectedImg.parent().index(),
			count = $('#results li').size();
			
			$('#results li').eq(index).removeClass('selected').find('img').removeClass('selected');
			switch(dir){
				case 'left':
					if (index-1!==0){
						$('#results li').eq(index-1).addClass('selected').find('img').addClass('selected');
					}else{
						$('#results li').eq(count).addClass('selected').find('img').addClass('selected');
					}
				break;
				case 'right':
					if (index+1<count){
						$('#results li').eq(index+1).addClass('selected').find('img').addClass('selected');
					}else{
						$('#results li').eq(0).addClass('selected').find('img').addClass('selected');
					}
				break;
			}
			
	}
	$(function(){
		
		$(document).on('click', '#results li', function(){
			var base = $(this),
			baseImg = base.find('img');
			$('#results li img, #results li').removeClass('selected');
			base.addClass('selected');
			baseImg.addClass('selected');
			localStorage.setItem('lastSelectedItem', baseImg.data('src'));
			
		}).on('keyup',function(e) {
		    if (e.keyCode == 37 || e.keyCode == 38) {
		       handleKeyPress('left');
		    }else
		    if (e.keyCode == 39 || e.keyCode == 40) {
		       handleKeyPress('right');
		    }
		});
		var container = document.querySelector('#results');
		
		$(window).bind("load", function() {
			var msnry = new Masonry( container, {
				itemSelector: 'li'
			});
			$('#results li').each(function() {
				if($(this).find('img').data('src') == localStorage.getItem('lastSelectedItem')){
					$(this).addClass('selected').find('img').addClass('selected');	
				}
			});
		});
		
	});

})();