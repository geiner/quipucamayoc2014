define([ 'backbone', 'marionette','hbs!apps/legajos/form/templates/tabla-carreraLaboral', 'apps/legajos/form/collection/resolsXMotivoPers'],
    function (Backbone, Marionette, carrLaboralTemplate,Resoluciones) {
        var resolucionesTab=Backbone.Marionette.ItemView.extend({

            template: carrLaboralTemplate,
            collection: new Resoluciones(),

            fetchResolsXMotivoPers: function(codigo,callback){
                this.collection.setResolsXMotivoPers(codigo);
                this.collection.on("sync", this.render, this);
                this.collection.fetch().done(callback);
            }

        })
        return resolucionesTab;

    });
