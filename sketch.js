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
    
    myFont = loadFont('assets/ArgentPixelCF-Regular.otf');

}

// Center drawing, drawFunction will be one for default
function setup() {
    createCanvas(1200, 750);

    // Center our drawing objects
    imageMode(CENTER);
    textAlign(LEFT);
    rectMode(CENTER);
    textSize(22);
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

    mouseEasing();

    // will call your state machine function
    drawFunction();
    drawDebugInfo();
}

//========= TEMPLATE: modify these functions, INSIDE the function blocks only =========

//-- drawOuteside () will draw the image at index 0 from the array, outside of the store
drawOutside = function () {
    fill("white")
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
        //text("Now all we have to do is open the store. Click the sign to flip it!", 50, 60);
    }
    //image(inst[0],midX + 340,370, 120,200);


}

//-- drawRoomOne() will draw first instance of the inside of the shop, promps user to interact with the tea and boba
drawRoomOne = function () {
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
    if (mouseX < 480) {
        spoonX = 480;
    } 
    else if (mouseX > 715) {
        spoonX = 715;
    } 
    else {
        spoonX = mouseX;
    }
    
    image(images[6], midX, midY);
    image(images[8], spoonX, midY - 100);
    image(images[7], midX, midY);

    fill("red");
    text("boba cooking state, press enter when done", midX, midY);

}

//-- drawTeaSteepOne() user is timed to click all theleaves, code tracks if theuser clicked at least 5 times. if yes then user is allowed into room two, If failed then user but mouse click to try again.
drawTeaSteepOne = function () {
    fill("red");
    image(images[11], midX, midY);

    text(Math.round(simpleTimer.getRemainingTime()), 100, 100);

    if (simpleTimer.expired()) {
        if (leafCount < 5) {
            text("FAIL, PRESS click anywhere to try again", midX, midY);
            if (mouseIsPressed) {
                simpleTimer.start();
            }
        } 
        else {
            text("WIN PRESS ANY KEY TO CONTINUE", midX, midY);
            if (keyIsPressed) {
                drawFunction = drawRoomTwo;
            }
        }
    } else {
        text("tea steeping state, click the 5 leaves before the time runs out!", midX, midY - 100);

    }
}

//-- drawRoomTwo() will draw 2nd instance of the inside of the shop where you have 4 tasks to complete
drawRoomTwo = function () {
    image(images[2], midX, midY);
    image(inst[3], 200,150);
    image(inst[4], 200,350);
    fill("white");
//    text("in room 2 \n click on the highilghted items to complete tasks. \n once the 4 tasks are completed, press w \n remmeber once you finish a task you cannot redo it, so make sure you do it well! ", 150, 50);
}

//-- drawCountMoney() user adds up all the money on screen and enters the value
drawCountMoney = function () {
    countMoneyEnter = false;
    image(images[12], midX, midY);

    fill("red");
    text("counting money screen, press delete to finish", midX, midY);
}

//-- drawMenuBoard() user can draw on the board when mouse pressed
drawMenuBoard = function () {
    menuBoardEnter = false;
    push();
    fill("white")
    stroke("orange");
    strokeWeight(10);
    rect(midX, midY, 600, 400);
    strokeWeight(3);
    stroke(0);
    if (mouseIsPressed === true) {
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
    pop();
    fill("red");
    text("menu board, press delete to finish", midX, midY);
}


drawCupStack = function () {
    cupStackEnter = false;
    image(images[13], midX, midY);
    image(images[14], a, b);


    fill("red");
    text("cup stacking, press delete to finish", midX, midY);
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

    fill(0);
    text("hold click to fill the pitcher, press delete to finish", midX, 600);
}

//-- drawRoomThree() will draw 3rd instance of the inside of the shop where you just have to set the boba out
drawRoomThree = function () {
    image(images[3], midX, midY);
    fill("white");
    image(inst[5], 200,150);
    image(inst[6], 200,350);
    //text("in room 3 \n to set the boba out press 'o'!", 150, 50);

}

//-- drawRoomFour() will draw 4th instance of the inside of the shop where you have completed everything and are asked to flip the sign
drawRoomFour = function () {
    image(images[4], midX, midY);
    fill("white");
    image(inst[7], 200,150);
    //text("in room 4  \n great everything is all set up! press the DOWN ARROW to go outside and flip the sign!", 150, 50);

}

//-- drawOpen() states finished, all set up and the boba shop is now open
drawOpen = function () {
    image(images[5], midX, midY);
    fill("white");
    //rect(midX+80 , midY+80, 100,200);
    image(inst[9], 200,150);
    //text("thanks for being such a good employee. its now open!", 150, 50);
    //image(inst[0],midX + 340,370, 120,200);
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
//    if (key === '1') {
//        drawFunction = drawCountMoney;
//    } 
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
            drawFunction = drawRoomThree;
        }
    } 
    else if (drawFunction === drawRoomThree) {
        if (key === 'o') {
            drawFunction = drawRoomFour;
        }
    }
    //    else if (count >= 4){
    //        drawFunction = drawRoomThree; 
    //    }
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
        if (mouseX > 653 && mouseX < 770) { // click on cashier machine
            if (mouseY > 500 && mouseY < 550) {
                if (countMoneyEnter == true) {
                    count++;
                    drawFunction = drawCountMoney;
                }
            }
        } 
        else if (mouseX > 780 && mouseX < 900) { // click on menu board
            if (mouseY > 175 && mouseY < 270) {
                if (menuBoardEnter == true) {
                    count++;
                    drawFunction = drawMenuBoard;
                }
            }
        } 
        else if (mouseX > 761 && mouseX < 794) { // click on cups
            if (mouseY > 270 && mouseY < 340) {
                if (cupStackEnter == true) {
                    count++;
                    drawFunction = drawCupStack;
                }
            }
        } 
        else if (mouseX > 865 && mouseX < 930) { // fill tea
            if (mouseY > 330 && mouseY < 415) {
                if (fillTeaEnter == true) {
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
