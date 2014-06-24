define(["app"], function(ErzaManager){

    ErzaManager.module('RolesApp', function(RolesApp, ErzaManager, Backbone, Marionette, $, _){

        RolesApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "roles": "listRoles"
            }
        });

        var API = {
            listRoles: function(){
                if($('#id_rol').text().indexOf(52)>0){
                    require(["apps/roles/table/table_controller"], function(TableController){
                        TableController.listRoles();
                    });
                }else{
                    require(["apps/inicio/list/list_controller"], function(ListController){
                        ListController.listModulos();
                    });
                }
            }
        };

        ErzaManager.addInitializer(function(){
            new RolesApp.Router({
                controller: API                       //API contiene todos los controladores
            });
        });
    });

    return ErzaManager.RolesApp;
});