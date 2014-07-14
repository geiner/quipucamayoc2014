define([ 'backbone', 'marionette','hbs!apps/desc_medicos/form/templates/citt', 'apps/desc_medicos/form/collection/citts'],
    function (Backbone, Marionette, cittTemplate,citts) {
        var cittView=Backbone.Marionette.ItemView.extend({

            template: cittTemplate,
            collection: new citts(),

            fetchcitt: function(citt,callback){
                this.collection.setUrl(citt);
                this.collection.on("sync", this.render, this);
                this.collection.fetch().done(callback);
            }

        })
        return cittView;

    });