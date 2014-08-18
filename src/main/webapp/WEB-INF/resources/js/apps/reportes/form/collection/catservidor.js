define(['backbone', 'apps/reportes/form/model/catservidor'], function (Backbone, CatServidorModel) {

    var CatServidor = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: CatServidorModel,
        url: 'api/reportes/catservidor' ,

    });
    return CatServidor;
});
