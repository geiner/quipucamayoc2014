package edu.quipu.rrhh.persistence;


import edu.quipu.rrhh.models.Reportes;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.dao.DataAccessException;

import java.util.List;

public interface ReportesMapper {

    //traemos datos para la tabla cambios info serv ----Grupal


    @Select(value = " select  substr(des_doc,1,3) as tipoDoc, ser_doc_id_act as numDoc, ser_cod as codSer, ser_ape_pat as pat, ser_ape_mat as mat, ser_nom as nomb, pla_anu as anio, pla_mes as mes,cond_fecha as estPla, desc_categ as cat, des_dep_cesantes as dep, " +
            "    desc_reg_pen as reg,  des_ent_aseg as entAseg " +
            "    from datapersuel.vw_cambios_info_y_cond_pla where pla_anu = #{anioIni}  and pla_mes =  #{mesIni}   and ser_tip_act = #{tipo} and SER_EST_ACT = #{e1} " +
            "    order by pat asc, mat asc ,nomb asc ")

    @Results(value = { @Result(javaType = Reportes.class),
            @Result(property = "tipoDoc", column = "tipoDoc"),
            @Result(property = "numDoc", column = "numDoc"),
            @Result(property = "codSer", column = "codSer"),
            @Result(property = "apePat", column = "pat"),
            @Result(property = "apeMat", column = "mat"),
            @Result(property = "nombre", column = "nomb"),
            @Result(property = "anio", column = "anio"),
            @Result(property = "mes", column = "mes"),
            @Result(property = "condFech", column = "estPla"),
            @Result(property = "cat", column = "cat"),
            @Result(property = "dep", column = "dep"),
            @Result(property = "reg", column = "reg"),
            @Result(property = "entAseg", column = "entAseg")
    })
    List<Reportes>tablaCambioInfoServ(@Param("anioIni") Integer anioIni,@Param("mesIni") Integer mesIni,@Param("tipo") Integer tipo,@Param("e1") Integer e1) throws  DataAccessException;

    //traemos datos para la tabla cambios info serv ------  De un solo servidor
    @Select(value = "select  substr(des_doc,1,3) as tipoDoc, ser_doc_id_act as numDoc, ser_cod as codSer, ser_ape_pat as pat, ser_ape_mat as mat, ser_nom as nomb, " +
            "pla_anu as anio, pla_mes as mes,cond_fecha as estPla, desc_categ as cat, des_dep_cesantes as dep,desc_reg_pen as reg,  des_ent_aseg as entAseg  " +
            "from datapersuel.vw_cambios_info_y_cond_pla  " +
            "where fech between to_date('01'||'/'||#{mesIni}||'/'||#{anioIni},'dd/mm/yyyy') and to_date('20'||'/'||#{mesFin}||'/'||#{anioFin},'dd/mm/yyyy') "+
            "and ser_tip_act = #{tipito}  " +
            "and SER_EST_ACT = #{estito} " +
            "and SER_DOC_ID_ACT= #{dni} " +
            "order by pla_anu asc, pla_mes asc")
    @Results(value = { @Result(javaType = Reportes.class),
            @Result(property = "tipoDoc", column = "tipoDoc"),
            @Result(property = "numDoc", column = "numDoc"),
            @Result(property = "codSer", column = "codSer"),
            @Result(property = "apePat", column = "pat"),
            @Result(property = "apeMat", column = "mat"),
            @Result(property = "nombre", column = "nomb"),
            @Result(property = "anio", column = "anio"),
            @Result(property = "mes", column = "mes"),
            @Result(property = "condFech", column = "estPla"),
            @Result(property = "cat", column = "cat"),
            @Result(property = "dep", column = "dep"),
            @Result(property = "reg", column = "reg"),
            @Result(property = "entAseg", column = "entAseg")
    })
    List<Reportes>tablaCambioInfoDelServ(@Param("anioIni") Integer anioIni,@Param("mesIni") Integer mesIni,@Param("anioFin") Integer anioFin,@Param("mesFin") Integer mesFin,
                                         @Param("dni") String dni,@Param("tipito") Integer tipito,@Param("estito") Integer estito) throws  DataAccessException;



    //Traemos datos para el combo box tipo de servidor
    @Select(value = "select ser.COD_TIP_SER as codtipo,ser.DES_TIP_SER as destipo from datapersuel.TIP_SERVIDOR ser")
    @Results(value = {
            @Result(javaType = Reportes.class),
            @Result(property = "codtipo", column = "codtipo"),
            @Result(property = "destipo", column = "destipo")
    })
    List<Reportes> tiposervidor();

    ////traemos datos para el combo box de estado
    @Select(value = "select COD_EST as codest ,DESC_EST as desest from datapersuel.estado")
    @Results(value = {
            @Result(javaType = Reportes.class),
            @Result(property = "codest", column = "codest"),
            @Result(property = "desest", column = "desest")
    })
    List<Reportes> estservidor();

    /////traemos datos para el combo box de categoria
    @Select(value = "select COD_CATEG as codcat,desc_categ as descat from datapersuel.CATEGORIA where desc_categ is not null")
    @Results(value = {
            @Result(javaType = Reportes.class),
            @Result(property = "codcat", column = "codcat"),
            @Result(property = "descat", column = "descat")
    })
    List<Reportes> catservidor();


    /////traemos datos para el combo box de regimen pensionario
    @Select(value = "select cod_reg_pen as codregpen, desc_reg_pen as desregpen from datapersuel.REG_PENSION")
    @Results(value = {
            @Result(javaType = Reportes.class),
            @Result(property = "codregpen", column = "codregpen"),
            @Result(property = "desregpen", column = "desregpen")
    })
    List<Reportes> regpenservidor();

    /////traemos datos para el combo box de tipo de pago
    @Select(value = "select cod_tip_pag_ser as codtipago, des_tip_pag_ser as desctipago from datapersuel.TIPO_PAG_SER")
    @Results(value = {
            @Result(javaType = Reportes.class),
            @Result(property = "codtipago", column = "codtipago"),
            @Result(property = "desctipago", column = "desctipago")
    })
    List<Reportes> tipagoservidor();

    /////traemos datos para el combo box de Dependencia
    @Select(value = "select cod_dep_cesantes as codces, des_dep_cesantes as descces from datapersuel.DEPENDENCIA_CESANTES where des_dep_cesantes is not null order by cod_dep_cesantes")
    @Results(value = {
            @Result(javaType = Reportes.class),
            @Result(property = "codces", column = "codces"),
            @Result(property = "descces", column = "descces")
    })
    List<Reportes> depservidor();










    ////////////////////////////////////////parte de Jean//////////////////////////////////////

    ///////traemos los datos para la tabla
    @Select(value = "select DES_DOC as tipoDoc,SER_DOC_ID_ACT as numDoc, SER_COD as codSer, SER_APE_PAT as apePat, SER_APE_MAT as apeMat,\n" +
            "  SER_NOM as nombre, COND_FECHA as condFech, pla_mes as mes, pla_anu as anio,  ESTADO_ACT as est, TIPO_SERV_ACT as tipSer\n" +
            "                      from datapersuel.vw_cambios_info_y_cond_pla where SER_CON_PLA  in(#{valor1}, #{susp_ina}, #{cese},  #{fallecido},  #{funmsm},  #{fplani},  #{term_cont}, \n" +
            "                        #{ren},  #{pen_susp}, #{lsgh},  #{noRat},  #{destac},  #{lcgh}, #{exclu}, #{cadPen})\n" +
            "                     and ser_tip_act in(#{docCCP},#{admCCP},#{docMagCCP},#{admProfSaludCCP},#{obreroCCP},#{sinTipoCCP},#{desigCCP},#{desigSaludCCP})\n" +
            "                       and ser_est_act in(#{permCCP}, #{contrat},#{cesa}, #{snp}, #{sinEst},#{contrPers},#{cas}, #{amc})\n" +
            "                       and fech between to_date('01'||'/'||#{mesIniCCP}||'/'||#{anioIniCCP},'dd/mm/yyyy') and to_date('20'||'/'||#{mesFinCCP}||'/'||#{anioFinCCP},'dd/mm/yyyy')\n" +
            "                     order by pla_anu desc, pla_mes desc, SER_APE_PAT ASC, SER_APE_MAT ASC, SER_NOM ASC ")
    @Results( value = {
            @Result(javaType = Reportes.class),
            @Result(property = "tipoDoc", column = "tipoDoc"),
            @Result(property = "numDoc", column = "numDoc"),
            @Result(property = "codSer", column = "codSer"),
            @Result(property = "apePat", column = "apePat"),
            @Result(property = "apeMat", column = "apeMat"),
            @Result(property = "nombre", column = "nombre"),
            @Result(property = "condFech", column = "condFech"),
            @Result(property = "mes", column = "mes"),
            @Result(property = "anio", column = "anio"),
            @Result(property = "est", column = "est"),
            @Result(property = "tipSer", column = "tipSer")

    })
    List<Reportes>tablaCondPla(@Param("valor1") Integer valor1, @Param("susp_ina") Integer susp_ina, @Param("cese") Integer cese, @Param("fallecido") Integer fallecido, @Param("funmsm") Integer funmsm, @Param("fplani") Integer fplani, @Param("term_cont") Integer term_cont,
                               @Param("ren") Integer ren, @Param("pen_susp") Integer pen_susp, @Param("lsgh") Integer lsgh, @Param("noRat") Integer noRat, @Param("destac") Integer destac, @Param("lcgh") Integer lcgh, @Param("exclu") Integer exclu, @Param("cadPen") Integer cadPen,
                               @Param("docCCP") Integer docCCP, @Param("admCCP") Integer admCCP, @Param("docMagCCP") Integer docMagCCP, @Param("admProfSaludCCP") Integer admProfSaludCCP, @Param("obreroCCP") Integer obreroCCP, @Param("sinTipoCCP") Integer sinTipoCCP, @Param("desigCCP") Integer desigCCP, @Param("desigSaludCCP") Integer desigSaludCCP,
                               @Param("permCCP") Integer permCCP, @Param("contrat") Integer contrat, @Param("cesa") Integer cesa, @Param("snp") Integer snp, @Param("sinEst") Integer sinEst, @Param("contrPers") Integer contrPers, @Param("cas") Integer cas, @Param("amc") Integer amc,
                               @Param("anioIniCCP") Integer anioIniCCP, @Param("mesIniCCP") Integer mesIniCCP, @Param("anioFinCCP") Integer anioFinCCP, @Param("mesFinCCP") Integer mesFinCCP) throws  DataAccessException;




    @Select(value = "select DES_DOC as tipoDoc,SER_DOC_ID_ACT as numDoc, SER_COD as codSer, SER_APE_PAT as apePat, SER_APE_MAT as apeMat, " +
            "                    SER_NOM as nombre, COND_FECHA as condFech, pla_mes as mes, pla_anu as anio,  ESTADO_ACT as est, TIPO_SERV_ACT as tipSer\n" +
            "                   from datapersuel.vw_cambios_info_y_cond_pla where SER_CON_PLA  in(#{valor1}, #{susp_ina}, #{cese},  #{fallecido},  #{funmsm},  #{fplani},  #{term_cont}, \n" +
            "                        #{ren},  #{pen_susp}, #{lsgh},  #{noRat},  #{destac},  #{lcgh}, #{exclu}, #{cadPen})\n" +
            "                       and SER_TIP_ACT = #{codTipCCP}\n" +
            "                       and SER_EST_ACT = #{codEstCCP}\n" +
            "                       and SER_DOC_ID_ACT = #{dniCCP}\n" +
            "                     and fech between to_date('01'||'/'||#{mesIniCCP}||'/'||#{anioIniCCP},'dd/mm/yyyy') and to_date('20'||'/'||#{mesFinCCP}||'/'||#{anioFinCCP},'dd/mm/yyyy')\n" +
            "                      order by pla_anu desc, pla_mes desc, SER_APE_PAT ASC, SER_APE_MAT ASC, SER_NOM ASC ")
    @Results( value = {
            @Result(javaType = Reportes.class),
            @Result(property = "tipoDoc", column = "tipoDoc"),
            @Result(property = "numDoc", column = "numDoc"),
            @Result(property = "codSer", column = "codSer"),
            @Result(property = "apePat", column = "apePat"),
            @Result(property = "apeMat", column = "apeMat"),
            @Result(property = "nombre", column = "nombre"),
            @Result(property = "condFech", column = "condFech"),
            @Result(property = "mes", column = "mes"),
            @Result(property = "anio", column = "anio"),
            @Result(property = "est", column = "est"),
            @Result(property = "tipSer", column = "tipSer")

    })
    List<Reportes>tablaUnCondPla(@Param("valor1") Integer valor1, @Param("susp_ina") Integer susp_ina, @Param("cese") Integer cese, @Param("fallecido") Integer fallecido, @Param("funmsm") Integer funmsm, @Param("fplani") Integer fplani, @Param("term_cont") Integer term_cont,
                                 @Param("ren") Integer ren, @Param("pen_susp") Integer pen_susp, @Param("lsgh") Integer lsgh, @Param("noRat") Integer noRat, @Param("destac") Integer destac, @Param("lcgh") Integer lcgh, @Param("exclu") Integer exclu, @Param("cadPen") Integer cadPen,
                                 @Param("codTipCCP") Integer codTipCCP, @Param("codEstCCP") Integer codEstCCP, @Param("dniCCP") Integer dniCCP,
                                 @Param("anioIniCCP") Integer anioIniCCP, @Param("mesIniCCP") Integer mesIniCCP, @Param("anioFinCCP") Integer anioFinCCP, @Param("mesFinCCP") Integer mesFinCCP) throws  DataAccessException;




    ////////////////////////////////////////////////parte de fernando tabla informacion /////////////////////////////////
    @Select(value = "select des_doc as tip_doc, num as nu_doc, cod_ser as co_serv, ser_ape_pat as ap_pat, ser_ape_mat as ap_mat, ser_nom as nom, trunc(months_between(sysdate, to_date(nac,'dd/mm/yyyy'))/12) as eda, sexo as sex, tipo_serv as ti_ser, estado as estad, desc_categ as cate," +
            " desc_reg_pen as reg_pe, des_tip_pag_ser as ti_pag, des_dep_cesantes as dep_serv, INGRESO_UNMSM as ingre_unmsm from datapersuel.VW_INFO_SERV_ACT  where SEXO in (#{sex},#{sex1})   "+
            "and nac between to_date(#{dia1}||'/'||#{mes1}||'/'||#{anio1},'dd/mm/yyyy') and to_date(#{dia2}||'/'||#{mes2}||'/'||#{anio2},'dd/mm/yyyy') "+
            "and INGRESO_UNMSM between to_date(#{dia3}||'/'||#{mes3}||'/'||#{anio3},'dd/mm/yyyy') and to_date(#{dia4}||'/'||#{mes4}||'/'||#{anio4},'dd/mm/yyyy') and SER_TIP_ACT like '%'||#{tip}||'%' "+
            "and SER_EST_ACT like '%'||#{estados}||'%' and SER_RPE_ACT like '%'||#{regimenpen}||'%' and SER_TIP_PAG_ACT like '%'||#{tipago}||'%' and SER_CAT_ACT like '%'||#{categ}||'%' and SER_COD_DEP_RAC like '%'||#{dependen}||'%'"+
            " order by ser_ape_pat asc,ser_ape_mat asc")
    @Results(value = {@Result(javaType = Reportes.class),
            @Result(property = "tip_doc", column ="tip_doc" ),
            @Result(property = "nu_doc", column = "nu_doc"),
            @Result(property = "co_serv", column = "co_serv"),
            @Result(property = "ap_pat", column = "ap_pat"),
            @Result(property = "ap_mat", column = "ap_mat"),
            @Result(property = "nom", column = "nom"),


            @Result(property = "eda", column = "eda"),
            @Result(property = "sex", column = "sex"),
            @Result(property = "ti_ser", column = "ti_ser"),
            @Result(property = "estad", column = "estad"),
            @Result(property = "cate", column = "cate"),
            @Result(property = "reg_pe", column = "reg_pe"),
            @Result(property = "ti_pag", column = "ti_pag"),
            @Result(property = "dep_serv", column = "dep_serv"),
            @Result(property = "ingre_unmsm", column = "ingre_unmsm")


    })
    List<Reportes> tablaInformacion(@Param("sex") String sex, @Param("sex1") String sex1, @Param("dia1") String dia1, @Param("mes1") String mes1, @Param("anio1") String anio1,
                                    @Param("dia2") String dia2, @Param("mes2") String mes2, @Param("anio2") String anio2, @Param("dia3") String dia3, @Param("mes3") String mes3,
                                    @Param("anio3") String anio3, @Param("dia4") String dia4, @Param("mes4") String mes4, @Param("anio4") String anio4, @Param("tip") String tip,
                                    @Param("estados") String estados, @Param("regimenpen") String regimenpen, @Param("tipago") String tipago, @Param("categ") String categ,
                                    @Param("dependen") String dependen) throws DataAccessException;

}
