define([ 'backbone', 'marionette','hbs!apps/legajos/info_laboral/templates/tabla-inves', 'apps/legajos/info_laboral/collection/invesXPers'],
    function (Backbone, Marionette, invesTemplate,Resoluciones) {
        var resolucionesTab=Backbone.Marionette.ItemView.extend({

            template: invesTemplate,
            collection: new Resoluciones(),

            fetchInvesXPers: function(codigo,numserest,callback){
                this.collection.setInvesXPers(codigo,numserest);
                this.collection.on("sync", this.render, this);
                this.collection.fetch().done(callback);
            }

        })
        return resolucionesTab;

    });
