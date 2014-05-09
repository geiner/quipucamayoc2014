package edu.quipu.rrhh.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import edu.quipu.rrhh.services.ReportService;

import javax.servlet.http.HttpServletResponse;


@Controller
@RequestMapping("/rest/reportes")
public class ReportsController {

	protected static Logger logger = LoggerFactory.getLogger(ReportsController.class);

    @Autowired
    private ReportService reportsService;


    @RequestMapping(value = "/planillasCAS/unidades/{unidadId}/anio/{anio}/mes/{mes}/reporteConformidad/pdf", consumes = "application/json", method = RequestMethod.GET, params = {"rucs"})
    public void mostrarReporteConformidad(HttpServletResponse response, @PathVariable(value="anio") int anio, @PathVariable(value="mes") int mes, @PathVariable(value="unidadId") int unidadId,@RequestParam(value="rucs", required=false)String[] rucs) {
        logger.info("adsfAAAAAAAAAAAAAAAAAAAAAAAAAa"+anio+" "+mes+" "+unidadId);
    }

    @RequestMapping(value = "/planillasCAS/reporteConformidad/pdf",method = RequestMethod.POST)
    public void mostrarReporteConformidad(HttpServletResponse response,Integer anio, Integer mes,  Integer unidadId,String usuario, String uddesc, String origen,String rucs, String planilla) {
        String cortar_cadena=rucs;
        int tamaño=cortar_cadena.length()/11;
          int k=0;
          String[] array_rucs=new String[tamaño];
          for(int i=0;i<=(cortar_cadena.length()-11);i=i+11){
             array_rucs[k]=cortar_cadena.substring(i,i+11);
             System.out.println(array_rucs[k]);
             k=k+1;
          }
        reportsService.cargarReporteDeConformidad(response, anio,mes,unidadId,"geiner",uddesc,origen,planilla,array_rucs);

    }

    @RequestMapping(value = "/planillasCAS/reporteConformidadPagos/pdf", method = RequestMethod.POST)
    public void mostrarReporteConformidadPagos(HttpServletResponse response, Integer anio, Integer mes,  Integer unidadId, String uddesc, String origen, String planilla, String rucs) {
        String cortar_cadena=rucs;
        int tamaño=cortar_cadena.length()/11;
        int j=0;
        int k=0;
        String[] array_rucs=new String[tamaño];
        for(int i=0;i<=cortar_cadena.length()-11;i=i+11){
            array_rucs[k]=cortar_cadena.substring(i,i+11);
            System.out.println(array_rucs[k]+"-");
            k=k+1;
        }
        reportsService.cargarReporteDePagosTardanzas(response, anio, mes, unidadId, "wmanriques", uddesc, origen, planilla, array_rucs);
    }

    @RequestMapping(method = RequestMethod.POST,/* produces = "application/json",*/ value ="/resoluciones/reporteresoluciones/pdf"/*/{codigo}/{numserest}/{nom_serv}/{cod_serv}/{usuario}*/)
    public void mostrarReporteResolucionesServidor(HttpServletResponse response,/*@PathVariable(value = "codigo")*/ String codigo,/*@PathVariable(value = "numserest")*/ String numserest,
                                                   /*@PathVariable(value = "nom_serv")*/ String nom_serv,/*@PathVariable(value = "cod_serv")*/ String cod_serv,/*@PathVariable(value = "usuario")*/ String usuario) {
        System.out.println("entro a reporte: "+codigo+" "+numserest+" "+usuario+" "+cod_serv);
        System.out.println("porsiacaso");
        reportsService.cargarReporteDeResoluciones(response, codigo.trim(), Integer.parseInt(numserest), nom_serv, cod_serv, usuario);

    }

    @RequestMapping(value = "/beneficio/reportedescansos/pdf", method = RequestMethod.POST)
    public void mostrarReporteDescansosMedicos(HttpServletResponse response, String anio, String mes,String nombremes,String usuario,String codigos) {
        System.out.println(codigos+"-");
        String[] array_codigos= codigos.split("/");
        for(String dia : array_codigos){
            System.out.println(dia);
        }




        /*int tamaño=codigos.length()/8;
        String[] array_codigos=new String[tamaño];
        int k=0;
        for(int i=0;i<=codigos.length()-8;i=i+8){
            array_codigos[k]=codigos.substring(i,i+8);
            System.out.println(array_codigos[k]+"-");
            k=k+1;
        }*/
        reportsService.cargarReporteDescansos(response,anio,mes,nombremes,usuario,array_codigos);
    }



}
