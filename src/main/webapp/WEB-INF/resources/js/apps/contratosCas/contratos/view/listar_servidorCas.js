
define([ 'backbone', 'marionette','hbs!apps/contratosCas/contratos/templates/listar_servidorCas', 'apps/contratosCas/contratos/collection/listar_servidorCas'],
    function (Backbone, Marionette, ListarServidorCasTemp,ListarServidorCasColl) {
        var listarServidorCas=Backbone.Marionette.ItemView.extend({

            template: ListarServidorCasTemp,
            collection: new ListarServidorCasColl(),

            fetchServCas: function(){

                this.collection.on("sync", this.render, this);
                this.collection.fetch().done();
            }

        })
        return listarServidorCas/*Mygrid*/;

    });


