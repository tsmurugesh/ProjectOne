## Simple State Machine with Splash
#### by Tanvi Murugesh

### Overview
This is a  state machine that goes between mutiple states. It walks one through a usual opening shift at a boba shop. The base code is all from Scott Kildall's simple state machine code. 

### Technical Information
First all variables of images (for bth imagery and informational text boxes) gets loaded at startup.
The drawFunction is a variable that points to a function varible name. It is called in draw() and set to drawOutside first. Based on mouse and keyboard input, different drawFunctions will be called. Certain functions can only be acessed a single time and then the user is locked out, or once a certain goal has been met, making the experience not entirely linear. There is also a timer implemented on one of the draw pages, refrenced from the p5.timer library. 

###Adobe XD Link
https://xd.adobe.com/view/9fc1aaac-408e-4d19-9edd-bde732c70cfa-ca92/?fullscreen

