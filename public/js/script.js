console.log("script loaded")
const line1 = document.querySelector('p.line-1');
const line2 = document.querySelector('p.line-2');

setTimeout(()=>{
        line2.style.visibility = "visible";
        line1.classList.remove("anim-typewriter");
        line1.style.borderRight = "hidden";
},5000)

$( document ).ready(function() {
    console.log( "jQuery loaded!" );
});

$('#facebook-icon').on("click", function () {
    console.log("mouse clicked")
});
// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}