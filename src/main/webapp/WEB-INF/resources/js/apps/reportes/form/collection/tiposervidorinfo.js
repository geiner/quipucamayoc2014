define(['backbone', 'apps/reportes/form/model/tiposervidorinfo'], function (Backbone, TipoServidorInfoModel) {

    var TipoServidorInfo = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: TipoServidorInfoModel,
        url: 'api/reportes/tiposervidor'

    });
    return TipoServidorInfo;
});
