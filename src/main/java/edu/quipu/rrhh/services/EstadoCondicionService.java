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
    List<EstadoCondicion> entidad(Integer regPen);
    List<EstadoCondicion> estadoafp();
    List<EstadoCondicion> tipopago();
    List<EstadoCondicion> condpla();
    List<Hist_servidor> buscarcondlab(String cod, Integer numest);
    List<EstadoCondicion>  buscarcondaseg(String cod, Integer numest) ;
    List<EstadoCondicion>  buscardep(String cod, Integer numest);
    List<Hist_servidor>  buscarbanco(String cod, Integer numest);
    List<EstadoCondicion> buscarcondpla(String cod, Integer numest);
    List<EstadoCondicion> listar_resolucion(String codigo, Integer numserest);
    public void addHist_lab(String cod, String numserest, String numres, Integer codest,Integer codtip,Integer codGen,String codcateg);


    public void addAlertPend(String codigo, Integer numserest, Integer tipalert, String email);
    public void addCondAseg(String codigo, String numserest, String numResol, Integer regPen, String numPen, Integer entAseg, Integer estAFP);

    public void addPagoBanco(String codigo,String  numserest, Integer codPago,String numCuenta,String susDoc);
    public void addCondPla(String codigo, String numserest, String numResol, Integer condPlani, String fechcese, String obser);


    public void addHist_dep(String codigo, String estadoTrabaActual, String numResol, String codDep, String codCes);

    public String getCodCes(String codGenDep);

    List<Contrato> listar_contratos(String codigo);
}
