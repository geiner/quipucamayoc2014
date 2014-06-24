define(["app"], function(ErzaManager){

    ErzaManager.module('SolicitudesApp', function(SolicitudesApp, ErzaManager, Backbone, Marionette, $, _){

        SolicitudesApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "solicitudes": "listSolicitudes"
            }
        });

        var API = {
            listSolicitudes: function(){
                if($('#id_rol').text().indexOf(51)>0){
                    require(["apps/solicitudes/table/table_controller"], function(TableController){
                        TableController.tableSolicitudes();
                    });
                }else{
                    require(["apps/inicio/list/list_controller"], function(ListController){
                        ListController.listModulos();
                    });
                }

            }
        };

        ErzaManager.addInitializer(function(){
            new SolicitudesApp.Router({
                controller: API                       //API contiene todos los controladores
            });
        });
    });

    return ErzaManager.SolicitudesApp;
});