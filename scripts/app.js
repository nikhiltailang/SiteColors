/*TODO: Normalize colors and reduce returned values*/


$(document).ready(function () {	
	prepareCanvas();
	
	$(".button").click(function () {
		$("#colorList").html("");
		setConfigs();
		readImageData();
	});
	
	var colorSelector = "." + appConfig.colorClassName;
	$(colorSelector).live("click", function (){
		var li = document.createElement("li");
		$(li).attr("style", $(this).attr("style"));
		$(li).appendTo("#selectedColorList");
	});
	
	$("#getcode").click(function () {
		var bgCol = "background: ";
		var txtCol = "color: ";
		var commentCol = "Color: ";
		
		$("#selectedColorList > li").each(function () {
			var thecss = $("#thecss").val();
			thecss = thecss + "\n" + $(this).attr("style");
			$("#thecss").val(thecss);
		});
		$("#thecsscontainer").fadeIn("slow");
		
	});
	
	$("#thecsscontainer").focusout(function () {
		$("#thecsscontainer").fadeOut("slow");
	});
	
});


var appConfig = {
	tolerance: 5,
	xskip: 2,
	yskip: 2,
	colorClassName: "color"
}

var siteColors = {
	arr1: null,
	arr2: null,
	arr3: null,
	firstChar: null
}

function setConfigs() {
	appConfig.tolerance = parseInt($("#tolerance").val());
	appConfig.xskip = parseInt($("#xskip").val());
	appConfig.yskip = parseInt($("#yskip").val());
}

function isSimilar(color1, color2) {
	
	/*var rgb1 = hexToRGB(color1);
	var hsv1 = rgbToHsv(color1);
	var rgb2 = hexToRGB(color2);
	var hsv2 = rgbToHsv(color2);
	
	console.log(hsv1);*/
	
	
	var lev = levenshtein(color1, color2);
	console.log("SIM: " + color1 + " " + color2 + " LEV: " + lev);
	if(lev >= appConfig.tolerance)	{ return false; }
	else { return true; }
}

function addToArray(what) {
	siteColors.firstChar = what.substr(0, 1);
	var divider1 = "01234";
	var divider2 = "56789";
	var divider3 = "ABCDEF";
	if(divider1.indexOf(siteColors.firstChar) >= 0) {
		if(siteColors.arr1.indexOf(what) < 0) {
			if(siteColors.arr1.indexOf(what) < 0) {
				siteColors.arr1.push(what);
				return;
			}
		}
	}
	if(divider2.indexOf(siteColors.firstChar) >= 0) {
		if(siteColors.arr2.indexOf(what) < 0) {
			if(siteColors.arr2.indexOf(what) < 0) {
				siteColors.arr2.push(what);
				return;
			}
		}
	}
	if(divider3.indexOf(siteColors.firstChar) >= 0) {
		if(siteColors.arr3.indexOf(what) < 0) {
			if(siteColors.arr3.indexOf(what) < 0) {
				console.log("a");
				siteColors.arr3.push(what);
				return;
			}
		}
	}
	
}

function readImageData() {
	var canvas = document.getElementById("c1");
	var ctx = canvas.getContext("2d");
	var cdata = ctx.getImageData(0, 0, canvas.width, canvas.height);

	var pixelData = {	r: 0, g: 0, b: 0 };
	var hex = "FFFFFF";
	
	siteColors.arr1 = new Array();
	siteColors.arr2 = new Array();
	siteColors.arr3 = new Array();

	for(var x=0; x < canvas.width; x+=appConfig.xskip) {
		for(var y=0; y < canvas.height; y+=appConfig.yskip) {
			var idx = (x + y * cdata.width) * 4;

			hex = rgbToHex(cdata.data[idx + 0], cdata.data[idx + 1], cdata.data[idx + 2]);
			addToArray(hex);
		}
	}
	showColorList();
}


function showColorList() {
	
	var cssColor = "#";
	var styleAttrValue = "";
	var counter = 0;
	var arrLength = 0;
	var totalLength = 0;
	var displayLength = 0;
	arrLength = siteColors.arr1.length;
	totalLength += arrLength;
	
	
	var ul = document.createElement("ul");
	var tempColor = "ZZZZZZ";
	for(counter = 0; counter < arrLength; counter++) {
		
		if(!isSimilar(tempColor, siteColors.arr1[counter])) {
			
			cssColor = "#" + siteColors.arr1[counter];
			styleAttrValue = "background:" + cssColor;
			var li = document.createElement("li");
			$(li).attr("style", styleAttrValue);
			$(li).attr("class", appConfig.colorClassName);
			$(li).html(cssColor);
			ul.appendChild(li);
			displayLength++;
		}
		tempColor = siteColors.arr1[counter];
	}
	$(ul).appendTo("#colorList");
	
	
	arrLength = siteColors.arr2.length;
	totalLength += arrLength;
	for(counter = 0; counter < arrLength; counter++) {
		
		if(!isSimilar(tempColor, siteColors.arr2[counter])) {
			cssColor = "#" + siteColors.arr2[counter];
			styleAttrValue = "background:" + cssColor;
			var li = document.createElement("li");
			$(li).attr("style", styleAttrValue);
			$(li).attr("class", appConfig.colorClassName);
			$(li).html(cssColor);
			ul.appendChild(li);
			displayLength++;
		}
		tempColor = siteColors.arr2[counter];
	}
	$(ul).appendTo("#colorList");
	
	
	arrLength = siteColors.arr3.length;
	totalLength += arrLength;
	for(counter = 0; counter < arrLength; counter++) {
		
		if(!isSimilar(tempColor, siteColors.arr3[counter])) {
			cssColor = "#" + siteColors.arr3[counter];
			styleAttrValue = "background:" + cssColor;
			var li = document.createElement("li");
			$(li).attr("style", styleAttrValue);
			$(li).attr("class", appConfig.colorClassName);
			$(li).html(cssColor);
			ul.appendChild(li);
			displayLength++;
		}
		tempColor = siteColors.arr3[counter];
	}
	$(ul).appendTo("#colorList");
	//$("#no").html(totalLength);
	$("#totalNum").html(totalLength);
	$("#displayNum").html(displayLength);
	$("#summary").removeClass("hidden");
}


function VERSIONEDshowColorList() {
	
	var cssColor = "#";
	var styleAttrValue = "";
	var counter = 0;
	var arrLength = 0;
	var totalLength = 0;
	arrLength = siteColors.arr1.length;
	totalLength += arrLength;
	console.log(totalLength);
	var ul = document.createElement("ul");
	for(counter = 0; counter < arrLength; counter++) {
		var li = document.createElement("li");
		cssColor = "#" + siteColors.arr1[counter];
		styleAttrValue = "background:" + cssColor;
		$(li).attr("style", styleAttrValue);
		$(li).html(cssColor);
		ul.appendChild(li);
	}
	$(ul).appendTo("#colorList");
	
	arrLength = siteColors.arr2.length;
	totalLength += arrLength;
	console.log(totalLength);
	for(counter = 0; counter < arrLength; counter++) {
		var li = document.createElement("li");
		cssColor = "#" + siteColors.arr2[counter];
		styleAttrValue = "background:" + cssColor;
		$(li).attr("style", styleAttrValue);
		$(li).html(cssColor);
		ul.appendChild(li);
	}
	$(ul).appendTo("#colorList");
	
	arrLength = siteColors.arr3.length;
	totalLength += arrLength;
	console.log(totalLength);
	for(counter = 0; counter < arrLength; counter++) {
		var li = document.createElement("li");
		cssColor = "#" + siteColors.arr3[counter];
		styleAttrValue = "background:" + cssColor;
		$(li).attr("style", styleAttrValue);
		$(li).html(cssColor);
		ul.appendChild(li);
	}
	$(ul).appendTo("#colorList");
	$("#no").html(totalLength);
	$("#summary").removeClass("hidden");
}

function prepareCanvas() {
	var canvas = document.getElementById("c1");
	var context = canvas.getContext("2d");
	var img = document.getElementById("i1");

	//context.createImageData(canvas.width, canvas.height);
	context.drawImage(img, 0, 0, 300, 200);
}


/* rgbToHex and toHex from javascripter.net/faq/rgbtohex.htm */
function rgbToHex(R,G,B) {return toHex(R)+toHex(G)+toHex(B)}
function toHex(n) {
 n = parseInt(n,10);
 if (isNaN(n)) return "00";
 n = Math.max(0,Math.min(n,255));
 return "0123456789ABCDEF".charAt((n-n%16)/16)
      + "0123456789ABCDEF".charAt(n%16);
}


function levenshtein(str1, str2) {
    var l1 = str1.length, l2 = str2.length;
    if (Math.min(l1, l2) === 0) {
        return Math.max(l1, l2);
    }
    var i = 0, j = 0, d = [];
    for (i = 0 ; i <= l1 ; i++) {
        d[i] = [];
        d[i][0] = i;
    }
    for (j = 0 ; j <= l2 ; j++) {
        d[0][j] = j;
    }
    for (i = 1 ; i <= l1 ; i++) {
        for (j = 1 ; j <= l2 ; j++) {
            d[i][j] = Math.min(
                d[i - 1][j] + 1,
                d[i][j - 1] + 1, 
                d[i - 1][j - 1] + (str1.charAt(i - 1) === str2.charAt(j - 1) ? 0 : 1)
            );
        }
    }
    return d[l1][l2];
}


function rgbToHsv(r, g, b){
    r = r/255, g = g/255, b = b/255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max == 0 ? 0 : d / max;

    if(max == min){
        h = 0; // achromatic
    }else{
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, v];
}

function hexToInt(hex) {  
	return parseInt("0x" + hex);
}

function hexToRGB(hex) {
	var r = hex.substr(0, 2);
	r = hexToInt(r);
	var g = hex.substr(2, 2);
	g = hexToInt(g);
	var b = hex.substr(4, 2);
	b = hexToInt(b);
	return [r, g, b];
}