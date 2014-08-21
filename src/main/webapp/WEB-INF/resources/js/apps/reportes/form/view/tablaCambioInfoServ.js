define([ 'backbone', 'marionette','hbs!apps/reportes/form/templates/tablaCambioInfoServ', 'apps/reportes/form/collection/tablaCambioInfoServ'],
    function (Backbone, Marionette, tablaCambioInfoServTemp,tablaCambioInfoServColl) {
        var tablaCambioInfoServ=Backbone.Marionette.ItemView.extend({

            template: tablaCambioInfoServTemp,
            collection: new tablaCambioInfoServColl(),
            fetchtablaCambiosInfoServ:function( anioIni,mesIni,tipo,e1,callback){
                this.collection.setUrl111(anioIni,mesIni,tipo,e1);
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

