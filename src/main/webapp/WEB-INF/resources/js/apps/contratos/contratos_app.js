define(["app"], function(ErzaManager){

	ErzaManager.module('ContratosApp', function(ContratosApp, ErzaManager, Backbone, Marionette, $, _){

		ContratosApp.Router = Marionette.AppRouter.extend({
			appRoutes: {
				"contratos": "Adendas"
			}
		});

		var API = {
            Adendas: function(){
                if($('#id_rol').text().indexOf(54)>0){
                    require(["apps/contratos/adendas/adendas_controller"], function(AdendasController){
                        AdendasController.listAdendas();
                    });
                }else{
                    require(["apps/inicio/list/list_controller"], function(ListController){
                        ListController.listModulos();
                    });
                }
			}
		};

		ErzaManager.addInitializer(function(){
			new ContratosApp.Router({
				controller: API                       //API contiene todos los controladores
			});
		});
	});

	return ErzaManager.ContratosApp;
});