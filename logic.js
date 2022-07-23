var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var client = c.getBoundingClientRect();
var x,y;
var getLine, getfLine, getCir, getRect, getfRect, getfCir, printing, confLine, getEraser, conEraser;
var endLine, endfLine, endCir, endRect, endfRect, endfCir, endEraser;

ctx.lineWidth = parseInt(document.getElementById("widths").value);
ctx.strokeStyle = document.getElementById("colour").value;
ctx.fillStyle = document.getElementById("colour").value;

freeLines();

function removeListeners() {
	c.removeEventListener("mousedown", getLine);
	c.removeEventListener("mouseup", endLine);

	c.removeEventListener("mousedown", getfLine);
	c.removeEventListener("mousemove", confLine);
	c.removeEventListener("mouseup", endfLine);

	c.removeEventListener("mousedown", getCir);
	c.removeEventListener("mouseup", endCir);

	c.removeEventListener("mousedown", getfCir);
	c.removeEventListener("mouseup", endfCir);

	c.removeEventListener("mousedown", getRect);
	c.removeEventListener("mouseup", endRect);

	c.removeEventListener("mousedown", getfRect);
	c.removeEventListener("mouseup", endfRect);

	c.removeEventListener("click", printing);

	c.removeEventListener("mousedown", getEraser);
	c.removeEventListener("mousemove", conEraser);
	c.removeEventListener("mouseup", endEraser);
}

function lines() {
	removeListeners();

	getLine = function(event) {
		var x = event.clientX;
		var y = event.clientY;

		ctx.beginPath();
		ctx.moveTo(x-client.left, y-client.top);
	}

	endLine = function(event) {
		var x = event.clientX;
		var y = event.clientY;

		ctx.lineTo(x-client.left, y-client.top);
		ctx.stroke();
		ctx.closePath();
	}

	c.addEventListener("mousedown", getLine);
	c.addEventListener("mouseup", endLine);
}

function freeLines() {
	removeListeners();

	var drawing = false,x,y;
	getfLine = function(event) {
		x = event.clientX - client.left;
		y = event.clientY - client.top;
		drawing = true;
	}

	confLine = function(event) {
		if(drawing == false)
			return ;

		ctx.beginPath();
		ctx.moveTo(x,y);
		ctx.lineTo(event.offsetX, event.offsetY);
		ctx.stroke();
		x = event.offsetX;
		y = event.offsetY;
	}

	endfLine = function() {
		drawing = false;
	}

	c.addEventListener("mousedown", getfLine);
	c.addEventListener("mousemove", confLine);
	c.addEventListener("mouseup", endfLine);
}

function circles() {
	removeListeners();

	getCir = function(event) {
		x = event.clientX - client.left;
		y = event.clientY - client.top;
	}

	endCir = function(event) {
		var rx = event.clientX - client.left;
		var ry = event.clientY - client.top;

		var r = Math.sqrt((Math.pow(rx - x,2) + Math.pow(ry - y,2)));

		ctx.beginPath();
		ctx.arc(x, y, r, 0, 2*Math.PI);
		ctx.stroke();
		ctx.closePath();
	}

	c.addEventListener("mousedown", getCir);
	c.addEventListener("mouseup", endCir);
}

function fillCircles() {
	removeListeners();

	getfCir = function(event) {
		x = event.clientX - client.left;
		y = event.clientY - client.top;
	}

	endfCir = function(event) {
		var rx = event.clientX - client.left;
		var ry = event.clientY - client.top;

		var r = Math.sqrt((Math.pow(rx - x,2) + Math.pow(ry - y,2)));

		ctx.beginPath();
		ctx.arc(x, y, r, 0, 2*Math.PI);
		ctx.fill();
		ctx.closePath();
	}

	c.addEventListener("mousedown", getfCir);
	c.addEventListener("mouseup", endfCir);
}

function rectangles() {
	removeListeners();

	getRect = function(event) {
		x = event.clientX - client.left;
		y = event.clientY - client.top;
	}

	endRect = function(event) {
		var rx = event.clientX - client.left;
		var ry = event.clientY - client.top;

		ctx.beginPath();
		ctx.rect(x, y, rx-x, ry-y);
		ctx.stroke();
		ctx.closePath();
	}

	c.addEventListener("mousedown", getRect);
	c.addEventListener("mouseup", endRect);
}

function fillRectangles() {
	removeListeners();

	getfRect = function(event) {
		x = event.clientX - client.left;
		y = event.clientY - client.top;
	}

	endfRect = function(event) {
		var rx = event.clientX - client.left;
		var ry = event.clientY - client.top;

		ctx.beginPath();
		ctx.rect(x, y, rx-x, ry-y);
		ctx.fill();
		ctx.closePath();
	}

	c.addEventListener("mousedown", getfRect);
	c.addEventListener("mouseup", endfRect);
}

function setColor() {
	ctx.strokeStyle = document.getElementById("colour").value;
	ctx.fillStyle = document.getElementById("colour").value;
}

function setWidth() {
	ctx.lineWidth = parseInt(document.getElementById("widths").value);
}

function print() {
	removeListeners();

	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	ctx.font = "40px Arial";

	printing = function(event) {
		var x = event.clientX - client.left;
		var y = event.clientY - client.top;
		str = window.prompt("Enter string to print");
		ctx.beginPath();
		ctx.fillStyle = document.getElementById("colour").value;
		if(str != null)
			ctx.fillText(str, x, y);
		ctx.closePath();
	}

	c.addEventListener("click", printing);
}

function clears() {
	removeListeners();

	ctx.beginPath();
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, 500, 500);
	ctx.fill();
	ctx.closePath();

	ctx.fillStyle = document.getElementById("colour").value;
}

function eraser() {
	removeListeners();

	var drawing = false,x,y;
	getEraser = function(event) {
		x = event.clientX - client.left;
		y = event.clientY - client.top;
		drawing = true;
	}

	conEraser = function(event) {
		if(drawing == false)
			return ;

		ctx.beginPath();
		ctx.moveTo(x,y);
		ctx.lineTo(event.offsetX, event.offsetY);
		ctx.strokeStyle = "#ffffff";
		ctx.stroke();
		x = event.offsetX;
		y = event.offsetY;
	}

	endEraser = function() {
		drawing = false;
		ctx.strokeStyle = document.getElementById("colour").value;
	}

	c.addEventListener("mousedown", getEraser);
	c.addEventListener("mousemove", conEraser);
	c.addEventListener("mouseup", endEraser);
}

document.getElementById('save').onclick = function () {
	window.open(c.toDataURL('image/png','_blank'));
};