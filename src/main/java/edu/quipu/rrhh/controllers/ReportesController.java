package edu.quipu.rrhh.controllers;

import edu.quipu.rrhh.models.Reportes;
import edu.quipu.rrhh.services.ReportesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Controller
@RequestMapping("/api/reportes")
public class ReportesController {

    protected static Logger logger = LoggerFactory.getLogger(ReportesController.class);

   @Autowired
    ReportesService reportesService;

    //para el reporte de un solo servidor CIS - Carlos
    @RequestMapping(value = "/reporteServidor/cis/pdf",method = RequestMethod.POST)
    public void mostrarReporteServidor(HttpServletResponse response,String anioIni, String anioFin,  String mesIni, String mesFin,String tipito,String estito,String dni,
                                       String ParEst, String ParCat,String ParDep,String ParRegPen,String ParEntAseg,String usuario) {
        System.out.println("anioIni: "+ anioIni+"dni: "+dni);
        System.out.println("entro y mando de controller");

        reportesService.cargarReporteServidor(response, Integer.parseInt(anioIni),Integer.parseInt(anioFin),Integer.parseInt(mesIni),Integer.parseInt(mesFin),Integer.parseInt(tipito), Integer.parseInt(estito),
                dni,Boolean.parseBoolean(ParEst),Boolean.parseBoolean(ParCat),Boolean.parseBoolean(ParDep),Boolean.parseBoolean(ParRegPen),Boolean.parseBoolean(ParEntAseg),usuario );

    }


    //para el reporte grupal   CIS - Carlos
    @RequestMapping(value = "/reporteGrupal/cis/pdf",method = RequestMethod.POST)
    public void mostrarReporteGrupal(HttpServletResponse response,String anioIni, String anioFin,  String mesIni, String mesFin,String tipito,String e1,String e2,
                                     String e3,String e4,String e5,String e6,String e7,String e8,String ParEst, String ParCat,String ParDep,String ParRegPen,String ParEntAseg,String usuario) {

        System.out.println("entro y mando de controller");
        reportesService.cargarReporteGrupal(response, Integer.parseInt(anioIni),Integer.parseInt(anioFin),Integer.parseInt(mesIni),Integer.parseInt(mesFin),Integer.parseInt(tipito), Integer.parseInt(e1),
                Integer.parseInt(e2),Integer.parseInt(e3),Integer.parseInt(e4),Integer.parseInt(e5),Integer.parseInt(e6),Integer.parseInt(e7),Integer.parseInt(e8),
                Boolean.parseBoolean(ParEst),Boolean.parseBoolean(ParCat),Boolean.parseBoolean(ParDep),Boolean.parseBoolean(ParRegPen),Boolean.parseBoolean(ParEntAseg),usuario );

    }

    //para la tabla Cambio en la Informacion del Servidor ----- Grupal
    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value="/tablaCambioInfoServ/{anioIni}/{mesIni}/{anioFin}/{mesFin}/{tipo}/{e1}/{e2}/{e3}/{e4}/{e5}/{e6}/{e7}/{e8}")
    @ResponseBody
    public List<Reportes> tablaCambioInfoServ(@PathVariable(value="anioIni") Integer anioIni,@PathVariable(value="mesIni") Integer mesIni,@PathVariable(value="anioFin") Integer anioFin,
                                              @PathVariable(value="mesFin") Integer mesFin,@PathVariable(value="tipo") Integer tipo,@PathVariable(value="e1") Integer e1,
                                              @PathVariable(value="e2") Integer e2,@PathVariable(value="e3") Integer e3,@PathVariable(value="e4") Integer e4,
                                              @PathVariable(value="e5") Integer e5,@PathVariable(value="e6") Integer e6,@PathVariable(value="e7") Integer e7,
                                              @PathVariable(value="e8") Integer e8){
        System.out.println("entro a tabla cambio de info Grupal= "+anioIni);
        List<Reportes> tablaCambioInfoServ = reportesService.tablaCambioInfoServ(anioIni,mesIni,anioFin,mesFin,tipo,e1,e2,e3,e4,e5,e6,e7,e8);
        return tablaCambioInfoServ;

    }

    //para la tabla Cambio en la Informacion del Servidor ----- De un solo Servidor
    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value="/tablaCambioInfoDelServ/{anioIni}/{mesIni}/{anioFin}/{mesFin}/{dni}/{tipito}/{estito}")
    @ResponseBody
    public List<Reportes> tablaCambioInfoServ(@PathVariable(value="anioIni") Integer anioIni,@PathVariable(value="mesIni") Integer mesIni,@PathVariable(value="anioFin") Integer anioFin,
                                              @PathVariable(value="mesFin") Integer mesFin,@PathVariable(value="dni") String dni,@PathVariable(value="tipito") Integer tipito,
                                              @PathVariable(value="estito") Integer estito){
        System.out.println("entro a tabla cambio de info del Servidor= "+anioIni);
        List<Reportes> tablaCambioInfoDelServ = reportesService.tablaCambioInfoDelServ(anioIni,mesIni,anioFin,mesFin,dni,tipito,estito);
        return tablaCambioInfoDelServ;

    }

    //Para el combo tipo de pago
    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/tiposervidor")
    @ResponseBody
    public List<Reportes> tiposervidor(){
        return reportesService.tiposervidor();
    }


    /////para el combo tipo estado
    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/estservidor")
    @ResponseBody
    public List<Reportes> estservidor(){
        return reportesService.estservidor();
    }


    /////para el combo categoria
    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/catservidor")
    @ResponseBody
    public List<Reportes> catservidor(){
        return reportesService.catservidor();
    }

    /////para el combo régimen pensionario
    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/regpenservidor")
    @ResponseBody
    public List<Reportes> regpenservidor(){
        return reportesService.regpenservidor();
    }

    /////para el combo Tipo de Pago
    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/tipagoservidor")
    @ResponseBody
    public List<Reportes> tipagoservidor(){
        return reportesService.tipagoservidor();
    }

    /////para el combo Dependencia
    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/depservidor")
    @ResponseBody
    public List<Reportes> depservidor(){
        return reportesService.depservidor();
    }
    /////////////////////////////////Parte de Jean////////////////////////////////////////////////////////////////
    ///para mostrar en la tabla condicion en planilla
    @RequestMapping(method = RequestMethod.GET, produces="application/json", value="/listarServCondPla/{valor1}/{susp_ina}/{cese}/{fallecido}/{funmsm}/{fplani}/{term_cont}/"+
            "{ren}/{pen_susp}/{lsgh}/{noRat}/{destac}/{lcgh}/{exclu}/{cadPen}/{docCCP}/{admCCP}/{docMagCCP}/{admProfSaludCCP}/{obreroCCP}/{sinTipoCCP}/{desigCCP}/{desigSaludCCP}/"+
            "{permCCP}/{contrat}/{cesa}/{snp}/{sinEst}/{contrPers}/{cas}/{amc}/{anioIniCCP}/{mesIniCCP}/{anioFinCCP}/{mesFinCCP}")
    @ResponseBody
    public List<Reportes> tablaServCondPla(@PathVariable(value = "valor1") int valor1,
                                           @PathVariable(value = "susp_ina") int susp_ina,
                                           @PathVariable(value = "cese") int cese,
                                           @PathVariable(value = "fallecido") int fallecido,
                                           @PathVariable(value = "funmsm") int funmsm,
                                           @PathVariable(value = "fplani") int fplani,
                                           @PathVariable(value = "term_cont") int term_cont,
                                           @PathVariable(value = "ren") int ren,
                                           @PathVariable(value = "pen_susp") int pen_susp,
                                           @PathVariable(value = "lsgh") int lsgh,
                                           @PathVariable(value = "noRat") int noRat,
                                           @PathVariable(value = "destac") int destac,
                                           @PathVariable(value = "lcgh") int lcgh,
                                           @PathVariable(value = "exclu") int exclu,
                                           @PathVariable(value = "cadPen") int cadPen,

                                           @PathVariable(value = "docCCP") int docCCP,
                                           @PathVariable(value = "admCCP") int admCCP,
                                           @PathVariable(value = "docMagCCP") int docMagCCP,
                                           @PathVariable(value = "admProfSaludCCP") int admProfSaludCCP,
                                           @PathVariable(value = "obreroCCP") int obreroCCP,
                                           @PathVariable(value = "sinTipoCCP") int sinTipoCCP,
                                           @PathVariable(value = "desigCCP") int desigCCP,
                                           @PathVariable(value = "desigSaludCCP") int desigSaludCCP,

                                           @PathVariable(value = "permCCP") int permCCP,
                                           @PathVariable(value = "contrat") int contrat,
                                           @PathVariable(value = "cesa") int cesa,
                                           @PathVariable(value = "snp") int snp,
                                           @PathVariable(value = "sinEst") int sinEst,
                                           @PathVariable(value = "contrPers") int contrPers,
                                           @PathVariable(value = "cas") int cas,
                                           @PathVariable(value = "amc") int amc,
                                           @PathVariable(value = "anioIniCCP") int anioIniCCP,
                                           @PathVariable(value = "mesIniCCP") int mesIniCCP,
                                           @PathVariable(value = "anioFinCCP") int anioFinCCP,
                                           @PathVariable(value = "mesFinCCP") int mesFinCCP){

        System.out.println("entro a tabla cond pla pen_susp= "+valor1+ "susp_ina="+susp_ina);
        List<Reportes> tablaCondPla = reportesService.tablaCondPla(valor1, susp_ina,  cese,  fallecido,  funmsm,  fplani,  term_cont,
                ren,  pen_susp, lsgh,  noRat,  destac,  lcgh, exclu, cadPen, docCCP, admCCP, docMagCCP, admProfSaludCCP, obreroCCP, sinTipoCCP, desigCCP, desigSaludCCP,
                permCCP, contrat, cesa, snp, sinEst,contrPers,cas, amc, anioIniCCP, mesIniCCP, anioFinCCP, mesFinCCP);
        return tablaCondPla;

    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/listarUnServCondPla/{valor1}/{susp_ina}/{cese}/{fallecido}/{funmsm}/{fplani}/{term_cont}"+
            "/{ren}/{pen_susp}/{lsgh}/{noRat}/{destac}/{lcgh}/{exclu}/{cadPen}/{codTipCCP}/{codEstCCP}/{dniCCP}/{anioIniCCP}/{mesIniCCP}/{anioFinCCP}/{mesFinCCP}")
    @ResponseBody
    public List<Reportes> tablaUnServCondPla(@PathVariable(value = "valor1") int valor1,
                                             @PathVariable(value = "susp_ina") int susp_ina,
                                             @PathVariable(value = "cese") int cese,
                                             @PathVariable(value = "fallecido") int fallecido,
                                             @PathVariable(value = "funmsm") int funmsm,
                                             @PathVariable(value = "fplani") int fplani,
                                             @PathVariable(value = "term_cont") int term_cont,
                                             @PathVariable(value = "ren") int ren,
                                             @PathVariable(value = "pen_susp") int pen_susp,
                                             @PathVariable(value = "lsgh") int lsgh,
                                             @PathVariable(value = "noRat") int noRat,
                                             @PathVariable(value = "destac") int destac,
                                             @PathVariable(value = "lcgh") int lcgh,
                                             @PathVariable(value = "exclu") int exclu,
                                             @PathVariable(value = "cadPen") int cadPen,
                                             @PathVariable(value = "codTipCCP") int codTipCCP,
                                             @PathVariable(value = "codEstCCP") int codEstCCP,
                                             @PathVariable(value = "dniCCP") int dniCCP,
                                             @PathVariable(value = "anioIniCCP") int anioIniCCP,
                                             @PathVariable(value = "mesIniCCP") int mesIniCCP,
                                             @PathVariable(value = "anioFinCCP") int anioFinCCP,
                                             @PathVariable(value = "mesFinCCP") int mesFinCCP
    ) {
        List<Reportes> tablaUnCondPla = reportesService.tablaUnCondPla(valor1, susp_ina,  cese,  fallecido,  funmsm,  fplani,  term_cont,
                ren,  pen_susp, lsgh,  noRat,  destac,  lcgh, exclu, cadPen, codTipCCP, codEstCCP, dniCCP, anioIniCCP, mesIniCCP, anioFinCCP, mesFinCCP);
        return tablaUnCondPla;
    }


    @RequestMapping(value ="/condicionplanilla/reportecondplanilla/pdf", method = RequestMethod.POST )
    public void mostrarReporteCondPlanilla(HttpServletResponse response, Integer sanc_disc, Integer susp_ina, Integer cese, Integer fallecido, Integer funmsm, Integer fplani, Integer term_cont,
                                           Integer ren, Integer pen_susp, Integer lsgh, Integer noRat, Integer destac, Integer lcgh, Integer exclu, Integer cadPen, Integer tipCCP, Integer permCCP,
                                           Integer contrat, Integer cesa, Integer snp, Integer sinEst, Integer contrPers, Integer cas, Integer amc,
                                           Integer anioIniCCP, Integer mesIniCCP, Integer anioFinCCP, Integer mesFinCCP) {

        System.out.println("entro al controlador: "+sanc_disc+" "+susp_ina+" tipo: "+tipCCP+" estado: "+" anio ini y fin: "+anioIniCCP+" "+anioFinCCP+" mes ini y fin: "+mesIniCCP+" "+mesFinCCP);
        reportesService.cargarReporteCondPlanilla(response, sanc_disc, susp_ina, cese, fallecido, funmsm, fplani, term_cont, ren, pen_susp, lsgh, noRat, destac, lcgh, exclu, cadPen, tipCCP, permCCP,
                contrat, cesa, snp, sinEst, contrPers, cas, amc, anioIniCCP, mesIniCCP, anioFinCCP, mesFinCCP);

    }


    @RequestMapping(value = "/condicionplanilla/reportecondplanillauntrab/pdf", method = RequestMethod.POST)
    public void mostrarReporteCondPlanillaUnTrab(HttpServletResponse response,Integer sanc_disc, Integer susp_ina, Integer cese, Integer fallecido, Integer funmsm, Integer fplani, Integer term_cont,
                                                 Integer ren, Integer pen_susp, Integer lsgh, Integer noRat, Integer destac, Integer lcgh, Integer exclu, Integer cadPen,Integer tipCCP,Integer estCCP,
                                                 Integer anioIniCCP, Integer mesIniCCP, Integer anioFinCCP, Integer mesFinCCP, Integer dniCCP){

        System.out.println("entro al controlador de un trab: datos "+sanc_disc+" "+susp_ina+" "+tipCCP+" "+estCCP+" "+dniCCP+" "+anioIniCCP+" "+mesIniCCP);
        reportesService.cargarReporteCondPlanillaUnTrab(response,sanc_disc,susp_ina,cese,fallecido,funmsm,fplani, term_cont, ren, pen_susp, lsgh, noRat, destac, lcgh, exclu, cadPen, tipCCP, estCCP,
                anioIniCCP, mesIniCCP, anioFinCCP,mesFinCCP, dniCCP);
    }


    //para la tabla de fernando tabla informacion
    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "tabla_informacion/{sex}/{sex1}/{dia1}/{mes1}/{anio1}/{dia2}/{mes2}/{anio2}/{dia3}/{mes3}/{anio3}/{dia4}/{mes4}/{anio4}/{tip}/{estados}/{regimenpen}/{tipago}/{categ}/{dependen}")
    @ResponseBody

    public List<Reportes> tablaInformacion(@PathVariable(value = "sex") String sex,@PathVariable(value = "sex1") String sex1,@PathVariable(value = "dia1") String dia1,@PathVariable(value = "mes1") String mes1,
                                           @PathVariable(value = "anio1") String anio1,@PathVariable(value = "dia2") String dia2,@PathVariable(value = "mes2") String mes2,@PathVariable(value = "anio2") String anio2,
                                           @PathVariable(value = "dia3") String dia3,@PathVariable(value = "mes3") String mes3,@PathVariable(value = "anio3") String anio3,@PathVariable(value = "dia4") String dia4,
                                           @PathVariable(value = "mes4") String mes4,@PathVariable(value = "anio4") String anio4,@PathVariable(value = "tip") String tip,@PathVariable(value = "estados") String estados,
                                           @PathVariable(value = "regimenpen") String regimenpen,@PathVariable(value = "tipago") String tipago,@PathVariable(value = "categ") String categ,@PathVariable(value = "dependen") String dependen){
        String fni=dia1+"/"+mes1+"/"+anio1;
        String fnf=dia2+"/"+mes2+"/"+anio2;

        List<Reportes> tablaInformacion = reportesService.tablaInformacion(sex,sex1,dia1,mes1,anio1,dia2,mes2,anio2,dia3,mes3,anio3,dia4,mes4,anio4,tip,estados,regimenpen,tipago,categ,dependen);
        return tablaInformacion;

    }
    //cargarReportesIAS
    @RequestMapping(value = "/reporteser/ias/pdf",method = RequestMethod.POST)
    public void cargarReportesIAS(HttpServletResponse response,String dia1,String mes1,String anio1,
                                  String dia2,String mes2,String anio2,String dia3,String mes3,String anio3,
                                  String dia4,String mes4,String anio4,String sexo1ias,String sexo2ias,String tipoias,
                                  String estaias,String catias,String regias,String depias,String pagias,String usuarias,
                                  Boolean fedad,Boolean fsexo,Boolean fcategoria,Boolean fregimen,Boolean ftipopago,Boolean fdependencia,Boolean funmsm) {
        System.out.println( "fecha1: "+dia1+"/"+ mes1+"/"+ anio1+"fecha2:"+dia2+"/"+mes2+"/"+ anio2+"fecha3: "+ dia3+"/"+mes3+"/"+anio3+"fecha4:"+dia4+"/"+ mes4+"/"+ anio4+
                "sexos:"+sexo1ias+"-"+ sexo2ias+"Tipo de trabajador:"+ tipoias+"estado"+ estaias+"cat:"+ catias+"regimen"+ regias+"dependencia"+ depias+"tipo de pago"+ pagias+"usuario"+ usuarias);
        System.out.println("entro y mando de controller");
        reportesService.cargarReportesIAS(response, dia1, mes1, anio1,dia2,mes2, anio2, dia3, mes3, anio3,dia4, mes4, anio4, sexo1ias, sexo2ias, tipoias,estaias, catias, regias, depias, pagias, usuarias, fedad, fsexo, fcategoria, fregimen, ftipopago, fdependencia, funmsm );

    }


    //Mio no borrar por favor: Atte   Paul Yaringaño





}
