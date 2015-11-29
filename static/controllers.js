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

controllers.controller('RequisicionController', function(){
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

});