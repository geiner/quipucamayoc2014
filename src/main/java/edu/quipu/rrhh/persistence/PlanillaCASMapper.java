package edu.quipu.rrhh.persistence;

import edu.quipu.rrhh.models.PlanillaCAS;
import org.apache.ibatis.annotations.*;
import org.springframework.dao.DataAccessException;

import java.util.List;


public interface PlanillaCASMapper {
/*
    @Results(value = {
            @Result(javaType = PlanillaCAS.class),
            @Result(property = "anio", column = "anio"),
            @Result(property = "numero", column = "numero"),
            @Result(property = "mes", column = "mes"),
            @Result(property = "codigoOrigen", column = "codigoOrigen"),
            @Result(property = "unidadDescripcion", column = "unidadDescripcion"),
            @Result(property = "fecha", column = "fecha"),
            @Result(property = "monto", column = "monto"),
            @Result(property = "estado", column = "estado")}
    )
    PlanillaCAS find(@Param("anio") int anio, @Param("mes") int mes, @Param("planilla") String planilla) throws DataAccessException;*/

    @Results(value = {@Result(javaType = PlanillaCAS.class),
            @Result(property = "anio", column = "anio"),
            @Result(property = "numero", column = "numero"),
            @Result(property = "mes", column = "mes"),
            @Result(property = "codigoOrigen", column = "codigoOrigen"),
            @Result(property = "unidadDescripcion", column = "unidadDescripcion"),
            @Result(property = "fecha", column = "fecha"),
            @Result(property = "monto", column = "monto"),
            @Result(property = "estado", column = "estado")})
    List<PlanillaCAS> findConServidores(@Param("udid") int udid, @Param("anio") int anio, @Param("mes") int mes) throws DataAccessException;

/*    @Results(value = {@Result(javaType = PlanillaCAS.class),
            @Result(property = "anio", column = "anio"),
            @Result(property = "numero", column = "numero"),
            @Result(property = "mes", column = "mes"),
            @Result(property = "codigoOrigen", column = "codigoOrigen"),
            @Result(property = "unidadDescripcion", column = "unidadDescripcion"),
            @Result(property = "fecha", column = "fecha"),
            @Result(property = "monto", column = "monto"),
            @Result(property = "estado", column = "estado")})
    List<PlanillaCAS> findSinServidores(@Param("udid") int udid, @Param("anio") int anio, @Param("mes") int mes) throws DataAccessException;*/


    @Select(value = "SELECT apanio AS anio,apnum AS numero,apmes AS mes,oricod AS codigoOrigen, ud_id AS unidadDescripcion, apfecha AS fecha, apmonto AS monto, apest AS estado from QPRODATACONTA.APERTURA_PLANILLA WHERE APNUM IN (\n" +
            "    SELECT distinct APNUM FROM QPRODATACONTA.DETALLE_PLANILLA WHERE APANIO=#{anio} AND UD_ID IN (#{udid}, #{udid}+1) and APNUM like 'P%') AND APANIO = #{anio} AND APMES=#{mes}\n" +
           "    UNION\n" +
           "    SELECT apanio AS anio,apnum AS numero,apmes AS mes,oricod AS codigoOrigen, ud_id AS unidadDescripcion, apfecha AS fecha, apmonto AS monto, apest AS estado FROM QPRODATACONTA.apertura_planilla WHERE apanio=#{anio} AND apmes=#{mes} AND aptipo='P' AND ud_id=#{udid}")
    @Results(value = {@Result(javaType = PlanillaCAS.class),
            @Result(property = "anio", column = "anio"),
            @Result(property = "numero", column = "numero"),
            @Result(property = "mes", column = "mes"),
            @Result(property = "codigoOrigen", column = "codigoOrigen"),
            @Result(property = "unidadDescripcion", column = "unidadDescripcion"),
            @Result(property = "fecha", column = "fecha"),
            @Result(property = "monto", column = "monto"),
            @Result(property = "estado", column = "estado")})
    List<PlanillaCAS> findConYSinServidores(@Param("udid") int udid, @Param("anio") int anio, @Param("mes") int mes)/* throws DataAccessException*/;

    void createAperturaPlanilla(@Param("anio") int anio, @Param("mes") int mes, @Param("origen") String origen, @Param("udid") int udid);

//    void createPlanillaControlPrevio(@Param("udid") int udid, @Param("anio") int anio, @Param("mes") int mes, @Param("ruc") String ruc, @Param("planilla") String planilla);

//    void createPlanillaNueva(@Param("udid") int udid, @Param("anio") int anio, @Param("mes") int mes, @Param("ruc") String ruc, @Param("planilla") String planilla);
//
//    void createDetallePlanilla(@Param("udid") int udid, @Param("anio") int anio, @Param("mes") int mes, @Param("montobruto") float montobruto, @Param("montoneto") float montoneto, @Param("suspension") String suspension, @Param("planilla") String planilla);
//
//    void createDetallePlanillaImpuesto(@Param("udid") int udid, @Param("anio") int anio, @Param("mes") int mes, @Param("importe") float importe, @Param("planilla") String planilla);
//
//    void insertDetallePlanillaImpuesto2(@Param("udid") int anio, @Param("placod") String placod, @Param("dplacod") String dplacod, @Param("importe") float importe, @Param("planilla") String planilla);
//
//    Integer existeDetallePlanillaxPlanilla(@Param("udid") int udid, @Param("anio") int anio, @Param("mes") int mes, @Param("apnum") String apnum);

    void updatePlanilla(@Param("ruc") String ruc, @Param("anio") int anio, @Param("apnum") String apnum, @Param("placod") String placod, @Param("plaest") char plaest);

//    void updateDetallePlanilla(@Param("udid") int udid, @Param("montobruto") float montobruto, @Param("montoneto") float montoneto, @Param("suspension") String suspension, @Param("anio") int anio, @Param("apnum") String apnum, @Param("placod") String placod, @Param("dplacod") String dplacod);
//
//    void deleteDetallePlanillaImpuesto(@Param("anio") int anio, @Param("apnum") String apnum, @Param("placod") String placod, @Param("dplacod") String dplacod);

    void updateAperturaPlanilla(@Param("apest") char apest, @Param("anio") int anio, @Param("mes") int mes, @Param("udid") int udid, @Param("origen") String origen, @Param("planilla") String planilla);

//    void deletePlanilla(@Param("anio") int anio, @Param("apnum") String apnum, @Param("placod") String placod, @Param("ruc") String ruc);
//
//    void deleteDetallePlanilla(@Param("anio") int anio, @Param("apnum") String apnum, @Param("placod") String placod, @Param("dplacod") String dplacod, @Param("udid") int udid);

}
