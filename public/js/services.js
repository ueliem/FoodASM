var fasmServices = angular.module('fasmServices', []);

fasmServices.service('searchResultsService', function() {

    var recipes = [];
    var numrecipes = 0;

    this.get_recipes_by_ingredients = function(ingredientname) {
        $http.jsonp("https://api.pearson.com/v2/foodanddrink/recipes?search=" + ingredientname)
        .success(function(data) {
            numrecipes = data.count;
            recipes = data.results;
        }).error(function(data) {
            console.log("Something horrible happened.");
        })
    };
});
