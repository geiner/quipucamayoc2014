define([ 'jquery', 'backbone', 'marionette','hbs!apps/estado_condicion/form/templates/tablaHistorialPlazas', 'apps/estado_condicion/form/collection/historialPlazas'],
    function ($, Backbone, Marionette, plazasCAPTemplate, Plazas) {
             console.log("View diferente");
        var historialPlazaView = Backbone.Marionette.ItemView.extend({
            template: plazasCAPTemplate,
            collection: new Plazas(),

            mostrarHistorialPlaza: function(codPlaza,callback){

                this.collection.setUrlHistorialPlaza(codPlaza)
                this.collection.on("sync", this.render, this);
                this.collection.fetch().done(callback);
            }

        });
        return historialPlazaView;
    }
);