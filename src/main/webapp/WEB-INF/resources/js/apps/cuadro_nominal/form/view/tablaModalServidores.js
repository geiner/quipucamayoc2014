define([ 'backbone', 'marionette','hbs!apps/cuadro_nominal/form/templates/tablaServidores',
        'apps/cuadro_nominal/form/collection/servidores'],
    function (Backbone, Marionette, TablaServidoresTemplate,Servidores) {
        var servidoresModal=Backbone.Marionette.ItemView.extend({

            template: TablaServidoresTemplate,
            collection: new Servidores(),

            TodosServidoresPorDependencia: function(codDependencia,callback){
                this.collection. setUrlTodosServiPorDependencia(codDependencia)
                this.collection.on("sync", this.render, this);
                this.collection.fetch().done(callback);

            }



        })
        return servidoresModal;

    });