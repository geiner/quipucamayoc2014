define(["app"], function(ErzaManager){

    ErzaManager.module('ServidoresApp', function(ServidoresApp, ErzaManager, Backbone, Marionette, $, _){

        ServidoresApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "servidores": "listServidores"/*,
                 "planillas/": "listAdendas"*/
            }
        });

        var API = {
            listServidores: function(){
                if($('#id_rol').text().indexOf(55)>0){
                    require(["apps/servidores/form/form_controller"], function(FormController){
                        FormController.formServidores();
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
            new ServidoresApp.Router({
                controller: API                       //API contiene todos los controladores
            });
        });
    });

    return ErzaManager.ServidoresApp;
});