define(["app", "apps/legajos/info_laboral/laboral_layout"], function(ErzaManager, View){
    ErzaManager.module('LaboralApp.Form',function(Form, ErzaManager,Backbone, Marionette, $, _){
        Form.Controller = {
            InfoLaboral: function(){
                var laboralLayout = new View.Layout();

                ErzaManager.mainRegion.show(laboralLayout);
            }
        }
    });

    return ErzaManager.LaboralApp.Form.Controller;
});

