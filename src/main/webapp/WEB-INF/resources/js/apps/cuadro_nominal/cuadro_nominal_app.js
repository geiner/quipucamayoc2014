define(["app"], function(ErzaManager){

    ErzaManager.module('CuadroNominalApp', function(CuadroNominalApp, ErzaManager, Backbone, Marionette, $, _){

        CuadroNominalApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "cuadro_nominal": "cuadroNominal"


            }
        });

        var API = {
            cuadroNominal: function(){
                if($('#id_rol').text().indexOf(61)>0){
                    require(["apps/cuadro_nominal/form/form_controller"], function(CuadroNominalController){
                        CuadroNominalController.CuadroNominalController();
                    });
                }else{
                    require(["apps/inicio/list/list_controller"], function(ListController){
                        ListController.listModulos();
                    });
                }
            }

        };

        ErzaManager.addInitializer(function(){
            new CuadroNominalApp.Router({
                controller: API                       //API contiene todos los controladores
            });
        });
    });

    return ErzaManager.CuadroNominalApp;
});