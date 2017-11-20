function $(query) {
	return document.querySelector(query);
}
$("#login-registro").onsubmit=function (e) {
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
        httpRequest.open("POST","http://localhost:8080/pokedex",true);
        httpRequest.send(new FormData(form));
}