define(["app", "apps/servidores/numserest/numserest_layout"], function(ErzaManager, View){
    ErzaManager.module('ServidoresApp.Numserest',function(Numserest, ErzaManager,Backbone, Marionette, $, _){
        Numserest.Controller = {
            numserestServidores: function(){
                var servidoresNumserestLayout = new View.Layout();

                ErzaManager.mainRegion.show(servidoresNumserestLayout);
            }
        }
    });

    return ErzaManager.ServidoresApp.Numserest.Controller;
});
