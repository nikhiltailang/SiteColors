<!DOCTYPE html>
<html>
	<head>
		<link href="css/reset.css" rel="stylesheet">
		<link href="css/components.css" rel="stylesheet">
		<link href="css/style.css" rel="stylesheet">
		<title>Experimental - SC</title>
	</head>
	<body class="sans">

		<div class="wrapper vm40 w50 smauto">
			<img id="i1" src="images/i5.jpg" class="hidden" />
			<div class="wrap">
				<canvas class="smauto bm40 l" id="c1" width="300" height="200"></canvas>
				<div id="configs" class="l smauto wthin tac">
					<p class="h1 bm10">Settings</p>
					<p>Tolerance <input type="range" step="1" min="1" max="6" id="tolerance"></p>
					<p><label for="xskip">X-Skip</label><input placeholder="X-Skip" type="text" id="xskip" class="pad5" /></p>
					<p><label for="yskip">Y-Skip</label><input placeholder="Y-Skip" type="text" id="yskip" class="pad5" /></p>
					<a href="#" id="getcolors" class="button round5">Get colors</a>
				</div> <!-- configs -->
				<div class="clear">&nbsp;</div>
			</div>

			<div id="summary" class="vm40 tac h1 hidden">Found <span id="totalNum"></span> CSS colors. Showing <span id="displayNum"></span> different colors.</div>
			<div id="colorList"></div>
			
			<div id="selected" class="clear">
				<ul id="selectedColorList" class="w80 l"></ul>
				<div class="r margin10"><a href="#" class="round5 h5 button" id="getcode">Get CSS Code</a></div>
				<div class="clear">&nbsp;</div>
			</div> <!-- selected -->
			
		</div> <!-- wrapper -->
		
		<div id="thecsscontainer" class="hidden vm40 smauto pad10 round5">
			<textarea name="thecss" id="thecss" class="fullwidth" rows="10"></textarea>
		</div>

		<script src="scripts/jQuery.js"></script>
		<!-- script src="scripts/jpgjs/jpg.js"></script -->
		<script src="scripts/app.js"></script>
	</body>
</html>