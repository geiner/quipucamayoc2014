define([ 'backbone', 'marionette','hbs!apps/estado_condicion/form/templates/listar_contratos', 'apps/estado_condicion/form/collection/listar_contratos'],
    function (Backbone, Marionette, ListarContratosTemp,ListarContratosColl) {
        var listarContratos=Backbone.Marionette.ItemView.extend({

            template: ListarContratosTemp,
            collection: new ListarContratosColl(),


            fetchContratos: function(codigo,callback){
                this.collection.setUrl(codigo);
                this.collection.on("sync", this.render, this);
                this.collection.fetch().done(callback);
            }

        })
        return listarContratos;

    });
