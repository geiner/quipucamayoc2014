package edu.quipu.rrhh.services;

import edu.quipu.rrhh.models.DescansoMedico;

import java.util.List;

/**
 * Created by GEINER on 05/05/2014.
 */
public interface DescansoService {
    void addDescanso(DescansoMedico descansomedico);

    List<DescansoMedico> buscarDescansos(String codigo, Integer numserest);
}
