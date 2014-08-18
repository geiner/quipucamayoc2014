define([ 'backbone', 'marionette','hbs!apps/reportes/form/templates/depservidor', 'apps/reportes/form/collection/depservidor'],
    function (Backbone, Marionette, DepServidorTemp, DepServidorColl) {
        var DepServidor=Backbone.Marionette.ItemView.extend({

            template: DepServidorTemp,
            collection: new DepServidorColl,


            getDepServidor: function(){

                this.collection.on("sync", this.render, this);
                this.collection.fetch().done();

            }

        })
        return DepServidor;

    });
