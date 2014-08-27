package edu.quipu.rrhh.persistence;

import edu.quipu.rrhh.models.Unidad;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface UnidadMapper {


    @Select(value = "SELECT  dep.ud_id udid, \n" +
            "        dep.ud_cod udcod, \n" +
            "        dep.nivunicod nivel, \n" +
            "        dep.ud_dsc dsc \n" +
            "        FROM qprodataquipu.uni_dep dep \n" +
            "        WHERE (dep.nivunicod IN (1,2,3,4,5,6,7) AND  dep.ud_fec_cad IS NULL)\n" +
            "        ORDER BY dep.ud_cod")
    @Results(value = {@Result(javaType = Unidad.class),
            @Result(property = "udId", column = "udid"),
            @Result(property = "udCod", column = "udcod"),
            @Result(property = "nivel", column = "nivel"),
            @Result(property = "dsc", column = "dsc")})
    List<Unidad> findHastaNivel2();




    /*



    @Select(value = "SELECT dep.ud_id udid, " +
            "  dep.ud_cod udcod, " +
            "  dep.nivunicod nivel, " +
            "  dep.ud_dsc dsc " +
            "FROM qprodataquipu.uni_dep dep " +
            "WHERE dep.nivunicod IN (1,2,3,4,5,6,7) " +
            "ORDER BY dep.ud_cod")
    @Results(value = {@Result(javaType = Unidad.class),
            @Result(property = "udId", column = "udid"),
            @Result(property = "udCod", column = "udcod"),
            @Result(property = "nivel", column = "nivel"),
            @Result(property = "dsc", column = "dsc")})
    List<Unidad> findHastaNivel2();




     */




    @Select(value = "select ud.ud_id, ud.ud_cod, ud.ud_dsc, ud.ud_pad," +
            " ud.unidepcaldep , ud.nivunicod from qprodataquipu.uni_dep ud " +
            "where ud.ud_id = #{udid}")
    @Results(value = {@Result(javaType = Unidad.class),
            @Result(property = "udId", column = "ud_id"),
            @Result(property = "udCod", column = "ud_cod"),
            @Result(property = "nivel", column = "nivunicod"),
            @Result(property = "dsc", column = "ud_dsc")})
    Unidad findByUdid(@Param("udid") int udid);

}
