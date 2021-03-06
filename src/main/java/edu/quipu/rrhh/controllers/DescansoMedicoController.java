package edu.quipu.rrhh.controllers;

import edu.quipu.rrhh.models.DescansoMedico;
import edu.quipu.rrhh.services.DescansoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;


@Controller
@RequestMapping(value = "/rest/descansos")
public class DescansoMedicoController {
    private static final Logger log= LoggerFactory.getLogger(DescansoMedicoController.class);

    @Autowired
    DescansoService descansoservice;

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json", produces = "application/json", value = "/addDescanso")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String addDescanso(@RequestBody DescansoMedico descansomedico){
        descansoservice.addDescanso(descansomedico);
        return "save";
    }

    @RequestMapping(method = RequestMethod.GET,produces ="application/json",value = "/codigo/{cod}/numserest/{num}")
    @ResponseBody
    public List<DescansoMedico> buscarResoluciones(@PathVariable(value = "cod") String codigo,@PathVariable(value = "num") Integer numserest){
        System.out.println("controller descansos");
        System.out.println(codigo+"-");
        System.out.println(numserest);
        return descansoservice.buscarDescansos(codigo, numserest);
    }
    @RequestMapping(method = RequestMethod.GET,produces ="application/json",value = "/acumulado/codigo/{cod}/numserest/{num}")
    @ResponseBody
    public List<DescansoMedico> buscarAcumulado(@PathVariable(value = "cod") String codigo,@PathVariable(value = "num") Integer numserest){
        System.out.println("controller acumulado");
        System.out.println(codigo+"-");
        System.out.println(numserest);
        return descansoservice.buscarAcumulado(codigo, numserest);
    }

    @RequestMapping(method = RequestMethod.DELETE, /*consumes = "application/json",*/produces = "application/json", value = "/deleteDescansoMed/{idDesc}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public String eliminarDescaMed(@PathVariable(value = "idDesc") Integer  idDesc) {
        System.out.println("controller"+idDesc);

        descansoservice.removeDescMed(idDesc);
        return "delete" +idDesc;
    }

    @RequestMapping(method = RequestMethod.POST,consumes = "application/json",produces = "application/json",value = "/updateDescMed")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String UpdateDescanso(@RequestBody DescansoMedico descMed){
        System.out.print("Hola Mundooooooooooo!!!!"+descMed.getId_desc_med());
        descansoservice.updateDescMed(descMed);


        return "";
    }

    @RequestMapping(method = RequestMethod.GET,produces ="application/json",value = "listar/{mes}/{anio}")
    @ResponseBody
    public List<DescansoMedico> listarDescansos(@PathVariable(value = "mes") String mes,@PathVariable(value = "anio") String anio){
        System.out.println("anio "+anio+" mes "+mes);
        return descansoservice.listarDescansos(anio,mes);

    }
    @RequestMapping(method = RequestMethod.GET,produces ="application/json",value = "listarxanio/{anio}")
    @ResponseBody
    public List<DescansoMedico> listarDescansosxanio(@PathVariable(value = "anio") String anio){
        System.out.println("listar x año : "+anio);
        return descansoservice.listarDescansosxanio(anio);

    }

    @RequestMapping(method = RequestMethod.GET,produces ="application/json",value = "/citts/{citt}")
    @ResponseBody
    public List<DescansoMedico> buscarCitts(@PathVariable(value = "citt") String citt){
        System.out.println("controller citt");
        System.out.println(citt);
        List<DescansoMedico> des=descansoservice.buscarCitt(citt);
        System.out.println(des.size()+" --- ///");
        return descansoservice.buscarCitt(citt);
    }

}
