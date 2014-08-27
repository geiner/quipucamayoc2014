define( ['backbone', 'apps/cuadro_nominal/form/model/servidor'] , function (Backbone, Servidor) {

    var Docentes = Backbone.Collection.extend({


        model: Servidor,

        setUrlTodosDocentes: function(){

            this.url= 'api/cuadro_nominal/docentes';

        }

    });
    return Docentes;
});