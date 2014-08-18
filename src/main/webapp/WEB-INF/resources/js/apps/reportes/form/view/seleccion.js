define([ 'backbone', 'marionette','hbs!apps/reportes/form/templates/seleccion'],
    function (Backbone, Marionette, SeleccionTemp) {
        var Seleccion=Backbone.Marionette.ItemView.extend({

            template: SeleccionTemp



        })
        return Seleccion;

    });
