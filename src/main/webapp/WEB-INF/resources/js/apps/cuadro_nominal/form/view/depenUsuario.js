define([ 'jquery', 'backbone', 'marionette','hbs!apps/cuadro_nominal/form/templates/depenUsuario', 'apps/cuadro_nominal/form/collection/depenUsuario'],
    function ($, Backbone, Marionette,depeUsuario, depenUsuario) {

        var depenUsuarioView = Backbone.Marionette.ItemView.extend({
             template: depeUsuario,
            collection: new depenUsuario(),

            mostrarDependenciaUsuario: function(emailUsuario,callback){

                this.collection.dependenciaUsuario(emailUsuario)
                this.collection.on("sync", this.render, this);
                this.collection.fetch().done(callback);
            }


        });
        return depenUsuarioView;
    }
);