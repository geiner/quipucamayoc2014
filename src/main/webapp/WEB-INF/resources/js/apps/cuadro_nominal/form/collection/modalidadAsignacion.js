define(['backbone','apps/cuadro_nominal/form/model/modalidadAsignacion'], function(Backbone, modalidad){
    var mAsig = Backbone.Collection.extend({
        model: modalidad,


        // Reference to this collection's model.

        url: 'api/cuadro_nominal/modalidad'


    });
    return mAsig;
});

