package edu.quipu.rrhh.models;


import java.io.Serializable;

public class Contrato implements Serializable {
    private static final long serialVersionUID = 3159033005313632895L;

    private String numContrato;
    private Integer numAdenda;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getNumContrato() {
        return numContrato;
    }

    public void setNumContrato(String numContrato) {
        this.numContrato = numContrato;
    }

    public Integer getNumAdenda() {
        return numAdenda;
    }

    public void setNumAdenda(Integer numAdenda) {
        this.numAdenda = numAdenda;
    }
}
