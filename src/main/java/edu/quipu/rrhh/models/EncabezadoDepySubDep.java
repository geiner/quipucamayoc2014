package edu.quipu.rrhh.models;

/**
 * Created by DESARROLLO on 03/07/2014.
 */
public class EncabezadoDepySubDep {


    private Integer  ud_id_hijo;
    private String  ud_cod_hijo;
    private  String ud_dsc_hijo;
    private Integer  ud_id_padre;
    private String  ud_cod_padre;
    private  String ud_dsc_padre;

    public String getUd_cod_hijo() {
        return ud_cod_hijo;
    }

    public void setUd_cod_hijo(String ud_cod_hijo) {
        this.ud_cod_hijo = ud_cod_hijo;
    }

    public Integer getUd_id_hijo() {
        return ud_id_hijo;
    }

    public void setUd_id_hijo(Integer ud_id_hijo) {
        this.ud_id_hijo = ud_id_hijo;
    }

    public String getUd_dsc_hijo() {
        return ud_dsc_hijo;
    }

    public void setUd_dsc_hijo(String ud_dsc_hijo) {
        this.ud_dsc_hijo = ud_dsc_hijo;
    }

    public Integer getUd_id_padre() {
        return ud_id_padre;
    }

    public void setUd_id_padre(Integer ud_id_padre) {
        this.ud_id_padre = ud_id_padre;
    }

    public String getUd_cod_padre() {
        return ud_cod_padre;
    }

    public void setUd_cod_padre(String ud_cod_padre) {
        this.ud_cod_padre = ud_cod_padre;
    }

    public String getUd_dsc_padre() {
        return ud_dsc_padre;
    }

    public void setUd_dsc_padre(String ud_dsc_padre) {
        this.ud_dsc_padre = ud_dsc_padre;
    }
}
