function myTest() {
	document.getElementById("test").innerHTML = "sidan kapades!!";
	console.log("testing...");
}

window.onload = myTest;

function pic() {
	document.getElementById("testImg").innerHTML = "kanelbullar är goda";
}

// hämta fler än ett element.
document.getElementByTagName("li");

function changePortion() {
	var portions = document.getElementById("quantity").value;
	alert("Portions: " + portions);
}
