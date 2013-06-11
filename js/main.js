function getAgentes () {

$.ajax({
type: "POST",
url: "http://10.32.127.5/thmovil/com/getagente.asp"
}).done(function(respuesta) {
	var parsed = JSON.parse(respuesta);
	console.log(parsed);
   $.each(parsed, function(i, val) {
	$('#agente').append('<option value="'+val.CLV_VEND+'">'+val.NOMBRE+'</option>');


   });

	var myselect = $( "#agente" );

    myselect.selectmenu( "refresh" );
    

});
}




function getclientes (idagente) {
	//obtiene lista de clientes

}


$(document).ready(function() {



	getAgentes();	

	$('#iniciar').click(function(){
		var agenteid = $("#agente option:selected").val();
		var anip = $("#anip").val();
//funcion de login
//guardar agenteid y anip




		$.mobile.changePage( "#page2", {
			transition: "slide"
		});
	});

	$('#bpedido').click(function(){
		//obtener folio pedido
		// guardar variable

		$.mobile.changePage( "#page3", {
			transition: "slide"
		});
	});

	$('#bdevolucion').click(function(){
		//obtener folio devolucion
		//guardar variable

		$.mobile.changePage( "#page3", {
			transition: "slide"
		});
	});

	$('#irpedido').click(function(){
		var clienteid = $("#agente option:selected").val();
		//obtener lista de precios
		//guardar variable

		$.mobile.changePage( "#page4", {
			transition: "slide"
		});
	});


$('.mas').click(function() {
	var valor = parseInt($('.cant').val());
	$('.cant').val(valor + 1);

	// body...
});

$('.menos').click(function() {
	var valor = parseInt($('.cant').val());
	if (valor > 1){
	$('.cant').val(valor - 1);
      }
	// body...
});

$('#bcantok').click(function() {

	var c = $('.cant').val();
	
	$('.cantidad').text(c);
	$('.popcant').popup('close');
	// body...
});





});