define([ 'backbone', 'marionette','hbs!apps/legajos/info_laboral/templates/tabla-beneficios', 'apps/legajos/info_laboral/collection/beneficiosXPers'],
    function (Backbone, Marionette, beneTemplate,Resoluciones) {
        var resolucionesTab=Backbone.Marionette.ItemView.extend({

            template: beneTemplate,
            collection: new Resoluciones(),

            fetchBeneficiosXPers: function(codigo,numserest,callback){
                this.collection.setBeneficiosXPers(codigo,numserest);
                this.collection.on("sync", this.render, this);
                this.collection.fetch().done(callback);
            }

        })
        return resolucionesTab;

    });

