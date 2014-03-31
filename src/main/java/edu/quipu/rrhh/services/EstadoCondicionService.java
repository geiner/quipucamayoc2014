package edu.quipu.rrhh.services;

import edu.quipu.rrhh.models.EstadoCondicion;

import java.util.List;

public interface EstadoCondicionService {

    List<EstadoCondicion> listarServidores();
    List<EstadoCondicion> categoria();
    List<EstadoCondicion> categoriaprof(Integer valor1, Integer valor2);
    List<EstadoCondicion> estado();
    List<EstadoCondicion> tipo();
    //List<EstadoCondicion> dependencia();
    List<EstadoCondicion> regimen();
    List<EstadoCondicion> entidad();
    List<EstadoCondicion> estadoafp();
    List<EstadoCondicion> tipopago();
    List<EstadoCondicion> condpla();
    List<EstadoCondicion> buscarcondlab(String cod, Integer numest);
    List<EstadoCondicion>  buscarcondaseg(String cod, Integer numest) ;
    List<EstadoCondicion>  buscardep(String cod, Integer numest);
    List<EstadoCondicion>  buscarbanco(String cod, Integer numest);
    List<EstadoCondicion> buscarcondpla(String cod, Integer numest);
    List<EstadoCondicion> listar_resolucion(String codigo, Integer numserest);
    public void addCondLab(String cod, Integer numserest, String numres, Integer codest, String ccdcat, Integer codtip);
    public void addAlertPend(String codigo, Integer numserest, Integer tipalert, String email);
    public void addCondAseg(String codigo, Integer numserest, String numres1, Integer regpensionario, String numsispen, Integer entasegurado, Integer estadoafp);
    public void adddep(String codigo, Integer numserest, String numres1, String udcod);
    public void addPagoBanco(String codigo, Integer numserest, String ctabanco, Integer codtippago);
    public void addCondPla(String codigo, Integer numserest, String numres1, Integer codcond, String fechcese, String obser);


}
