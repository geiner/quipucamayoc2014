define([ 'backbone', 'marionette','hbs!apps/reportes/form/templates/estservidor', 'apps/reportes/form/collection/estservidor'],
    function (Backbone, Marionette, EstServidorTemp, EstServidorColl) {
        var EstServidor=Backbone.Marionette.ItemView.extend({

            template: EstServidorTemp,
            collection: new EstServidorColl,


            getEstServidor: function(){

                this.collection.on("sync", this.render, this);
                this.collection.fetch().done();

            }

        })
        return EstServidor;

    });
