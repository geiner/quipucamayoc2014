define([ 'backbone', 'marionette','hbs!apps/estado_condicion/form/templates/entidad', 'apps/estado_condicion/form/collection/entidad'],
    function (Backbone, Marionette, EntidadTemp, EntidadColl) {
        var Entidad=Backbone.Marionette.ItemView.extend({

            template: EntidadTemp,
            collection: new EntidadColl(),


            getEntidad: function(renPen){

                this.collection.setUrl(renPen);
                this.collection.on("sync", this.render, this);
                this.collection.fetch().done();

            }

        })
        return Entidad;

    });
