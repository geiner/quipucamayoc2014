define(['backbone', 'apps/estado_condicion/form/model/mostrarNumContratoCAS'], function (Backbone, mostrarNumContratoCASModel) {

    var NroContratoCAS = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: mostrarNumContratoCASModel,
        setUrlCas: function(serCodCas, numSerestCas){
        this.url= 'api/estado_condicion/contratocas/'+serCodCas+'/'+numSerestCas;
        }
    });
    return NroContratoCAS;
});
