define([ 'backbone', 'marionette','hbs!apps/estado_condicion/form/templates/mostrarNumContratoCAS'],
    function (Backbone, Marionette, numContratoCASTemp) {
        var NroContratoCAS=Backbone.Marionette.ItemView.extend({

            template: numContratoCASTemp//,
         //   collection: new numContratoCASColl(),


         /*   getContratoCAS: function(serCod,numSerest,callback){
                //this.collection.setUrl();
                this.collection.setUrlCas(serCod,numSerest);
                this.collection.on("sync", this.render, this);
                this.collection.fetch().done(callback);

            }*/

        })
        return NroContratoCAS;

    });
