package edu.quipu.rrhh.controllers;

import edu.quipu.rrhh.models.*;
import edu.quipu.rrhh.services.ResolucionesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(value = "/rest/resoluciones")
public class ResolucionesController {
    @Autowired
    ResolucionesService resolucionesService;

    private static final Logger log = LoggerFactory.getLogger(tipoResolucion.class);

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/tipos")
    @ResponseBody
    public List<tipoResolucion> todosTiposResoluciones() {
        System.out.println("controlador back resul");
        List<tipoResolucion> resul= resolucionesService.verTiposResol();
        return   resul;
    }

    @RequestMapping(method = RequestMethod.GET,produces = "application/json",value = "/todasResoluciones")
    @ResponseBody
    public List<Resolucion> todasResoluciones(){
        return resolucionesService.todasResoluciones();

    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/dependencia/tipo/{codtr}")
    @ResponseBody
    public List<Dependencia> dependenciasPorCod(@PathVariable(value="codtr") char codtr){
        List<Dependencia>  depen=resolucionesService.verDependenciasPorCod(codtr);
        return depen;
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/dependencia/motivos")
    @ResponseBody
    public List<Motivo> VerMotivos(){
        List<Motivo>  moti=resolucionesService.verTiposMotivo();
        return moti;
    }

    @RequestMapping(method = RequestMethod.POST,consumes = "application/json", produces = "application/json",value = "/addResolucion")
    //@ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String AgregarResolucion(@RequestBody Resolucion resolu){
        System.out.println("llegue aqui,donde estas EN SAVE RESOLUCION"+resolu.getFecha_expedicion());

        resolucionesService.saveResolucion(resolu);
        return "save";
    }

    @RequestMapping(method = RequestMethod.POST,consumes = "application/json", produces = "application/json",value = "/addServidor")
    //@ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String AgregarServidor(@RequestBody TrabajadorResolucion traba){

        System.out.println("llegue aqui,agregando servidores");
        System.out.println(traba.getDni()+" "+traba.getCodAntiguo()+" "+traba.getNroResol()+" "+traba.getSerEstado());
        resolucionesService.addServidor(traba);
        return "save";
    }
    @RequestMapping(method = RequestMethod.POST,consumes = "application/json", produces = "application/json",value = "/addServidors")
    //@ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String AgregarServidors(@RequestBody TrabajadorResolucion traba){

        System.out.println("llegue aqui,agregando servidores");
        System.out.println(traba.getDni()+" "+traba.getCodAntiguo()+" "+traba.getNroResol()+" "+traba.getSerEstado()+" "+traba.getCod_motivo()+" "+traba.getFec_ini_mot()+" "+traba.getFec_fin_mot());
        resolucionesService.addServidor(traba);
        resolucionesService.addMotivoTrab(traba);
        return "save";
    }
    @RequestMapping(method = RequestMethod.GET, produces="application/json", value= "/findResolucion/{anio}")
    @ResponseBody
    public List<Resolucion> ResolucionPorAnio(@PathVariable(value="anio") String anio){
        List<Resolucion> resol=resolucionesService.buscarAnio( "%"+anio);
        return resol;
    }

    @RequestMapping(method = RequestMethod.GET, produces="application/json", value= "/findResolucion/{inicio}/{fin}")
    @ResponseBody
    public List<Resolucion> ResolucionPorAnio(@PathVariable(value="inicio") String inicio,@PathVariable(value="fin") String fin){
        System.out.println("-"+inicio+" otro "+fin+"-");
        if(inicio.equals("0")){
           inicio="%";
        }else{
            inicio="%"+inicio;
        };
        if(fin.equals("0")){
            fin="%";
        }else{
            fin="%"+fin;
        };
        System.out.println("-"+inicio+" otro2 "+fin+"-");
        List<Resolucion> resol=resolucionesService.buscarresolxfechas(inicio,fin);
        System.out.println(resol.size());
        return resol;
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/trabajador/{resol}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<TrabajadorResolucion> buscarTrabajador(@PathVariable(value = "resol") String resol) {
        return resolucionesService.trabaPorResol(resol+"%");
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/validarResolucion/{restranum}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<Resolucion> validarExisteResolucion(@PathVariable(value = "restranum") String restranum) {
        System.out.println(resolucionesService.validarExisteResolucion(restranum).size()+" cuantos hay");
        return resolucionesService.validarExisteResolucion(restranum);
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/validarUpdateResol/{idResol}/{descrResol}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<Resolucion> validarUpdateResol(@PathVariable(value = "idResol") String idResol,@PathVariable(value = "descrResol") String descResol) {
        System.out.println();
        return resolucionesService.validarUpdateResol(idResol,descResol);
    }

    @RequestMapping(method = RequestMethod.POST,consumes = "application/json", produces = "application/json",value = "/updateResolucion")
    //@ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void updateResolucion(@RequestBody Resolucion reso){
        System.out.println("llegue aqui updateando resoluciones");
        resolucionesService.updateResolucion(reso);

    }
    @RequestMapping(method = RequestMethod.POST,consumes = "application/json", produces = "application/json",value = "/editMotivoTrabajador")
    //@ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void updateMotivoTraba(@RequestBody MotivoTrabajador editMotivo){
        System.out.println("Editando Trabajadores"+editMotivo.getCodTraba()+" "+editMotivo.getResolucion());

        resolucionesService.updateMotivoTraba(editMotivo);

       // resolucionesService.updateResolucion(reso);

    }
    @RequestMapping(method = RequestMethod.POST,produces = "application/json",consumes = "application/json", value="/deleteServidor")
    @ResponseBody
    public void eliminarTrabajador( @RequestBody TrabajadorResolucion reso) {
        int numser=reso.getSerEstado();
        String dni=reso.getDni();
        String resol=reso.getNroResol();
        String cod_motivo=reso.getCod_motivo();

        System.out.println("funciona eliminando servidor");
        System.out.println(numser+"/"+dni+"/"+cod_motivo+"/"+resol);
        System.out.println("numero de servidores con la resolucion pero con diferente motivo "+resolucionesService.contartraconmot(resol,dni,numser).size());


        if(resolucionesService.contartraconmot(resol,dni,numser).size()==1){
            System.out.println("eliminando de las dos tablas");
            resolucionesService.borrarServidorConMotivo(dni,resol,numser,cod_motivo);
            resolucionesService.eliminarResolucionTrabajador(resol,dni,numser);
        }else{
            if(cod_motivo==""){
                resolucionesService.eliminarResolucionTrabajador(resol,dni,numser);
            }else{
                System.out.println("eliminando solo los motivos");
                resolucionesService.borrarServidorConMotivo(dni,resol,numser,cod_motivo);
            }

        }


    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/auxDni/{resol}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<TrabajadorResolucion> getDni(@PathVariable(value = "resol") String resol) {
        return resolucionesService.auxDniServidor(resol);
    }
//}    @ResponseStatus(HttpStatus.CREATED)
//                                         @ResponseBody
//                                         public Servidor save(@RequestBody Servidor servidor) {
//    logger.info(servidor.toString());
//    servidorService.save(servidor);
//    servidor = servidorService.findByCod(servidor).get(0);
//    return servidor;

    @RequestMapping(method = RequestMethod.POST,consumes = "application/json", produces = "application/json",value = "/addMotivoTrabajador")
    //@ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String AgregarMotivoTrabajador(@RequestBody MotivoTrabajador motivoTrabajador){
        System.out.println("llegue aqui,donde estas EN SAVE motivo trabajador");
        System.out.println(motivoTrabajador.getIdMotivoTraba()+"-"+motivoTrabajador.getResolucion()+"-"+motivoTrabajador.getCodTraba()+"-"
                +motivoTrabajador.getServiEstado()+"-"+motivoTrabajador.getFechaIni()+"-"+motivoTrabajador.getNroMotivo()+"-"+motivoTrabajador.getFechaFin()+"-"+motivoTrabajador.getDescrip());
        if(motivoTrabajador.getFechaIni()==null){
            motivoTrabajador.setFechaIni("");
        };
        if(motivoTrabajador.getFechaFin()==null){
            motivoTrabajador.setFechaFin("");
        };
        resolucionesService.addMotivoTrabajador(motivoTrabajador);
        return "save";
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/mostrarMotivo/{serCod}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<Motivo> mostrarMotivoTrabajador(@PathVariable(value = "serCod") String serCod ){
        return resolucionesService.mostrarMotivoTrabajador(serCod);
    }

    @RequestMapping(method = RequestMethod.POST,produces = "application/json", value = "/deleteMotivo/{serCod}/{nroMoti}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public void eliminarMotivo(@PathVariable(value= "serCod")String serCod, @PathVariable (value= "nroMoti") String nroMoti) {
        System.out.println("funciona eliminando motivos del servidor");
        resolucionesService.borrarMotivo(serCod,nroMoti);

    }

    @RequestMapping(method = RequestMethod.POST,produces = "application/json", value = "/deleteTrabajadorMotivo/{serCod}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public void eliminarTrabajadorMotivo(@PathVariable(value= "serCod")String serCod) {
        System.out.println("llego hasta funcionar eliminar trabajador con todos sus motivos");
//        resolucionesService.borrarServidorConMotivo(serCod);

    }

    @RequestMapping(method = RequestMethod.GET,produces = "application/json",value = "/updateResoServi/{nuevaR}/{resol}")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void updateResoServi(@PathVariable(value= "nuevaR")String nuevaR, @PathVariable (value= "resol") String resol){
        System.out.println("editando resolucion trabajador"+resol+" ,"+nuevaR);
        resolucionesService.actualizarResoServi(nuevaR,resol);
    }

    @RequestMapping(method = RequestMethod.GET,produces = "application/json",value = "/updateResoMoti/{nuevaR}/{resol}")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void updateResoMoti(@PathVariable(value= "nuevaR")String nuevaR, @PathVariable (value= "resol") String resol){
        System.out.println("editando resolucion motivo");
        resolucionesService.actualizarResoMoti(nuevaR,resol);
    }

    @RequestMapping(method = RequestMethod.DELETE, produces = "application/json", value = "/deleteResolucion/{numero}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public String eliminarResolucion(@PathVariable(value = "numero") String  numero) {
        System.out.println("controller"+numero);
        resolucionesService.removeResolucion(numero);
        resolucionesService.removeAsociados(numero);
        return "delete " + numero;
    }

    @RequestMapping(method = RequestMethod.GET,produces = "application/json",value = "/resolAsociados/{codigo}/{numserest}")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public List<Resoluciones> ResolucionesAsociados(@PathVariable(value= "codigo")String codigo, @PathVariable (value= "numserest") int numserest){
        System.out.println(codigo+"----"+numserest);
       return resolucionesService.buscar_resoluciones_asociados(codigo.trim(),numserest);
    }

}
