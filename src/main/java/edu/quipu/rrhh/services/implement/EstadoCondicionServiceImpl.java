package edu.quipu.rrhh.services.implement;


import edu.quipu.rrhh.models.Contrato;
import edu.quipu.rrhh.models.EstadoCondicion;
import edu.quipu.rrhh.models.Hist_servidor;
import edu.quipu.rrhh.persistence.EstadoCondicionMapper;
import edu.quipu.rrhh.services.EstadoCondicionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EstadoCondicionServiceImpl implements EstadoCondicionService {

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
    public List<EstadoCondicion> entidad(Integer regPen) {

        return estadoCondicionMapper.entidad(regPen);
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
    public List<Hist_servidor> buscarbanco(String cod, Integer numest){
        List<Hist_servidor> estadoBanc=estadoCondicionMapper.buscarbanco(cod, numest);
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
    public void addCondAseg(String codigo, String numserest, String numResol, Integer regPen, String numPen, Integer entAseg, Integer estAFP){
        estadoCondicionMapper.addconaseg(codigo,numserest,numResol, regPen, numPen,entAseg,estAFP);
    }



    @Override
    public void addPagoBanco(String codigo,String  numserest, Integer codPago,String numCuenta,String susDoc){
        estadoCondicionMapper.addpagobanco(codigo, numserest, codPago, numCuenta,susDoc);
    }

    @Override
    public void addCondPla(String codigo, String numserest, String numResol, Integer condPlani, String fechcese, String obser){

        estadoCondicionMapper.addcondpla(codigo,numserest,numResol,condPlani,fechcese,obser);
    }




    @Override
    public String traerContratosCAS(String serCod,Integer numSerest){
        System.out.println("service impl sercod:"+serCod+"despues");
        estadoCondicionMapper.traerContratosCAS(serCod, numSerest);
        return "";
    }

    @Override
    public void updateContrCas(String codigoCAS, Integer numSerestCAS, String fechaCeseCAS, String cese){
        System.out.println("en service impl numserest: "+codigoCAS+" CODIGO: "+numSerestCAS);
        System.out.println("en service impl cese: "+cese);
        estadoCondicionMapper.updateContrCas(codigoCAS,numSerestCAS,fechaCeseCAS, cese);
    }

    @Override
    public void updatePlazaCas(String codigoCAS, Integer numSerestCAS){
        System.out.println("");
        estadoCondicionMapper.updatePlazaCas(codigoCAS, numSerestCAS);
    }

    @Override
    public void updateServEstCas(String codigoCAS, Integer numSerestCAS, String fechaCeseCAS, Integer condPlaniCas){
        estadoCondicionMapper.updateServEstCas( codigoCAS,  numSerestCAS,fechaCeseCAS, condPlaniCas );
    }

    @Override
    public List<Hist_servidor> buscarNroContratoCas(Hist_servidor hist_servidor) {
       System.out.println("entro al service imple mostra contr cas codigo:"+hist_servidor.getCodigoCAS()+" numserest:"+hist_servidor.getNumSerestCAS());
       System.out.println("el valor de la query: "+estadoCondicionMapper.buscarNroContratoCas(hist_servidor));
        return estadoCondicionMapper.buscarNroContratoCas(hist_servidor);  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void addHistalertOk(String codigoCAS, String docSustentoCAS, Integer numSerestCAS, String tipoAlertCAS, String usuarioCAS){
   System.out.println("entro a service impl tipo alerta codigo:"+codigoCAS+" numserest:"+numSerestCAS+" tipo de alerta: "+tipoAlertCAS+" usuario: "+usuarioCAS);

      estadoCondicionMapper.addHistAlertOk(codigoCAS, docSustentoCAS, numSerestCAS, tipoAlertCAS, usuarioCAS);
    }


}
