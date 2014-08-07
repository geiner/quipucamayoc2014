define(['backbone', 'apps/desc_medicos/form/model/descanso_total'], function (Backbone, DescansoTotal) {

    var DescansosTotales = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: DescansoTotal,
        setUrl: function(mes,anio){
            this.url='rest/descansos/listar/'+mes+'/'+anio;
        },
        setUrl2: function(anio){
            this.url='rest/descansos/listarxanio/'+anio;
        }
    });
    return DescansosTotales;
});