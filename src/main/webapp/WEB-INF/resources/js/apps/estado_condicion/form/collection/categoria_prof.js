define(['backbone', 'apps/estado_condicion/form/model/categoria_prof'], function (Backbone, CategoriaProfModel) {

    var CategoriaProf = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: CategoriaProfModel,
        setUrl: function(valor1){
        this.url= 'api/estado_condicion/categoria_prof/'+valor1;
        }
    });
    return CategoriaProf;
});
