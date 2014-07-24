package edu.quipu.rrhh.services;

import edu.quipu.rrhh.models.*;

import java.util.List;

public interface EstadoCondicionService {

    List<Hist_servidor> listarServidores();
    List<EstadoCondicion> categoria();
    List<EstadoCondicion> categoriaprof(Integer valor1);
    List<EstadoCondicion> estado();
    List<EstadoCondicion> tipo();
    //List<EstadoCondicion> dependencia();
    List<EstadoCondicion> regimen();
    List<EstadoCondicion> entidad();
    List<EstadoCondicion> estadoafp();
    List<EstadoCondicion> tipopago();
    List<EstadoCondicion> condpla();
    List<Hist_servidor> buscarcondlab(String cod, Integer numest);
    List<EstadoCondicion>  buscarcondaseg(String cod, Integer numest) ;
    List<EstadoCondicion>  buscardep(String cod, Integer numest);
    List<EstadoCondicion>  buscarbanco(String cod, Integer numest);
    List<EstadoCondicion> buscarcondpla(String cod, Integer numest);
    List<EstadoCondicion> listar_resolucion(String codigo, Integer numserest);
    public void addHist_lab(String cod, String numserest, String numres, Integer codest,Integer codtip,Integer codGen,String codcateg);


    public void addAlertPend(String codigo, Integer numserest, Integer tipalert, String email);
    public void addCondAseg(String codigo, Integer numserest, String numres1, Integer regpensionario, String numsispen, Integer entasegurado, Integer estadoafp);

    public void addPagoBanco(String codigo, Integer numserest, String ctabanco, Integer codtippago);
    public void addCondPla(String codigo, String numserest, String numResol, Integer condPlani, String fechcese, String obser);


    public void addHist_dep(String codigo, String estadoTrabaActual, String numResol, String codDep, String codCes);

    public String getCodCes(String codGenDep);

    List<Contrato> listar_contratos(String codigo);
}
