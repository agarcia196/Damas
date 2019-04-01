var ws ;

function StartGame(){
    Conectar();
}

function Conectar(){
    ws= new WebSocket("ws://127.0.0.1:8080");    
/*
 * La WebSocket.onopenpropiedad es una EventHandlerque se llama cuando la WebSocketconexión readyStatecambia a  OPEN;
 *  esto indica que la conexión está lista para enviar y recibir datos
 *  */
ws.onopen = function() {
    var nick= $("#Nickname").val();
   $("#game").html('<div class="row">'+
              '<div class="col-lg-12">'+
              '<h4>Status conexión <i id="conex"style="vertical-align: middle;margin-bottom: 4px; color:green;" class="material-icons">check_circle</i></h4>'+
            '</div> </div>'+
        '<div class="row">'+
                        '<div class="col-lg-12">'+
                         '<div class="form-group">'+
                        '<label for="Nickname">Nickname</label>'+
                        '<h4 id="nick">'+nick+'</h4>'+
                      '</div>');
};


//La WebSocket.onmessage propiedad es una EventHandlerque se llama cuando se recibe un mensaje del servidor. 
ws.onmessage = function (evt) {

    var msj=evt.data.split(";");
    switch (msj[0]) {
  case "nf":
    console.log(msj[1]);
    break;
    case "fid":
    loadgame(msj[1]);
    break;
  case "chat":
  msj[0]=msj[1];
    msj[1]=msj[2];
       Chat(msj);
    break;
  case "success":
     Notif(msj[0],msj[1]);
  break;
   case "info":
     Notif(msj[0],msj[1]);
  break;
  case "error":
     Notif(msj[0],msj[1]);
  break;
  default:
    console.log(msj);
}

};
//La WebSocket.onclosepropiedad es una  EventHandlerque se llama cuando la conexión de WebSocket readyStatecambia  CLOSED. 
ws.onclose = function() {
      
       $("#game").html(  '<div class="row">'+
              '<div class="col-lg-12">'+
              '<h4>Status conexión <i id="conex" style="vertical-align: middle;margin-bottom: 4px;color:red" class="material-icons">remove_circle</i></h4>'+
            '</div> </div>'+
                    '<div class="row">'+
                        '<div class="col-lg-12">'+
                         '<div class="form-group">'+
                        '<label for="Nickname">Nickname</label>'+
                       '<input type="text" class="form-control" id="Nickname" placeholder="Nero96">'+
                      '</div></div></div>'+
                    '<div class="row">'+
                    '<div class="col-lg-12"> <br/>'+             
                    '<button class="btn btn-primary btn-block" onclick="Conectar()">Iniciar Juego</button>'+
                   '</div></div>');
}; 

//La propiedad del controlador de eventos de WebSocketla interfaz onerrores una función que se llama cuando se produce un error en el WebSocket.
ws.onerror = function(err) {
    alert("Error: " + err);
};
}
function Chat(mensaje){
    console.log(mensaje);
     $("#ChatBox").append('<li>'+
                '<div class="commenterImage">'+
                  '<img src="http://placekitten.com/50/50" />'+
                '</div>'+
                '<div class="commentText">'+
                    '<strong>'+mensaje[0]+'</strong>'+
                    '<p class="">'+mensaje[1]+'</p> <span class="date sub-text">'+Date()+' </span>'+
                '</div>'+
            '</li>');
}
function Enviar(){
    var msj=$("#Message").val();
    var n=$("#nick").text();
    mensaje=n+';'+msj;
    ws.send("chat;"+mensaje);
     Chat(mensaje.split(';'));
    $("#Message").val("");
}
function Notif(t,mensaje){
switch (t) {
  case "error":
   $("#alertN").removeClass("alert-success alert-info", 1000, "easeOutBounce").addClass( "alert alert-danger", 1000, "easeOutBounce" );
   $("#alertN").html('<strong id="Talert">Alert! </strong><code id="Balert">'+
     mensaje+'</code>');
    $("#alertN").show().delay(4000).fadeOut();
    break;
  case "success":
    $("#alertN").removeClass("alert-danger alert-info", 1000, "easeOutBounce").addClass( "alert alert-success", 1000, "easeOutBounce" );
    $("#alertN").html('<strong id="Talert">Success! </strong><code id="Balert">'+
     mensaje+'</code>');
    $("#alertN").show().delay(4000).fadeOut();
    break;
 case "info":
    $("#alertN").removeClass("alert-danger alert-success ", 1000, "easeOutBounce").addClass( "alert alert-info", 1000, "easeOutBounce" );
    $("#alertN").html('<strong id="Talert">Info! </strong><code id="Balert">'+
     mensaje+'</code>');
    $("#alertN").show().delay(4000).fadeOut();
    break;
  default:
    console.log('default');
    }
}
function Salir(){
    alert("Salir!");
	ws.onopen = function() {
	
	    ws.close();
	};
}
