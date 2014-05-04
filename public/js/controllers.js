var fasmControllers = angular.module('fasmControllers', []);

fasmControllers.controller('SearchController', ['$scope', '$http', '$location', 'searchResultsService',
    function($scope, $http, $location, searchResultsService) {
        $scope.cur_search = "";
        $scope.get_recipes_by_ingredients = function(cur_search) {
            var requrl = "https://api.pearson.com/v2/foodanddrink/recipes?search=" + cur_search;
            $http.get(requrl)
            .success(function(data) {
                //console.log("Something not as bad happened.");
                var numrecipes = data.count;
                var recipes = data.results;
                searchResultsService.put_recipes(recipes);
                searchResultsService.numrecipes = numrecipes;
                searchResultsService.previous_query = cur_search;
                $location.url("/searchresults");
            }).error(function(data) {
                console.log("Something horrible happened.");
            });
        };
    }
]);

fasmControllers.controller('SearchResultsController', ['$scope', '$http', 'searchResultsService',
    function($scope, $http, searchResultsService) {
        $scope.previous_query = searchResultsService.previous_query;
        $scope.recipe_count = searchResultsService.numrecipes;
        $scope.recipes = searchResultsService.recipes;
    }
]);
