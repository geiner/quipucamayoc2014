define(['backbone', 'apps/cuadro_nominal/form/model/plaza'], function (Backbone, numPlazas) {

    var numPlazasServidor = Backbone.Collection.extend({


        model: numPlazas,

        obtenerNumPlazas: function(dniServidor,anio){

            this.url= 'api/cuadro_nominal/numPlazasServidor/'+dniServidor+"/"+anio;

        }

        /*

        obtenerNumPlazas: function(dniServidor){

            this.url= 'api/cuadro_nominal/numPlazasServidor/'+dniServidor;

        }

       */

    });
    return numPlazasServidor;
});