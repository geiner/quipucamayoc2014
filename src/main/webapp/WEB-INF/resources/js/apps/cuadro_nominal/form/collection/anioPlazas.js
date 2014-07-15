define(['backbone','apps/cuadro_nominal/form/model/plaza'], function(Backbone, anioPlaza){
    var anioPlaza = Backbone.Collection.extend({
        model: anioPlaza,


        // Reference to this collection's model.

        url: 'api/cuadro_nominal/anioPlazas'


    });
    return anioPlaza;
});

