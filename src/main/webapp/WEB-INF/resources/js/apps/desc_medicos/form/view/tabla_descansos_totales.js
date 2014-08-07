define([ 'backbone', 'marionette','hbs!apps/desc_medicos/form/templates/table-descansos-totales', 'apps/desc_medicos/form/collection/descansos_totales'],
    function (Backbone, Marionette, descansosTotalesTemplate,DescansosTotales) {
        var descansosView=Backbone.Marionette.ItemView.extend({

            template: descansosTotalesTemplate,
            collection: new DescansosTotales(),

            fetchDescansostotales: function(mes,anio,callback){
                this.collection.setUrl(mes,anio);
                this.collection.on("sync", this.render, this);
                this.collection.fetch().done(callback);
            },
            fetchDescansosxanio: function(anio,callback){
                this.collection.setUrl2(anio);
                this.collection.on("sync", this.render, this);
                this.collection.fetch().done(callback);
            }

        })
        return descansosView;

    });