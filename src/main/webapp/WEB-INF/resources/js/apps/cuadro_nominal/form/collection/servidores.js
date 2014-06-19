define( ['backbone', 'apps/cuadro_nominal/form/model/servidor'] , function (Backbone, Servidor) {

    var Servidores = Backbone.Collection.extend({


        model: Servidor,

        setUrlTodosServiPorDependencia: function(codDependencia){

            this.url= 'api/cuadro_nominal/servidores/'+codDependencia;

        }

    });
    return Servidores;
});