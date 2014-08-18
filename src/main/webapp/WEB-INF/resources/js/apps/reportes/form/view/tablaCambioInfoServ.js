
define([ 'backbone', 'marionette','hbs!apps/reportes/form/templates/tablaCambioInfoServ', 'apps/reportes/form/collection/tablaCambioInfoServ'],
    function (Backbone, Marionette, tablaCambioInfoServTemp,tablaCambioInfoServColl) {
        var tablaCambioInfoServ=Backbone.Marionette.ItemView.extend({

            template: tablaCambioInfoServTemp,
            collection: new tablaCambioInfoServColl(),
            fetchtablaCambiosInfoServ:function( anioIni,mesIni,anioFin,mesFin,tipo,e1,e2,e3,e4,e5,e6,e7,e8,callback){
                this.collection.setUrl111(anioIni,mesIni,anioFin,mesFin,tipo,e1,e2,e3,e4,e5,e6,e7,e8);
                this.collection.on("sync",this.render,this);
                this.collection.fetch().done(callback);
            },
            fetchtablaCambiosInfoDelServ:function( anioIni,mesIni,anioFin,mesFin,dni,tipito,estito,callback){
                this.collection.setUrl222(anioIni,mesIni,anioFin,mesFin,dni,tipito,estito);
                this.collection.on("sync",this.render,this);
                this.collection.fetch().done(callback);
            }

        })
        return tablaCambioInfoServ;

    });

