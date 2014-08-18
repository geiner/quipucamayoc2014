package edu.quipu.rrhh.services.implement;


import edu.quipu.rrhh.models.Reportes;
import edu.quipu.rrhh.persistence.ReportesMapper;
import edu.quipu.rrhh.services.ReportesService;
import edu.quipu.rrhh.util.ReportDownloader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;


@Service
public class ReportesServiceImpl implements ReportesService{

    protected static Logger logger = LoggerFactory.getLogger(ReportesServiceImpl.class);
    @Autowired
    ReportesMapper reportesMapper;

    @Autowired
    private ReportDownloader reportDownloader;

    @Autowired
    ServletContext context;


    //reporte de un solo Servidor   CIS - Carlos

    public void cargarReporteServidor(HttpServletResponse response,Integer anioIni, Integer anioFin,  Integer mesIni, Integer mesFin,Integer tipito,Integer estito,String dni
            ,boolean ParEst, boolean ParCat,boolean ParDep,boolean ParRegPen,boolean ParEntAseg,String usuario){
        String rutaReporte="/reportes/cambiosInfoServidor.jrxml";
        System.out.println("ENTRO A SERVICE IMPLEMENT DEL REPORTE");
        HashMap params = new HashMap();
        params.put("anioIni", anioIni);
        params.put("anioFin", anioFin);
        params.put("mesIni", mesIni);
        params.put("mesFin", mesFin);
        params.put("tipito", tipito);
        params.put("estito", estito);
        params.put("dni", dni);
        params.put("ParEst", ParEst);
        params.put("ParCat", ParCat);
        params.put("ParDep", ParDep);
        params.put("ParRegPen", ParRegPen);
        params.put("ParEntAseg", ParEntAseg);
        params.put("usuario", usuario);
        System.out.println(params);
        try {
            System.out.println("download");
            reportDownloader.downloadPDF(response, rutaReporte, "cambioInfoServidor.pdf", params);
        } catch (Exception e) {
            logger.error("No se pudo descargar el reporte: "+rutaReporte);
            e.printStackTrace();
        }
    }


    //reporte grupal   CIS - Carlos

    public void cargarReporteGrupal(HttpServletResponse response,Integer anioIni, Integer anioFin,  Integer mesIni, Integer mesFin,Integer tipito,Integer e1,Integer e2
                                    ,Integer e3,Integer e4,Integer e5,Integer e6,Integer e7,Integer e8,boolean ParEst, boolean ParCat,boolean ParDep,boolean ParRegPen,boolean ParEntAseg,String usuario){
        String rutaReporte="/reportes/cambiosInfoGrupal.jrxml";
        System.out.println("ENTRO A SERVICE iMPLEMENT DEL REPORTE");
        HashMap params = new HashMap();
        params.put("anioIni", anioIni);
        params.put("anioFin", anioFin);
        params.put("mesIni", mesIni);
        params.put("mesFin", mesFin);
        params.put("tipito", tipito);
        params.put("e1", e1);
        params.put("e2", e2);
        params.put("e3", e3);
        params.put("e4", e4);
        params.put("e5", e5);
        params.put("e6", e6);
        params.put("e7", e7);
        params.put("e8", e8);

        params.put("ParEst", ParEst);
        params.put("ParCat", ParCat);
        params.put("ParDep", ParDep);
        params.put("ParRegPen", ParRegPen);
        params.put("ParEntAseg", ParEntAseg);
        params.put("usuario", usuario);
        System.out.println(params);
        try {
            System.out.println("download");
            reportDownloader.downloadPDF(response, rutaReporte, "cambioInfoGrupal.pdf", params);
        } catch (Exception e) {
            logger.error("No se pudo descargar el reporte: "+rutaReporte);
            e.printStackTrace();
        }
    }

    //tabla cambio info serv   Grupal
    @Override
    public List<Reportes> tablaCambioInfoServ(Integer anioIni,Integer mesIni,Integer anioFin,Integer mesFin,Integer tipo,Integer e1,Integer e2,Integer e3,Integer e4,Integer e5,Integer e6,Integer e7,Integer e8){
        List<Reportes> tablaCambioInfoServ=reportesMapper.tablaCambioInfoServ(anioIni,mesIni,anioFin,mesFin,tipo,e1,e2,e3,e4,e5,e6,e7,e8);
        return tablaCambioInfoServ;
    }

    // tabla cambio info serv  de un solo servidor
    @Override
    public List<Reportes> tablaCambioInfoDelServ(Integer anioIni,Integer mesIni,Integer anioFin,Integer mesFin,String dni,Integer tipito,Integer estito){
        List<Reportes> tablaCambioInfoDelServ=reportesMapper.tablaCambioInfoDelServ(anioIni,mesIni,anioFin,mesFin,dni,tipito,estito);
        return tablaCambioInfoDelServ;
    }

    @Override
    public List<Reportes> tiposervidor(){
        return reportesMapper.tiposervidor();
    }

    @Override
    public List<Reportes> estservidor(){
        return reportesMapper.estservidor();
    }


    @Override
    public List<Reportes> catservidor(){
        return reportesMapper.catservidor();
    }

    @Override
    public List<Reportes> regpenservidor(){
        return reportesMapper.regpenservidor();
    }

    @Override
    public List<Reportes> tipagoservidor(){
        return reportesMapper.tipagoservidor();
    }

    @Override
    public List<Reportes> depservidor(){
        return reportesMapper.depservidor();
    }


    ////////////////////////////parte de Jean////////////////////////////

    //tabla para la condicion en planilla
    @Override
    public List<Reportes> tablaCondPla(Integer valor1, Integer susp_ina, Integer  cese, Integer fallecido, Integer funmsm, Integer fplani, Integer term_cont,
                                       Integer ren, Integer pen_susp,Integer lsgh, Integer noRat, Integer destac, Integer lcgh, Integer exclu,Integer cadPen,
                                       Integer docCCP, Integer admCCP,Integer docMagCCP,Integer admProfSaludCCP,Integer obreroCCP,Integer sinTipoCCP,Integer desigCCP,Integer desigSaludCCP,
                                       Integer permCCP,Integer contrat,Integer cesa,Integer snp,Integer sinEst,Integer contrPers,Integer cas,Integer amc, Integer anioIniCCP, Integer mesIniCCP,
                                       Integer anioFinCCP, Integer mesFinCCP){
        List<Reportes> mostrarTablaCondPla=reportesMapper.tablaCondPla(valor1, susp_ina,  cese,  fallecido,  funmsm,  fplani,  term_cont,
                ren,  pen_susp, lsgh,  noRat,  destac,  lcgh, exclu, cadPen,docCCP, admCCP,docMagCCP,admProfSaludCCP,obreroCCP,sinTipoCCP,desigCCP,desigSaludCCP,
                permCCP, contrat,cesa, snp, sinEst,contrPers,cas, amc, anioIniCCP, mesIniCCP, anioFinCCP, mesFinCCP);
        return mostrarTablaCondPla;
    }

    @Override
    public List<Reportes> tablaUnCondPla(Integer valor1, Integer susp_ina, Integer  cese, Integer fallecido, Integer funmsm, Integer fplani, Integer term_cont,
                                         Integer ren, Integer pen_susp,Integer lsgh, Integer noRat, Integer destac, Integer lcgh, Integer exclu,Integer cadPen,
                                         Integer codTipCCP,Integer codEstCCP,Integer dniCCP, Integer anioIniCCP, Integer mesIniCCP, Integer anioFinCCP, Integer mesFinCCP){
        List<Reportes> mostrarTablaCondPla=reportesMapper.tablaUnCondPla(valor1, susp_ina,  cese,  fallecido,  funmsm,  fplani,  term_cont,
                ren,  pen_susp, lsgh,  noRat,  destac,  lcgh, exclu, cadPen,codTipCCP,codEstCCP, dniCCP, anioIniCCP, mesIniCCP, anioFinCCP, mesFinCCP);
        return mostrarTablaCondPla;
    }

    @Override
    public void cargarReporteCondPlanilla(HttpServletResponse response, Integer sanc_disc, Integer susp_ina, Integer cese,
                                          Integer fallecido, Integer funmsm, Integer fplani, Integer term_cont, Integer ren,
                                          Integer pen_susp, Integer lsgh, Integer noRat, Integer destac, Integer lcgh,
                                          Integer exclu, Integer cadPen, Integer tipCCP, Integer permCCP, Integer contrat, Integer cesa,
                                          Integer snp, Integer sinEst, Integer contrPers, Integer cas, Integer amc, Integer anioIniCCP,
                                          Integer mesIniCCP, Integer anioFinCCP, Integer mesFinCCP){
        String rutaReporte="/reportes/condicionPlani.jrxml";
        HashMap params = new HashMap();
        params.put("sanc_disc",sanc_disc);
        params.put("susp_ina",susp_ina);
        params.put("cese",cese);
        params.put("fallecido",fallecido);
        params.put("funmsm",funmsm);
        params.put("fplani",fplani);
        params.put("term_cont",term_cont);
        params.put("ren",ren);
        params.put("pen_susp",pen_susp);
        params.put("lsgh",lsgh);
        params.put("noRat",noRat);
        params.put("destac",destac);
        params.put("lcgh",lcgh);
        params.put("exclu",exclu);
        params.put("cadPen",cadPen);
        params.put("tipCCP", tipCCP);
        params.put("permCCP", permCCP);
        params.put("contrat", contrat);
        params.put("cesa", cesa);
        params.put("snp", snp);
        params.put("sinEst", sinEst);
        params.put("contrPers", contrPers);
        params.put("cas", cas);
        params.put("amc", amc);
        params.put("anioIniCCP", anioIniCCP);
        params.put("mesIniCCP", mesIniCCP);
        params.put("anioFinCCP", anioFinCCP);
        params.put("mesFinCCP", mesFinCCP);

        System.out.println("entro al service impl: "+sanc_disc+" "+susp_ina+" tipo: "+tipCCP+" "+" anio ini"+anioIniCCP+" anio fin: "+anioFinCCP
                +" mes ini"+mesIniCCP+" mes fin"+mesFinCCP);

        try {
            System.out.println("antes del download");
            System.out.println("download");
            System.out.println("paso el download");


            reportDownloader.downloadPDF(response, rutaReporte, "reporte.pdf", params);
            System.out.println("despues del downloadPDF");
        } catch (Exception e) {
            System.out.println("antes del catch");
            System.out.println("catch");
            System.out.println("despues del catch");

            logger.error("No se pudo descargar el reporte: "+rutaReporte);
            System.out.println("despues de no se pudo descargar");
            e.printStackTrace();
            System.out.println("despues e printstack");
        }

    }

    @Override
    public void cargarReporteCondPlanillaUnTrab(HttpServletResponse response, Integer sanc_disc, Integer susp_ina, Integer cese,
                                                Integer fallecido, Integer funmsm, Integer fplani, Integer term_cont, Integer ren,
                                                Integer pen_susp, Integer lsgh, Integer noRat, Integer destac, Integer lcgh,
                                                Integer exclu, Integer cadPen, Integer tipCCP, Integer estCCP, Integer anioIniCCP,
                                                Integer mesIniCCP, Integer anioFinCCP, Integer mesFinCCP, Integer dniCCP){

        String rutaReporte="/reportes/condicionPlaniUnTrab.jrxml";
        HashMap params = new HashMap();
        params.put("sanc_disc",sanc_disc);
        params.put("susp_ina",susp_ina);
        params.put("cese",cese);
        params.put("fallecido",fallecido);
        params.put("funmsm",funmsm);
        params.put("fplani",fplani);
        params.put("term_cont",term_cont);
        params.put("ren",ren);
        params.put("pen_susp",pen_susp);
        params.put("lsgh",lsgh);
        params.put("noRat",noRat);
        params.put("destac",destac);
        params.put("lcgh",lcgh);
        params.put("exclu",exclu);
        params.put("cadPen",cadPen);
        params.put("tipCCP", tipCCP);
        params.put("estCCP", estCCP);
        params.put("anioIniCCP", anioIniCCP);
        params.put("mesIniCCP", mesIniCCP);
        params.put("anioFinCCP", anioFinCCP);
        params.put("mesFinCCP", mesFinCCP);
        params.put("dniCCP",dniCCP);

        System.out.println("entro al service impl: "+sanc_disc+" "+susp_ina+" tipo: "+tipCCP+" "+" anio ini"+anioIniCCP+" anio fin: "+anioFinCCP
                +" mes ini"+mesIniCCP+" mes fin"+mesFinCCP);

        try {
            System.out.println("antes del download");
            System.out.println("download");
            System.out.println("paso el download");


            reportDownloader.downloadPDF(response, rutaReporte, "reporte.pdf", params);
            System.out.println("despues del downloadPDF");
        } catch (Exception e) {
            System.out.println("antes del catch");
            System.out.println("catch");
            System.out.println("despues del catch");

            logger.error("No se pudo descargar el reporte: "+rutaReporte);
            System.out.println("despues de no se pudo descargar");
            e.printStackTrace();
            System.out.println("despues e printstack");
        }

    }

    ////////////////////////////parte de Fernando///////////////////////////////

    //parte de fernando tabla informacion
    @Override
    public List<Reportes> tablaInformacion(String sex, String sex1,String dia1,String mes1,String anio1,String dia2,String mes2,String anio2,String dia3,String mes3,String anio3,String dia4,String mes4,String anio4,String tip,String estados,String regimenpen,String tipago,String categ,String dependen){
        List<Reportes> tablaInformacion=reportesMapper.tablaInformacion(sex,sex1,dia1,mes1,anio1,dia2,mes2,anio2,dia3,mes3,anio3,dia4,mes4,anio4,tip,estados,regimenpen,tipago,categ,dependen);
        return tablaInformacion;
    }

    ///reporte ias Fernando
    public void cargarReportesIAS(HttpServletResponse response,String dia1,String mes1,String anio1,
                                  String dia2,String mes2,String anio2,String dia3,String mes3,String anio3,
                                  String dia4,String mes4,String anio4,String sexo1ias,String sexo2ias,String tipoias,
                                  String estaias,String catias,String regias,String depias,String pagias,String usuarias,
                                  Boolean fedad,Boolean fsexo,Boolean fcategoria,Boolean fregimen,Boolean ftipopago,Boolean fdependencia,Boolean funmsm){
        String rutaReporte="/reportes/listarnuevo.jrxml";
        System.out.println("ENTRO A SERVICE iMPLEMENT DEL REPORTE");
        HashMap params = new HashMap();
        params.put("dia1", dia1);
        params.put("mes1", mes1);
        params.put("anio1", anio1);
        params.put("dia2", dia2);
        params.put("mes2", mes2);
        params.put("anio2", anio2);
        params.put("dia3", dia3);
        params.put("mes3", mes3);
        params.put("anio3", anio3);
        params.put("dia4", dia4);
        params.put("mes4", mes4);
        params.put("anio4", anio4);
        params.put("sexo1ias",sexo1ias );
        params.put("sexo2ias",sexo2ias );
        params.put("tipoias",tipoias );
        params.put("estaias",estaias );
        params.put("catias",catias);
        params.put("regias",regias);
        params.put("depias",depias );
        params.put("pagias",pagias );
        params.put("usuarias",usuarias );
        params.put("fedad",fedad);
        params.put("fsexo",fsexo);
        params.put("fcategoria",fcategoria);
        params.put("fregimen",fregimen);
        params.put("ftipopago",ftipopago);
        params.put("fdependencia",fdependencia);
        params.put("funmsm",funmsm);


        System.out.println(params);
        try {
            System.out.println("download");
            reportDownloader.downloadPDF(response, rutaReporte, "Listado de Serv.pdf", params);
        } catch (Exception e) {
            logger.error("No se pudo descargar el reporte: "+rutaReporte);
            e.printStackTrace();
        }
    }

}
