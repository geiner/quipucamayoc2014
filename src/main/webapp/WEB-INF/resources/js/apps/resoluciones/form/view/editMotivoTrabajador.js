define([ 'jquery', 'backbone', 'marionette','hbs!apps/resoluciones/form/templates/editMotivoTraba', 'apps/resoluciones/form/collection/motivos'],
    function ($, Backbone, Marionette, motivoTemplate, motiC) {

        var TodosMotivoView = Backbone.Marionette.ItemView.extend({
            template: motivoTemplate,
            collection: new motiC(),

            fetchEditMotivos: function(callback){


                this.collection.setUrlMotiv();

                this.collection.on("sync", this.render, this);
                this.collection.fetch().done(callback);
            }
        });
        return TodosMotivoView;
    }
);
