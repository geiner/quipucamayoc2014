define([ 'jquery', 'backbone', 'marionette','hbs!apps/cuadro_nominal/form/templates/tablaPlazasCAP', 'apps/cuadro_nominal/form/collection/plazas'],
    function ($, Backbone, Marionette, plazasCAPTemplate, Plazas) {

        var plazasCAPView = Backbone.Marionette.ItemView.extend({
            template: plazasCAPTemplate,
            collection: new Plazas(),

            mostrarPlazasSegunDependencias: function(codDependencia,anioPlaza,callback){

                this.collection.setUrlPlazasPorDependencia(codDependencia,anioPlaza)
                this.collection.on("sync", this.render, this);
                this.collection.fetch().done(callback);
            }

            /*

             mostrarPlazasSegunDependencias: function(codDependencia,callback){

             this.collection.setUrlPlazasPorDependencia(codDependencia)
             this.collection.on("sync", this.render, this);
             this.collection.fetch().done(callback);
             }


              */
        });
        return plazasCAPView;
    }
);