define(['backbone', 'apps/contratosCas/contratos/model/listar_cargos'], function (Backbone, CargoCAS) {

    var listarCargos = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: CargoCAS,

        url: 'api/contratosCas/cargos'

    });
    return listarCargos;
});
;