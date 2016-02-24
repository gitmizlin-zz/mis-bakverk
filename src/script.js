var portions = 0;
var myPoint = 0;
var isRated = false;

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

$('.ratingForm input').click(function() {
	console.log("clicked");
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
});

$('.ratingForm input').click(function() {
	console.log("clicked");
	var user_rating = ($('input[name=rating]:checked', '.ratingForm').val());
	$.ajax({
		method: "GET",
		url: "https://edu.oscarb.se/sjk15/api/recipe/?api_key=984d3fec6c2e1f94&recipe=creme_brulee&rating=" + user_rating,
		success: function(data) {
			console.log(JSON.stringify(data));
			console.log("status: " + data.status);
			$('#myRating').text(user_rating);
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
		console.log("hovered");
		var f = $(this).attr("for");

		while (i <= value) {
			$('label[for=star' + i + ']').css('backgroundImage', "url('../img/star_pink.png')");
			i++;
		}
	}
}, function() {
	if (!isRated) {
		$('.ratingForm label').css('backgroundImage', "url('../img/star_grey.png')");
		console.log("not hovered" + $(this).attr("for"));
		var f = $(this).attr("for");
	}
});

function CheckBrowser() {
    if ('localStorage' in window && window['localStorage'] !== null) {
        // we can use localStorage object to store data
        console.log("local storage supported");
        return true;
    } else {
     	console.log("local storage not supported");
        return false;
    }
}




