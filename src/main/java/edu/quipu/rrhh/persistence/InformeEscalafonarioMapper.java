package edu.quipu.rrhh.persistence;

import edu.quipu.rrhh.models.*;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface InformeEscalafonarioMapper {

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
            "FROM DATAPERSUEL.LISTA_SERVIDOR where SER_EST_ACT in (1,2,0,5) ORDER BY SER_APE_PAT")
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
    List<informeescalafonario> todosServidores();


}




