define(['backbone', 'apps/reportes/form/model/regpenservidor'], function (Backbone, RegPenServidorModel) {

    var RegPenServidor = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: RegPenServidorModel,
        url: 'api/reportes/regpenservidor' ,

    });
    return RegPenServidor;
});
