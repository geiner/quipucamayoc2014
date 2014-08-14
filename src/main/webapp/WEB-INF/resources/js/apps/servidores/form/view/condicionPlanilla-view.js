define([ 'backbone', 'marionette', 'apps/servidores/form/collection/condicionesPlanilla', 'hbs!apps/servidores/form/templates/condicionPlanilla' ],
    function (Backbone, Marionette, CondicionesPlanilla, condicionesplanillaTemplate) {

        var CondicionesPlanillaView = Backbone.Marionette.ItemView.extend({

            // Define view template
            template: condicionesplanillaTemplate,


            initialize: function (callback) {

                //initialize the collection
                this.collection = new CondicionesPlanilla();

                // Render the view when the collection is retreived from the server
                this.listenTo(this.collection, 'sync', this.render);

                // Request unpaginated URL
                this.collection.fetch({ data: { page: 'no'} }).done(callback);
            }

        });

        return CondicionesPlanillaView;
    }
);
