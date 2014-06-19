define([ 'jquery', 'backbone', 'marionette','hbs!apps/cuadro_nominal/form/templates/modalidadAsignacion', 'apps/cuadro_nominal/form/collection/modalidadAsignacion'],
    function ($, Backbone, Marionette, plazasCAPTemplate, Plazas) {

        var plazasCAPView = Backbone.Marionette.ItemView.extend({
            template: plazasCAPTemplate,
            collection: new Plazas(),

            mostrarModalidades: function(callback){

                this.collection.setUrlModalidades()
                this.collection.on("sync", this.render, this);
                this.collection.fetch().done(callback);
            }

        });
        return plazasCAPView;
    }
);