define(['backbone', 'apps/legajos/info_laboral/model/resolsXMotivoPers'], function (Backbone, Resolucion) {

    var Resoluciones = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: Resolucion,
        setMeriDemeXPers: function(codigo,numserest){
            this.url='api/legajos/meriDemePers/'+codigo+"/"+numserest;
        }
    });
    return Resoluciones;
});
