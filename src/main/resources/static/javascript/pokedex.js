////ID del pokemon
var idPokemon;

//Estos son para los JSON
var pokemon;
var especie;
var evolucion;
var pokemonEvolucion

//Array para los datos
var aAbities = [];
var aMovs = [];
var aTypes = [];

//Para las evoluciones
var aEvoluciones = [];
var iContador = 0;

function $(query) {
    return document.querySelector(query);
}

$(".btn").onclick = function (e) {
//    location.href = "pokedex.html";
    captarId(e);

};

function captarId(e) {

    var pokemonSelecionado = $(".form-control").value;
    var nombresPokemon = document.getElementsByName(pokemonSelecionado);
    var pokemonABuscar = parseInt(nombresPokemon[0].getAttribute("id"));

    idPokemon = pokemonABuscar;
    location.href = "pokedex.html?id=" + idPokemon;

    $("#contenedorModal").className = "mostrar";

    e.preventDefault();
    cargarDatos();
}

function limpiar() {
    $("#contenedorEvoluciones").innerHTML = "";
    $("#divTipos").innerHTML = "";
    $("#divOtrosMovs").innerHTML = "";
    $("#moves").innerHTML = "";
}


function LlenarConEnter(e) {
    if (e.keyCode == 13) {

        e.preventDefault();
        captarId(e);
    }
}

function cargarDatos() {
    $("#contenedorModal").className = "mostrar";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("JSON pokemons");
            pokemon = JSON.parse(this.responseText);
            console.log(pokemon);
            var url = pokemon.species.url;
            cargarEspecie(url);
        }
    };
    xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/" + idPokemon + "/", true);
    xhttp.send();
}

function cargarEspecie(url) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("JSON especies");
            especie = JSON.parse(this.responseText);
            console.log(especie);
            var url2 = especie.evolution_chain.url;
            cargarEvoluciones(url2);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function cargarEvoluciones(url2) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("JSON evoluciones");
            evolucion = JSON.parse(this.responseText);
            console.log(evolucion);
            mostrar();
        }
    };
    xhttp.open("GET", url2, true);
    xhttp.send();
}


function mostrar() {

    limpiar();

    $("#contenedorModal").className = "ocultar";


//    Para el nombre del pokemon
    $("#titulo").innerHTML = idPokemon + " - " + pokemon.name;

//    Para el peso del pokemon
    $("#peso span").innerHTML = pokemon.weight / 10 + "kg";

//    Para la altura del pokemon
    $("#altura span").innerHTML = pokemon.height / 10 + "m";

//    Para la descripcion del pokemon
    for (var i = 0; i < especie.flavor_text_entries.length; i++) {
        if (especie.flavor_text_entries[i].language.name == "en") {
            $("#descripcion").innerHTML = especie.flavor_text_entries[i].flavor_text;
            break;
        }
    }

//    Para la imagen del pokemon
    $("#pokemonImage img").src = pokemon.sprites.front_default;

//    Para las habilidades
    for (var i = 0; i < pokemon.abilities.length; i++) {
        var nombreHabilidad = pokemon.abilities[i].ability.name;
        generarElemento("#moves", nombreHabilidad, "div", "moves");
    }

//    Para los movimientos
    for (var i = 0; i < 4; i++) {
        var nombreMovimiento = pokemon.moves[i].move.name;
        generarElemento("#divOtrosMovs", nombreMovimiento, "div", "moves");
    }

//    Para los tipos
    for (var i = 0; i < pokemon.types.length; i++) {
        var tipo = pokemon.types[i].type.name;
        generarElemento("#divTipos", tipo, "span", "tipo" + (i + 1))
    }

//    Para el habitat
    if (especie.habitat != null && especie.habitat != "undefined") {
        $("#habitat").innerHTML = especie.habitat.name;
    } else
    {
        $("#habitat").innerHTML = "Desconocido";
    }

//    Para la generacion
//    $("#generacion").innerHTML = especie.generation.name;

//Para los JSON de las evoluciones
    function devolverEvolucion(idEvolucion) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                pokemonEvolucion = JSON.parse(this.responseText);
                var ruta = pokemonEvolucion.sprites.front_default;

                var contenido = `<div id="evolucion">
                                    <div id="imagen-evolucion">
                                        <img src="${ruta}" alt="hola" id="imagen">
                                    </div>
                                    <div id="contenidoEvolucion">${pokemonEvolucion.name}</div>
                                </div>`;
                var node = document.createElement("a");
                node.id = "enlaceEvolucion";
                node.innerHTML = contenido;

                node.setAttribute("href", "pokedex.html?idPokemon=" + idEvolucion);
                $("#contenedorEvoluciones").appendChild(node);
            }
        };
        xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/" + idEvolucion + "/", true);
        xhttp.send();
    }


//    Para la evolucion 1
    aEvoluciones[0] = evolucion.chain.species.url.slice(42, -1);
    if (aEvoluciones[0] != pokemon.id) {
        devolverEvolucion(aEvoluciones[0]);
    }
    console.log("urlEvolucion 0:  " + aEvoluciones[0]);
    iContador = iContador + 1;

//    Para la evolucion 2
    if (evolucion.chain.evolves_to[0] != null && evolucion.chain.evolves_to[0] != undefined) {
        for (var i = 0; i < evolucion.chain.evolves_to.length; i++) {
//            $("#evolucion2").innerHTML += evolucion.chain.evolves_to[i].species.name + "<br>";
            aEvoluciones[iContador] = evolucion.chain.evolves_to[i].species.url.slice(42, -1);
            if (aEvoluciones[iContador] != pokemon.id) {
                devolverEvolucion(aEvoluciones[iContador]);
            }
            console.log("urlEvolucion " + iContador + ":  " + aEvoluciones[iContador]);
            iContador = iContador + 1;


            //    Para la evolucion 3
            if ((evolucion.chain.evolves_to[0].evolves_to[0] != null && evolucion.chain.evolves_to[0].evolves_to[0] != undefined)) {
                for (var j = 0; j < evolucion.chain.evolves_to[i].evolves_to.length; j++) {
//                $("#evolucion3").innerHTML += evolucion.chain.evolves_to[i].evolves_to[j].species.name + "<br>";
                    aEvoluciones[iContador] = evolucion.chain.evolves_to[i].evolves_to[j].species.url.slice(42, -1);
                    if (aEvoluciones[iContador] != pokemon.id) {
                        devolverEvolucion(aEvoluciones[iContador]);
                    }
                    console.log("urlEvolucion " + iContador + ":  " + aEvoluciones[iContador]);
                    iContador = iContador + 1;

                    ///////////////////// PARA LAS EVOLUCIONES ESPECIALES //////////////////////////////////
                    if (evolucion.chain.evolves_to[i].evolves_to[j].evolves_to.length != null && evolucion.chain.evolves_to[i].evolves_to[j].evolves_to != undefined) {
                        for (var k = 0; k < evolucion.chain.evolves_to[i].evolves_to[j].evolves_to.length; k++) {

                            aEvoluciones[iContador] = evolucion.chain.evolves_to[i].evolves_to[j].evolves_to[k].species.url.slice(42, -1);
                            if (aEvoluciones[iContador] != pokemon.id) {
                                devolverEvolucion(aEvoluciones[iContador]);
                            }
                            console.log("urlEvolucion " + iContador + ":  " + aEvoluciones[iContador]);
                            iContador = iContador + 1;
                        }
                    }
                }
            }
        }
    }



}


//Para las habilidades, movimientos y typos
function generarElemento(identificador, texto, elemento, formato) {
    var elemento = document.createElement(elemento);
    var textoElemento = document.createTextNode(texto);
    elemento.appendChild(textoElemento);
    elemento.className = formato;
    $(identificador).appendChild(elemento);
}


//Para el autocompletado
window.onload = function () {
    idPokemon = parseFloat(location.href.split("=")[1]);
    if (idPokemon > 0) {

        cargarDatos();
    }

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var objJSON = JSON.parse(this.responseText);
            console.log(objJSON);
            var listComplete = new Array();
            console.log(objJSON.results[4].name);
            for (i = 0; i < 802; i++) {
                listComplete[i] = String(objJSON.results[i].name);
            }
            console.log(listComplete);
            creadorAutocomplete(listComplete);
        }
    };
    xmlhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/?limit=802", true);
    xmlhttp.send();
}

function creadorAutocomplete(listComplete) {
    for (i = 0; i < 802; i++) {
        var node = document.createElement("OPTION");
        var textnode = document.createTextNode(listComplete[i]);
        node.appendChild(textnode);
        node.setAttribute("id", (i + 1));
        node.setAttribute("name", listComplete[i]);
        $("#lista").appendChild(node);
    }
}




