package edu.quipu.rrhh.controllers;
import edu.quipu.rrhh.models.CargoCAS;
import edu.quipu.rrhh.models.PlazaCAS;
import edu.quipu.rrhh.models.Servidor;
import edu.quipu.rrhh.services.ContratosCasService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(value = "/api/contratosCas")
public class ContratosCasController {
    static final Logger logger = LoggerFactory.getLogger(ContratosCasController.class);

    @Autowired
    ContratosCasService contratosCasService;

    //Listar a todos los trabajadores
    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/servidorCas")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<Servidor> listarServidoresCas(){

        System.out.println("Listar !!!!");
        return contratosCasService.listarServidoresCas();
    }

    //Listar a todos los cargos
    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/cargos")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<CargoCAS> listarCargos(){

        System.out.println("Listar Cargos!!!!");
        return contratosCasService.listarCargos();
    }


    //Listar a todos las plazas
    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/plazas/{udid}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<PlazaCAS> listarPlazas(@PathVariable(value = "udid") Integer udid){

        System.out.println("Listar Plazas!!!!");
        List<PlazaCAS> plazas = contratosCasService.listarPlazas(udid);
        return plazas;
    }


    //update en tabla Plazas
    @RequestMapping(method = RequestMethod.PUT, consumes ="application/json", produces = "application/json", value = "/updatePlazas")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void updatePlazas(@RequestBody PlazaCAS plazaCAS){
        System.out.println("entro update"+plazaCAS.getId());
        contratosCasService.updatePlazas(plazaCAS.getId());
    }





    //insert en la tabla contarto adendas
    @RequestMapping(method = RequestMethod.POST, consumes ="application/json", produces = "application/json", value = "/insertContAdendas")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String insertContAden(@RequestBody PlazaCAS plazaCAS){
        System.out.println("entro insert contrato adendas"+plazaCAS.getContrato());
        contratosCasService.insertContAden(plazaCAS);
        return "";
    }



    //Para insertar en la tabla plaza historial
    @RequestMapping(method = RequestMethod.PUT, consumes = "application/json", produces = "application/json", value = "/insertPlazasHist")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void insertPlazasHistorial(@RequestBody PlazaCAS plazaCAS){
        System.out.println("entro a controller plazas historial: " +plazaCAS.getId());
        contratosCasService.insertPlazasHistorial(plazaCAS.getId());
    }

    //Para ver si existe registro en Servidor Item fijo
    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/verServItem/{codigo}/{num_serest}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public Servidor verItem(@PathVariable(value = "codigo") String codigo, @PathVariable(value = "num_serest") Integer num_serest) {
        Servidor servidor = new Servidor();
        System.out.println("codigooooo!!!"+codigo);
        servidor.setCodigo(codigo);
        servidor.setNum_serest(num_serest);
        List<Servidor> servidores = contratosCasService.verItem(servidor);
        if (servidores.size() == 0)
            return null;
        return servidores.get(0);
    }


    //update en tabla Servidor Item Fijo
    @RequestMapping(method = RequestMethod.POST, consumes ="application/json", produces = "application/json", value = "/updateServItem")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String updateServidorItem(@RequestBody Servidor servidor){
        System.out.println("entro controller update servidor item"+servidor.getCodigo()+" - "+servidor.getMonto1());
        contratosCasService.updateServidorItem(servidor);
        return "";
    }


    //Insert en tabla Servidor Item Fijo
    @RequestMapping(method = RequestMethod.POST, consumes ="application/json", produces = "application/json", value = "/insertServItem")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String insertServidorItem(@RequestBody Servidor servidor){
        System.out.println("entro controller insert servidor item"+servidor.getCodigo()+" - "+servidor.getMonto1());
        contratosCasService.insertServidorItem(servidor);
        return "";
    }






}
