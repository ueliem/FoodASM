var fasmControllers = angular.module('fasmControllers', []);

fasmControllers.controller('SearchController', ['$scope', '$http', 'searchResultsService',
    function($scope, $http, searchResultsService) {
        $scope.cur_search = "";
        $scope.get_recipes_by_ingredients = function(cur_search) {
            var requrl = "https://api.pearson.com/v2/foodanddrink/recipes?search=" + cur_search;
            $http.get(requrl)
            .success(function(data) {
                console.log("Something not as bad happened.");
                var numrecipes = data.count;
                var recipes = data.results;
            }).error(function(data) {
                console.log("Something horrible happened.");
            });



            //searchResultsService.get_recipes_by_ingredients(cur_search); console.log("SEARCHED");
        };
    }
]);
