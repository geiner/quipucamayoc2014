package edu.quipu.rrhh.services.implement;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import edu.quipu.rrhh.services.ReportService;
import edu.quipu.rrhh.util.ReportDownloader;

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

    public void cargarReporteDePagosTardanzas(HttpServletResponse response, int anio, int mes, int udid, String usuario, String uddesc, String origen, String planilla, String[] rucs){
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

}
