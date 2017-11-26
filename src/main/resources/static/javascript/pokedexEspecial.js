//Para los botones rojos y mostrar los divs
$(".primero").onclick = function() {
	$("#opcion1").className = "opcion1 mostrar";
	$("#opcion2").className = "opcion2 ocultar";
	this.style.opacity = "1";
	$(".segundo").style.opacity = "0.4";
}

$(".segundo").onclick = function() {
	$("#opcion1").className = "opcion1 ocultar";
	$("#opcion2").className = "opcion2 mostrar";
	this.style.opacity = "1";
	$(".primero").style.opacity = "0.4";
}
$(".estrella").onclick = function() {
	if(document.cookie.lenght>0){
	this.className = "estrella favSeleccionado";
	añadirFav();
	}
}
function añadirFav() {

	xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			var respuesta = this.responseText;
		}
	};
	xmlHttp.open("PUT", "http://localhost:8080/pokedex", true);
	var idUser = document.cookie.split("=")[1];
	xmlHttp.send(idPokemon + "," + idUser + "," + urlPokemon);
}
setInterval(function(){
	console.log(document.cookie);
	if(document.cookie.length===0){
		location.href="inicio.html";
	}
},100);
// setInterval(function(){
// console.log(document.cookie);
// },100);
