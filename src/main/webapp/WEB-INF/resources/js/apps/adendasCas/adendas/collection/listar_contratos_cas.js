define(['backbone', 'apps/adendasCas/adendas/model/listar_contratos_cas'], function (Backbone, ContratosCAS) {

    var listarContratos = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: ContratosCAS,
        setUrl58: function(udid){
            this.url= 'api/adendasCas/contratos/'+udid;
        }


    });
    return listarContratos;
});


