define([ 'jquery', 'backbone', 'marionette','hbs!apps/cuadro_nominal/form/templates/numPlazasServidor', 'apps/cuadro_nominal/form/collection/numPlazasServidor'],
    function ($, Backbone, Marionette,numPlazasServidorTemplate, numPlazasServidorTemplateCollection) {

        var numPlazasServidorView = Backbone.Marionette.ItemView.extend({
             template: numPlazasServidorTemplate,
            collection: new numPlazasServidorTemplateCollection(),

            obtenerNumPlazasServidor: function(dniServidor,anio,callback){

                this.collection. obtenerNumPlazas(dniServidor,anio)
                this.collection.on("sync", this.render, this);
                this.collection.fetch().done(callback);
            }


        });
        return numPlazasServidorView;
    }
);