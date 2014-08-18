define([ 'backbone', 'marionette','hbs!apps/reportes/form/templates/tipagoservidor', 'apps/reportes/form/collection/tipagoservidor'],
    function (Backbone, Marionette, TiPagoServidorTemp, TiPagoServidorColl) {
        var TiPagoServidor=Backbone.Marionette.ItemView.extend({

            template: TiPagoServidorTemp,
            collection: new TiPagoServidorColl,


            getTiPagoServidor: function(){

                this.collection.on("sync", this.render, this);
                this.collection.fetch().done();

            }

        })
        return TiPagoServidor;

    });
