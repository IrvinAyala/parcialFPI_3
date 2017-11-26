$("#registro-form").onsubmit=function(e){
	
	e.preventDefault();
	registro(this);
	
};
$("#username_input").onkeypress=function(){
	if($(".mensajeCorreo").className!=="mensajeCorreo ocultar")
	$(".mensajeCorreo").className="mensajeCorreo ocultar";
}


function registro(form){

	xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange=function () {
      if(this.readyState===4 && this.status===200){
      var respuesta=this.responseText;
  	if(respuesta==="exist"){
  		$(".mensajeCorreo").className="mensajeCorreo mostrar";
  		$("#username_input").focus();
  	}
  	if(respuesta==="href"){
  		alert(document.cookie);
  		location.href="inicio.html";
  	}
      }  
    };
        
        xmlHttp.open("POST","http://localhost:8080/pokedex",true);
        xmlHttp.send(new FormData(form));
}

