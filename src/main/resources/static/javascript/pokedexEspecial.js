if(document.cookie.length===0){
	$(".estrella").className = "ocultar";
	}
//Para los botones rojos y mostrar los divs
$(".primero").onclick = function() {
	$("#opcion1").className = "mostrar";
	$("#opcion2").className = "ocultar";
	this.style.opacity = "1";
	$(".segundo").style.opacity = "0.4";
}

$(".segundo").onclick = function() {
	$("#opcion1").className = "ocultar";
	$("#opcion2").className = "mostrar";
	this.style.opacity = "1";
	$(".primero").style.opacity = "0.4";
}
$("#estrella").onclick = function() {
	if(document.cookie.length>0){
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
$(".btn").onclick = function (e) {
    captarId(e);
};

