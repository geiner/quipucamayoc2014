/**
 * Created with IntelliJ IDEA.
 * User: Jean-PC
 * Date: 21/07/14
 * Time: 03:30 PM
 * To change this template use File | Settings | File Templates.
 */

define(['backbone', 'apps/reportes/form/model/listarServCondPla2'], function (Backbone, listarServCondPla2) {

    var ListarServCond = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: listarServCondPla2,

        setUrlListarServCond2: function(valor1, susp_ina, cese, fallecido, funmsm, fplani, term_cont,
                                        ren,  pen_susp, lsgh,  noRat,  destac,  lcgh, exclu, cadPen,
                                        docCCP,admCCP, docMagCCP, admProfSaludCCP, obreroCCP, sinTipoCCP,
                                        desigCCP, desigSaludCCP, permCCP, contrat, cesa, snp, sinEst, contrPers, cas, amc,
                                        anioIniCCP, mesIniCCP, anioFinCCP, mesFinCCP){
            this.url= 'api/reportes/listarServCondPla/'+valor1+'/'+susp_ina+'/'+cese+'/'+fallecido+'/'+funmsm+'/'+fplani+'/'+term_cont+'/'+
            ren+'/'+pen_susp+'/'+lsgh+'/'+noRat+'/'+destac+'/'+lcgh+'/'+exclu+'/'+cadPen+'/'+docCCP+'/'+admCCP+'/'+docMagCCP+'/'+admProfSaludCCP+'/'+
            obreroCCP+'/'+sinTipoCCP+'/'+desigCCP+'/'+desigSaludCCP+'/'+permCCP+'/'+contrat+'/'+cesa+'/'+snp+'/'+sinEst+'/'+contrPers+'/'+cas+'/'+amc+
            '/'+anioIniCCP+'/'+mesIniCCP+'/'+anioFinCCP+'/'+mesFinCCP;
        }

        ,
        setUrl22:function(valor1, susp_ina, cese,  fallecido,  funmsm,  fplani,  term_cont,
                          ren,  pen_susp, lsgh,  noRat,  destac,  lcgh, exclu, cadPen, codTipCCP, codEstCCP, dniCCP, anioIniCCP, mesIniCCP, anioFinCCP, mesFinCCP){
            this.url= 'api/reportes/listarUnServCondPla/'+valor1+'/'+susp_ina+'/'+cese+'/'+fallecido+'/'+funmsm+'/'+fplani+'/'+term_cont+
                '/'+ren+'/'+pen_susp+'/'+lsgh+'/'+noRat+'/'+destac+'/'+lcgh+'/'+exclu+'/'+cadPen+'/'+codTipCCP+'/'+codEstCCP+'/'+dniCCP+'/'+anioIniCCP+'/'+mesIniCCP+'/'+anioFinCCP+'/'+mesFinCCP;
        }
    });
    return ListarServCond;
});
