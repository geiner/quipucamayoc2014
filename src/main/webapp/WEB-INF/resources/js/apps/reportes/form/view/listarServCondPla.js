
define([ 'backbone', 'marionette','hbs!apps/reportes/form/templates/listarServCondPla', 'apps/reportes/form/collection/listarServCondPla'],
    function (Backbone, Marionette, altabajamodal2Temp,listarServCondPlaColl) {
        var altabaja2=Backbone.Marionette.ItemView.extend({

            template: altabajamodal2Temp,
            collection: new listarServCondPlaColl(),
            getListarServCond:function(valor1,susp_ina, cese,  fallecido,  funmsm,  fplani,  term_cont,
                                       ren,  pen_susp, lsgh,  noRat,  destac,  lcgh, exclu, cadPen, docCCP, admCCP, docMagCCP, admProfSaludCCP, obreroCCP, sinTipoCCP,
                                       desigCCP, desigSaludCCP, permCCP, contrat,cesa, snp, sinEst,contrPers,cas, amc, anioIniCCP, mesIniCCP, anioFinCCP, mesFinCCP, callback){
                this.collection.setUrl11(valor1,susp_ina, cese,  fallecido,  funmsm,  fplani,  term_cont,
                    ren,  pen_susp, lsgh,  noRat,  destac,  lcgh, exclu, cadPen, docCCP, admCCP, docMagCCP, admProfSaludCCP, obreroCCP, sinTipoCCP,
                    desigCCP, desigSaludCCP, permCCP, contrat,cesa, snp, sinEst,contrPers,cas, amc, anioIniCCP, mesIniCCP, anioFinCCP, mesFinCCP);
                this.collection.on("sync",this.render,this);
                this.collection.fetch().done(callback);

        },

            getListarUnActivoServCond:function(valor1,susp_ina, cese,  fallecido,  funmsm,  fplani,  term_cont,
                                       ren,  pen_susp, lsgh,  noRat,  destac,  lcgh, exclu, cadPen, codTipCCP, codEstCCP, dniCCP, anioIniCCP, mesIniCCP,
                                       anioFinCCP, mesFinCCP, callback){
                this.collection.setUrl33(valor1,susp_ina, cese,  fallecido,  funmsm,  fplani,  term_cont,
                    ren,  pen_susp, lsgh,  noRat,  destac,  lcgh, exclu, cadPen, codTipCCP, codEstCCP, dniCCP, anioIniCCP, mesIniCCP, anioFinCCP, mesFinCCP);
                this.collection.on("sync",this.render,this);
                this.collection.fetch().done(callback);

            }






        })
        return altabaja2;

    });
