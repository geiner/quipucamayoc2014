define([ 'backbone', 'marionette','hbs!apps/desc_medicos/form/templates/total', 'apps/desc_medicos/form/collection/totales'],
    function (Backbone, Marionette, descansosTotalesTemplate,DescansosTotales) {
        var Total=Backbone.Marionette.ItemView.extend({

            template: descansosTotalesTemplate,
            collection: new DescansosTotales(),

            fetchtotal: function(codigo,numserest,callback){
                this.collection.setUrl(codigo,numserest);
                this.collection.on("sync", this.render, this);
                this.collection.fetch().done(callback);
            }

        })
        return Total;

    });