package edu.quipu.rrhh.persistence;

import edu.quipu.rrhh.models.DescansoMedico;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * Created by GEINER on 05/05/2014.
 */
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
            "    #{tipo_lic} " +
            "  )")
    void addDescanso(@Param("id_serv") String id_serv, @Param("numserest") int numserest, @Param("citt") String citt, @Param("f_inicio") String f_inicio, @Param("f_fin") String f_fin, @Param("tipo_lic") String tipo_lic);

    @Select(value ="SELECT ID_DESC_MED , " +
            "  CITT, " +
            "  TO_CHAR(FECHA_INICIO,'DD/MM/YYYY') AS FECHA_INICIO, " +
            "  TO_CHAR(FECHA_FIN,'DD/MM/YYYY') AS FECHA_FIN, " +
            "  TIPO_LIC " +
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
    })
    List<DescansoMedico> buscarDescansos(@Param("codigo")String codigo, @Param("numserest")Integer numserest);
}
