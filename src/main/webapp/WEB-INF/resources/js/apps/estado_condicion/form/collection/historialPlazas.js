define( ['backbone', 'apps/estado_condicion/form/model/historialPlaza'] , function (Backbone, HistorialPlaza) {

    var historialPlazas = Backbone.Collection.extend({


        model: HistorialPlaza,


        setUrlHistorialPlaza: function(codPlaza){

            this.url= 'api/rotaciones/historialPlaza/'+codPlaza;

        }



    });
    return historialPlazas;
});