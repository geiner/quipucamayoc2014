package edu.quipu.rrhh.models;

/**
 * Created with IntelliJ IDEA.
 * User: GEINNER
 * Date: 15/11/13
 * Time: 08:51 AM
 * To change this template use File | Settings | File Templates.
 */
public class Resoluciones {

    private Integer res_seq_tmp_serv;
    private String res_id;
    private String res_fecha;
    private String res_fecha_resol_dfl;
    private String res_fecha_ejec;
    private String res_desc1;
    private String res_desc2;
    private String res_tipo_cod;
    private String res_tipo_desc;
    private Integer tiemp_serv_id;
    private String res_mot_cod;
    private String res_mot_desc;
    private String res_fecha_fin;
    private Integer res_anio;
    private Integer res_mes;
    private Integer res_dia;
    private String res_codser;
    private String res_num_serest;

    //para servidores asociados

    private String resid;
    private String frini;
    private String frfin;
    private String tipo_re;
    private String mot_trab;
    private String fecinimot;
    private String fecfinmot;
    private String desmot;
    //para reportes
    private String codigo;
    private String numserest;
    private String nom_serv;
    private String cod_serv;
    private String usuario;

    public String getFrini() {
        return frini;
    }

    public void setFrini(String frini) {
        this.frini = frini;
    }

    public String getFrfin() {
        return frfin;
    }

    public void setFrfin(String frfin) {
        this.frfin = frfin;
    }

    public String getTipo_re() {
        return tipo_re;
    }

    public void setTipo_re(String tipo_re) {
        this.tipo_re = tipo_re;
    }

    public String getMot_trab() {
        return mot_trab;
    }

    public void setMot_trab(String mot_trab) {
        this.mot_trab = mot_trab;
    }

    public String getFecinimot() {
        return fecinimot;
    }

    public void setFecinimot(String fecinimot) {
        this.fecinimot = fecinimot;
    }

    public String getFecfinmot() {
        return fecfinmot;
    }

    public void setFecfinmot(String fecfinmot) {
        this.fecfinmot = fecfinmot;
    }

    public String getDesmot() {
        return desmot;
    }

    public void setDesmot(String desmot) {
        this.desmot = desmot;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNumserest() {
        return numserest;
    }

    public void setNumserest(String numserest) {
        this.numserest = numserest;
    }

    public String getNom_serv() {
        return nom_serv;
    }

    public void setNom_serv(String nom_serv) {
        this.nom_serv = nom_serv;
    }

    public String getCod_serv() {
        return cod_serv;
    }

    public void setCod_serv(String cod_serv) {
        this.cod_serv = cod_serv;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getResid() {
        return resid;
    }

    public void setResid(String resid) {
        this.resid = resid;
    }

    public String getRes_fecha_resol_dfl() {
        return res_fecha_resol_dfl;
    }
    public Integer getTiemp_serv_id() {
        return tiemp_serv_id;
    }

    public void setTiemp_serv_id(Integer tiemp_serv_id) {
        this.tiemp_serv_id = tiemp_serv_id;
    }

    public void setRes_fecha_resol_dfl(String res_fecha_resol_dfl) {
        this.res_fecha_resol_dfl = res_fecha_resol_dfl;
    }

    public Integer getRes_seq_tmp_serv() {
        return res_seq_tmp_serv;
    }

    public void setRes_seq_tmp_serv(Integer res_seq_tmp_serv) {
        this.res_seq_tmp_serv = res_seq_tmp_serv;
    }

    public Integer getRes_anio() {
        return res_anio;
    }

    public void setRes_anio(Integer res_anio) {
        this.res_anio = res_anio;
    }

    public Integer getRes_mes() {
        return res_mes;
    }

    public void setRes_mes(Integer res_mes) {
        this.res_mes = res_mes;
    }

    public Integer getRes_dia() {
        return res_dia;
    }

    public void setRes_dia(Integer res_dia) {
        this.res_dia = res_dia;
    }

    public String getRes_codser() {
        return res_codser;
    }

    public void setRes_codser(String res_codser) {
        this.res_codser = res_codser;
    }

    public String getRes_num_serest() {
        return res_num_serest;
    }

    public void setRes_num_serest(String res_num_serest) {
        this.res_num_serest = res_num_serest;
    }

    public String getRes_tipo_desc() {
        return res_tipo_desc;
    }

    public void setRes_tipo_desc(String res_tipo_desc) {
        this.res_tipo_desc = res_tipo_desc;
    }

    public String getRes_id() {
        return res_id;
    }

    public void setRes_id(String res_id) {
        this.res_id = res_id;
    }

    public String getRes_fecha() {
        return res_fecha;
    }

    public void setRes_fecha(String res_fecha) {
        this.res_fecha = res_fecha;
    }

    public String getRes_fecha_ejec() {
        return res_fecha_ejec;
    }

    public void setRes_fecha_ejec(String res_fecha_ejec) {
        this.res_fecha_ejec = res_fecha_ejec;
    }

    public String getRes_desc1() {
        return res_desc1;
    }

    public void setRes_desc1(String res_desc1) {
        this.res_desc1 = res_desc1;
    }

    public String getRes_desc2() {
        return res_desc2;
    }

    public void setRes_desc2(String res_desc2) {
        this.res_desc2 = res_desc2;
    }

    public String getRes_tipo_cod() {
        return res_tipo_cod;
    }

    public void setRes_tipo_cod(String res_tipo_cod) {
        this.res_tipo_cod = res_tipo_cod;
    }

    public String getRes_mot_cod() {
        return res_mot_cod;
    }

    public void setRes_mot_cod(String res_mot_cod) {
        this.res_mot_cod = res_mot_cod;
    }

    public String getRes_mot_desc() {
        return res_mot_desc;
    }

    public void setRes_mot_desc(String res_mot_desc) {
        this.res_mot_desc = res_mot_desc;
    }

    public String getRes_fecha_fin() {
        return res_fecha_fin;
    }

    public void setRes_fecha_fin(String res_fecha_fin) {
        this.res_fecha_fin = res_fecha_fin;
    }
}
