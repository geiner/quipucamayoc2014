package edu.quipu.rrhh.services.implement;


import edu.quipu.rrhh.models.Contrato;
import edu.quipu.rrhh.models.EstadoCondicion;
import edu.quipu.rrhh.models.Hist_servidor;
import edu.quipu.rrhh.models.Servidor;
import edu.quipu.rrhh.persistence.EstadoCondicionMapper;
import edu.quipu.rrhh.services.EstadoCondicionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.*;
import java.util.List;

@Service
public class EstadoCondicionServiceImpl implements EstadoCondicionService{

    @Autowired
    EstadoCondicionMapper estadoCondicionMapper;

    @Override
    public List<Hist_servidor> listarServidores(){
        return  estadoCondicionMapper.listarServidores();
    }

    @Override
    public List<EstadoCondicion> categoria() {
        return estadoCondicionMapper.categoria();
    }

    @Override
    public List<EstadoCondicion> categoriaprof(Integer valor1){
        List<EstadoCondicion> estadoCondi = estadoCondicionMapper.categoriaprof(valor1);
        return estadoCondi;
    }


    @Override
    public List<EstadoCondicion> estado() {
        return estadoCondicionMapper.estado();
    }

    @Override
    public List<EstadoCondicion> tipo() {
        return estadoCondicionMapper.tipo();
    }

    /*@Override
    public List<EstadoCondicion> dependencia() {
        return estadoCondicionMapper.dependencia();
    }*/

    @Override
    public List<EstadoCondicion> regimen() {
        return estadoCondicionMapper.regimen();
    }

    @Override
    public List<EstadoCondicion> entidad() {
        return estadoCondicionMapper.entidad();
    }

    @Override
    public List<EstadoCondicion> estadoafp() {
        return estadoCondicionMapper.estadoafp();
    }

    @Override
    public List<EstadoCondicion> tipopago(){
        return estadoCondicionMapper.tipopago();
    }

    @Override
    public  List<EstadoCondicion> condpla(){
        return estadoCondicionMapper.condpla();
    }

    @Override
    public List<Hist_servidor> buscarcondlab(String cod, Integer numest) {
        List<Hist_servidor> estadoCond=estadoCondicionMapper.buscarcondlab(cod, numest);
        return estadoCond;
    }
    @Override
    public List<EstadoCondicion>  buscarcondaseg(String cod, Integer numest){
        List<EstadoCondicion> estadous=estadoCondicionMapper.buscarcondaseg(cod, numest);
        return estadous;
    }

    @Override
    public List<EstadoCondicion>  buscardep(String cod, Integer numest){
        List<EstadoCondicion> estadodep=estadoCondicionMapper.buscardep(cod,numest);
        return estadodep;
    }

    @Override
    public List<EstadoCondicion> buscarbanco(String cod, Integer numest){
        List<EstadoCondicion> estadoBanc=estadoCondicionMapper.buscarbanco(cod, numest);
        return estadoBanc;
    }

    @Override
    public List<EstadoCondicion> buscarcondpla(String cod, Integer numest){
        List<EstadoCondicion> estadocondpla=estadoCondicionMapper.buscarcondpla(cod,numest);
        return estadocondpla;
    }


    @Override
    public List<EstadoCondicion> listar_resolucion(String codigo, Integer numserest){
        List<EstadoCondicion> estadoResol=estadoCondicionMapper.listar_resolucion(codigo, numserest);
        return estadoResol;
    }

    @Override
    public void addHist_lab(String cod, String numserest, String numres, Integer codest,Integer codtip,Integer codGen,String codcateg){
        estadoCondicionMapper.addHist_lab(cod,numserest,numres,codest,codtip,codGen,codcateg);
    }
    @Override
    public void addHist_dep(String codigo, String estadoTrabaActual, String numResol, String codDep, String codCes){
        estadoCondicionMapper.addHist_dep(codigo,estadoTrabaActual,numResol,codDep,codCes);
    }

    @Override
    public String getCodCes(String codGenDep) {
        List<Hist_servidor> codCesan =estadoCondicionMapper.getCodCes(codGenDep);

         System.out.print("Valor de codCes: "+codCesan.get(0).getCodCes());
        return  codCesan.get(0).getCodCes();
    }

    @Override
    public List<Contrato> listar_contratos(String codigo) {
        List<Contrato> listContratos=estadoCondicionMapper.listar_contratos(codigo);
        return listContratos;
    }

    @Override
    public void addAlertPend(String codigo, Integer numserest, Integer tipalert, String email){
        estadoCondicionMapper.addalertpend(codigo,numserest,tipalert,email);
    }

    @Override
    public void addCondAseg(String codigo, Integer numserest, String numres1, Integer regpensionario, String numsispen, Integer entasegurado, Integer estadoafp){
        estadoCondicionMapper.addconaseg(codigo, numserest, numres1, regpensionario, numsispen, entasegurado, estadoafp);
    }



    @Override
    public void addPagoBanco(String codigo, Integer numserest, String ctabanco, Integer codtippago){
        estadoCondicionMapper.addpagobanco(codigo, numserest, ctabanco, codtippago);
    }

    @Override
    public void addCondPla(String codigo, Integer numserest, String numres1, Integer codcond, String fechcese, String obser){
        estadoCondicionMapper.addcondpla(codigo,numserest,numres1,codcond,fechcese,obser);
    }


}
