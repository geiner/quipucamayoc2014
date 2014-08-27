define(['backbone','apps/informe_escalafonario/form/model/servidor'], function (Backbone, Servidor) {

    var Servidores= Backbone.Collection.extend({

        model: Servidor,
        setUrlServi: function(cod){
            this.url= 'api/informeescalafonario/buscaServidor/'+cod;
        },
        setUrlTodosServi: function(){
            this.url= 'api/informeescalafonario/servidores';
        }
    });
    return Servidores;
});

