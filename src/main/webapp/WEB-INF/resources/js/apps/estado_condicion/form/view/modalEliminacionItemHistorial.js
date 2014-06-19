define([ 'jquery', 'backbone', 'marionette','hbs!apps/estado_condicion/form/templates/modalEliminacionItemHistorial'],
    function ($, Backbone, Marionette, deleteTemplate) {

        var eliminarView = Backbone.Marionette.ItemView.extend({
            template: deleteTemplate

        });
        return eliminarView;
    }
);