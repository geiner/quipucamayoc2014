package edu.quipu.rrhh.models;

public class TrabajadorResolucion {
    private static final long serialVersionUID = 3159033005313632895L;
    private String idTrabajadorResolucion;
    private String idTrabaDetalle;
    private String nombre;
    private String paterno;
    private String materno;
    private String codigo;
    private String dni;
    private String nroResol;
    private int serEstado;
    private String codAntiguo;
    private String fec_ini_mot;
    private String fec_fin_mot;
    private String nombre_motivo;
    private String desc_mot;
    private String desc_est;
    private String cod_motivo;
    private int contador;

    public String getIdTrabaDetalle() {
        return idTrabaDetalle;
    }

    public void setIdTrabaDetalle(String idTrabaDetalle) {
        this.idTrabaDetalle = idTrabaDetalle;
    }

    public String getDesc_est() {
        return desc_est;
    }

    public void setDesc_est(String desc_est) {
        this.desc_est = desc_est;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }
    public int getContador() {
        return contador;
    }

    public void setContador(int contador) {
        this.contador = contador;
    }

    public String getCod_motivo() {
        return cod_motivo;
    }

    public void setCod_motivo(String cod_motivo) {
        this.cod_motivo = cod_motivo;
    }

    public String getNombre_motivo() {
        return nombre_motivo;
    }

    public void setNombre_motivo(String nombre_motivo) {
        this.nombre_motivo = nombre_motivo;
    }

    public String getFec_ini_mot() {
        return fec_ini_mot;
    }

    public void setFec_ini_mot(String fec_ini_mot) {
        this.fec_ini_mot = fec_ini_mot;
    }

    public String getFec_fin_mot() {
        return fec_fin_mot;
    }

    public void setFec_fin_mot(String fec_fin_mot) {
        this.fec_fin_mot = fec_fin_mot;
    }

    public String getDesc_mot() {
        return desc_mot;
    }

    public void setDesc_mot(String desc_mot) {
        this.desc_mot = desc_mot;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPaterno() {
        return paterno;
    }

    public void setPaterno(String paterno) {
        this.paterno = paterno;
    }

    public String getMaterno() {
        return materno;
    }

    public void setMaterno(String materno) {
        this.materno = materno;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getNroResol() {
        return nroResol;
    }

    public void setNroResol(String nroResol) {
        this.nroResol = nroResol;
    }

    public int getSerEstado() {
        return serEstado;
    }

    public void setSerEstado(int serEstado) {
        this.serEstado = serEstado;
    }

    public String getCodAntiguo() {
        return codAntiguo;
    }

    public void setCodAntiguo(String codAntiguo) {
        this.codAntiguo = codAntiguo;
    }

    public String getIdTrabajadorResolucion() {
        return idTrabajadorResolucion;
    }

    public void setIdTrabajadorResolucion(String idTrabajadorResolucion) {
        this.idTrabajadorResolucion = idTrabajadorResolucion;
    }
}
