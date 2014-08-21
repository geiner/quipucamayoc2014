define(['backbone', 'apps/reportes/form/model/tablaCambioInfoServ'], function (Backbone, tablaCambioInfoServMod) {

    var tablaCambioInfoServ = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: tablaCambioInfoServMod,

        setUrl111:function(anioIni,mesIni,tipo,e1){
            this.url= 'api/reportes/tablaCambioInfoServ/'+anioIni +'/'+ mesIni+'/'+  tipo +'/'+  e1 ;
        },
        setUrl222:function(anioIni,mesIni,anioFin,mesFin,dni,tipito,estito){
            this.url= 'api/reportes/tablaCambioInfoDelServ/'+anioIni +'/'+ mesIni +'/'+  anioFin +'/'+  mesFin +'/'+  dni +'/'+  tipito + '/'+ estito ;
        }

    });
    return tablaCambioInfoServ;
});



