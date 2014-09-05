define(["app"], function(ErzaManager){

    ErzaManager.module('ContratosCasApp', function(ContratosCasApp, ErzaManager, Backbone, Marionette, $, _){

        ContratosCasApp.Router = Marionette.AppRouter.extend({
            appRoutes: {

                "contratos":"ContratosCas_Contratos"

            }
        });

        var API = {

            ContratosCas_Contratos:function(){
                if($('#id_rol').text().indexOf(57)>0){
                    require(["apps/contratosCas/contratos/contratos_controller"], function(ContratosController){
                        ContratosController.ContratosController();
                    });
                }
            }

        };

        ErzaManager.addInitializer(function(){
            new ContratosCasApp.Router({
                controller: API                       //API contiene todos los controladores
            });
        });
    });

    return ErzaManager.ContratosCasApp;
});


