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
//$('#getDataButton').click(function() {
//    // Kod som körs när man klickar på knappen
//    $.ajax({
//        method: "GET",
//        url: "http://opendata-download-metfcst.smhi.se/api/category/pmp1.5g/version/1/geopoint/lat/58.59/lon/16.18/data.json",
//        success: function(data) {
//            // JSON.stringify(data) gör om JavaScript objekt till en sträng
//            // Den första temperaturen på första dagen ges med
//            // data["timeseries"][0]["t"]
//            // data.timeseries[0].t
//            $('#temperature').text(data.timeseries[0].t);
//
//
//        },
//    });

$('.ratingForm input').click(function() {
	console.log("clicked");
	$.ajax({
		method: "GET",
		url: "https://edu.oscarb.se/sjk15/api/recipe/?api_key=984d3fec6c2e1f94&recipe=creme_brulee",
		sucsess: function(data) {
			console.log(JSON.stringify(data));
			$('#votes').text(data.votes);
			$('#average').text(data.rating);
		},
		error: function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus, errorThrown);
        }
	})
});

$('.ratingForm input').on('change', function() {
	var userValue;
	userValue = ($('input[name=rating]:checked', '.ratingForm').val());
	$('label[for=' + userValue + ']').css('position', "relative");
	$('label[for=' + userValue + ']').css('top', "2px");
	$('label[for=' + userValue + ']').css('right', "2px");
	$(':radio:not(:checked)').attr('disabled', true);
	$('#myRating').text(userValue);
	return userValue;
});

$('.ratingForm label').hover(function() {
		var	value = ($('input[name=rating]:hover', '.ratingForm').val());
		var i = 0;
		console.log("hovered");
		var f = $(this).attr("for");
		$('label[for=' + f + ']').css('position', "relative");
		$('label[for=' + f + ']').css('bottom', "2px");
		$('label[for=' + f + ']').css('left', "2px");

		while (i <= value) {
			$('label[for=star' + i + ']').css('backgroundImage', "url('../img/star_pink.png')");
			i++;
		}

}, function() {
	$('.ratingForm label').css('backgroundImage', "url('../img/star_grey.png')");
    console.log("not hovered" + $(this).attr("for"));
    var f = $(this).attr("for");
	$('label[for=' + f + ']').css('position', "relative");
	$('label[for=' + f + ']').css('top', "2px");
	$('label[for=' + f + ']').css('right', "2px");
});

