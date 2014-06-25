package edu.quipu.rrhh.services;

import edu.quipu.rrhh.models.Origen;
import edu.quipu.rrhh.models.Unidad;

import java.util.List;

public interface UnidadService {
    boolean unidadEsFacultad(int codigoUnidad);
    Unidad findAll();

    List<Origen> buscarOrigenes(int udId);




    Unidad listarUnidadesSegunUsuario(String codDependencia, String perfil);
}
