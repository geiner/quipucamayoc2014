define(["app"], function(ErzaManager){

    ErzaManager.module('LegajosApp', function(LegajosApp, ErzaManager, Backbone, Marionette, $, _){

        LegajosApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "legajos": "Legajos"/*,
                 "planillas/": "listAdendas"*/
            }
        });

        var API = {
            Legajos: function(){
                if($('#id_rol').text().indexOf(56)>0){
                    require(["apps/legajos/form/form_controller"], function(FormController){
                        FormController.formLegajos();
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
            new LegajosApp.Router({
                controller: API                       //API contiene todos los controladores
            });
        });
    });

    return ErzaManager.LegajosApp;
});