define(['backbone', 'apps/reportes/form/model/depservidor'], function (Backbone, DepServidorModel) {

    var DepServidor = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: DepServidorModel,
        url: 'api/reportes/depservidor' ,

    });
    return DepServidor;
});
