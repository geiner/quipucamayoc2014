define([ 'backbone', 'marionette','hbs!apps/reportes/form/templates/tiposervidorinfo', 'apps/reportes/form/collection/tiposervidorinfo'],
    function (Backbone, Marionette, TipoServidorInfoTemp, TipoServidorInfoColl) {
        var TipoServidorInfo=Backbone.Marionette.ItemView.extend({

            template: TipoServidorInfoTemp,
            collection: new TipoServidorInfoColl(),


            getTipoServidorInfo: function(){

                this.collection.on("sync", this.render, this);
                this.collection.fetch().done();

            }

        })
        return TipoServidorInfo;

    });
