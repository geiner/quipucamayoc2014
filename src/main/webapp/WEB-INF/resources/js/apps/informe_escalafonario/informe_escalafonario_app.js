define(["app"], function(ErzaManager){

    ErzaManager.module('InformeEscalafonarioApp', function(InformeEscalafonarioApp, ErzaManager, Backbone, Marionette, $, _){

        InformeEscalafonarioApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "informe_escalafonario": "InformeEscalafonario"

            }
        });

        var API = {
            InformeEscalafonario: function(){
                if($('#id_rol').text().indexOf(61)>0){
                    require(["apps/informe_escalafonario/form/form_controller"], function(FormController){
                        FormController.formInformeEscalafonario();
                    });
                }
            }

        };

        ErzaManager.addInitializer(function(){
            new InformeEscalafonarioApp.Router({
                controller: API                       //API contiene todos los controladores
            });
        });
    });

    return ErzaManager.InformeEscalafonarioApp;
});