package edu.quipu.rrhh.persistence;

import edu.quipu.rrhh.models.WorkerEntity;
import org.apache.ibatis.annotations.*;
import org.springframework.dao.DataAccessException;

public interface WorkerEntityMapper {
    @Select(value = "SELECT SER_COD, SAP, SAM, SNOM, DEST, DCAT, DTYPE, UDID, UDDSC, PERF_DESC FROM (SELECT s.ser_cod, s.ser_mail, SER_APE_PAT as sAP, SER_APE_MAT as sAM, SER_NOM as sNom,DESC_EST as dEst, DESC_CATEG as dCat,DES_TIP_SER as dType,UD_ID as udId,UD_DSC as udDsc    \n" +
            "            FROM ((DATAPERSUEL.SERVIDOR s left join (DATAPERSUEL.TIP_SERVIDOR ts left join (UNI_DEP ud left join  (DATAPERSUEL.SERVIDOR_ESTADO se left join DATAPERSUEL.ESTADO es \n" +
            "            on se.ser_est_act =es.cod_est)  on ud.UD_COD=se.SER_COD_DEP_ACT) on ts.COD_TIP_SER=se.SER_TIP_ACT)on s.SER_COD=se.SER_COD)  \n" +
            "            left join DATAPERSUEL.categoria cat on cat.cod_categ = se.ser_cat_act) \n" +
            "            WHERE S.SER_COD=#{nId} and se.ser_con_pla_act=1   ) actual LEFT JOIN (QPRODATAQUIPU.tb_perfil b inner join QPRODATAQUIPU.tb_hist_usu_perf a on b.perf_cod = a.perf_cod) ON actual.SER_COD = a.c_usuid")

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