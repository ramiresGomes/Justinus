var zi = 1;
var ps = 1;
var ptw = 1;
var tmp = 0;
var pag = -1;
var maxpg = 0;
var sp = '+';

function loadd() {
	ptw = $(window).width();

	maxpg = $('#gradi').find('div').length;

	var i = 0;
	$("#gradi .item").each(function(index) {
		var lf = (ptw * i);
		$(this).css({
			left : lf + 'px'
		});
		$(this).show();
		i++
	});

	$("#gradi").resize(function() {
		ptw = $(window).width();
		var gr_h = $(this).height();
		gr_h = (gr_h - 30) / 2;
		$(' #menu1').css({
			'top' : gr_h + 'px'
		})
	});

	$(' #menu1 .seta.n1').click(function() {
		zi++;
		pag--;
		pag = (pag < 0) ? (maxpg - 1) : pag;
		ps = 0;
		viewImag(pag);
	});

	$(' #menu1 .seta.n2').click(function() {
		zi++;
		puladiv();
	});

	if (pag == -1) {
		pag = 0;
		loadd3(0);
		tmp = 0;
	}

	setInterval(function() {
		//if(tmp > 6){ puladiv(); }
		tmp++;
	}, 1000);
}

function puladiv() {
	pag++;

	if (pag == maxpg) {
		pag = 0;
		zi++;
		//var xww = $("#gradi").width();
		//$("#gradi > div").css({left: xww+'px'});
	}

	tmp = 0;
	ps = 1;
	viewImag(pag);
}

function viewImag(n) {
	tmp = 0;
	$("#gradi .item").hide();
	var xww = $("#gradi").width();
	if (ps != 1) {
		xww = xww - (xww * 2);
	}

	var div = $("#gradi > div:eq(" + n + ")");
	;
	$('.seta').css({
		'z-index' : (zi + 100)
	});
	div.fadeIn('slow');
	div.css({
		left : '0px'
	});

	var himg = div.find('img').height();
	$("#gradi").height(himg);
	div.height(himg);

	var wimg = div.find('.img').width();
	wimg = (ptw - wimg) / 2;
	div.find('.img').css({
		left : wimg + 'px'
	});
	$("#gradi").trigger('resize');

	var src = div.find('img').attr('src');
	//$("#gradi").css({'background': 'url('+src+') center top no-repeat;margin-left:'+xww+'px'});

}

function loadd3(n) {
	var sli = '';
	var x = 0;
	$("#gradi .item").each(function(i, vo) {
		if (x == n) {
			var simg = $(this).find('.img').attr('data-thumb');
			var image = new Image();
			image.onload = function() {
				image.onload = null;
				if(n == pag){
					viewImag(pag);
				}
				loadd3(n + 1);
			};
			$(this).find('.img').attr('src',simg);
			image.src = simg;
		}
		x++;
	});
}