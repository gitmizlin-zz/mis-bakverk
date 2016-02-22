var portions = 0;
var myPoint = 0;

function changePortion() {
	portions = document.getElementById("quantity").value;
	var text = "person";
	if (portions == 1) {
		text = text;
	} else {
		text += "s";
	}
	document.getElementById("selectedPortion").innerHTML = "for " + portions + " " + text;

	eggYolk();
	milk();
	sugar();
	cream();
	vanilla();
}
window.onload = changePortion;

function eggYolk() {
	var text = "egg yolk";
	if (portions == 1) {
		text = text;
	} else {
		text += "s";
	}
	document.getElementById("egg_yolk").innerHTML = portions + " " + text;
}

function milk() {
	document.getElementById("milk").innerHTML = 25 * portions + "ml full-fat milk";
}


function sugar() {
	document.getElementById("sugar").innerHTML = 10 * portions + "g sugar plus extra for the topping";
}

function cream() {
	document.getElementById("heavy_cream").innerHTML = 100 * portions + "ml heavy cream";
}

function vanilla() {
	var text = "vanilla pod";
	if (portions == 1) {
		text = text;
	} else {
		text += "s";
	}
	document.getElementById("vanilla_pod").innerHTML = portions + " " + text;
}

$('.ratingForm input').on('change', function() {
	var value = ($('input[name=rating]:checked', '.ratingForm').val());
	console.log(value);
});



$('.ratingForm label').hover(function() {
	var	value = ($('input[name=rating]:hover', '.ratingForm').val());
	console.log("hovered");
	var i = 0;
	$('label[for=star' + value + ']').css('position', "relative");
//	$('label[for=star' + value + ']').css('left', "20px");
	$('label[for=star' + value + ']').css('bottom', "20px");

	while (i <= value) {
		$('label[for=star' + i + ']').css('backgroundImage', "url('../img/star_pink.png')");
		i++;
	}

}, function() {
	$('.ratingForm label').css('backgroundImage', "url('../img/star_grey.png')");
	$('.ratingForm label').css('position', "relative");
//	$('label[for=star' + value + ']').css('right', "20px");
    console.log("not hovered" + $(this).attr("for"));
//	globalTest = this;

});


