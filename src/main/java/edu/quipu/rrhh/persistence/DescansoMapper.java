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
}
