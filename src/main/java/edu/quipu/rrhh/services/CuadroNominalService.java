package edu.quipu.rrhh.services;

import edu.quipu.rrhh.models.*;

import java.util.List;


public interface CuadroNominalService {



    List<Servidor> servidoresPorDepen(String codDep);


    List<PlazaCAP> plazasPorDepen(String codDep, Integer anioPlaza);

    /*
    List<PlazaCAP> plazasPorDepen(String codDep);

    */

    public void addPlazaNominal(AsigCuadroNominal obj);

    public void updateCuadroNominalOcupado(AsigCuadroNominal obj);

    //**********************************************

    public void updateEstadoPlaza(AsigCuadroNominal obj);


    //***********************************************

    public void deleteAsignacionPlaza(AsigCuadroNominal obj);

    public void updateCuadroNominalVacante(AsigCuadroNominal obj);


    //public void deleteItemsHistorialPlaza(AsigCuadroNominal obj);


    List<ModalidadAsignacion> allModalidad();


    List<Origen> obtenerDependenciaUsuario(String emailUsuario);


    List<PlazaCAP> añoPlazas();

    List<EncabezadoDepySubDep> obtenerDepySubDep(String codDep);

}
