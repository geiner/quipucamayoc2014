define(['backbone', 'apps/reportes/form/model/estservidor'], function (Backbone, EstServidorModel) {

    var EstServidor = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: EstServidorModel,
        url: 'api/reportes/estservidor'

    });
    return EstServidor;
});
