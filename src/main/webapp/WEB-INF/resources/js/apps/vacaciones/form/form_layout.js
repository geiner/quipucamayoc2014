define(['app', 'hbs!apps/vacaciones/form/templates/inicio_vacaciones','lib/bootstrap-datetimepicker.min',"lib/moment","jquery","bootstrap"],
    function (ErzaManager, layoutTpl) {
        ErzaManager.module('VacacionesApp.Form.View', function (View, ErzaManager, Backbone, Marionette, $, _) {

            View.Layout = Marionette.Layout.extend({
                template: layoutTpl

            });
        });
        return ErzaManager.VacacionesApp.Form.View;
    });