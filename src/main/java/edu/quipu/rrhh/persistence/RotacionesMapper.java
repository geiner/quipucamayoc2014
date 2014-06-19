package edu.quipu.rrhh.persistence;

import edu.quipu.rrhh.models.HistorialPlaza;
import edu.quipu.rrhh.models.PlazaCAP;
import org.apache.ibatis.annotations.*;

import java.util.List;


public interface RotacionesMapper {




    @Select(value = "SELECT nominal.COD_PLAZA AS CODPLAZA,nominal.SER_COD AS CODSER,cargoE.T_NOM_CARGO_ESTR AS NOMPLAZA,dependencia.UD_DSC AS DEPENDENCIA  ,  TO_CHAR(nominal.SER_FECH_ING ,'DD/MM/YYYY')   AS FING\n" +
            "FROM (((QPRODATAPLANI.TB_CUADRO_NOMINAL nominal\n" +
            "INNER JOIN QPRODATAPLANI.TB_NUM_PLAZAS plaza ON plaza.C_COD_PLAZA=nominal.COD_PLAZA)\n" +
            "INNER JOIN QPRODATAPLANI.TB_CARGO cargo ON cargo.C_COD_CARGO=plaza.N_COD_CARGO)\n" +
            "INNER JOIN QPRODATAPLANI.TB_CARGO_CLASIF_ESTRUCT cargoClasif ON cargoClasif.C_COD_CARGO_CLASIF_ESTR=cargo.C_CARCLA_COD\n" +
            "INNER JOIN QPRODATAQUIPU.UNI_DEP dependencia ON dependencia.UD_ID=cargo.N_UD_ID\n" +
            ")\n" +
            "INNER JOIN QPRODATAPLANI.TB_CARGO_ESTRUCTURAL cargoE ON cargoE.C_COD_CARGO_ESTR=cargoClasif.N_COD_CARGO_ESTR\n" +
            "WHERE (trim(nominal.SER_COD) like #{codServidor})")
    @Results(value = {
            @Result(javaType = PlazaCAP.class),
            @Result(property = "cod_plaza",column = "CODPLAZA"),
            @Result(property = "cod_servidor",column = "CODSER"),
            @Result(property = "nom_estruc",column = "NOMPLAZA"),
            @Result(property = "subDep",column = "DEPENDENCIA"),
            @Result(property = "fech_ing",column = "FING")
    })
    List<PlazaCAP> plazasAsignadasPorServidor(@Param("codServidor") String codigo) ;



/*
    @Select(value = "SELECT nominal.COD_PLAZA AS CODPLAZA,nominal.SER_COD AS CODSER,cargoE.T_NOM_CARGO_ESTR AS NOMPLAZA,  TO_CHAR(nominal.SER_FECH_ING ,'DD/MM/YYYY')   AS FING\n" +
            "FROM (((QPRODATAPLANI.TB_CUADRO_NOMINAL nominal\n" +
            "INNER JOIN QPRODATAPLANI.TB_NUM_PLAZAS plaza ON plaza.C_COD_PLAZA=nominal.COD_PLAZA)\n" +
            "INNER JOIN QPRODATAPLANI.TB_CARGO cargo ON cargo.C_COD_CARGO=plaza.N_COD_CARGO)\n" +
            "INNER JOIN QPRODATAPLANI.TB_CARGO_CLASIF_ESTRUCT cargoClasif ON cargoClasif.C_COD_CARGO_CLASIF_ESTR=cargo.C_CARCLA_COD)\n" +
            "INNER JOIN QPRODATAPLANI.TB_CARGO_ESTRUCTURAL cargoE ON cargoE.C_COD_CARGO_ESTR=cargoClasif.N_COD_CARGO_ESTR\n" +
            "WHERE (trim(nominal.SER_COD) like  #{codServidor})")
    @Results(value = {
            @Result(javaType = PlazaCAP.class),
            @Result(property = "cod_plaza",column = "CODPLAZA"),
            @Result(property = "cod_servidor",column = "CODSER"),
            @Result(property = "nom_estruc",column = "NOMPLAZA"),
            @Result(property = "fech_ing",column = "FING")
    })
    List<PlazaCAP> plazasAsignadasPorServidor(@Param("codServidor") String codigo) ;

*/


    @Select(value = "SELECT rotacion.ID_ROT_PLAZA AS IDROT,rotacion.COD_PLAZA AS CODPLAZA,dependencia.UD_DSC  AS ORIGEN,TO_CHAR(rotacion.FECHA_ROTACION ,'DD/MM/YYYY')  AS FECHAROT,rotacion.NRO_DOC AS NRODOC\n" +
            "FROM QPRODATAPLANI.TB_ROTACION_PLAZA  rotacion\n" +
            "INNER JOIN QPRODATAQUIPU.UNI_DEP dependencia ON dependencia.UD_ID=rotacion.DEP_ACTUAL\n" +
            "WHERE (COD_PLAZA LIKE  #{codPlaza})")
    @Results(value = {
            @Result(javaType = HistorialPlaza.class),
            @Result(property = "idHistorialPlaza",column = "IDROT"),
            @Result(property = "codPlaza",column = "CODPLAZA"),
            @Result(property = "depActual",column = "ORIGEN"),
            @Result(property = "fechaRotacion",column = "FECHAROT"),
            @Result(property = "nroDocu",column = "NRODOC"),
    })
    List<HistorialPlaza> historialPlaza(@Param("codPlaza") String codigo);



    @Delete(value="delete from QPRODATAPLANI.TB_ROTACION_PLAZA    where  ID_ROT_PLAZA=#{codHistorial}")
    void eliminarHistorialPlaza(@Param("codHistorial") int codHistorial);


    @Insert(value="insert into QPRODATAPLANI.TB_ROTACION_PLAZA values(QPRODATAPLANI.ID_ROTACION_PLAZA.nextval,#{codPlaza},TO_DATE(#{fechaRotacion},'DD/MM/YY'),#{depOrigen},#{nroDocu})")
    void addItemHistorialPlaza(@Param("codPlaza") int codPlaza, @Param("fechaRotacion") String fechaRotacion, @Param("depOrigen") String depOrigen, @Param("nroDocu") String nroDocu);




}
