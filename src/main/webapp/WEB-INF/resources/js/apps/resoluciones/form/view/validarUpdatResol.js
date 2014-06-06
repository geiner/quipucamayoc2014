define([ 'jquery', 'backbone', 'marionette', 'hbs!apps/resoluciones/form/templates/validacion','apps/resoluciones/form/collection/validUpdateResol'],
    function ($, Backbone, Marionette,template, validacion) {

        var TrabaView = Backbone.Marionette.ItemView.extend({
            template: template,
            collection: new validacion(),

            fetchvalidresol: function(idResol,descrResol,callback){

                this.collection.setUrlvalidacion(idResol,descrResol);

                this.collection.on("sync", this.render, this);
//                this.collection.fetch({ data: $.param({"anio":anio, "mes":mes, "unidadId": unidadId}) });
                this.collection.fetch().done(callback);
            }
        });
        return TrabaView;
    }
);


