define(["app"], function(ErzaManager){

    ErzaManager.module('AdendasCasApp', function(AdendasCasApp, ErzaManager, Backbone, Marionette, $, _){

        AdendasCasApp.Router = Marionette.AppRouter.extend({
            appRoutes: {

                "adendas":"AdendasCas_Adendas"

            }
        });

        var API = {

            AdendasCas_Adendas:function(){
                if($('#id_rol').text().indexOf(57)>0){
                    require(["apps/adendasCas/adendas/adendas_controller"], function(AdendasController){
                        AdendasController.AdendasController();
                    });
                }
            }

        };

        ErzaManager.addInitializer(function(){
            new AdendasCasApp.Router({
                controller: API                       //API contiene todos los controladores
            });
        });
    });

    return ErzaManager.AdendasCasApp;
});


