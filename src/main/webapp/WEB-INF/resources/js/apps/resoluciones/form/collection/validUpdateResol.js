define(['backbone', 'apps/resoluciones/form/model/validacion'], function (Backbone, Validacion) {

    var validacion = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: Validacion,

        setUrlvalidacion: function(idResol,descrResol){

            this.url= 'rest/resoluciones/validarUpdateResol/'+idResol+"/"+descrResol;
        }
    });
    return validacion;
});

