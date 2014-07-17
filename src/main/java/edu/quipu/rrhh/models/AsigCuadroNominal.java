package edu.quipu.rrhh.models;

/**
 * Created by DESARROLLO on 30/04/2014.
 */
public class AsigCuadroNominal {

    private  Integer  codPlaza;//
    private  String codServidor;//
    private  Integer  numserest;//
    private  String fechIng;//
    private  String fechSal;//
    private  Integer modSer;//
    private  Integer estPlaza;



    public Integer getCodPlaza() {
        return codPlaza;
    }

    public void setCodPlaza(Integer codPlaza) {
        this.codPlaza = codPlaza;
    }

    public String getCodServidor() {
        return codServidor;
    }

    public void setCodServidor(String codServidor) {
        this.codServidor = codServidor;
    }

    public String getFechSal() {
        return fechSal;
    }

    public void setFechSal(String fechSal) {
        this.fechSal = fechSal;
    }

    public String getFechIng() {
        return fechIng;
    }

    public void setFechIng(String fechIng) {
        this.fechIng = fechIng;
    }

    public Integer getModSer() {
        return modSer;
    }

    public void setModSer(Integer modSer) {
        this.modSer = modSer;
    }


    public Integer getNumserest() {
        return numserest;
    }

    public void setNumserest(Integer numserest) {
        this.numserest = numserest;
    }


    public Integer getEstPlaza() {
        return estPlaza;
    }

    public void setEstPlaza(Integer estPlaza) {
        this.estPlaza = estPlaza;
    }
}
