define([ 'jquery', 'backbone', 'marionette','hbs!apps/cuadro_nominal/form/templates/modalidadAsignacion', 'apps/cuadro_nominal/form/collection/modalidadAsignacion'],
    function ($, Backbone, Marionette, plazasCAPTemplate, Modalidades) {

        var plazasCAPView = Backbone.Marionette.ItemView.extend({
            template: plazasCAPTemplate,
            collection: new Modalidades(),




            mostrarModalidades: function () {
                // Initialize the collection

                this.collection = new Modalidades();
                // Render the view when the collection is retreived from the server
               // this.listenTo(this.collection, 'sync', this.render);

                this.collection.on("sync", this.render, this);

                // Request unpaginated URL
                this.collection.fetch({ data: { page: 'no'} });


            }



        });
        return plazasCAPView;
    }
);