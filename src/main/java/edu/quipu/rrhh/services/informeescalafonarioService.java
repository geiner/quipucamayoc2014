package edu.quipu.rrhh.services;




import edu.quipu.rrhh.models.Servidor;
import edu.quipu.rrhh.models.informeescalafonario;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

public interface informeescalafonarioService {
    void cargarReportesIES(HttpServletResponse response, String dniies, Integer numser, String usuaries);
    public List<informeescalafonario> todosServidores();
}
