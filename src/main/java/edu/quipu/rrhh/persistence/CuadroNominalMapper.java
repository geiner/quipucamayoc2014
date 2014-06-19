package edu.quipu.rrhh.persistence;

import edu.quipu.rrhh.models.ModalidadAsignacion;
import edu.quipu.rrhh.models.PlazaCAP;
import edu.quipu.rrhh.models.Servidor;
import org.apache.ibatis.annotations.*;

import java.util.List;


public interface CuadroNominalMapper {




    @Select(value = "SELECT  plaza.C_COD_PLAZA AS CODPLAZA     ,cargoE.T_NOM_CARGO_ESTR as NOMESTRUC ,dependencia.UD_DSC  AS DEPENDENCIA   ,estado.T_DES_ESTADO AS ESTPLAZA     ,nominal.SER_COD AS COD_SER       ,nominal.NUM_SEREST AS NUMSEREST      ,servidor.SER_APE_PAT AS SERPAT      ,servidor.SER_APE_MAT AS SERMAT      ,servidor.SER_NOM AS SERNOM     ,TO_CHAR(nominal.SER_FECH_ING ,'DD/MM/YYYY')  AS FECH_ING       ,TO_CHAR(nominal.SER_FECH_SAL ,'DD/MM/YYYY')   AS FECH_SAL        ,serModalidad.SER_MOD_DESC AS MODALIDAD\n" +
            "FROM  ( (((QPRODATAPLANI.TB_CARGO cargo\n" +
            "INNER JOIN QPRODATAPLANI.TB_NUM_PLAZAS plaza ON plaza.N_COD_CARGO=cargo.C_COD_CARGO\n" +
            "INNER JOIN QPRODATAPLANI.TB_CARGO_CLASIF_ESTRUCT cargoClasif ON  cargoClasif.C_COD_CARGO_CLASIF_ESTR=cargo.C_CARCLA_COD\n" +
            "INNER JOIN QPRODATAQUIPU.UNI_DEP dependencia ON dependencia.UD_ID=cargo.N_UD_ID)\n" +
            "LEFT JOIN QPRODATAPLANI.TB_CUADRO_NOMINAL nominal ON nominal.COD_PLAZA=plaza.C_COD_PLAZA\n" +
            "INNER JOIN QPRODATAPLANI.TB_ESTADO_PLAZA estado ON  estado.C_COD_ESTADO=plaza.N_EST_PLAZA AND (estado.T_DES_ESTADO like 'VACANTE'  or  estado.T_DES_ESTADO like 'OCUPADO') )\n" +
            "INNER JOIN  QPRODATAPLANI.TB_CARGO_ESTRUCTURAL cargoE ON  cargoE.C_COD_CARGO_ESTR=cargoClasif.N_COD_CARGO_ESTR)\n" +
            "LEFT JOIN  QPRODATAPLANI.TB_SERVIDOR_MODALIDAD serModalidad ON  serModalidad.COD_SER_MODALIDAD=nominal.SER_MOD)\n" +
            "LEFT JOIN  DATAPERSUEL.SERVIDOR servidor ON  servidor.SER_COD=nominal.SER_COD \n" +
            "WHERE (cargo.N_UD_ID  in (SELECT  dependencia1.ud_id \n" +
            "FROM QPRODATAQUIPU.UNI_DEP dependencia1\n" +
            "WHERE (SUBSTR(dependencia1.ud_cod,1, (SELECT  length(dep.ud_cod)\n" +
            "FROM qprodataquipu.uni_dep dep\n" +
            "WHERE (dep.ud_id like (#{codDependencia}))\n" +
            "))  like  (SELECT  dep.ud_cod\n" +
            "FROM qprodataquipu.uni_dep dep\n" +
            "WHERE (dep.ud_id like (#{codDependencia}))))))")
    @Results(value = {
            @Result(javaType = PlazaCAP.class),
            @Result(property = "cod_plaza",column = "CODPLAZA"),
            @Result(property = "nom_estruc",column = "NOMESTRUC"),
            @Result(property = "subDep",column = "DEPENDENCIA"),
            @Result(property = "est_plaza",column = "ESTPLAZA"),
            @Result(property = "cod_servidor",column = "COD_SER"),
            @Result(property = "ape_pat",column = "SERPAT"),
            @Result(property = "ape_mat",column = "SERMAT"),
            @Result(property = "nom_ser",column = "SERNOM"),
            @Result(property = "fech_ing",column = "FECH_ING"),
            @Result(property = "fech_sal",column = "FECH_SAL"),
            @Result(property = "ser_mod",column = "MODALIDAD"),
    })
    List<PlazaCAP> plazasPorDepen(@Param("codDependencia") String codDependencia);



/*
    @Select(value = "SELECT plaza.C_COD_PLAZA AS CODPLAZA,cargoE.T_NOM_CARGO_ESTR as NOMESTRUC,estado.T_DES_ESTADO AS ESTPLAZA,nominal.SER_COD AS COD_SER,nominal.NUM_SEREST AS NUMSEREST,servidor.SER_APE_PAT AS SERPAT,servidor.SER_APE_MAT AS SERMAT,servidor.SER_NOM AS SERNOM,TO_CHAR(nominal.SER_FECH_ING ,'DD/MM/YYYY')  AS FECH_ING,  TO_CHAR(nominal.SER_FECH_SAL ,'DD/MM/YYYY')   AS FECH_SAL,serModalidad.SER_MOD_DESC AS MODALIDAD\n" +
            "FROM (((((QPRODATAPLANI.TB_RELAC_DEPEND dependencia \n" +
            "INNER JOIN QPRODATAPLANI.TB_CARGO cargo ON cargo.N_UD_ID=dependencia.C_RD_ID)\n" +
            "INNER JOIN QPRODATAPLANI.TB_NUM_PLAZAS plaza ON plaza.N_COD_CARGO=cargo.C_COD_CARGO\n" +
            "INNER JOIN QPRODATAPLANI.TB_CARGO_CLASIF_ESTRUCT cargoClasif ON  cargoClasif.C_COD_CARGO_CLASIF_ESTR=cargo.C_CARCLA_COD)\n" +
            "LEFT JOIN QPRODATAPLANI.TB_CUADRO_NOMINAL nominal ON nominal.COD_PLAZA=plaza.C_COD_PLAZA\n" +
            "INNER JOIN QPRODATAPLANI.TB_ESTADO_PLAZA estado ON  estado.C_COD_ESTADO=plaza.N_EST_PLAZA AND (estado.T_DES_ESTADO like 'VACANTE'  or  estado.T_DES_ESTADO like 'OCUPADO') )\n" +
            "INNER JOIN  QPRODATAPLANI.TB_CARGO_ESTRUCTURAL cargoE ON  cargoE.C_COD_CARGO_ESTR=cargoClasif.N_COD_CARGO_ESTR)\n" +
            "LEFT JOIN  QPRODATAPLANI.TB_SERVIDOR_MODALIDAD serModalidad ON  serModalidad.COD_SER_MODALIDAD=nominal.SER_MOD)\n" +
            "LEFT JOIN  DATAPERSUEL.SERVIDOR servidor ON  servidor.SER_COD=nominal.SER_COD \n" +
            "WHERE (dependencia.C_RD_ID LIKE (#{codDependencia}))")
    @Results(value = {
            @Result(javaType = PlazaCAP.class),
            @Result(property = "cod_plaza",column = "CODPLAZA"),
            @Result(property = "nom_estruc",column = "NOMESTRUC"),
            @Result(property = "est_plaza",column = "ESTPLAZA"),
            @Result(property = "cod_servidor",column = "COD_SER"),
            @Result(property = "ape_pat",column = "SERPAT"),
            @Result(property = "ape_mat",column = "SERMAT"),
            @Result(property = "nom_ser",column = "SERNOM"),
            @Result(property = "fech_ing",column = "FECH_ING"),
            @Result(property = "fech_sal",column = "FECH_SAL"),
            @Result(property = "ser_mod",column = "MODALIDAD"),
    })
    List<PlazaCAP> plazasPorDepen(@Param("codDependencia") String codDependencia);



    */



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



    @Insert(value="insert into QPRODATAPLANI.TB_CUADRO_NOMINAL values(#{codPlaza},#{codSer},#{numserest},TO_DATE(#{fechIni},'DD/MM/YY'),TO_DATE(#{fechFin},'DD/MM/YY'),#{modSer})")
    void addPlazaNominal(@Param("codPlaza") int codPlaza, @Param("codSer") String codServidor, @Param("numserest") int numserest, @Param("fechIni") String fechIng, @Param("fechFin") String fechSal, @Param("modSer") int modSer);



    @Update(value="update QPRODATAPLANI.TB_NUM_PLAZAS set N_EST_PLAZA=4 where C_COD_PLAZA=#{codPlaza}")
    void updateCuadroNominalOcupado(@Param("codPlaza") int codigo) ;




    @Delete(value="delete from QPRODATAPLANI.TB_CUADRO_NOMINAL   where  COD_PLAZA=#{codPlaza}")
    void deleteAsignacion(@Param("codPlaza") int codPlaza);




    @Update(value="update QPRODATAPLANI.TB_NUM_PLAZAS set N_EST_PLAZA=3 where C_COD_PLAZA=#{codPlaza}")
    void updateCuadroNominalVacante(@Param("codPlaza") int codigo) ;



    @Delete(value="delete from QPRODATAPLANI.TB_ROTACION_PLAZA   where  COD_PLAZA=#{codPlaza}")
    void deleteItemsHistorialPlaza(@Param("codPlaza") int codPlaza);












    @Select(value = "SELECT modalidad.COD_SER_MODALIDAD as COD_MOD,modalidad.SER_MOD_DESC as DSC_MOD\n" +
            "FROM QPRODATAPLANI.TB_SERVIDOR_MODALIDAD  modalidad")
    @Results(value = {
            @Result(javaType = ModalidadAsignacion.class),
            @Result(property = "idModAsig",column = "COD_MOD"),
            @Result(property = "descripcion",column = "DSC_MOD"),
    })
    List<ModalidadAsignacion> allModalidad();





}
