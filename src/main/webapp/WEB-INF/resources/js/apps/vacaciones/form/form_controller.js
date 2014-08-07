define(["app", "apps/vacaciones/form/form_layout"], function(ErzaManager, View){
    ErzaManager.module('VacacionesApp.Form',function(Form, ErzaManager,Backbone, Marionette, $, _){
        Form.Controller = {
            formVacaciones: function(){
                var vacacionesFormLayout = new View.Layout();

                ErzaManager.mainRegion.show(vacacionesFormLayout);
            }
        }
    });

    return ErzaManager.VacacionesApp.Form.Controller;
});

