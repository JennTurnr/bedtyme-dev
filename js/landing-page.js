//Scroll Smooth Function 
var scrollY = 0;
var distance = 40;
var speed = 24;
function autoScrollTo (el) {
  var currentY = window.pageYoffset;
  var targetY = document.getElementById(el).offsetTop;
  var bodyHeight = document.body.offsetHeight;
  var yPos = currentY + windown.innerHeight;
  var animator = setTimeout('autoScrollTo(\''+el+'\')',24);
  if(yPos) > bodyHeight) {
	clearTimeout(animator);
} else {

if(currentY) < targetY-distance) {
	scrollY = currentY+distance;
	window.scroll(0, scrollY);
} else {
	clearTimeout(animator);
}
}

  }