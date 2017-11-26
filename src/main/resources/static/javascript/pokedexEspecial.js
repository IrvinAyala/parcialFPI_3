//Para los botones rojos y mostrar los divs
$(".primero").onclick = function () {
    $("#opcion1").className = "opcion1 mostrar";
    $("#opcion2").className = "opcion2 ocultar";
    this.style.opacity = "1";
    $(".segundo").style.opacity = "0.4";
}

$(".segundo").onclick = function () {
    $("#opcion1").className = "opcion1 ocultar";
    $("#opcion2").className = "opcion2 mostrar";
    this.style.opacity = "1";
    $(".primero").style.opacity = "0.4";
}
$(".estrella").onclick=function(){
	this.className="estrella favSeleccionado";
	añadirFav();
}
function añadirFav(){

	xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange=function () {
      if(this.readyState===4 && this.status===200){
      var respuesta=this.responseText;
      console.log(respuesta);
  
      }  
    };
        
        xmlHttp.open("PUT","http://localhost:8080/pokedex",true);
        var idUser=document.cookie.split("=")[1];
        xmlHttp.send(idPokemon+","+idUser+","+urlPokemon);
}
function getPokemon(){
	xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange=function () {
  if(this.readyState===4 && this.status===200){
  var respuesta=JSON.parse(this.responseText);
  console.log(respuesta);
  for(var i in respuesta){
	  console.log(respuesta[i]);
	ajaxPokemonFavs(respuesta[i]);  
 
  }
  }  
};
var idUser=document.cookie.split("=")[1];
    xmlHttp.open("GET","http://localhost:8080/pokedex/favoritos/"+idUser,true);
    
    xmlHttp.send();
}
$("#boton").onclick=function(){
	getPokemon();
}
function ajaxPokemonFavs(url){
	xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange=function () {
  if(this.readyState===4 && this.status===200){
  var respuesta=JSON.parse(this.responseText);
  console.log(respuesta.name);

  }  
};
    
    xmlHttp.open("GET",url,true);
    xmlHttp.send();
}