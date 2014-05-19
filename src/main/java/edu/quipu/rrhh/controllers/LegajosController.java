package edu.quipu.rrhh.controllers;

import edu.quipu.rrhh.models.*;
import edu.quipu.rrhh.services.LegajosService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(value = "/api/legajos")
public class LegajosController {
    private static final Logger log= LoggerFactory.getLogger(LegajosController.class);

    @Autowired
    LegajosService legajosService;

    @RequestMapping(method = RequestMethod.GET,produces ="application/json",value = "/dni/{dni}")
    @ResponseBody
    public List<Legajos> buscarLegajos(@PathVariable(value = "dni") String dni){
        System.out.println("dni "+dni);
        while(dni.length()<10){
            dni=dni+" ";
        }
        return legajosService.buscarLegajos(dni);
    }

//    @PreAuthorize("hasRole('user')")
    @RequestMapping(method = RequestMethod.GET,produces ="application/json",value = "/servidores")
    @PreAuthorize("hasAnyRole('admin')")
    @ResponseBody
    public List<Servidor> buscarServidores(){
        return legajosService.buscarServidores();
    }

    @RequestMapping(method = RequestMethod.GET,produces ="application/json",value = "/TipoEstudio")
    @ResponseBody
    public List<Legajos> tipoEstudio(){
        return legajosService.TipoEstudio();
    }

    @RequestMapping(method = RequestMethod.GET,produces ="application/json",value = "/tipo/{tipo}")
    @ResponseBody
    public List<Legajos> nivelEstudio(@PathVariable(value = "tipo") String tipo){
        return legajosService.nivelEstudio(tipo);
    }

    @RequestMapping(method = RequestMethod.GET,produces ="application/json",value = "/pais")
    @ResponseBody
    public List<Legajos> paisEstudio(){
        return legajosService.paisEstudio();
    }

    @RequestMapping(method = RequestMethod.GET,produces ="application/json",value = "/EstadoCivil")
    @ResponseBody
    public List<Legajos> estadoCivil(){
        return legajosService.estadoCivil();
    }
    @RequestMapping(method = RequestMethod.GET,produces ="application/json",value = "/TipoBeneficio")
    @ResponseBody
    public List<Legajos> tipoBeneficio(){
        return legajosService.tipoBeneficio();
    }
    @RequestMapping(method = RequestMethod.GET,produces ="application/json",value = "/TipoDocumento")
    @ResponseBody
    public List<Legajos> tipoDocumento(){
        return legajosService.tipoDocumento();
    }

    @RequestMapping(method = RequestMethod.GET,produces ="application/json",value = "/TipoParentesco")
    @ResponseBody
    public List<Legajos> tipoParentesco(){
        return legajosService.tipoParentesco();
    }

    @RequestMapping(method = RequestMethod.GET,produces ="application/json",value = "/idiomaEstudio")
    @ResponseBody
    public List<Legajos> idiomaEstudio(){
        return legajosService.idiomaEstudio();
    }

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json", produces = "application/json", value = "/addEstudio")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String addEstudio(@RequestBody Legajos legajos) {
        System.out.println(legajos.getCodigo()+" "+legajos.getCertificado());
        legajosService.addEstudio(legajos);

        return "save";
    }

    @RequestMapping(method = RequestMethod.DELETE, /*consumes = "application/json",*/produces = "application/json", value = "/deleteEstudio/{estid}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public String eliminarPlaza(/*@RequestBody Legajos legajos*/@PathVariable(value = "estid") int  estid) {
        System.out.println("controller"+estid);
        legajosService.removeEstudio(estid);
        return "delete " + estid;
    }

    @RequestMapping(method = RequestMethod.PUT,consumes = "application/json",produces = "application/json",value = "/updateEstudio")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String updateEstadoServidor(@RequestBody Legajos legajos){
        legajosService.updateEstudios(legajos);
        return "";
    }

    @RequestMapping(method = RequestMethod.GET,produces ="application/json",value = "/tipotiemposervicio/{tipo}")
    @ResponseBody
    public List<TiempoServicio> tipoTiempoServicio(@PathVariable(value = "tipo") String tipo){
        return legajosService.TipoTiempoServicio(tipo);
    }

    @RequestMapping(method = RequestMethod.GET,produces ="application/json",value = "/resoluciones/codigo/{cod}/numserest/{num}")
    @ResponseBody
    public List<Resoluciones> buscarResoluciones(@PathVariable(value = "cod") String codigo,@PathVariable(value = "num") Integer numserest){
        System.out.println("controller resoluciones");

        while(codigo.length()<10){
           codigo=codigo+" ";
        }
        return legajosService.buscarResoluciones(codigo,numserest);
    }
    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/validarDocumento/{numdoc}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<LegajosCargaFamiliar> validarExisteDocumento(@PathVariable(value = "numdoc") String numdoc) {

        while(numdoc.length()<8){
            numdoc=numdoc+" ";
        }
        System.out.println(legajosService.validarExisteDocumento(numdoc).size()+" cuantos hay");
        return legajosService.validarExisteDocumento(numdoc);
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/validarEditDocumento/{numdoc}/{carfamsec}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<LegajosCargaFamiliar> validarEditDocumento(@PathVariable(value = "numdoc") String numdoc, @PathVariable(value = "carfamsec") String carfamsec) {

        while(numdoc.length()<8){
            numdoc=numdoc+" ";
        }


        System.out.println(legajosService.validarEditDocumento(numdoc,carfamsec).size()+" cuantos hay");
        return legajosService.validarEditDocumento(numdoc,carfamsec);
    }


    @RequestMapping(method = RequestMethod.POST, consumes = "application/json", produces = "application/json", value = "/addResolucion")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String addResolucion(@RequestBody Resoluciones resoluciones) {

        legajosService.addResolucion(resoluciones);
        return "save";
    }

    @RequestMapping(method = RequestMethod.GET,produces ="application/json",value = "/codigo/{codigo}/numserest/{numserest}")
    @ResponseBody
    public List<Resoluciones> buscarLegajos(@PathVariable(value = "codigo") String codigo,@PathVariable(value = "numserest") String numserest){
        System.out.println(codigo+"========yo"+numserest);

        while(codigo.length()<10){
            codigo=codigo+" ";
        }
        return legajosService.buscarResoluciondeServ(codigo, numserest);
    }

    @RequestMapping(method = RequestMethod.DELETE,produces = "application/json", value = "/deleteTiempoServicio/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public String eliminarTiempoServicio(/*@RequestBody Legajos legajos*/@PathVariable(value = "id") int  id) {
        System.out.println("controller"+id);
        legajosService.removeTiempoServicio(id);
        return "delete " + id;
    }

    @RequestMapping(method = RequestMethod.POST,consumes = "application/json",produces = "application/json",value = "/updateResolucion")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String updateResolucionServidor(@RequestBody Resoluciones resoluciones){
        System.out.println("update de Resoluciones");
        legajosService.updateResolucion(resoluciones);
        return "";
    }

    @RequestMapping(method = RequestMethod.GET,produces ="application/json",value = "/TipoPago")
    @ResponseBody
    public List<Legajos> tipoPago(){

        return legajosService.tipoPago();
    }

    @RequestMapping(method = RequestMethod.GET,produces ="application/json",value = "/cargafamiliar/{dni}")
    @ResponseBody
    public List<LegajosCargaFamiliar> cargaFamiliar(@PathVariable(value = "dni") String dni){


        while(dni.length()<10){
            dni=dni+" ";
        }
        System.out.println("salio:"+dni.length());
        return legajosService.cargaFamiliar(dni);
    }

    @RequestMapping(method = RequestMethod.POST,consumes = "application/json",produces = "application/json",value = "/addDatosFamiliares")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String save(@RequestBody LegajosCargaFamiliar datosfamiliares){
        System.out.println(datosfamiliares.getCargfamnom()+"-"+datosfamiliares.getCargfampar()+"-"+datosfamiliares.getCargfamdir()+"-"+
                datosfamiliares.getCargfamdoc()+"-"+datosfamiliares.getCargfamnumdoc()+"-"+datosfamiliares.getCargfamsex()+"-"+datosfamiliares.getCargfamfechnac()+"-"+
                datosfamiliares.getCargfamtel()+"-"+datosfamiliares.getCargfamrestciv()+"-"+datosfamiliares.getCargfamben()+"-"+datosfamiliares.getCargfamnumessal()+"-"+
                datosfamiliares.getCargfamdep()+"-"+datosfamiliares.getCargfamcodser());
        String valor=datosfamiliares.getCargfamsex();
        System.out.println(datosfamiliares.getCargfamsex()+"sds");

        legajosService.addDatosFamiliares(datosfamiliares.getCargfamnom(),datosfamiliares.getCargfampar(),datosfamiliares.getCargfamdir(),
                datosfamiliares.getCargfamdoc(),datosfamiliares.getCargfamnumdoc(),valor,datosfamiliares.getCargfamfechnac(),
                datosfamiliares.getCargfamtel(),datosfamiliares.getCargfamrestciv(),datosfamiliares.getCargfamben(),datosfamiliares.getCargfamnumessal(),
                datosfamiliares.getCargfamdep(),datosfamiliares.getCargfamcodser());

        return "save";
    }
    @RequestMapping(method = RequestMethod.POST,consumes = "application/json",produces = "application/json",value = "/editDatosFamiliares")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String editarFamily(@RequestBody LegajosCargaFamiliar datosfamiliares){
        System.out.println("estoy aca"+datosfamiliares.getCargfamsec());
        legajosService.removeBeneficiario(datosfamiliares.getCargfamsec());
        System.out.println("estoy aca");
        legajosService.editarDatosFamiliares(datosfamiliares.getCargfamnom(),datosfamiliares.getCargfampar(),datosfamiliares.getCargfamdir(),
                datosfamiliares.getCargfamdoc(),datosfamiliares.getCargfamnumdoc(),datosfamiliares.getCargfamsex(),datosfamiliares.getCargfamfechnac(),
                datosfamiliares.getCargfamtel(),datosfamiliares.getCargfamrestciv(),datosfamiliares.getCargfamben(),datosfamiliares.getCargfamnumessal(),
                datosfamiliares.getCargfamdep(),datosfamiliares.getCargfamcodser(),datosfamiliares.getCargfamsec());

        return "";
    }
    @RequestMapping(method = RequestMethod.DELETE, /*consumes = "application/json",*/produces = "application/json", value = "/deleteFamiliar/{idfam}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public String eliminarFamiliar(@PathVariable(value = "idfam") Integer  idfam) {
        System.out.println("controller"+idfam);
        legajosService.removeBeneficiario(idfam);
        legajosService.removeFamiliar(idfam);
        return "delete" + idfam;
    }
    @RequestMapping(method = RequestMethod.POST,consumes = "application/json",produces = "application/json",value = "/UpdateBeneficiario")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String UpdateBeneficiario(@RequestBody LegajosCargaFamiliar datosfamiliares){
        legajosService.editarDatosFamiliares(datosfamiliares.getCargfamnom(),datosfamiliares.getCargfampar(),datosfamiliares.getCargfamdir(),
                datosfamiliares.getCargfamdoc(),datosfamiliares.getCargfamnumdoc(),datosfamiliares.getCargfamsex(),datosfamiliares.getCargfamfechnac(),
                datosfamiliares.getCargfamtel(),datosfamiliares.getCargfamrestciv(),datosfamiliares.getCargfamben(),datosfamiliares.getCargfamnumessal(),
                datosfamiliares.getCargfamdep(),datosfamiliares.getCargfamcodser(),datosfamiliares.getCargfamsec());

        return "";
    }
    @RequestMapping(method = RequestMethod.POST,consumes = "application/json",produces = "application/json",value = "/updateBenef")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String UpdateBenef(@RequestBody LegajosCargaFamiliar datosfamiliares){
        System.out.println("titular:"+datosfamiliares.getTitularcuenta()+" num:"+datosfamiliares.getNumcuenta()+" tipo:"+datosfamiliares.getTipopago()+" idfam:"+datosfamiliares.getCargfamsec());
        legajosService.removeBeneficiario(datosfamiliares.getCargfamsec());
        String idfamliar=""+ datosfamiliares.getCargfamsec();
       legajosService.addBeneficiarios(datosfamiliares.getTipopago(),datosfamiliares.getNumcuenta(),datosfamiliares.getTitularcuenta(),idfamliar,datosfamiliares.getCodresol(),datosfamiliares.getTipbeneficio());
        //legajosService.updateBenef(datosfamiliares.getTitularcuenta(),datosfamiliares.getNumcuenta(),datosfamiliares.getTipopago(),datosfamiliares.getCargfamsec());

        return "";
    }
    @RequestMapping(method = RequestMethod.POST,consumes = "application/json",produces = "application/json",value = "/addBeneficiarios")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String beneficiarios(@RequestBody LegajosCargaFamiliar beneficiarios){

        System.out.println("dni individual:"+beneficiarios.getCargfamnumdoc());
        System.out.println("codigo servidor:"+beneficiarios.getCargfamcodser());
        System.out.println("resolucion:"+beneficiarios.getCodresol());
        System.out.println("tipo beneficio:"+beneficiarios.getTipbeneficio());
        String dni=beneficiarios.getCargfamnumdoc();
        String serv=beneficiarios.getCargfamcodser();
        while(serv.length()<10){
            serv=serv+" ";
        }
        /*while(dni.length()<8){
            dni=dni+" ";
        }*/
        System.out.println("nene"+dni+"cania");
        String idFamiliar= ""+legajosService.idFamiliar(beneficiarios.getCargfamnom(),serv);
        System.out.println("Esta Nuloo");
        System.out.println("id familiar"+idFamiliar);

        legajosService.addBeneficiarios(beneficiarios.getTipopago(),beneficiarios.getNumcuenta(),beneficiarios.getTitularcuenta(),idFamiliar,beneficiarios.getCodresol(),beneficiarios.getTipbeneficio());

        return "";
    }
}
