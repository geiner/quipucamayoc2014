package edu.quipu.rrhh.models;

/**
 * Created by DESARROLLO on 29/05/2014.
 */
public class HistorialPlaza {

    private  Integer idHistorialPlaza;
    private  Integer codPlaza;
    private  String fechaRotacion;
    private  String depActual;
    private  String nroDocu;


    public Integer getIdHistorialPlaza() {
        return idHistorialPlaza;
    }

    public void setIdHistorialPlaza(Integer idHistorialPlaza) {
        this.idHistorialPlaza = idHistorialPlaza;
    }

    public Integer getCodPlaza() {
        return codPlaza;
    }

    public void setCodPlaza(Integer codPlaza) {
        this.codPlaza = codPlaza;
    }

    public String getFechaRotacion() {
        return fechaRotacion;
    }

    public void setFechaRotacion(String fechaRotacion) {
        this.fechaRotacion = fechaRotacion;
    }


    public String getDepActual() {
        return depActual;
    }

    public void setDepActual(String depActual) {
        this.depActual = depActual;
    }

    public String getNroDocu() {
        return nroDocu;
    }

    public void setNroDocu(String nroDocu) {
        this.nroDocu = nroDocu;
    }
}
