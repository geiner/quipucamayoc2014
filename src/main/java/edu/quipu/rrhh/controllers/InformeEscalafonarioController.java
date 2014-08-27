package edu.quipu.rrhh.controllers;



import edu.quipu.rrhh.models.informeescalafonario;
import edu.quipu.rrhh.services.informeescalafonarioService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.swing.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;


@Controller
@RequestMapping("/api/informeescalafonario")
public class InformeEscalafonarioController {

    protected static Logger logger = LoggerFactory.getLogger(ReportesController.class);
    @Autowired
    informeescalafonarioService InformeescalafonarioService;

    /////cargar reporte de informe escalafonario
    @RequestMapping(value = "/reporteies/ies/pdf",method = RequestMethod.POST)
    public void cargarReportesIES(HttpServletResponse response,String dniies,Integer numser,String usuaries){
        InformeescalafonarioService.cargarReportesIES(response,dniies,numser,usuaries);
        System.out.println("camino al service");
    }

    ////
    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/servidores")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody

    public List<informeescalafonario> todosServidores() {
        System.out.println("TODOS LOS SERVIDORES!!!");
        return InformeescalafonarioService.todosServidores();
    }
}
