define(['backbone','apps/servidores/form/model/numregistro'],function(Backbone, numRegistro){

    var NumRegistro = Backbone.Collection.extend({
        model: numRegistro,

        setUrl: function(codigo,num_ser_est){
            this.url='rest/cas/serv/num_registros/'+codigo+'/'+num_ser_est;
        }
    });
    return NumRegistro;

});
