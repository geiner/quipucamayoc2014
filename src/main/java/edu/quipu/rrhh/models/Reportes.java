package edu.quipu.rrhh.models;

import java.io.Serializable;

public class Reportes implements Serializable {

    private static final long serialVersionUID = 3159033005313632895L;
    private Integer codtipo;
    private String destipo;
    private Integer codest;
    private String desest;
    private String codcat;
    private String descat;
    private Integer  codregpen;
    private String desregpen;
    private Integer codtipago;
    private String desctipago;
    private String codces;
    private String descces;
    //parte carlos
    private String cat;
    private String dep;
    private String reg;
    private String entAseg;

    //parte de fernando tabla informacion


    private String tip_doc;
    private String nu_doc;
    private String co_serv;
    private String ap_pat;
    private String  ap_mat;
    private String nom;
    private Integer  eda;
    private String sex;
    private String ti_ser;
    private String estad;
    private String  cate;
    private String reg_pe;
    private String ti_pag;
    private String dep_serv;
    private  String ingre_unmsm;

    public String getTip_doc() {
        return tip_doc;
    }

    public void setTip_doc(String tip_doc) {
        this.tip_doc = tip_doc;
    }

    public String getAp_pat() {
        return ap_pat;
    }

    public void setAp_pat(String ap_pat) {
        this.ap_pat = ap_pat;
    }

    public String getCo_serv() {
        return co_serv;
    }

    public void setCo_serv(String co_serv) {
        this.co_serv = co_serv;
    }

    public String getNu_doc() {
        return nu_doc;
    }

    public void setNu_doc(String nu_doc) {
        this.nu_doc = nu_doc;
    }

    public String getAp_mat() {
        return ap_mat;
    }

    public void setAp_mat(String ap_mat) {
        this.ap_mat = ap_mat;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Integer getEda() {
        return eda;
    }

    public void setEda(Integer eda) {
        this.eda = eda;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getTi_ser() {
        return ti_ser;
    }

    public void setTi_ser(String ti_ser) {
        this.ti_ser = ti_ser;
    }

    public String getEstad() {
        return estad;
    }

    public void setEstad(String estad) {
        this.estad = estad;
    }

    public String getCate() {
        return cate;
    }

    public void setCate(String cate) {
        this.cate = cate;
    }

    public String getReg_pe() {
        return reg_pe;
    }

    public void setReg_pe(String reg_pe) {
        this.reg_pe = reg_pe;
    }

    public String getTi_pag() {
        return ti_pag;
    }

    public void setTi_pag(String ti_pag) {
        this.ti_pag = ti_pag;
    }

    public String getDep_serv() {
        return dep_serv;
    }

    public void setDep_serv(String dep_serv) {
        this.dep_serv = dep_serv;
    }

    public String getIngre_unmsm() {
        return ingre_unmsm;
    }

    public void setIngre_unmsm(String ingre_unmsm) {
        this.ingre_unmsm = ingre_unmsm;
    }







    public String getCat() {
        return cat;
    }

    public void setCat(String cat) {
        this.cat = cat;
    }

    public String getDep() {
        return dep;
    }

    public void setDep(String dep) {
        this.dep = dep;
    }

    public String getReg() {
        return reg;
    }

    public void setReg(String reg) {
        this.reg = reg;
    }

    public String getEntAseg() {
        return entAseg;
    }

    public void setEntAseg(String entAseg) {
        this.entAseg = entAseg;
    }

    //para la tabla de jean
    private String tipoDoc;
    private String numDoc;
    private String codSer;
    private String apePat;
    private String apeMat;
    private String nombre;
    private String condFech;
    private Integer mes;
    private Integer anio;
    private String est;
    private String tipSer;


    public Integer getCodtipo() {
        return codtipo;
    }

    public void setCodtipo(Integer codtipo) {
        this.codtipo = codtipo;
    }

    public String getDestipo() {
        return destipo;
    }

    public void setDestipo(String destipo) {
        this.destipo = destipo;
    }

    public Integer getCodest() {
        return codest;
    }

    public void setCodest(Integer codest) {
        this.codest = codest;
    }

    public String getDesest() {
        return desest;
    }

    public void setDesest(String desest) {
        this.desest = desest;
    }

    public String getCodcat() {
        return codcat;
    }

    public void setCodcat(String codcat) {
        this.codcat = codcat;
    }

    public String getDescat() {
        return descat;
    }

    public void setDescat(String descat) {
        this.descat = descat;
    }

    public Integer getCodregpen() {
        return codregpen;
    }

    public void setCodregpen(Integer codregpen) {
        this.codregpen = codregpen;
    }

    public String getDesregpen() {
        return desregpen;
    }

    public void setDesregpen(String desregpen) {
        this.desregpen = desregpen;
    }

    public Integer getCodtipago() {
        return codtipago;
    }

    public void setCodtipago(Integer codtipago) {
        this.codtipago = codtipago;
    }

    public String getDesctipago() {
        return desctipago;
    }

    public void setDesctipago(String desctipago) {
        this.desctipago = desctipago;
    }

    public String getCodces() {
        return codces;
    }

    public void setCodces(String codces) {
        this.codces = codces;
    }

    public String getDescces() {
        return descces;
    }

    public void setDescces(String descces) {
        this.descces = descces;
    }

    public String getTipoDoc() {
        return tipoDoc;
    }

    public void setTipoDoc(String tipoDoc) {
        this.tipoDoc = tipoDoc;
    }

    public String getNumDoc() {
        return numDoc;
    }

    public void setNumDoc(String numDoc) {
        this.numDoc = numDoc;
    }

    public String getCodSer() {
        return codSer;
    }

    public void setCodSer(String codSer) {
        this.codSer = codSer;
    }

    public String getApePat() {
        return apePat;
    }

    public void setApePat(String apePat) {
        this.apePat = apePat;
    }

    public String getApeMat() {
        return apeMat;
    }

    public void setApeMat(String apeMat) {
        this.apeMat = apeMat;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCondFech() {
        return condFech;
    }

    public void setCondFech(String condFech) {
        this.condFech = condFech;
    }

    public Integer getMes() {
        return mes;
    }

    public void setMes(Integer mes) {
        this.mes = mes;
    }

    public Integer getAnio() {
        return anio;
    }

    public void setAnio(Integer anio) {
        this.anio = anio;
    }

    public String getEst() {
        return est;
    }

    public void setEst(String est) {
        this.est = est;
    }

    public String getTipSer() {
        return tipSer;
    }

    public void setTipSer(String tipSer) {
        this.tipSer = tipSer;
    }
}
