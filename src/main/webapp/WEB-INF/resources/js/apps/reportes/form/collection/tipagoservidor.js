define(['backbone', 'apps/reportes/form/model/tipagoservidor'], function (Backbone, TiPagoServidorModel) {

    var TiPagoServidor = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: TiPagoServidorModel,
        url: 'api/reportes/tipagoservidor' ,

    });
    return TiPagoServidor;
});
