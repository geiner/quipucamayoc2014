package edu.quipu.rrhh.controllers;

import edu.quipu.rrhh.models.*;
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




    @RequestMapping(method = RequestMethod.GET, produces="application/json", value= "/plazas/{codDep}"+"/{anioPlaza}")
    @ResponseBody
    public List<PlazaCAP> plazasPorDepen(@PathVariable(value="codDep") String codDep, @PathVariable(value="anioPlaza") Integer anioPlaza){
        List<PlazaCAP> plazas=cuadroNominalService.plazasPorDepen(codDep,anioPlaza);
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


     //***************************************

    @RequestMapping(method = RequestMethod.POST,consumes = "application/json", produces = "application/json",value = "/addSerCuadroNominal2")
    @ResponseBody
    public String asignarPlaza2(@RequestBody AsigCuadroNominal asigCuadroNominal){
        System.out.print("Aqui  nuevo controller");
        cuadroNominalService.addPlazaNominal(asigCuadroNominal);
        cuadroNominalService.updateEstadoPlaza(asigCuadroNominal);

        return "save";
    }

    //*********************************************

    @RequestMapping(method = RequestMethod.POST,produces = "application/json",consumes = "application/json", value="/deleteAsignacionPlaza")
    @ResponseBody
    public void eliminarPlazaAsignada(@RequestBody AsigCuadroNominal objAsignacion) {

        cuadroNominalService.deleteAsignacionPlaza(objAsignacion);
        cuadroNominalService.updateCuadroNominalVacante(objAsignacion);

    }



    @RequestMapping(method = RequestMethod.GET, produces="application/json", value= "/modalidad")
   // @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<ModalidadAsignacion> allModalidad(){
       List<ModalidadAsignacion> modalidades=cuadroNominalService.allModalidad();
        System.out.print("Aqui");
        return modalidades;
    }




    @RequestMapping(method = RequestMethod.GET, produces="application/json", value= "/origenUsuario/{emailUsuario}")
    @ResponseBody
    public List<Origen> obtenerDependenciaUsuario(@PathVariable(value="emailUsuario") String emailUsuario){
        List<Origen> origen=cuadroNominalService.obtenerDependenciaUsuario( "%"+emailUsuario);
        System.out.print("Par Controller: "+emailUsuario);
        return origen;
    }




    @RequestMapping(method = RequestMethod.GET, produces="application/json", value= "/anioPlazas")
    @ResponseBody
    public List<PlazaCAP> añoPlazas(){
        List<PlazaCAP> años=cuadroNominalService.añoPlazas();
        System.out.print("Aqui");
        return años;
    }




    @RequestMapping(method = RequestMethod.GET, produces="application/json", value= "/DepySubDep/{codDep}")
    @ResponseBody
    public List<EncabezadoDepySubDep> obtenerDepySubDep(@PathVariable(value="codDep") String codDep){
        List<EncabezadoDepySubDep> DepySubDep=cuadroNominalService.obtenerDepySubDep( "%"+codDep);
        //System.out.print("Par Controller: "+emailUsuario);
        return DepySubDep;
    }




    @RequestMapping(method = RequestMethod.GET, produces="application/json", value= "/numPlazasServidor/{dniServidor}"+"/{anio}")
            @ResponseBody
            public List<PlazaCAP> obtenerNumPlazasServidor(@PathVariable(value="dniServidor") String dniServidor,@PathVariable(value="anio") String anio){
        List<PlazaCAP> origen=cuadroNominalService.obtenerNumPlazasServidor(dniServidor,anio);

        return origen;
    }

/*
    @RequestMapping(method = RequestMethod.GET, produces="application/json", value= "/numPlazasServidor/{dniServidor}"+"/{anio})
    @ResponseBody
    public List<PlazaCAP> obtenerNumPlazasServidor(@PathVariable(value="dniServidor") String dniServidor){
        List<PlazaCAP> origen=cuadroNominalService.obtenerNumPlazasServidor( "%"+dniServidor);

        return origen;
    }

    */

}
