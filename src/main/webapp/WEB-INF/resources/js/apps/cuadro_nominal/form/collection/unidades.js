define(['backbone', 'apps/cuadro_nominal/form/model/unidad'], function (Backbone, Unidad) {
                                                console.log("iendo");
    var Unidades = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: Unidad,


        //url: 'api/unidades',

       /* unidadesSegunUsuario: function(codDependencia){

            this.url= 'api/unidades/segunUsuario/'+codDependencia;

        }*/


        unidadesSegunUsuario: function(codDependencia,perfil){

            this.url= 'api/unidades/segunUsuario/'+codDependencia+'/'+perfil;

        }





    });
    return Unidades;
});