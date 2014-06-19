package edu.quipu.rrhh.services;


import edu.quipu.rrhh.models.HistorialPlaza;
import edu.quipu.rrhh.models.PlazaCAP;

import java.util.List;


public interface RotacionesService {

    List<PlazaCAP> plazasAsignadasPorServidor(String codSer);

    List<HistorialPlaza> historialPlaza(String codPlaza);

    public void  eliminarHistorialPlaza(HistorialPlaza obj);

    public void addItemHistorialPlaza(HistorialPlaza obj);



}
