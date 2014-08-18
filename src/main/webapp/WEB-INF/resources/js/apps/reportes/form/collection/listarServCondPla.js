define(['backbone', 'apps/reportes/form/model/listarServCondPla'], function (Backbone, listarServCondPla) {

    var listarServCondPla = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: listarServCondPla,

        setUrl11:function(valor1, susp_ina, cese,  fallecido,  funmsm,  fplani,  term_cont,
                          ren,  pen_susp, lsgh,  noRat,  destac,  lcgh, exclu, cadPen, docCCP, admCCP, docMagCCP, admProfSaludCCP, obreroCCP, sinTipoCCP,
                          desigCCP, desigSaludCCP,permCCP, contrat,cesa, snp, sinEst,contrPers,cas, amc, anioIniCCP, mesIniCCP, anioFinCCP, mesFinCCP){
            this.url= 'api/reportes/listarServCondPla/'+valor1+'/'+susp_ina+'/'+cese+'/'+fallecido+'/'+funmsm+'/'+fplani+'/'+term_cont+
               '/'+ren+'/'+pen_susp+'/'+lsgh+'/'+noRat+'/'+destac+'/'+lcgh+'/'+exclu+'/'+cadPen+'/'+docCCP+'/'+admCCP+'/'+docMagCCP+'/'+admProfSaludCCP+'/'+obreroCCP+'/'+sinTipoCCP+
               '/'+desigCCP+'/'+desigSaludCCP+'/'+permCCP+'/'+contrat+'/'+cesa+'/'+snp+'/'+sinEst+'/'+contrPers+'/'+cas+'/'+amc+'/'+anioIniCCP+'/'+mesIniCCP+'/'+anioFinCCP+'/'+mesFinCCP;
        },

        setUrl33:function(valor1, susp_ina, cese,  fallecido,  funmsm,  fplani,  term_cont,
                          ren,  pen_susp, lsgh,  noRat,  destac,  lcgh, exclu, cadPen, codTipCCP, codEstCCP, dniCCP, anioIniCCP, mesIniCCP, anioFinCCP, mesFinCCP){
            this.url= 'api/reportes/listarUnServCondPla/'+valor1+'/'+susp_ina+'/'+cese+'/'+fallecido+'/'+funmsm+'/'+fplani+'/'+term_cont+
                '/'+ren+'/'+pen_susp+'/'+lsgh+'/'+noRat+'/'+destac+'/'+lcgh+'/'+exclu+'/'+cadPen+'/'+codTipCCP+'/'+codEstCCP+'/'+dniCCP+'/'+anioIniCCP+'/'+mesIniCCP+'/'+anioFinCCP+'/'+mesFinCCP;
        }





    });
    return listarServCondPla;
});



