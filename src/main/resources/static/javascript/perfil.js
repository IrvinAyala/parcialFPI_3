var pokemonFavorito;

//Para los JSON de las evoluciones

function actualizarFavoritos(){
////document.getElementById("btnCargarFavoritos").onclick = function (e) {
////        e.preventDefault();
//    console.log("entra 0");
    getPokemon();
}


function devolverFavoritos(idFavorito,ruta,nombre) {
 
            var contenido = `<div id="favorito">
                                    <div id="imagen-favorito">
                                        <img src="${ruta}" alt="imagen" id="imagen">
                                    </div>
                                    <div id="contenidoFavorito">${nombre}</div>
                                </div>`;
            var node = document.createElement("a");
            node.id = "enlaceFavorito";
            node.innerHTML = contenido;

            node.setAttribute("href", "pokedex.html?idPokemon=" + idFavorito);
            $("#contenedorFavoritos").appendChild(node);
//            console.log("entro 2");
        }
    


function getPokemon(){
	xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange=function () {
  if(this.readyState===4 && this.status===200){
  var respuesta=JSON.parse(this.responseText);
  
  for(var i in respuesta){
	ajaxPokemonFavs(respuesta[i]);  
 
  }
  }  
};
var idUser=document.cookie.split("=")[1];
    xmlHttp.open("GET","http://localhost:8080/pokedex/favoritos/"+idUser,true);
    
    xmlHttp.send();
}

function ajaxPokemonFavs(id){
	xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange=function () {
  if(this.readyState===4 && this.status===200){
  var respuesta=JSON.parse(this.responseText);
  devolverFavoritos(id, respuesta.sprites.front_default, respuesta.name);
  }  
};
    
    xmlHttp.open("GET","https://pokeapi.co/api/v2/pokemon/"+id,true);
    xmlHttp.send();
}

