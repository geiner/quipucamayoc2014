package edu.quipu.rrhh.models;


public class DescansoMedico {

    private int id_desc_med;
    private String id_serv;
    private int numserest;
    private String citt;
    private String f_inicio;
    private String f_fin;
    private String tipo_lic;
    private String tiempo;

    private String dni;
    private String desc_est;
    private String ser_ape_pat;
    private String ser_ape_mat;
    private String ser_nom;

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getDesc_est() {
        return desc_est;
    }

    public void setDesc_est(String desc_est) {
        this.desc_est = desc_est;
    }

    public String getSer_ape_pat() {
        return ser_ape_pat;
    }

    public void setSer_ape_pat(String ser_ape_pat) {
        this.ser_ape_pat = ser_ape_pat;
    }

    public String getSer_ape_mat() {
        return ser_ape_mat;
    }

    public void setSer_ape_mat(String ser_ape_mat) {
        this.ser_ape_mat = ser_ape_mat;
    }

    public String getSer_nom() {
        return ser_nom;
    }

    public void setSer_nom(String ser_nom) {
        this.ser_nom = ser_nom;
    }

    public String getTiempo() {
        return tiempo;
    }

    public void setTiempo(String tiempo) {
        this.tiempo = tiempo;
    }

    public String getId_serv() {
        return id_serv;
    }

    public int getId_desc_med() {
        return id_desc_med;
    }

    public void setId_desc_med(int id_desc_med) {
        this.id_desc_med = id_desc_med;
    }

    public void setId_serv(String id_serv) {
        this.id_serv = id_serv;
    }

    public int getNumserest() {
        return numserest;
    }

    public void setNumserest(int numserest) {
        this.numserest = numserest;
    }

    public String getCitt() {
        return citt;
    }

    public void setCitt(String citt) {
        this.citt = citt;
    }

    public String getF_inicio() {
        return f_inicio;
    }

    public void setF_inicio(String f_inicio) {
        this.f_inicio = f_inicio;
    }

    public String getF_fin() {
        return f_fin;
    }

    public void setF_fin(String f_fin) {
        this.f_fin = f_fin;
    }

    public String getTipo_lic() {
        return tipo_lic;
    }

    public void setTipo_lic(String tipo_lic) {
        this.tipo_lic = tipo_lic;
    }
}
