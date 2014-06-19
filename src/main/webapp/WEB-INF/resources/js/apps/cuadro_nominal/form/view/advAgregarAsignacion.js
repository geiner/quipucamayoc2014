define([ 'jquery', 'backbone', 'marionette','hbs!apps/cuadro_nominal/form/templates/advertenciaAgregarAsignacion'],
    function ($, Backbone, Marionette, advTemplate) {

        var advView = Backbone.Marionette.ItemView.extend({
            template: advTemplate
        });
        return advView;
    }
);