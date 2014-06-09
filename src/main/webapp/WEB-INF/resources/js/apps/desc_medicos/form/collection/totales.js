define(['backbone', 'apps/desc_medicos/form/model/total'], function (Backbone, Total) {

    var Totales = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: Total,
        setUrl: function(codigo,numserest){
            this.url='rest/descansos/acumulado/codigo/'+codigo+'/numserest/'+numserest;
        }
    });
    return Totales;
});