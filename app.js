var express = require('express');
var app     = express();

//code smell
var app;
var app;
var app;



//major and bug
let target =-5;
let num = 3;
target =- num;
target =+ num;

//minor 
var i;
for (i = 0; i < 10; i++) {
    if (i == 5) {
      continue;  /* Noncompliant */
    }
  }

//critical and  vulnerability
var i;
var j;
for (i = 0; i < 10; j++) {  
  i++;
}

//blocker
function foo(a) { 
  let b = 12;
  if (a) {
    return b;
  }
  return b;
}


//critical
if (x == 0) {
  doSomething();
} else if (x == 1) {
  doSomethingElse();
}

//minor
var b;
var c;
var a1 = b + c; // This is a trailing comment that can be very very long


//info
function doSomething() {
  // TODO
}

//blocker 
var x = 1;
function fun(){
  //alert(x); 
  if(x) {
    var x = 42; 
  }
}

fun(); 
app.get("/", function(req, res) {
  res.send("Hello World");
});

app.listen(3000);
