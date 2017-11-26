var pokemonFavorito;

//Para los JSON de las evoluciones

function actualizarFavoritos(){
////document.getElementById("btnCargarFavoritos").onclick = function (e) {
////        e.preventDefault();
//    console.log("entra 0");
    for (var i = 1; i < 11; i++) {
//        e.preventDefault();
        devolverFavoritos(i);

    }
}


function devolverFavoritos(idFavorito) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            pokemonFavorito = JSON.parse(this.responseText);
            var ruta = pokemonFavorito.sprites.front_default;


            var contenido = `<div id="favorito">
                                    <div id="imagen-favorito">
                                        <img src="${ruta}" alt="imagen" id="imagen">
                                    </div>
                                    <div id="contenidoFavorito">${pokemonFavorito.name}</div>
                                </div>`;
            var node = document.createElement("a");
            node.id = "enlaceFavorito";
            node.innerHTML = contenido;

            node.setAttribute("href", "pokedex.html?idPokemon=" + idFavorito);
            $("#contenedorFavoritos").appendChild(node);
//            console.log("entro 2");
        }
    };
    xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/" + idFavorito + "/", true);
    xhttp.send();
}

