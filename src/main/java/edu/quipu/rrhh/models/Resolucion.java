package edu.quipu.rrhh.models;

public class Resolucion {
    private String idResolucion;
    private String numero_resol;//guardara el concatenado de resolucion,numero, dependencia y anio
    private String cod_resol;
    private String fecha_expedicion;
    private String motivo;
    private String motivodesc;
    private String fecha_inicio;
    private String fecha_fin;
    private String obliga;
    private String adicional;

    //variables creadas para legajos:carrera laboral
    private String periodoDias;

    public String getPeriodoDias() {
        return periodoDias;
    }

    public void setPeriodoDias(String periodoDias) {
        this.periodoDias = periodoDias;
    }

    public String getMotivodesc() {
        return motivodesc;
    }

    public void setMotivodesc(String motivodesc) {
        this.motivodesc = motivodesc;
    }

    public String getCod_resol() {
        return cod_resol;
    }

    public void setCod_resol(String cod_resol) {
        this.cod_resol = cod_resol;
    }

    public String getNumero_resol() {
        return numero_resol;
    }

    public void setNumero_resol(String numero_resol) {
        this.numero_resol = numero_resol;
    }

    public String getFecha_expedicion() {
        return fecha_expedicion;
    }

    public void setFecha_expedicion(String fecha_expedicion) {
        this.fecha_expedicion = fecha_expedicion;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public String getFecha_inicio() {
        return fecha_inicio;
    }

    public void setFecha_inicio(String fecha_inicio) {
        this.fecha_inicio = fecha_inicio;
    }

    public String getFecha_fin() {
        return fecha_fin;
    }

    public void setFecha_fin(String fecha_fin) {
        this.fecha_fin = fecha_fin;
    }

    public String getObliga() {
        return obliga;
    }

    public void setObliga(String obliga) {
        this.obliga = obliga;
    }

    public String getAdicional() {
        return adicional;
    }

    public void setAdicional(String adicional) {
        this.adicional = adicional;
    }

    public String getIdResolucion() {
        return idResolucion;
    }

    public void setIdResolucion(String idResolucion) {
        this.idResolucion = idResolucion;
    }
}