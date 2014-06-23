package edu.quipu.rrhh.controllers;

import edu.quipu.rrhh.models.AsigCuadroNominal;
import edu.quipu.rrhh.models.ModalidadAsignacion;
import edu.quipu.rrhh.models.PlazaCAP;
import edu.quipu.rrhh.models.Servidor;
import edu.quipu.rrhh.services.CuadroNominalService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//import org.springframework.http.HttpStatus;//ahora ultimo


@Controller
@RequestMapping(value = "/api/cuadro_nominal")
public class CuadroNominalController {




    private static final Logger log= LoggerFactory.getLogger(CuadroNominalController.class);  //LegajosController




    @Autowired
    CuadroNominalService cuadroNominalService;



    @RequestMapping(method = RequestMethod.GET, produces="application/json", value= "/servidores/{codDep}")
    @ResponseBody
    public List<Servidor> servidoresPorDepen(@PathVariable(value="codDep") String codDep){
        List<Servidor> servidores=cuadroNominalService.servidoresPorDepen( "%"+codDep);
        System.out.print("Aqui");
        return servidores;
    }






    @RequestMapping(method = RequestMethod.GET, produces="application/json", value= "/plazas/{codDep}")
    @ResponseBody
    public List<PlazaCAP> plazasPorDepen(@PathVariable(value="codDep") String codDep){
        List<PlazaCAP> plazas=cuadroNominalService.plazasPorDepen( "%"+codDep);
      //  System.out.print("Aqui");
        return plazas;
    }





    @RequestMapping(method = RequestMethod.POST,consumes = "application/json", produces = "application/json",value = "/addSerCuadroNominal")
    @ResponseBody
    public String asignarPlaza(@RequestBody AsigCuadroNominal asigCuadroNominal){
          System.out.print("Aqui");
        cuadroNominalService.addPlazaNominal(asigCuadroNominal);
        cuadroNominalService.updateCuadroNominalOcupado(asigCuadroNominal);

        return "save";
    }







    @RequestMapping(method = RequestMethod.POST,produces = "application/json",consumes = "application/json", value="/deleteAsignacionPlaza")
    @ResponseBody
    public void eliminarPlazaAsignada(@RequestBody AsigCuadroNominal objAsignacion) {

        cuadroNominalService.deleteAsignacionPlaza(objAsignacion);
        cuadroNominalService.updateCuadroNominalVacante(objAsignacion);
        //cuadroNominalService.deleteItemsHistorialPlaza(objAsignacion);


    }



    @RequestMapping(method = RequestMethod.GET, produces="application/json", value= "/modalidad")
   // @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<ModalidadAsignacion> allModalidad(){
       List<ModalidadAsignacion> modalidades=cuadroNominalService.allModalidad();
        System.out.print("Aqui");
        return modalidades;
    }




}