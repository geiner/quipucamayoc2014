define([ 'jquery', 'backbone', 'marionette','hbs!apps/estado_condicion/form/templates/tablaPlazasAsignadas', 'apps/estado_condicion/form/collection/plazasAsignadas'],
    function ($, Backbone, Marionette, plazasCAPTemplate, Plazas) {

        var plazasAsignadasCAPView = Backbone.Marionette.ItemView.extend({
            template: plazasCAPTemplate,
            collection: new Plazas(),

            mostrarPlazasAsignadasSegunDependencias: function(codServidor,callback){

                this.collection.setUrlPlazasAsignadasPorDependencia(codServidor)
                this.collection.on("sync", this.render, this);
                this.collection.fetch().done(callback);
            }

        });
        return plazasAsignadasCAPView;
    }
);