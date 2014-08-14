define(['backbone', 'apps/legajos/info_laboral/model/resolsXMotivoPers'], function (Backbone, Resolucion) {

    var Resoluciones = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: Resolucion,
        setInvesXPers: function(codigo,numserest){
            this.url='api/legajos/invesPers/'+codigo+"/"+numserest;
        }
    });
    return Resoluciones;
});
