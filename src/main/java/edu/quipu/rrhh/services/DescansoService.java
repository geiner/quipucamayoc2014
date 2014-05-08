package edu.quipu.rrhh.services;

import edu.quipu.rrhh.models.DescansoMedico;

import java.util.List;


public interface DescansoService {
    void addDescanso(DescansoMedico descansomedico);

    List<DescansoMedico> buscarDescansos(String codigo, Integer numserest);

    void removeDescMed(Integer idDesc);

    void updateDescMed(DescansoMedico descMed);
}
