define([ 'jquery', 'backbone', 'marionette','hbs!apps/cuadro_nominal/form/templates/DepySubDep', 'apps/cuadro_nominal/form/collection/DepySubDep'],
    function ($, Backbone, Marionette,DepySubDepTemplate, DepySubDepCollection) {

        var DepySubDepView = Backbone.Marionette.ItemView.extend({
             template: DepySubDepTemplate,
            collection: new  DepySubDepCollection(),

            obtenerEncabezado: function(codDep,callback){

                this.collection.obtenerDepySubDep(codDep)
                this.collection.on("sync", this.render, this);
                this.collection.fetch().done(callback);
            }


        });
        return DepySubDepView;
    }
);