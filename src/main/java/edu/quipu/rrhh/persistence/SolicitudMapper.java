package edu.quipu.rrhh.persistence;

import edu.quipu.rrhh.models.Perfil;
import edu.quipu.rrhh.models.Solicitud;
import org.apache.ibatis.annotations.*;
import org.springframework.dao.DataAccessException;

import java.util.List;

public interface SolicitudMapper {

    @Select(value="SELECT hup.C_USUID AS DNI , " +
            "  USU_NOM          AS NOMBRE, " +
            "  USU_APE          AS APELLIDOS , " +
            "  teu.T_MAIL           AS EMAIL, " +
            "  UD_DSC           AS NOM_DEP, " +
            "  uni.ud_id        AS ID_DEP, " +
            "  MODDES           AS MODULO, " +
            "  DES_TIP_SER      AS TIPO_SERVIDOR, " +
            "  DESC_EST         AS ESTADO, " +
            "  DESC_CATEG       AS CATEGORIA , " +
            "  DES_CON_PLA      AS PLANI_EST, " +
            "  hup.est          AS EST_PERF "+
            "  FROM QPRODATAQUIPU.tb_hist_usu_perf hup, " +
            "  QPRODATAQUIPU.tb_erp_usuario teu , " +
            "  QPRODATAQUIPU.uni_dep uni , " +
            "  QPRODATAQUIPU.modulo modu, " +
            "  DATAPERSUEL.servidor_estado ser, " +
            "  DATAPERSUEL.tip_servidor ts, " +
            "  DATAPERSUEL.estado est, " +
            "  DATAPERSUEL.categoria cat, " +
            "  DATAPERSUEL.cond_ser_plan spl " +
            "  WHERE hup.est IN(0,3) " +
            "  AND hup.modcod     =24  " +
            "  AND trim(teu.c_usuid)    =trim(hup.c_usuid)  " +
            "  AND hup.ud_id      =uni.ud_id " +
            "  AND modu.modcod    =hup.modcod " +
            "  AND trim(ser.ser_cod)    =trim(hup.c_usuid) " +
            "  AND ser.ser_tip_act=ts.cod_tip_ser " +
            "  AND est.cod_est    =ser.ser_est_act " +
            "  AND cat.cod_categ  =ser.ser_cat_act " +
            "  AND spl.cod_con_pla=ser.ser_con_pla_act")

    @Results(value =  {
            @Result(javaType = Solicitud.class),
            @Result(column = "DNI",property = "dni"),
            @Result(column = "NOMBRE",property = "nombre"),
            @Result(column = "APELLIDOS",property = "apellidos"),
            @Result(column = "EMAIL",property = "email"),
            @Result(column = "NOM_DEP",property = "dependencia"),
            @Result(column = "ID_DEP",property = "dependenciaId"),
            @Result(column = "MODULO",property = "modulo"),
            @Result(column = "TIPO_SERVIDOR",property = "tipodeServidor"),
            @Result(column = "ESTADO",property = "estado"),
            @Result(column = "CATEGORIA",property = "categoria"),
            @Result(column = "PLANI_EST",property = "estadoenplanilla"),
            @Result(column = "EST_PERF",property = "estadoPerfil")

    })
    List<Solicitud> findSolicitudes() throws DataAccessException;

    @Update(value = "update QPRODATAQUIPU.tb_hist_usu_perf set est=1, perf_cod=#{percod}, f_camb_est=(select sysdate from SYS.dual) where (est=0 or est=3) and trim(c_usuid)=trim(#{dni})")
    public void update(@Param("dni") String dni, @Param("percod") Integer percod) throws DataAccessException;


    @Select(value="select perf_cod,perf_desc  from QPRODATAQUIPU.tb_perfil where perf_cod=#{perf_cod}")
    @Results(value =  {
            @Result(javaType = Perfil.class),
            @Result(column = " perf_cod",property = "perf_cod"),
            @Result(column = "perf_desc",property = "perf_desc"),
    })
    List<Perfil> findPerfil(@Param("perf_cod") int per_cod) throws DataAccessException;

    @Select(value="select perf_cod as codigo, perf_desc as descripcion from QPRODATAQUIPU.tb_perfil where modu_cod=24 ORDER BY PERF_COD")
    @Results(value =  {
            @Result(javaType = Perfil.class),
            @Result(column = "perf_cod",property = "codigo"),
            @Result(column = "perf_desc",property = "descripcion"),
    })
    List<Perfil> findTodosPerfiles() throws DataAccessException;

    @Update(value = "update QPRODATAQUIPU.tb_hist_usu_perf set est=2, f_camb_est=(SELECT SYSDATE FROM SYS.DUAL) where est=0 and trim(c_usuid)= #{c_usuid}")
    public void updateEstado(@Param("c_usuid") String c_usuid);


    /*Delete perfil de  rolperfil*/
    @Delete(value = "delete QPRODATAQUIPU.tb_hist_usu_perf where perf_cod = #{id}")
    public void deletePerfil(@Param("id") Integer id);
}
