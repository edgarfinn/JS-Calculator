
// const dickhead = document.getElementById('cunt');
/*jslint browser:true */
const outline = document.createElement('div');
outline.id = "outline";
outline.style.border = "3px solid black";

document.body.appendChild(outline);

var keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', 'x', '/', '='];

keys.forEach(function(e){
  let butt = document.createElement('button');
  butt.innerHTML = e.toString();
  butt.id = e.toString();
  outline.appendChild(butt);
});

const buttons = outline.childNodes;
