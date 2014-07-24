define([ 'backbone', 'marionette', 'apps/servidores/form/collection/numregistros', 'hbs! apps/servidores/form/templates/numregistro' ],
    function (Backbone, Marionette,numRegistros, numregistroTemplate) {

        var ActDistritoView = Backbone.Marionette.ItemView.extend({

            template: numregistroTemplate,
            collection: new numRegistros(),

            fetchNumRegistros: function(codigo,callback){
                this.collection.setUrl(codigo);
                this.collection.on("sync", this.render, this);
                this.collection.fetch().done(callback);
            }

        });

        return ActDistritoView;
    }
);


