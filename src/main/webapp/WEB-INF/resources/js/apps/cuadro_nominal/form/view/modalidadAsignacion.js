define([ 'jquery', 'backbone', 'marionette','hbs!apps/cuadro_nominal/form/templates/modalidadAsignacion', 'apps/cuadro_nominal/form/collection/modalidadAsignacion'],
    function ($, Backbone, Marionette, plazasCAPTemplate, Modalidades) {

        var plazasCAPView = Backbone.Marionette.ItemView.extend({
            template: plazasCAPTemplate,
            collection: new Modalidades(),

            mostrarModalidades: function(callback){
                this.collection. setUrlTodasMod();

                //  this.collection2.setUrlTodasModalidades(); //****,   'apps/cuadro_nominal/form/collection/modalidadAsignacion'

                this.collection.on("sync", this.render, this);
                this.collection.fetch().done(callback);

            }


/*
            mostrarModalidades: function () {

               // this.collection.setUrlTodasModalidades();

                this.collection = new Modalidades();
                this.collection.on("sync", this.render, this);
                this.collection.fetch({ data: { page: 'no'} });

            }*/



        });
        return plazasCAPView;
    }
);