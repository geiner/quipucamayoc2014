package edu.quipu.rrhh.services.implement;

import edu.quipu.rrhh.models.HistorialPlaza;
import edu.quipu.rrhh.models.PlazaCAP;
import edu.quipu.rrhh.persistence.RotacionesMapper;
import edu.quipu.rrhh.services.RotacionesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class RotacionesServiceImpl implements RotacionesService {


    @Autowired
    RotacionesMapper rotacionesMapper;



    @Override
    public List<PlazaCAP> plazasAsignadasPorServidor(String codSer) {
        return rotacionesMapper.plazasAsignadasPorServidor(codSer);
    }


    @Override
    public List<HistorialPlaza> historialPlaza(String codPlaza) {

        System.out.print("SericeImpl");
        return rotacionesMapper.historialPlaza(codPlaza);
    }


    @Override
    public void eliminarHistorialPlaza(HistorialPlaza obj) {


        rotacionesMapper.eliminarHistorialPlaza(obj.getIdHistorialPlaza());

    }

    @Override
    public void addItemHistorialPlaza(HistorialPlaza obj) {
        rotacionesMapper.addItemHistorialPlaza(obj.getCodPlaza(),obj.getFechaRotacion(),obj.getDepActual(),obj.getNroDocu());
    }
}
