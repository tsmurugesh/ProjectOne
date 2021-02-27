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
var simpleTimer;

//room enter booleans
var countMoneyEnter = true;
var menuBoardEnter = true;
var cupStackEnter = true;
var fillTeaEnter = true;
var count = 0;
var leafCount = 0
var waitForClick;

// offset from bottom of screen
var gTextOffset = 100;

// load all images and text into an array
function preload() {
    images[0] = loadImage('assets/outside.png');
    images[1] = loadImage('assets/room1.png');
    
    inst[0] = loadImage('assets/index.png');
    inst[1] = loadImage('assets/room1_text.png');

}

// Center drawing, drawFunction will be one for default
function setup() {
    createCanvas(1200,800);

    // Center our drawing objects
    imageMode(CENTER);
    textAlign(CENTER);
    rectMode(CENTER);
    textSize(30);
    
    //timer stuff
    simpleTimer = new Timer(3000);

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
    //rect(midX+80 , midY+80, 100,200);
    //text("welcome to your shift at the boba shop!\n click the door to enter",midX + 340, midY - 100);
    image(inst[0],midX + 340,370, 120,200);


}

//-- drawTwo() will draw the image at index 1 from the array
drawRoomOne = function () {
    image(images[1], midX, midY, 600, 600);
    image(inst[0],140, 370, 120,200);
    fill("white");
    text("1. press 'p' to cook boba \n 2. click on the pot to steep the tea", 1000, 370);

}

drawBobaCook = function () {
    //image(images[1], midX, midY, 600,600);
    fill("red");
    text("boba cooking state",midX, midY);
}

drawTeaSteepOne = function () {
    //image(images[1], midX, midY, 600,600);
    fill("red");
    //text("tea steeping state, press start!",midX, midY);

    text("tea steeping state, click the 5 leaves before the time runs out! click to begin", midX, midY+100);
        text( Math.round(simpleTimer.getRemainingTime()), 100, 100 );

        if ( simpleTimer.expired() ){
            if ( leafCount < 5 ){
                text("FAIL, PRESS click to try again" ,midX, midY);
                if (mouseIsPressed){
                    simpleTimer.start();
                }
            }
            else{
                text("WIN PRESS anything TO CONTINUE",midX, midY);
                if (keyIsPressed){
                    drawFunction = drawRoomTwo;
                }
            
        }
    }
}
//drawTeaSteepTwo = function () {
//    //image(images[1], midX, midY, 600,600);
//    fill("red");
//    
//    //if count == x gp here, else fail and go here
//}
drawTeaSteepFail = function () {
    //image(images[1], midX, midY, 600,600);
    fill("red");
    text("tea steeping state, Failure page, send back to tea steep one",midX, midY);
}

drawTeaSteepWin = function () {
    //image(images[1], midX, midY, 600,600);
    fill("red");
    text("tea steeping state, success page, continue to room2 to do other tasks",midX, midY);
}

drawRoomTwo = function () {
    image(images[1], midX, midY, 600, 600);
    image(inst[0],140, 370, 120,200);
    fill("white");
    text("in room 2 \n click on the highilghted items to complete tasks", 1000, 370);
}

drawCountMoney = function () {
    countMoneyEnter = false;
    fill("red");
    text("counting money screen",midX, midY);
}

drawMenuBoard = function () {
    menuBoardEnter = false;
    fill("red");
    text("menu board",midX, midY);
}

drawCupStack = function () {
    cupStackEnter = false;
    fill("red");
    text("cup stacking",midX, midY);
}

drawFillTea = function () {
    fillTeaEnter = false;
    fill("red");
    text("filling tea",midX, midY);
}

drawRoomThree = function () {
    image(images[1], midX, midY, 600, 600);
    image(inst[0],140, 370, 120,200);
    fill("white");
    text("in room 3 set the boba out!", 1000, 370);

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
    }else if (key === '2') {
        drawFunction = drawRoomOne;
    }else if (key === '3') {
        drawFunction = drawRoomTwo;
    }
    
    if (drawFunction === drawRoomOne){
        if (key === 'p'){
            drawFunction = drawBobaCook;
        } 
    }
//    else if (count >= 4){
//        drawFunction = drawRoomThree; 
//    }
}

function keyPressed(){
    if (drawFunction === drawCountMoney){
        if (keyCode === BACKSPACE){
            drawFunction = drawRoomTwo;
        } 
    }
    else if (drawFunction === drawMenuBoard){
        if (keyCode === BACKSPACE){
            drawFunction = drawRoomTwo;
        } 
    }
    else if (drawFunction === drawCupStack){
        if (keyCode === BACKSPACE){
            drawFunction = drawRoomTwo;
        } 
    }
    else if (drawFunction === drawFillTea){
        if (keyCode === BACKSPACE){
            drawFunction = drawRoomTwo;
        } 
    }else if (drawFunction === drawRoomTwo){
        if (keyCode === ENTER){
            drawFunction = drawRoomThree;
        }
    }
}

function mousePressed() {
    if (drawFunction === drawOutside) { //click on door from outside to enter
        if (mouseX > 630 && mouseX < 700) {
            if (mouseY > 400 && mouseY < 580) {
                drawFunction = drawRoomOne;
            } 
        }
    }
    else if (drawFunction === drawRoomOne) {
        if (mouseX > 330 && mouseX < 400) {
            if (mouseY > 370 && mouseY < 430) {
                simpleTimer.start();
                drawFunction = drawTeaSteepOne;
            } 
        }
    }
    else if (drawFunction === drawTeaSteepOne) {
        if ( mouseIsPressed = true){
            leafCount++;
        }
    }
    else if (drawFunction === drawRoomTwo) {
        if (mouseX > 503 && mouseX < 620) { // click on cashier machine
            if (mouseY > 500 && mouseY < 550) {
                if(countMoneyEnter == true){
                    count++;
                    drawFunction = drawCountMoney;
                }
            } 
        }
        else if (mouseX > 630 && mouseX < 750) { // click on menu board
            if (mouseY > 175 && mouseY < 270) {
                if(menuBoardEnter == true){
                    count++;
                    drawFunction = drawMenuBoard;
                }
            } 
        }
        else if (mouseX > 611 && mouseX < 644) { // click on cups
            if (mouseY > 270 && mouseY < 340) {
                if(cupStackEnter == true){
                    count++;
                    drawFunction = drawCupStack;
                }
            } 
        }
        else if (mouseX > 715 && mouseX < 780) { // fill tea
            if (mouseY > 330 && mouseY < 415) {
                if(fillTeaEnter == true){
                    count++;
                    drawFunction = drawFillTea;
                }
            } 
        }
    }
}

function drawDebugInfo() {
    fill("red");
    textSize(15);
    text("x: " + mouseX + " y: " + mouseY, 100, height - 2);
    //text("x: " + midY + " y: " + midY, midX, midY);
}
