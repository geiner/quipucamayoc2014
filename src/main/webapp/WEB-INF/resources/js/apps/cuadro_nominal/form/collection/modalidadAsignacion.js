define(['backbone','apps/cuadro_nominal/form/model/modalidadAsignacion'], function(Backbone, modalidad){
    var mAsig = Backbone.Collection.extend({
        model: modalidad,


        setUrlModalidades: function(){

            this.url= 'api/cuadro_nominal/modalidad';

        }



    });
    return mAsig;
});

