define(["marionette"], function(Marionette){

	var ErzaManager = new Marionette.Application();

	ErzaManager.addRegions({
		headerRegion: "#header-region",
		mainRegion: "#main-region"
	});

	ErzaManager.navigate = function(route,  options){
		options || (options = {});
		Backbone.history.navigate(route, options);
	};

	ErzaManager.getCurrentRoute = function(){
		return Backbone.history.fragment
	};

	ErzaManager.on("initialize:after", function(){
		if(Backbone.history){
			require(["apps/contratos/contratos_app","apps/planillas/planillas_app","apps/inicio/inicio_app","apps/servidores/servidores_app",
                "apps/solicitudes/solicitudes_app","apps/legajos/legajos_app","apps/roles/roles_app","apps/estado_condicion/estado_condicion_app",
                "apps/resoluciones/resoluciones_app","apps/asistencia/asistencia_app","apps/desc_medicos/desc_medicos_app","apps/cuadro_nominal/cuadro_nominal_app"], function () {       //para cada modulo agregar la url donde se encuentra apps/planillas/planillas_app
				Backbone.history.start();

				if(ErzaManager.getCurrentRoute() === ""){
					ErzaManager.trigger("iniciar:list");   //inicia con contratos
				}
			});
		}
	});

	return ErzaManager;
});
