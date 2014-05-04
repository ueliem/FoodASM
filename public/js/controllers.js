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

fasmControllers.controller('SearchResultsController', ['$scope', '$http', '$location', 'searchResultsService', 'singleRecipeService',
    function($scope, $http, $location, searchResultsService, singleRecipeService) {
        $scope.previous_query = searchResultsService.previous_query;
        $scope.recipe_count = searchResultsService.numrecipes;
        $scope.recipes = searchResultsService.recipes;
        $scope.get_single_recipe = function(id) {
            //console.log("TESTMESSAGE");
            var requrl = "https://api.pearson.com/v2/foodanddrink/recipes/" + id;
            $http.get(requrl)
            .success(function(data) {
                //console.log("Something not as bad happened.");
                var recipe = data.result;
                singleRecipeService.put_recipe(recipe);
                $location.url("/recipe");
            }).error(function(data) {
                console.log("Something horrible happened.");
            });
        };
    }
]);

fasmControllers.controller('SingleRecipeController', ['$scope', '$http', '$location', 'singleRecipeService',
    function($scope, $http, $location, singleRecipeService) {
        $scope.current_recipe = singleRecipeService.get_recipe();
        $scope.ingredient_status = [];
        /*$scope.populate_status = function() {
            for (ingredient in $scope.current_recipe.ingredients) {
                ingredient_status.push({"name": ingredient.name, "checked": false});
            }
        };*/
        $scope.export_evernote = function() {
            console.log("TESTMESSAGE");
            var requrl = "/export";
            $http.post(requrl, $scope.current_recipe.ingredients)
            .success(function(data) {
                console.log("Something not as bad happened.");
                $location.url("/");
            }).error(function(data, status, headers, config) {
                console.log("Something horrible happened.");
                console.log(data);
                console.log(status);
                console.log(headers);
            });
        };
    }
]);
