/***********************************************************************************
	Project 1 -
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

// verious variable initializations
var midY;
var simpleTimer;
var r = 1;
var countMoneyEnter = true;
var menuBoardEnter = true;
var cupStackEnter = true;
var fillTeaEnter = true;
var count = 0;
var leafCount = 0
var tasksDone = false
var button, input;
var revealSize = 100;;


// offset from bottom of screen
var gTextOffset = 100;

// load all images and text into an array
function preload() {
    images[0] = loadImage('assets/outside.png');
    images[1] = loadImage('assets/room1.png');
    images[2] = loadImage('assets/room2.png');
    images[3] = loadImage('assets/room3.png');
    images[4] = loadImage('assets/room4.png');
    images[5] = loadImage('assets/open.png');
    images[6] = loadImage('assets/potback.png');
    images[7] = loadImage('assets/potfront.png');
    images[8] = loadImage('assets/spoon.png');
    images[9] = loadImage('assets/tea.png');
    images[10] = loadImage('assets/outside2.png');
    images[11] = loadImage('assets/teapot.png');
    images[12] = loadImage('assets/money.png');
    images[13] = loadImage('assets/cups.png');
    images[14] = loadImage('assets/onecup.png');

    inst[0] = loadImage('assets/outside_txt2.png');
    inst[1] = loadImage('assets/rm1_txt1.png');
    inst[2] = loadImage('assets/rm1_txt2.png');
    inst[3] = loadImage('assets/rm2_txt1.png');
    inst[4] = loadImage('assets/rm2_txt2.png');
    inst[5] = loadImage('assets/rm3_txt1.png');
    inst[6] = loadImage('assets/rm3_txt2.png');
    inst[7] = loadImage('assets/rm4_txt1.png');
    inst[8] = loadImage('assets/outside_txt3.png');
    inst[9] = loadImage('assets/open_txt1.png');
    inst[10] = loadImage('assets/tea_txt1.png');
    inst[11] = loadImage('assets/tea_txt2.png');
    inst[12] = loadImage('assets/tea_txt3.png');
    inst[13] = loadImage('assets/boba_txt.png');
    inst[14] = loadImage('assets/taskfin_txt.png');
    inst[15] = loadImage('assets/money_text.png');
    inst[16] = loadImage('assets/fillyea_txt.png');
    inst[17] = loadImage('assets/menu_text.png');
    inst[18] = loadImage('assets/cups_txt.png');




    
    myFont = loadFont('assets/ArgentPixelCF-Regular.otf');

}

// Center drawing, drawFunction will be one for default
function setup() {
    createCanvas(1200, 750);

    // Center our drawing objects
    imageMode(CENTER);
    textAlign(LEFT);
    rectMode(CENTER);
    textSize(40);
    textFont(myFont);

    // Timer  set up
    simpleTimer = new Timer(8000);

    // Set to one for startup
    drawFunction = drawOutside;
}

// Very simple, sets the background color and calls your state machine function
function draw() {
    background("#5fa4db");

    midX = (width / 2)+150;
    midY = height / 2;
    //revealsize=100;


    mouseEasing();

    // will call your state machine function
    drawFunction();
    drawDebugInfo();
}

//========= TEMPLATE: modify these functions, INSIDE the function blocks only =========

//-- drawOuteside () will draw the image at index 0 from the array, outside of the store
drawOutside = function () {
    //background("#5fa4db");
    fill("white");
    if (tasksDone === false) {
        image(images[0], midX, midY);
//        push();
//        rectMode(CORNER);
//        fill("#324c77");
//        stroke("white");
//        strokeWeight(2);
//        rect(40, 70, 270,120,10);
//        pop();
//        text("Good morning and welcome to \n your shift at the Sweet Time\n Boba! We have alot to do before\n opening so lets begin. Press UP\n to head inside.", 50, 90);
        image(inst[0], 200,150);
    } 
    else if (tasksDone === true) {
        image(images[10], midX, midY);
        image(inst[8], 200,150);
    }
}

//-- drawRoomOne() will draw first instance of the inside of the shop, promps user to interact with the tea and boba
drawRoomOne = function () {
    //background("#5fa4db");
    image(images[1], midX, midY);
    //image(inst[0], 140, 370, 120, 200);
//    fill("white");
//    text("First things we must do is cook the boba and steep some tea. First press 'q' to steep the boba, then press 'p' to steep the tea", 50, 60);
    image(inst[1], 200,150);
    image(inst[2], 200,350);
}

//-- drawBobaCook() user "cooks" the boba. user can pretend to stir around the pot. Press enter to finish
drawBobaCook = function () {
    // limiting spoon mixing movement
    var spoonX;
    if (mouseX < 615) {
        spoonX = 615;
    } 
    else if (mouseX > 865) {
        spoonX = 865;
    } 
    else {
        spoonX = mouseX;
    }

    image(images[6], midX, midY);
    image(images[8], spoonX, midY - 100);
    image(images[7], midX, midY);
    image(inst[13], 200,150);
    fill("red");
    //text("boba cooking state, press enter when done", midX, midY);
}

//-- drawTeaSteepOne() user is timed to click all theleaves, code tracks if theuser clicked at least 5 times. if yes then user is allowed into room two, If failed then user but mouse click to try again.
drawTeaSteepOne = function () {
    fill("red");
    image(images[11], midX, midY);

    // text box for timer
    push();
    fill("#375f91");
    stroke(255);
    strokeWeight(1);
    rect(200, 250, 300, 50);
    noStroke();
    fill(255);
    text("Time: " + Math.round(simpleTimer.getRemainingTime()), 70, 255);
    pop();

    if (simpleTimer.expired()) {
        if (leafCount < 5) {
            // text("FAIL, PRESS click anywhere to try again", midX, midY);
            image(inst[12], 200, 350);
            if (mouseIsPressed) {
                simpleTimer.start();
            }
        } 
        else {
            // text("WIN PRESS ANY KEY TO CONTINUE", midX, midY);
            image(inst[11], 200, 350);
            if (keyIsPressed) {
                drawFunction = drawRoomTwo;
            }
        }
    } 
    else {
        // text("tea steeping state, click the 5 leaves before the time runs out!", midX, midY - 100);
        image(inst[10], 200, 150);
    }
}

//-- drawRoomTwo() will draw 2nd instance of the inside of the shop where you have 4 tasks to complete
drawRoomTwo = function () {
    image(images[2], midX, midY);
    image(inst[3], 200, 150);
    image(inst[4], 200, 350);
    fill("white");
//    text("in room 2 \n click on the highilghted items to complete tasks. \n once the 4 tasks are completed, press w \n remmeber once you finish a task you cannot redo it, so make sure you do it well! ", 150, 50);
}

//-- drawCountMoney() user adds up all the money on screen and enters the value
drawCountMoney = function () {
    countMoneyEnter = false;
    image(images[12], midX, midY);
    image(inst[15], 200, 150);
    image(inst[14], 200, 350);
    text
    //text("counting money screen, press delete to finish", midX, midY);
}

//-- drawMenuBoard() user can draw on the board when mouse pressed
drawMenuBoard = function () {
    menuBoardEnter = false;
    push();
    fill("white")
    //noFill();
    stroke("orange");
    strokeWeight(10);
    rect(midX, midY, 600, 400);
    pop();

    strokeWeight(7);
    stroke("black");

    push();
        if (mouseIsPressed === true) {
            if (mouseX >= 450 && mouseX <=1050){
                if (mouseY >= 180 && mouseY <=570)
                    line(mouseX, mouseY, pmouseX, pmouseY);
            }
        //noLoop();
    }
    pop();
  //   fill("blue");
  //     beginShape();
  // // Exterior part of shape, clockwise winding
  //   vertex(-width, -height);
  //   vertex(width, -height);
  //   vertex(width, height);
  //   vertex(-width, height);
  // // Interior part of shape, counter-clockwise winding
  //   beginContour();
  //   vertex(midX-300, midY-200);
  //   vertex(midX+300, midY-200);
  //   vertex(midX+300, midY+200);
  //   vertex(midX-300, midY+200);
  //   endContour();
  //   endShape(CLOSE);

    image(inst[17], 200, 150);
    image(inst[14], 200, 350);
    count++;
}


drawCupStack = function () {
    cupStackEnter = false;
    image(images[13], midX, midY);
    image(images[14], a, b);
    image(inst[18], 200, 150);
    image(inst[14], 200, 350);
    count++;
}

//-- drawFillTea() user holds down mouse to "fill" tea container
drawFillTea = function () {
    fillTeaEnter = false;
    noStroke();
    fill("#d89663");
    if (mouseIsPressed === true) {
        r = r + 4;
    }
    rect(midX, midY + 200, 200, r);
    image(images[9], midX, midY);
    fill("#5fa4db");
    rect(midX, 750, 200, 175);
    rect(midX, 0, 200,175);

    image(inst[15], 200, 150);
    image(inst[14], 200, 350);
    fill(0);
    count++;
}

//-- drawRoomThree() will draw 3rd instance of the inside of the shop where you just have to set the boba out
drawRoomThree = function () {
    image(images[3], midX, midY);
    fill("white");
    image(inst[5], 200, 150);
    image(inst[6], 200, 350);
    count++;
}

//-- drawRoomFour() will draw 4th instance of the inside of the shop where you have completed everything and are asked to flip the sign
drawRoomFour = function () {
    image(images[4], midX, midY);
    fill("white");
    image(inst[7], 200, 150);
}

//-- drawOpen() states finished, all set up and the boba shop is now open
drawOpen = function () {
    image(images[5], midX, midY);
    fill("white");
    image(inst[9], 200, 150);
}


//========= TEMPLATE: add or change interface functions, as you like =========

// mouse easing stuff all in one place
 function mouseEasing(){
   let targetX = mouseX;
   let dx = targetX - a;
   a += dx * easing;

   let targetY = mouseY;
   let dy = targetY - b;
   b += dy * easing;
 }

// Change the drawFunction variable based on your interaction
function keyTyped() {
   if (key === '1') {
       drawFunction = drawMenuBoard;
   } 
//    else if (key === '2') {
//        drawFunction = drawRoomOne;
//    }
//    else if (key === '3') {
//        drawFunction = drawRoomTwo;
//    }
//    else if (key === '4') {
//        drawFunction = drawOpen;
//    }

    if (drawFunction === drawRoomOne) {
        if (key === 'q') {
            drawFunction = drawBobaCook;
        } 
        else if (key === 'p') {
            simpleTimer.start();
            drawFunction = drawTeaSteepOne
        }
    } 
    else if (drawFunction === drawRoomTwo) {
        if (key === 'w') {
            if (count >= 4){
                drawFunction = drawRoomThree;
            }
        }
    } 
    else if (drawFunction === drawRoomThree) {
        if (key === 'o') {
            drawFunction = drawRoomFour;
        }
    }
}

function keyPressed() {
    if (drawFunction === drawOutside) {
        if (keyCode === UP_ARROW) {
            drawFunction = drawRoomOne;
        }
    } 
    else if (drawFunction === drawBobaCook) {
        if (keyCode === ENTER) {
            drawFunction = drawRoomOne;
        }
    } 
    else if (drawFunction === drawCountMoney) {
        if (keyCode === BACKSPACE) {
            drawFunction = drawRoomTwo;
        }
    } 
    else if (drawFunction === drawMenuBoard) {
        if (keyCode === BACKSPACE) {
            drawFunction = drawRoomTwo;
        }
    } 
    else if (drawFunction === drawCupStack) {
        if (keyCode === BACKSPACE) {
            drawFunction = drawRoomTwo;
        }
    } 
    else if (drawFunction === drawFillTea) {
        if (keyCode === BACKSPACE) {
            drawFunction = drawRoomTwo;
        }
    } 
    else if (drawFunction === drawRoomTwo) {
        if (keyCode === ENTER) {
            drawFunction = drawRoomThree;
        }
    } 
    else if (drawFunction === drawRoomFour) {
        if (keyCode === DOWN_ARROW) {
            tasksDone = true;
            drawFunction = drawOutside;
        }
    }
}

function mousePressed() {
    if (drawFunction === drawTeaSteepOne) {
        if (mouseIsPressed = true) {
            leafCount++;
        }
    } 
    else if (drawFunction === drawOutside) {
        if (tasksDone === true) {
            if (mouseX > 775 && mouseX < 900) {
                if (mouseY > 370 && mouseY < 550) {
                    drawFunction = drawOpen;
                }
            }
        }
    } 
    else if (drawFunction === drawRoomTwo) {
        if (mouseX > 640 && mouseX < 770) { // click on cashier machine
            if (mouseY > 450 && mouseY < 550) {
                if (countMoneyEnter == true) {
                    drawFunction = drawCountMoney;
                }
            }
        } 
        else if (mouseX > 780 && mouseX < 900) { // click on menu board
            if (mouseY > 175 && mouseY < 270) {
                if (menuBoardEnter == true) {
                    drawFunction = drawMenuBoard;
                    
                }
            }
        } 
        else if (mouseX > 761 && mouseX < 794) { // click on cups
            if (mouseY > 270 && mouseY < 340) {
                if (cupStackEnter == true) {
                    drawFunction = drawCupStack;
                }
            }
        } 
        else if (mouseX > 865 && mouseX < 930) { // fill tea
            if (mouseY > 330 && mouseY < 415) {
                if (fillTeaEnter == true) {
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
