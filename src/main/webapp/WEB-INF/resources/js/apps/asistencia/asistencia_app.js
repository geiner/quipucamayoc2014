define(["app"], function(ErzaManager){

    ErzaManager.module('AsistenciaApp', function(AsistenciaApp, ErzaManager, Backbone, Marionette, $, _){

        AsistenciaApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "asistencia_administrativo": "Asistencia_administrativo",
                "asistencia_docente":"Asistencia_docente"

            }
        });

        var API = {
            Asistencia_administrativo: function(){
                if($('#id_rol').text().indexOf(57)>0){
                    require(["apps/asistencia/administrativo/administrativo_controller"], function(AdministrativoController){
                        AdministrativoController.AdministrativoController();
                    });
                }else{
                    require(["apps/inicio/list/list_controller"], function(ListController){
                        ListController.listModulos();
                    });
                }
            },
            Asistencia_docente:function(){
                if($('#id_rol').text().indexOf(57)>0){
                    require(["apps/asistencia/docente/docente_controller"], function(DocenteController){
                        DocenteController.DocenteController();
                    });
                }else{
                    require(["apps/inicio/list/list_controller"], function(ListController){
                        ListController.listModulos();
                    });
                }
            }

        };

        ErzaManager.addInitializer(function(){
            new AsistenciaApp.Router({
                controller: API                       //API contiene todos los controladores
            });
        });
    });

    return ErzaManager.AsistenciaApp;
});