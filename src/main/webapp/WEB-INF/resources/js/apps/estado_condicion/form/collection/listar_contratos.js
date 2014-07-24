define(['backbone', 'apps/estado_condicion/form/model/listar_contratos'], function (Backbone, ListarContratos) {

    var listarContratos = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: ListarContratos,
        setUrl: function(codigo){
            this.url= 'api/estado_condicion/listar_contratos/'+codigo;
        }
    });
    return listarContratos;
});

