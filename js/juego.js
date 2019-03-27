$(document).ready(function() {
		for(i = 0; i< 8; i++) {
		x = (i % 2 == 0) ? 1 : 0;
		$("#contenedor").append("<div id=row-" + i + " class='row'></div>")
		for(j = 0; j< 8; j++) {
			if(j % 2 == x) {
				col_id = 'row-' + i + '-col-' + j;
				$("#row-" + i).append("<div class='col-white' data-row= "+i+" data-col="+j+" id=" + col_id + "></div>");
				if( i <= 2 ) {
					ficha_id = 'f1-' + 'row-' + i + '-col-' + j;
					$("#"+ col_id).append("<div class='ficha2' id="+ ficha_id +"></div>");
				}
				if( i >= 5) {
					ficha_id = 'f2-' + 'row-' + i + '-col-' + j;
					$("#"+ col_id).append("<div class='ficha1' id="+ ficha_id +"></div>");
				}
			}
			else{
				$("#row-" + i).append("<div class='col-black'></div>");
			}

		}
	}
	$(".ficha1").draggable({ revert: 'invalid' });
	$(".ficha2").draggable({ revert:'invalid',opacity: 0.5,revertDuration: 1000,containment: $("#colcenter")});
	var grid = $( ".ficha2" ).draggable( "option", "containment" );
	for (i = 0; i <8; i++){
		for(y = 0; y <8; y++){
			$( "#row-"+i+"-col-"+y ).droppable({
  				accept: ".ficha2",
  				drop:function(event, ui) {
					var row = parseInt($(this).attr("data-row"));
					var col = parseInt($(this).attr("data-col"));
					var row_previus = parseInt(ui.draggable.parent().attr("id").substr(4, 1));
					var col_previus = parseInt(ui.draggable.parent().attr("id").substr(10, 1));
					$(ui.draggable).appendTo($(this));
					if(ui.draggable.hasClass("ficha1")) {
						if((row - 2) == row_previus) {
							if (col_previus == col+2 || col_previus == col-2){
								col_ = (col_previus > col) ? col_previus - 1 : col_previus + 1;
								div_id = 'row-' + (row - 1) + "-col-" + col_;
								$("#" + div_id).empty();
							}
						}
					} else {
						if((row - 2) == row_previus) {
							if (col_previus == col+2 || col_previus == col-2){
								col_ = (col_previus > col) ? col_previus - 1 : col_previus + 1;
								div_id = 'row-' + (row - 1) + "-col-" + col_;
								$("#" + div_id).empty();
							}
						}
					}
				},

			});
		}
	}

	/*for(i = 0; i< 8; i++) {
		for(y = 0; y < 8; y++) {
			// Droppable
			col_id = 'row-' + i + '-col-' + y;
			$( "#"+col_id ).droppable({		  		
		  		drop:function(event, ui) {
		  			var row = parseInt($(this).attr("data-row"));
					var col = parseInt($(this).attr("data-col"));
					var row_previus = parseInt(ui.draggable.parent().attr("id").substr(4, 1));
					var col_previus = parseInt(ui.draggable.parent().attr("id").substr(10, 1));
					$(ui.draggable).appendTo($(this));
					if(ui.draggable.hasClass("ficha1")) {
						if((row - 2) == row_previus) {
							col_ = (col_previus > col) ? col_previus - 1 : col_previus + 1;
							div_id = 'row-' + (row - 1) + "-col-" + col_;
							$("#" + div_id).empty();
						}
					} else {
						if((row + 2) == row_previus) {
							col_ = (col_previus > col) ? col_previus - 1 : col_previus + 1;
							div_id = 'row-' + (row + 1) + "-col-" + col_;
							$("#" + div_id).empty();
						}
					}
		  		},
		  		accept: function(d) {
		  			var parentDiv = d.parent().prop('id');
					var row = parseInt(parentDiv.substr(4, 1));
					var col = parseInt(parentDiv.substr(10, 1));
					var row_drop = parseInt($(this).attr("data-row"));
					var col_drop = parseInt($(this).attr("data-col"));
						if (d.hasClass( "ficha1" )) {
						if((row_drop - 2) == row) {
							col_previus = (col > col_drop) ? col_drop + 1 : col_drop - 1;
							div_id = 'row-' + (row_drop - 1) + "-col-" + col_previus;
							return ($("#"+div_id).children().hasClass("ficha2") && ! $(this).children().length > 0 );
						}
						return ((row_drop - 1) == row && (col_drop -1 == col || col_drop + 1 == col) && (! $(this).children().length > 0 ));
					} else {
						if((row_drop + 2) == row) {
							col_previus = (col > col_drop) ? col_drop + 1 : col_drop - 1;
							div_id = 'row-' + (row_drop + 1) + "-col-" + col_previus;
							return ($("#"+div_id).children().hasClass("ficha1") && ! $(this).children().length > 0 );
						}
						return ((row_drop + 1) == row && (col_drop -1 == col || col_drop + 1 == col) && (! $(this).children().length > 0 ));
					}
					console.log(parentDiv);
		  		},


			});
		}
	}
	*/
	//disabled: true 
	//Funcion que se llama para comer. movida es la ficha2 que se dropea, comida es la ficha1 que come ficha2
	function comer(movida, comida, ui){
		/*
		//posicion en la que se dropea la ficha 2
		var rowf2 = parseInt($(movida).attr("data-row"));
		var colf2 = parseInt($(movida).attr("data-col"));
		console.log(rowf2)
		console.log(colf2)
		//posicion en la que estaba antes de ser movida
		var row_previusf2 = parseInt(ui.draggable.parent().attr("id").substr(4, 1));
		var col_previusf2 = parseInt(ui.draggable.parent().attr("id").substr(10, 1));
		console.log(row_previusf2)
		console.log(col_previusf2)
		//posicion en la que esta la ficha que sera comida
		var rowf1 = parseInt($(comida).attr("data-row"));
		var colf1 = parseInt($(comida).attr("data-col"));
		console.log(rowf1)
		console.log(colf1)
		//este if pregunta si se movio dos casillas hacia abajo y dos casillas hacia la derecha o la izquierda
		*/
		
		var parentDiv = movida.parent().prop('id');
		var row = parseInt(parentDiv.substr(4, 1));
		var col = parseInt(parentDiv.substr(10, 1));
		var row_drop = parseInt(movida.attr("data-row"));
		var col_drop = parseInt(movida.attr("data-col"));
		//var row = parseInt(parentDiv.prop('id').substr(4, 1));
		//var col = parseInt(parentDiv.prop('id').substr(10, 1));
		console.log(movida);
		console.log(parentDiv);
		console.log(row);
		console.log(col);
		console.log(row_drop);
		console.log(col_drop);
		comida.toggle("explode");
		/*
		if (rowf2 == row_previusf2+2 && (colf2 == col_previusf2+2 || colf2 == col_previusf2-2)) {
			//este if pregunta si la ficha paso por encima de la que sera comida al moverse
			if (rowf1 == row_previusf2 + 1 && (colf2 == col_previusf2+1 || colf2 == col_previusf2-1)){
				comida.toggle("explode");
			}
		}
		*/
		//TODO
	}
});