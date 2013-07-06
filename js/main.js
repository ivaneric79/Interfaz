function getAgentes () {

	$.ajax({
		type: "POST",
		//url: "http://10.32.127.5/thmovil/com/getagente.asp"
url: "http://intranet.xube.com.mx/thmovil/com/getagente.asp"
}).done(function(respuesta) {
	var parsed = JSON.parse(respuesta);

	$.each(parsed, function(i, val) {
		$('#agente').append('<option value="'+val.CLV_VEND+'">'+val.NOMBRE+'</option>');


	});

	var myselect = $( "#agente" );

	myselect.selectmenu( "refresh" );


});
}




function getclientes () {
	//obtiene lista de clientes
	
	$.ajax({
		type: "POST",
//url: "http://intranet.xube.com.mx/thmovil/com/getclientes.asp"
url: "http://intranet.xube.com.mx/thmovil/com/getclientes.asp"
//url: "http://10.32.127.5/thmovil/com/asp/getclientes.asp"
}).done(function(respuesta) {
	var clientes = JSON.parse(respuesta);
	
	$.each(clientes, function(i, val) {
		$('#clientes').append('<li data-icon="plus" data-iconpos="right"><a id="'+$.trim(val.CCLIE)+'" href="#" credito="'+val.DIASCRED+'" precios="'+val.LISTA_PREC+'" nombre="'+val.NOMBRE+'" onclick="clickCliente(this);">'+$.trim(val.CCLIE)+' - '+val.NOMBRE+'</a></li>');


	});

	//var myselect = $( "#clientes" );
    //myselect.selectmenu( "refresh" );
    

});

}

function getProductos(lista){

	$.ajax({
		type: "POST",

//url: "http://10.32.127.5/thmovil/com/asp/getproductos.asp"
url: "http://intranet.xube.com.mx/thmovil/com/getproductos.asp"
, data: {
	lista: lista
}
}).done(function(respuesta) {
	var productos = JSON.parse(respuesta);
	
	$.each(productos, function(i, val) {
		$('#lproductos').append('<li data-icon="plus" data-iconpos="right"><a id="'+$.trim(val.CLV_ART)+'" href="#" pdescripcion="'+$.trim(val.DESCR)+'" pprecio="'+$.trim(val.PRECIO)+'" onclick="clickProducto(this);">'+$.trim(val.CLV_ART)+' - ' +$.trim(val.DESCR)+'</a></li>');

	});
});

}

function clickCliente(elemento) {
	
	var cid = $(elemento).attr('id');
	var ccredito = parseInt($(elemento).attr('credito'));
	var cnombre = $(elemento).attr('nombre');
	var cprecios = $(elemento).attr('precios');


	$('.clienterow h2').text(cnombre);
	if (ccredito > 0) {
		$('.clienterow .ccpago').text('Credito');
	}else{
		$('.clienterow .ccpago').text('Contado');
	}

	$('.clienterow .ccclave').text(cid);

	$('.clienterow').removeClass('hidden');

	$('#page2 .ui-listview-filter .ui-icon-delete').click();
   $('.okpedido').show();
   $('.clienterow').show();
	return false;

	// body...
}

function clickProducto(elemento) {
		var pprecio = $(elemento).attr('pprecio');
		var pdescripcion = $(elemento).attr('pdescripcion');
		var pid = $(elemento).attr('id');
		if ($("a[pclave='"+pid+"']").length > 0){


  var cantnew = parseInt($("a[pclave='"+pid+"'] .cantidad").text());
  $("a[pclave='"+pid+"'] .cantidad").text(cantnew+1);


  $('.ui-listview-filter .ui-input-clear').click();
  total();

}else{
	$('.productlist').append('<li class="linea"><a href="#mas" data-rel="popup" data-position-to="window" data-transition="pop" pclave="'+pid+'" class="partida" onclick="partidaClick(this)"><span class="cantidad">1</span><span class="producto">'+pdescripcion+'</span><span class="precio">'+pprecio+'</span></a><a href="#" onclick="eliminapartida(this)">Eliminar</a><div class="clear"></div></li>');
	$(".productlist").listview("refresh");
	$('.ui-listview-filter .ui-input-clear').click();
	total();
}
}

function partidaClick(obj){
	
	
	$('#paid').text($(obj).attr('pclave'));

	// body...

}

function eliminapartida(obj) {
	console.log('Eliminar');
	$(obj).parent().remove();
	total();
	// body...
}

function total() {
	// body...
	var total = 0;
	$( "li.linea" ).each(function(index) {


		total = total + parseFloat($(".precio",this).text()).toFixed(2)*parseInt($(".cantidad",this).text());



	});

	$("#total").text(total);
}


function terminarpedido() {

	// body...

	var productos = [];

	$( "li.linea" ).each(function(index) {

		productos.push({ 
			"idArt" : $(".partida",this).attr("pclave"),
			"cantArt"  : $(".cantidad",this).text()

		});

	});

	console.log(productos);
    var total = $('#total').text();
    var cliente = $('#info').attr('clienteid');
    var foliop = $('#info').attr('foliopedido');
    var agente = $('#info').attr('idagente');
    var tipoventa = $('#info').attr('tipoventa');
    var pedidocliente = $('#pedidocliente').val();

    	$.ajax({
		type: "POST",

data: {
	total : total,
	cleinte: cliente,
	pedidocliente: pedidocliente,
	tipoventa: tipoventa,
	partidas: productos
},
//url: "http://10.32.127.5/thmovil/com/asp/pedido.asp"
url: "http://intranet.xube.com.mx/thmovil/com/pedido.asp"
}).done(function(respuesta) {
	
});



	return true;
}




$(document).ready(function() {



	getAgentes();
	getclientes();


	$('#iniciar').click(function(){
		var agenteid = $("#agente option:selected").val();
		var anip = $.md5($("#anip").val());
		console.log(agenteid);
		console.log(anip);
//funcion de login
//guardar agenteid y anip
$.ajax({
	type: "POST",

//url: "http://10.32.127.5/thmovil/com/asp/loginagente.asp",
url: "http://intranet.xube.com.mx/thmovil/com/loginagente.asp",
data: { id: $.trim(agenteid), psw: anip }
}).done(function(respuesta) {
	
	if (respuesta = true){


	}else{


	}


});

$('.info').attr('idagente',$.trim(agenteid));
$.mobile.changePage( "#page2", {
	transition: "slide"
});



});

	




	$('#bpedido').click(function(){
		//obtener folio pedido
		// guardar variable

		$('.info').attr('tipoventa','P');
		$('.info').attr('foliopedido','Fpedido');

		$.mobile.changePage( "#page4", {
			transition: "slide"
		});
	});

	$('#bdevolucion').click(function(){
		//obtener folio devolucion
		//guardar variable
		$('.info').attr('tipoventa','D');
		$('.info').attr('foliopedido','Fdevolucion');

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
		var id = $('#paid').text();
		$("a[pclave='"+id+"'] .cantidad").text(c);
		$('#paid').text('');
		$('.popcant').popup('close');
		total();
	// body...

});


	$('.okpedido').click(function() {


		$('.info').attr('clienteid',$('.ccclave').text());
		$('.info').attr('listadeprecios','9');



		//obtener lista de precios
		//guardar variable
		var lista = $('.info').attr('listadeprecios');
		console.log(lista+ ' lista de precios');
		getProductos(lista);
		$.mobile.changePage( "#page3", {
			transition: "slide"
		});
	// body...
});
$('.clienterow a').click(function(event) {
	
 event.preventDefault();
$('.clienterow').hide();
$('.okpedido').hide();

});
	

	$('#lproductos li a').click(function() {
		var pprecio = $(this).attr('pprecio');
		var pdescripcion = $(this).attr('pdescripcion');
		var pid = $(this).attr('id');
		if ($("a[pclave='"+pid+"']").length > 0){


  var cantnew = parseInt($("a[pclave='"+pid+"'] .cantidad").text());
  $("a[pclave='"+pid+"'] .cantidad").text(cantnew+1);


  $('.ui-listview-filter .ui-input-clear').click();
  total();

}else{
	$('.productlist').append('<li class="linea"><a href="#mas" data-rel="popup" data-position-to="window" data-transition="pop" pclave="'+pid+'" class="partida" onclick="partidaClick(this)"><span class="cantidad">1</span><span class="producto">'+pdescripcion+'</span><span class="precio">'+pprecio+'</span></a><a href="#" onclick="eliminapartida(this)">Eliminar</a><div class="clear"></div></li>');
	$(".productlist").listview("refresh");
	$('.ui-listview-filter .ui-input-clear').click();
	total();
}

	// body...
});


	$('#enviarpedido').click(function() {
	// body...
	var stats = terminarpedido();
});






});