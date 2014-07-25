package edu.quipu.rrhh.persistence;


import edu.quipu.rrhh.models.Contrato;
import edu.quipu.rrhh.models.EstadoCondicion;
import edu.quipu.rrhh.models.Servidor;
import edu.quipu.rrhh.models.Hist_servidor;
import org.apache.ibatis.annotations.*;
import org.springframework.dao.DataAccessException;

import java.util.List;

public interface EstadoCondicionMapper {

    @Select(value = "    SELECT    LIST_SERV.SER_COD AS ser_cod,LIST_SERV.SER_COD_ANT AS codAnt,LIST_SERV.SER_NOM AS nom,LIST_SERV.SER_APE_PAT AS apePat,LIST_SERV.SER_APE_MAT AS apeMat,\n" +
            "            LIST_SERV.DNI AS dni,AUX_SERV.NUM_SEREST AS estadoActual,GEN.DES_TIP_SER_GEN AS descGen,TIPO_SERV.DES_TIP_SER AS cargo,SERV_LAB.NUM_RES AS numResol,\n" +
            "            SERV_CAT.DESC_CATEG AS categoria,EST.DESC_EST AS estado,UNI_DEPEN.UD_DSC AS dep,DEP_CES.DES_DEP_CESANTES AS depCesante,SERV_LAB.COD_TIPO_SER AS codEst,SERV_LAB.TTPO_GEN AS codGen,\n" +
            "            SERV_LAB.COD_EST AS codEs,SERV_LAB.COD_CATEG AS codCateg,HIST_DEPEN.DEP_ACT AS codDep,HIST_DEPEN.DEP_CES codCes,COND_PLAN.DES_CON_PLA AS condPla,REG_PENSION.DESC_REG_PEN AS regPen,\n" +
            "            ENT_ASEG.DES_ENT_ASEG AS entAseg,ESTA_AFP.DES_EST_AFP AS estAFP,HIST_ASEG.NUM_SIS_PEN AS numPensiones \n" +
            "            FROM (select SER_COD,NUM_SEREST,MAX(NUM_REG) AS NUM_REG from TB_HIST_COND_LAB GROUP BY SER_COD,NUM_SEREST) AUX_SERV         \n" +
            "            INNER JOIN LISTA_SERVIDOR LIST_SERV ON(AUX_SERV.SER_COD=LIST_SERV.SER_COD AND AUX_SERV.NUM_SEREST=LIST_SERV.NUM_SEREST)\n" +
            "            INNER JOIN TB_HIST_COND_LAB SERV_LAB ON(AUX_SERV.NUM_REG=SERV_LAB.NUM_REG AND AUX_SERV.SER_COD=SERV_LAB.SER_COD AND AUX_SERV.NUM_SEREST=SERV_LAB.NUM_SEREST)\n" +
            "            LEFT JOIN DATAPERSUEL.TIP_SERVIDOR_GEN GEN ON(GEN.COD_TIP_SER_GEN=SERV_LAB.TTPO_GEN)\n" +
            "            LEFT JOIN DATAPERSUEL.TIP_SERVIDOR TIPO_SERV ON(TIPO_SERV.COD_TIP_SER=SERV_LAB.COD_TIPO_SER)\n" +
            "            LEFT JOIN DATAPERSUEL.CATEGORIA SERV_CAT ON(SERV_CAT.COD_CATEG=SERV_LAB.COD_CATEG)\n" +
            "            LEFT JOIN DATAPERSUEL.ESTADO EST ON(EST.COD_EST=SERV_LAB.COD_EST)\n" +
            "            INNER JOIN (SELECT DEP.SER_COD,DEP.NUM_SEREST,DEP.NUM_REG,DEP.NUM_RES,DEP.DEP_ACT,DEP.DEP_CES FROM (select SER_COD,NUM_SEREST,MAX(NUM_REG) AS NUM_REG from TB_HIST_DEP  GROUP BY SER_COD,NUM_SEREST) AUX_DEP\n" +
            "            INNER JOIN TB_HIST_DEP DEP ON(AUX_DEP.NUM_REG=DEP.NUM_REG AND AUX_DEP.SER_COD=DEP.SER_COD AND AUX_DEP.NUM_SEREST=DEP.NUM_SEREST)) HIST_DEPEN \n" +
            "            ON ( HIST_DEPEN.SER_COD=AUX_SERV.SER_COD AND HIST_DEPEN.NUM_SEREST=AUX_SERV.NUM_SEREST)\n" +
            "            LEFT  JOIN QPRODATAQUIPU.UNI_DEP UNI_DEPEN ON(TRIM(UNI_DEPEN.UD_COD)=TRIM(HIST_DEPEN.DEP_ACT)) \n" +
            "            LEFT  JOIN DATAPERSUEL.DEPENDENCIA_CESANTES DEP_CES ON(TRIM(DEP_CES.COD_DEP_CESANTES)=TRIM(HIST_DEPEN.DEP_CES))\n" +
            "            INNER JOIN (SELECT PLANI.SER_COD,PLANI.NUM_SEREST,PLANI.NUM_REG,PLANI.COND_PLA FROM (select SER_COD,NUM_SEREST,MAX(NUM_REG) AS NUM_REG from TB_HIST_COND_PLANI  GROUP BY SER_COD,NUM_SEREST) AUX_PLANI \n"+
            "            INNER JOIN TB_HIST_COND_PLANI PLANI ON(AUX_PLANI.NUM_REG=PLANI.NUM_REG AND AUX_PLANI.SER_COD=PLANI.SER_COD AND AUX_PLANI.NUM_SEREST=PLANI.NUM_SEREST)) HIST_PLANI \n"+
            "            ON (HIST_PLANI.SER_COD=AUX_SERV.SER_COD AND HIST_PLANI.NUM_SEREST=AUX_SERV.NUM_SEREST) \n"+
            "            INNER JOIN COND_SER_PLAN COND_PLAN ON(COND_PLAN.COD_CON_PLA=HIST_PLANI.COND_PLA) \n" +
            "            INNER JOIN (SELECT ASEG.SER_COD,ASEG.NUM_SEREST,ASEG.NUM_REG,ASEG.REG_PEN,ASEG.NUM_SIS_PEN,ASEG.ENT_ASEG,ASEG.EST_AFP\n" +
            "            FROM (select SER_COD,NUM_SEREST,MAX(NUM_REG) AS NUM_REG from TB_HIST_COND_ASEG  GROUP BY SER_COD,NUM_SEREST) AUX_ASEG\n" +
            "            INNER JOIN TB_HIST_COND_ASEG ASEG ON(AUX_ASEG.NUM_REG=ASEG.NUM_REG AND AUX_ASEG.SER_COD=ASEG.SER_COD AND AUX_ASEG.NUM_SEREST=ASEG.NUM_SEREST)) HIST_ASEG\n" +
            "            ON (HIST_ASEG.SER_COD=AUX_SERV.SER_COD AND HIST_ASEG.NUM_SEREST=AUX_SERV.NUM_SEREST)\n" +
            "            LEFT JOIN REG_PENSION ON(HIST_ASEG.REG_PEN=REG_PENSION.COD_REG_PEN)\n" +
            "            LEFT JOIN ENTIDAD_ASEGURADORA ENT_ASEG ON(HIST_ASEG.ENT_ASEG=ENT_ASEG.ENT_ASEG_COD)\n" +
            "            LEFT JOIN ESTADOS_AFP ESTA_AFP ON(HIST_ASEG.EST_AFP=ESTA_AFP.COD_EST_AFP)"+
            "            ORDER BY LIST_SERV.SER_APE_PAT")
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
            @Result(property = "codCes", column = "codCes"),
            @Result(property = "condPla", column = "condPla"),
            @Result(property = "regPen", column = "regPen"),
            @Result(property = "entAseg", column = "entAseg"),
            @Result(property = "estAFP", column = "estAFP"),
            @Result(property = "numPensiones", column = "numPensiones")
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
    @Select(value = "select ENT_ASEG_COD as codent, DES_ENT_ASEG as desent from datapersuel.entidad_aseguradora where COD_REG_PEN=#{regPen}  ORDER BY desent ASC")
    @Results(value = {
            @Result(javaType = EstadoCondicion.class),
            @Result(property = "codent",column = "codent"),
            @Result(property = "desent",column = "desent")

    })
    List<EstadoCondicion> entidad(@Param("regPen") Integer regPen);

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
    @Select(value = "SELECT NUM_REG AS numreg1,NUM_RES AS numres1,PEN.DESC_REG_PEN AS regpen,num_sis_pen AS numsispen,ENT_ASEGU.DES_ENT_ASEG AS entaseg,EST_AFP.DES_EST_AFP AS estafp\n" +
            "         FROM TB_HIST_COND_ASEG HIST_ASEG INNER JOIN REG_PENSION PEN ON(HIST_ASEG.REG_PEN=PEN.COD_REG_PEN)\n" +
            "         LEFT JOIN ENTIDAD_ASEGURADORA ENT_ASEGU ON(HIST_ASEG.ENT_ASEG=ENT_ASEGU.ENT_ASEG_COD )\n" +
            "         LEFT JOIN ESTADOS_AFP EST_AFP ON(EST_AFP.COD_EST_AFP=HIST_ASEG.EST_AFP)\n" +
            "         WHERE HIST_ASEG.ser_cod=#{cod} and HIST_ASEG.num_serest=#{numest}")

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
    @Select(value = "select b.num_reg as numreg1, b.num_res as numres1, d.UD_DSC as nomdepact, e.DES_DEP_CESANTES as nomdepces from  qpdatagestion.tb_hist_dep b " +
            " left join QPRODATAQUIPU.uni_dep d on TRIM(d.UD_COD)=TRIM(b.DEP_ACT) " +
            " left join DATAPERSUEL.dependencia_cesantes e on TRIM(e.COD_DEP_CESANTES)=TRIM(b.DEP_CES) " +
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
    @Select(value = "select b.num_reg as numreg1, b.num_res as numres1, d.DES_CON_PLA as descondpla,TO_CHAR(b.FECHA_CESE,'DD/MM/YYYY') AS  fechcese, b.OBS_PLAN_PERM as obser  " +
            "from qpdatagestion.tb_hist_cond_plani b inner join datapersuel.cond_ser_plan d on b.COND_PLA=d.COD_CON_PLA where b.ser_cod=#{cod} and b.num_serest=#{numest} " +
            "ORDER BY numreg1 DESC")
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
     @Insert(value = "insert into qpdatagestion.tb_hist_cond_aseg values " +
             "((select max(num_reg)+1 from qpdatagestion.tb_hist_cond_aseg " +
             "where ser_cod=#{codigo} and num_serest=#{numserest}), #{codigo}, #{numserest}," +
             " #{numResol}, #{regPen}, #{numPen}, #{entAseg}, #{estAFP})")
     public void addconaseg(@Param("codigo") String codigo, @Param("numserest") String numserest, @Param("numResol") String numResol, @Param("regPen") Integer regPen, @Param("numPen") String numPen, @Param("entAseg") Integer entAseg, @Param("estAFP") Integer estAFP) throws DataAccessException;

    //Insertar modificacion en la tabla de dependencias


    //Insertar modificacion en la tabla tb_hist_banco
    @Insert(value = "insert into qpdatagestion.tb_hist_banco values((select max(num_reg)+1 from qpdatagestion.tb_hist_banco where ser_cod=#{codigo} and num_serest=#{numserest}), #{codigo}, #{numserest}, #{ctabanco}, #{codtippago})")
    public void addpagobanco(@Param("codigo") String codigo, @Param("numserest") Integer numserest, @Param("ctabanco") String ctabanco, @Param("codtippago") Integer codtippago) throws DataAccessException;

    //Insertar modificacion en la tabla tb_hist_cond_plani
    @Insert(value = "insert into qpdatagestion.tb_hist_cond_plani values((select MAX(NUM_REG) from  TB_HIST_COND_PLANI where ser_cod=#{codigo} and num_serest=#{numserest} group by SER_COD,NUM_SEREST)+1," +
            "#{codigo},#{numserest},#{numResol},#{condPlani},#{fechcese},#{obser})")
    public void addcondpla(@Param("codigo") String codigo, @Param("numserest") String numserest, @Param("numResol") String numResol, @Param("condPlani") Integer condPlani, @Param("fechcese") String fechcese, @Param("obser") String obser) throws DataAccessException;


    @Insert(value = "insert into qpdatagestion.tb_hist_dep values\n" +
            "((select MAX(NUM_REG) from  TB_HIST_DEP where ser_cod=#{codigo} and num_serest=#{numserest} group by SER_COD,NUM_SEREST)+1,\n" +
            " #{codigo},#{numserest},#{numresol},#{codDep},#{codCes})")
    void addHist_dep(@Param("codigo") String codigo,@Param("numserest") String estadoTrabaActual,@Param("numresol") String numResol,@Param("codDep") String codDep,@Param("codCes")  String codCes);

    @Select(value = "SELECT COD_DEP_CESANTES AS codCes FROM DEPENDENCIA_CESANTES WHERE COD_DEP_CESANTES=(SELECT MIN(COD_DEP_CESANTES) " +
            "FROM DEPENDENCIA_CESANTES GROUP BY UD_ID HAVING UD_ID=#{codGen}) AND UD_ID=#{codGen}")
    @Results(value = {
            @Result(javaType = Hist_servidor.class),
            @Result(property = "codCes",column = "codCes")
    })
    public List<Hist_servidor> getCodCes(@Param("codGen") String codGenDep);


    @Select(value = "SELECT T_CONTRATO_NUMERO AS numContr,T_ADENDA_NUMERO AS numAden FROM TB_CONTRATOS_ADENDAS WHERE SER_COD=#{codigo}")
    @Results(value = {
            @Result(javaType = Contrato.class),
            @Result(property = "numContrato",column = "numContr"),
            @Result(property = "numAdenda",column = "numAden")

})
    public List<Contrato> listar_contratos(@Param("codigo") String codigo);
}
