package edu.quipu.rrhh.persistence;


import edu.quipu.rrhh.models.EstadoCondicion;
import edu.quipu.rrhh.models.Servidor;
import edu.quipu.rrhh.models.Hist_servidor;
import org.apache.ibatis.annotations.*;
import org.springframework.dao.DataAccessException;

import java.util.List;

public interface EstadoCondicionMapper {

    @Select(value = "SELECT LIST_SERV.SER_COD AS ser_cod,LIST_SERV.SER_COD_ANT AS codAnt,LIST_SERV.SER_NOM AS nom,LIST_SERV.SER_APE_PAT AS apePat,LIST_SERV.SER_APE_MAT AS apeMat," +
            "LIST_SERV.DNI AS dni,AUX_SERV.NUM_SEREST AS estadoActual,GEN.DES_TIP_SER_GEN AS descGen ,TIPO_SERV.DES_TIP_SER AS cargo,SERV_LAB.NUM_RES AS numResol,\n" +
            "   SERV_CAT.DESC_CATEG AS categoria,EST.DESC_EST AS estado,DEP.UD_DSC AS dep,DEP_CES.DES_DEP_CESANTES AS depCesante,SERV_LAB.COD_TIPO_SER AS codEst,SERV_LAB.TTPO_GEN AS codGen," +
            "   SERV_LAB.COD_EST AS codEs,SERV_LAB.COD_CATEG AS codCateg,SERV_DEP.DEP_ACT AS codDep,SERV_DEP.DEP_CES codCes FROM \n" +
            "  (select SER_COD,NUM_SEREST,MAX(NUM_REG) AS NUM_REG from TB_HIST_COND_LAB GROUP BY SER_COD,NUM_SEREST) AUX_SERV\n" +
            "INNER JOIN LISTA_SERVIDOR LIST_SERV ON(AUX_SERV.SER_COD=LIST_SERV.SER_COD AND AUX_SERV.NUM_SEREST=LIST_SERV.NUM_SEREST) \n" +
            "INNER JOIN TB_HIST_COND_LAB SERV_LAB ON(AUX_SERV.NUM_REG=SERV_LAB.NUM_REG AND AUX_SERV.SER_COD=SERV_LAB.SER_COD AND AUX_SERV.NUM_SEREST=SERV_LAB.NUM_SEREST)\n" +
            "INNER JOIN TB_HIST_DEP SERV_DEP ON(SERV_DEP.NUM_REG=AUX_SERV.NUM_REG AND SERV_DEP.SER_COD=AUX_SERV.SER_COD AND SERV_DEP.NUM_SEREST=AUX_SERV.NUM_SEREST)\n" +
            "INNER JOIN DATAPERSUEL.TIP_SERVIDOR TIPO_SERV ON(TIPO_SERV.COD_TIP_SER=SERV_LAB.COD_TIPO_SER)\n" +
            "INNER JOIN DATAPERSUEL.CATEGORIA SERV_CAT ON(SERV_CAT.COD_CATEG=SERV_LAB.COD_CATEG)\n" +
            "INNER JOIN DATAPERSUEL.ESTADO EST ON(EST.COD_EST=SERV_LAB.COD_EST)\n" +
            "LEFT JOIN DATAPERSUEL.TIP_SERVIDOR_GEN GEN ON(GEN.COD_TIP_SER_GEN=SERV_LAB.TTPO_GEN)\n" +
            "LEFT  JOIN QPRODATAQUIPU.UNI_DEP DEP ON(DEP.UD_COD=SERV_DEP.DEP_ACT) "+
            "LEFT  JOIN DATAPERSUEL.DEPENDENCIA_CESANTES DEP_CES ON(DEP_CES.COD_DEP_CESANTES=SERV_DEP.DEP_CES) "+
            "ORDER BY LIST_SERV.SER_APE_PAT")
    @Results(value = {
            @Result(javaType = Hist_servidor.class),
            @Result(property = "codigo", column = "ser_cod"),
            @Result(property = "numDoc", column = "dni"),
            @Result(property = "codAnt", column = "codAnt"),
            @Result(property = "paterno", column = "apePat"),
            @Result(property = "materno", column = "apeMat"),
            @Result(property = "numResol", column = "numResol"),
            @Result(property = "descGen", column = "descGen"),
            @Result(property = "nombre", column = "nom"),
            @Result(property = "cesantia", column = "depCesante"),
            @Result(property = "dependencia", column = "dep"),
            @Result(property = "categoria", column = "categoria"),
            @Result(property = "tipoServicio", column = "cargo"),
            @Result(property = "estado", column = "estado") ,
            @Result(property = "codEst", column = "codEst") ,
            @Result(property = "codEs", column = "codEs") ,
            @Result(property = "codGen", column = "codGen") ,
            @Result(property = "codCateg", column = "codCateg") ,
            @Result(property = "estadoTrabaActual", column = "estadoActual"),
            @Result(property = "codDep", column = "codDep") ,
            @Result(property = "codCes", column = "codCes")
    })
    List<Hist_servidor> listarServidores();


     // Traemos datos para el combo box categoria
    @Select(value = "SELECT COD_CATEG AS codcat,DESC_CATEG AS descat FROM DATAPERSUEL.categoria")
    @Results(value = {
            @Result(javaType = EstadoCondicion.class),
            @Result(property = "codcat",column = "codcat"),
            @Result(property = "descat",column = "descat")
    })
    List<EstadoCondicion> categoria();

    //Traemos el listado segun el Descateg
    @Select(value = "SELECT ca.cod_categ AS cod," +
            "            ca.desc_categ     AS dscr " +
            "            FROM datapersuel.categoria ca, " +
            "            DATAPERSUEL.tip_servidor ti " +
            "            WHERE ca.cod_tip_ser=ti.cod_tip_ser " +
            "            AND ti.cod_tip_ser  =#{valor1} " +
            "            ORDER BY dscr")
    @Results(value = {
            @Result(javaType = EstadoCondicion.class),
            @Result(property = "codcat",column = "cod"),
            @Result(property = "descat",column = "dscr")
    })
    List<EstadoCondicion> categoriaprof(@Param("valor1") Integer valor1) throws DataAccessException;

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
    @Select(value = "SELECT NUM_REG AS numReg,NUM_RES AS numResol,EST.DESC_EST AS estado,GEN.DES_TIP_SER_GEN AS descGen,TIPO_SERV.DES_TIP_SER AS tipoServicio,SERV_CAT.DESC_CATEG  AS categoria" +
            "       FROM TB_HIST_COND_LAB HIST_LAB \n" +
            "        INNER JOIN DATAPERSUEL.ESTADO EST ON(EST.COD_EST=HIST_LAB.COD_EST)\n" +
            "        LEFT  JOIN DATAPERSUEL.TIP_SERVIDOR_GEN GEN ON(GEN.COD_TIP_SER_GEN=HIST_LAB.TTPO_GEN)\n" +
            "        INNER JOIN DATAPERSUEL.TIP_SERVIDOR TIPO_SERV ON(TIPO_SERV.COD_TIP_SER=HIST_LAB.COD_TIPO_SER)\n" +
            "        INNER JOIN DATAPERSUEL.CATEGORIA SERV_CAT ON(SERV_CAT.COD_CATEG=HIST_LAB.COD_CATEG)\n" +
            "        WHERE HIST_LAB.SER_COD=#{cod} AND HIST_LAB.NUM_SEREST=#{numest}\n" +
            "        ORDER BY NUM_REG DESC")

    @Results(value = {@Result(javaType = Hist_servidor.class),
            @Result(column ="numReg", property = "numReg"),
            @Result(column ="numResol", property = "numResol"),
            @Result(column ="estado", property = "estado"),
            @Result(column ="descGen", property = "descGen"),
            @Result(column ="categoria", property = "categoria"),
            @Result(column = "tipoServicio", property = "tipoServicio")
          }

    )
    List<Hist_servidor>  buscarcondlab(@Param("cod") String cod, @Param("numest") Integer numest) throws DataAccessException;

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
            " values ( (select MAX(NUM_REG) from  TB_HIST_COND_LAB where ser_cod=#{codigo} and num_serest=#{numserest} group by SER_COD,NUM_SEREST)+1,#{codigo},#{numserest},#{numres},#{codest},#{codcateg},#{codtip},#{codgen})")
     public void addHist_lab(@Param("codigo") String codigo, @Param("numserest") String numserest, @Param("numres") String numres, @Param("codest") Integer codest, @Param("codtip") Integer codtip, @Param("codgen") Integer codgen,@Param("codcateg") String codcateg) throws DataAccessException;

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


    @Insert(value = "insert into qpdatagestion.tb_hist_dep " +
            " values ( (select MAX(NUM_REG) from  qpdatagestion.tb_hist_dep where ser_cod=#{codigo} and num_serest=#{numserest} group by SER_COD,NUM_SEREST)+1,#{codigo},#{numserest},#{numresol},#{codDep},#{codCes})")
    void addHist_dep(@Param("codigo") String codigo,@Param("numserest") String estadoTrabaActual,@Param("numresol") String numResol,@Param("codDep") String codDep,@Param("codCes")  String codCes);
}
