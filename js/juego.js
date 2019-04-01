		var turnoBlancas = true;
		var yaComio = false;
		var puedeComer = false;
		var idt;
$(document).ready(function() {
		createTable();	

});
function createTable(){
	for(i = 0; i< 8; i++) {
		x = (i % 2 == 0) ? 1 : 0;
		$("#contenedor").append("<div id=row-" + i + " class='row'></div>");
		for(j = 0; j< 8; j++) {
			if(j % 2 == x) {
				col_id = 'row-' + i + '-col-' + j;
				$("#row-" + i).append("<div class='col-white' data-row= "+i+" data-col="+j+" id=" + col_id + "></div>");
			}
			else{
				$("#row-" + i).append("<div class='col-black'></div>");
			}
		}
	}
}
function loadgame(fid){
	idt=fid;
			for(i = 0; i< 8; i++) {
		x = (i % 2 == 0) ? 1 : 0;
		for(j = 0; j< 8; j++) {
			if(j % 2 == x) {
				col_id = 'row-' + i + '-col-' + j;				
				if( i <= 2 ) {
					ficha_id = 'f1-' + 'row-' + i + '-col-' + j;
					$("#"+ col_id).append("<div class='ficha2' id="+ ficha_id +"></div>");
				}
				if( i >= 5) {
					ficha_id = 'f2-' + 'row-' + i + '-col-' + j;
					$("#"+ col_id).append("<div class='ficha1' id="+ ficha_id +"></div>");
				}
			}
		}
	}

	if(fid==0){
	$(".ficha1").draggable({ revert:'invalid',opacity: 0.5,revertDuration: 1000,containment: $("#colcenter")});
	$(".ficha2").draggable({ revert:'invalid',disabled: true });
	}
	if(fid==1){
	$(".ficha2").draggable({ revert:'invalid',opacity: 0.5,revertDuration: 1000,containment: $("#colcenter")});
	$(".ficha1").draggable({ revert:'invalid',disabled: true });
	}
	var grid = $( ".ficha2" ).draggable( "option", "containment" );
	for (i = 0; i <8; i++){
		for(y = 0; y <8; y++){
			$( "#row-"+i+"-col-"+y ).droppable({

				//-----------------------------------------EL ACCEPT SE HACE CADA VEZ QUE SE MUEVE UN PIXEL---------------------------------

  				accept: function(d) {
					var parentDiv = d.parent().prop('id');
					//posicion en la que empieza
					var row = parseInt(parentDiv.substr(4, 1));
					var col = parseInt(parentDiv.substr(10, 1));
					//posicion en la que termina
					var row_drop = parseInt($(this).attr("data-row"));
					var col_drop = parseInt($(this).attr("data-col"));

					//-------------------------------------------------- FICHA BLANCA ------------------------------------------------------
					
					if (d.hasClass( "ficha1" )) {
						if(row_drop  == row - 2) {
							col_previus = (col > col_drop) ? col_drop + 1 : col_drop - 1;
							div_id = 'row-' + (row_drop + 1) + "-col-" + col_previus;
							return ($("#"+div_id).children().hasClass("ficha2") && !$(this).children().length > 0 && turnoBlancas);
						}
						if(row_drop == row - 1){
							if (col_drop == col+1 || col_drop == col-1){
								if (yaComio) {
									return (!$(this).children().length > 0 && turnoBlancas && puedeComer);
								} else {
									return (!$(this).children().length > 0 && turnoBlancas);
								}
							}
							return (false);
						}
							return (false)
						//return ((row_drop - 1) == row && (col_drop -1 == col || col_drop + 1 == col) && (! $(this).children().length > 0 ));
					} 
					if(d.hasClass("ficha2")){
						if(row_drop == row + 2) {
							col_previus = (col < col_drop) ? col_drop - 1 : col_drop + 1;
							div_id = 'row-' + (row_drop - 1) + "-col-" + col_previus;
							return ($("#"+div_id).children().hasClass("ficha1") && !$(this).children().length > 0 && !turnoBlancas);
						}
						if(row_drop == row + 1) {
							if (col_drop == col+1 || col_drop == col-1){
								if (yaComio) {
									return (!$(this).children().length > 0 && !turnoBlancas && puedeComer);
								} else {
									return (!$(this).children().length > 0 && !turnoBlancas);
								}
							}
							return (false);
						}
						return (false);
					}
					if (d.hasClass( "ficha1dama")) {
						//console.log("fila "+row+" Columna "+col+" Destino fila "+row_drop+" Destino columna"+col_drop);
						if(row_drop  == row - 2) {
							col_previus = (col > col_drop) ? col_drop + 1 : col_drop - 1;
							div_id = 'row-' + (row_drop + 1) + "-col-" + col_previus;
							return (($("#"+div_id).children().hasClass("ficha2") || $("#"+div_id).children().hasClass("ficha2dama"))&& !$(this).children().length > 0 && turnoBlancas);
						}
						if(row_drop == row + 2) {
							col_previus = (col < col_drop) ? col_drop - 1 : col_drop + 1;
							div_id = 'row-' + (row_drop - 1) + "-col-" + col_previus;
							return (($("#"+div_id).children().hasClass("ficha2") || $("#"+div_id).children().hasClass("ficha2dama")) && !$(this).children().length > 0 && turnoBlancas);
						}
						if(row_drop == row - 1){
							if (col_drop == col+1 || col_drop == col-1){
								if (yaComio) {
									return (!$(this).children().length > 0 && turnoBlancas && puedeComer);
								} else {
									return (!$(this).children().length > 0 && turnoBlancas);
								}
							}
							return (false);
						}
						if(row_drop == row + 1) {
							if (col_drop == col+1 || col_drop == col-1){
								if (yaComio) {
									return (!$(this).children().length > 0 && turnoBlancas && puedeComer);
								} else {
									return (!$(this).children().length > 0 && turnoBlancas);
								}
							}
							return (false);
						}
							return (false)
						//return ((row_drop - 1) == row && (col_drop -1 == col || col_drop + 1 == col) && (! $(this).children().length > 0 ));
					} else 	if (d.hasClass( "ficha2dama")) {
						if(row_drop  == row - 2) {
							col_previus = (col > col_drop) ? col_drop + 1 : col_drop - 1;
							div_id = 'row-' + (row_drop + 1) + "-col-" + col_previus;
							return (($("#"+div_id).children().hasClass("ficha1") || $("#"+div_id).children().hasClass("ficha1dama")) && !$(this).children().length > 0 && !turnoBlancas);
						}
						if(row_drop == row + 2) {
							col_previus = (col < col_drop) ? col_drop - 1 : col_drop + 1;
							div_id = 'row-' + (row_drop - 1) + "-col-" + col_previus;
							return (($("#"+div_id).children().hasClass("ficha1") || $("#"+div_id).children().hasClass("ficha1dama"))&& !$(this).children().length > 0 && !turnoBlancas);
						}
						if(row_drop == row - 1){
							if (col_drop == col+1 || col_drop == col-1){
								if (yaComio) {
									return (!$(this).children().length > 0 && !turnoBlancas && puedeComer);
								} else {
									return (!$(this).children().length > 0 && !turnoBlancas);
								}
							}
							return (false);
						}
						if(row_drop == row + 1) {
							if (col_drop == col+1 || col_drop == col-1){
								if (yaComio) {
									return (!$(this).children().length > 0 && !turnoBlancas && puedeComer);
								} else {
									return (!$(this).children().length > 0 && !turnoBlancas);
								}
							}
							return (false);
						}
							return (false)
						//return ((row_drop - 1) == row && (col_drop -1 == col || col_drop + 1 == col) && (! $(this).children().length > 0 ));
					}  
		    },
  				drop:function(event, ui) {
					//Obtiene la posición actual
					var row = parseInt($(this).attr("data-row"));
					var col = parseInt($(this).attr("data-col"));
					//Obtiene la posicion anterior
					var row_previus = parseInt(ui.draggable.parent().attr("id").substr(4, 1));
					var col_previus = parseInt(ui.draggable.parent().attr("id").substr(10, 1));
					$(ui.draggable).appendTo($(this));
					//Revisa el tipo de ficha
					//El true no se hace, solo se ejecuta el else por ahora
					//yaComio = false;
					console.log("Turno blanco "+ turnoBlancas+" yaComio "+yaComio);
					if(ui.draggable.hasClass("ficha1")) {

						if((row + 2) == row_previus) {
							if (col_previus == col+2 || col_previus == col-2){
								colMuere = (col_previus > col) ? col_previus - 1 : col_previus + 1;
								div_id = 'row-' + (row + 1) + "-col-" + colMuere;
								if ($("#"+div_id).children().hasClass("ficha2")){
									$("#" + div_id).empty();
									yaComio = true;
									
									var espacio1_id, espacio2_id, espacio3_id, espacio4_id, espacio5_id;
									if (row != 0){
										espacio1_id = 'row-' + (row - 1) + "-col-" + (col-1);
										espacio2_id = 'row-' + (row - 1) + "-col-" + (col+1);
										if (row != 1){
											espacio4_id = 'row-' + (row - 2) + "-col-" + (col);
											if (col >=2 ){
												espacio3_id = 'row-' + (row - 2) + "-col-" + (col-2);
											}
											if (col <= 6){
												espacio5_id = 'row-' + (row - 2) + "-col-" + (col+2);
											}
										}		
									}	

									if (espacio3_id != null && espacio4_id != null && espacio5_id != null ){
										if($("#"+espacio1_id).children().length == 0 && $("#"+espacio2_id).children().length == 0 ){
											puedeComer = false;
										} else {
											if ($("#"+espacio1_id).children().hasClass("ficha1")){
												if ($("#"+espacio2_id).children().hasClass("ficha1")){
													puedeComer = false
												}
												if ($("#"+espacio2_id).children().hasClass("ficha2")){
													//Check 4 and 5 empty
													if ($("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0 ){
														puedeComer = true;
														
														console.log("PUEDE COMER 4 5");
														console.log(yaComio);
													}
													
												}	
											}
											if ($("#"+espacio2_id).children().hasClass("ficha1")){
												if ($("#"+espacio1_id).children().hasClass("ficha1")){
													puedeComer = false
												}
												if ($("#"+espacio1_id).children().hasClass("ficha2")){
													//Check 3 and 4 empty
													if ($("#"+espacio3_id).children().length == 0 ||$("#"+espacio4_id).children().length == 0 ){
														puedeComer = true;
														console.log("PUEDE COMER 3 4");
														console.log(yaComio);
													}
												}
											}
											if ($("#"+espacio1_id).children().hasClass("ficha2")){
												if ($("#"+espacio2_id).children().hasClass("ficha2")){
													//check 3, 4 and 5 empty
													if ($("#"+espacio3_id).children().length == 0 || $("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0){
														puedeComer = true;
													}
												}
												//chech 3,4
												if ($("#"+espacio3_id).children().length == 0 ||$("#"+espacio4_id).children().length == 0 ){
													puedeComer = true;
												}
											}
											if ($("#"+espacio2_id).children().hasClass("ficha2")){
												//check 4,5
												if ($("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0 ){
													puedeComer = true;
													console.log("PUEDE COMER 4 5");
													console.log(yaComio);
												}
											}										

										}
									} else {
										puedeComer = false;
										yaComio = false
									}
								}
								
								
							}
						}						
						if (!puedeComer){
							turnoBlancas = false;
							yaComio = false
							if(idt==0){
								EnviarMovimiento(row_previus+";"+col_previus+";"+row+";"+col+";"+1);// Seder turno a negro 1
							}							
						}
												//Convertirse a Reina
						if(row==0){
							$("#"+ui.draggable.attr("id")).removeClass( "ficha1").addClass( "ficha1dama");
							$(".ficha1dama").draggable({ revert:'invalid',opacity: 0.5,revertDuration: 1000,containment: $("#colcenter")});
						}
						//-------------------------------------------------------------------------------------------------------------------
					} 
					if(ui.draggable.hasClass("ficha1dama")) {
						if((row + 2) == row_previus) {
							if (col_previus == col+2 || col_previus == col-2){
								colMuere = (col_previus > col) ? col_previus - 1 : col_previus + 1;
								div_id = 'row-' + (row + 1) + "-col-" + colMuere;
								if ($("#"+div_id).children().hasClass("ficha2")||$("#"+div_id).children().hasClass("ficha2dama")){
									$("#" + div_id).empty();
									yaComio = true;
									
									var espacio1_id = null;
									var espacio2_id = null;
									var espacio3_id = null;
									var espacio4_id = null;
									var espacio5_id = null;
									if (row != 0){
										espacio1_id = 'row-' + (row - 1) + "-col-" + (col-1);
										espacio2_id = 'row-' + (row - 1) + "-col-" + (col+1);
										if (row != 1){
											espacio4_id = 'row-' + (row - 2) + "-col-" + (col);
											if (col >=2 ){
												espacio3_id = 'row-' + (row - 2) + "-col-" + (col-2);
											}
											if (col <= 6){
												espacio5_id = 'row-' + (row - 2) + "-col-" + (col+2);
											}
										}		
									}	
									//------------------------------------------------------------------------------------------------------
									if (espacio3_id != null && espacio4_id != null && espacio5_id != null ){
										if($("#"+espacio1_id).children().length == 0 && $("#"+espacio2_id).children().length == 0 ){
											puedeComer = false;
											//yaComio = false
											console.log(puedeComer);
										} else {
											if ($("#"+espacio1_id).children().hasClass("ficha1dama")){
												if ($("#"+espacio2_id).children().hasClass("ficha1dama")){
													puedeComer = false
													//yaComio = false
												}
												if ($("#"+espacio2_id).children().hasClass("ficha2")||$("#"+espacio2_id).children().hasClass("ficha2dama")){
													//Check 4 and 5 empty
													if ($("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0 ){
														puedeComer = true;
														
														console.log("DAMA PUEDE COMER 4 5 ARRIBA");
														console.log(yaComio)
													}													
												}	
											}
											if ($("#"+espacio2_id).children().hasClass("ficha1dama")){
												if ($("#"+espacio1_id).children().hasClass("ficha1dama")){
													puedeComer = false
													//yaComio = false
												}
												if ($("#"+espacio1_id).children().hasClass("ficha2")||$("#"+espacio1_id).children().hasClass("ficha2dama")){
													//Check 3 and 4 empty
													if ($("#"+espacio3_id).children().length == 0 ||$("#"+espacio4_id).children().length == 0 ){
														puedeComer = true;
														console.log("DAMA PUEDE COMER 3 4 ARRIBA");
														console.log(yaComio)
													}
												}
											}
											if ($("#"+espacio1_id).children().hasClass("ficha2")||$("#"+espacio1_id).children().hasClass("ficha2dama")){
												if ($("#"+espacio2_id).children().hasClass("ficha2")||$("#"+espacio1_id).children().hasClass("ficha2dama")){
													//check 3, 4 and 5 empty
													if ($("#"+espacio3_id).children().length == 0 || $("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0){
														puedeComer = true;
														console.log("DAMA PUEDE COMER 345 ARRIBA");
														console.log(yaComio)
													}
												}
												//chech 3,4
												if ($("#"+espacio3_id).children().length == 0 ||$("#"+espacio4_id).children().length == 0 ){
													puedeComer = true;
													console.log("DAMA PUEDE COMER 3 4 ARRIBA");
													console.log(yaComio)
												}
											}
											if ($("#"+espacio2_id).children().hasClass("ficha2")||$("#"+espacio2_id).children().hasClass("ficha2dama")){
												//check 4,5
												if ($("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0 ){
													puedeComer = true;
													console.log("DAMA PUEDE COMER 4 5 ARRIBA");
													console.log(yaComio)
												}
											}										

										}
									} else {
										puedeComer = false;
										yaComio = false
									}
								}	
							}
						}
						if((row - 2) == row_previus) {
							if (col_previus == col+2 || col_previus == col-2){
								colMuere = (col_previus > col) ? col_previus - 1 : col_previus + 1;
								div_id = 'row-' + (row - 1) + "-col-" + colMuere;
								if ($("#"+div_id).children().hasClass("ficha2")||$("#"+div_id).children().hasClass("ficha2dama")){
									$("#" + div_id).empty();
									yaComio = true;
									var espacio1_id = null;
									var espacio2_id = null;
									var espacio3_id = null;
									var espacio4_id = null;
									var espacio5_id = null;
									if (row != 7){
										espacio1_id = 'row-' + (row + 1) + "-col-" + (col-1);
										espacio2_id = 'row-' + (row + 1) + "-col-" + (col+1);
										if (row != 6){
											espacio4_id = 'row-' + (row + 2) + "-col-" + (col);
											if (col >=2 ){
												espacio3_id = 'row-' + (row + 2) + "-col-" + (col-2);
											}
											if (col <= 6){
												espacio5_id = 'row-' + (row + 2) + "-col-" + (col+2);
											}
										}		
									}	
									if (espacio3_id != null && espacio4_id != null && espacio5_id != null ){
										if($("#"+espacio1_id).children().length == 0 && $("#"+espacio2_id).children().length == 0 ){
											puedeComer = false;
											//yaComio = false
											console.log(puedeComer);
										} else {
											//ESTA MALO SOLO ESTA REVISANDO SI HAY NEGRAS EN ALGUNO DE LOS DOS
											if ($("#"+espacio1_id).children().hasClass("ficha1dama")){
												if ($("#"+espacio2_id).children().hasClass("ficha1dama")){
													puedeComer = false
													//yaComio = false
												}
												if ($("#"+espacio2_id).children().hasClass("ficha2")||$("#"+espacio2_id).children().hasClass("ficha2dama")){
													//Check 4 and 5 empty
													if ($("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0 ){
														puedeComer = true;
														
														console.log("DAMA PUEDE COMER 4 5 ABAJO");
														console.log(yaComio)
													}
													
												}	
											}
											if ($("#"+espacio2_id).children().hasClass("ficha1dama")){
												if ($("#"+espacio1_id).children().hasClass("ficha1dama")){
													puedeComer = false
													//yaComio = false
												}
												if ($("#"+espacio1_id).children().hasClass("ficha2")||$("#"+espacio1_id).children().hasClass("ficha2dama")){
													//Check 3 and 4 empty
													if ($("#"+espacio3_id).children().length == 0 ||$("#"+espacio4_id).children().length == 0 ){
														puedeComer = true;
														console.log("DAMA PUEDE COMER 3 4 ABAJO");
														console.log(yaComio)
													}
												}
											}
											if ($("#"+espacio1_id).children().hasClass("ficha2")||$("#"+espacio1_id).children().hasClass("ficha2dama")){
												if ($("#"+espacio2_id).children().hasClass("ficha2")||$("#"+espacio2_id).children().hasClass("ficha2dama")){
													//check 3, 4 and 5 empty
													if ($("#"+espacio3_id).children().length == 0 || $("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0){
														puedeComer = true;
														console.log("DAMA PUEDE COMER 345 ABAJO");
														console.log(yaComio)
													}
												}
												//chech 3,4
												if ($("#"+espacio3_id).children().length == 0 ||$("#"+espacio4_id).children().length == 0 ){
													puedeComer = true;
													console.log("DAMA PUEDE COMER 3 4 ABAJO");
													console.log(yaComio)
												}
											}
											if ($("#"+espacio2_id).children().hasClass("ficha2")||$("#"+espacio2_id).children().hasClass("ficha2dama")){
												//check 4,5
												if ($("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0 ){
													puedeComer = true;
													console.log("DAMA PUEDE COMER 4 5 ABAJO");
													console.log(yaComio)
												}
											}
											

										}
									} else {
										puedeComer = false;
									}
								}	
							}
						}
						if (!puedeComer){
							turnoBlancas = false;
							yaComio = false
						}
						//-------------------------------------------------------------------------------------------------------------------
					}
					//-------------------------------------
					if(ui.draggable.hasClass("ficha2")) {

						//procedimiento de comer
						if((row - 2) == row_previus) {
							if (col_previus == col+2 || col_previus == col-2){
								colMuere = (col_previus > col) ? col_previus - 1 : col_previus + 1;
								div_id = 'row-' + (row - 1) + "-col-" + colMuere;
								if ($("#"+div_id).children().hasClass("ficha1")){
									$("#" + div_id).empty();
									yaComio = true;

									var espacio1_id, espacio2_id, espacio3_id, espacio4_id, espacio5_id;
									if (row != 7){
										espacio1_id = 'row-' + (row + 1) + "-col-" + (col-1);
										espacio2_id = 'row-' + (row + 1) + "-col-" + (col+1);
										if (row != 6){
											espacio4_id = 'row-' + (row + 2) + "-col-" + (col);
											if (col >=2 ){
												espacio3_id = 'row-' + (row + 2) + "-col-" + (col-2);
											}
											if (col <= 6){
												espacio5_id = 'row-' + (row + 2) + "-col-" + (col+2);
											}
										}		
									}	
									if (espacio3_id != null && espacio4_id != null && espacio5_id != null ){
										if($("#"+espacio1_id).children().length == 0 && $("#"+espacio2_id).children().length == 0 ){
											puedeComer = false;
										} else {
											if ($("#"+espacio1_id).children().hasClass("ficha2")){
												if ($("#"+espacio2_id).children().hasClass("ficha2")){
													puedeComer = false
												}
												if ($("#"+espacio2_id).children().hasClass("ficha1")){
													//Check 4 and 5 empty
													if ($("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0 ){
														puedeComer = true;
													}
													
												}
												if ($("#"+espacio2_id).children().length == 0){
													puedeComer = false
												}
											}
											if ($("#"+espacio2_id).children().hasClass("ficha2")){
												if ($("#"+espacio1_id).children().hasClass("ficha2")){
													puedeComer = false
												}
												if ($("#"+espacio1_id).children().hasClass("ficha1")){
													//Check 3 and 4 empty
													if ($("#"+espacio3_id).children().length == 0 || $("#"+espacio4_id).children().length == 0 ){
														puedeComer = true;
													} else { 
														puedeComer = false;
													}
												}
												if ($("#"+espacio1_id).children().length == 0){
													puedeComer = false
												}
											}
											if ($("#"+espacio1_id).children().hasClass("ficha1")){
												if ($("#"+espacio2_id).children().hasClass("ficha1")){
													//check 3, 4 and 5 empty
													if ($("#"+espacio3_id).children().length == 0 || $("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0){
														puedeComer = true;
													}
												}
												//chech 3,4
												if ($("#"+espacio3_id).children().length == 0 || $("#"+espacio4_id).children().length == 0 ){
													puedeComer = true;
												}
											}
											if ($("#"+espacio2_id).children().hasClass("ficha1")){
												//check 4,5
												if ($("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0 ){
													puedeComer = true;
												}
											}
											

										}
									} else {
										puedeComer = false;
									}
								}	
							}
						}
						if (!puedeComer){
							turnoBlancas = true;
							yaComio = false
							if(idt==1){
							EnviarMovimiento(row_previus+";"+col_previus+";"+row+";"+col+";"+0);// Seder turno a negro 1
						   }
						}
												//Convertirse a Reina
						if(row==7){
							$("#"+ui.draggable.attr("id")).removeClass( "ficha2").addClass( "ficha2dama");
							$(".ficha2dama").draggable({ revert:'invalid',opacity: 0.5,revertDuration: 1000,containment: $("#colcenter")});
						}
					}
					//----DAMA 2
					if(ui.draggable.hasClass("ficha2dama")) {
						if((row + 2) == row_previus) {
							if (col_previus == col+2 || col_previus == col-2){
								colMuere = (col_previus > col) ? col_previus - 1 : col_previus + 1;
								div_id = 'row-' + (row + 1) + "-col-" + colMuere;
								if ($("#"+div_id).children().hasClass("ficha1")||$("#"+div_id).children().hasClass("ficha1dama")){
									$("#" + div_id).empty();
									yaComio = true;
									
							var espacio1_id, espacio2_id, espacio3_id, espacio4_id, espacio5_id;
									if (row != 0){
										espacio1_id = 'row-' + (row - 1) + "-col-" + (col-1);
										espacio2_id = 'row-' + (row - 1) + "-col-" + (col+1);
										if (row != 1){
											espacio4_id = 'row-' + (row - 2) + "-col-" + (col);
											if (col >=2 ){
												espacio3_id = 'row-' + (row - 2) + "-col-" + (col-2);
											}
											if (col <= 6){
												espacio5_id = 'row-' + (row - 2) + "-col-" + (col+2);
											}
										}		
									}	
									//------------------------------------------------------------------------------------------------------
									if (espacio3_id != null && espacio4_id != null && espacio5_id != null ){
										if($("#"+espacio1_id).children().length == 0 && $("#"+espacio2_id).children().length == 0 ){
											puedeComer = false;
											//yaComio = false
											console.log(puedeComer);
										} else {
											if ($("#"+espacio1_id).children().hasClass("ficha2dama")){
												if ($("#"+espacio2_id).children().hasClass("ficha2dama")){
													puedeComer = false
													//yaComio = false
												}
												if ($("#"+espacio2_id).children().hasClass("ficha1")||$("#"+espacio2_id).children().hasClass("ficha1dama")){
													//Check 4 and 5 empty
													if ($("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0 ){
														puedeComer = true;
														
														console.log("PUEDE COMER 4 5");
														console.log(yaComio)
													}													
												}	
											}
											if ($("#"+espacio2_id).children().hasClass("ficha2dama")){
												if ($("#"+espacio1_id).children().hasClass("ficha2dama")){
													puedeComer = false
													//yaComio = false
												}
												if ($("#"+espacio1_id).children().hasClass("ficha1")||$("#"+espacio1_id).children().hasClass("ficha1dama")){
													//Check 3 and 4 empty
													if ($("#"+espacio3_id).children().length == 0 ||$("#"+espacio4_id).children().length == 0 ){
														puedeComer = true;
														console.log("PUEDE COMER 3 4");
														console.log(yaComio)
													}
												}
											}
											if ($("#"+espacio1_id).children().hasClass("ficha1")||$("#"+espacio1_id).children().hasClass("ficha1dama")){
												if ($("#"+espacio2_id).children().hasClass("ficha1")||$("#"+espacio1_id).children().hasClass("ficha1dama")){
													//check 3, 4 and 5 empty
													if ($("#"+espacio3_id).children().length == 0 || $("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0){
														puedeComer = true;
														console.log("PUEDE COMER 345");
														console.log(yaComio)
													}
												}
												//chech 3,4
												if ($("#"+espacio3_id).children().length == 0 ||$("#"+espacio4_id).children().length == 0 ){
													puedeComer = true;
													console.log("PUEDE COMER 3 4");
													console.log(yaComio)
												}
											}
											if ($("#"+espacio2_id).children().hasClass("ficha1")||$("#"+espacio2_id).children().hasClass("ficha1dama")){
												//check 4,5
												if ($("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0 ){
													puedeComer = true;
													console.log("PUEDE COMER 4 5");
													console.log(yaComio)
												}
											}										

										}
									} else {
										puedeComer = false;
										yaComio = false
									}
								}	
							}
						}
						if((row - 2) == row_previus) {
							if (col_previus == col+2 || col_previus == col-2){
								colMuere = (col_previus > col) ? col_previus - 1 : col_previus + 1;
								div_id = 'row-' + (row - 1) + "-col-" + colMuere;
								if ($("#"+div_id).children().hasClass("ficha1")||$("#"+div_id).children().hasClass("ficha1dama")){
									$("#" + div_id).empty();
									yaComio = true;
									var espacio1_id, espacio2_id, espacio3_id, espacio4_id, espacio5_id;
									if (row != 7){
										espacio1_id = 'row-' + (row + 1) + "-col-" + (col-1);
										espacio2_id = 'row-' + (row + 1) + "-col-" + (col+1);
										if (row != 6){
											espacio4_id = 'row-' + (row + 2) + "-col-" + (col);
											if (col >=2 ){
												espacio3_id = 'row-' + (row + 2) + "-col-" + (col-2);
											}
											if (col <= 6){
												espacio5_id = 'row-' + (row + 2) + "-col-" + (col+2);
											}
										}		
									}	
									if (espacio3_id != null && espacio4_id != null && espacio5_id != null ){
										if($("#"+espacio1_id).children().length == 0 && $("#"+espacio2_id).children().length == 0 ){
											puedeComer = false;
											//yaComio = false
											console.log(puedeComer);
										} else {
											//ESTA MALO SOLO ESTA REVISANDO SI HAY NEGRAS EN ALGUNO DE LOS DOS
											if ($("#"+espacio1_id).children().hasClass("ficha2dama")){
												if ($("#"+espacio2_id).children().hasClass("ficha2dama")){
													puedeComer = false
													//yaComio = false
												}
												if ($("#"+espacio2_id).children().hasClass("ficha1")||$("#"+espacio2_id).children().hasClass("ficha1dama")){
													//Check 4 and 5 empty
													if ($("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0 ){
														puedeComer = true;
														
														console.log("PUEDE COMER 4 5");
														console.log(yaComio)
													}
													
												}	
											}
											if ($("#"+espacio2_id).children().hasClass("ficha2dama")){
												if ($("#"+espacio1_id).children().hasClass("ficha2dama")){
													puedeComer = false
													//yaComio = false
												}
												if ($("#"+espacio1_id).children().hasClass("ficha1")||$("#"+espacio1_id).children().hasClass("ficha1dama")){
													//Check 3 and 4 empty
													if ($("#"+espacio3_id).children().length == 0 ||$("#"+espacio4_id).children().length == 0 ){
														puedeComer = true;
														console.log("PUEDE COMER 3 4");
														console.log(yaComio)
													}
												}
											}
											if ($("#"+espacio1_id).children().hasClass("ficha1")||$("#"+espacio1_id).children().hasClass("ficha1dama")){
												if ($("#"+espacio2_id).children().hasClass("ficha1")||$("#"+espacio2_id).children().hasClass("ficha1dama")){
													//check 3, 4 and 5 empty
													if ($("#"+espacio3_id).children().length == 0 || $("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0){
														puedeComer = true;
														console.log("PUEDE COMER 345");
														console.log(yaComio)
													}
												}
												//chech 3,4
												if ($("#"+espacio3_id).children().length == 0 ||$("#"+espacio4_id).children().length == 0 ){
													puedeComer = true;
													console.log("PUEDE COMER 3 4");
													console.log(yaComio)
												}
											}
											if ($("#"+espacio2_id).children().hasClass("ficha1")||$("#"+espacio2_id).children().hasClass("ficha1dama")){
												//check 4,5
												if ($("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0 ){
													puedeComer = true;
													console.log("PUEDE COMER 4 5");
													console.log(yaComio)
												}
											}										

										}
									} else {
										puedeComer = false;
										yaComio = false
									}
								}	
							}
						}
						if (!puedeComer){
							turnoBlancas = true;
							yaComio = false
						}
						//-------------------------------------------------------------------------------------------------------------------
					}
					//---FIN DROP
				},
			});
	}}
	}


	function mover(row_previus,col_previus,row,col,ui) {
			col_id = 'row-' + row+ '-col-' + col;
			var _this=$("#"+col_id).get();
					ui.appendTo(_this);
					//Revisa el tipo de ficha
					//El true no se hace, solo se ejecuta el else por ahora
					//yaComio = false;
					//console.log("Turno blanco "+ turnoBlancas+" yaComio "+yaComio);
					console.log("ficha "+ui.attr("id"));
					if(ui.hasClass("ficha1")) {
						//Convertirse a Reina

						if((row + 2) == row_previus) {
							if (col_previus == col+2 || col_previus == col-2){
								colMuere = (col_previus > col) ? col_previus - 1 : col_previus + 1;
								div_id = 'row-' + (row + 1) + "-col-" + colMuere;
								console.log("posicion muerte"+div_id);
								if ($("#"+div_id).children().hasClass("ficha2")){
									$("#" + div_id).empty();
									yaComio = true;
									
									var espacio1_id, espacio2_id, espacio3_id, espacio4_id, espacio5_id;
									if (row != 0){
										espacio1_id = 'row-' + (row - 1) + "-col-" + (col-1);
										espacio2_id = 'row-' + (row - 1) + "-col-" + (col+1);
										if (row != 1){
											espacio4_id = 'row-' + (row - 2) + "-col-" + (col);
											if (col >=2 ){
												espacio3_id = 'row-' + (row - 2) + "-col-" + (col-2);
											}
											if (col <= 6){
												espacio5_id = 'row-' + (row - 2) + "-col-" + (col+2);
											}
										}		
									}	

									if (espacio3_id != null && espacio4_id != null && espacio5_id != null ){
										if($("#"+espacio1_id).children().length == 0 && $("#"+espacio2_id).children().length == 0 ){
											puedeComer = false;
										} else {
											if ($("#"+espacio1_id).children().hasClass("ficha1")){
												if ($("#"+espacio2_id).children().hasClass("ficha1")){
													puedeComer = false
												}
												if ($("#"+espacio2_id).children().hasClass("ficha2")){
													//Check 4 and 5 empty
													if ($("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0 ){
														puedeComer = true;
														
														console.log("PUEDE COMER 4 5");
														console.log(yaComio);
													}
													
												}	
											}
											if ($("#"+espacio2_id).children().hasClass("ficha1")){
												if ($("#"+espacio1_id).children().hasClass("ficha1")){
													puedeComer = false
												}
												if ($("#"+espacio1_id).children().hasClass("ficha2")){
													//Check 3 and 4 empty
													if ($("#"+espacio3_id).children().length == 0 ||$("#"+espacio4_id).children().length == 0 ){
														puedeComer = true;
														console.log("PUEDE COMER 3 4");
														console.log(yaComio);
													}
												}
											}
											if ($("#"+espacio1_id).children().hasClass("ficha2")){
												if ($("#"+espacio2_id).children().hasClass("ficha2")){
													//check 3, 4 and 5 empty
													if ($("#"+espacio3_id).children().length == 0 || $("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0){
														puedeComer = true;
													}
												}
												//chech 3,4
												if ($("#"+espacio3_id).children().length == 0 ||$("#"+espacio4_id).children().length == 0 ){
													puedeComer = true;
												}
											}
											if ($("#"+espacio2_id).children().hasClass("ficha2")){
												//check 4,5
												if ($("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0 ){
													puedeComer = true;
													console.log("PUEDE COMER 4 5");
													console.log(yaComio);
												}
											}										

										}
									} else {
										puedeComer = false;
										yaComio = false
									}
								}					
								
							}
						}						
						if (!puedeComer){
							turnoBlancas = false;
							yaComio = false
							if(idt==0){
								EnviarMovimiento(row_previus+";"+col_previus+";"+row+";"+col+";"+1);// Seder turno a negro 1
							}							
						}
						if(row==0){
							$("#"+ui.attr("id")).removeClass( "ficha1").addClass( "ficha1dama");
							$(".ficha1dama").draggable({ revert:'invalid',opacity: 0.5,revertDuration: 1000,containment: $("#colcenter")});
						}
						//-------------------------------------------------------------------------------------------------------------------
					} 
					if(ui.hasClass("ficha1dama")) {
						if((row + 2) == row_previus) {
							if (col_previus == col+2 || col_previus == col-2){
								colMuere = (col_previus > col) ? col_previus - 1 : col_previus + 1;
								div_id = 'row-' + (row + 1) + "-col-" + colMuere;
								if ($("#"+div_id).children().hasClass("ficha2")||$("#"+div_id).children().hasClass("ficha2dama")){
									$("#" + div_id).empty();
									yaComio = true;
									
									var espacio1_id = null;
									var espacio2_id = null;
									var espacio3_id = null;
									var espacio4_id = null;
									var espacio5_id = null;
									if (row != 0){
										espacio1_id = 'row-' + (row - 1) + "-col-" + (col-1);
										espacio2_id = 'row-' + (row - 1) + "-col-" + (col+1);
										if (row != 1){
											espacio4_id = 'row-' + (row - 2) + "-col-" + (col);
											if (col >=2 ){
												espacio3_id = 'row-' + (row - 2) + "-col-" + (col-2);
											}
											if (col <= 6){
												espacio5_id = 'row-' + (row - 2) + "-col-" + (col+2);
											}
										}		
									}	
									//------------------------------------------------------------------------------------------------------
									if (espacio3_id != null && espacio4_id != null && espacio5_id != null ){
										if($("#"+espacio1_id).children().length == 0 && $("#"+espacio2_id).children().length == 0 ){
											puedeComer = false;
											//yaComio = false
											console.log(puedeComer);
										} else {
											if ($("#"+espacio1_id).children().hasClass("ficha1dama")){
												if ($("#"+espacio2_id).children().hasClass("ficha1dama")){
													puedeComer = false
													//yaComio = false
												}
												if ($("#"+espacio2_id).children().hasClass("ficha2")||$("#"+espacio2_id).children().hasClass("ficha2dama")){
													//Check 4 and 5 empty
													if ($("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0 ){
														puedeComer = true;
														
														console.log("DAMA PUEDE COMER 4 5 ARRIBA");
														console.log(yaComio)
													}													
												}	
											}
											if ($("#"+espacio2_id).children().hasClass("ficha1dama")){
												if ($("#"+espacio1_id).children().hasClass("ficha1dama")){
													puedeComer = false
													//yaComio = false
												}
												if ($("#"+espacio1_id).children().hasClass("ficha2")||$("#"+espacio1_id).children().hasClass("ficha2dama")){
													//Check 3 and 4 empty
													if ($("#"+espacio3_id).children().length == 0 ||$("#"+espacio4_id).children().length == 0 ){
														puedeComer = true;
														console.log("DAMA PUEDE COMER 3 4 ARRIBA");
														console.log(yaComio)
													}
												}
											}
											if ($("#"+espacio1_id).children().hasClass("ficha2")||$("#"+espacio1_id).children().hasClass("ficha2dama")){
												if ($("#"+espacio2_id).children().hasClass("ficha2")||$("#"+espacio1_id).children().hasClass("ficha2dama")){
													//check 3, 4 and 5 empty
													if ($("#"+espacio3_id).children().length == 0 || $("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0){
														puedeComer = true;
														console.log("DAMA PUEDE COMER 345 ARRIBA");
														console.log(yaComio)
													}
												}
												//chech 3,4
												if ($("#"+espacio3_id).children().length == 0 ||$("#"+espacio4_id).children().length == 0 ){
													puedeComer = true;
													console.log("DAMA PUEDE COMER 3 4 ARRIBA");
													console.log(yaComio)
												}
											}
											if ($("#"+espacio2_id).children().hasClass("ficha2")||$("#"+espacio2_id).children().hasClass("ficha2dama")){
												//check 4,5
												if ($("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0 ){
													puedeComer = true;
													console.log("DAMA PUEDE COMER 4 5 ARRIBA");
													console.log(yaComio)
												}
											}										

										}
									} else {
										puedeComer = false;
										yaComio = false
									}
								}	
							}
						}
						if((row - 2) == row_previus) {
							if (col_previus == col+2 || col_previus == col-2){
								colMuere = (col_previus > col) ? col_previus - 1 : col_previus + 1;
								div_id = 'row-' + (row - 1) + "-col-" + colMuere;
								if ($("#"+div_id).children().hasClass("ficha2")||$("#"+div_id).children().hasClass("ficha2dama")){
									$("#" + div_id).empty();
									yaComio = true;
									var espacio1_id = null;
									var espacio2_id = null;
									var espacio3_id = null;
									var espacio4_id = null;
									var espacio5_id = null;
									if (row != 7){
										espacio1_id = 'row-' + (row + 1) + "-col-" + (col-1);
										espacio2_id = 'row-' + (row + 1) + "-col-" + (col+1);
										if (row != 6){
											espacio4_id = 'row-' + (row + 2) + "-col-" + (col);
											if (col >=2 ){
												espacio3_id = 'row-' + (row + 2) + "-col-" + (col-2);
											}
											if (col <= 6){
												espacio5_id = 'row-' + (row + 2) + "-col-" + (col+2);
											}
										}		
									}	
									if (espacio3_id != null && espacio4_id != null && espacio5_id != null ){
										if($("#"+espacio1_id).children().length == 0 && $("#"+espacio2_id).children().length == 0 ){
											puedeComer = false;
											//yaComio = false
											console.log(puedeComer);
										} else {
											//ESTA MALO SOLO ESTA REVISANDO SI HAY NEGRAS EN ALGUNO DE LOS DOS
											if ($("#"+espacio1_id).children().hasClass("ficha1dama")){
												if ($("#"+espacio2_id).children().hasClass("ficha1dama")){
													puedeComer = false
													//yaComio = false
												}
												if ($("#"+espacio2_id).children().hasClass("ficha2")||$("#"+espacio2_id).children().hasClass("ficha2dama")){
													//Check 4 and 5 empty
													if ($("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0 ){
														puedeComer = true;
														
														console.log("DAMA PUEDE COMER 4 5 ABAJO");
														console.log(yaComio)
													}
													
												}	
											}
											if ($("#"+espacio2_id).children().hasClass("ficha1dama")){
												if ($("#"+espacio1_id).children().hasClass("ficha1dama")){
													puedeComer = false
													//yaComio = false
												}
												if ($("#"+espacio1_id).children().hasClass("ficha2")||$("#"+espacio1_id).children().hasClass("ficha2dama")){
													//Check 3 and 4 empty
													if ($("#"+espacio3_id).children().length == 0 ||$("#"+espacio4_id).children().length == 0 ){
														puedeComer = true;
														console.log("DAMA PUEDE COMER 3 4 ABAJO");
														console.log(yaComio)
													}
												}
											}
											if ($("#"+espacio1_id).children().hasClass("ficha2")||$("#"+espacio1_id).children().hasClass("ficha2dama")){
												if ($("#"+espacio2_id).children().hasClass("ficha2")||$("#"+espacio2_id).children().hasClass("ficha2dama")){
													//check 3, 4 and 5 empty
													if ($("#"+espacio3_id).children().length == 0 || $("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0){
														puedeComer = true;
														console.log("DAMA PUEDE COMER 345 ABAJO");
														console.log(yaComio)
													}
												}
												//chech 3,4
												if ($("#"+espacio3_id).children().length == 0 ||$("#"+espacio4_id).children().length == 0 ){
													puedeComer = true;
													console.log("DAMA PUEDE COMER 3 4 ABAJO");
													console.log(yaComio)
												}
											}
											if ($("#"+espacio2_id).children().hasClass("ficha2")||$("#"+espacio2_id).children().hasClass("ficha2dama")){
												//check 4,5
												if ($("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0 ){
													puedeComer = true;
													console.log("DAMA PUEDE COMER 4 5 ABAJO");
													console.log(yaComio)
												}
											}
											

										}
									} else {
										puedeComer = false;
									}
								}	
							}
						}
						if (!puedeComer){
							turnoBlancas = false;
							yaComio = false
						}
						//-------------------------------------------------------------------------------------------------------------------
					}
					//-------------------------------------
					if(ui.hasClass("ficha2")) {

						//procedimiento de comer
						if((row - 2) == row_previus) {
							if (col_previus == col+2 || col_previus == col-2){
								colMuere = (col_previus > col) ? col_previus - 1 : col_previus + 1;
								div_id = 'row-' + (row - 1) + "-col-" + colMuere;
								if ($("#"+div_id).children().hasClass("ficha1")){
									$("#" + div_id).empty();
									yaComio = true;

									var espacio1_id, espacio2_id, espacio3_id, espacio4_id, espacio5_id;
									if (row != 7){
										espacio1_id = 'row-' + (row + 1) + "-col-" + (col-1);
										espacio2_id = 'row-' + (row + 1) + "-col-" + (col+1);
										if (row != 6){
											espacio4_id = 'row-' + (row + 2) + "-col-" + (col);
											if (col >=2 ){
												espacio3_id = 'row-' + (row + 2) + "-col-" + (col-2);
											}
											if (col <= 6){
												espacio5_id = 'row-' + (row + 2) + "-col-" + (col+2);
											}
										}		
									}	
									if (espacio3_id != null && espacio4_id != null && espacio5_id != null ){
										if($("#"+espacio1_id).children().length == 0 && $("#"+espacio2_id).children().length == 0 ){
											puedeComer = false;
										} else {
											if ($("#"+espacio1_id).children().hasClass("ficha2")){
												if ($("#"+espacio2_id).children().hasClass("ficha2")){
													puedeComer = false
												}
												if ($("#"+espacio2_id).children().hasClass("ficha1")){
													//Check 4 and 5 empty
													if ($("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0 ){
														puedeComer = true;
													}
													
												}
												if ($("#"+espacio2_id).children().length == 0){
													puedeComer = false
												}
											}
											if ($("#"+espacio2_id).children().hasClass("ficha2")){
												if ($("#"+espacio1_id).children().hasClass("ficha2")){
													puedeComer = false
												}
												if ($("#"+espacio1_id).children().hasClass("ficha1")){
													//Check 3 and 4 empty
													if ($("#"+espacio3_id).children().length == 0 || $("#"+espacio4_id).children().length == 0 ){
														puedeComer = true;
													} else { 
														puedeComer = false;
													}
												}
												if ($("#"+espacio1_id).children().length == 0){
													puedeComer = false
												}
											}
											if ($("#"+espacio1_id).children().hasClass("ficha1")){
												if ($("#"+espacio2_id).children().hasClass("ficha1")){
													//check 3, 4 and 5 empty
													if ($("#"+espacio3_id).children().length == 0 || $("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0){
														puedeComer = true;
													}
												}
												//chech 3,4
												if ($("#"+espacio3_id).children().length == 0 || $("#"+espacio4_id).children().length == 0 ){
													puedeComer = true;
												}
											}
											if ($("#"+espacio2_id).children().hasClass("ficha1")){
												//check 4,5
												if ($("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0 ){
													puedeComer = true;
												}
											}
											

										}
									} else {
										puedeComer = false;
									}
								}	
							}
						}
						if (!puedeComer){
							turnoBlancas = true;
							yaComio = false
							if(idt==1){
							EnviarMovimiento(row_previus+";"+col_previus+";"+row+";"+col+";"+0);// Seder turno a negro 1
						   }
						}
												//Convertirse a Reina
						if(row==7){
							$("#"+ui.attr("id")).removeClass( "ficha2").addClass( "ficha2dama");
							$(".ficha2dama").draggable({ revert:'invalid',opacity: 0.5,revertDuration: 1000,containment: $("#colcenter")});
						}
					}
					//----DAMA 2
					if(ui.hasClass("ficha2dama")) {
						if((row + 2) == row_previus) {
							if (col_previus == col+2 || col_previus == col-2){
								colMuere = (col_previus > col) ? col_previus - 1 : col_previus + 1;
								div_id = 'row-' + (row + 1) + "-col-" + colMuere;
								if ($("#"+div_id).children().hasClass("ficha1")||$("#"+div_id).children().hasClass("ficha1dama")){
									$("#" + div_id).empty();
									yaComio = true;
									
							var espacio1_id, espacio2_id, espacio3_id, espacio4_id, espacio5_id;
									if (row != 0){
										espacio1_id = 'row-' + (row - 1) + "-col-" + (col-1);
										espacio2_id = 'row-' + (row - 1) + "-col-" + (col+1);
										if (row != 1){
											espacio4_id = 'row-' + (row - 2) + "-col-" + (col);
											if (col >=2 ){
												espacio3_id = 'row-' + (row - 2) + "-col-" + (col-2);
											}
											if (col <= 6){
												espacio5_id = 'row-' + (row - 2) + "-col-" + (col+2);
											}
										}		
									}	
									//------------------------------------------------------------------------------------------------------
									if (espacio3_id != null && espacio4_id != null && espacio5_id != null ){
										if($("#"+espacio1_id).children().length == 0 && $("#"+espacio2_id).children().length == 0 ){
											puedeComer = false;
											//yaComio = false
											console.log(puedeComer);
										} else {
											if ($("#"+espacio1_id).children().hasClass("ficha2dama")){
												if ($("#"+espacio2_id).children().hasClass("ficha2dama")){
													puedeComer = false
													//yaComio = false
												}
												if ($("#"+espacio2_id).children().hasClass("ficha1")||$("#"+espacio2_id).children().hasClass("ficha1dama")){
													//Check 4 and 5 empty
													if ($("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0 ){
														puedeComer = true;
														
														console.log("PUEDE COMER 4 5");
														console.log(yaComio)
													}													
												}	
											}
											if ($("#"+espacio2_id).children().hasClass("ficha2dama")){
												if ($("#"+espacio1_id).children().hasClass("ficha2dama")){
													puedeComer = false
													//yaComio = false
												}
												if ($("#"+espacio1_id).children().hasClass("ficha1")||$("#"+espacio1_id).children().hasClass("ficha1dama")){
													//Check 3 and 4 empty
													if ($("#"+espacio3_id).children().length == 0 ||$("#"+espacio4_id).children().length == 0 ){
														puedeComer = true;
														console.log("PUEDE COMER 3 4");
														console.log(yaComio)
													}
												}
											}
											if ($("#"+espacio1_id).children().hasClass("ficha1")||$("#"+espacio1_id).children().hasClass("ficha1dama")){
												if ($("#"+espacio2_id).children().hasClass("ficha1")||$("#"+espacio1_id).children().hasClass("ficha1dama")){
													//check 3, 4 and 5 empty
													if ($("#"+espacio3_id).children().length == 0 || $("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0){
														puedeComer = true;
														console.log("PUEDE COMER 345");
														console.log(yaComio)
													}
												}
												//chech 3,4
												if ($("#"+espacio3_id).children().length == 0 ||$("#"+espacio4_id).children().length == 0 ){
													puedeComer = true;
													console.log("PUEDE COMER 3 4");
													console.log(yaComio)
												}
											}
											if ($("#"+espacio2_id).children().hasClass("ficha1")||$("#"+espacio2_id).children().hasClass("ficha1dama")){
												//check 4,5
												if ($("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0 ){
													puedeComer = true;
													console.log("PUEDE COMER 4 5");
													console.log(yaComio)
												}
											}										

										}
									} else {
										puedeComer = false;
										yaComio = false
									}
								}	
							}
						}
						if((row - 2) == row_previus) {
							if (col_previus == col+2 || col_previus == col-2){
								colMuere = (col_previus > col) ? col_previus - 1 : col_previus + 1;
								div_id = 'row-' + (row - 1) + "-col-" + colMuere;
								if ($("#"+div_id).children().hasClass("ficha1")||$("#"+div_id).children().hasClass("ficha1dama")){
									$("#" + div_id).empty();
									yaComio = true;
									var espacio1_id, espacio2_id, espacio3_id, espacio4_id, espacio5_id;
									if (row != 7){
										espacio1_id = 'row-' + (row + 1) + "-col-" + (col-1);
										espacio2_id = 'row-' + (row + 1) + "-col-" + (col+1);
										if (row != 6){
											espacio4_id = 'row-' + (row + 2) + "-col-" + (col);
											if (col >=2 ){
												espacio3_id = 'row-' + (row + 2) + "-col-" + (col-2);
											}
											if (col <= 6){
												espacio5_id = 'row-' + (row + 2) + "-col-" + (col+2);
											}
										}		
									}	
									if (espacio3_id != null && espacio4_id != null && espacio5_id != null ){
										if($("#"+espacio1_id).children().length == 0 && $("#"+espacio2_id).children().length == 0 ){
											puedeComer = false;
											//yaComio = false
											console.log(puedeComer);
										} else {
											//ESTA MALO SOLO ESTA REVISANDO SI HAY NEGRAS EN ALGUNO DE LOS DOS
											if ($("#"+espacio1_id).children().hasClass("ficha2dama")){
												if ($("#"+espacio2_id).children().hasClass("ficha2dama")){
													puedeComer = false
													//yaComio = false
												}
												if ($("#"+espacio2_id).children().hasClass("ficha1")||$("#"+espacio2_id).children().hasClass("ficha1dama")){
													//Check 4 and 5 empty
													if ($("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0 ){
														puedeComer = true;
														
														console.log("PUEDE COMER 4 5");
														console.log(yaComio)
													}
													
												}	
											}
											if ($("#"+espacio2_id).children().hasClass("ficha2dama")){
												if ($("#"+espacio1_id).children().hasClass("ficha2dama")){
													puedeComer = false
													//yaComio = false
												}
												if ($("#"+espacio1_id).children().hasClass("ficha1")||$("#"+espacio1_id).children().hasClass("ficha1dama")){
													//Check 3 and 4 empty
													if ($("#"+espacio3_id).children().length == 0 ||$("#"+espacio4_id).children().length == 0 ){
														puedeComer = true;
														console.log("PUEDE COMER 3 4");
														console.log(yaComio)
													}
												}
											}
											if ($("#"+espacio1_id).children().hasClass("ficha1")||$("#"+espacio1_id).children().hasClass("ficha1dama")){
												if ($("#"+espacio2_id).children().hasClass("ficha1")||$("#"+espacio2_id).children().hasClass("ficha1dama")){
													//check 3, 4 and 5 empty
													if ($("#"+espacio3_id).children().length == 0 || $("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0){
														puedeComer = true;
														console.log("PUEDE COMER 345");
														console.log(yaComio)
													}
												}
												//chech 3,4
												if ($("#"+espacio3_id).children().length == 0 ||$("#"+espacio4_id).children().length == 0 ){
													puedeComer = true;
													console.log("PUEDE COMER 3 4");
													console.log(yaComio)
												}
											}
											if ($("#"+espacio2_id).children().hasClass("ficha1")||$("#"+espacio2_id).children().hasClass("ficha1dama")){
												//check 4,5
												if ($("#"+espacio4_id).children().length == 0 ||$("#"+espacio5_id).children().length == 0 ){
													puedeComer = true;
													console.log("PUEDE COMER 4 5");
													console.log(yaComio)
												}
											}										

										}
									} else {
										puedeComer = false;
										yaComio = false
									}
								}	
							}
						}
						if (!puedeComer){
							turnoBlancas = true;
							yaComio = false
						}
						//-------------------------------------------------------------------------------------------------------------------
					}
				}
					//---FIN mOVE
