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
