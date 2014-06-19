define([ 'jquery', 'backbone', 'marionette','hbs!apps/cuadro_nominal/form/templates/eliminarAsignacion'],
    function ($, Backbone, Marionette, deleteTemplate) {

        var eliminarView = Backbone.Marionette.ItemView.extend({
            template: deleteTemplate

        });
        return eliminarView;
    }
);