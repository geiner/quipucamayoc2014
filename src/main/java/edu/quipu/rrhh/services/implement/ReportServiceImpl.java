package edu.quipu.rrhh.services.implement;

import edu.quipu.rrhh.services.ReportService;
import edu.quipu.rrhh.util.ReportDownloader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;


/**
 * Service para procesamiento de reportes jasper.
 */
@Service
public class ReportServiceImpl implements ReportService {

    protected static Logger logger = LoggerFactory.getLogger(ReportServiceImpl.class);

    @Autowired
    private ReportDownloader reportDownloader;

    @Autowired
    ServletContext context;

    public void cargarReporteDeConformidad(HttpServletResponse response, Integer anio, Integer mes, Integer udid, String usuario, String uddesc, String origen, String planilla, String[] rucs){
        String rutaReporte="/reportes/reporteConformidad.jrxml";
        System.out.println(rutaReporte+"anio:"+anio+rucs[0]);
        HashMap params = new HashMap();
        params.put("anio", anio);
        params.put("mes", mes);
        params.put("udid", udid);
        params.put("usuario", usuario);
        params.put("uddesc", uddesc);
        params.put("origen", origen);
        params.put("planilla", planilla);
        params.put("vectorSeleccionados", rucs);
        System.out.println(params);
        try {
            System.out.println("download");
            reportDownloader.downloadPDF(response, rutaReporte, "reporteConformidad.pdf", params);
        } catch (Exception e) {
            logger.error("No se pudo descargar el reporte: "+rutaReporte);
            e.printStackTrace();
        }
    }

    public void cargarReporteDePagosTardanzas(HttpServletResponse response, Integer anio, Integer mes, Integer udid, String usuario, String uddesc, String origen, String planilla, String[] rucs){
        String rutaReporte="/reportes/reporteConformidadPagos.jrxml";
        HashMap params = new HashMap();
        params.put("anio", anio);
        params.put("mes", mes);
        params.put("udid", udid);
        params.put("usuario", usuario);
        params.put("uddesc", uddesc);
        params.put("origen", origen);
        params.put("planilla", planilla);
        params.put("vectorSeleccionados", rucs);
//        h.put("logo", servletContext.getRealPath("/pages/images/escudo.jpg"));
//        h.put("miniLogoQuipu",
//                servletContext.getRealPath("/pages/images/LogoQuipu-jpg.png"));
        try {
            reportDownloader.downloadPDF(response, rutaReporte, "reporteConformidadPagos.pdf", params);
        } catch (Exception e) {
            logger.error("No se pudo descargar el reporte: "+rutaReporte);
            e.printStackTrace();
        }
    }

    @Override
    public void cargarReporteDeResoluciones(HttpServletResponse response ,String codigo, Integer numserest, String nom_serv, String cod_serv,String usuario) {
        String rutaReporte="/reportes/reporteresolucion1.jrxml";
        HashMap params = new HashMap();
        params.put("codigo", codigo);
        params.put("numserest", numserest);
        params.put("nom_serv", nom_serv);
        params.put("cod_serv", cod_serv);
        params.put("usuario", usuario);
        System.out.println(params);
        try {
            System.out.println("download");
            reportDownloader.downloadPDF(response, rutaReporte, "reporte.pdf", params);
        } catch (Exception e) {
            System.out.println("catch");
            logger.error("No se pudo descargar el reporte: "+rutaReporte);
            e.printStackTrace();
        }
    }

    @Override
    public void cargarReporteDescansos(HttpServletResponse response, String anio, String mes, String nombremes, String usuario, String[] array_codigos) {
        String rutaReporte="/reportes/reportedescansos.jrxml";
        HashMap params = new HashMap();
        params.put("anio", anio);
        params.put("mes", mes);
        params.put("nombremes", nombremes);
        params.put("usuario", usuario);
        params.put("vectorSeleccionados",array_codigos);
//        h.put("logo", servletContext.getRealPath("/pages/images/escudo.jpg"));
//        h.put("miniLogoQuipu",
//                servletContext.getRealPath("/pages/images/LogoQuipu-jpg.png"));
        try {
            reportDownloader.downloadPDF(response, rutaReporte, "reportedescansos.pdf", params);
        } catch (Exception e) {
            logger.error("No se pudo descargar el reporte: "+rutaReporte);
            e.printStackTrace();
        }
    }



   /* @Override
    public void cargarReporteCuadroNominal(HttpServletResponse response ,String codDep,String usuarioCN, String nom_depen) {
        String rutaReporte="/reportes/reporteCuadroNominal.jrxml";
        HashMap params = new HashMap();
        params.put("codDep", codDep);
        params.put("usuarioCN", usuarioCN);
        params.put("nom_depen", nom_depen);


        System.out.println(params);
        try {
            System.out.println("download");
            reportDownloader.downloadPDF(response, rutaReporte, "reporteCN.pdf", params);
        } catch (Exception e) {
            System.out.println("catch");
            logger.error("No se pudo descargar el reporte: "+rutaReporte);
            e.printStackTrace();
        }
    }*/








    @Override
    public void cargarReporteCuadroNominal(HttpServletResponse response ,String codDep,String usuarioCN, String nom_depen,Integer anio) {


        String cadena=nom_depen;


        cadena=cadena.replaceAll("á","?");
        cadena=cadena.replaceAll("é","?");
        cadena=cadena.replaceAll("í","?");
        cadena=cadena.replaceAll("ó","?");
        cadena=cadena.replaceAll("ú","?");
        cadena=cadena.replaceAll("ñ","?");


        char[] caracteres = cadena.toCharArray();

        caracteres[0] = Character.toUpperCase(caracteres[0]);

        for (int i = 0; i < cadena.length()- 2; i++){

            if (caracteres[i] == ' ' || caracteres[i] == '.' || caracteres[i] == ',') {

                caracteres[i + 1] = Character.toUpperCase(caracteres[i + 1]);

            }
        }

        cadena= new String(caracteres);

        System.out.println("Mostramos la cadena sin defecto: "+cadena);

        String valor = context.getRealPath("WEB-INF/classes/reportes/subReportCuadroNominal.jasper");

        System.out.println("Context: ********************************************************************************************* "+context);

        // String realpath = ServletActionContext.getServletContext ().getRealPath ("/");

        System.out.println("Ruta 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888: "+valor);



        String rutaReporte="/reportes/reporteCuadroNominal.jrxml";
        HashMap params = new HashMap();
        params.put("codDep", codDep);
        params.put("usuarioCN", usuarioCN);
        params.put("nom_depen",cadena);
        params.put("anio", anio);



        //String  valor="C:/ultimo/quipucamayoc2014/src/main/resources/reportes/subReportCuadroNominal.jasper";




        params.put("SUBREPORT_DIR",valor);

        //****************

       // String  rutaLogo=" WEB-INF/classes/reportes/escudo_reporte.jpg";


        String  rutaLogo = context.getRealPath("WEB-INF/classes/reportes/escudo_reporte.jpg");
        params.put("logo",rutaLogo);


        //************************





        System.out.println(params);
        try {
            System.out.println("download");
            reportDownloader.downloadPDF(response, rutaReporte, "reporteCN.pdf", params);
        } catch (Exception e) {
            System.out.println("catch");
            logger.error("No se pudo descargar el reporte: "+rutaReporte);
            e.printStackTrace();
        }
    }


    @Override
    public void cargarReporteCuadroNominalTotal(HttpServletResponse response,String usuarioCN, Integer anio) {


        String rutaReporte="/reportes/reporteCuadroNominalTotal.jrxml";
        HashMap params = new HashMap();
        // params.put("codDep", codDep);
        params.put("usuarioCN", usuarioCN);
        // params.put("nom_depen",cadena);
        params.put("anio", anio);


        System.out.println(params);
        try {
            System.out.println("download");
            reportDownloader.downloadPDF(response, rutaReporte, "reporteCN_Total.pdf", params);
        } catch (Exception e) {
            System.out.println("catch");
            logger.error("No se pudo descargar el reporte: "+rutaReporte);
            e.printStackTrace();
        }


    }

    @Override
    public void cargarReporteDescansosxanio(HttpServletResponse response, String anio, String usuario, String[] array_codigos) {
        String rutaReporte="/reportes/reportedescansosxanio.jrxml";
        HashMap params = new HashMap();
        params.put("anio", anio);
        params.put("usuario", usuario);
        params.put("vectorSeleccionados",array_codigos);
//        h.put("logo", servletContext.getRealPath("/pages/images/escudo.jpg"));
//        h.put("miniLogoQuipu",
//                servletContext.getRealPath("/pages/images/LogoQuipu-jpg.png"));
        try {
            reportDownloader.downloadPDF(response, rutaReporte, "reportedescansosAnual.pdf", params);
        } catch (Exception e) {
            logger.error("No se pudo descargar el reporte: "+rutaReporte);
            e.printStackTrace();
        }
    }





}
