package edu.quipu.rrhh.models;

/**
 * Created by USUARIO on 21/04/2014.
 */
public class PlazaCAP {


    private Integer cod_plaza;//
    private Integer id_depend;
    private String est_plaza;//
    private String nom_estruc;//
    private String cod_servidor;//
    private String ape_pat;//
    private String ape_mat;//
    private String nom_ser;//
    private String ser_est;//
    private String fech_ing;//
    private String fech_sal;//
    private String ser_mod;//
    private Integer año;
    private String subDep;
    private Integer cod_est_plaza;
    private String cod_ant_ser;



    public Integer getId_depend() {
        return id_depend;
    }

    public void setId_depend(Integer id_depend) {
        this.id_depend = id_depend;
    }

    public Integer getCod_plaza() {
        return cod_plaza;
    }

    public void setCod_plaza(Integer cod_plaza) {
        this.cod_plaza = cod_plaza;
    }

    public String getEst_plaza() {
        return est_plaza;
    }

    public void setEst_plaza(String est_plaza) {
        this.est_plaza = est_plaza;
    }

    public String getNom_estruc() {
        return nom_estruc;
    }

    public void setNom_estruc(String nom_estruc) {
        this.nom_estruc = nom_estruc;
    }

    public String getCod_servidor() {
        return cod_servidor;
    }

    public void setCod_servidor(String cod_servidor) {
        this.cod_servidor = cod_servidor;
    }

    public String getApe_pat() {
        return ape_pat;
    }

    public void setApe_pat(String ape_pat) {
        this.ape_pat = ape_pat;
    }

    public String getNom_ser() {
        return nom_ser;
    }

    public void setNom_ser(String nom_ser) {
        this.nom_ser = nom_ser;
    }

    public String getApe_mat() {
        return ape_mat;
    }

    public void setApe_mat(String ape_mat) {
        this.ape_mat = ape_mat;
    }

    public String getSer_est() {
        return ser_est;
    }

    public void setSer_est(String ser_est) {
        this.ser_est = ser_est;
    }

    public String getFech_ing() {
        return fech_ing;
    }

    public void setFech_ing(String fech_ing) {
        this.fech_ing = fech_ing;
    }

    public String getFech_sal() {
        return fech_sal;
    }

    public void setFech_sal(String fech_sal) {
        this.fech_sal = fech_sal;
    }

    public String getSer_mod() {
        return ser_mod;
    }

    public void setSer_mod(String ser_mod) {
        this.ser_mod = ser_mod;
    }

    public String getSubDep() {
        return subDep;
    }

    public void setSubDep(String subDep) {
        this.subDep = subDep;
    }


    public Integer getAño() {
        return año;
    }

    public void setAño(Integer año) {
        this.año = año;
    }


    public Integer getCod_est_plaza() {
        return cod_est_plaza;
    }

    public void setCod_est_plaza(Integer cod_est_plaza) {
        this.cod_est_plaza = cod_est_plaza;
    }

    public String getCod_ant_ser() {
        return cod_ant_ser;
    }

    public void setCod_ant_ser(String cod_ant_ser) {
        this.cod_ant_ser = cod_ant_ser;
    }
}
