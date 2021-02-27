/***********************************************************************************
	SimpleStateMachine -
	by Tanvi Murugesh

	Template:

	(1) Add your own PNG files in the assets folder. Make sure they match the names ***exactly*** of the existing PNGs.
	(2) Add custom drawing code to drawSplash(), drawOne(), drawTwo(), drawThree(), drawFour(), drawFive()
	(3) You can add your own interfaces - keys, mouse events, etc in the Interfaces section

	Also start your localhost before running this, otherwise no PNGs will display

------------------------------------------------------------------------------------
	The way it works — you don't need to know this for the template use
	* array of images gets loaded at startup
	* drawFunction is a VARIABLE that points to a function varible name
	* drawOne(), drawTwo(), etc. are set to be functions.
	* the the keys 1-5 will change the drawFunction variable
  * starts with drawSplash and waits for a mousePressed event
  * adds a key, 's' to return to the splash screen

------------------------------------------------------------------------------------
	Notes:
	- a more advanced state machine with use array-indexing variables for each of
		images the draw functions, but this is just for illustrative purposes

	- even more advanced will be to put the draw functions into an array, would
		be helpful for randomizing, go to the next function, etc

	- next step after that would be to put interfaces into an array that maps to
		the functions


***********************************************************************************/

// Array of images
var images = [];

// Array of text
var instructions  = [];
var lineHeight = 50;
var startY = 300;

// easing variables 
var a = 1;
var b = 1;
var easing = 0.08;
var cursor;

// variable that is a function 
var drawFunction;

// offset from bottom of screen
var gTextOffset = 100;

// load all images and text into an array
function preload() {
  images[0] = loadImage('assets/anger.png');
  images[1] = loadImage('assets/ill.png');
  images[2] = loadImage('assets/sleepy.png');
  images[3] = loadImage('assets/stressed.png');
  images[4] = loadImage('assets/vibe.png');
  images[5] = loadImage('assets/splash.png');

  instructions[0] = "☆welcome to my mood states!☆";
  instructions[1] = "☆use 1-5 to look through the moods☆";
  instructions[2] = "☆use 's' to go back to splash page☆";
  instructions[3] = "☆use 'i' to remind yourself of the intructions☆";

  cursor = loadImage('assets/cursor.png');

}

// Center drawing, drawFunction will be one for default
function setup() {
  createCanvas(800,800);

  // Center our drawing objects
  imageMode(CENTER);
  textAlign(CENTER);
  textSize(30);
  textFont("Fugaz One");

  // easing information

  // set to one for startup
  drawFunction = drawSplash;
}

// Very simple, sets the background color and calls your state machine function
// easing calculations
function draw() {
  background("#fbcd15");

  mouseEasing();

  // will call your state machine function
  drawFunction();
}

//========= TEMPLATE: modify these functions, INSIDE the function blocks only =========

//-- drawOne() will draw the image at index 0 from the array
drawOne = function() {
   push();
   textSize(50);
   fill("#e8eff4");
   noStroke();
   text("anger", a, b);
   pop();

   image(images[0], width/2, height/2);

   push();
   textSize(50);
   stroke("#e8eff4");
   strokeWeight(2);
   noFill();
   text("anger", a, b);
   pop();
}

//-- drawTwo() will draw the image at index 1 from the array
drawTwo = function() {
   push();
   textSize(50);
   fill("#e8eff4");
   noStroke();
   text("ill", a, b);
   pop();

   image(images[1], width/2, height/2);

   push();
   textSize(50);
   stroke("#e8eff4");
   strokeWeight(2);
   noFill();
   text("ill", a, b);
   pop();

}

//-- drawOne() will draw the image at index 2 from the array
drawThree = function() {
   push();
   textSize(50);
   fill("#e8eff4");
   noStroke();
   text("sleepy", a,b);
   pop();

   image(images[2], width/2, height/2);

   push();
   textSize(50);
   stroke("#e8eff4");
   strokeWeight(2);
   noFill();
   text("sleepy", a, b);
   pop();

}

//-- drawOne() will draw the image at index 3 from the array
drawFour = function() {
   push();
   textSize(50);
   fill("#e8eff4");
   noStroke();
   text("stressed", a, b);
   pop();

   image(images[3], width/2, height/2);

   push();
   textSize(50);
   stroke("#e8eff4");
   strokeWeight(2);
   noFill();
   text("stressed", a, b);
   pop();
}

//-- drawOne() will draw the image at index 4 from the array
drawFive = function() {
   push();
   textSize(50);
   fill("#e8eff4");
   noStroke();
   text("vibing", a, b);
   pop();

   image(images[4], width/2, height/2);

   push();
   textSize(50);
   stroke("#e8eff4");
   strokeWeight(2);
   noFill();
   text("vibing", a, b);
   pop();

}


//-- drawSplash() will draw the image at index 4 from the array
drawSplash = function() {
  push();
   textSize(50);
   fill("#e8eff4");
   noStroke();
   text("click me", a, b);
   pop();

   image(images[5], width/2, height/2);

   push();
   textSize(50);
   stroke("#e8eff4");
   strokeWeight(2);
   noFill();
   text("click me", a, b);
   pop();
}

//-- drawInst() will draw text array with the intructions
drawInst = function(){
  image(cursor, a, b);

  fill("red");
  for (let i = 0; i < instructions.length; i++ ){
    text(instructions[i], width/2, startY + (i*lineHeight));
  }
}

// mouse easing stuff all in one place
function mouseEasing(){
  let targetX = mouseX;
  let dx = targetX - a;
  a += dx * easing;

  let targetY = mouseY;
  let dy = targetY - b;
  b += dy * easing;
}

//========= TEMPLATE: add or change interface functions, as you like =========

// Change the drawFunction variable based on your interaction
function keyTyped() {
  if( drawFunction === drawSplash ) {
    return;
  }

  if( key === '1' ) {
  	drawFunction = drawOne;
  }
  else if( key === '2' ) {
  	drawFunction = drawTwo;
  }
  else if( key === '3' ) {
  	drawFunction = drawThree;
  }
  else if( key === '4' ) {
  	drawFunction = drawFour;
  }
  else if( key === '5' ) {
  	drawFunction = drawFive;
  }
  else if( key === 's' ) {
    drawFunction = drawSplash;
  }
  else if( key === 'i' ) {
    drawFunction = drawInst;
  }
}

function mousePressed() {
  // only change state if we are in splash screen
  if( drawFunction === drawSplash ) {
    drawFunction = drawInst;
  }
}
