package edu.quipu.rrhh.models;

import java.io.Serializable;

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

    //para las opcion de Datos Personales en Legajos
    private String nombreCompleto;
    private String docTipDescri;
    private String sexDescrip;
    private String estCivDescrip;
    private String paisDescri;
    private String deparDescri;
    private String provinDescri;
    private String distriDescri;

    private String paisAct;
    private String departAct;
    private String provinAct;
    private String distrAct;

    // //para Contrato CAS

    private Integer tipo;
    private Integer depCes;
    private Integer udid;
    private String dependencia;
    private Integer monto1;

    //para Adendas CAS

    private String contrato;
    private String descargo;
    private Integer idcargo;
    private String fechini;
    private String fechfin;
    private String destipo;


    public String getPaisAct() {
        return paisAct;
    }

    public void setPaisAct(String paisAct) {
        this.paisAct = paisAct;
    }

    public String getDepartAct() {
        return departAct;
    }

    public void setDepartAct(String departAct) {
        this.departAct = departAct;
    }

    public String getProvinAct() {
        return provinAct;
    }

    public void setProvinAct(String provinAct) {
        this.provinAct = provinAct;
    }

    public String getDistrAct() {
        return distrAct;
    }

    public void setDistrAct(String distrAct) {
        this.distrAct = distrAct;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }

    public String getDocTipDescri() {
        return docTipDescri;
    }

    public void setDocTipDescri(String docTipDescri) {
        this.docTipDescri = docTipDescri;
    }

    public String getSexDescrip() {
        return sexDescrip;
    }

    public void setSexDescrip(String sexDescrip) {
        this.sexDescrip = sexDescrip;
    }

    public String getEstCivDescrip() {
        return estCivDescrip;
    }

    public void setEstCivDescrip(String estCivDescrip) {
        this.estCivDescrip = estCivDescrip;
    }

    public String getPaisDescri() {
        return paisDescri;
    }

    public void setPaisDescri(String paisDescri) {
        this.paisDescri = paisDescri;
    }

    public String getDeparDescri() {
        return deparDescri;
    }

    public void setDeparDescri(String deparDescri) {
        this.deparDescri = deparDescri;
    }

    public String getProvinDescri() {
        return provinDescri;
    }

    public void setProvinDescri(String provinDescri) {
        this.provinDescri = provinDescri;
    }

    public String getDistriDescri() {
        return distriDescri;
    }

    public void setDistriDescri(String distriDescri) {
        this.distriDescri = distriDescri;
    }

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

    ////////////////////////////////////

    public Integer getTipo() {
        return tipo;
    }

    public void setTipo(Integer tipo) {
        this.tipo = tipo;
    }

    public Integer getDepCes() {
        return depCes;
    }

    public void setDepCes(Integer depCes) {
        this.depCes = depCes;
    }

    public Integer getUdid() {
        return udid;
    }

    public void setUdid(Integer udid) {
        this.udid = udid;
    }

    public String getDependencia() {
        return dependencia;
    }

    public void setDependencia(String dependencia) {
        this.dependencia = dependencia;
    }

    public Integer getMonto1() {
        return monto1;
    }

    public void setMonto1(Integer monto1) {
        this.monto1 = monto1;
    }

    public String getContrato() {
        return contrato;
    }

    public void setContrato(String contrato) {
        this.contrato = contrato;
    }

    public String getDescargo() {
        return descargo;
    }

    public void setDescargo(String descargo) {
        this.descargo = descargo;
    }

    public Integer getIdcargo() {
        return idcargo;
    }

    public void setIdcargo(Integer idcargo) {
        this.idcargo = idcargo;
    }

    public String getFechini() {
        return fechini;
    }

    public void setFechini(String fechini) {
        this.fechini = fechini;
    }

    public String getFechfin() {
        return fechfin;
    }

    public void setFechfin(String fechfin) {
        this.fechfin = fechfin;
    }

    public String getDestipo() {
        return destipo;
    }

    public void setDestipo(String destipo) {
        this.destipo = destipo;
    }
}
