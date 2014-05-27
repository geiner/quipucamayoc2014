package edu.quipu.rrhh.persistence;

import edu.quipu.rrhh.models.*;
import org.apache.ibatis.annotations.*;
import org.springframework.dao.DataAccessException;

import java.util.List;

public interface ResolucionesMapper {
    @Select(value=" SELECT tiprescod, tipresdes, tipresact FROM DATAPERLIQU.tipo_resolucion WHERE (tipresact=1 or tipresact=2 or tipresact=0 or tipresact=3) ORDER BY tipresdes")
    @Results(value={
            @Result(javaType =tipoResolucion.class),
            @Result(column="tiprescod",property = "tipResu"),
            @Result(column="tipresdes",property = "descriResu"),
            @Result(column="tipresact",property = "tipoRe"),
    })
    public List<tipoResolucion> verTiposResol();

    @Select(value="SELECT iddependecia , abreviatura  ,descripcion , tr FROM DATAPERLIQU.tb_tipo_resolucion_dependencia where tr=#{codTr} ORDER BY descripcion")
    @Results(value={
            @Result(javaType =Dependencia.class),
            @Result(column="iddependecia",property = "IdDependencia") ,
            @Result(column="abreviatura",property = "abreviatura") ,
            @Result(column="descripcion",property = "descriDepen") ,
            @Result(column="tr",property = "tr") ,

    })
    public List<Dependencia> verDependenciasPorCod(@Param("codTr") char codTr)throws DataAccessException;

    @Select(value=" SELECT tipresmotcod, tipresmotdes FROM DATAPERLIQU.tipores_motivo WHERE tipresmotact=1 ORDER BY tipresmotdes")
    @Results(value={
            @Result(javaType =Motivo.class),
            @Result(column="tipresmotcod",property = "motivoId"),
            @Result(column="tipresmotdes",property = "descriMotivo"),
    })
    public List<Motivo> verTiposMotivo();



//    @Insert(value = "INSERT INTO DATAPERLIQU.RESOLUCION VALUES (#{restranum},#{restrafec},#{restrafecejec},#{restrades1},#{restrades2},#{tiprescod},#{tipresmotcod,}" +
//            "#{restrafecfin})")
//    public  void  addResolucion(@Param("restranum") String numero_resol, @Param("restrafec") String fecha_expedicion, @Param("restrafecejec") String fecha_inicio, @Param("restrades1") String obliga,
//                           @Param("restrades2") String adicional,@Param("tiprescod") String cod_resol, @Param("tipresmotcod") String motivo, @Param("restrafecfin") String fecha_fin) throws DataAccessException;

    @Insert(value="INSERT " +
            "INTO DATAPERLIQU.resolucion_id " +

            "  VALUES " +
            "  ( " +
            "    ID_RESOL.nextval, " +
            "    #{numero_resol}, " +
            "    TO_DATE(#{fecha_expedicion},'DD/MM/YY'), " +
            "    TO_DATE(#{fecha_inicio},'DD/MM/YY'), " +
            "    #{obliga}, " +
            "    #{adicional}, " +
            "    #{cod_resol}, " +
            "    #{motivo}, " +
            "    TO_DATE(#{fecha_fin},'DD/MM/YY') " +
            "  )"
    )
    void addResolucion(@Param("numero_resol") String numero_resol, @Param("fecha_expedicion") String fecha_expedicion, @Param("fecha_inicio") String fecha_inicio,
                       @Param("obliga") String obliga, @Param("adicional") String adicional, @Param("cod_resol") String cod_resol, @Param("motivo") String motivo, @Param("fecha_fin") String fecha_fin);

    @Select(value = "SELECT idrestranum,RESTRANUM, " +
            "TO_CHAR(RESTRAFEC,'DD/MM/YYYY') AS FECINI,RESTRADES1,TIPRESCOD," +
            " TO_CHAR(RESTRAFECEJEC,'DD/MM/YYYY') AS FECEJEC,RESTRADES2,m.TIPRESMOTCOD," +
            "TO_CHAR(RESTRAFECFIN,'DD/MM/YYYY') AS FECFIN,m.TIPRESMOTDES " +
            "FROM DATAPERLIQU.resolucion_id r, DATAPERLIQU.tipores_motivo m" +
            " WHERE TO_CHAR(RESTRAFEC,'DD/MM/YYYY') like(#{anio}) and r.tipresmotcod = m.tipresmotcod")
    @Results(value = {
            @Result(javaType = Resolucion.class),
            @Result(property = "idResolucion",column = "idrestranum"),
            @Result(property = "numero_resol",column = "RESTRANUM"),
            @Result(property = "fecha_expedicion",column = "FECINI"),
            @Result(property = "obliga",column = "RESTRADES1"),
            @Result(property = "cod_resol",column = "TIPRESCOD"),
            @Result(property = "fecha_inicio",column = "FECEJEC"),
            @Result(property = "adicional",column = "RESTRADES2"),
            @Result(property = "motivo",column = "TIPRESMOTCOD") ,
            @Result(property = "motivodesc",column = "TIPRESMOTDES") ,
            @Result(property = "fecha_fin",column = "FECFIN")

    })
    List<Resolucion> buscarResolAnio(@Param("anio") String fecha_expedicion);

    @Select(value = "SELECT idrestranum,RESTRANUM, RESTRAFEC,RESTRADES1,TIPRESCOD FROM DATAPERLIQU.resolucion_id")
    @Results(value = {
            @Result(javaType = Resolucion.class),
            @Result(property = "idResolucion",column = "idrestranum"),
            @Result(property = "numero_resol",column = "RESTRANUM"),
            @Result(property = "fecha_expedicion",column = "RESTRAFEC"),
            @Result(property = "obliga",column = "RESTRADES1"),
            @Result(property = "cod_resol",column = "TIPRESCOD")

    })
    List<Resolucion> todasResoluciones();

    @Select(value="SELECT Idtrabajador_Resolucion, " +
            "  Cod_Resol, " +
            "  Se.SER_COD,"+
            "  Se.Dni AS dni, " +
            "  Se.DESC_EST,"+
            "  Num_Ser_Estado, " +
            "  Cod_Antiguo , " +
            "  Ser_Ape_Pat, " +
            "  Ser_Ape_Mat, " +
            "  Ser_Nom , " +
            "  Tm.TIPRESMOTCOD, " +
            "  TIPRESMOTDES, " +
            "  TO_CHAR(Restrafecini,'DD/MM/YYYY') AS Restrafecini, " +
            "  TO_CHAR(Restrafecfin,'DD/MM/YYYY') AS Restrafecfin, " +
            "  RESTRADES " +
            "FROM ( (Dataperliqu.Tb_Trabajador_Resolucion_Id Tb " +
            "INNER JOIN Datapersuel.LISTA_SERVIDOR Se " +
            "ON Tb.Dni = Se.Ser_Cod AND Tb.NUM_SER_ESTADO = Se.NUM_SEREST) " +
            "LEFT JOIN Dataperliqu.Resol_Trabajador_Detalle_Id Di " +
            "ON Di.Restranum  =Cod_Resol " +
            "AND di.ser_cod   =Se.Ser_Cod" +
            " AND Di.Num_Serest=Num_Ser_Estado) " +
            "LEFT JOIN Dataperliqu.Tipores_Motivo Tm " +
            "ON Di.Tipresmotcod=Tm.Tipresmotcod " +
            "WHERE Cod_Resol LIKE (#{resol})")
    @Results(value={ @Result(javaType = TrabajadorResolucion.class),
            @Result(property = "idTrabajadorResolucion", column = "IDTRABAJADOR_RESOLUCION"),
            @Result(property = "nroResol", column = "cod_resol"),
            @Result(property = "codigo", column = "SER_COD"),
            @Result(property = "dni", column = "dni"),
            @Result(property = "desc_est", column = "DESC_EST"),
            @Result(property = "serEstado", column = "NUM_SER_ESTADO"),
            @Result(property = "codAntiguo", column = "cod_antiguo"),
            @Result(property = "paterno", column = "SER_APE_PAT"),
            @Result(property = "materno", column = "SER_APE_MAT"),
            @Result(property = "nombre", column = "SER_NOM"),
            @Result(property = "fec_ini_mot", column = "Restrafecini"),
            @Result(property = "fec_fin_mot", column = "Restrafecfin"),
            @Result(property = "nombre_motivo", column = "TIPRESMOTDES"),
            @Result(property = "cod_motivo", column = "TIPRESMOTCOD"),
            @Result(property = "desc_mot", column = "RESTRADES")
    } )
    List<TrabajadorResolucion> trabaPorResol(@Param("resol") String resol);

    @Insert(value="insert into DATAPERLIQU.tb_trabajador_resolucion_id values( TB_TRABAJADOR_SEQ.nextval,#{cod-resol},#{dni},#{estado},#{cod-antiguo})")
    void addServidor(@Param("cod-resol") String codResol, @Param("dni") String dni, @Param("estado") int estado, @Param("cod-antiguo") String codAntiguo);

    @Update(value="update DATAPERLIQU.resolucion_id set RESTRANUM=#{numero_resol2}, RESTRAFEC=#{fecha_expedicion}, restrafecejec=#{fecha_inicio}, restrades1=#{obliga}, restrades2=#{adicional}, tiprescod=#{cod_resol}, tipresmotcod=#{motivo}, restrafecfin=#{fecha_fin}   WHERE idrestranum=#{codR}")
    void updateResolucion(@Param("numero_resol2") String numResol, @Param("fecha_expedicion") String fechaExpedi, @Param("fecha_inicio") String fechaIni, @Param("obliga") String descriOb,
                          @Param("adicional") String descriOp, @Param("cod_resol") String tipoResol, @Param("motivo") String nroMotivo, @Param("fecha_fin") String fechaFin, @Param("codR") String resolIndicada);

    @Delete(value="DELETE FROM DATAPERLIQU.tb_trabajador_resolucion_id WHERE cod_resol=#{resol} and trim(dni)=trim(#{dni}) and NUM_SER_ESTADO=#{numser} ")
    void removeResoluTrabaja(@Param("resol") String resol, @Param("dni") String dni,@Param("numser") int numser);

    @Select(value="select dni from DATAPERLIQU.tb_trabajador_resolucion where cod_resol=#{codR}")
    @Results(value={ @Result(javaType = TrabajadorResolucion.class),
            @Result(property = "dni", column = "dni")
    })
    public List<TrabajadorResolucion> auxDniServidor(@Param("codR") String reso);

    @Insert(value="insert into DATAPERLIQU.resol_trabajador_detalle_id values( ID_RESOL_TRAB.nextval,#{resol},#{codSer},#{numSer},#{numMoti},TO_DATE(#{fechIni},'DD/MM/YY'),TO_DATE(#{fechFin},'DD/MM/YY'),#{descri})")
    void addMotivoTrabajador(@Param("resol") String resolucion, @Param("codSer") String codTraba, @Param("numSer") int serviEstado, @Param("numMoti") String nroMotivo, @Param("fechIni") String fechaIni, @Param("fechFin") String fechaFin, @Param("descri") String descrip);

    @Select(value="select A.tipresmotcod, B.TIPRESMOTDES from DATAPERLIQU.resol_trabajador_detalle_id A inner join  DATAPERLIQU.tipores_motivo B " +
            " on A.tipresmotcod=B.tipresmotcod  where trim(ser_cod)=trim(#{serCod}) order by  TIPRESMOTDES")
    @Results(value={ @Result(javaType = Motivo.class),
            @Result(column="tipresmotcod",property = "motivoId"),
            @Result(column="tipresmotdes",property = "descriMotivo"),
    })
    public List<Motivo> mostrarMotivoTrabajador(@Param("serCod") String serCod) ;

    @Delete(value="delete DATAPERLIQU.resol_trabajador_detalle_id where trim(ser_cod)=trim(#{serCod}) and trim(tipresmotcod)=trim(#{nroMoti})")
    void borrarMotivo(@Param("serCod") String serCod, @Param("nroMoti") String nroMoti);

    @Delete(value="delete DATAPERLIQU.resol_trabajador_detalle_id where trim(ser_cod)=trim(#{serCod}) and RESTRANUM=#{resol} and NUM_SEREST=#{numser} and TIPRESMOTCOD=#{cod_motivo}")
    void borrarServidorConMotivo(@Param("serCod") String serCod,@Param("resol") String resol,@Param("numser") int numser,@Param("cod_motivo") String cod_motivo);

    @Update(value="update DATAPERLIQU.tb_trabajador_resolucion_id set cod_resol=#{nuevaR} where cod_resol=#{resol}")
    void actualizarResoServi(@Param("nuevaR") String nuevaR, @Param("resol") String resol) ;

    @Update(value="update DATAPERLIQU.resol_trabajador_detalle_id set RESTRANUM=#{nuevaR} where RESTRANUM=#{resol}")
    void actualizarResoMoti(@Param("nuevaR") String nuevaR, @Param("resol") String resol);

    @Select(value = "SELECT idrestranum,RESTRANUM, " +
            "TO_CHAR(RESTRAFEC,'DD-MM-YYYY') AS FECINI,RESTRADES1,TIPRESCOD," +
            " TO_CHAR(RESTRAFECEJEC,'DD-MM-YYYY') AS FECEJEC,RESTRADES2,m.TIPRESMOTCOD," +
            "TO_CHAR(RESTRAFECFIN,'DD-MM-YYYY') AS FECFIN,m.TIPRESMOTDES " +
            "FROM DATAPERLIQU.resolucion_id r, DATAPERLIQU.tipores_motivo m " +
            " WHERE TO_CHAR(RESTRAFECEJEC,'DD-MM-YYYY') LIKE(#{inicio}) and TO_CHAR(RESTRAFECFIN,'DD-MM-YYYY') LIKE(#{fin}) and r.tipresmotcod = m.tipresmotcod")
    @Results(value = {
            @Result(javaType = Resolucion.class),
            @Result(property = "idResolucion",column = "idrestranum"),
            @Result(property = "numero_resol",column = "RESTRANUM"),
            @Result(property = "fecha_expedicion",column = "FECINI"),
            @Result(property = "obliga",column = "RESTRADES1"),
            @Result(property = "cod_resol",column = "TIPRESCOD"),
            @Result(property = "fecha_inicio",column = "FECEJEC"),
            @Result(property = "adicional",column = "RESTRADES2"),
            @Result(property = "motivo",column = "TIPRESMOTCOD") ,
            @Result(property = "motivodesc",column = "TIPRESMOTDES") ,
            @Result(property = "fecha_fin",column = "FECFIN")

    })
    List<Resolucion> buscarResolxfecha(@Param("inicio") String inicio, @Param("fin") String fin);

    @Select(value = "SELECT * FROM DATAPERLIQU.Resolucion_Id WHERE Restranum=#{restranum}")
    @Results(value = {
            @Result(javaType = Resolucion.class),
            @Result(property = "idResolucion",column = "idrestranum"),
            @Result(property = "numero_resol",column = "RESTRANUM"),
            @Result(property = "fecha_expedicion",column = "FECINI"),
            @Result(property = "obliga",column = "RESTRADES1"),
            @Result(property = "cod_resol",column = "TIPRESCOD"),
            @Result(property = "fecha_inicio",column = "FECEJEC"),
            @Result(property = "adicional",column = "RESTRADES2"),
            @Result(property = "motivo",column = "TIPRESMOTCOD") ,
            @Result(property = "motivodesc",column = "TIPRESMOTDES") ,
            @Result(property = "fecha_fin",column = "FECFIN")

    })
    List<Resolucion> validarExisteResolucion(@Param("restranum") String restranum);

    @Delete(value="DELETE FROM DATAPERLIQU.Resolucion_Id WHERE RESTRANUM=#{numero}")
    void deleteResolucion(@Param("numero") String numero);

    @Delete(value="delete from DATAPERLIQU.Tb_Trabajador_Resolucion_Id where COD_RESOL=#{numero}")
    void deleteAsociados(String numero);

    @Select(value = "SELECT restranum  " +
            "FROM DATAPERLIQU.resol_trabajador_detalle_id " +
            "WHERE restranum=#{resol} " +
            "AND ser_cod    =#{dni} " +
            "AND num_serest =#{numser}")
    @Results(value = {
            @Result(javaType = TrabajadorResolucion.class),
            @Result(property = "nroResol",column = "restranum")
    })
    List<TrabajadorResolucion> contarServidores(@Param("resol")String resol, @Param("dni")String dni, @Param("numser")int numser);

    @Select(value ="SELECT td.restranum               AS RESID , " +
            "  TO_CHAR(RESTRAFEC,'DD-MM-YYYY')        AS FRINI , " +
            "  TO_CHAR(re.restrafecejec,'DD-MM-YYYY') AS FRFIN, " +
            "  re.tiprescod                           AS TIPO_RE, " +
            "  mo.tipresmotdes                        AS MOT_TRAB, " +
            "  TO_CHAR(td.restrafecini,'DD-MM-YYYY')  AS FECINIMOT, " +
            "  TO_CHAR(td.restrafecfin,'DD-MM-YYYY')  AS FECFINMOT, " +
            "  td.restrades                           AS DESMOT " +
            "FROM DATAPERLIQU.resol_trabajador_detalle_id td, " +
            "  DATAPERLIQU.resolucion_id re, " +
            "  DATAPERLIQU.tipores_motivo mo , " +
            "  DATAPERLIQU.tipo_resolucion tipo " +
            "WHERE trim(td.ser_cod)=#{codigo}" +
            "AND TRIM(td.restranum)=TRIM(re.restranum) " +
            "AND td.tipresmotcod   =mo.tipresmotcod " +
            "AND re.tiprescod      =tipo.tiprescod")
    @Results(value = {
            @Result(javaType = Resoluciones.class),
            @Result(property = "resid",column = "RESID"),
            @Result(property = "frini",column = "FRINI"),
            @Result(property = "frfin",column = "FRFIN"),
            @Result(property = "tipo_re",column = "TIPO_RE"),
            @Result(property = "mot_trab",column = "MOT_TRAB"),
            @Result(property = "fecinimot",column = "FECINIMOT"),
            @Result(property = "fecfinmot",column = "FECFINMOT"),
            @Result(property = "desmot",column = "DESMOT")
    })
    List<Resoluciones> buscar_resoluciones_asociados(@Param("codigo")String codigo, @Param("numserest") int numserest);
}