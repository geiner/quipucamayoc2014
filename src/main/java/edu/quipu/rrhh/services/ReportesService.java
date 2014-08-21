package edu.quipu.rrhh.services;

import edu.quipu.rrhh.models.Reportes;

import javax.servlet.http.HttpServletResponse;
import javax.swing.*;
import java.util.List;

public interface ReportesService {

    void cargarReporteServidor(HttpServletResponse response,Integer anioIni, Integer anioFin,  Integer mesIni, Integer mesFin,Integer tipito,Integer estito,
                               String dni,boolean ParEst, boolean ParCat,boolean ParDep,boolean ParRegPen,boolean ParEntAseg,String usuario,ImageIcon logoSM) ;
    void cargarReporteGrupal(HttpServletResponse response,Integer anioIni,  Integer mesIni, Integer tipito,Integer e1,
                             boolean ParEst, boolean ParCat,boolean ParDep,boolean ParRegPen,boolean ParEntAseg,String usuario,ImageIcon logoSM);

    List<Reportes> tablaCambioInfoServ(Integer anioIni,Integer mesIni,Integer tipo,Integer e1);
    List<Reportes> tablaCambioInfoDelServ(Integer anioIni,Integer mesIni,Integer anioFin,Integer mesFin,String dni,Integer tipito,Integer estito);

    List<Reportes> tiposervidor();
    List<Reportes> estservidor();
    List<Reportes> catservidor();
    List<Reportes> regpenservidor();
    List<Reportes> tipagoservidor();
    List<Reportes> depservidor();

    ////////////////////////parte de Jean//////////////////////
    List<Reportes> tablaCondPla(Integer valor1, Integer susp_ina, Integer cese, Integer fallecido, Integer funmsm, Integer fplani, Integer term_cont,
                                Integer ren, Integer pen_susp, Integer lsgh, Integer noRat, Integer destac, Integer lcgh, Integer exclu, Integer cadPen,
                                Integer docCCP, Integer admCCP, Integer docMagCCP, Integer admProfSaludCCP, Integer obreroCCP, Integer sinTipoCCP, Integer desigCCP, Integer desigSaludCCP,
                                Integer permCCP, Integer contrat, Integer cesa, Integer snp, Integer sinEst, Integer contrPers, Integer cas, Integer amc, Integer anioIniCCP, Integer mesIniCCP,
                                Integer anioFinCCP, Integer mesFinCCP);

    List<Reportes> tablaUnCondPla(Integer valor1, Integer susp_ina, Integer cese, Integer fallecido, Integer funmsm, Integer fplani, Integer term_cont,
                                  Integer ren, Integer pen_susp, Integer lsgh, Integer noRat, Integer destac, Integer lcgh, Integer exclu, Integer cadPen, Integer codTipCCP, Integer codEstCCP, Integer dniCCP,
                                  Integer anioIniCCP, Integer mesIniCCP, Integer anioFinCCP, Integer mesFinCCP);
    void cargarReporteCondPlanilla(HttpServletResponse response, Integer sanc_disc, Integer susp_ina, Integer cese, Integer fallecido, Integer funmsm, Integer fplani, Integer term_cont, Integer ren,
                                   Integer pen_susp, Integer lsgh, Integer noRat, Integer destac, Integer lcgh, Integer exclu, Integer cadPen, Integer tipCCP, Integer permCCP, Integer contrat, Integer cesa,
                                   Integer snp, Integer sinEst, Integer contrPers, Integer cas, Integer amc,
                                   Integer anioIniCCP, Integer mesIniCCP, Integer anioFinCCP, Integer mesFinCCP);
    void cargarReporteCondPlanillaUnTrab(HttpServletResponse response, Integer sanc_disc, Integer susp_ina, Integer cese, Integer fallecido, Integer funmsm, Integer fplani, Integer term_cont, Integer ren,
                                         Integer pen_susp, Integer lsgh, Integer noRat, Integer destac, Integer lcgh, Integer exclu, Integer cadPen, Integer tipCCP, Integer estCCP,
                                         Integer anioIniCCP, Integer mesIniCCP, Integer anioFinCCP, Integer mesFinCCP, Integer dniCCP);

    //////////////////////parte de Fernando///////////////////////
    void cargarReportesIAS(HttpServletResponse response, String dia1, String mes1, String anio1,
                           String dia2, String mes2, String anio2, String dia3, String mes3, String anio3,
                           String dia4, String mes4, String anio4, String sexo1ias, String sexo2ias, String tipoias,
                           String estaias, String catias, String regias, String depias, String pagias, String usuarias,
                           Boolean fedad, Boolean fsexo, Boolean fcategoria, Boolean fregimen, Boolean ftipopago, Boolean fdependencia, Boolean funmsm);



    //parte de fernando tabla informacion
    List<Reportes> tablaInformacion(String sex, String sex1, String dia1, String mes1, String anio1, String dia2, String mes2, String anio2, String dia3, String mes3, String anio3,
                                    String dia4, String mes4, String anio4, String tip, String estados, String regimenpen, String tipago, String categ, String dependen);





}
