define(["app", "apps/adendasCas/adendas/adendas_Layout"], function(ErzaManager, View){
    ErzaManager.module('AdendasCasApp.Form',function(Form, ErzaManager,Backbone, Marionette, $, _){
        Form.Controller = {
            AdendasController: function(){
                var adendasLayout = new View.Layout();

                ErzaManager.mainRegion.show(adendasLayout);
            }
        }
    });

    return ErzaManager.AdendasCasApp.Form.Controller;
});

