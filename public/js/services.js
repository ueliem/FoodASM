var fasmServices = angular.module('fasmServices', []);

fasmServices.service('searchResultsService', function() {

    var recipes = [];
    var numrecipes = 0;

    this.put_recipes = function(recipes) {
        this.recipes = recipes;
    }
    this.get_recipes = function() {
        return this.recipes;
    }
});
