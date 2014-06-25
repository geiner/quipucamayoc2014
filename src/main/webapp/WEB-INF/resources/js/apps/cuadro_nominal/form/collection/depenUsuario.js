define(['backbone', 'apps/cuadro_nominal/form/model/depenUsuario'], function (Backbone, Origen) {

    var Dependencia = Backbone.Collection.extend({


        model: Origen,

        dependenciaUsuario: function(emailUsuario){

            this.url= 'api/cuadro_nominal/origenUsuario/'+emailUsuario;

        }


    });
    return Dependencia;
});