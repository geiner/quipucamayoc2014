package edu.quipu.rrhh.models;

import java.io.Serializable;
import java.util.Date;

public class Servidor implements Serializable {

    private static final long serialVersionUID = 3159033005313632895L;
    private String codigo;
    private String materno;
    private String paterno;
    private String nombre;
    private String tiposervidor;
    private String descestado;
    private String nacimiento;
    private Integer telefono;
    private Integer celular;
    private String correo;
    private String discapacidad;
    private String sexo;
    private Integer tipoDoc;
    private String numDoc;
    private Integer hij;
    private Integer estCiv;
    private String numSegSoc;
    private Integer titCueBan;
    private Integer estVit;
    private String fechaInUnmsm;
    private String ruc;
    private String domicilio;
    private Integer num_serest;
    private String tipoEstudio;
    private Integer nivelEstudio;
    private Integer codDepartamento;
    private Integer codProvincia;
    private Integer codDistrito;
    private String fechInscRegPen;
    private Integer paisNac;
    private String espfdom;
    private Integer paisDomcilio;
    private Integer codNacdepart;
    private Integer codNacprov;
    private Integer codNacditr;
    private String estado;

    private Integer codEst;
    private String cesantia;

    private String tipoServicio;
    private String estadoTrabaActual;
    private String codAnt;
    private String categoria;
    private String abv_est;
    private String abv_tip_ser;






    public Integer getCodEst() {
        return codEst;
    }

    public void setCodEst(Integer codEst) {
        this.codEst = codEst;
    }

    public String getAbv_est() {
        return abv_est;
    }

    public void setAbv_est(String abv_est) {
        this.abv_est = abv_est;
    }

    public String getAbv_tip_ser() {
        return abv_tip_ser;
    }

    public void setAbv_tip_ser(String abv_tip_ser) {
        this.abv_tip_ser = abv_tip_ser;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getCodAnt() {
        return codAnt;
    }

    public void setCodAnt(String codAnt) {
        this.codAnt = codAnt;
    }

    public String getNacimiento() {
        return nacimiento;
    }

    public void setNacimiento(String nacimiento) {
        this.nacimiento = nacimiento;
    }

    public String getFechaInUnmsm() {
        return fechaInUnmsm;
    }

    public void setFechaInUnmsm(String fechaInUnmsm) {
        this.fechaInUnmsm = fechaInUnmsm;
    }

    public String getFechInscRegPen() {
        return fechInscRegPen;
    }

    public void setFechInscRegPen(String fechInscRegPen) {
        this.fechInscRegPen = fechInscRegPen;
    }

    public String getDiscapacidad() {
        return discapacidad;
    }

    public void setDiscapacidad(String discapacidad) {
        this.discapacidad = discapacidad;
    }

    public String getEspfdom() {
        return espfdom;
    }

    public void setEspfdom(String espfdom) {
        this.espfdom = espfdom;
    }

    public Integer getPaisDomcilio() {
        return paisDomcilio;
    }

    public void setPaisDomcilio(Integer paisDomcilio) {
        this.paisDomcilio = paisDomcilio;
    }

    public Integer getPaisNac() {
        return paisNac;
    }

    public void setPaisNac(Integer paisNac) {
        this.paisNac = paisNac;
    }

    public Integer getCodNacditr() {
        return codNacditr;
    }

    public void setCodNacditr(Integer codNacditr) {
        this.codNacditr = codNacditr;
    }

    public Integer getCodNacprov() {
        return codNacprov;
    }

    public void setCodNacprov(Integer codNacprov) {
        this.codNacprov = codNacprov;
    }

    public Integer getCodNacdepart() {
        return codNacdepart;
    }

    public void setCodNacdepart(Integer codNacdepart) {
        this.codNacdepart = codNacdepart;
    }

    public Integer getNum_serest() {
        return num_serest;
    }

    public void setNum_serest(Integer num_serest) {
        this.num_serest = num_serest;
    }
    public String getTiposervidor() {
        return tiposervidor;
    }

    public void setTiposervidor(String tiposervidor) {
        this.tiposervidor = tiposervidor;
    }

    public String getDescestado() {
        return descestado;
    }

    public void setDescestado(String descestado) {
        this.descestado = descestado;
    }

    public Integer getEstVit() {
        return estVit;
    }

    public void setEstVit(Integer estVit) {
        this.estVit = estVit;
    }

    public Integer getHij() {
        return hij;
    }

    public void setHij(Integer hij) {
        this.hij = hij;
    }

    public Integer getEstCiv() {
        return estCiv;
    }

    public void setEstCiv(Integer estCiv) {
        this.estCiv = estCiv;
    }

    public String getNumSegSoc() {
        return numSegSoc;
    }

    public void setNumSegSoc(String numSegSoc) {
        this.numSegSoc = numSegSoc;
    }

    public Integer getTitCueBan() {
        return titCueBan;
    }

    public void setTitCueBan(Integer titCueBan) {
        this.titCueBan = titCueBan;
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



    public Integer getTelefono() {
        return telefono;
    }

    public void setTelefono(Integer telefono) {
        this.telefono = telefono;
    }

    public Integer getCelular() {
        return celular;
    }

    public void setCelular(Integer celular) {
        this.celular = celular;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }



    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public Integer getTipoDoc() {
        return tipoDoc;
    }

    public void setTipoDoc(Integer tipoDoc) {
        this.tipoDoc = tipoDoc;
    }

    public String getNumDoc() {
        return numDoc;
    }

    public void setNumDoc(String numDoc) {
        this.numDoc = numDoc;
    }



    public String getRuc() {
        return ruc;
    }

    public void setRuc(String ruc) {
        this.ruc = ruc;
    }

    public String getDomicilio() {
        return domicilio;
    }

    public void setDomicilio(String domicilio) {
        this.domicilio = domicilio;
    }

    public String getTipoEstudio() {
        return tipoEstudio;
    }

    public void setTipoEstudio(String tipoEstudio) {
        this.tipoEstudio = tipoEstudio;
    }

    public Integer getNivelEstudio() {
        return nivelEstudio;
    }

    public void setNivelEstudio(Integer nivelEstudio) {
        this.nivelEstudio = nivelEstudio;
    }

    public Integer getCodDepartamento() {
        return codDepartamento;
    }

    public void setCodDepartamento(Integer codDepartamento) {
        this.codDepartamento = codDepartamento;
    }

    public Integer getCodProvincia() {
        return codProvincia;
    }

    public void setCodProvincia(Integer codProvincia) {
        this.codProvincia = codProvincia;
    }

    public Integer getCodDistrito() {
        return codDistrito;
    }

    public void setCodDistrito(Integer codDistrito) {
        this.codDistrito = codDistrito;
    }



    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCesantia() {
        return cesantia;
    }

    public void setCesantia(String cesantia) {
        this.cesantia = cesantia;
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
}
