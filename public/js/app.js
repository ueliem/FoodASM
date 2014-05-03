var phonecatApp = angular.module('fasmApp', [
  'ngRoute',
  'fasmControllers',
]);

phonecatApp.config(['$routeProvider',
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
