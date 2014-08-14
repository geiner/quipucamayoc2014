define([ 'backbone', 'marionette','hbs!apps/legajos/info_laboral/templates/tabla-meriDeme', 'apps/legajos/info_laboral/collection/meriDemeXPers'],
    function (Backbone, Marionette, meriDemeTemplate,Resoluciones) {
        var resolucionesTab=Backbone.Marionette.ItemView.extend({

            template: meriDemeTemplate,
            collection: new Resoluciones(),

            fetchMeriDemeXPers: function(codigo,numserest,callback){
                this.collection.setMeriDemeXPers(codigo,numserest);
                this.collection.on("sync", this.render, this);
                this.collection.fetch().done(callback);
            }

        })
        return resolucionesTab;

    });
