define(['backbone', 'apps/legajos/form/model/resolsXMotivoPers'], function (Backbone, Resolucion) {

    var Resoluciones = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: Resolucion,
        setResolsXMotivoPers: function(codigo){
            this.url='api/legajos/resolsMotivo/'+codigo;
        }
    });
    return Resoluciones;
});
