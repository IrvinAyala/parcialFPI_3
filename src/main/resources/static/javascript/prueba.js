////ID del pokemon
var idPokemon;

//Estos son para los JSON
var pokemon;
var especie;
var evolucion;

//Array para los datos
var aAbities = [];
var aMovs = [];
var aTypes = [];

//Para guardar las url de las evoluciones
//var urlEvolucion1;
//var urlEvolucion2;
//var urlEvolucion3;

//Para las evoluciones
var aEvoluciones = [];
var iContador = 0;

function $(query) {
    return document.querySelector(query);
}
$(".btn").onclick = function (e) {
	captarId(e);
};
function captarId(e) {
	var pokemonSelecionado = $(".form-control").value;
    var nombresPokemon = document.getElementsByName(pokemonSelecionado);
    var pokemonABuscar = parseInt(nombresPokemon[0].getAttribute("id"));

    idPokemon = pokemonABuscar;
    e.preventDefault();
    cargarDatos();
}

function limpiar() {

	$("#divTipos").innerHTML="";
	$("#divOtrosMovs").innerHTML="";
	$("#moves").innerHTML="";
}


function LlenarConEnter(e) {
    if (e.keyCode == 13) {
       captarId(e);
    }
}
function cargarDatos() {
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
            console.log("espeecie");
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
            console.log("evolucion");
            mostrar();
        }
    };
    xhttp.open("GET", url2, true);
    xhttp.send();
}


function mostrar() {

	
limpiar();

//    Para el nombre del pokemon
    $("#titulo").innerHTML =idPokemon+" - "+pokemon.name;

    //    Para el peso del pokemon
    $("#peso span").innerHTML = pokemon.weight/10+"kg";

//    Para la altura del pokemon
    $("#altura span").innerHTML = pokemon.height/10+"m";

//    Para la descripcion del pokemon
    for (var i = 0; i < especie.flavor_text_entries.length; i++) {
        if (especie.flavor_text_entries[i].language.name == "es") {
            $("#descripcion").innerHTML = especie.flavor_text_entries[i].flavor_text;
            break;
        }
    }


//    Para la imagen del pokemon
    $("#pokemonImage img").src = pokemon.sprites.front_default;

//    Para las habilidades
    for (var i = 0; i < pokemon.abilities.length; i++) {
        var nombreHabilidad=pokemon.abilities[i].ability.name;
        generarElemento("#moves", nombreHabilidad, "div","moves");
    }

//    Para los movimientos
    for (var i = 0; i < 4; i++) {
        var nombreMovimiento = pokemon.moves[i].move.name;
       generarElemento("#divOtrosMovs", nombreMovimiento, "div","moves");
    }

//    Para los tipos
    for (var i = 0; i < pokemon.types.length; i++) {
        var tipo = pokemon.types[i].type.name;
        generarElemento("#divTipos", tipo, "span", "tipo"+(i+1))
        
    }
    

//    Para el habitat
    if (especie.habitat != null && especie.habitat != "undefined") {
        $("#habitat").innerHTML = especie.habitat.name;
    } else
    {
        $("#habitat").innerHTML = "Unknown";
    }

//    Para la generacion
//    $("#generacion").innerHTML = especie.generation.name;

//    Para la evolucion 1

//    $("#evolucion1").innerHTML = evolucion.chain.species.name;
//    aEvoluciones[0] = evolucion.chain.species.url.slice(42, -1);
//    iContador = 1;
//    console.log("urlEvolucion 1:  " + aEvoluciones[0]);



//    Para la evolucion 2
//    if (evolucion.chain.evolves_to[0] != null && evolucion.chain.evolves_to[0] != undefined) {
//        for (var i = 0; i < evolucion.chain.evolves_to.length; i++) {
//            $("#evolucion2").innerHTML += evolucion.chain.evolves_to[i].species.name + "<br>";
//            aEvoluciones[iContador] = evolucion.chain.evolves_to[i].species.url.slice(42, -1);
//            console.log("urlEvolucion " + iContador + ":  " + aEvoluciones[iContador]);
//            iContador = iContador + 1;
//        }
//
//    } else {
//        $("#evolucion2").innerHTML = "Desconocido";
//    }
//
////    Para la evolucion 3
//    if ((evolucion.chain.evolves_to[0] != null && evolucion.chain.evolves_to[0] != undefined) && (evolucion.chain.evolves_to[0].evolves_to[0] != null && evolucion.chain.evolves_to[0].evolves_to[0] != undefined)) {
//        for (var i = 0; i < evolucion.chain.evolves_to.length; i++) {
//            for (var j = 0; j < evolucion.chain.evolves_to[i].evolves_to.length; j++) {
//                $("#evolucion3").innerHTML += evolucion.chain.evolves_to[i].evolves_to[j].species.name+ "<br>";
//                aEvoluciones[iContador] = evolucion.chain.evolves_to[i].evolves_to[j].species.url.slice(42, -1);
//                console.log("urlEvolucion " + iContador + ":  " + aEvoluciones[iContador]);
//                iContador = iContador + 1;
//            }
//        }
//    } else {
//        $("#evolucion3").innerHTML = "Desconocido";
//    }
}

//    Para la evolucion 3
//    if ((evolucion.chain.evolves_to[0] != null && evolucion.chain.evolves_to[0] != undefined) && (evolucion.chain.evolves_to[0].evolves_to[0] != null && evolucion.chain.evolves_to[0].evolves_to[0] != undefined)) {
//        for (var i = 0; i < evolucion.chain.evolves_to.length; i++) {
//            for (var j = 0; j < evolucion.chain.evolves_to[i].evolves_to.length; j++) {
//                $("#evolucion3").innerHTML += evolucion.chain.evolves_to[i].evolves_to[j].species.name + "<br>";
//                aEvoluciones[iContador] = evolucion.chain.evolves_to[i].evolves_to[j].species.url.slice(42, -1);
//                console.log("urlEvolucion " + iContador + ":  " + aEvoluciones[iContador]);
//                iContador = iContador + 1;
//            }
//        }
//    } else {
//        $("#evolucion3").innerHTML = "Desconocido";
//    }


$(".primero").onclick=function(){
	$("#opcion1").className="opcion1 mostrar";
	$("#opcion2").className="opcion2 ocultar";
	this.style.opacity="1";
	$(".segundo").style.opacity="0.4";
}
$(".segundo").onclick=function(){
	$("#opcion1").className="opcion1 ocultar";
	$("#opcion2").className="opcion2 mostrar";
	this.style.opacity="1";
	$(".primero").style.opacity="0.4";
}
function generarElemento(identificador,texto,elemento,formato) {
    var elemento=document.createElement(elemento);
    var textoElemento=document.createTextNode(texto);
    elemento.appendChild(textoElemento);
    elemento.className=formato;
    $(identificador).appendChild(elemento);
    console.log(elemento);

}
//Para el autocompletado
window.onload = function () {
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

