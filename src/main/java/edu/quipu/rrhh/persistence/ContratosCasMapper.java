package edu.quipu.rrhh.persistence;


import edu.quipu.rrhh.models.CargoCAS;
import edu.quipu.rrhh.models.PlazaCAS;
import edu.quipu.rrhh.models.Servidor;
import org.apache.ibatis.annotations.*;
import org.springframework.dao.DataAccessException;

import java.util.List;

public interface ContratosCasMapper {

    /*Para listar los servidores CAS */
    @Select(value = "SELECT L.ser_cod      AS ser_cod,  " +
            "              L.dni                AS dni,              " +
            "              L.ser_ape_pat        AS apePat, " +
            "              L.ser_ape_mat        AS apeMat, " +
            "              L.ser_nom            AS nom, " +
            "              L.ser_tip_act         AS tipo,  " +
            "              L.DES_TIP_SER            AS descTipo,              " +
            "            L.num_serest             AS  numserest, " +
            "            L.ser_cod_dep_ces       AS depCes,  " +
            "            NVL(D.ud_id,0)                  AS udid, " +
            "            U.UD_DSC                AS DescDep " +
            "            FROM DATAPERSUEL.LISTA_SERVIDOR L LEFT JOIN DATAPERSUEL.DEPENDENCIA_CESANTES D ON L.ser_cod_dep_ces= D.cod_dep_CESANTES  LEFT JOIN QPRODATAQUIPU.UNI_DEP U ON D.ud_id=U.UD_ID " +
            "            where  L.SER_EST_ACT=7 AND L.SER_CON_PLA_ACT=1 " +
            "            ORDER BY apePat ASC, apeMat ASC, nom ASC")
    @Results(value = {
            @Result(javaType = Servidor.class),
            @Result(property = "codigo", column = "ser_cod"),
            @Result(property = "numDoc", column = "dni"),
            @Result(property = "paterno", column = "apePat"),
            @Result(property = "materno", column = "apeMat"),
            @Result(property = "nombre", column = "nom"),
            @Result(property = "tipo", column = "tipo"),
            @Result(property = "tiposervidor", column = "descTipo"),
            @Result(property = "num_serest", column = "numserest"),
            @Result(property = "depCes", column = "depCes") ,
            @Result(property = "udid", column = "udid") ,
            @Result(property = "dependencia", column = "DescDep")
    })
    List<Servidor> listarServidoresCas();


    /*Para listar los cargos*/
    @Select(value = "SELECT c_cargo_id as codCargo, t_cargo_descripcion as descCargo FROM QPDATAGESTION.TB_CARGOS order by t_cargo_descripcion")
    @Results(value = {
            @Result(javaType = CargoCAS.class),
            @Result(property = "id", column = "codCargo"),
            @Result(property = "dsc", column = "descCargo"),

    })
    List<CargoCAS> listarCargos();

    /*Para listar las plazas */
    @Select(value = "SELECT  P.T_PLAZA_CODIGO COD_PLAZA, p.c_plaza_id as id_plaza,P.N_PLAZA_ESTADO ESTADO_PLAZA, se.ser_cod as DNI ,se.ser_num_ruc as ruc, " +
            "        se.ser_ape_pat||' '||se.ser_ape_mat ||' '||se.ser_nom as fullname, ca.t_contrato_numero as numcontrato, " +
            "        cr.t_cargo_descripcion as cargo, to_char( (ca.f_contratoadenda_fecha_ini),'DD/MM/YYYY') as fechini, to_char((ca.f_contratoadenda_fecha_fin),'DD/MM/YYYY') as fechfin, " +
            "        ca.n_monto AS monto, ca.t_contratoadenda_tipo as tipo,CA.t_contratoadenda_estado ESTADO_CONTRATO, to_char( (CA.F_CONTRATOADENDA_FIN_LABORAL),'DD/MM/YYYY') FECHFIN_LABORAL  " +
            "FROM    qpdatagestion.tb_plazas p  left join qpdatagestion.tb_plazas_historial ph  on p.c_plaza_id = ph.c_plaza_id " +
            "        left join qpdatagestion.tb_contratos_adendas ca on ph.c_contratoadenda_id = ca.c_contratoadenda_id " +
            "        left join qpdatagestion.tb_cargos cr  on cr.c_cargo_id = ca.c_cargo_id " +
            "        left join datapersuel.servidor se  on ca.ser_cod = se.ser_cod " +
            "WHERE   p.n_id_dep = (select dep.UD_ID from uni_dep dep where dep.UD_ID =#{udid} AND DEP.UD_FEC_CAD IS NULL ) " +
            "        AND P.N_PLAZA_ESTADO = 'VACANTE'  " +
            "        and ca.t_adenda_numero is null " +
            "        AND (ca.f_contratoadenda_fecha_ini = " +
            "        (SELECT  MAX(ca.f_contratoadenda_fecha_ini)   " +
            "        FROM    qpdatagestion.tb_plazas p1  left join qpdatagestion.tb_plazas_historial ph  on p1.c_plaza_id = ph.c_plaza_id " +
            "                left join qpdatagestion.tb_contratos_adendas ca on ph.c_contratoadenda_id = ca.c_contratoadenda_id  " +
            "                left join qpdatagestion.tb_cargos cr  on cr.c_cargo_id = ca.c_cargo_id " +
            "                left join datapersuel.servidor se  on ca.ser_cod = se.ser_cod " +
            "        WHERE   p.n_id_dep = (select dep.UD_ID from uni_dep dep where dep.UD_ID =#{udid} AND DEP.UD_FEC_CAD IS NULL ) " +
            "                AND P.N_PLAZA_ESTADO = 'VACANTE'  " +
            "                and ca.t_adenda_numero is null " +
            "                AND p1.c_plaza_id = p.c_plaza_id " +
            "        ) or ca.f_contratoadenda_fecha_ini is null ) " +
            "ORDER BY p.c_plaza_id")
    @Results(value = {
            @Result(javaType = PlazaCAS.class),
            @Result(property = "cod", column = "COD_PLAZA"),
            @Result(property = "id", column = "id_plaza"),
            @Result(property = "estado", column = "ESTADO_PLAZA"),
            @Result(property = "dniServ", column = "DNI"),
            @Result(property = "rucServ", column = "ruc"),
            @Result(property = "nomServ", column = "fullname"),
            @Result(property = "contrato", column = "numcontrato"),
            @Result(property = "cargoServ", column = "cargo"),
            @Result(property = "fechaIni", column = "fechini") ,
            @Result(property = "fechaFin", column = "fechfin") ,
            @Result(property = "montoServ", column = "monto"),
            @Result(property = "tipoServ", column = "tipo") ,
            @Result(property = "estadoCont", column = "ESTADO_CONTRATO"),
            @Result(property = "fechaFinLab", column = "FECHFIN_LABORAL")
    })
    List<PlazaCAS> listarPlazas(@Param("udid") Integer udid) throws DataAccessException;




    //update de la plaza a estado ocupado en tb_Plazas de Qpdatagestion
    @Update(value = " update qpdatagestion.tb_plazas  " +
            " set n_plaza_estado='OCUPADO' " +
            " where trim(c_plaza_id) = trim(#{id})")

    public void updatePlazas(@Param("id") Integer id) throws DataAccessException;



    //insert en la tabla tb_contrato_adendas
    @Insert(value = "insert into qpdatagestion.tb_contratos_adendas ( c_contratoadenda_id, t_contrato_numero,  " +
            "  f_contratoadenda_fecha_ini, f_contratoadenda_fecha_fin, t_contratoadenda_estado,  " +
            "  n_contratoadenda_horas, t_contratoadenda_tipo, n_ud_id,c_cargo_id, ser_cod ,n_monto, num_serest )  " +
            "  values( (select max(c_contratoadenda_id)+1 from qpdatagestion.tb_contratos_adendas),  #{pla.contrato},  " +
            "  #{pla.fechaIni} , #{pla.fechaFin} , 'ACTIVO' ,  " +
            "  #{pla.horas} , #{pla.tipoServ} , #{pla.udId} , #{pla.idCargo}, #{pla.dniServ} , #{pla.montoServ} , #{pla.num_serest} ) ")

    void insertContAden(@Param("pla") PlazaCAS plazaCAS) ;




    //Insertar en la tabla tb_plaza_historial
    @Insert(value = "insert into qpdatagestion.tb_plazas_historial " +
            " values((select max(c_plaza_historial_id) +1 from qpdatagestion.tb_plazas_historial), #{id},(select max(c_contratoadenda_id) from qpdatagestion.tb_contratos_adendas) )")
    public void insertPlazasHistorial(@Param("id") Integer id) throws DataAccessException;



    //para ver si existe registro en servidor item fijo

    @Select(value ="select itp_monto monto1 from datapersuel.servidor_item_fijo " +
            "where itp_cod='I094' and trim(ser_cod)=trim(#{ser.codigo}) and num_serest=#{ser.num_serest} " )
    @Results(value = {@Result(javaType = Servidor.class),

            @Result(property = "monto1", column = "monto1")
    })
    List<Servidor> verItem(@Param("ser") Servidor servidor);


    //  para update en servidor item
    @Update(value = " update datapersuel.servidor_item_fijo  " +
            "     set itp_monto= #{ser.monto1} " +
            "     where trim(ser_cod)=trim(#{ser.codigo}) and num_serest=#{ser.num_serest} ")

    void updateServidorItem(@Param("ser") Servidor servidor) ;


    //  para insert en servidor item
    @Insert(value = "  insert into datapersuel.servidor_item_fijo " +
            "     values ( #{ser.codigo} , #{ser.num_serest} , 'I094' , #{ser.monto1} , 1 ) ")

    void insertServidorItem(@Param("ser") Servidor servidor) ;



}
