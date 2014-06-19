define(["app", "apps/cuadro_nominal/form/form_layout"], function(ErzaManager, View){
    ErzaManager.module('CuadroNominalApp.Form',function(Form, ErzaManager,Backbone, Marionette, $, _){
        Form.Controller = {
            CuadroNominalController: function(){
                var cuadroNominalLayout = new View.Layout();

                ErzaManager.mainRegion.show(cuadroNominalLayout);
            }
        }
    });

    return ErzaManager.CuadroNominalApp.Form.Controller;
});

