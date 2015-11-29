 app.config(['$routeProvider','$locationProvider', '$httpProvider',
 	function($routeProvider, $locationProvider, $httpProvider){
			//$httpProvider.defaults.headers.common.Authorization = 'Token 1';
			$routeProvider.
			when('/dashboard', {
				templateUrl: 'dashboard.html',
				controller: 'cont1'
			})
			.when('/ventas',{
				templateUrl: 'ventas.html'
			})
			.when('/requisicion',{
				templateUrl: 'requisicion.html',
				controller:'RequisicionController'
			})
			.when('/inventario',{
				templateUrl:'inventario.html'
			})
			.when('/recetas',{
				templateUrl:'recetas.html'
			})
			.otherwise({
				redirectTo: '/dashboard'
			});
		}
]);