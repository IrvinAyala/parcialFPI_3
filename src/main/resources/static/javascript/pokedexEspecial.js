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