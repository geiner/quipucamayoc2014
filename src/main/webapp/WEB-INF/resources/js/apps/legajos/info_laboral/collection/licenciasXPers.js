define(['backbone', 'apps/legajos/form/model/resolsXMotivoPers'], function (Backbone, Resolucion) {

    var Resoluciones = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: Resolucion,
        setLicenciasXPers: function(codigo,numserest){
            this.url='api/legajos/licPers/'+codigo+"/"+numserest;
        }
    });
    return Resoluciones;
});
