package edu.quipu.rrhh.controllers;

import edu.quipu.rrhh.models.Origen;
import edu.quipu.rrhh.models.Unidad;
import edu.quipu.rrhh.services.UnidadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(value = "/api/unidades")
public class UnidadController {

    @Autowired
    UnidadService unidadService;

    @RequestMapping(method = RequestMethod.GET, produces = "application/json")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public Unidad listarUnidades() {
        return unidadService.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value="/{unidadId}/origenes")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<Origen> listarOrigenes(@PathVariable(value="unidadId") int unidadId) {
        return unidadService.buscarOrigenes(unidadId);
    }






    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value= "/segunUsuario/{codDependencia}/{perfil}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public Unidad listarUnidadesSegunUsuario(@PathVariable(value="codDependencia") String codDependencia,  @PathVariable(value="perfil") String perfil) {



        return unidadService.listarUnidadesSegunUsuario(codDependencia,perfil);
    }

}
