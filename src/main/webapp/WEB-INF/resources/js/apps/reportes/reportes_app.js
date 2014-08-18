define(["app"], function(ErzaManager){

    ErzaManager.module('ReportesApp', function(ReportesApp, ErzaManager, Backbone, Marionette, $, _){

        ReportesApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "reportes": "Reportes"

            }
        });

        var API = {
            Reportes: function(){
                if($('#id_rol').text().indexOf(61)>0){
                    require(["apps/reportes/form/form_controller"], function(FormController){
                        FormController.formReportes();
                    });
                }
            }

        };

        ErzaManager.addInitializer(function(){
            new ReportesApp.Router({
                controller: API                       //API contiene todos los controladores
            });
        });
    });

    return ErzaManager.ReportesApp;
});