define(["app", "apps/reportes/form/form_layout"], function(ErzaManager, View){
    ErzaManager.module('ReportesApp.Form',function(Form, ErzaManager,Backbone, Marionette, $, _){
        Form.Controller = {
            formReportes: function(){
                var reportesFormLayout = new View.Layout();

                ErzaManager.mainRegion.show(reportesFormLayout);
            }
        }
    });

    return ErzaManager.ReportesApp.Form.Controller;
});

