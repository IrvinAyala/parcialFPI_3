// Para los efectos 

function slideUpIn() {
    $("#login").velocity("transition.slideUpIn", 1250)
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
$("button").on("click", function () {
    shake();
});
function $(query) {
	return document.querySelector(query);
}

$(".login-form").onsubmit=function (e) {
    e.preventDefault();
    registro(this);
};
function registro(form) {
	var httpRequest=new XMLHttpRequest();
        httpRequest.onreadystatechange=function (){
        if(this.readyState===4&&this.status===200){
            var texto=httpRequest.responseText;
            console.log(texto);
        }    
        };
        httpRequest.open("GET","http://localhost:8080/pokedex",true);
        httpRequest.send(new FormData(form));
}

//Para lo demas