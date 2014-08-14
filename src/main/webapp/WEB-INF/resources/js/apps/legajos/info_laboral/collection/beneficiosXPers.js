define(['backbone', 'apps/legajos/info_laboral/model/resolsXMotivoPers'], function (Backbone, Resolucion) {

    var Resoluciones = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: Resolucion,
        setBeneficiosXPers: function(codigo,numserest){
            this.url='api/legajos/benefPers/'+codigo+"/"+numserest;
        }
    });
    return Resoluciones;
});