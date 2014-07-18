package edu.quipu.rrhh.models;

import java.io.Serializable;
import java.util.Date;

public class Hist_servidor implements Serializable{
    private static final long serialVersionUID = 3159033005313632895L;

    private String codigo;
    private String materno;
    private String paterno;
    private String nombre;
    private Integer numReg;
    private String codAnt;
    private String numDoc;
    private String numResol;
    private String descGen;
    private String cesantia;
    private String dependencia;
    private String categoria;
    private String tipoServicio;
    private String estado;
    private Integer codEst;
    private Integer codEs;
    private String codCateg;
    private Integer codGen;
    private String estadoTrabaActual;
    private String codDep;
    private String codCes;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getCodDep() {
        return codDep;
    }

    public void setCodDep(String codDep) {
        this.codDep = codDep;
    }

    public String getCodCes() {
        return codCes;
    }

    public void setCodCes(String codCes) {
        this.codCes = codCes;
    }

    public Integer getCodEs() {
        return codEs;
    }

    public void setCodEs(Integer codEs) {
        this.codEs = codEs;
    }

    public String getCodCateg() {
        return codCateg;
    }

    public void setCodCateg(String codCateg) {
        this.codCateg = codCateg;
    }

    public Integer getCodGen() {
        return codGen;
    }

    public void setCodGen(Integer codGen) {
        this.codGen = codGen;
    }

    public Integer getCodEst() {
        return codEst;
    }

    public void setCodEst(Integer codEst) {
        this.codEst = codEst;
    }

    public Integer getNumReg() {
        return numReg;
    }

    public void setNumReg(Integer numReg) {
        this.numReg = numReg;
    }

    public String getMaterno() {
        return materno;
    }

    public void setMaterno(String materno) {
        this.materno = materno;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
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

    public String getCodAnt() {
        return codAnt;
    }

    public void setCodAnt(String codAnt) {
        this.codAnt = codAnt;
    }

    public String getNumDoc() {
        return numDoc;
    }

    public void setNumDoc(String numDoc) {
        this.numDoc = numDoc;
    }

    public String getNumResol() {
        return numResol;
    }

    public void setNumResol(String numResol) {
        this.numResol = numResol;
    }

    public String getDescGen() {
        return descGen;
    }

    public void setDescGen(String descGen) {
        this.descGen = descGen;
    }

    public String getCesantia() {
        return cesantia;
    }

    public void setCesantia(String cesantia) {
        this.cesantia = cesantia;
    }

    public String getDependencia() {
        return dependencia;
    }

    public void setDependencia(String dependencia) {
        this.dependencia = dependencia;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getTipoServicio() {
        return tipoServicio;
    }

    public void setTipoServicio(String tipoServicio) {
        this.tipoServicio = tipoServicio;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getEstadoTrabaActual() {
        return estadoTrabaActual;
    }

    public void setEstadoTrabaActual(String estadoTrabaActual) {
        this.estadoTrabaActual = estadoTrabaActual;
    }
}
