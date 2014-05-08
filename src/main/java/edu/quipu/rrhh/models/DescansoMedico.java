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
