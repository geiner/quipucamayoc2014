define(["app", "apps/informe_escalafonario/form/form_layout"], function(ErzaManager, View){
    ErzaManager.module('InformeEscalafonarioApp.Form',function(Form, ErzaManager,Backbone, Marionette, $, _){
        Form.Controller = {
            formInformeEscalafonario: function(){
                var informe_escalafonarioFormLayout = new View.Layout();

                ErzaManager.mainRegion.show(informe_escalafonarioFormLayout);
            }
        }
    });

    return ErzaManager.InformeEscalafonarioApp.Form.Controller;
});