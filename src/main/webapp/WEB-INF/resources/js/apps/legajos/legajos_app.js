define(["app"], function(ErzaManager){

    ErzaManager.module('LegajosApp', function(LegajosApp, ErzaManager, Backbone, Marionette, $, _){

        LegajosApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "info_personal": "Info_personal",
                "info_laboral":"Info_laboral"
                /* "planillas/": "listAdendas"*/
            }
        });

        var API = {
            Info_personal: function(){
                if($('#id_rol').text().indexOf(56)>0){
                    require(["apps/legajos/form/form_controller"], function(FormController){
                        FormController.formLegajos();
                    });
                }else{
                    require(["apps/inicio/list/list_controller"], function(ListController){
                        ListController.listModulos();
                    });
                }
            },
            Info_laboral:function(){
                if($('#id_rol').text().indexOf(56)>0){
                    require(["apps/legajos/info_laboral/laboral_controller"], function(FormController){
                        FormController.InfoLaboral();
                    });
                }else{
                    require(["apps/inicio/list/list_controller"], function(ListController){
                        ListController.listModulos();
                    });
                }
            }
            /*,
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