define([ 'jquery', 'backbone', 'marionette','hbs!apps/cuadro_nominal/form/templates/anioPlazas', 'apps/cuadro_nominal/form/collection/anioPlazas'],
    function ($, Backbone, Marionette, anioPlazasTemplate, anioPlazas) {

        var anioPlazasView = Backbone.Marionette.ItemView.extend({
            template: anioPlazasTemplate,
            collection: new anioPlazas(),




            mostrarAnioPlazas: function () {
                // Initialize the collection

                this.collection = new anioPlazas();
                // Render the view when the collection is retreived from the server
               // this.listenTo(this.collection, 'sync', this.render);

                this.collection.on("sync", this.render, this);

                // Request unpaginated URL
                this.collection.fetch({ data: { page: 'no'} });


            }



        });
        return anioPlazasView;
    }
);