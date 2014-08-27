define([ 'backbone', 'marionette','hbs!apps/cuadro_nominal/form/templates/tablaDocentes',
        'apps/cuadro_nominal/form/collection/docentes',  'apps/cuadro_nominal/form/collection/modalidadAsignacion' ],
    function (Backbone, Marionette, TablaServidoresTemplate,Servidores,modAsignacion) {
        var docentesModal=Backbone.Marionette.ItemView.extend({

            template: TablaServidoresTemplate,
            collection: new Servidores(),
            collection2: new modAsignacion(),

            TodosDocentes: function(callback){
                this.collection. setUrlTodosDocentes();

                 this.collection2.setUrlTodasMod(); //****,   'apps/cuadro_nominal/form/collection/modalidadAsignacion'

                this.collection.on("sync", this.render, this);
                this.collection.fetch().done(callback);

            }



        })
        return docentesModal;

    });