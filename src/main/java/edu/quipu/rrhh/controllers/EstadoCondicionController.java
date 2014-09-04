package edu.quipu.rrhh.controllers;

import edu.quipu.rrhh.models.Contrato;
import edu.quipu.rrhh.models.EstadoCondicion;
import edu.quipu.rrhh.models.Hist_servidor;
import edu.quipu.rrhh.services.EstadoCondicionService;
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
    public List<Hist_servidor> pago(@PathVariable(value = "cod") String cod, @PathVariable(value = "numest") Integer numest){

        while(cod.length()<10){
            cod=cod+" ";
        }
        List<Hist_servidor> estadoCond = estadoCondicionService.buscarbanco(cod, numest);
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
    public void addPagoBanco(@RequestBody Hist_servidor hist_serv){
        estadoCondicionService.addPagoBanco(hist_serv.getCodigo(),hist_serv.getEstadoTrabaActual(),hist_serv.getCodPago(),hist_serv.getCtaBanco(),hist_serv.getSusDoc());
    }

    //Para insertar en la tabla tb_hist_cond_pla
    @RequestMapping(method = RequestMethod.POST, consumes = "application/json", produces = "application/json", value = "/addcondpla")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void addCondPla(@RequestBody Hist_servidor estadoCondicion){

        System.out.print("Numero de Resol:"+estadoCondicion.getNumResol()+" codigo:"+estadoCondicion.getCodigo()+" numserest:"+estadoCondicion.getEstadoTrabaActual()+
        "condicion en planilla: "+estadoCondicion.getCodicPlani()+" fecha: "+estadoCondicion.getFechaCese()+" obser:"+estadoCondicion.getObsPlani());
        estadoCondicionService.addCondPla(estadoCondicion.getCodigo(), estadoCondicion.getEstadoTrabaActual(),estadoCondicion.getNumResol(),
                estadoCondicion.getCodicPlani(), estadoCondicion.getFechaCese(),estadoCondicion.getObsPlani());
    }

       //parte de jean////////////////////////////////////////////////////
    //para traer los contratos de los cas
    @RequestMapping(method = RequestMethod.GET,  produces = "application/json", value = "/contratocas/{serCodCas}/{numSerestCas}")
    @ResponseBody
    public String traerContratosCAS(@PathVariable(value = "serCodCas") String serCodCas,
                                           @PathVariable(value = "numSerestCas") Integer numSerestCas){


        while(serCodCas.length()<10){
            System.out.println("entro al while");
            serCodCas=serCodCas+" ";
        }

        System.out.println("entro a controlador traer contrato cas sercod="+serCodCas+"numserest="+numSerestCas);
       estadoCondicionService.traerContratosCAS(serCodCas, numSerestCas);
        return  "";
    }




    @RequestMapping(method = RequestMethod.POST, consumes = "application/json", produces = "application/json", value = "/updateContrAden")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void updateContrCas(@RequestBody Hist_servidor estadoCondicion){
        System.out.println("numserest: "+estadoCondicion.getNumSerestCAS()+" CODIGO: "+estadoCondicion.getCodigoCAS());
        String cese="CESE";
        System.out.println("cese: "+cese);
        String dnicas=estadoCondicion.getCodigoCAS();
        while(dnicas.length()<10){
            System.out.println("entro al while");
            dnicas=dnicas+" ";
        }
        estadoCondicionService.updateContrCas(dnicas, estadoCondicion.getNumSerestCAS(), estadoCondicion.getFechaceseCAS(), cese);
        //return "";
    }

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json", produces = "application/json", value = "/updatePlazasCas")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void updatePlazaCas(@RequestBody Hist_servidor estadoCondicion){
        System.out.println("numserest: "+estadoCondicion.getNumSerestCAS()+" CODIGO: "+estadoCondicion.getCodigoCAS());


        String dnicas=estadoCondicion.getCodigoCAS();
        while(dnicas.length()<10){
            System.out.println("entro al while");
            dnicas=dnicas+" ";
        }
        estadoCondicionService.updatePlazaCas(dnicas, estadoCondicion.getNumSerestCAS());
    }

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json", produces = "application/json", value = "/updateServEstCas")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void updateServidorEstadoCas(@RequestBody Hist_servidor estadoCondicion){
        System.out.println("numserest: "+estadoCondicion.getNumSerestCAS()+" CODIGO: "+estadoCondicion.getCodigoCAS());


        String dnicas=estadoCondicion.getCodigoCAS();
        while(dnicas.length()<10){
            System.out.println("entro al while");
            dnicas=dnicas+" ";
        }
        estadoCondicionService.updateServEstCas(dnicas, estadoCondicion.getNumSerestCAS(), estadoCondicion.getFechaceseCAS(), estadoCondicion.getCondPlaniCAS());
    }


    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/mostrarNroCasContr/{serCod}/{numSerestCas}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public Hist_servidor buscarNroContratoCas(@PathVariable(value = "serCod") String serCod, @PathVariable(value = "numSerestCas") Integer numSerestCas) {
        Hist_servidor hist_servidor = new Hist_servidor();
        System.out.println("mostrar numero contrato cas sercod:"+serCod+" numserest"+numSerestCas);
        hist_servidor.setCodigoCAS(serCod);
        hist_servidor.setNumSerestCAS(numSerestCas);
        List<Hist_servidor> hist_servidores = estadoCondicionService.buscarNroContratoCas(hist_servidor);
        if (hist_servidores.size() == 0)
            return null;
        return hist_servidores.get(0);
    }

    @RequestMapping(method = RequestMethod.POST,  produces = "application/json", consumes = "application/json", value = "/alerta")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void addHistalertOk(@RequestBody Hist_servidor estadoCondicion){

        System.out.print("ENTRO A HIST ALERT OK CONTROLLERnumserest:"+estadoCondicion.getNumSerestCAS()+" codigo:"+estadoCondicion.getCodigoCAS()+" numresol:"+estadoCondicion.getDocSustentoCAS()+
              "tipo de alerta:"+estadoCondicion.getTipoAlertaCAS()+" usuario:"+estadoCondicion.getUsuarioCAS() );
        estadoCondicionService.addHistalertOk(estadoCondicion.getCodigoCAS(), estadoCondicion.getDocSustentoCAS(),estadoCondicion.getNumSerestCAS(), estadoCondicion.getTipoAlertaCAS(), estadoCondicion.getUsuarioCAS());
    }







}
