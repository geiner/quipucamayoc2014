define(['backbone','apps/cuadro_nominal/form/model/modalidadAsignacion'], function(Backbone, modalidad){
    var mAsig = Backbone.Collection.extend({

        model: modalidad,


       setUrlTodasMod: function(){

          this.url= 'api/cuadro_nominal/modalidad';
       }



     //  url: 'api/cuadro_nominal/modalidad'


    });
    return mAsig;
});

