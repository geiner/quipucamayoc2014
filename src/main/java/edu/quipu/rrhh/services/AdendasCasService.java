package edu.quipu.rrhh.services;

import edu.quipu.rrhh.models.Servidor;

import java.util.List;

public interface AdendasCasService {

    List<Servidor> traer(Servidor servidor);

    List<Servidor> listarContratos(Integer udid);

    /*List<Servidor> listarServidoresCas();
    List<CargoCAS> listarCargos();
    List<PlazaCAS> listarPlazas(Integer udid);
    public void updatePlazas(Integer id);
    void insertContAden(PlazaCAS plazaCAS);
    public void insertPlazasHistorial(Integer id);
    List<Servidor> verItem(Servidor servidor);
    void updateServidorItem(Servidor servidor);
    void insertServidorItem(Servidor servidor);*/

}
