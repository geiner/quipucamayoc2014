package edu.quipu.rrhh.services;

import javax.servlet.http.HttpServletResponse;


public interface ReportService {

    void cargarReporteDeConformidad(HttpServletResponse response, Integer anio, Integer mes, Integer udid, String usuario, String uddesc, String origen, String planilla, String[] rucs);

    void cargarReporteDePagosTardanzas(HttpServletResponse response, Integer anio, Integer mes, Integer udid, String usuario, String uddesc, String origen, String planilla, String[] rucs);

    void cargarReporteDeResoluciones(HttpServletResponse response, String codigo, Integer numserest, String nom_serv, String cod_serv, String usuario);

    void cargarReporteDescansos(HttpServletResponse response, String anio, String mes, String nombremes, String usuario, String[] array_codigos);

   // void cargarReporteCuadroNominal(HttpServletResponse response, String codigoDependencia, String usuarioCN, String nom_depen,Integer anio);

    //void cargarReporteCuadroNominal(HttpServletResponse response, String codigoDependencia, String usuarioCN, String nom_depen);



    void cargarReporteCuadroNominal(HttpServletResponse response, String codigoDependencia, String usuarioCN, String nom_depen,Integer anio);


    void cargarReporteCuadroNominalTotal(HttpServletResponse response,String usuarioCN,Integer anio);

    void cargarReporteDescansosxanio(HttpServletResponse response, String anio, String usuario, String[] array_codigos);
}
