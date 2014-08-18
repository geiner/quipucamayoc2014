define([ 'backbone', 'marionette','hbs!apps/reportes/form/templates/regpenservidor', 'apps/reportes/form/collection/regpenservidor'],
    function (Backbone, Marionette, RegPenServidorTemp, RegPenServidorColl) {
        var RegPenServidor=Backbone.Marionette.ItemView.extend({

            template: RegPenServidorTemp,
            collection: new RegPenServidorColl,


            getRegPenServidor: function(){

                this.collection.on("sync", this.render, this);
                this.collection.fetch().done();

            }

        })
        return RegPenServidor;

    });
