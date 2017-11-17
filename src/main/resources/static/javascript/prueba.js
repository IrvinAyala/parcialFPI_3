//ID del pokemon
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
var urlEvolucion1;
var urlEvolucion2;
var urlEvolucion3;

//Para las evoluciones
aEvoluciones = [];
iContador = 0;

function $(query) {
    return document.querySelector(query);
}

document.getElementById("btnBuscar").onclick = function () {
    console.log("Alerta0");
    idPokemon = $("#idPokemon").value;
    cargarDatos();
};

function cargarDatos() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Alerta1");
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
            console.log("Alerta1");
            especie = JSON.parse(this.responseText);
            console.log(especie);
            var url2 = especie.evolution_chain.url;
            console.log(url2);
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
            console.log("Alerta1");
            evolucion = JSON.parse(this.responseText);
            console.log(evolucion);
            mostrar();
        }
    };
    xhttp.open("GET", url2, true);
    xhttp.send();
}


function mostrar() {

    console.log("Alerta2");
//    Para el nombre del pokemon
    $("#name").innerHTML = pokemon.name;

//    Para la imagen del pokemon
    $("#image").src = pokemon.sprites.front_default;

//    Para las habilidades
    for (var i = 0; i < pokemon.abilities.length; i++) {
        aAbities[i] = pokemon.abilities[i].ability.name + "<br>";
        $("#ability").innerHTML += aAbities[i];
    }

//    Para los movimientos
    for (var i = 0; i < pokemon.moves.length; i++) {
        aMovs[i] = pokemon.moves[i].move.name + "<br>";
        document.getElementById("move").innerHTML += aMovs[i];
    }

//    Para los tipos
    for (var i = 0; i < pokemon.types.length; i++) {
        aTypes[i] = pokemon.types[i].type.name + "<br>";
        $("#type").innerHTML += aTypes[i];
    }

//    Para el habitat
    if (especie.habitat != null && especie.habitat != "undefined") {
        $("#specie").innerHTML = especie.habitat.name;
    } else
    {
        $("#specie").innerHTML = "Desconocido";
    }

//    Para la generacion
    $("#generacion").innerHTML = especie.generation.name;

//    Para la evolucion 1
    $("#evolucion1").innerHTML = evolucion.chain.species.name;
    aEvoluciones[0] = evolucion.chain.species.url.slice(42, -1);
    iContador = 1;
    console.log("urlEvolucion 1:  " + aEvoluciones[0]);


//    Para la evolucion 2
    if (evolucion.chain.evolves_to[0] != null && evolucion.chain.evolves_to[0] != undefined) {
        for (var i = 0; i < evolucion.chain.evolves_to.length; i++) {
            $("#evolucion2").innerHTML += evolucion.chain.evolves_to[i].species.name + "<br>";
            aEvoluciones[iContador] = evolucion.chain.evolves_to[i].species.url.slice(42, -1);
            console.log("urlEvolucion " + iContador + ":  " + aEvoluciones[iContador]);
            iContador = iContador + 1;
        }

    } else {
        $("#evolucion2").innerHTML = "Desconocido";
    }

//    Para la evolucion 3
    if ((evolucion.chain.evolves_to[0] != null && evolucion.chain.evolves_to[0] != undefined) && (evolucion.chain.evolves_to[0].evolves_to[0] != null && evolucion.chain.evolves_to[0].evolves_to[0] != undefined)) {
        for (var i = 0; i < evolucion.chain.evolves_to.length; i++) {
            for (var j = 0; j < evolucion.chain.evolves_to[i].evolves_to.length; j++) {
                $("#evolucion3").innerHTML += evolucion.chain.evolves_to[i].evolves_to[j].species.name+ "<br>";
                aEvoluciones[iContador] = evolucion.chain.evolves_to[i].evolves_to[j].species.url.slice(42, -1);
                console.log("urlEvolucion " + iContador + ":  " + aEvoluciones[iContador]);
                iContador = iContador + 1;
            }
        }
    } else {
        $("#evolucion3").innerHTML = "Desconocido";
    }




}