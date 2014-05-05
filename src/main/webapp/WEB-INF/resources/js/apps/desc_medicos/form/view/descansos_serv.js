define([ 'backbone', 'marionette','hbs!apps/desc_medicos/form/templates/table-descansos', 'apps/desc_medicos/form/collection/descansos'],
    function (Backbone, Marionette, descansosTemplate,Descansos) {
        var descansosView=Backbone.Marionette.ItemView.extend({

            template: descansosTemplate,
            collection: new Descansos(),

            fetchDescansos: function(codigo,numserest,callback){
                this.collection.setUrl(codigo,numserest);
                this.collection.on("sync", this.render, this);
                this.collection.fetch().done(callback);
            }

        })
        return descansosView;

    });