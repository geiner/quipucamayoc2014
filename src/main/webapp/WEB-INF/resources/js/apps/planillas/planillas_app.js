define(["app"], function(ErzaManager){

    ErzaManager.module('PlanillasApp', function(PlanillasApp, ErzaManager, Backbone, Marionette, $, _){

        PlanillasApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "planillas": "listPlanillas"/*,
                "planillas/": "listAdendas"*/
            }
        });

        var API = {
            listPlanillas: function(){
                if($('#id_rol').text().indexOf(53)>0){
                    require(["apps/planillas/list/list_controller"], function(ListController){
                        ListController.listPlanillas();
                    });
                }else{
                    require(["apps/inicio/list/list_controller"], function(ListController){
                        ListController.listModulos();
                    });
                }
            }/*,
            listAdendas: function(){
                require(["apps/contratos/adendas/adendas_controller"], function(AdendasController){
                    AdendasController.listAdendas();
                });
            }*/
        };

        ErzaManager.addInitializer(function(){
            new PlanillasApp.Router({
                controller: API                       //API contiene todos los controladores
            });
        });
    });

    return ErzaManager.PlanillasApp;
});