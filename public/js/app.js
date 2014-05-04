var fasmApp = angular.module('fasmApp', [
  'ngRoute',
  'fasmControllers',
  'fasmServices',
]);

fasmApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '',
        controller: ''
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
