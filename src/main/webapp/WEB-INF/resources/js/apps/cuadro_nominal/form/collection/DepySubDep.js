define(['backbone', 'apps/cuadro_nominal/form/model/DepySubDep'], function (Backbone, DepySubDep) {

    var DepySubDep = Backbone.Collection.extend({


        model: DepySubDep,

        obtenerDepySubDep: function(codDep){

            this.url= 'api/cuadro_nominal/DepySubDep/'+codDep;

        }


    });
    return DepySubDep;
});