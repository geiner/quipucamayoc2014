package edu.quipu.rrhh.persistence;

import edu.quipu.rrhh.models.DescansoMedico;
import org.apache.ibatis.annotations.*;

import java.util.List;


public interface DescansoMapper {

    @Insert(value = "INSERT " +
            "INTO DATAPERLIQU.DESC_MEDICOS VALUES " +
            "  ( " +
            "    DESC_MED.NEXTVAL, " +
            "    #{id_serv}, " +
            "    #{numserest}, " +
            "    #{citt}, " +
            "    TO_DATE(#{f_inicio},'DD/MM/YY'), " +
            "    TO_DATE(#{f_fin},'DD/MM/YY'), " +
            "    #{tipo_lic}, " +
            "    #{tiempo} "+
            "  )")
    void addDescanso(@Param("id_serv") String id_serv, @Param("numserest") int numserest, @Param("citt") String citt, @Param("f_inicio") String f_inicio, @Param("f_fin") String f_fin, @Param("tipo_lic") String tipo_lic,@Param("tiempo") String tiempo);

    @Select(value ="SELECT ID_DESC_MED , " +
            "  CITT, " +
            "  TO_CHAR(FECHA_INICIO,'DD/MM/YYYY') AS FECHA_INICIO, " +
            "  TO_CHAR(FECHA_FIN,'DD/MM/YYYY') AS FECHA_FIN, " +
            "  TIPO_LIC, " +
            "  TIEMPO "+
            "FROM DATAPERLIQU.DESC_MEDICOS " +
            "WHERE trim(id_serv) =trim(#{codigo}) " +
            "AND num_serest=#{numserest}")
    @Results(value = {
            @Result(javaType = DescansoMedico.class),
            @Result(property = "id_desc_med" , column = "ID_DESC_MED"),
            @Result(property = "citt" , column = "CITT"),
            @Result(property = "f_inicio" , column = "FECHA_INICIO"),
            @Result(property = "f_fin" , column = "FECHA_FIN"),
            @Result(property = "tipo_lic" , column = "TIPO_LIC"),
            @Result(property = "tiempo" , column = "TIEMPO"),

    })
    List<DescansoMedico> buscarDescansos(@Param("codigo")String codigo, @Param("numserest")Integer numserest);

    @Delete(value="DELETE FROM DATAPERLIQU.DESC_MEDICOS WHERE ID_DESC_MED=#{idDesc}")

    void removeDescMed(@Param("idDesc") Integer idDesc);

    @Update(value ="UPDATE DATAPERLIQU.DESC_MEDICOS " +
            "  SET CITT      =#{citt}, " +
            "  FECHA_INICIO  =#{f_inicio}, " +
            "  FECHA_FIN     =#{f_fin} , " +
            "  TIPO_LIC      =#{tipo_lic} , " +
            "  TIEMPO        =#{tiempo} " +
            "  WHERE ID_DESC_MED=#{id_desc_med}")
    void updateDescanso(@Param("citt")String citt,@Param("f_inicio") String f_inicio,@Param("f_fin") String f_fin,@Param("tiempo") String tiempo,@Param("tipo_lic") String tipLic,@Param("id_desc_med") Integer idDescMed);

    @Select(value ="SELECT desc_est, " +
            "  SER_APE_PAT, " +
            "  SER_APE_MAT, " +
            "  SER_NOM, " +
            "  ID_SERV, " +
            "  CITT, " +
            "  TO_CHAR(FECHA_INICIO,'DD/MM/YYYY') AS FECHA_INICIO, " +
            "  TO_CHAR(FECHA_FIN,'DD/MM/YYYY'), " +
            "  TIPO_LIC " +
            "FROM DATAPERLIQU.desc_medicos dm, " +
            "  DATAPERSUEL.lista_servidor se " +
            "WHERE (TO_CHAR(fecha_inicio, 'mm')=#{mes} " +
            "OR TO_CHAR(fecha_fin, 'mm')       =#{mes}) " +
            "AND (TO_CHAR(fecha_inicio, 'yyyy')=#{anio} " +
            "OR TO_CHAR(fecha_fin, 'yyyy')     =#{anio}) " +
            "AND trim(dm.id_serv)              =trim(se.ser_cod)")
    @Results(value = {
            @Result(javaType = DescansoMedico.class),
            @Result(property = "desc_est" , column = "DESC_EST"),
            @Result(property = "ser_ape_pat" , column = "SER_APE_PAT"),
            @Result(property = "ser_ape_mat" , column = "SER_APE_MAT"),
            @Result(property = "ser_nom" , column = "SER_NOM"),
            @Result(property = "dni" , column = "ID_SERV"),
            @Result(property = "citt" , column = "CITT"),
            @Result(property = "f_inicio" , column = "FECHA_INICIO"),
            @Result(property = "f_fin" , column = "FECHA_FIN"),
            @Result(property = "tipo_lic" , column = "TIPO_LIC"),
    })
    List<DescansoMedico> listarDescansos(@Param("mes")String mes, @Param("anio")String anio);
}
