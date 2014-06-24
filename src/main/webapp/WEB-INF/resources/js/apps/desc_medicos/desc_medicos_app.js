define(["app"], function(ErzaManager){

    ErzaManager.module('DescansoMedicoApp', function(DescansoMedicoApp, ErzaManager, Backbone, Marionette, $, _){

        DescansoMedicoApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "desc_med": "DescansoMedico"

            }
        });

        var API = {
            DescansoMedico: function(){
                if($('#id_rol').text().indexOf(62)>0){
                    require(["apps/desc_medicos/form/form_controller"], function(FormController){
                        FormController.formDescanMedico();
                    });
                }else{
                    require(["apps/inicio/list/list_controller"], function(ListController){
                        ListController.listModulos();
                    });
                }
            }

        };

        ErzaManager.addInitializer(function(){
            new DescansoMedicoApp.Router({
                controller: API                       //API contiene todos los controladores
            });
        });
    });

    return ErzaManager.DescansoMedicoApp;
});