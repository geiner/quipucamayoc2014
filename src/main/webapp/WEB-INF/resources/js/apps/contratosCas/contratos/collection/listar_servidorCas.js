define(['backbone', 'apps/contratosCas/contratos/model/listar_servidorCas'], function (Backbone, Servidor) {

    var listarServidorCas = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: Servidor,

        url: 'api/contratosCas/servidorCas'

    });
    return listarServidorCas;
});
