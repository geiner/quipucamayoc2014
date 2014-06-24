define(["app"], function(ErzaManager){

    ErzaManager.module('EstadoCondicionApp', function(EstadoCondicionApp, ErzaManager, Backbone, Marionette, $, _){

        EstadoCondicionApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "estado_condicion": "EstadoCondicion"

            }
        });

        var API = {
            EstadoCondicion: function(){
                if($('#id_rol').text().indexOf(57)>0){
                    require(["apps/estado_condicion/form/form_controller"], function(FormController){
                        FormController.formEstadoCondicion();
                    });
                }else{
                    require(["apps/inicio/list/list_controller"], function(ListController){
                        ListController.listModulos();
                    });
                }
            }

        };

        ErzaManager.addInitializer(function(){
            new EstadoCondicionApp.Router({
                controller: API                       //API contiene todos los controladores
            });
        });
    });

    return ErzaManager.EstadoCondicionApp;
});