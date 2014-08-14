define([ 'backbone', 'marionette','hbs!apps/legajos/info_laboral/templates/tabla-licencias', 'apps/legajos/info_laboral/collection/licenciasXPers'],
    function (Backbone, Marionette, licTemplate,Resoluciones) {
        var resolucionesTab=Backbone.Marionette.ItemView.extend({

            template: licTemplate,
            collection: new Resoluciones(),

            fetchLicenciasXPers: function(codigo,numserest,callback){
                this.collection.setLicenciasXPers(codigo,numserest);
                this.collection.on("sync", this.render, this);
                this.collection.fetch().done(callback);
            }

        })
        return resolucionesTab;

    });
