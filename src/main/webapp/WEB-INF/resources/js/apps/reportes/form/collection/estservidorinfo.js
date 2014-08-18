define(['backbone', 'apps/reportes/form/model/estservidorinfo'], function (Backbone, EstServidorInfoModel) {

    var EstServidorInfo = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: EstServidorInfoModel,
        url: 'api/reportes/estservidor'

    });
    return EstServidorInfo;
});
