package edu.quipu.rrhh.persistence;

import edu.quipu.rrhh.models.Asistencia;
import edu.quipu.rrhh.models.Servidor;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: GEINNER
 * Date: 11/03/14
 * Time: 03:27 PM
 * To change this template use File | Settings | File Templates.
 */
public interface AsistenciaAdministrativoMapper {

    @Select(value = "SELECT SER_COD AS CODIGO, " +
            "  NUM_SEREST  AS NUMSEREST, " +
            "  SER_APE_PAT  AS PATERNO, " +
            "  SER_APE_MAT  AS MATERNO, " +
            "  SER_NOM      AS NOMBRE, " +
            "  DES_TIP_SER  AS TIPO, " +
            "  DESC_EST     AS ESTADO " +
            "FROM DATAPERSUEL.lista_servidor " +
            "ORDER BY CODIGO ASC")
    @Results(value = {
            @Result(javaType = Servidor.class),
            @Result(property = "codigo",column = "CODIGO"),
            @Result(property = "num_serest",column = "NUMSEREST"),
            @Result(property = "paterno",column = "PATERNO"),
            @Result(property = "materno",column = "MATERNO"),
            @Result(property = "nombre",column = "NOMBRE"),
            @Result(property = "tiposervidor",column = "TIPO"),
            @Result(property = "descestado",column = "ESTADO")
    })
    List<Servidor> buscarServidores();

    @Select(value = "select (max(cod_horario)+1)codigo from USERDBDIGI.Tb_Horario")
    @Results(value = {
            @Result(javaType = Asistencia.class),
            @Result(property = "codigo_hor",column = "codigo")
    })
    List<Asistencia> devolver_id_horario();

    @Insert(value = "INSERT " +
            "INTO Userdbdigi.Tb_Horario " +
            "  ( " +
            "    Cod_Horario, " +
            "    Hora_Entradae, " +
            "    Hora_Salidae, " +
            "    Dia, " +
            "    NUM_HORARIO " +
            "  ) " +
            "  VALUES " +
            "  ( " +
            "    #{codigo_hor}, " +
            "    #{entrada}," +
            "    #{salida}," +
            "    #{numero_dia}," +
            "    1 " +
            "  )")
    void insertarHorario(@Param("codigo_hor")String codigo_hor,@Param("entrada") Integer entrada, @Param("salida")int salida,@Param("numero_dia") int  numero_dia);

    @Insert(value = "INSERT "
            +"INTO Userdbdigi.TB_TIPO_HORARIO "
            +"  ( "
            +"    Cod_Horario, "
            +"    Descripcion, "
            +"    Tipo_Hor, "
            +"    Clas_Hor, "
            +"    T_Hor_Sem, "
            +"    Iha "
            +"  ) "
            +"  VALUES "
            +"  ( "
            +"    #{codigo_hor}, "
            +"    #{descripcion} ,"
            +"    #{tolerancia}, "
            +"    (SELECT T1.Id_Clas_Hor "
            +"    FROM Userdbdigi.Clase_Horario T1 "
            +"    WHERE T1.Id_Clas_Hor=#{dias} "
            +"    ), "
            +"    #{total_horas}, "
            +"    #{lactancia} "
            +"  )")
    void insertarTipoHorario(@Param("codigo_hor")String codigo_hor,@Param("tolerancia") Integer tolerancia,@Param("total_horas") String total_horas,
                             @Param("lactancia") Integer lactancia,@Param("dias")Integer dias,@Param("descripcion")String descripcion);

    @Select(value ="SELECT COD_HORARIO,DESCRIPCION FROM USERDBDIGI.tb_tipo_horario WHERE clas_hor=#{codigo} AND TIPO_HOR=#{tol} AND IHA=#{lac}")
    @Results(value = {
            @Result(javaType = Asistencia.class),
            @Result(property = "codigo_hor",column = "COD_HORARIO"),
            @Result(property = "descripcion_hor",column = "DESCRIPCION")
    })
    List<Asistencia> buscarHorarios( @Param("codigo")String codigo, @Param("tol")int tol, @Param("lac")String lac);

    @Select(value ="SELECT COD_DOC AS CODIGO , "
            +"  DESCRIPCION  AS DESCRIPCION "
            +"FROM USERDBDIGI.Tipo_Documento")
    @Results(value = {
            @Result(javaType = Asistencia.class),
            @Result(property = "codigo_doc",column = "CODIGO"),
            @Result(property = "descripcion_doc",column = "DESCRIPCION")
    })
    List<Asistencia> buscarTipodocumentos();

    @Select(value ="SELECT cod_horario,descripcion FROM USERDBDIGI.TB_TIPO_HORARIO WHERE clas_hor=#{codigo}")
    @Results(value = {
            @Result(javaType = Asistencia.class),
            @Result(property = "codigo_hor",column = "cod_horario"),
            @Result(property = "descripcion_hor",column = "descripcion")
    })
    List<Asistencia> buscarTipoHorario(@Param("codigo")String codigo);

    @Select(value ="SELECT hora_entradae,hora_salidae,dia FROM USERDBDIGI.tb_horario WHERE cod_horario=#{codigoHor}")
    @Results(value = {
            @Result(javaType = Asistencia.class),
            @Result(property = "ingreso",column = "hora_entradae"),
            @Result(property = "salida",column = "hora_salidae"),
            @Result(property = "dia",column = "dia")
    })
    List<Asistencia> selectTipoHorario(@Param("codigoHor")String codigoHor);

    @Select(value ="SELECT to_char(fecha_inicio,'dd/mm/yyyy') AS FECHAINI, " +
            "  to_char(fecha_fin,'dd/mm/yyyy')        AS FECHAFIN " +
            "FROM USERDBDIGI.historial_horarios " +
            "WHERE cod_pers=#{codigo} " +
            "AND estado_hor=1")
    @Results(value = {
            @Result(javaType = Asistencia.class),
            @Result(property = "fecha_ini_actual",column = "FECHAINI"),
            @Result(property = "fecha_fin_actual",column = "FECHAFIN")
    })
    Asistencia buscarHorarioActual(@Param("codigo")String codigo);
}
