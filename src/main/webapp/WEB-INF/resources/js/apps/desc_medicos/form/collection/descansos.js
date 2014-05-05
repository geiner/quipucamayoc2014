define(['backbone', 'apps/desc_medicos/form/model/descanso'], function (Backbone, Descanso) {

    var DescansosMedicos = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: Descanso,
        setUrl: function(codigo,numserest){
            this.url='rest/descansos/codigo/'+codigo+'/numserest/'+numserest;
        }
    });
    return DescansosMedicos;
});