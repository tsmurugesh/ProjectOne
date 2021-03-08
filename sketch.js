/***********************************************************************************
	Project 1 -
	by Tanvi Murugesh

------------------------------------------------------------------------------------
	The way it works — you don't need to know this for the template use
        First all variables of images (for bth imagery and informational text boxes) gets loaded at startup.
        The drawFunction is a variable that points to a function varible name. It is called in draw() and set to drawOutside first.
        Based on mouse and keyboard input, different drawFunctions will be called. Certain functions can only be accessed a 
        single time and then the user is locked out, or once a certain goal has been met, making the experience not entirely linear. 
        There is also a timer implemented on one of the draw pages, refrenced from the p5.timer library.

------------------------------------------------------------------------------------
	Notes:
	- Certain draw functions can only be accessed once, and other only after certain criteria has been met.


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

// various variable initializations
var midY, midX;
var simpleTimer, input, button, sound1, sound2;
var r = 1;
var countMoneyEnter = true;
var menuBoardEnter = true;
var cupStackEnter = true;
var fillTeaEnter = true;
var tasksDone = false;
var count = 0;
var leafCount = 0;

// load all images and text into an array
function preload() {
    // Drawings
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
    images[15] = loadImage('assets/white.png');

    //Instruction text boxes
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

    sound1 = loadSound("assets/blip1.mp3");
    sound2 = loadSound("assets/blip2.mp3");
    mySong = loadSound("assets/bobatunes.mp3");
    
    myFont = loadFont('assets/ArgentPixelCF-Regular.otf');

}

// Center drawing, drawFunction will be one for default
function setup() {
    createCanvas(1200, 750);

    // Center our drawing objects
    imageMode(CENTER);
    textAlign(LEFT);
    rectMode(CENTER);
    textSize(25);
    textFont(myFont);

    // Timer  set up
    simpleTimer = new Timer(8000);

    // Button set up
    input = createInput();
    button = createButton('enter');
    button.mousePressed(inputAction);
    input.hide();
    button.hide();

    //sound set up
    playSound();

    // Set to one for startup
    drawFunction = drawOutside;
}

// Very simple, sets the background color and calls your state machine function
function draw() {
    midX = ( width / 2 )+150;
    midY = height / 2;

    mouseEasing();

    // Calls state machine function
    drawFunction();
    //drawDebugInfo();
}

//========= TEMPLATE: modify these functions, INSIDE the function blocks only =========

//-- drawOutside () will draw the image at index 0 from the array, outside of the store
drawOutside = function () {
    background("#5fa4db");

    // Occurs twice, once at thebegnning and once at the very end when all tasks are done, depending on the boolean variable
    if ( tasksDone === false ) {
        image(images[0], midX, midY);
        image(inst[0], 200, 150);
    } 
    else if ( tasksDone === true ) {
        image(images[10], midX, midY);
        image(inst[8], 200, 150);
    }
}

//-- drawRoomOne() will draw first instance of the inside of the shop, promps user to interact with the tea and boba using p and q keys
drawRoomOne = function () {
    background("#5fa4db");

    image(images[1], midX, midY);
    image(inst[1], 200, 150);
    image(inst[2], 200, 350);
}

//-- drawBobaCook() user "cooks" the boba. user can pretend to stir around the pot. Press enter to finish
drawBobaCook = function () {
    background("#5fa4db");

    // limiting spoon mixing movement depending on mouseX location
    var spoonX;
    if ( mouseX < 615 ) {
        spoonX = 615;
    } 
    else if ( mouseX > 865 ) {
        spoonX = 865;
    } 
    else {
        spoonX = mouseX;
    }

    image(images[6], midX, midY);
    image(images[8], spoonX, midY - 100);
    image(images[7], midX, midY);
    image(inst[13], 200,150);
}

//-- drawTeaSteepOne() user is timed to click all theleaves, code tracks if theuser clicked at least 5 times. if yes then user is allowed into room two, If failed then user but mouse click to try again.
drawTeaSteepOne = function () {
    background("#5fa4db");

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

    // determines what page user can go to based on number of clicks
    // if the timer has expired, if clicks 5+ then the else statement is displayed, allowing the user to move on, otherwise the timer restarts on mouse click
    if (simpleTimer.expired()) {
        if ( leafCount < 5 ) {
            image(inst[12], 200, 350);
            if ( mouseIsPressed ) {
                simpleTimer.start();
            }
        } 
        else {
            image(inst[11], 200, 350);
            if ( keyIsPressed ) {
                drawFunction = drawRoomTwo;
            }
        }
    } 
    else {
        image(inst[10], 200, 150);
    }
}

//-- drawRoomTwo() will draw 2nd instance of the inside of the shop where you have 4 tasks to complete
drawRoomTwo = function () {
    background("#5fa4db");

    image(images[2], midX, midY);
    image(inst[3], 200, 150);
    image(inst[4], 200, 350);
}

//-- drawCountMoney() user adds up all the money on screen and enters the value
drawCountMoney = function () {
    background("#5fa4db");

    countMoneyEnter = false;
    // input box to enter the number, no right or wrong answer
    input.position(50, 250);
    input.size(235);
    button.position(input.x + input.width+10, 250);

    image(images[12], midX, midY);
    image(inst[15], 200, 150);
    image(inst[14], 200, 350);
    count++;

}

//-- drawMenuBoard() user can draw on the board when mouse pressed [technically drawing in the background, as there ar rectangle overlays on top of it]
drawMenuBoard = function () {
    menuBoardEnter = false;

    if (mouseIsPressed === true){
            drawOverMe();
    }
    push();
    rectMode(CORNER);
    fill("#5fa4db")
    noStroke();
    rect(0, 0, 1200, 180);
    rect(0, 0, 450, 750);
    rect(0, 570, 1200, 180);
    rect(1050, 0, 170, 750);
    pop();

    push();
    noFill();
    stroke("#f2a654");
    strokeWeight(10);
    rect(midX,midY, 600, 400,7);
    pop();

    push();
    noFill();
    stroke("#3080c1");
    strokeWeight(4);
    rect(midX,midY, 606, 406,7);
    pop();

    image(inst[17], 200, 150);
    image(inst[14], 200, 350);
    count++;
}

//-- drawCupStack() cup follows mouse around screen
drawCupStack = function () {
    background("#5fa4db");

    cupStackEnter = false;
    image(images[13], midX, midY);
    image(images[14], a, b);
    image(inst[18], 200, 150);
    image(inst[14], 200, 350);
    count++;
}

//-- drawFillTea() user holds down mouse to "fill" tea container
drawFillTea = function () {
    background("#5fa4db");

    fillTeaEnter = false;
    noStroke();
    fill("#d89663");
    if ( mouseIsPressed === true ) {
        r = r + 4;
    }
    rect(midX, midY + 200, 200, r);

    image(images[9], midX, midY);

    fill("#5fa4db");
    rect(midX, 750, 200, 175);
    rect(midX, 0, 200,175);

    image(inst[16], 200, 150);
    image(inst[14], 200, 350);
    fill(0);
    count++;
}

//-- drawRoomThree() will draw 3rd instance of the inside of the shop where you just have to set the boba out by pressing w
drawRoomThree = function () {
    background("#5fa4db");

    image(images[3], midX, midY);

    image(inst[5], 200, 150);
    image(inst[6], 200, 350);
}

//-- drawRoomFour() will draw 4th instance of the inside of the shop where you have completed everything and are asked to flip the sign
drawRoomFour = function () {
    background("#5fa4db");

    image(images[4], midX, midY);

    image(inst[7], 200, 150);
}

//-- drawOpen() states finished, all set up and the boba shop is now open
drawOpen = function () {
    background("#5fa4db");

    image(images[5], midX, midY);

    image(inst[9], 200, 150);
}


//========= TEMPLATE: add or change interface functions, as you like =========

// allowed user todraw on the menu board state
function drawOverMe(){
    stroke(0);
    strokeWeight(3);
    frameRate(60);
    line(mouseX, mouseY, pmouseX, pmouseY);
}

// when putput submit is clicked it disappears off the page
function inputAction(){
    input.hide();
    button.hide();
}

//plays music in the backgroung
function playSound(){
    mySong.play();
    mySong.loop();
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

// Change the drawFunction variable based on your interaction
function keyTyped() {
    sound2.play();
    if ( drawFunction === drawRoomOne ) {
        if ( key === 'q' ) {
            drawFunction = drawBobaCook;
        } 
        else if ( key === 'p' ) {
            simpleTimer.start();
            drawFunction = drawTeaSteepOne
        }
    } 
    else if ( drawFunction === drawRoomTwo ) {
        if ( key === 'w' ) {
            if ( count >= 4 ){
                drawFunction = drawRoomThree;
            }
        }
    } 
    else if ( drawFunction === drawRoomThree ) {
        if ( key === 'o' ) {
            drawFunction = drawRoomFour;
        }
    }
}

function keyPressed() {
    sound2.play();
    if ( drawFunction === drawOutside ) {
        if ( keyCode === UP_ARROW ) {
            drawFunction = drawRoomOne;
        }
    } 
    else if ( drawFunction === drawBobaCook ) {
        if ( keyCode === ENTER ) {
            drawFunction = drawRoomOne;
        }
    } 
    else if ( drawFunction === drawCountMoney ) {
        if ( keyCode === BACKSPACE ) {
            drawFunction = drawRoomTwo;
        }
    } 
    else if ( drawFunction === drawMenuBoard ) {
        if ( keyCode === BACKSPACE ) {
            drawFunction = drawRoomTwo;
        }
    } 
    else if ( drawFunction === drawCupStack ) {
        if ( keyCode === BACKSPACE ) {
            drawFunction = drawRoomTwo;
        }
    } 
    else if ( drawFunction === drawFillTea ) {
        if ( keyCode === BACKSPACE ) {
            drawFunction = drawRoomTwo;
        }
    } 
    else if ( drawFunction === drawRoomTwo ) {
        if ( keyCode === ENTER ) {
            drawFunction = drawRoomThree;
        }
    } 
    else if ( drawFunction === drawRoomFour ) {
        if ( keyCode === DOWN_ARROW ) {
            tasksDone = true;
            drawFunction = drawOutside;
        }
    }
}

function mousePressed() {
    sound1.play();
    if ( drawFunction === drawTeaSteepOne ) {
        if ( mouseIsPressed = true ) {
            leafCount++;
        }
    } 
    else if ( drawFunction === drawOutside ) {
        if ( tasksDone === true ) {
            if ( mouseX > 775 && mouseX < 900 ) {
                if ( mouseY > 370 && mouseY < 550 ) {
                    drawFunction = drawOpen;
                }
            }
        }
    } 
    else if ( drawFunction === drawRoomTwo ) {
        if ( mouseX > 640 && mouseX < 770 ) { // click on cashier machine
            if ( mouseY > 450 && mouseY < 550 ) {
                if ( countMoneyEnter == true ) {
                    input.show();
                    button.show();
                    drawFunction = drawCountMoney;
                }
            }
        } 
        else if ( mouseX > 780 && mouseX < 900 ) { // click on menu board
            if ( mouseY > 175 && mouseY < 270 ) {
                if ( menuBoardEnter == true ) {
                    image(images[15], midX, midY);

                    drawFunction = drawMenuBoard;
                    
                }
            }
        } 
        else if ( mouseX > 761 && mouseX < 794 ) { // click on cups
            if ( mouseY > 270 && mouseY < 340 ) {
                if ( cupStackEnter == true ) {
                    drawFunction = drawCupStack;
                }
            }
        } 
        else if ( mouseX > 865 && mouseX < 930 ) { // fill tea
            if ( mouseY > 330 && mouseY < 415 ) {
                if ( fillTeaEnter == true ) {
                    drawFunction = drawFillTea;
                }
            }
        }
    }
}

// function drawDebugInfo() {
//     fill("red");
//     textSize(15);
//     text("x: " + mouseX + " y: " + mouseY, 100, height - 2);
//     //text("x: " + midY + " y: " + midY, midX, midY);
// }
