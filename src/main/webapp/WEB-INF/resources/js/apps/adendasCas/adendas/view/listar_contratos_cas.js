
define([ 'backbone', 'marionette','hbs!apps/adendasCas/adendas/templates/listar_contratos_cas', 'apps/adendasCas/adendas/collection/listar_contratos_cas'],
    function (Backbone, Marionette, ListarContratosCasTemp,ListarContratosCasColl) {
        var listarContratos=Backbone.Marionette.ItemView.extend({

            template: ListarContratosCasTemp,
            collection: new ListarContratosCasColl(),

            fetchContratos: function(udid,callback){
                this.collection.setUrl58(udid);
                this.collection.on("sync", this.render, this);
                this.collection.fetch().done(callback);
            }

        })
        return listarContratos/*Mygrid*/;

    });



