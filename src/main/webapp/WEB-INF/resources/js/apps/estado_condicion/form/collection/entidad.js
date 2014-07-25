define(['backbone', 'apps/estado_condicion/form/model/entidad'], function (Backbone, EntidadModel) {

    var Entidad = Backbone.Collection.extend({

        // Reference to this collection's model.


        model: EntidadModel,
        setUrl: function(valor1){
            this.url= 'api/estado_condicion/entidad/'+valor1;
        }
    });
    return Entidad;
});
