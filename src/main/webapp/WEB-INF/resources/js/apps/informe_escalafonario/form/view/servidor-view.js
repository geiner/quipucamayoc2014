define([ 'jquery', 'backbone', 'marionette','hbs!apps/informe_escalafonario/form/templates/servidor', 'apps/informe_escalafonario/form/collection/servidor'],
    function ($, Backbone, Marionette, serviTemplate, Servidores) {

        var ServiView = Backbone.Marionette.ItemView.extend({
            template: serviTemplate,
            collection: new Servidores(),

            fetchServidores: function(){
                this.collection.setUrlTodosServi()
                this.collection.on("sync", this.render, this);
                this.collection.fetch().done();
            }
        });
        return ServiView;
    }
);

