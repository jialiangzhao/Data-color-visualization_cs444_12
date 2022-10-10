// 
// a12.js
// Class CSC444 Assignment 12
// jialiangzhao <jialiangzhao@email.arizona.edu>
//
//This code has four parts, and he can get the color 
//through data. After getting the angle that needs to be rotated 
//through data, finally we get the result we need by combining the two.
// This file provides a template skeleton for visualization vector
// fields using color mapping and glyphs
//
//

////////////////////////////////////////////////////////////////////////
// Global variables, preliminaries

let svgSize = 510;
let bands = 50;

let xScale = d3.scaleLinear().domain([0,bands]).range([5, svgSize-5]);
let yScale = d3.scaleLinear().domain([0,bands]).range([svgSize-5, 5]);

function createSvg(sel)
{
  return sel
    .append("svg")
    .attr("width", svgSize)
    .attr("height", svgSize);
}

function createGroups(data) {
  return function(sel) {
    return sel
      .append("g")
      .selectAll("*")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", function(d) {
        return "translate(" + xScale(d.Col) + "," + yScale(d.Row) + ") scale(1, -1)";
      });
  };
}

d3.selection.prototype.callReturn = function(callable)
{
  return callable(this);
};

////////////////////////////////////////////////////////////////////////
// PART 1

let magColor = d3.select("#plot-color")
        .callReturn(createSvg)
        .callReturn(createGroups(data));

// This is a trigonometric function formula. 
//Used to find the third side.
function length(x,y){
  return Math.sqrt((x*x)+(y*y));
}

//We create a scale to calculate where he is in the color.
colorScale = d3.scaleSequential(d3.interpolateBuPu).domain([2,0]);
magColor.append("rect")
.attr("width",10)
.attr("height",10)
.attr("fill",function(d){
  return colorScale(length(d.vx,d.vy));
});

////////////////////////////////////////////////////////////////////////
// PART 2

let lineGlyph = d3.select("#plot-line")
        .callReturn(createSvg)
        .callReturn(createGroups(data));

//We can calculate the length of a line to reach the 
//vertex through the formula.
lineGlyph.append("line")
// WRITE THIS PART
.attr("x1",function(d){ return d.vx*5/length(d.vx,d.vy)})
.attr("y1",function(d){ return d.vy*5/length(d.vx,d.vy)})
.attr("x2",function(d){ return -d.vx*5/length(d.vx,d.vy)})
.attr("y2",function(d){ return -d.vy*5/length(d.vx,d.vy)})
.attr("stroke","black");

////////////////////////////////////////////////////////////////////////
// PART 3

let uniformGlyph = d3.select("#plot-uniform")
        .callReturn(createSvg)
        .callReturn(createGroups(data));

//This formula will calculate the angle of code rotation.
function calcAngleDegrees(x, y) {
  return Math.atan2(y, x) * 180 / Math.PI;
  }

//We create some arrows and rotate them to a certain angle.
uniformGlyph.append("g")
  .attr("transform", function(d) {
    // WRITE THIS PART
    return "rotate("+calcAngleDegrees(d.vx, d.vy)+" 5 5"+")";
})
.append("path")
  .attr("d",function(d){
    return "M5 5 "+(5+length(d.vx,d.vy)*10)+" 5"
    +"L"+(3+length(d.vx,d.vy)*10)+" 6"+"V 4 "
    +"L"+(6+length(d.vx,d.vy)*10)+" 5";
  })
  .attr("stroke","black")
  .attr("fill","transparent");
  
  // WRITE THIS PART

////////////////////////////////////////////////////////////////////////
// PART 4

let randomGlyph = d3.select("#plot-random")
        .callReturn(createSvg)
        .callReturn(createGroups(data));

//In this part, I like to use the same color as before.
//Then change the arrow to a triangle
randomGlyph.append("g")
  .attr("transform", function(d) {
    // WRITE THIS PART
    return "rotate("+calcAngleDegrees(d.vx, d.vy)+" 5 5"+")";
  }).append("path")
  .attr("id","thePath")
  .attr("d",function(d){
    return "M5 7 "+(5+length(d.vx,d.vy)*15)+" 5"
    +"L5 3"+"V 6"
    ;
  })
  .attr("fill",function(d){
    return colorScale(length(d.vx,d.vy));
  })
  .attr("transform", function(d) {
    return "translate("+Math.random() * 10+" "+Math.random() * 10+")";
  });

//Create a button detail. And initially 
//set the button function.
var buttonList = [{
id: "abutton",
 text: "move",
click: function() { 

randomGlyph.selectAll("#thePath")
.attr("transform", function(d) {
  return "translate("+Math.random() * 10+" "+Math.random() * 10+")";
});

}}]

//This variable is the open state and 
//closed state of the control button. 
//Also modify the button name.
let text1="move";

//This part is the steps to implement the button. 
//It can keep looping after pressing.
d3.select("#controls")
.selectAll("button")
.data(buttonList)
.enter()
.append("button")
.attr("id", function(d) { return d.id; })
.text(function(d) { return d.text; })
.on("click", function(event, d) {
  if(text1=="move"){
    text1="stop";
  }else{text1="move"}
  d3.select("#abutton").text(text1);
  window.setInterval(function(){
    if(text1=="stop"){
    d.click()}
  
  
  },20)
 
});



