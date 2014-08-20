define([ 'backbone', 'marionette','hbs!apps/cuadro_nominal/form/templates/tablaServidores',
        'apps/cuadro_nominal/form/collection/servidores',  'apps/cuadro_nominal/form/collection/modalidadAsignacion' ],
    function (Backbone, Marionette, TablaServidoresTemplate,Servidores,modAsignacion) {
        var servidoresModal=Backbone.Marionette.ItemView.extend({

            template: TablaServidoresTemplate,
            collection: new Servidores(),
            collection2: new modAsignacion(),

            TodosServidoresPorDependencia: function(codDependencia,callback){
                this.collection. setUrlTodosServiPorDependencia(codDependencia)

                 this.collection2.setUrlTodasMod(); //****,   'apps/cuadro_nominal/form/collection/modalidadAsignacion'

                this.collection.on("sync", this.render, this);
                this.collection.fetch().done(callback);

            }



        })
        return servidoresModal;

    });