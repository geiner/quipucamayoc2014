
define([ 'backbone', 'marionette','hbs!apps/contratosCas/contratos/templates/listar_plazas', 'apps/contratosCas/contratos/collection/listar_plazas'],
    function (Backbone, Marionette, ListarPlazasTemp,ListarPlazasColl) {
        var listarPlazas=Backbone.Marionette.ItemView.extend({

            template: ListarPlazasTemp,
            collection: new ListarPlazasColl(),

            fetchPlazas: function(udid,callback){
                this.collection.setUrl55(udid)
                this.collection.on("sync", this.render, this);
                this.collection.fetch().done(callback);
            }

        })
        return listarPlazas/*Mygrid*/;

    });



