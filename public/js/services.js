var fasmServices = angular.module('fasmServices', []);

fasmServices.service('searchResultsService', function() {

    var recipes = [];
    var numrecipes = 0;
    var previous_query = "";
    this.put_recipes = function(recipes) {
        this.recipes = recipes;
    }
    this.get_recipes = function() {
        return this.recipes;
    }
});

fasmServices.service('singleRecipeService', function() {

    var recipe = [];
    this.put_recipe = function(recipe) {
        this.recipe = recipe;
    }
    this.get_recipe = function() {
        return this.recipe;
    }
});
