// Para los efectos 

function slideUpIn() {
    $(".login").velocity("transition.slideUpIn", 1250)
}
;

function slideLeftIn() {
    $(".row").delay(500).velocity("transition.slideLeftIn", {stagger: 500})
}

function shake() {
    $(".password-row").velocity("callout.shake");
}

slideUpIn();
slideLeftIn();
document.getElementsByClassName("call-to-action").onclick = function () {
    shake();
};



