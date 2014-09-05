
define([ 'backbone', 'marionette','hbs!apps/contratosCas/contratos/templates/listar_cargos', 'apps/contratosCas/contratos/collection/listar_cargos'],
    function (Backbone, Marionette, ListarCargosTemp,ListarCargosColl) {
        var listarCargos=Backbone.Marionette.ItemView.extend({

            template: ListarCargosTemp,
            collection: new ListarCargosColl(),

            fetchCargos: function(){

                this.collection.on("sync", this.render, this);
                this.collection.fetch().done();
            }

        })
        return listarCargos/*Mygrid*/;

    });


