define(['backbone', 'apps/reportes/form/model/tiposervidor'], function (Backbone, TipoServidorModel) {

    var TipoServidor = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: TipoServidorModel,
        url: 'api/reportes/tiposervidor'

    });
    return TipoServidor;
});
