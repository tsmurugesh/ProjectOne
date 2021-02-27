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
var inst = [];


// easing variables 
var a = 1;
var b = 1;
var easing = 0.08;
var cursor;

// variable that is a function 
var drawFunction;
var midX;
var midY;

// offset from bottom of screen
var gTextOffset = 100;

// load all images and text into an array
function preload() {
    images[0] = loadImage('assets/outside.png');
    images[1] = loadImage('assets/room1.png');
    
    inst[0] = loadImage('assets/index.png');

}

// Center drawing, drawFunction will be one for default
function setup() {
    createCanvas(windowWidth, windowHeight);

    // Center our drawing objects
    imageMode(CENTER);
    textAlign(CENTER);
    rectMode(CENTER);
    textSize(30);
    // easing information

    // set to one for startup
    drawFunction = drawOutside;
}

// Very simple, sets the background color and calls your state machine function
// easing calculations
function draw() {
    background("#5fa4db");
    midX = width / 2;
    midY = height / 2;

    //mouseEasing();

    // will call your state machine function
    drawFunction();
    drawDebugInfo();
}

//========= TEMPLATE: modify these functions, INSIDE the function blocks only =========

//-- drawOne() will draw the image at index 0 from the array
drawOutside = function () {
    image(images[0], midX, midY, 600, 600);
    fill("white");
    //rect(midX + 340, midY - 100, 100,200);
    //text("welcome to your shift at the boba shop!\n click the door to enter",midX + 340, midY - 100);
    image(inst[0],midX + 340, midY - 100, 120,200);


}

//-- drawTwo() will draw the image at index 1 from the array
drawRoomOne = function () {
    image(images[1], midX, midY, 600, 600);

}

drawBobaCook = function () {
    //image(images[1], midX, midY, 600,600);
    fill("red");
    text("boba cooking state");
}



// mouse easing stuff all in one place
// function mouseEasing(){
//   let targetX = mouseX;
//   let dx = targetX - a;
//   a += dx * easing;

//   let targetY = mouseY;
//   let dy = targetY - b;
//   b += dy * easing;
// }

//========= TEMPLATE: add or change interface functions, as you like =========

// Change the drawFunction variable based on your interaction
function keyTyped() {
    if (key === '1') {
        drawFunction = drawOutside;
    } else if (key === '2') {
        drawFunction = drawRoomOne;
    }
}

function mousePressed() {
    // only change state if we are in splash screen
    if (drawFunction === drawSplash) {
        drawFunction = drawInst;
    }
}

function drawDebugInfo() {
    fill("red");
    textSize(15);
    text("x: " + mouseX + " y: " + mouseY, 100, height - 2);
    text("x: " + midY + " y: " + midY, midX, midY);
}
