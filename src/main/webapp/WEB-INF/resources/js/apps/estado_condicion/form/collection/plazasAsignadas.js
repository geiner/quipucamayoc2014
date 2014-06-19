define( ['backbone', 'apps/estado_condicion/form/model/plazaAsignada'] , function (Backbone, PlazaCAP) {

    var PlazasAsignadas = Backbone.Collection.extend({


        model: PlazaCAP,


        setUrlPlazasAsignadasPorDependencia: function(codServidor){

            this.url= 'api/rotaciones/plazasAsignadas/'+codServidor;

        }



    });
    return PlazasAsignadas;
});