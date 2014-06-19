package edu.quipu.rrhh.services;

import edu.quipu.rrhh.models.AsigCuadroNominal;
import edu.quipu.rrhh.models.ModalidadAsignacion;
import edu.quipu.rrhh.models.PlazaCAP;
import edu.quipu.rrhh.models.Servidor;

import java.util.List;


public interface CuadroNominalService {



    List<Servidor> servidoresPorDepen(String codDep);

    List<PlazaCAP> plazasPorDepen(String codDep);

    public void addPlazaNominal(AsigCuadroNominal obj);

    public void updateCuadroNominalOcupado(AsigCuadroNominal obj);

    public void deleteAsignacionPlaza(AsigCuadroNominal obj);

    public void updateCuadroNominalVacante(AsigCuadroNominal obj);


    public void deleteItemsHistorialPlaza(AsigCuadroNominal obj);


    List<ModalidadAsignacion> allModalidad();



}
