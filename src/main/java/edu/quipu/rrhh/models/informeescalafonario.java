package edu.quipu.rrhh.models;

import java.io.Serializable;
import java.util.Date;

public class informeescalafonario implements Serializable  {
    private static final long serialVersionUID = 3159033005313632895L;

    private String codigo;
    private String materno;
    private String paterno;
    private String nombre;
    private String numDoc;
    private String cesantia;
    private String estado;
    private String tipoServicio;
    private String estadoTrabaActual;
    private String codAnt;
    private String abv_est;
    private String abv_tip_ser;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getAbv_tip_ser() {
        return abv_tip_ser;
    }

    public void setAbv_tip_ser(String abv_tip_ser) {
        this.abv_tip_ser = abv_tip_ser;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getMaterno() {
        return materno;
    }

    public void setMaterno(String materno) {
        this.materno = materno;
    }

    public String getPaterno() {
        return paterno;
    }

    public void setPaterno(String paterno) {
        this.paterno = paterno;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNumDoc() {
        return numDoc;
    }

    public void setNumDoc(String numDoc) {
        this.numDoc = numDoc;
    }

    public String getCesantia() {
        return cesantia;
    }

    public void setCesantia(String cesantia) {
        this.cesantia = cesantia;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getTipoServicio() {
        return tipoServicio;
    }

    public void setTipoServicio(String tipoServicio) {
        this.tipoServicio = tipoServicio;
    }

    public String getEstadoTrabaActual() {
        return estadoTrabaActual;
    }

    public void setEstadoTrabaActual(String estadoTrabaActual) {
        this.estadoTrabaActual = estadoTrabaActual;
    }

    public String getCodAnt() {
        return codAnt;
    }

    public void setCodAnt(String codAnt) {
        this.codAnt = codAnt;
    }

    public String getAbv_est() {
        return abv_est;
    }

    public void setAbv_est(String abv_est) {
        this.abv_est = abv_est;
    }







}
