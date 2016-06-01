var portions;
var myPoint = 0;

function displayResults() {
	$('#votes').html('<img src="../img/loader.gif">');
	$('#average').html('<img src="../img/loader.gif">');
	$.ajax({
		method: "GET",
		url: "https://edu.oscarb.se/sjk15/api/recipe/?api_key=984d3fec6c2e1f94&recipe=creme_brulee",
		success: function(data) {
			console.log(JSON.stringify(data));
			$('#votes').text(data.votes);
			$('#average').text(data.rating.toFixed(1));
		},
		error: function(jqXHR, textStatus, errorThrown) {
		  console.log(textStatus, errorThrown);
		}
	});
}
window.onload = displayResults();

// vote
$('.ratingForm input').click(function() {
	myPoint = ($('input[name=rating]:checked', '.ratingForm').val());
	$(this).next().slideUp();
	$(this).next().slideDown();
	console.log("this element: " + this);
	$.ajax({
		method: "GET",
		url: "https://edu.oscarb.se/sjk15/api/recipe/?api_key=984d3fec6c2e1f94&recipe=creme_brulee&rating=" + myPoint,
		success: function(data) {
			console.log(JSON.stringify(data));
			console.log("status: " + data.status);
			$('#myRating').text(myPoint);
			displayResults();
		},
		error: function(jqXHR, textStatus, errorThrown) {
		  console.log(textStatus, errorThrown);
		}
	});
});

$('.ratingForm label').hover(function() {
	var	value = ($('input[name=rating]:hover', '.ratingForm').val());

	setActiveStars(value);

}, function() {
	setActiveStars(myPoint);
});

function setActiveStars(starCount) {
	for (var i = 0; i <= 5; i++) {
		var starFilename = i <= starCount ? 'star_pink.png' : 'star_grey.png';
		$('label[for=star' + i + ']').css('backgroundImage', 'url("../img/' + starFilename + '")');
	}
}

function getLocalStorage(key) {
	if(typeof(window.localStorage) != 'undefined'){
		portions = window.localStorage.getItem(key);
	} else {
		throw "window.localStorage, not defined";
	}
	return portions;
}

function setLocalStorage(key, value) {
	if(typeof(window.localStorage) != 'undefined'){
		window.localStorage.setItem(key, value);
	}
	else{
		throw "window.localStorage, not defined";
	}
}

function displayPortion() {
	portions = getLocalStorage("key1");
	if (!portions) {
		portions = 4;
	}
	console.log("portions2 : "+ portions);
	displaySlider();
	var text = "person";
	if (portions == 1) {
		text = text;
	} else {
		text += "s";
	}
	console.log("portions : "+ portions);
	document.getElementById("selectedPortion").innerHTML = "for " + portions + " " + text;

	eggYolk();
	milk();
	sugar();
	cream();
	vanilla();
}
window.onload = displayPortion;

function displaySlider() {
	$("#quantity").val(portions);
}

function changePortion() {
	portions = document.getElementById("quantity").value;
	setLocalStorage("key1", portions);
	displayPortion();
}

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
