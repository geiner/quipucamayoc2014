define(["app", "apps/contratosCas/contratos/contratos_Layout"], function(ErzaManager, View){
    ErzaManager.module('ContratosCasApp.Form',function(Form, ErzaManager,Backbone, Marionette, $, _){
        Form.Controller = {
            ContratosController: function(){
                var contratosLayout = new View.Layout();

                ErzaManager.mainRegion.show(contratosLayout);
            }
        }
    });

    return ErzaManager.ContratosCasApp.Form.Controller;
});

