define([ 'backbone', 'marionette','hbs!apps/estado_condicion/form/templates/categoria_prof', 'apps/estado_condicion/form/collection/categoria_prof'],
    function (Backbone, Marionette, CategoriaProfTemp, CategoriaProfColl) {
        var CategoriaProf=Backbone.Marionette.ItemView.extend({

            template: CategoriaProfTemp,
            collection: new CategoriaProfColl(),


            fetchCategoriaProf: function(valor1, valor2){
                //this.collection.setUrl();
                this.collection.setUrl(valor1, valor2);
                this.collection.on("sync", this.render, this);
                this.collection.fetch().done();

            }

        })
        return CategoriaProf;

    });
