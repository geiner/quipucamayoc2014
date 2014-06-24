define(["app"], function(ErzaManager){

    ErzaManager.module('ResolucionesApp', function(ResolucionesApp, ErzaManager, Backbone, Marionette, $, _){

        ResolucionesApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "resoluciones": "formResoluciones"
            }
        });

        var API = {
            formResoluciones: function(){
                if($('#id_rol').text().indexOf(60)>0){
                    require(["apps/resoluciones/form/form_controller"], function(FormController){
                        FormController.formResoluciones();
                    });
                }else{
                    require(["apps/inicio/list/list_controller"], function(ListController){
                        ListController.listModulos();
                    });
                }


            }
        };

        ErzaManager.addInitializer(function(){
            new ResolucionesApp.Router({
                controller: API                       //API contiene todos los controladores
            });
        });
    });

    return ErzaManager.ResolucionesApp;
});
