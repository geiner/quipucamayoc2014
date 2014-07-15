package edu.quipu.rrhh.persistence;


import edu.quipu.rrhh.models.EstadoCondicion;
import edu.quipu.rrhh.models.Servidor;
import org.apache.ibatis.annotations.*;
import org.springframework.dao.DataAccessException;

import java.util.List;

public interface EstadoCondicionMapper {

    @Select(value = "SELECT ser_cod      AS ser_cod, " +
            "  dni                AS dni,    "+
            "  ser_cod_ant        AS codAnt,"+
            "  ser_ape_pat        AS apePat, " +
            "  ser_ape_mat        AS apeMat, " +
            "  ser_nom            AS nom, "+
            "  DESC_CATEG         AS categoria,"+
            "  DES_TIP_SER            AS cargo, "+
            "  des_dep_cesantes            AS cesantia, "+
            "  list_serv.desc_est            AS estado, "+
            "  num_serest             as  estadoActual, "+
            "  est_serv.COD_EST AS codEst "+
            "  FROM DATAPERSUEL.LISTA_SERVIDOR list_serv INNER JOIN DATAPERSUEL.ESTADO est_serv "+
            "  ON(list_serv.desc_est=est_serv.DESC_EST)  ORDER BY SER_APE_PAT")
    @Results(value = {
            @Result(javaType = Servidor.class),
            @Result(property = "codigo", column = "ser_cod"),
            @Result(property = "numDoc", column = "dni"),
            @Result(property = "codAnt", column = "codAnt"),
            @Result(property = "paterno", column = "apePat"),
            @Result(property = "materno", column = "apeMat"),
            @Result(property = "nombre", column = "nom"),
            @Result(property = "categoria", column = "categoria"),
            @Result(property = "tipoServicio", column = "cargo"),
            @Result(property = "cesantia", column = "cesantia"),
            @Result(property = "estado", column = "estado") ,
            @Result(property = "codEst", column = "codEst") ,
            @Result(property = "estadoTrabaActual", column = "estadoActual")
    })
    List<Servidor> listarServidores();


     // Traemos datos para el combo box categoria
    @Select(value = "SELECT COD_CATEG AS codcat,DESC_CATEG AS descat FROM DATAPERSUEL.categoria")
    @Results(value = {
            @Result(javaType = EstadoCondicion.class),
            @Result(property = "codcat",column = "codcat"),
            @Result(property = "descat",column = "descat")
    })
    List<EstadoCondicion> categoria();

    //Traemos el listado segun el Descateg
    @Select(value = "SELECT COD_CATEG AS codcat ,DESC_CATEG AS descat FROM DATAPERSUEL.categoria where cod_tip_ser=#{valor1} and cod_sub_tip=#{valor2} ORDER BY descat ASC")
    @Results(value = {
            @Result(javaType = EstadoCondicion.class),
            @Result(property = "codcat",column = "codcat"),
            @Result(property = "descat",column = "descat")
    })
    List<EstadoCondicion> categoriaprof(@Param("valor1") Integer valor1, @Param("valor2") Integer valor2) throws DataAccessException;

    // Traemos datos para el combo box estado
    @Select(value = "SELECT COD_EST AS codest, DESC_EST AS desest FROM DATAPERSUEL.estado ORDER BY desest ASC")
    @Results(value = {
            @Result(javaType = EstadoCondicion.class),
            @Result(property = "codest",column = "codest"),
            @Result(property = "desest",column = "desest")
    })
    List<EstadoCondicion> estado();

    // Traemos datos para el combo box tipo
    @Select(value = "select COD_TIP_SER as codtip, DES_TIP_SER as destip from DATAPERSUEL.TIP_SERVIDOR")
    @Results(value = {
            @Result(javaType = EstadoCondicion.class),
            @Result(property = "codtip",column = "codtip"),
            @Result(property = "destip",column = "destip")
    })
    List<EstadoCondicion> tipo();

    /* Traemos datos para el combo box dependencias
    @Select(value = "select u.UD_COD as coddep,u.UD_DSC as desdep, d.COD_DEP_CESANTES as coddepces " +
            "  from qprodataquipu.uni_dep u " +
            "  left join datapersuel.dependencia_cesantes d " +
            "  on u.UD_COD=d.COD_DEP_ACT")
    @Results(value = {
            @Result(javaType = EstadoCondicion.class),
            @Result(property = "coddep",column = "coddep"),
            @Result(property = "desdep",column = "desdep"),
            @Result(property = "coddepces",column = "coddepces")
    })
    List<EstadoCondicion> dependencia();
   */
    // Traemos datos para el combo box regimen pensionario
    @Select(value = "select COD_REG_PEN as codreg, DESC_REG_PEN as desreg from datapersuel.reg_pension  where COD_REG_PEN not in (1,2) ORDER BY desreg ASC" )
    @Results(value = {
            @Result(javaType = EstadoCondicion.class),
            @Result(property = "codreg",column = "codreg"),
            @Result(property = "desreg",column = "desreg")

    })
    List<EstadoCondicion> regimen();

    // Traemos datos para el combo box entidad aseguradora
    @Select(value = "select ENT_ASEG_COD as codent, DES_ENT_ASEG as desent from datapersuel.entidad_aseguradora where ENT_ASEG_COD not in (0,1) ORDER BY desent ASC")
    @Results(value = {
            @Result(javaType = EstadoCondicion.class),
            @Result(property = "codent",column = "codent"),
            @Result(property = "desent",column = "desent")

    })
    List<EstadoCondicion> entidad();

    // Traemos datos para el combo box estado afp
    @Select(value = "select COD_EST_AFP as codestafp, DES_EST_AFP as desestafp from datapersuel.estados_afp ORDER BY desestafp ASC")
    @Results(value = {
            @Result(javaType = EstadoCondicion.class),
            @Result(property = "codestafp",column = "codestafp"),
            @Result(property = "desestafp",column = "desestafp")

    })
    List<EstadoCondicion> estadoafp();

    //Traemos datos para el combo box tipo de pago
    @Select(value = "select  tipo_pag_ser.cod_tip_pag_ser as codtippago, des_tip_pag_ser as destippago from DATAPERSUEL.tipo_pag_ser ")
    @Results(value = {
            @Result(javaType = EstadoCondicion.class),
            @Result(property = "codtippago", column = "codtippago"),
            @Result(property = "destippago", column = "destippago")
    })
    List<EstadoCondicion> tipopago();

    //Traemos datos para el combo box condicion planilla
    @Select(value= "select COD_CON_PLA as codcond, DES_CON_PLA as descond from datapersuel.cond_ser_plan Order BY descond ASC")
    @Results(value = {
            @Result(javaType = EstadoCondicion.class),
            @Result(property = "codcond", column = "codcond"),
            @Result(property = "descond", column = "descond")
    })
    List<EstadoCondicion> condpla();

    //traer las resoluciones
    @Select(value = "SELECT RESTRANUM                  AS rESID, " +
            "  TO_CHAR(RESTRAFEC,'DD/MM/YYYY') AS fECHA , " +
            "  RESTRADES1                      AS dESCR, " +
            "  re.tiprescod                    AS tIPCOD, " +
            "  tipo.tipresdes                  AS tIPDESC, " +
            "  re.TIPRESMOTCOD                 AS mOTCOD, " +
            "  mo.TIPRESMOTDES                 AS mOTDESC " +
            "FROM DATAPERLIQU.tb_trabajador_resolucion_id tr , " +
            "  DATAPERLIQU.resolucion_id re, " +
            "  DATAPERLIQU.tipores_motivo mo , " +
            "  DATAPERLIQU.tipo_resolucion tipo " +
            "WHERE tr.dni         =#{codigo} " +
            "AND tr.num_ser_estado=#{numserest} " +
            "AND re.restranum     =tr.cod_resol " +
            "AND re.tipresmotcod  =mo.tipresmotcod " +
            "AND re.tiprescod     =tipo.tiprescod")
    @Results(value = {@Result(javaType = EstadoCondicion.class),

            @Result(column = "rESID", property = "rESID"),
            @Result(column = "fECHA", property = "fECHA"),
            @Result(column = "dESCR", property = "dESCR"),
            @Result(column = "tIPCOD", property = "tIPCOD"),
            @Result(column = "tIPDESC", property = "tIPDESC"),
            @Result(column = "mOTCOD", property = "mOTCOD"),
            @Result(column = "mOTDESC", property = "mOTDESC")
    }
  )
    List<EstadoCondicion> listar_resolucion(@Param("codigo") String Codigo, @Param("numserest") Integer numserest) throws DataAccessException;

    // Traemos datos para la tabla condicion laboral
    @Select(value = "select b.NUM_REG as numreg1, b.NUM_RES as numres1, e.desc_est as est , f.desc_categ as categ, h.des_tip_ser as tip from qpdatagestion.TB_HIST_COND_LAB b, datapersuel.estado e, datapersuel.categoria f, datapersuel.tip_servidor h where b.ser_cod=#{cod} and b.NUM_SEREST=#{numest} and e.cod_est=b.cod_est and f.cod_categ=b.cod_categ  and h.cod_tip_ser=b.cod_tipo_ser ORDER BY numreg1 DESC")

    @Results(value = {@Result(javaType = EstadoCondicion.class),
            @Result(column ="numreg1", property = "numreg1"),
            @Result(column ="numres1", property = "numres1"),
            @Result(column ="est", property = "est"),
            @Result(column ="categ", property = "categ"),
            @Result(column = "tip", property = "tip")
          }

    )
    List<EstadoCondicion>  buscarcondlab(@Param("cod") String cod, @Param("numest") Integer numest) throws DataAccessException;

    // Traemos datos para la tabla condicion asegurado
    @Select(value = "select b.num_reg as numreg1, b.num_res as numres1, d.DESC_REG_PEN as regpen, b.num_sis_pen as numsispen, e.DES_ENT_ASEG as entaseg, f.DES_EST_AFP as estafp from qpdatagestion.tb_hist_cond_aseg b,datapersuel.reg_pension d, datapersuel.entidad_aseguradora e, datapersuel.estados_afp f " +
            " where b.ser_cod= #{cod}and b.num_serest=#{numest} and b.reg_pen=d.COD_REG_PEN and b.ent_aseg=e.ENT_ASEG_COD and b.est_afp=f.COD_EST_AFP ORDER BY numreg1 DESC  ")

    @Results(value = {@Result(javaType = EstadoCondicion.class),
            @Result(column ="numreg1", property = "numreg1"),
            @Result(column ="numres1", property = "numres1"),
            @Result(column ="regpen", property = "regpen"),
            @Result(column = "numsispen", property = "numsispen"),
            @Result(column = "entaseg", property = "entaseg"),
            @Result(column = "estafp", property = "estafp")
    }

    )
    List<EstadoCondicion>  buscarcondaseg(@Param("cod") String cod, @Param("numest") Integer numest) throws DataAccessException;

    //Traemos la tabla de dependencias
    @Select(value = "select b.num_reg as numreg1, b.num_res as numres1, d.UD_DSC as nomdepact, e.DES_DEP_CESANTES as nomdepces from  qpdatagestion.tb_hist_dep b left join QPRODATAQUIPU.uni_dep d on d.UD_COD=b.DEP_ACT left join DATAPERSUEL.dependencia_cesantes e on e.COD_DEP_CESANTES=b.DEP_CES " +
            " where b.ser_cod=#{cod} and b.num_serest=#{numest} ORDER BY numreg1 DESC")

    @Results(value = {@Result(javaType = EstadoCondicion.class),
            @Result(column ="numreg1", property = "numreg1"),
            @Result(column ="numres1", property = "numres1"),
            @Result(column ="nomdepact", property = "nomdepact"),
            @Result(column = "nomdepces", property = "nomdepces")
    }
    )
    List<EstadoCondicion>  buscardep(@Param("cod") String cod, @Param("numest") Integer numest) throws DataAccessException;

    //Traemos datos para la tabla hist banco
    @Select(value = "select b.num_reg as numreg1, b.cta_banco as ctabanco, d.des_tip_pag_ser as destippago from qpdatagestion.tb_hist_banco b, DATAPERSUEL.tipo_pag_ser d " +
            " where b.ser_cod=#{cod} and b.num_serest=#{numest} and b.tipo_pago=d.cod_tip_pag_ser ORDER BY numreg1 DESC")

    @Results(value = {@Result(javaType = EstadoCondicion.class),
            @Result(column = "numreg1", property = "numreg1"),
            @Result(column = "ctabanco", property = "ctabanco"),
            @Result(column = "destippago", property = "destippago")

    }

    )
    List<EstadoCondicion> buscarbanco(@Param("cod") String cod, @Param("numest") Integer numest) throws DataAccessException;

    //Traemos datos para la tabla condicion planilla
    @Select(value = "select b.num_reg as numreg1, b.num_res as numres1, d.DES_CON_PLA as descondpla, b.FECHA_CESE fechcese, b.OBS_PLAN_PERM as obser  from qpdatagestion.tb_hist_cond_plani b inner join datapersuel.cond_ser_plan d on b.COND_PLA=d.COD_CON_PLA where b.ser_cod=#{cod} and b.num_serest=#{numest} ORDER BY numreg1 DESC")
    @Results(value = {@Result(javaType = EstadoCondicion.class),
            @Result(column = "numreg1", property = "numreg1"),
            @Result(column = "numres1", property = "numres1"),
            @Result(column = "descondpla", property = "descondpla"),
            @Result(column = "fechcese", property = "fechcese"),
            @Result(column = "obser", property = "obser")
    }
    )
    List<EstadoCondicion> buscarcondpla(@Param("cod") String cod, @Param("numest") Integer numest) throws DataAccessException;

     //Insertar modificacion en la tabla tb_hist_cond_lab
    @Insert(value = "insert into qpdatagestion.tb_hist_cond_lab " +
            " values (Num_reg.nextval,#{codigo},#{numserest},#{numres1},#{codest},#{codcat},#{codtip})")
     public void addcondlab(@Param("codigo") String codigo, @Param("numserest") Integer numserest, @Param("numres1") String numres1, @Param("codest") Integer codest, @Param("codcat") String codcat, @Param("codtip") Integer codtip) throws DataAccessException;

    //insertar en alerta pendiente
     @Insert(value= "insert into qpdatagestion.tb_alerta_pendiente values (Num_alert_reg.nextval, #{codigo},#{numserest},#{tipalert},#{email}, (select sysdate from sys.dual))")
     public void addalertpend(@Param("codigo") String codigo, @Param("numserest") Integer numserest, @Param("tipalert") Integer tipalert, @Param("email") String email);

    //Insertar modificacion en la tabla condicion del asegurado
     @Insert(value = "insert into qpdatagestion.tb_hist_cond_aseg values ((select max(num_reg)+1 from qpdatagestion.tb_hist_cond_aseg where ser_cod=#{codigo} and num_serest=#{numserest}), #{codigo}, #{numserest}, #{numres1}, #{regpensionario}, #{numsispen}, #{entasegurado}, #{estadoafp})")
     public void addconaseg(@Param("codigo") String codigo, @Param("numserest") Integer numserest, @Param("numres1") String numres1, @Param("regpensionario") Integer regpensionario, @Param("numsispen") String numsispen, @Param("entasegurado") Integer entasegurado, @Param("estadoafp") Integer estadoafp) throws DataAccessException;

    //Insertar modificacion en la tabla de dependencias
    @Insert(value ="insert into qpdatagestion.tb_hist_dep values((select max(num_reg)+1 from qpdatagestion.tb_hist_dep where ser_cod=#{codigo} and num_serest=#{numserest}),#{codigo},#{numserest},#{numres1},#{udcod},(select COD_DEP_CESANTES from datapersuel.dependencia_cesantes where COD_DEP_ACT=#{udcod}))")
    public void adddep(@Param("codigo") String codigo, @Param("numserest") Integer numserest, @Param("numres1") String numres1, @Param("udcod") String udcod) throws DataAccessException;

    //Insertar modificacion en la tabla tb_hist_banco
    @Insert(value = "insert into qpdatagestion.tb_hist_banco values((select max(num_reg)+1 from qpdatagestion.tb_hist_banco where ser_cod=#{codigo} and num_serest=#{numserest}), #{codigo}, #{numserest}, #{ctabanco}, #{codtippago})")
    public void addpagobanco(@Param("codigo") String codigo, @Param("numserest") Integer numserest, @Param("ctabanco") String ctabanco, @Param("codtippago") Integer codtippago) throws DataAccessException;

    //Insertar modificacion en la tabla tb_hist_cond_plani
    @Insert(value = "insert into qpdatagestion.tb_hist_cond_plani values((select max(num_reg)+1 from qpdatagestion.tb_hist_cond_plani where ser_cod=#{codigo} and num_serest=#{numserest}),#{codigo},#{numserest},#{numres1},#{codcond},#{fechcese},#{obser})")
    public void addcondpla(@Param("codigo") String codigo, @Param("numserest") Integer numserest, @Param("numres1") String numres1, @Param("codcond") Integer codcond, @Param("fechcese") String fechcese, @Param("obser") String obser) throws DataAccessException;

}
