var fasmApp = angular.module('fasmApp', [
  'ngRoute',
  'fasmControllers',
  'fasmServices',
]);

fasmApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/mainsearch',
        controller: 'SearchController'
      }).
      when('/searchresults', {
        templateUrl: 'partials/searchresults',
        controller: 'SearchResultsController'
      }).
      when('/recipe', {
        templateUrl: 'partials/singlerecipeview',
        controller: 'SingleRecipeController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
