package edu.quipu.rrhh.controllers;

import edu.quipu.rrhh.services.EstadoCondicionService;
import edu.quipu.rrhh.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(value = "/api/estado_condicion")
public class EstadoCondicionController {

   @Autowired
    EstadoCondicionService estadoCondicionService;

    //Listar a todos los trabajadores
    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/listar")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<Hist_servidor> listarServidores(){

        System.out.println("Listar !!!!");
        return estadoCondicionService.listarServidores();
    }

    //Para el combo de Categoria
    @RequestMapping(method = RequestMethod.GET,produces ="application/json",value = "/categoria")
    @ResponseBody
    public List<EstadoCondicion> categoria(){
        return estadoCondicionService.categoria();
    }

    //Para el combo de subcategorias
    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/categoria_prof/{valor1}")
    @ResponseBody
    public List<EstadoCondicion> categoriap(@PathVariable(value = "valor1") Integer valor1){
      //  String aux=valor+"%";  usar este aux para like en las querys
        System.out.print("id "+valor1);
      List<EstadoCondicion> estadoCondi = estadoCondicionService.categoriaprof(valor1); //en vez de valor1 y valor2 iria aux
        return estadoCondi;
    }



    //Para el combo de estado del trabajador
    @RequestMapping(method = RequestMethod.GET,produces = "application/json", value = "/estado")
    @ResponseBody
    public List<EstadoCondicion> estado(){
        return estadoCondicionService.estado();
    }

    //Para el combo de tipo del trabajador
    @RequestMapping(method = RequestMethod.GET,produces = "application/json", value = "/tipo")
    @ResponseBody
    public List<EstadoCondicion> tipo(){
        return estadoCondicionService.tipo();
    }

    /*Para el combo de las dependencias
    @RequestMapping(method = RequestMethod.GET,produces = "application/json", value = "/dependencia")
    @ResponseBody
    public List<EstadoCondicion> dependencia(){
        return estadoCondicionService.dependencia();
    } */

    //Para el combo regimen pensionario
    @RequestMapping(method = RequestMethod.GET,produces = "application/json", value = "/regimen")
    @ResponseBody
    public List<EstadoCondicion> regimen(){
        return estadoCondicionService.regimen();
    }

    //Para el combo regimen entidad aseguradora
    @RequestMapping(method = RequestMethod.GET,produces = "application/json", value = "/entidad/{regPen}")
    @ResponseBody
    public List<EstadoCondicion> entidad(@PathVariable(value="regPen") Integer regPen){
        return estadoCondicionService.entidad(regPen);
    }

    //Para el combo regimen estado afp
    @RequestMapping(method = RequestMethod.GET,produces = "application/json", value = "/estadoafp")
    @ResponseBody
    public List<EstadoCondicion> estadoafp(){
        return estadoCondicionService.estadoafp();
    }

    //Para el combo tipo de pago
    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/tipopago")
    @ResponseBody
    public List<EstadoCondicion> tipopago(){
        return estadoCondicionService.tipopago();
    }

    //Para el combo condicion planilla
    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/condpla")
    @ResponseBody
    public List<EstadoCondicion> condpla(){
        return estadoCondicionService.condpla();
    }

    //Para la tabla condicion laboral
    //Obsevacion: Aun se necesite variables dinamicas...usar List ... y no el otro metodo..
    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/condlab/{cod}/{numest}")
    @ResponseBody
    public List<Hist_servidor> findall(@PathVariable(value="cod") String cod, @PathVariable(value="numest") Integer numest) {
        //System.out.println("controlador back");

        while(cod.length()<10){
            cod=cod+" ";
        }
        List<Hist_servidor> estadoCond = estadoCondicionService.buscarcondlab(cod, numest);
        return   estadoCond;
    }

    //Para la tabla condicion asegurado
    //Obsevacion: Aunque se necesite variables dinamicas...usar List ... y no el otro metodo..
    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/condaseg/{cod}/{numest}")
    @ResponseBody
    public List<EstadoCondicion> asegurado(@PathVariable(value="cod") String cod, @PathVariable(value="numest") Integer numest) {

        while(cod.length()<10){
            cod=cod+" ";
        }
        List<EstadoCondicion> estadoCond = estadoCondicionService.buscarcondaseg(cod, numest);
        return   estadoCond;
    }

    //Para la tabla de dependencias
    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/dependencia/{cod}/{numest}")
    @ResponseBody
    public List<EstadoCondicion> dependencias(@PathVariable(value="cod") String cod, @PathVariable(value="numest") Integer numest) {
        while(cod.length()<10){
            cod=cod+" ";
        }
        System.out.println("codido:"+cod+" numest: "+numest);
        List<EstadoCondicion> estadodep = estadoCondicionService.buscardep(cod, numest);
        return   estadodep;
    }

    //Para la tabla hist banco
    //Observacion: aunque se necesite variables dinamicas...usar List ... y no el otro metodo..
    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value="/pagobanco/{cod}/{numest}")
    @ResponseBody
    public List<EstadoCondicion> pago(@PathVariable(value = "cod") String cod, @PathVariable(value = "numest") Integer numest){

        while(cod.length()<10){
            cod=cod+" ";
        }
        List<EstadoCondicion> estadoCond = estadoCondicionService.buscarbanco(cod, numest);
        return estadoCond;
    }
    //Para la tabla condicion planilla
    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value="/planilla/{cod}/{numest}")
    @ResponseBody
    public List<EstadoCondicion> planilla(@PathVariable(value = "cod") String cod, @PathVariable(value = "numest") Integer numest){

        while(cod.length()<10){
            cod=cod+" ";
        }
        List<EstadoCondicion> estadoCondpla = estadoCondicionService.buscarcondpla(cod, numest);
        return estadoCondpla;
    }

    //Para listar las resoluciones
    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/listar_resol/{codigo}/{numserest}")
    @ResponseBody
    public List<EstadoCondicion> estadoResol(@PathVariable(value = "codigo") String codigo, @PathVariable(value = "numserest") Integer numserest){
        while(codigo.length()<10){
            codigo=codigo+" ";
        }
        List<EstadoCondicion> estadoresol = estadoCondicionService.listar_resolucion(codigo, numserest);
        return estadoresol;
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/listar_contratos/{codigo}")
    @ResponseBody
    public List<Contrato> listContratos(@PathVariable(value = "codigo") String codigo){
        while(codigo.length()<10){
            codigo=codigo+" ";
        }
        List<Contrato> listContratos = estadoCondicionService.listar_contratos(codigo);
        return listContratos;
    }

    //Para insertar en la tabla condicion laboral
    @RequestMapping(method = RequestMethod.POST, consumes ="application/json", produces = "application/json", value = "/addcondlab")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void addCondLab(@RequestBody Hist_servidor hist_serv){
        estadoCondicionService.addHist_lab(hist_serv.getCodigo(),hist_serv.getEstadoTrabaActual(),hist_serv.getNumResol(),hist_serv.getCodEs(),hist_serv.getCodEst(),
                hist_serv.getCodGen(),hist_serv.getCodCateg());

       // estadoCondicionService.addHist_dep(hist_serv.getCodigo(),hist_serv.getEstadoTrabaActual(),hist_serv.getNumResol(),hist_serv.getCodDep(),hist_serv.getCodCes());
    }

    //Para insertar en la tabla condicion laboral
    @RequestMapping(method = RequestMethod.POST, consumes ="application/json", produces = "application/json", value = "/addalertpend")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void addAlertPend(@RequestBody EstadoCondicion estadoCondicion){
        System.out.println(estadoCondicion.getCodigo()+" val "+estadoCondicion.getNumserest()+" val "+estadoCondicion.getTipalert()+" val "+estadoCondicion.getEmail());
        estadoCondicionService.addAlertPend(estadoCondicion.getCodigo(), estadoCondicion.getNumserest(),estadoCondicion.getTipalert(),estadoCondicion.getEmail());
    }

    //Para insertar en la tabla condicion del asegurado
    @RequestMapping(method = RequestMethod.POST, consumes ="application/json", produces = "application/json", value = "/addcondaseg")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void addCondAseg(@RequestBody Hist_servidor estCond){
        estadoCondicionService.addCondAseg(estCond.getCodigo(), estCond.getEstadoTrabaActual(),estCond.getNumResol(),
                estCond.getIdregPen(),estCond.getNumPensiones(),estCond.getIdentAseg(),estCond.getIdestAFP());

    }

     //Para insertar en la tabla dependencias
     @RequestMapping(method = RequestMethod.POST, consumes ="application/json", produces = "application/json", value = "/adddep")
     @ResponseStatus(HttpStatus.CREATED)
     @ResponseBody
     public void adddependencias(@RequestBody Hist_servidor hist_serv){
         System.out.print(hist_serv.getCodigo());

         //String cod_Ces=hist_serv.getCodGenDep();
         String cod_Ces=estadoCondicionService.getCodCes(hist_serv.getCodGenDep());

         estadoCondicionService.addHist_dep(hist_serv.getCodigo(),hist_serv.getEstadoTrabaActual(),hist_serv.getNumResol(),hist_serv.getCodDep(),cod_Ces);

     }

    //Para insertar en la tabla tb_hist_banco
    @RequestMapping(method = RequestMethod.POST, consumes = "application/json", produces = "application/json", value = "/addpagobanco")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void addPagoBanco(@RequestBody EstadoCondicion estadoCondicion){
        estadoCondicionService.addPagoBanco(estadoCondicion.getCodigo(), estadoCondicion.getNumserest(), estadoCondicion.getCtabanco(), estadoCondicion.getCodtippago());
    }

    //Para insertar en la tabla tb_hist_cond_pla
    @RequestMapping(method = RequestMethod.POST, consumes = "application/json", produces = "application/json", value = "/addcondpla")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void addCondPla(@RequestBody Hist_servidor estadoCondicion){

        System.out.print("Numero de Resol:"+estadoCondicion.getNumResol());
        estadoCondicionService.addCondPla(estadoCondicion.getCodigo(), estadoCondicion.getEstadoTrabaActual(),estadoCondicion.getNumResol(),
                estadoCondicion.getCodicPlani(), estadoCondicion.getFechaCese(),estadoCondicion.getObsPlani());
    }

}
