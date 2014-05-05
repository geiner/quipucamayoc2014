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

/**
 * Created by GEINER on 05/05/2014.
 */

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

}
