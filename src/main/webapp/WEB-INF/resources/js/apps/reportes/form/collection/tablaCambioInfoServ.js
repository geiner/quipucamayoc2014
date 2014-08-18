define(['backbone', 'apps/reportes/form/model/tablaCambioInfoServ'], function (Backbone, tablaCambioInfoServMod) {

    var tablaCambioInfoServ = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: tablaCambioInfoServMod,

        setUrl111:function(anioIni,mesIni,anioFin,mesFin,tipo,e1,e2,e3,e4,e5,e6,e7,e8){
            this.url= 'api/reportes/tablaCambioInfoServ/'+anioIni +'/'+ mesIni +'/'+  anioFin +'/'+  mesFin +'/'+  tipo +'/'+  e1 + '/'+ e2 +'/'+  e3 +'/'+  e4 +'/'+  e5 +'/'+  e6 +'/'+  e7 +'/'+  e8;
        },
        setUrl222:function(anioIni,mesIni,anioFin,mesFin,dni,tipito,estito){
            this.url= 'api/reportes/tablaCambioInfoDelServ/'+anioIni +'/'+ mesIni +'/'+  anioFin +'/'+  mesFin +'/'+  dni +'/'+  tipito + '/'+ estito ;
        }

    });
    return tablaCambioInfoServ;
});



