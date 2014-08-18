define([ 'backbone', 'marionette','hbs!apps/reportes/form/templates/catservidor', 'apps/reportes/form/collection/catservidor'],
    function (Backbone, Marionette, CatServidorTemp, CatServidorColl) {
        var CatServidor=Backbone.Marionette.ItemView.extend({

            template: CatServidorTemp,
            collection: new CatServidorColl,


            getCatServidor: function(){

                this.collection.on("sync", this.render, this);
                this.collection.fetch().done();

            }

        })
        return CatServidor;

    });
