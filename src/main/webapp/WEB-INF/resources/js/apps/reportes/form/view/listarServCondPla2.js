/**
 * Created with IntelliJ IDEA.
 * User: Jean-PC
 * Date: 17/07/14
 * Time: 08:20 AM
 * To change this template use File | Settings | File Templates.
 */
define([ 'backbone', 'marionette','hbs!apps/reportes/form/templates/listarServCondPla2','apps/reportes/form/collection/listarServCondPla2'],
    function (Backbone, Marionette, altabajamodal2Temp, listarServCondPlaColl) {
        var altabaja2=Backbone.Marionette.ItemView.extend({

            template: altabajamodal2Temp,
            collection: new listarServCondPlaColl(),


            getListarServCond2: function(valor1,susp_ina, cese,  fallecido,  funmsm,  fplani,  term_cont,
                                         ren,  pen_susp, lsgh,  noRat,  destac,  lcgh, exclu, cadPen, docCCP, admCCP, docMagCCP, admProfSaludCCP, obreroCCP, sinTipoCCP,
                                         desigCCP, desigSaludCCP,permCCP, contrat,cesa, snp, sinEst,contrPers,cas, amc,anioIniCCP, mesIniCCP, anioFinCCP, mesFinCCP, callback){

            this.collection.setUrlListarServCond2(valor1,susp_ina,  cese,  fallecido,  funmsm,  fplani,  term_cont,
                ren,  pen_susp, lsgh,  noRat,  destac,  lcgh, exclu, cadPen, docCCP, admCCP, docMagCCP, admProfSaludCCP, obreroCCP, sinTipoCCP,
                desigCCP, desigSaludCCP, permCCP, contrat,cesa, snp, sinEst,contrPers,cas, amc, anioIniCCP, mesIniCCP, anioFinCCP, mesFinCCP);
            this.collection.on("sync", this.render, this);
            this.collection.fetch().done(callback);

        },

            getLisarUnServCond2:function(valor1,susp_ina, cese,  fallecido,  funmsm,  fplani,  term_cont,
                                         ren,  pen_susp, lsgh,  noRat,  destac,  lcgh, exclu, cadPen, codTipCCP, codEstCCP, dniCCP,anioIniCCP, mesIniCCP, anioFinCCP, mesFinCCP, callback){
                this.collection.setUrl22(valor1,susp_ina, cese,  fallecido,  funmsm,  fplani,  term_cont,
                    ren,  pen_susp, lsgh,  noRat,  destac,  lcgh, exclu, cadPen, codTipCCP, codEstCCP, dniCCP, anioIniCCP, mesIniCCP, anioFinCCP, mesFinCCP);
                this.collection.on("sync",this.render,this);
                this.collection.fetch().done(callback);

            }



        })
        return altabaja2;

    });

