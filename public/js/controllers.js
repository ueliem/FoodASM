var fasmControllers = angular.module('fasmControllers', []);

fasmControllers.controller('SearchController', ['$scope', '$http', 'searchResultsService',
    function($scope, $http, searchResultsService) {

        $scope.get_recipes_by_ingredients = function(item) { searchResultsService.get_recipes_by_ingredients(item) };
    }
]);
