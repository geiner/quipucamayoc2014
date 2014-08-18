define([ 'backbone', 'marionette','hbs!apps/reportes/form/templates/tiposervidor', 'apps/reportes/form/collection/tiposervidor'],
    function (Backbone, Marionette, TipoServidorTemp, TipoServidorColl) {
        var TipoServidor=Backbone.Marionette.ItemView.extend({

            template: TipoServidorTemp,
            collection: new TipoServidorColl(),


            getTipoServidor: function(){

                this.collection.on("sync", this.render, this);
                this.collection.fetch().done();

            }

        })
        return TipoServidor;

    });
