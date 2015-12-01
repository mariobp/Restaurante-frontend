var controllers = angular.module('controllers', []);


controllers.controller('cont1', ['$scope', '$http',
	function ($scope, $http) {
		$scope.hola=2;
	}
]);

controllers.controller('TabController', function(){
	this.tab = 1;

	this.selectTab = function(tab){
		this.tab = tab;
	};

	this.isSelect = function(tab){
		return this.tab === tab;
	};
});

controllers.controller('RequisicionController',['$scope',function($scope){
	$('.datepicker').pickadate({
	    selectMonths: true, // Creates a dropdown to control month
	    selectYears: 15 ,// Creates a dropdown of 15 years to control year
	    today: 'Hoy',
		clear: 'Limpiar',
		close: 'Cerrar',
		labelMonthNext: 'Proximo mes',
		labelMonthPrev: 'Mes anterior',
		labelMonthSelect: 'Seleccionar un mes',
		labelYearSelect: 'Seleccionar un año',
		monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
		weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
		weekdaysShort: ['Dom', 'LUn', 'Mar', 'Mier', 'Jue', 'Vier', 'Sab'],
	});
	$scope.requesiciones = [
		{
			"id":1,
			"nombre":"Requesicion 1",
			"usuario": "Mario"
		},
		{
			"id":2,
			"nombre":"Requesicion 2",
			"usuario": "Jose"
		},
		{
			"id":2,
			"nombre":"Requesicion 3",
			"usuario": "Ramos"
		}
	];
	$scope.openModal = function(){
		$('#modal1').openModal();
		$('select').material_select();
	};
	$scope.addForm = addForm;
}]);

var addForm = controllers.directive('addForm', function(){
	return {
		restrict:'E',
		templateUrl:'formRequisicion.html',
		controller: 'formControllers',
		controllerAs:'formController'
	}
});

controllers.controller('formControllers', ['$http','$scope', function($http, $scope){
	$scope.productos = [
		{
			"id":1,
			"nombre": "Producto 1"
		},
		{
			"id":2,
			"nombre":"Producto 2"
		}
	];
/*
	$http.get('/inventario/producto/list/').success(function(data){
			$scope.productos = data.object_list
		});*/

	var data = $scope.data = [];
	$scope.total = 2;
	$scope.range = function(min, max, step){
	    var step = step || 1;
	    var input = [];
	    for (var i = min; i <= max; i += step) input.push(i);
	    $('select').material_select();
	    return input;
	};
	$scope.enviarForm = function(){
		console.log(data);
		var dataSend = {};
		if(data.codigo){
			dataSend.codigo = data.codigo;
		}if(data.producto){
			for (p in data.producto ) {
				dataSend["solicituddeproducto_set-"+p+"-producto"] = data.producto[p];
			};
		}if(data.presentacion){
			for (k in data.presentacion) {
				dataSend["solicituddeproducto_set-"+k+"-presentacion"] = data.presentacion[k];
			};
		}if (data.cantidad) {
			for (h in data.cantidad) {
				dataSend["solicituddeproducto_set-"+h+"-cantidad"] = data.cantidad[h];
			}				
		}if (data.deletE) {
			for (d in data.deletE){
				dataSend["solicituddeproducto_set-"+d+"-DELETE"] = data.deletE[d];
			}
		};
		dataSend["csrfmiddlewaretoken"] = $("input[name='csrfmiddlewaretoken']").val();
		dataSend["solicituddeproducto_set-TOTAL_FORMS"] = $scope.total;
		dataSend["solicituddeproducto_set-INITIAL_FORMS"] = 0;
		dataSend["solicituddeproducto_set-MIN_NUM_FORMS"] = 0;
		dataSend["solicituddeproducto_set-MAX_NUM_FORMS"] = 1000;
		console.log(dataSend);
		$http.post('/inventario/requisiciondecompra/form/',dataSend).then(function doneCallbacks(response){

		}, function failCallbacks(response){

		});
		$('#modal1').closeModal();
		$scope.total = 2;
		$scope.data = [];
	};
	$scope.addStact = function(){
		$scope.total += 1;
	};
	var eliminar = [];
	$scope.selectDelete = function(num, bool){
		var index = eliminar.indexOf(num);
		if (index > -1 && !bool) {
		   eliminar.splice(index, 1);
		}if(index === -1 && bool){
			eliminar.push(num);
		}
	};
	$scope.hideSelect = function(){
		var index = 0;
		for(c in data.check){
			index = eliminar.indexOf(parseInt(c));
			if(index > -1){
				data.check[c] = true;
			}
		}
	};
}]);	