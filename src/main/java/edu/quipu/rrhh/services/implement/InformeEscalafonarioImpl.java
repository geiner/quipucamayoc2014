package edu.quipu.rrhh.services.implement;



import edu.quipu.rrhh.models.informeescalafonario;
import edu.quipu.rrhh.persistence.InformeEscalafonarioMapper;
import edu.quipu.rrhh.services.informeescalafonarioService;
import edu.quipu.rrhh.util.ReportDownloader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;

@Service
@Repository
@Transactional
public class InformeEscalafonarioImpl implements informeescalafonarioService{

    protected static Logger logger = LoggerFactory.getLogger(InformeEscalafonarioImpl.class);

    @Autowired
    private ReportDownloader reportDownloader;

    @Autowired
    ServletContext context;

    @Autowired
    InformeEscalafonarioMapper informeescalafonarioMapper;


    @Override
    public void cargarReportesIES(HttpServletResponse response, String dniies, Integer numser, String usuaries) {
        String rutaReporte="/reportes/nuevo.jrxml";
        String valor = context.getRealPath("WEB-INF/classes/reportes");
        String logo=context.getRealPath("WEB-INF/classes/reportes/escudo_reporte.jpg");
        String logo1=context.getRealPath("WEB-INF/classes/reportes/logo.jpg");
        System.out.println("ENTRO A SERVICE iMPLEMENT DEL REPORTE");
        HashMap params = new HashMap();
        params.put("numserest",numser);
        params.put("dnimayor",dniies);
        params.put("usuarioies",usuaries);
        params.put("SUBREPORT_DIR",valor);
        params.put("logo",logo);
        params.put("logoquipu",logo1);

        System.out.println(params);
        try {
            System.out.println("download");

            reportDownloader.downloadPDF(response, rutaReporte, "Informe Escalafonario.pdf", params);
        } catch (Exception e) {
            logger.error("No se pudo descargar el reporte: "+rutaReporte);
            e.printStackTrace();
        }
    }

    @Override
    public List<informeescalafonario> todosServidores() {
        return informeescalafonarioMapper.todosServidores();  //To change body of implemented methods use File | Settings | File Templates.
    }
}
