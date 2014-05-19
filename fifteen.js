//Tile Slide Game
//Prepared by Kyle Hibbert
// The page turns green to indicate when solve. I wanted to be graded on that.

window.onload = function() {
	tiles= $$("#puzzlearea div");
	map=[];
	guideMap=[];
	emptyspace=new Coordinates(3,3);
	setup();
	$("shufflebutton").onclick= shuffleMatrix;
	for (var i = 0; i < tiles.length; i++) {
		tiles[i].onclick= switcher;
		tiles[i].onmouseover= moveAlert;
		tiles[i].onmouseout= moveAlertRemove;
		tiles[i].id= ""+i;
	}
	solved();
};

// Function used to set up the puzzle 
function setup(){
	
	for (var i = 0; i < tiles.length; i++) {
		tiles[i].addClassName("puzzlepiece");
	}
	for (var i = 0; i < 4; i++) {
		move(tiles[i],i,0);
		tiles[i].style.backgroundPosition= (-i*100)+"px"+" "+"0px";
		map[i]=new Coordinates(i,0);
		guideMap[i] = new Coordinates(i,0);
	}
	for (var i = 4; i < 8; i++) {
		move(tiles[i],i-4,1);
		tiles[i].style.backgroundPosition= (-(i-4)*100)+"px"+" "+"-100px";
		map[i]=new Coordinates(i-4,1);
		guideMap[i] = new Coordinates(i-4,1);
	}
	for (var i = 8; i < 12; i++) {
		move(tiles[i],i-8,2);
		tiles[i].style.backgroundPosition= (-(i-8)*100)+"px"+" "+"-200px";
		map[i]=new Coordinates(i-8,2);
		guideMap[i] = new Coordinates(i-8,2);
	}
	for (var i = 12; i < 15; i++) {
		move(tiles[i],i-12,3);
		tiles[i].style.backgroundPosition= (-(i-12)*100)+"px"+" "+"-300px";
		map[i]=new Coordinates(i-12,3);
		guideMap[i] = new Coordinates(i-12,3);
	}
	console.log("finish setup");
}

//This This is a test function used to observe changes in the mapping
function test(){
	for (var i = 0; i < tiles.length; i++) {
		console.log(map[i]);
	}
}

//This is used to move an element to a specified point
function move(element,x,y){
	element.style.left=(x*100)+"px";
	element.style.top=(y*100)+"px";
}

//This is an object created to store the location of elements
function Coordinates(x,y){
	this.x= x;
	this.y=y;
}

//This switches the positions of the selected piece and the empty space in the puzzle
function switcher(){
	if (this.hasClassName("movablepiece")) {
		var tileCord= getCor(this);
		console.log(tileCord);
		var x2;
		var y2;
		x2=tileCord.x;
		y2=tileCord.y;
		tileCord.x=emptyspace.x;
		tileCord.y=emptyspace.y;
		emptyspace.x=x2;
		emptyspace.y=y2;
		move(this,tileCord.x,tileCord.y);
		console.log("Item was moved to:"+tileCord.x+","+tileCord.y);
	}
	if (solved()) {
		document.body.style.backgroundColor= "#00B28A";
	} else {
		document.body.style.backgroundColor= "white";
	}
}

//Helper function of the shuffle function
function shuffleSwitcher(element){
	var tileCord= getCor(element);
	console.log("Tile Coordinates");
	console.log(tileCord);
	var x2;
	var y2;
	x2=tileCord.x;
	y2=tileCord.y;
	tileCord.x=emptyspace.x;
	tileCord.y=emptyspace.y;
	emptyspace.x=x2;
	emptyspace.y=y2;
	move(element,tileCord.x,tileCord.y);
	console.log("Item was moved to:"+tileCord.x+","+tileCord.y);
}

// Indicates what is a movable piece by applying class
function moveAlert(){
	var tileCord = getCor(this);
	if ((tileCord.x === emptyspace.x) && (Math.abs(tileCord.y- emptyspace.y)===1) || (tileCord.y === emptyspace.y) && (Math.abs(tileCord.x- emptyspace.x)===1)) {
		this.addClassName("movablepiece");
	}
}


//Removes the class set by moveAlert
function moveAlertRemove(){
	console.log("mouseout");
	this.removeClassName("movablepiece");
}

//This gets the coordinates for an element
function getCor(element){
	var pos = element.id;
	pos= +pos;
	return map[pos];
}

//This calls the shuffle function multiple times to shuffle board
function shuffleMatrix(){
	for (var i = 0; i <= 100; i++) {
		shuffle();
	}
}


//This switches the emptyspace with a random piece surounding it.
function shuffle(){
	var neighbours=[];
	for (var i = tiles.length - 1; i >= 0; i--) {
		var tileCord=getCor(tiles[i]);
		if((tileCord.x === emptyspace.x) && (Math.abs(tileCord.y- emptyspace.y)===1) || (tileCord.y === emptyspace.y) && (Math.abs(tileCord.x- emptyspace.x)===1)) {
			neighbours.push(tiles[i]);
		}
	}
	console.log("The neighbours length is:");
	console.log( neighbours.length);

	var select= Math.floor(Math.random() * (neighbours.length));
	console.log("random number is:"+ select);
	shuffleSwitcher(neighbours[select]);
	if (solved()) {
		document.body.style.backgroundColor= "#00B28A";
	} else {
		document.body.style.backgroundColor= "white";
	}
}

//This check to see if the elements are in their original arrangement
function solved(){
	for (var i = tiles.length - 1; i >= 0; i--) {
		
		if ((map[i].x != guideMap[i].x) ||( map[i].y != guideMap[i].y )) {
			return false;
		}
	}
	console.log("true");
	return true;

}