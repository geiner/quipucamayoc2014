define(['backbone', 'apps/contratosCas/contratos/model/listar_plazas'], function (Backbone, PlazaCAS) {

    var listarPlazas = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: PlazaCAS,
        setUrl55: function(udid){
            this.url= 'api/contratosCas/plazas/'+udid;
        }


    });
    return listarPlazas;
});


