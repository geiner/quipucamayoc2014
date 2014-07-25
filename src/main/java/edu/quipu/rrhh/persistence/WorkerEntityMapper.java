package edu.quipu.rrhh.persistence;

import edu.quipu.rrhh.models.WorkerEntity;
import org.apache.ibatis.annotations.*;
import org.springframework.dao.DataAccessException;

public interface WorkerEntityMapper {
    @Select(value = "SELECT SE.SER_COD AS SER_COD , " +
            "  se.ser_ape_pat  AS SAP, " +
            "  se.ser_ape_mat  AS SAM , " +
            "  se.ser_nom      AS SNOM , " +
            "  es.desc_est     AS DEST, " +
            "  cat.desc_categ  AS DCAT, " +
            "  TS.DES_TIP_SER  AS DTYPE, " +
            "  ud.ud_dsc       AS UDDSC , " +
            "  ud.ud_id        AS UDID , " +
            "  B.PERF_DESC " +
            "FROM DATAPERSUEL.servidor se " +
            "INNER JOIN DATAPERSUEL.SERVIDOR_ESTADO ST " +
            "ON se.ser_cod=st.ser_cod " +
            "INNER JOIN DATAPERSUEL.ESTADO ES " +
            "ON st.ser_est_act=es.cod_est " +
            "INNER JOIN DATAPERSUEL.categoria cat " +
            "ON st.ser_cat_act=cat.cod_categ " +
            "INNER JOIN DATAPERSUEL.TIP_SERVIDOR ts " +
            "ON st.ser_tip_act=TS.COD_TIP_SER " +
            "LEFT JOIN UNI_DEP UD " +
            "ON ST.ser_cod_dep_act=ud.ud_cod " +
            "LEFT JOIN QPRODATAQUIPU.tb_hist_usu_perf HU " +
            "ON SE.ser_doc_id_act=HU.C_USUID " +
            "LEFT JOIN QPRODATAQUIPU.tb_perfil b " +
            "ON b.perf_cod          = HU.perf_cod " +
            "WHERE TRIM(se.ser_doc_id_act)=TRIM(#{nId}) " +
            "AND st.ser_con_pla_act =1")
    @Results(value = {@Result(javaType = WorkerEntity.class),

            @Result(column ="SER_COD", property = "id"),
            @Result(column ="SAP", property = "firstLastName"),
            @Result(column ="SAM", property = "secondLastName"),
            @Result(column ="SNOM", property = "name"),
            @Result(column ="DEST", property = "stateDescription"),
            @Result(column = "DCAT", property = "categoryDescription"),
            @Result(column = "DTYPE", property = "category"),
            @Result(column = "UDID", property = "dependencyId"),
            @Result(column = "UDDSC", property = "dependency"),
            @Result(column = "PERF_DESC", property = "profileDescription")}

    )
    public WorkerEntity findWorker(@Param("nId") String id) throws DataAccessException;


    @Insert(value = "INSERT INTO QPRODATAQUIPU.TB_ERP_USUARIO VALUES (#{nId},#{email},#{name},#{lastname})")
    public  void  addUser(@Param("nId") String id, @Param("email") String email, @Param("name") String name, @Param("lastname") String lastname) throws DataAccessException;

    @Insert(value = "INSERT INTO QPRODATAQUIPU.TB_HIST_USU_PERF VALUES (hist_sec.nextval,#{udId},0,(SELECT SYSDATE FROM SYS.DUAL),24,#{nId},NULL,#{email})")
    public void addHistUserPerf(@Param("nId") String id, @Param("udId") int dependencyId,@Param("email") String email) throws DataAccessException;




    @Select(value = "SELECT c_usuid, T_MAIL from QPRODATAQUIPU.tb_erp_usuario where c_usuid=#{nId}")

    @Results(value = {@Result(javaType = WorkerEntity.class),

            @Result(column = "T_MAIl", property = "email"),
            @Result(column = "c_usuid",property = "erpId")}

    )
    public WorkerEntity validationDni(@Param("nId") String id) throws DataAccessException;

   /* @Select(value = "SELECT  c_usuid from QPRODATAQUIPU.tb_hist_usu_perf where t_mail=#{email}")

    @Results(value = {@Result(javaType = WorkerEntity.class),

            @Result(column = "c_usuid", property = "id")}

    )
    public  WorkerEntity  validationProfile(@Param("email") String id) throws DataAccessException;    */

    @Update(value = "update QPRODATAQUIPU.tb_hist_usu_perf SET EST=3, f_camb_est=(select sysdate from dual) where est =1 and c_usuid = #{id}")
    public void updateStateHistUsuPerf(@Param("id") String id)  throws DataAccessException;

    @Select(value = "SELECT c_usuid from QPRODATAQUIPU.TB_HIST_USU_PERF where c_usuid=#{nId}")

    @Results(value = {@Result(javaType = WorkerEntity.class),

            @Result(column = "c_usuid",property = "id")}

    )
    public WorkerEntity findHistUser(@Param("nId") String id) throws DataAccessException;


    @Select(value = "SELECT EST from QPRODATAQUIPU.TB_HIST_USU_PERF where c_usuid=#{nId}")

    @Results(value = {@Result(javaType = WorkerEntity.class),

            @Result(column = "est",property = "est")}

    )
    public WorkerEntity findEstHistUser(@Param("nId") String id) throws DataAccessException;

    @Delete(value = "DELETE " +
            " FROM QPRODATAQUIPU.TB_HIST_USU_PERF " +
            " WHERE T_MAIL= " +
            "  (SELECT eu.t_mail " +
            "  FROM QPRODATAQUIPU.tb_erp_usuario eu " +
            "  WHERE trim(c_usuid)=trim(#{id}) " +
            "  ) " +
            " AND c_usuid IS NULL " +
            " AND ud_id   IS NULL")
    void deleteUserHistUsu(@Param("id") String email);
}