package edu.quipu.rrhh.services;

import edu.quipu.rrhh.models.*;
import java.util.List;

public interface ResolucionesService {
    public List<Resolucion> todasResoluciones();
    public List<tipoResolucion> verTiposResol();
    public List<Dependencia> verDependenciasPorCod(char codTr);
    public List<Motivo> verTiposMotivo();
    public void saveResolucion(Resolucion resolu);
    public List<Resolucion> buscarAnio(String anio);
    public List<TrabajadorResolucion> trabaPorResol(String resol);
    public void addServidor(TrabajadorResolucion traba);


    public void eliminarResolucionTrabajador(String resol, String dni,int numser);
    public void updateResolucion(Resolucion reso);
    public List<TrabajadorResolucion> auxDniServidor(String reso);
    public void addMotivoTrabajador(MotivoTrabajador motivoTrabajador);
    public List<Motivo> mostrarMotivoTrabajador(String serCod) ;
    public void borrarMotivo(String serCod, String nroMoti);
    public void borrarServidorConMotivo(String dni,String resol,int numser,String cod_motivo);
    public void actualizarResoServi(String nuevaR, String resol);
    public  void actualizarResoMoti(String nuevaR, String resol);

    List<Resolucion> buscarresolxfechas(String inicio, String fin);

    List<Resolucion> validarExisteResolucion(String restranum);

    void removeResolucion(String numero);

    void removeAsociados(String numero);

    List<TrabajadorResolucion> contartraconmot(String resol, String dni, int numser);

    List<Resoluciones> buscar_resoluciones_asociados(String codigo, int numserest);

    void addMotivoTrab(TrabajadorResolucion traba);

    void updateMotivoTraba(MotivoTrabajador editMotivo);

    public List<Resolucion> validarUpdateResol(String idResol, String descResol);
}
