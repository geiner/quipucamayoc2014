package edu.quipu.rrhh.persistence;


import edu.quipu.rrhh.models.*;
import org.apache.ibatis.annotations.*;
import org.springframework.dao.DataAccessException;

import java.util.List;

public interface LegajosMapper {

    @Select(value = "SELECT se.SER_APE_PAT                 AS PATERNO, " +
            "  TRAESTID                      AS ID, " +
            "  se.SER_APE_MAT                      AS MATERNO, " +
            "  se.SER_NOM                          AS NOMBRE, " +
            "  te.TRATIPESTCOD                     AS TIPOCOD, " +
            "  te.PAICOD                     AS PAICOD, " +
            "  tip.TIPESTDES                       AS TIPOESTUDIO, " +
            "  tip.PORHORAS                        AS TIPOXHORAS, " +
            "  ps.PAIDES                           AS PAIS, " +
            "  TRAESTCENEST                        AS CENTROESTUDIO , " +
            "  TO_CHAR(TRAESTFECINI,'DD/MM/YYYY' ) AS FINICIO, " +
            "  TO_CHAR(TRAESTFECFIN, 'DD/MM/YYYY') AS FFIN, " +
            "  TO_CHAR(TRAESTFECEXP, 'DD/MM/YYYY') AS FEXP, " +
            "  TRAESTNOMESP                        AS ESPECIALIDAD, " +
            "  TRAESTNROCOL                        AS NROCOLEGIATURA, " +
            "  TRAESTNROTIT                        AS NROTITULACION, " +
            "  TRAESTCERDES                        AS CERTIFICADO, " +
            "  TRAESTNROHOR                        AS HORAS , " +
            "  TRAESTDUR                        AS DURACION , " +
            "  TRAESTNIVALC                        AS NIVALCANZADO " +
            "FROM ((DATAPERLIQU.tb_trabajador_estudio te "+
            "INNER JOIN DATAPERSUEL.servidor se ON( te.TRAESTCODSER=se.SER_COD)"+
            " INNER JOIN DATAPERLIQU.tipo_estudio tip ON (te.TRATIPESTCOD=tip.TIPESTCOD) )"+
            " LEFT JOIN DATAPERLIQU.pais ps ON(te.PAICOD=ps.PAICOD))"+
            " WHERE te.traestcodser=#{dni} "+
            " ORDER BY FFIN ASC" )
    @Results(value = {
            @Result(javaType = Legajos.class),
            @Result(property = "paterno" , column = "PATERNO"),
            @Result(property = "id" , column = "ID"),
            @Result(property = "materno" , column = "MATERNO"),
            @Result(property = "nombre" , column = "NOMBRE"),
            @Result(property = "TipCod" , column = "TIPOCOD"),
            @Result(property = "codpais" , column = "PAICOD"),
            @Result(property = "TipEstDesc" , column = "TIPOESTUDIO"),
            @Result(property = "xhoras" , column = "TIPOXHORAS"),
            @Result(property = "pais" , column = "PAIS"),
            @Result(property = "centro_estudio" , column = "CENTROESTUDIO"),
            @Result(property = "f_inicio" , column = "FINICIO"),
            @Result(property = "f_fin" , column = "FFIN"),
            @Result(property = "fecha_expedicion" , column = "FEXP"),
            @Result(property = "especialidad" , column = "ESPECIALIDAD"),
            @Result(property = "nro_colegiatura" , column = "NROCOLEGIATURA"),
            @Result(property = "nro_titulacion" , column = "NROTITULACION"),
            @Result(property = "certificado" , column = "CERTIFICADO"),
            @Result(property = "horas" , column = "HORAS"),
            @Result(property = "duracion" , column = "DURACION"),
            @Result(property = "niveldescripcion" , column = "NIVALCANZADO"),
    })
    List<Legajos> buscarLegajos(@Param("dni") String dni);


    @Select(value = "SELECT ser_cod      AS ser_cod, " +
                    "  dni                AS dni,    "+
                    "  ser_cod_ant        AS codAnt,"+
                    "  ser_ape_pat        AS apePat, " +
                    "  ser_ape_mat        AS apeMat, " +
                    "  ser_nom            AS nom, "+
                    "  DES_TIP_SER            AS cargo, "+
                    "  des_dep_cesantes            AS cesantia, "+
                    "  desc_est            AS estado, "+
                    "num_serest             as  estadoActual "+
                    "FROM DATAPERSUEL.LISTA_SERVIDOR ORDER BY SER_APE_PAT")
    @Results(value = {
            @Result(javaType = Servidor.class),
            @Result(property = "codigo", column = "ser_cod"),
            @Result(property = "numDoc", column = "dni"),
            @Result(property = "codAnt", column = "codAnt"),
            @Result(property = "paterno", column = "apePat"),
            @Result(property = "materno", column = "apeMat"),
            @Result(property = "nombre", column = "nom"),

            @Result(property = "tipoServicio", column = "cargo"),
            @Result(property = "cesantia", column = "cesantia"),
            @Result(property = "estado", column = "estado") ,
            @Result(property = "estadoTrabaActual", column = "estadoActual")
    })
    List<Servidor> buscarServidores();

    @Select(value = "SELECT tipestcod AS CODIGO,tipestdes AS DESCRIPCION,porhoras AS HORAS FROM DATAPERLIQU.tipo_estudio")
    @Results(value = {
            @Result(javaType = Legajos.class),
            @Result(property = "TipCod",column = "CODIGO"),
            @Result(property = "TipEstDesc",column = "DESCRIPCION"),
            @Result(property = "xhoras",column = "HORAS")
    })
    List<Legajos> TipEstudio();

    @Select(value = "SELECT tipestcod as COD,nvlest as CODNIVEL,nvldesc as DESCR FROM DATAPERLIQU.tipo_nivel_est WHERE tipestcod=#{tipo}")
    @Results(value = {
            @Result(javaType = Legajos.class),
            @Result(property = "TipCod",column = "COD"),
            @Result(property = "nivelcod",column = "CODNIVEL"),
            @Result(property = "niveldescripcion",column = "DESCR")
    })
    List<Legajos> nivelEstudio(@Param("tipo") String tipo);

    @Select(value = "SELECT paicod AS COD,paides AS DES FROM DATAPERLIQU.pais ORDER BY des")
    @Results(value = {
            @Result(javaType = Legajos.class),
            @Result(property = "codpais",column = "COD"),
            @Result(property = "pais",column = "DES")
    })
    List<Legajos> paisEstudio();

    @Select(value = "SELECT cod_estciv AS COD,desc_estciv AS DESCIVIL FROM DATAPERSUEL.estado_civil")
    @Results(value = {
            @Result(javaType = Legajos.class),
            @Result(property = "codcivil",column = "COD"),
            @Result(property = "desc_estcivil",column = "DESCIVIL")
    })
    List<Legajos> estadoCivil();

    @Select(value = "SELECT cod_doc_id AS COD,des_doc_id AS DESCOD FROM DATAPERSUEL.doc_identidad where cod_doc_id_pdt is not null")
    @Results(value = {
            @Result(javaType = Legajos.class),
            @Result(property = "id_doc",column = "COD"),
            @Result(property = "desc_doc",column = "DESCOD")
    })
    List<Legajos> tipoDocumento();

    @Select(value = "SELECT cod_paren AS CODI,desc_paren AS DESCPARENT FROM DATAPERLIQU.tipo_parentesco")
    @Results(value = {
            @Result(javaType = Legajos.class),
            @Result(property = "cod_parent",column = "CODI"),
            @Result(property = "desc_parent",column = "DESCPARENT")
    })
    List<Legajos> tipoParentesco();

    @Select(value = "SELECT IDICOD AS CODIGO,IDINOM AS DESCRIPCION FROM DATAPERLIQU.idioma")
    @Results(value = {
            @Result(javaType = Legajos.class),
            @Result(property = "idioma_cod",column = "CODIGO"),
            @Result(property = "idioma_nom",column = "DESCRIPCION")
    })
    List<Legajos> idiomaEstudio();

    @Insert(value="INSERT " +
            "INTO DATAPERLIQU.TB_TRABAJADOR_ESTUDIO " +
            "  ( " +
            "    TRAESTID, " +
            "    TRAESTCODSER, " +
            "    TRATIPESTCOD, " +
            "    TRAESTFECINI, " +
            "    TRAESTFECFIN, " +
            "    TRAESTCENEST, " +
            "    TRAESTDUR, " +
            "    TRAESTNOMESP, " +
            "    TRAESTNROTIT, " +
            "    TRAESTFECEXP, " +
            "    PAICOD, " +
            "    TRAESTNROCOL, " +
            "    TRAESTCERDES, " +
            "    TRAESTNROHOR, " +
            "    TRAESTNIVALC " +
            "  ) " +
            "  VALUES " +
            "  ( " +
            "    TRA_EST.NEXTVAL, " +
            "    #{codigo}, " +
            "    #{tipCod}, " +
            "    TO_DATE(#{f_inicio},'DD/MM/YY')," +
            "    TO_DATE(#{f_fin},'DD/MM/YY'), " +
            "    #{centro_estudio}, " +
            "    #{duracion}, " +
            "    #{especialidad}, " +
            "    #{nro_titulacion}, " +
            "    TO_DATE( #{fecha_expedicion},'DD/MM/YY')," +
            "    #{codpais}, " +
            "    #{nro_colegiatura}, " +
            "    #{certificado}, " +
            "    #{horas}, " +
            "    #{niveldescripcion} " +
            "  )"
    )
    void addEstudio(@Param("codigo") String codigo,@Param("tipCod") String tipCod,@Param("niveldescripcion") String niveldescripcion,
                             @Param("centro_estudio") String centro_estudio,@Param("certificado") String certificado,@Param("f_inicio") String f_inicio,@Param("f_fin") String f_fin,
                             @Param("horas") int  horas,@Param("especialidad") String especialidad,@Param("nro_titulacion") String nro_titulacion,@Param("fecha_expedicion") String fecha_expedicion,
                             @Param("codpais") String codpais,@Param("duracion") String duracion,@Param("nro_colegiatura") String nro_colegiatura);

    @Delete(value="DELETE FROM DATAPERLIQU.TB_TRABAJADOR_ESTUDIO WHERE TRAESTID=#{estid}")
    void removeEstudio(@Param("estid") int estid);

    @Update(value ="UPDATE DATAPERLIQU.TB_TRABAJADOR_ESTUDIO " +
            "SET TRATIPESTCOD =#{tipCod} , " +
            "  TRAESTFECINI   = #{f_inicio}, " +
            "  TRAESTFECFIN   = #{f_fin}, " +
            "  TRAESTCENEST   = #{centro_estudio}, " +
            "  TRAESTDUR      = #{duracion}, " +
            "  TRAESTNOMESP   = #{especialidad}, " +
            "  TRAESTNROTIT   = #{nro_titulacion}, " +
            "  TRAESTFECEXP   = #{fecha_expedicion}, " +
            "  PAICOD         = #{codpais}, " +
            "  TRAESTNROCOL   = #{nro_colegiatura}, " +
            "  TRAESTCERDES   = #{certificado}, " +
            "  TRAESTNROHOR   = #{horas}, " +
            "  TRAESTNIVALC   = #{niveldescripcion} " +
            "WHERE TRAESTID   = #{id}")
    void updateEstudios(@Param("id") Integer id, @Param("tipCod") String tipCod, @Param("f_inicio") String f_inicio, @Param("f_fin") String f_fin,
                        @Param("centro_estudio") String centro_estudio, @Param("duracion") String duracion,@Param("especialidad") String especialidad,@Param("nro_titulacion") String nro_titulacion,
                        @Param("fecha_expedicion") String fecha_expedicion, @Param("certificado") String certificado,@Param("codpais")  String codpais,@Param("nro_colegiatura")  String nro_colegiatura,
                        @Param("horas") int horas,@Param("niveldescripcion") String niveldescripcion);

    @Select(value = "SELECT TIMSERV_ID AS TIMSERID, " +
            "  TIMSERV_DESC AS DESCRIPCION, " +
            "  TIMSERV_TIPO AS TIPO " +
            "  FROM DATAPERLIQU.TB_TIPO_TIMSERV " +
            "  WHERE TIMSERV_TIPO=#{tipo}")
    @Results(value = {
            @Result(javaType = TiempoServicio.class),
            @Result(property = "id_tipo_servicio",column = "TIMSERID"),
            @Result(property = "desc_tipo_servicio",column = "DESCRIPCION"),
            @Result(property = "tipo_tiempo_servicio",column = "TIPO")
    })
    List<TiempoServicio> tipoTiempoServicio(@Param("tipo") String tipo);

    @Select(value = "SELECT RESTRANUM                  AS RESID, " +
            "  TO_CHAR(RESTRAFEC,'DD/MM/YYYY') AS FECHA , " +
            "  RESTRADES1                      AS DESCR, " +
            "  re.tiprescod                    AS TIPCOD, " +
            "  tipo.tipresdes                  AS TIPDESC, " +
            "  re.TIPRESMOTCOD                 AS MOTCOD, " +
            "  mo.TIPRESMOTDES                 AS MOTDESC " +
            "FROM DATAPERLIQU.tb_trabajador_resolucion_id tr , " +
            "  DATAPERLIQU.resolucion_id re, " +
            "  DATAPERLIQU.tipores_motivo mo , " +
            "  DATAPERLIQU.tipo_resolucion tipo " +
            "WHERE tr.dni         =#{codigo} " +
            "AND tr.num_ser_estado=#{numserest} " +
            "AND re.restranum     =tr.cod_resol " +
            "AND re.tipresmotcod  =mo.tipresmotcod " +
            "AND re.tiprescod     =tipo.tiprescod")
    @Results(value = {
            @Result(javaType = Resoluciones.class),
            @Result(property = "res_id",column = "RESID"),
            @Result(property = "res_fecha",column = "FECHA"),
            @Result(property = "res_desc1",column = "DESCR"),
            @Result(property = "res_tipo_cod",column = "TIPCOD"),
            @Result(property = "res_tipo_desc",column = "TIPDESC"),
            @Result(property = "res_mot_cod",column = "MOTCOD"),
            @Result(property = "res_mot_desc",column = "MOTDESC")
    })
    List<Resoluciones> buscarResoluciones(@Param("codigo") String codigo,@Param("numserest") Integer numserest);


    @Insert(value="INSERT " +
            "INTO DATAPERLIQU.TB_TIEMPO_SERVICIO " +
            "  ( " +
            "    TIMSERV_ID, " +
            "    TIMSERV_TIP, " +
            "    FECHA, " +
            "    RESOL_ID, " +
            "    ANIO, " +
            "    MES, " +
            "    DIA, " +
            "    SER_COD, " +
            "    DESC_SER_EST " +
            "  ) " +
            "  VALUES " +
            "  ( " +
            "    ESCAL_SEQ.NEXTVAL, " +
            "    #{res_tipo_cod}, " +
            "    TO_DATE(#{res_fecha},'DD/MM/YY')," +
            "    #{res_id}, " +
            "    #{res_anio}, " +
            "    #{res_mes}, " +
            "    #{res_dia}, " +
            "    #{res_codser}, " +
            "    #{res_num_serest} " +
            "  )"
    )
    void addResolucion(@Param("res_tipo_cod") String res_tipo_cod, @Param("res_fecha") String res_fecha, @Param("res_id")String res_id,@Param("res_anio") Integer res_anio,
                       @Param("res_mes") Integer res_mes,@Param("res_dia") Integer res_dia,@Param("res_codser") String res_codser,@Param("res_num_serest") String res_num_serest);


    @Select(value ="SELECT ts.TIMSERV_ID AS TS_ID, " +
            "  tipo.TIMSERV_DESC  AS DES, " +
            "  tipo.TIMSERV_TIPO  AS TIPO, " +
            "  tipo.TIMSERV_ID AS IDTIP,"+
            "  TO_CHAR(ts.FECHA ,'DD-MM-YYYY' )  AS FECHA, " +
            "  ts.RESOL_ID        AS RESOLUCION, " +
            "  ts.ANIO            AS ANIO, " +
            "  ts.MES             AS MES, " +
            "  ts.DIA             AS DIA, " +
            "  TO_CHAR(RESTRAFEC,'DD/MM/YYYY' )  AS FECHARESOL " +
            "  FROM DATAPERLIQU.tb_tiempo_servicio ts, " +
            "  DATAPERLIQU.tb_tipo_timserv tipo, " +
            "  DATAPERLIQU.resolucion_id re " +
            "  WHERE ser_cod     =#{codigo} " +
            "  AND desc_ser_est  =#{numserest} " +
            "  AND re.RESTRANUM  =ts.RESOL_ID " +
            "  AND ts.timserv_tip=tipo.timserv_id")
    @Results(value = {
            @Result(javaType = Resoluciones.class),
            @Result(property = "res_seq_tmp_serv",column = "TS_ID"),
            @Result(property = "res_tipo_desc",column = "DES"),
            @Result(property = "res_tipo_cod",column = "TIPO"),
            @Result(property = "tiemp_serv_id",column = "IDTIP"),
            @Result(property = "res_fecha",column = "FECHA"),
            @Result(property = "res_id",column = "RESOLUCION"),
            @Result(property = "res_anio",column = "ANIO"),
            @Result(property = "res_mes",column = "MES"),
            @Result(property = "res_dia",column = "DIA"),
            @Result(property = "res_fecha_resol_dfl",column = "FECHARESOL")
    })
    List<Resoluciones> buscarResoluciondeServ(@Param("codigo") String codigo,@Param("numserest") String numserest);


    @Delete(value="DELETE FROM DATAPERLIQU.TB_TIEMPO_SERVICIO WHERE TIMSERV_ID=#{id}")
    void removeTiempoServicio(@Param("id") int id);


    @Update(value ="UPDATE DATAPERLIQU.tb_tiempo_servicio " +
            "  SET FECHA       =#{res_fecha}, " +
            "  RESOL_ID      =#{res_id}, " +
            "  ANIO          =#{res_anio} , " +
            "  MES           =#{res_mes} , " +
            "  DIA           =#{res_dia} " +
            "  WHERE TIMSERV_ID=#{res_seq_tmp_serv}")
    void updateResolucion(@Param("res_seq_tmp_serv") Integer res_seq_tmp_serv,@Param("res_fecha") String res_fecha,@Param("res_id") String res_id,@Param("res_anio") Integer res_anio,@Param("res_mes") Integer res_mes,
                          @Param("res_dia") Integer res_dia);

    @Select(value = "SELECT cod_tip_pag_ser AS COD,des_tip_pag_ser AS DESCPAGO,abv_tip_pag_ser AS ABVPAGO FROM DATAPERSUEL.tipo_pag_ser")
    @Results(value = {
            @Result(javaType = Legajos.class),
            @Result(property = "id_tip_pago",column = "COD"),
            @Result(property = "desc_tip_pago",column = "DESCPAGO")
    })
    List<Legajos> tipoPago();

    @Insert(value = "INSERT INTO  DATAPERLIQU.tb_carga_familiar(carga_fam.nextval AS CARGFAM,tradcod AS TRADCOD,carfamnom AS CARGDOC,carfamfechnac AS CARGFECHNAC,carfamsex AS CARGSEX," +
            "carfamviv AS CARGNIV,carfamdir AS CARGDIR,carfamdep AS CARGDEP,carfamben AS CARGBEN,carfamtel AS CARGTEL,carfamocu AS CARGCU,carfamrestciv AS CARGCIV,carfampar AS CARGPAR," +
            "carfamnumcerinc AS CARGNUMCER,carfamnumessal AS CARGNUMESSAL,carfamdni AS CARGDNI) " +
            "values(carga_fam.nextval,#{tradcod},#{carfamnom},#{carfamfechnac},#{carfamsex},#{carfamviv},#{carfamdir},#{carfamdep},#{carfamben}," +
            "#{carfamtel},#{carfamocu},#{carfamrestciv},#{carfampar},#{carfamnumcerinc},#{carfamnumessal},#{carfamdni})")
    public  void  addCargaFam(@Param("nId") String id, @Param("email") String email, @Param("name") String name, @Param("lastname") String lastname) throws DataAccessException;


    @Select(value = "select carfamnom AS NOMAPE,carfamsec AS IDFAMILIAR,tipo_beneficio AS TIPBENEFICIO,cod_resol AS CODRESOL, titularcuent AS TITUTCUEN,carfamtel AS TELEF,tipopago AS TIPOPAGO,carfamben AS BENEF,numcuent AS NUMCUENT,TO_CHAR(carfamfecnac,'DD/MM/YYYY' ) AS FAMFECH,carfamdep AS DEP,carfarestciv AS ESTADOCIVIL,carfamnumessal AS NUMSEGU,carfamdocid as TIPDOC,carfampar AS IDPARENT,carfamdir AS DIREC,desc_paren AS PARENT,des_doc_id AS DOC," +
            "carfamdni AS NUMDOC,carfamsex AS SEX " +
            "from(( ( DATAPERLIQU.tb_carga_familiar inner join  DATAPERLIQU.tipo_parentesco on( dataperliqu.tb_carga_familiar.carfampar =dataperliqu.tipo_parentesco.cod_paren))left join DATAPERSUEL.doc_identidad on dataperliqu.tb_carga_familiar.carfamdocid= datapersuel.doc_identidad.cod_doc_id)left join DATAPERLIQU.tb_beneficiario on carfamsec=codbenf)where CARFAMCODSER=#{dni}")
    @Results(value = {

            @Result(javaType = LegajosCargaFamiliar.class),
            @Result(property = "cargfamnom",column = "NOMAPE"),
            @Result(property = "cargfamsec",column = "IDFAMILIAR"),
            @Result(property = "tipbeneficio",column = "TIPBENEFICIO"),
            @Result(property = "codresol",column = "CODRESOL"),
            @Result(property = "titularcuenta",column = "TITUTCUEN"),
            @Result(property = "cargfamtel",column = "TELEF"),
            @Result(property = "cargfamben",column = "BENEF"),
            @Result(property = "tipopago",column = "TIPOPAGO"),
            @Result(property = "numcuenta",column = "NUMCUENT"),
            @Result(property = "cargfamfechnac",column = "FAMFECH"),
            @Result(property = "cargfamdep",column = "DEP"),
            @Result(property = "cargfamrestciv",column = "ESTADOCIVIL"),
            @Result(property = "cargfamnumessal",column = "NUMSEGU"),
            @Result(property = "cargfamiddoc",column = "TIPDOC"),
            @Result(property = "cargfamidpar",column = "IDPARENT"),
            @Result(property = "cargfamdir",column = "DIREC"),
            @Result(property = "cargfampar",column = "PARENT"),
            @Result(property = "cargfamdoc",column = "DOC"),
            @Result(property = "cargfamnumdoc",column = "NUMDOC"),
            @Result(property = "cargfamsex",column = "SEX")

    })
    public List<LegajosCargaFamiliar> cargaFamiliar(@Param("dni") String dni)throws DataAccessException;

    @Insert(value = "INSERT INTO DATAPERLIQU.tb_carga_familiar VALUES(carga_fam.nextval,#{Cargfamcodser},#{nomape},TO_DATE(#{Cargfamfechnac},'DD/MM/YY'),#{Cargfamsex},null,#{cargFamdir},#{Cargfamdep},#{Cargfamben},#{Cargfamtel}," +
            "null,#{Cargfamrestciv},#{fampar},null,#{Cargfamnumessal},#{cargfamnumdoc},#{Cargfamdoc})")
    public  void  addDatosFamiliares(@Param("nomape") String nom,@Param("fampar")String fampar,@Param("cargFamdir")String CargFamdir,@Param("Cargfamdoc")String Cargfamdoc,
                                     @Param("cargfamnumdoc")String Cargfamnumdoc,@Param("Cargfamsex")String Cargfamsex,@Param("Cargfamfechnac")String Cargfamfechnac,@Param("Cargfamtel")String Cargfamtel,
                                     @Param("Cargfamrestciv")String Cargfamrestciv,@Param("Cargfamben")String Cargfamben,@Param("Cargfamnumessal")String Cargfamnumessal,@Param("Cargfamdep")String Cargfamdep,@Param("Cargfamcodser")String Cargfamcodser) throws DataAccessException;

    @Insert(value = "insert into DATAPERLIQU.tb_beneficiario values(beneficiario.nextval,#{idfamily},#{tipopago},#{numcuenta},#{titularcuenta},#{tipBenef},#{codResol})")
    public  void  addBeneficiarios(@Param("tipopago") String tipopago,@Param("numcuenta") int numcuenta,@Param("titularcuenta") String titularcuenta,@Param("idfamily") String idfamily,@Param("codResol") String codResol,@Param("tipBenef") int tipBenef ) throws DataAccessException;


    @Select(value = "SELECT carfamsec AS IDFAM FROM DATAPERLIQU.tb_carga_familiar WHERE CARFAMNOM=#{dni} and CARFAMCODSER=#{serv}")
    @Results(value = {
            @Result(javaType = LegajosCargaFamiliar.class),
            @Result(property = "cargfamsec",column = "IDFAM")

    })
    public List<LegajosCargaFamiliar> idFamiliar(@Param("dni") String dni,@Param("serv") String serv)throws DataAccessException;

    @Delete(value="DELETE FROM DATAPERLIQU.tb_carga_familiar WHERE carfamsec=#{idfam}")
    void removeFamiliar(@Param("idfam") Integer idfam);

    @Delete(value="DELETE FROM DATAPERLIQU.tb_beneficiario WHERE codbenf=#{idfam}")
    void removeBeneficiario(@Param("idfam") Integer idfam);

    @Update(value = "UPDATE DATAPERLIQU.tb_carga_familiar  set carfamnom=#{nomape},CARFAMDNI=#{cargfamnumdoc},CARFAMDOCID=#{Cargfamdoc},CARFAMTEL=#{Cargfamtel},CARFAMPAR=#{fampar},CARFAMDIR=#{cargFamdir},CARFARESTCIV=#{Cargfamrestciv},CARFAMBEN=#{Cargfamben},CARFAMNUMESSAL=#{Cargfamnumessal},CARFAMDEP=#{Cargfamdep},carfamsex=#{Cargfamsex},carfamfecnac=#{Cargfamfechnac} where carfamsec= #{Cargfamsec}")
    public void editarDatosFamiliares(@Param("nomape") String nom,@Param("fampar")String fampar,@Param("cargFamdir")String CargFamdir,@Param("Cargfamdoc")String Cargfamdoc,
                                      @Param("cargfamnumdoc")String Cargfamnumdoc,@Param("Cargfamsex")String Cargfamsex,@Param("Cargfamfechnac")String Cargfamfechnac,@Param("Cargfamtel")String Cargfamtel,
                                      @Param("Cargfamrestciv")String Cargfamrestciv,@Param("Cargfamben")String Cargfamben,@Param("Cargfamnumessal")String Cargfamnumessal,@Param("Cargfamdep")String Cargfamdep,@Param("Cargfamcodser")String Cargfamcodser,@Param("Cargfamsec")Integer Cargfamsec) throws DataAccessException;

    @Select(value = "SELECT TIPBENEFID AS COD,DESCRIPCION AS DESC_TIPBENEF FROM DATAPERLIQU.tb_tipo_beneficio")
    @Results(value = {
            @Result(javaType = Legajos.class),
            @Result(property = "cod_tip_benef",column = "COD"),
            @Result(property = "desc_tip_benef",column = "DESC_TIPBENEF")
    })
    List<Legajos> tipoBeneficio();


    @Select(value = "SELECT carfamcodser FROM DATAPERLIQU.tb_carga_familiar WHERE carfamdni=#{numdoc}")
    @Results(value = {
            @Result(javaType = LegajosCargaFamiliar.class),
            @Result(property = "cargfamcodser",column = "carfamcodser"),

    })
    List<LegajosCargaFamiliar> validarExisteDocumento(String numdoc);


    @Select(value = "SELECT carfamcodser FROM DATAPERLIQU.tb_carga_familiar WHERE carfamdni=#{numdoc} AND carfamsec!=#{carfamsec}")
    @Results(value = {
            @Result(javaType = LegajosCargaFamiliar.class),
            @Result(property = "cargfamcodser",column = "carfamcodser"),

    })
    List<LegajosCargaFamiliar> validarEditDocumento(@Param("numdoc") String numdoc,@Param("carfamsec") String carfamsec);
}
