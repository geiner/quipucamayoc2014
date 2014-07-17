package edu.quipu.rrhh.persistence;

import edu.quipu.rrhh.models.*;
import org.apache.ibatis.annotations.*;

import java.util.List;


public interface CuadroNominalMapper {




    @Select(value = "SELECT  plaza.C_COD_PLAZA AS CODPLAZA,\n" +
            "        cargoE.T_NOM_CARGO_ESTR as NOMESTRUC,\n" +
            "        dependencia.UD_ID  AS DEPENDENCIACODD,\n" +
            "        dependencia.UD_DSC  AS DEPENDENCIA,\n" +
            "        plaza.N_EST_PLAZA AS IDESTPLAZA,\n" +
            "        estado.T_DES_ESTADO AS ESTPLAZA,\n" +
            "        nominal.SER_COD AS COD_SER,\n" +
            "        nominal.NUM_SEREST AS NUMSEREST,\n" +
            "        servidor.SER_APE_PAT AS SERPAT,\n" +
            "        servidor.SER_APE_MAT AS SERMAT,\n" +
            "        servidor.SER_NOM AS SERNOM,\n" +
            "        TO_CHAR(nominal.SER_FECH_ING ,'DD/MM/YYYY')  AS FECH_ING,\n" +
            "        TO_CHAR(nominal.SER_FECH_SAL ,'DD/MM/YYYY')  AS FECH_SAL,\n" +
            "        serModalidad.SER_MOD_DESC AS MODALIDAD  \n" +
            "        \n" +
            "FROM  ( ( ( (  QPRODATAPLANI.TB_CARGO cargo\n" +
            "INNER JOIN QPRODATAPLANI.TB_NUM_PLAZAS plaza ON plaza.N_COD_CARGO=cargo.C_COD_CARGO\n" +
            "INNER JOIN QPRODATAPLANI.TB_CARGO_CLASIF_ESTRUCT cargoClasif ON  cargoClasif.C_COD_CARGO_CLASIF_ESTR=cargo.C_CARCLA_COD\n" +
            "INNER JOIN QPRODATAQUIPU.UNI_DEP dependencia ON dependencia.UD_ID=cargo.N_UD_ID  )\n" +
            "LEFT JOIN QPRODATAPLANI.TB_CUADRO_NOMINAL nominal ON nominal.COD_PLAZA=plaza.C_COD_PLAZA\n" +
            "INNER JOIN QPRODATAPLANI.TB_ESTADO_PLAZA estado ON  estado.C_COD_ESTADO=plaza.N_EST_PLAZA  )\n" +
            "INNER JOIN  QPRODATAPLANI.TB_CARGO_ESTRUCTURAL cargoE ON  cargoE.C_COD_CARGO_ESTR=cargoClasif.N_COD_CARGO_ESTR)\n" +
            "LEFT JOIN  QPRODATAPLANI.TB_SERVIDOR_MODALIDAD serModalidad ON  serModalidad.COD_SER_MODALIDAD=nominal.SER_MOD)\n" +
            "LEFT JOIN  DATAPERSUEL.SERVIDOR servidor ON  servidor.SER_COD=nominal.SER_COD\n" +
            "\n" +
            "WHERE (   cargo.N_UD_ID  IN ( \n" +
            "SELECT  dependencia1.ud_id\n" +
            "FROM QPRODATAQUIPU.UNI_DEP dependencia1\n" +
            "WHERE (  \n" +
            "SUBSTR(dependencia1.ud_cod,1,(  SELECT  LENGTH(dep.ud_cod) FROM qprodataquipu.uni_dep dep WHERE (dep.ud_id LIKE (#{codDependencia})) ) ) \n" +
            "LIKE  (SELECT  dep.ud_cod FROM qprodataquipu.uni_dep dep WHERE (  dep.ud_id LIKE  (#{codDependencia})   )  )  )   )  AND  plaza.N_ANIO LIKE   (#{anioPlaza}) AND (plaza.N_EST_PLAZA LIKE 3 OR  plaza.N_EST_PLAZA LIKE 4 OR  plaza.N_EST_PLAZA LIKE 5 OR  plaza.N_EST_PLAZA LIKE 6  )     )\n" +
            "ORDER BY NOMESTRUC")
    @Results(value = {
            @Result(javaType = PlazaCAP.class),
            @Result(property = "cod_plaza",column = "CODPLAZA"),
            @Result(property = "nom_estruc",column = "NOMESTRUC"),
            @Result(property = "id_depend",column = "DEPENDENCIACODD"),
            @Result(property = "subDep",column = "DEPENDENCIA"),
            @Result(property = "est_plaza",column = "ESTPLAZA"),
            @Result(property = "cod_servidor",column = "COD_SER"),
            @Result(property = "ape_pat",column = "SERPAT"),
            @Result(property = "ape_mat",column = "SERMAT"),
            @Result(property = "nom_ser",column = "SERNOM"),
            @Result(property = "fech_ing",column = "FECH_ING"),
            @Result(property = "fech_sal",column = "FECH_SAL"),
            @Result(property = "ser_mod",column = "MODALIDAD"),
            @Result(property = "cod_est_plaza",column = "IDESTPLAZA")
    })
    List<PlazaCAP> plazasPorDepen(@Param("codDependencia") String codDependencia, @Param("anioPlaza") Integer anioPlaza);




    @Select(value = " SELECT    servidor_estado.SER_COD AS CODIGO,\n" +
            "          servidor_estado.NUM_SEREST AS NUMSEREST,\n" +
            "          servidor.SER_APE_PAT  AS APEPAT,\n" +
            "          servidor.SER_APE_MAT AS APEMAT,\n" +
            "          servidor.SER_NOM AS NOMBRE,\n" +
            "          servidor_estado.SER_COD_DEP_RAC AS DEPENDENCIA,\n" +
            "          servidor_plan.COD_CON_PLA AS CODPLA,\n" +
            "          servidor_plan.DES_CON_PLA AS CONDICION\n" +
            "          \n" +
            "FROM (\n" +
            "DATAPERSUEL.SERVIDOR_ESTADO servidor_estado\n" +
            "INNER JOIN DATAPERSUEL.SERVIDOR servidor ON servidor.SER_COD=servidor_estado.SER_COD\n" +
            "INNER JOIN DATAPERSUEL.COND_SER_PLAN servidor_plan ON servidor_plan.COD_CON_PLA=servidor_estado.SER_CON_PLA_ACT\n" +
            "INNER JOIN DATAPERSUEL.TB_SERVIDOR_PAP_2014 servidor_pap ON servidor_pap.SER_COD_ANT=servidor_estado.SER_COD_ANT)\n" +
            "           \n" +
            "WHERE (servidor_estado.SER_COD_DEP_RAC IN (SELECT  dependencia1.ud_id\n" +
            "FROM QPRODATAQUIPU.UNI_DEP dependencia1\n" +
            "WHERE (  \n" +
            "SUBSTR(dependencia1.ud_cod,1,(  SELECT  LENGTH(dep.ud_cod) FROM qprodataquipu.uni_dep dep WHERE (dep.ud_id LIKE (#{codDependencia})  ) ) ) \n" +
            "LIKE  (SELECT  dep.ud_cod FROM qprodataquipu.uni_dep dep WHERE (  dep.ud_id LIKE  (#{codDependencia})   )  )  )    )  AND   servidor_plan.COD_CON_PLA IN (1,2,8)  )")
    @Results(value = {
            @Result(javaType = Servidor.class),
            @Result(property = "codigo",column = "CODIGO"),
            @Result(property = "descestado",column = "NUMSEREST"),
            @Result(property = "paterno",column = "APEPAT"),
            @Result(property = "materno",column = "APEMAT"),
            @Result(property = "nombre",column = "NOMBRE")
    })
    List<Servidor> servidoresPorDepen(@Param("codDependencia") String codDependencia);


    /*

    @Select(value = " SELECT servidor_estado.SER_COD AS CODIGO,servidor_estado.NUM_SEREST AS NUMSEREST,servidor.SER_APE_PAT  AS APEPAT,servidor.SER_APE_MAT AS APEMAT,servidor.SER_NOM AS NOMBRE,servidor_estado.SER_COD_DEP_RAC AS DEPENDENCIA,servidor_plan.COD_CON_PLA AS CODPLA,servidor_plan.DES_CON_PLA AS CONDICION  \n" +
            "FROM (DATAPERSUEL.SERVIDOR_ESTADO servidor_estado\n" +
            "INNER JOIN DATAPERSUEL.SERVIDOR servidor ON servidor.SER_COD=servidor_estado.SER_COD\n" +
            "INNER JOIN DATAPERSUEL.COND_SER_PLAN servidor_plan ON servidor_plan.COD_CON_PLA=servidor_estado.SER_CON_PLA_ACT)\n" +
            "WHERE (servidor_estado.SER_COD_DEP_RAC LIKE (#{codDependencia}) AND   servidor_plan.COD_CON_PLA IN (1,2,8))")
    @Results(value = {
            @Result(javaType = Servidor.class),
            @Result(property = "codigo",column = "CODIGO"),
            @Result(property = "descestado",column = "NUMSEREST"),
            @Result(property = "paterno",column = "APEPAT"),
            @Result(property = "materno",column = "APEMAT"),
            @Result(property = "nombre",column = "NOMBRE")
    })
    List<Servidor> servidoresPorDepen(@Param("codDependencia") String codDependencia);
*/


    @Select(value = " SELECT DISTINCT(N_ANIO)  AS AÑO\n" +
            "FROM QPRODATAPLANI.TB_NUM_PLAZAS\n" +
            "ORDER BY N_ANIO DESC")
    @Results(value = {
            @Result(javaType = PlazaCAP.class),
            @Result(property = "año",column = "AÑO")
    })
    List<PlazaCAP> añoPlazas();



    @Insert(value="insert into QPRODATAPLANI.TB_CUADRO_NOMINAL values(#{codPlaza},#{codSer},#{numserest},TO_DATE(#{fechIni},'DD/MM/YY'),TO_DATE(#{fechFin},'DD/MM/YY'),#{modSer})")
    void addPlazaNominal(@Param("codPlaza") int codPlaza, @Param("codSer") String codServidor, @Param("numserest") int numserest, @Param("fechIni") String fechIng, @Param("fechFin") String fechSal, @Param("modSer") int modSer);



    @Update(value="update QPRODATAPLANI.TB_NUM_PLAZAS set N_EST_PLAZA=4 where C_COD_PLAZA=#{codPlaza}")
    void updateCuadroNominalOcupado(@Param("codPlaza") int codigo) ;

    //****************************************************************************

    @Update(value="update QPRODATAPLANI.TB_NUM_PLAZAS set N_EST_PLAZA=#{estPlaza} where C_COD_PLAZA=#{codPlaza}")
    void updateEstadoPlaza(@Param("codPlaza") int codigo, @Param("estPlaza") int estPlaza) ;

   //******************************************************************************


    @Delete(value="delete from QPRODATAPLANI.TB_CUADRO_NOMINAL   where  COD_PLAZA=#{codPlaza}")
    void deleteAsignacion(@Param("codPlaza") int codPlaza);




    @Update(value="update QPRODATAPLANI.TB_NUM_PLAZAS set N_EST_PLAZA=3 where C_COD_PLAZA=#{codPlaza}")
    void updateCuadroNominalVacante(@Param("codPlaza") int codigo) ;


/*
    @Delete(value="delete from QPRODATAPLANI.TB_ROTACION_PLAZA   where  COD_PLAZA=#{codPlaza}")
    void deleteItemsHistorialPlaza(@Param("codPlaza") int codPlaza);

*/

    @Select(value = "SELECT modalidad.COD_SER_MODALIDAD as COD_MOD,modalidad.SER_MOD_DESC as DSC_MOD\n" +
            "FROM QPRODATAPLANI.TB_SERVIDOR_MODALIDAD  modalidad")
    @Results(value = {
            @Result(javaType = ModalidadAsignacion.class),
            @Result(property = "idModAsig",column = "COD_MOD"),
            @Result(property = "descripcion",column = "DSC_MOD"),
    })
    List<ModalidadAsignacion> allModalidad();



/*
    @Select(value = "SELECT dependencia2.UD_COD AS UD_COD,dependencia2.UD_DSC AS  UD_DSC\n" +
            "FROM (QPRODATAQUIPU.TB_HIST_USU_PERF  historialUsuario\n" +
            "INNER  JOIN  QPRODATAQUIPU.UNI_DEP  dependencia ON dependencia.UD_ID=historialUsuario.UD_ID)\n" +
            "INNER  JOIN  QPRODATAQUIPU.UNI_DEP  dependencia2 ON dependencia2.UD_ID=dependencia.UNIDEPCALDEP\n" +
            "WHERE (  substr(historialUsuario.T_MAIL,1,(length(historialUsuario.T_MAIL)-3)    )  LIKE #{emailUsuario})")
    @Results(value = {
            @Result(javaType = Origen.class),
            @Result(property = "origenCodigo",column = "UD_COD"),
            @Result(property = "origenDescripcion",column = "UD_DSC")
    })
    List<Origen> obtenerDependenciaUsuario(@Param("emailUsuario") String emailUsuario);*/




    @Select(value = "SELECT dependencia2.UD_COD AS UD_COD, dependencia3.PERF_DESC  AS PERFIL\n" +
            "FROM ((QPRODATAQUIPU.TB_HIST_USU_PERF  historialUsuario\n" +
            "INNER  JOIN  QPRODATAQUIPU.UNI_DEP  dependencia ON dependencia.UD_ID=historialUsuario.UD_ID)\n" +
            "INNER  JOIN  QPRODATAQUIPU.UNI_DEP  dependencia2 ON dependencia2.UD_ID=dependencia.UNIDEPCALDEP)\n" +
            "INNER  JOIN  QPRODATAQUIPU.TB_PERFIL  dependencia3 ON dependencia3.PERF_COD=historialUsuario.PERF_COD\n" +
            "WHERE (  substr(historialUsuario.T_MAIL,1,(length(historialUsuario.T_MAIL)-3)    )  LIKE   #{emailUsuario})")
    @Results(value = {
            @Result(javaType = Origen.class),
            @Result(property = "origenCodigo",column = "UD_COD"),
            @Result(property = "origenDescripcion",column = "PERFIL")
    })
    List<Origen> obtenerDependenciaUsuario(@Param("emailUsuario") String emailUsuario);



    @Select(value = "SELECT  dep1.UD_ID   AS UD_ID_HIJO,dep1.UD_COD AS UD_COD_HIJO,dep1.UD_DSC AS UD_DSC_HIJO,dep2.UD_ID  AS UD_ID_PADRE,dep2.UD_COD  AS  UD_COD_PADRE,dep2.UD_DSC  AS UD_DSC_PADRE\n" +
            "FROM   QPRODATAQUIPU.UNI_DEP dep1\n" +
            "INNER JOIN QPRODATAQUIPU.UNI_DEP dep2 ON (dep2.UD_COD= SUBSTR(dep1.UD_COD,1,3)  OR dep2.UD_COD= SUBSTR(dep1.UD_COD,1,5)     )\n" +
            "WHERE(dep1.UD_ID  LIKE  (#{codDep})  )")
    @Results(value = {
            @Result(javaType = EncabezadoDepySubDep.class),
            @Result(property = "ud_id_hijo",column = "UD_ID_HIJO"),
            @Result(property = "ud_cod_hijo",column = "UD_COD_HIJO"),
            @Result(property = "ud_dsc_hijo",column = "UD_DSC_HIJO"),
            @Result(property = "ud_id_padre",column = "UD_ID_PADRE"),
            @Result(property = "ud_cod_padre",column = "UD_COD_PADRE"),
            @Result(property = "ud_dsc_padre",column = "UD_DSC_PADRE")
    })
    List<EncabezadoDepySubDep> obtenerDepySubDep(@Param("codDep") String codDep);



}
