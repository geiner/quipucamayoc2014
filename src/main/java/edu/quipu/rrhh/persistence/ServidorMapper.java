package edu.quipu.rrhh.persistence;

import edu.quipu.rrhh.models.*;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface ServidorMapper {

    @Select(value = "{call qpdatagestion.servidor_wkg.sp_grabar_datos_servidor(#{ser.codigo}," +
            "#{ser.paterno},#{ser.materno},#{ser.nombre},#{ser.nacimiento},#{ser.telefono}," +
            "#{ser.sexo},#{ser.numDoc},#{ser.hij},#{ser.estCiv},#{ser.tipoDoc},#{ser.fechaInUnmsm}," +
            "#{ser.domicilio},#{ser.ruc},#{ser.numSegSoc},#{ser.estVit},#{ser.titCueBan},#{ser.correo}) }")
    void save(@Param("ser") Servidor servidor);

    @Select(value ="SELECT ser_cod       AS cod, " +
            "  ser_ape_pat        AS apePat, " +
            "  ser_ape_mat        AS apeMat, " +
            "  ser_nom            AS nom, " +
            "  ser_ecv_act        AS estCiv, " +
            "  ser_tip_doc_id_act AS tipDocId, " +
            "  ser_doc_id_act     AS docId, " +
            "  ser_sexo           AS sex, " +
            "  to_char(ser_fech_nac,'dd/mm/yyyy')       AS nac, " +
            "  ser_ubi_pais_nac   AS paisnac, " +
            "  ser_ubi_dept_nac   AS deptnac, " +
            "  ser_ubi_prov_nac   AS provnac, " +
            "  ser_ubi_dist_nac   AS distnac, " +
            "  SER_UBI_PAIS_DOM   AS paisdom, " +
            "  SER_UBI_DEPT_DOM   AS deptdom, " +
            "  SER_UBI_PROV_DOM   AS provdom, " +
            "  SER_UBI_DIST_DOM   AS distdom, " +
            "  SER_ESPF_LUGAR   AS espfdom, " +
            "  SER_DOM            AS lugdom, " +
            "  ser_num_hij        AS hij, " +
            "  ser_num_ruc        AS ruc, " +
            "  to_char(ser_fech_in_unmsm,'dd/mm/yyyy')  AS ingUnmsm, " +
            "  ser_telef          AS tel, " +
            "  SER_TELEF_CELL     AS celul, " +
            "  ser_mail           AS correo " +
            "FROM datapersuel.servidor " +
            "WHERE trim(ser_cod) = trim(#{ser.codigo})" )
    @Results(value = {@Result(javaType = Servidor.class),
            @Result(property = "codigo", column = "cod"),
            @Result(property = "paterno", column = "apePat"),
            @Result(property = "materno", column = "apeMat"),
            @Result(property = "nombre", column = "nom"),
            @Result(property = "estCiv", column = "estCiv"),
            @Result(property = "tipoDoc", column = "tipDocId"),
            @Result(property = "numDoc", column = "docId"),
            @Result(property = "sexo", column = "sex"),
            @Result(property = "nacimiento", column = "nac"),
            @Result(property = "paisNac", column = "paisnac"),
            @Result(property = "codNacdepart", column = "deptnac"),
            @Result(property = "codNacprov", column = "provnac"),
            @Result(property = "codNacditr", column = "distnac"),
            @Result(property = "paisDomcilio", column = "paisdom"),
            @Result(property = "codDepartamento", column = "deptdom"),
            @Result(property = "codProvincia", column = "provdom"),
            @Result(property = "codDistrito", column = "distdom"),
            @Result(property = "domicilio", column = "lugdom"),
            @Result(property = "espfdom", column = "espfdom"),
            @Result(property = "hij", column = "hij"),
            @Result(property = "ruc", column = "ruc"),
            @Result(property = "fechaInUnmsm", column = "ingUnmsm"),
            @Result(property = "telefono", column = "tel"),
            @Result(property = "celular", column = "celul"),
            @Result(property = "correo", column = "correo")
    })
    List<Servidor> findByCod(@Param("ser") Servidor servidor);



    //servidor laboral
    @Select(value = "SELECT se.ser_cod        AS cod, " +
            "  ser_est_act         AS estLab, " +
            "  ser_rpe_act         AS regPen, " +
            "  ser_ent_aseg        AS entAse, " +
            "  ser_est_afp         AS estAfp, " +
            "  ser_cat_act         AS cat, " +
            "  ser_con_pla_act     AS conPla, " +
            "  ser_tip_ser_gen     AS tipGen, " +
            "  ser_tip_act         AS tip, " +
            "  ser_tip_pag_act     AS tipPag, " +
            "  ser_cta_ban_act     AS cueBan, " +
            "  SER_TIT_CTA_BAN     as titcueBan, "+
            "  SER_NUM_RUC         as ruc, "+
            "  TO_CHAR(ser_fech_reg_lab,'DD/MM/YYYY' )    AS regLab, " +
            "  ser_num_sis_pri_pen AS numPen ," +
            "  TO_CHAR(SER_ORI_FECH_INSC_REGPEN,'DD/MM/YYYY' ) AS insregpen,"+
            "  SER_ORI_TIP_OCUPUNIV AS tipocupuni, " +
            "  SER_ORI_SINDICATO AS sindic " +
            "  FROM datapersuel.servidor_estado se ," +
            "  DATAPERSUEL.servidor_origen so "+
            "  WHERE trim(se.ser_cod) = trim(#{servidorLaboral.cod}) " +
            "  and se.ser_cod=so.ser_cod "+
            "  ORDER BY conPla, " +
            "  cat")
    @Results(value = {
            @Result(javaType = ServidorLaboral.class),
            @Result(column = "cod", property = "cod"),
            @Result(column = "estLab", property = "estLab"),
            @Result(column = "regPen", property = "regPen"),
            @Result(column = "entAse", property = "entAse"),
            @Result(column = "estAfp", property = "estAfp"),
            @Result(column = "cat", property = "cat"),
            @Result(column = "conPla", property = "conPla"),
            @Result(column = "tipGen", property = "tipGen"),
            @Result(column = "tip", property = "tip"),
            @Result(column = "tipPag", property = "tipPag"),
            @Result(column = "cueBan", property = "cueBan"),
            @Result(column = "titcueBan", property = "titcueBan"),
            @Result(column = "regLab", property = "regLab"),
            @Result(column = "numPen", property = "numPen"),
            @Result(column = "insregpen", property = "insregpen"),
            @Result(column = "tipocupuni", property = "tipocupuni"),
            @Result(column = "sindic", property = "sindic"),
            @Result(column = "ruc", property = "ruc"),
    })
    public List<ServidorLaboral> findByCodLab(@Param("servidorLaboral") ServidorLaboral servidorLaboral);


    @Insert(value = "INSERT " +
            "INTO Datapersuel.Servidor_Origen " +
            "  ( " +
            "    Ser_Cod, " +
            "    Ser_Ori_Tip_Ocupuniv, " +
            "    Ser_Ori_Fech_Insc_Regpen, " +
            "    Ser_Ori_Sindicato " +
            "  ) " +
            "  VALUES " +
            "  ( " +
            "    #{ser.cod}, " +
            "    #{ser.tipocupuni}, " +
            "    #{ser.insregpen}, " +
            "    #{ser.sindic} " +
            "  )")
    void saveLaboral2(@Param("ser") ServidorLaboral servidorLaboral);

    @Update(value ="UPDATE DATAPERSUEL.Servidor_Origen SET " +
            "    Ser_Ori_Tip_Ocupuniv=#{ser.tipocupuni}, " +
            "    Ser_Ori_Fech_Insc_Regpen=TO_DATE(#{ser.insregpen},'DD/MM/YY'), " +
            "    Ser_Ori_Sindicato=#{ser.sindic}" +
            "WHERE trim(SER_COD)=trim(#{ser.cod})")
    void updateServidorLaboral2( @Param("ser") ServidorLaboral servidorLaboral);

    @Insert(value ="INSERT " +
            "INTO DATAPERSUEL.SERVIDOR_ESTADO " +
            "  ( " +
            "    ser_cod, " +
            "    num_serest, " +
            "    ser_est_act, " +
            "    ser_cat_act, " +
            "    ser_tip_act, " +
            "    ser_rpe_act, " +
            "    ser_cta_ban_act, " +
            "    ser_tip_pag_act, " +
            "    ser_con_pla_act, " +
            "    ser_ent_aseg, " +
            "    ser_tip_ser_gen, " +
            "    ser_num_sis_pri_pen, " +
            "    ser_est_afp, " +
            "    ser_fech_reg_lab, " +
            "    SER_TIT_CTA_BAN ," +
            "    SER_NUM_RUC ," +
            "    SER_COD_DEP_CES, " +
            "    SER_COD_DEP_ACT " +
            "  ) " +
            "  VALUES " +
            "  ( " +
            "    #{ser.cod}, " +
            "    (SELECT COUNT(ser_Cod)+1 FROM Datapersuel.SERVIDOR_ESTADO  WHERE ser_cod=#{ser.cod}), " +
            "    #{ser.estLab}, " +
            "    #{ser.cat}, " +
            "    #{ser.tip}, " +
            "    #{ser.regPen}, " +
            "    #{ser.cueBan}, " +
            "    #{ser.tipPag}, " +
            "    #{ser.conPla}, " +
            "    #{ser.entAse}, " +
            "    #{ser.tipGen}, " +
            "    #{ser.numPen}, " +
            "    #{ser.estAfp}, " +
            "    #{ser.regLab}, " +
            "    #{ser.titcueBan}, " +
            "    #{ser.ruc}, " +
            "    SELECT COD_DEP_CESANTES FROM DEPENDENCIA_CESANTES WHERE COD_DEP_CESANTES=(SELECT MIN(COD_DEP_CESANTES) FROM DEPENDENCIA_CESANTES GROUP BY UD_ID HAVING UD_ID=#{ser.dependencia}) AND UD_ID=#{ser.dependencia}, " +
            "    #{ser.dependencia} " +
            "  )")
    void saveLaboral(@Param("ser") ServidorLaboral servidorLaboral);

    @Update(value ="UPDATE DATAPERSUEL.SERVIDOR_ESTADO SET " +
            "    ser_est_act=#{ser.estLab}, " +
            "    ser_cat_act=#{ser.cat}, " +
            "    ser_tip_act=#{ser.tip}, " +
            "    ser_rpe_act=#{ser.regPen}, " +
            "    ser_cta_ban_act=#{ser.cueBan}, " +
            "    ser_tip_pag_act=#{ser.tipPag}, " +
            "    ser_tit_cta_ban=#{ser.titcueBan}, " +
            "    ser_con_pla_act=#{ser.conPla}, " +
            "    ser_ent_aseg=#{ser.entAse}, " +
            "    ser_tip_ser_gen=#{ser.tipGen}, " +
            "    ser_num_sis_pri_pen=#{ser.numPen}, " +
            "    ser_est_afp=#{ser.estAfp}, " +
            "    ser_num_ruc=#{ser.ruc}, " +
            "    ser_fech_reg_lab=TO_DATE(#{ser.regLab},'DD/MM/YY') " +
            " WHERE trim(SER_COD)=trim(#{ser.cod})")
    void updateServidorLaboral(@Param("ser") ServidorLaboral servidorLaboral);
    //fin de metodos de servidorLABORAL


    //inicio de servidorCargo
    @Select(value = "SELECT c_cargo_id     AS cod, " +
            "  t_cargo_descripcion AS dsc " +
            "FROM qpdatagestion.tb_cargos " +
            "ORDER BY dsc")
    @Results(value = {
            @Result(javaType = ServidorCargo.class),
            @Result(column = "cod",property = "cod"),
            @Result(column = "dsc",property = "dsc"),
    })
    public List<ServidorCargo> findAllCargo();

    //    @Results(value = {@Result(javaType = ServidorCAS.class),
//            @Result(property = "unidadId", column = "UD_ID"),
//            @Result(property = "ruc", column = "ser_num_ruc"),
//            @Result(property = "paterno", column = "ser_ape_pat"),
//            @Result(property = "materno", column = "ser_ape_mat"),
//            @Result(property = "nombre", column = "ser_nom"),
//            @Result(property = "numeroContrato", column = "t_contrato_numero"),
//            @Result(property = "ultimaAdenda", column = "t_adenda_numero"),
//            @Result(property = "horasCumplir", column = "horas_laboradas"),
//            @Result(property = "minutosTardanza", column = "minutos_laborados"),
//            @Result(property = "monto", column = "monto"),
//            @Result(property = "totalPago", column = "total_pago"),
//            @Result(property = "honorarioMensual", column = "total"),
//            @Result(property = "codigo", column = "ser_cod"),
//            @Result(property = "numeroOperacionCuarta", column = "suspension"),
//            @Result(property = "codigoObservacion", column = "c_ser_cod")})
//    List<ServidorCAS> find(@Param("udid") int udid, @Param("anio") int anio, @Param("mes") int mes, @Param("esFacultad") boolean esFacultad);

//    @Results(value = {
//            @Result(javaType = ServidorCAS.class),
//            @Result(property = "unidadId", column = "UD_ID"),
//            @Result(property = "ruc", column = "ser_num_ruc"),
//            @Result(property = "paterno", column = "ser_ape_pat"),
//            @Result(property = "materno", column = "ser_ape_mat"),
//            @Result(property = "nombre", column = "ser_nom"),
//            @Result(property = "numeroContrato", column = "t_contrato_numero"),
//            @Result(property = "ultimaAdenda", column = "t_adenda_numero"),
//            @Result(property = "horasCumplir", column = "horas_laboradas"),
//            @Result(property = "minutosTardanza", column = "minutos_laborados"),
//            @Result(property = "monto", column = "monto"),
//            @Result(property = "totalPago", column = "total_pago"),
//            @Result(property = "honorarioMensual", column = "total"),
//            @Result(property = "numeroPlanilla", column = "apnum"),
//            @Result(property = "planillaCorrelativo", column = "placod"),
//            @Result(property = "detallePlanillaCorrelativo", column = "dplacod"),
//            @Result(property = "estadoServidor", column = "plaest"),
//            @Result(property = "codigo", column = "ser_cod"),
//            @Result(property = "numeroOperacionCuarta", column = "suspension"),
//            @Result(property = "codigoObservacion", column = "c_ser_cod")})
//    List<ServidorCAS> findEnPlanilla(@Param("udid") int udid, @Param("anio") int anio, @Param("mes") int mes, @Param("apnum") String apnum, @Param("esFacultad") boolean esFacultad) throws DataAccessException;

//    @Results(value = {@Result(javaType = ServidorCAS.class),
//            @Result(property = "unidadId", column = "UD_ID"),
//            @Result(property = "ruc", column = "ser_num_ruc"),
//            @Result(property = "paterno", column = "ser_ape_pat"),
//            @Result(property = "materno", column = "ser_ape_mat"),
//            @Result(property = "nombre", column = "ser_nom"),
//            @Result(property = "numeroContrato", column = "t_contrato_numero"),
//            @Result(property = "ultimaAdenda", column = "t_adenda_numero"),
//            @Result(property = "horasCumplir", column = "horas_laboradas"),
//            @Result(property = "minutosTardanza", column = "minutos_laborados"),
//            @Result(property = "monto", column = "monto"),
//            @Result(property = "totalPago", column = "total_pago"),
//            @Result(property = "honorarioMensual", column = "total"),
//            @Result(property = "codigo", column = "ser_cod"),
//            @Result(property = "numeroOperacionCuarta", column = "suspension"),
//            @Result(property = "codigoObservacion", column = "c_ser_cod")})
//    List<ServidorCAS> findSinPlanilla(@Param("udid") int udid, @Param("anio") int anio, @Param("mes") int mes, @Param("esFacultad") boolean esFacultad) throws DataAccessException;

    @Select(value = "SELECT cod_est AS cod, " +
            "  desc_est     AS dsc " +
            "FROM datapersuel.estado " +
            "ORDER BY dsc")
    @Results(value = {
            @Result(javaType = ServidorEstado.class),
            @Result(column = "cod", property = "cod"),
            @Result(column = "dsc", property = "dsc")
    })
    public List<ServidorEstado> findAllEstado();


    //inicio de servidorTipo
    @Select(value = "SELECT cod_tip_ser AS cod, " +
            "  des_tip_ser      AS dsc " +
            "FROM datapersuel.tip_servidor " +
            "WHERE trim(des_tip_ser) in ('ADMINISTRATIVO','DOCENTE') " +
            "ORDER BY dsc")
    @Results(value = {
            @Result(javaType = ServidorTipo.class),
            @Result(column = "cod", property = "cod"),
            @Result(column = "dsc", property = "dsc")
    })
    public List<ServidorTipo> findAllTipo();


    @Select(value = "SELECT tip.cod_tip_ser AS cod, " +
            "  tip.des_tip_ser      AS dsc " +
            "FROM datapersuel.tip_servidor tip " +
            "INNER JOIN DATAPERSUEL.tb_tip_gen_tip enl " +
            "ON tip.cod_tip_ser                = enl.cod_tip_ser " +
            "WHERE enl.cod_tip_ser_gen         = #{tipGen.cod} " +
            "ORDER BY dsc")
    @Results(value = {
            @Result(javaType = ServidorTipo.class),
            @Result(column = "cod", property = "cod"),
            @Result(column = "dsc", property = "dsc")
    })
    public List<ServidorTipo> findByTipGen(@Param("tipGen") ServidorGenerico tipGen);



    @Select(value = "SELECT cod_tip_ser_gen AS cod, " +
            "  des_tip_ser_gen      AS dsc " +
            "FROM datapersuel.tip_servidor_gen " +
            "ORDER BY dsc")
    @Results(value = {
            @Result(column = "cod", property = "cod"),
            @Result(column = "dsc", property = "dsc"),
    })
    List<ServidorGenerico> findAllGenerico();


    @Select(value = "SELECT ca.cod_categ AS cod," +
            "  ca.desc_categ     AS dscr " +
            " FROM datapersuel.categoria ca, " +
            "  DATAPERSUEL.tip_servidor ti " +
            " WHERE ca.cod_tip_ser=ti.cod_tip_ser " +
            " AND ti.cod_tip_ser  =#{cat} " +
            " ORDER BY dscr")
    @Results(value = {
            @Result(javaType = CategoriaServidor.class),
            @Result(column = "cod", property = "cod"),
            @Result(column = "dscr", property = "dsc")
    })
    public List<CategoriaServidor> findAllCategoria(@Param("cat") int categoria);



    @Select(value = "SELECT cod_con_pla AS cod, " +
            "  des_con_pla      AS dsc " +
            "FROM datapersuel.cond_ser_plan " +
            "ORDER BY dsc")
    @Results(value = {
            @Result(javaType = CondicionPlanilla.class),
            @Result(column = "cod", property = "cod"),
            @Result(column = "dsc", property = "dsc"),
    })
    public List<CondicionPlanilla> findAllCondicionPlanilla();

    @Select(value = "SELECT cod_tip_pag_ser AS cod, " +
            "  des_tip_pag_ser      AS dsc " +
            "FROM datapersuel.tipo_pag_ser " +
            "WHERE trim(des_tip_pag_ser) in ('BANCO','CHEQUE') " +
            "ORDER BY dsc")
    @Results(value = {
            @Result(javaType = TipoPago.class),
            @Result(column = "cod",property = "cod"),
            @Result(column = "dsc",property = "dsc")
    })
    public List<TipoPago> findAllPago();

    @Select(value = "SELECT ent_aseg_cod AS cod, " +
            "  cod_reg_pen       AS rpe, " +
            "  des_ent_aseg      AS dsc " +
            "FROM datapersuel.entidad_aseguradora " +
            "ORDER BY dsc")
    @Results(value = {
            @Result(javaType = EntidadAseguradora.class),
            @Result(column = "cod",property = "cod"),
            @Result(column = "rpe",property = "rpe"),
            @Result(column = "dsc",property = "dsc")
    })
    public List<EntidadAseguradora> findAllEntidad();

    @Select(value = "SELECT ent_aseg_cod AS cod, " +
            "  cod_reg_pen       AS rpe, " +
            "  des_ent_aseg      AS dsc " +
            "FROM datapersuel.entidad_aseguradora " +
            "WHERE cod_reg_pen = #{rpeId} " +
            "ORDER BY dsc")
    @Results(value = {
            @Result(javaType = EntidadAseguradora.class),
            @Result(column = "cod",property = "cod"),
            @Result(column = "rpe",property = "rpe"),
            @Result(column = "dsc",property = "dsc")
    })
    public List<EntidadAseguradora> findByRpeEntidad(@Param("rpeId") Integer rpeId);

    @Select(value ="SELECT C_USUID as cod FROM QPRODATAQUIPU.tb_erp_usuario WHERE t_mail=#{correo}" )
    @Results(value = {
            @Result(javaType = Servidor.class),
            @Result(column = "cod",property = "codigo"),
    })
    List<Servidor> ExisteServidor(@Param("correo") String correo);

    @Select(value ="SELECT c_usuid AS C_USUID FROM QPRODATAQUIPU.tb_hist_usu_perf WHERE t_mail=#{email} and  modcod=24" )
    @Results(value = {
            @Result(javaType = Servidor.class),
            @Result(column = "C_USUID",property = "codigo"),
    })
    List<Servidor> Existe_histusu(@Param("email") String email);

    @Insert(value ="INSERT " +
            "INTO QPRODATAQUIPU.TB_HIST_USU_PERF VALUES " +
            "  ( " +
            "    hist_sec.nextval, " +
            "    NULL, " +
            "    1, " +
            "    sysdate, " +
            "    24, " +
            "    NULL, " +
            "    372, " +
            "    #{email} " +
            "  )")
    void insertUsuPerfil(@Param("email") String email);

    @Select(value = "select * from tb_nacionalidad")
    @Results(value = {
            @Result(javaType = Pais.class),
            @Result(column = "C_NACCOD",property = "codigo"),
            @Result(column = "T_NACNOM",property = "descripcion"),

    })
    public List<Pais> findAllCountries();

    @Select(value = "select c_ubi_id, t_ubi_des from QPDATAGESTION.TB_UBIGEO WHERE n_ubi_niv = 1 order by t_ubi_des asc")
    @Results(value = {
            @Result(javaType = Pais.class),
            @Result(column = "c_ubi_id",property = "codDepartamento"),
            @Result(column = "t_ubi_des",property = "descDepartamento"),

    })
    public List<Domicilio> findAllDepartments();

    @Select(value = "select n_ubi_id_niv2, t_ubi_des from QPDATAGESTION.TB_UBIGEO WHERE n_ubi_niv = 2 AND n_ubi_id_niv1=#{idDep} order by t_ubi_des asc")
    @Results(value = {
            @Result(javaType = Pais.class),
            @Result(column = "n_ubi_id_niv2",property = "codProvincia"),
            @Result(column = "t_ubi_des",property = "descProvincia"),

    })
    public List<Domicilio> findAllProvincies(@Param("idDep") Integer idDep);

    @Select(value = "select n_ubi_id_niv3, t_ubi_des from QPDATAGESTION.TB_UBIGEO WHERE n_ubi_niv = 3 and n_ubi_id_niv1=#{idDep} and n_ubi_id_niv2=#{idProv} order by t_ubi_des asc")
    @Results(value = {
            @Result(javaType = Pais.class),
            @Result(column = "n_ubi_id_niv3",property = "codDistrito"),
            @Result(column = "t_ubi_des",property = "descDistrito"),

    })
    public List<Domicilio> findAllDistricts(@Param("idDep") Integer idDep, @Param("idProv") Integer idProv);



    @Insert(value="INSERT INTO DATAPERSUEL.SERVIDOR (" +
            "ser_cod, ser_ape_pat, ser_ape_mat, ser_nom,ser_ecv_act,ser_tip_doc_id_act,ser_doc_id_act, ser_sexo," +
            "ser_fech_nac,SER_UBI_PAIS_NAC,SER_UBI_DEPT_NAC,SER_UBI_PROV_NAC,SER_UBI_DIST_NAC,SER_ESPF_LUGAR," +
            "SER_UBI_PAIS_DOM,SER_UBI_DEPT_DOM,SER_UBI_PROV_DOM,SER_UBI_DIST_DOM,SER_DOM,SER_NUM_HIJ," +
            "SER_EST_VIT_ACT,SER_DISCAP,SER_FECH_IN_UNMSM,SER_TELEF,SER_TELEF_CELL,SER_MAIL) " +
            "VALUES (#{ser.codigo}, #{ser.paterno},#{ser.materno}, #{ser.nombre},#{ser.estCiv},#{ser.tipoDoc},#{ser.numDoc},#{ser.sexo}" +
            ",to_date(#{ser.nacimiento},'dd/mm/yyyy'),#{ser.paisNac},#{ser.codNacdepart},#{ser.codNacprov},#{ser.codNacditr},#{ser.espfdom},#{ser.paisDomcilio}," +
            "#{ser.codDepartamento},#{ser.codProvincia},#{ser.codDistrito},#{ser.domicilio},#{ser.hij},#{ser.estVit}," +
            "#{ser.discapacidad},to_date(#{ser.fechaInUnmsm},'dd/mm/yyyy'),#{ser.telefono},#{ser.celular},#{ser.correo})")
    public void saveServidor(@Param("ser") Servidor servidor);

    @Update(value ="UPDATE DATAPERSUEL.SERVIDOR SET " +
            "SER_NOM=#{ser.nombre},  " +
            "SER_APE_PAT=#{ser.paterno},  " +
            "SER_APE_MAT=#{ser.materno},  " +
            "SER_FECH_NAC = TO_DATE(#{ser.nacimiento},'DD/MM/YY'), " +
            "SER_UBI_PAIS_NAC=#{ser.paisNac},  " +
            "SER_UBI_DEPT_NAC=#{ser.codNacdepart},  " +
            "SER_UBI_PROV_NAC=#{ser.codNacprov},  " +
            "SER_UBI_DIST_NAC=#{ser.codNacditr},  " +
            "SER_ESPF_LUGAR=#{ser.espfdom},  " +
            "SER_TELEF= #{ser.telefono}, " +
            "SER_TELEF_CELL= #{ser.celular}, " +
            "SER_SEXO= #{ser.sexo}, " +
            "SER_DOC_ID_ACT=#{ser.numDoc},  " +
            "SER_NUM_HIJ= #{ser.hij}, " +
            "SER_MAIL= #{ser.correo}, " +
            "SER_EST_VIT_ACT= #{ser.estVit}, " +
            "SER_DISCAP= #{ser.discapacidad}, " +
            "SER_TIP_DOC_ID_ACT= #{ser.tipoDoc}, " +
            "SER_FECH_IN_UNMSM=TO_DATE(#{ser.fechaInUnmsm},'DD/MM/YY'),  " +
            "SER_UBI_PAIS_DOM= #{ser.paisDomcilio}, " +
            "SER_UBI_DEPT_DOM= #{ser.codDepartamento}, " +
            "SER_UBI_PROV_DOM= #{ser.codProvincia}, " +
            "SER_UBI_DIST_DOM= #{ser.codDistrito}, " +
            "SER_DOM= #{ser.domicilio}, " +
            "SER_ECV_ACT=  #{ser.estCiv} " +
            "WHERE trim(SER_COD)=trim(#{ser.codigo})")
    void updateServidor(@Param("ser") Servidor servidor);



    @Select(value = "SELECT ser_cod      AS ser_cod, " +
            "  dni                AS dni,    "+
            "  ser_cod_ant        AS codAnt,"+
            "  abv_est            AS abrevEst,"+
            "  des_abr_tip_ser    AS abrevTip,"+
            "  ser_ape_pat        AS apePat, " +
            "  ser_ape_mat        AS apeMat, " +
            "  ser_nom            AS nom, "+
            "  DES_TIP_SER            AS cargo, "+
            "  des_dep_cesantes            AS cesantia, "+
            "  desc_est            AS estado, "+
            "num_serest             as  estadoActual "+
            "FROM DATAPERSUEL.LISTA_SERVIDOR ORDER BY SER_APE_PAT")
    @Results(value = {@Result(javaType = Servidor.class),
            @Result(property = "codigo", column = "ser_cod"),
            @Result(property = "numDoc", column = "dni"),
            @Result(property = "codAnt", column = "codAnt"),
            @Result(property = "abv_est", column = "abrevEst"),
            @Result(property = "abv_tip_ser", column = "abrevTip"),
            @Result(property = "paterno", column = "apePat"),
            @Result(property = "materno", column = "apeMat"),
            @Result(property = "nombre", column = "nom"),
            @Result(property = "tipoServicio", column = "cargo"),
            @Result(property = "cesantia", column = "cesantia"),
            @Result(property = "estado", column = "estado") ,
            @Result(property = "estadoTrabaActual", column = "estadoActual")

    })
    List<Servidor> todosServidores();

    @Select(value = "select * from tb_nacionalidad ORDER BY t_nacnom asc")
    @Results(value = {
            @Result(javaType = Pais.class),
            @Result(column = "C_NACCOD",property = "codigo"),
            @Result(column = "T_NACNOM",property = "descripcion"),

    })
    List<Pais> nacimientoPaises();

    @Insert(value="INSERT INTO QPDATAGESTION.TB_HIST_BANCO (" +
            "NUM_REG, SER_COD, NUM_SEREST, CTA_BANCO,TIPO_PAGO) " +
            "VALUES (1,#{ser.cod} ,(SELECT COUNT(ser_Cod) FROM Datapersuel.SERVIDOR_ESTADO  WHERE ser_cod=#{ser.cod}),#{ser.cueBan},#{ser.tipPag})")
    public void saveHistBanco(@Param("ser") ServidorLaboral servidor);

    @Insert(value="INSERT INTO QPDATAGESTION.TB_HIST_COND_ASEG (" +
            "NUM_REG, SER_COD, NUM_SEREST, NUM_RES,REG_PEN,NUM_SIS_PEN,ENT_ASEG,EST_AFP) " +
            "VALUES (1,#{ser.cod} ,(SELECT COUNT(ser_Cod) FROM Datapersuel.SERVIDOR_ESTADO  WHERE ser_cod=#{ser.cod})," +
            " '-',#{ser.regPen},#{ser.numPen},#{ser.entAse},#{ser.estAfp})")
    public void saveHistCondAseg(@Param("ser") ServidorLaboral servidor);

    @Insert(value="INSERT INTO QPDATAGESTION.TB_HIST_COND_LAB (" +
            "NUM_REG, SER_COD, NUM_SEREST, NUM_RES,COD_EST,COD_CATEG,COD_TIPO_SER,TTPO_GEN) " +
            "VALUES (1,#{ser.cod} ,(SELECT COUNT(ser_Cod) FROM Datapersuel.SERVIDOR_ESTADO  WHERE ser_cod=#{ser.cod})," +
            " '-',#{ser.estLab},#{ser.cat},#{ser.tip},#{ser.tipGen})")
    public void saveHistCondLab(@Param("ser") ServidorLaboral servidor);

    @Insert(value="INSERT INTO QPDATAGESTION.TB_HIST_COND_PLANI (" +
            "NUM_REG, SER_COD, NUM_SEREST, NUM_RES,COND_PLA) " +
            "VALUES (1,#{ser.cod} ,(SELECT COUNT(ser_Cod) FROM Datapersuel.SERVIDOR_ESTADO  WHERE ser_cod=#{ser.cod})," +
            " '-',#{ser.conPla})")
    public void saveHistCondPlani(@Param("ser") ServidorLaboral servidor);

    @Insert(value="INSERT INTO QPDATAGESTION.TB_HIST_DEP (" +
            "NUM_REG, SER_COD, NUM_SEREST, NUM_RES,DEP_CES,DEP_ACT) " +
            "VALUES (1,#{ser.cod} ,(SELECT COUNT(ser_Cod) FROM Datapersuel.SERVIDOR_ESTADO  WHERE ser_cod=#{ser.cod})," +
            " '-',(SELECT COD_DEP_CESANTES FROM DATAPERSUEL.DEPENDENCIA_CESANTES WHERE TRIM(COD_DEP_ACT)=TRIM(#{ser.dependencia})),#{ser.dependencia})")
    public void saveHistHistDep(@Param("ser") ServidorLaboral servidor);

}




