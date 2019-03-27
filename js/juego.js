$(document).ready(function() {
		for(i = 1; i<= 8; i++) {
		x = (i % 2 == 0) ? 1 : 0;
		$("#contenedor").append("<div id=row-" + i + " class='row'></div>")
		for(j = 1; j<= 8; j++) {
			if(j % 2 == x) {
				col_id = 'row-' + i + '-col-' + j;
				$("#row-" + i).append("<div class='col-white' data-row= "+i+" data-col="+j+" id=" + col_id + "></div>");
				if( i <= 3 ) {
					ficha_id = 'f1-' + 'row-' + i + '-col-' + j;
					$("#"+ col_id).append("<div class='ficha2' id="+ ficha_id +"></div>");
				}
				if( i >= 6) {
					ficha_id = 'f2-' + 'row-' + i + '-col-' + j;
					$("#"+ col_id).append("<div class='ficha1' id="+ ficha_id +"></div>");
				}
			}
			else{
				$("#row-" + i).append("<div class='col-black'></div>");
			}

		}
	}
	//$(".ficha1").draggable({ revert: 'invalid' });
	$(".ficha2").draggable({ revert:'invalid',opacity: 0.5,revertDuration: 1000,containment: $("#colcenter")});
	var grid = $( ".ficha2" ).draggable( "option", "containment" );
	for (i = 0; i <8; i++){
		for(y = 0; y <8; y++){
			$( "#row-"+i+"-col-"+y ).droppable({
			//$( "#row-1-col-21" ).droppable({
  				accept: ".ficha2",
  				drop:function(event, ui) {
				  $( ".ficha1" ).toggle( "explode" );
				  $( )
  				}

			});
		}
	}

	console.log(grid);
	//disabled: true 
});