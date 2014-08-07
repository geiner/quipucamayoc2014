define(["app"], function(ErzaManager){

    ErzaManager.module('LegajosApp', function(VacacionesApp, ErzaManager, Backbone, Marionette, $, _){

        VacacionesApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "vacaciones": "Vacaciones"/*,
                 "planillas/": "listAdendas"*/
            }
        });

        var API = {
            Vacaciones: function(){
                if($('#id_rol').text().indexOf(65)>0){
                    require(["apps/vacaciones/form/form_controller"], function(FormController){
                        FormController.formVacaciones();
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
            new VacacionesApp.Router({
                controller: API                       //API contiene todos los controladores
            });
        });
    });

    return ErzaManager.VacacionesApp;
});
