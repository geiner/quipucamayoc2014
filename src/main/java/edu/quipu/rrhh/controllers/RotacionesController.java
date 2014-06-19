package edu.quipu.rrhh.controllers;


import edu.quipu.rrhh.models.HistorialPlaza;
import edu.quipu.rrhh.models.PlazaCAP;
import edu.quipu.rrhh.services.RotacionesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@RequestMapping(value = "/api/rotaciones")
public class RotacionesController {

    private static final Logger log= LoggerFactory.getLogger(LegajosController.class);






    @Autowired
    RotacionesService rotacionesService;


    @RequestMapping(method = RequestMethod.GET, produces="application/json", value= "/plazasAsignadas/{codSer}")
    @ResponseBody
    public List<PlazaCAP> plazasAsignadasPorServidor(@PathVariable(value="codSer") String codSer){
        List<PlazaCAP> plazasAsignadas=rotacionesService.plazasAsignadasPorServidor( "%"+codSer);
        return plazasAsignadas;
    }





    @RequestMapping(method = RequestMethod.GET, produces="application/json", value= "/historialPlaza/{codPlaza}")
    @ResponseBody
    public List<HistorialPlaza> historialPlaza(@PathVariable(value="codPlaza") String codPlaza){
        List<HistorialPlaza> historialPlaza=rotacionesService.historialPlaza( "%"+codPlaza);
        System.out.print("Controller");
        return historialPlaza;
    }




    @RequestMapping(method = RequestMethod.POST,produces = "application/json",consumes = "application/json", value="/deleteHistorialPlaza")
    @ResponseBody
    public void eliminarHistorialPlaza(@RequestBody HistorialPlaza objHistorial) {

        rotacionesService.eliminarHistorialPlaza(objHistorial);
        //cuadroNominalService.updateCuadroNominalVacante(objAsignacion);
    }


    @RequestMapping(method = RequestMethod.POST,consumes = "application/json", produces = "application/json",value = "/addItemHistorialPlaza")
    @ResponseBody
    public String addItemHistorialPlaza(@RequestBody HistorialPlaza obj){
        rotacionesService.addItemHistorialPlaza(obj);
        //cuadroNominalService.updateCuadroNominalOcupado(asigCuadroNominal);
        return "save";
    }



}
