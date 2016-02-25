var portions;
var myPoint = 0;
var isRated = false;

$('#votes').text(getLocalStorage("key2"));
$('#average').text(getLocalStorage("key3"));


function displayPortion() {
	portions = getLocalStorage("key1");
	displaySlider();
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

$('.ratingForm input').click(function() {
	$.ajax({
		method: "GET",
		url: "https://edu.oscarb.se/sjk15/api/recipe/?api_key=984d3fec6c2e1f94&recipe=creme_brulee",
		success: function(data) {
			console.log(JSON.stringify(data));
			$('#votes').text(data.votes);
			$('#average').text(data.rating.toFixed(1));
			setLocalStorage("key2", data.votes);
			setLocalStorage("key3", data.rating.toFixed(1));
		},
		error: function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus, errorThrown);
        }
	});
});

$('.ratingForm input').click(function() {
	myPoint = ($('input[name=rating]:checked', '.ratingForm').val());
	$.ajax({
		method: "GET",
		url: "https://edu.oscarb.se/sjk15/api/recipe/?api_key=984d3fec6c2e1f94&recipe=creme_brulee&rating=" + myPoint,
		success: function(data) {
			console.log(JSON.stringify(data));
			console.log("status: " + data.status);
			$('#myRating').text(myPoint);
            $(':radio:not(:checked)').attr('disabled', true);
            isRated = true;
		},
		error: function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus, errorThrown);
        }
	});
});

$('.ratingForm label').hover(function() {
	if (!isRated) {
		var	value = ($('input[name=rating]:hover', '.ratingForm').val());
		var i = 0;
				while (i <= value) {
			$('label[for=star' + i + ']').css('backgroundImage', "url('../img/star_pink.png')");

			i++;
		}
	}
}, function() {
	if (!isRated) {
		$('.ratingForm label').css('backgroundImage', "url('../img/star_grey.png')");
//		var f = $(this).attr("for");
	}
});

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




