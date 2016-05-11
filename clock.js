
var ticker;
var tickTime = 250;

window.onload = function(){

	ticTac();
	ticker = setInterval(ticTac, tickTime);
	textBig();
}

function ticTac(){
	var timeNow = new Date();
	var h = timeNow.getHours();
	var m = timeNow.getMinutes();
	var s = timeNow.getSeconds();
	
	document.getElementById('digiClock').innerHTML = addZeroBefore(h) + ':' + addZeroBefore(m) + ':' + addZeroBefore(s);

}


 function addZeroBefore(number){

  if(number<10){
    number="0" + number;
  }

  return number;
}


 function textBig() {
      document.getElementById("digiClock").style.fontSize = "120px";
}