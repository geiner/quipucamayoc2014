define(['backbone','apps/servidores/form/model/numregistro'],function(Backbone, numRegistro){

    var NumRegistro = Backbone.Collection.extend({
        model: numRegistro,

        setUrl: function(codigo){
            this.url='rest/cas/serv/num_registros/'+codigo;
        }
    });
    return NumRegistro;

});
