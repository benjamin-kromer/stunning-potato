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
