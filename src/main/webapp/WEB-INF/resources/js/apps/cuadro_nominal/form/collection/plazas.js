define( ['backbone', 'apps/cuadro_nominal/form/model/plaza'] , function (Backbone, PlazaCAP) {

    var Plazas = Backbone.Collection.extend({


        model: PlazaCAP,


        setUrlPlazasPorDependencia: function(codDependencia,anioPlaza){

            this.url= 'api/cuadro_nominal/plazas/'+codDependencia+"/"+anioPlaza;

        }



    });
    return Plazas;
});