package edu.quipu.rrhh.services.implement;

import edu.quipu.rrhh.models.*;
import edu.quipu.rrhh.persistence.CuadroNominalMapper;
import edu.quipu.rrhh.services.CuadroNominalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CuadroNominalServiceImpl implements CuadroNominalService {

    @Autowired
    CuadroNominalMapper cuadroNominalMapper;



    @Override
    public List<PlazaCAP> plazasPorDepen(String codDep) {//corregie aqui
        return cuadroNominalMapper.plazasPorDepen(codDep);
    }

    @Override
    public List<Servidor> servidoresPorDepen(String codDep) {
        return cuadroNominalMapper.servidoresPorDepen(codDep);
    }

    @Override
    public void addPlazaNominal(AsigCuadroNominal obj) {
       cuadroNominalMapper.addPlazaNominal(obj.getCodPlaza(),obj.getCodServidor(),obj.getNumserest(),obj.getFechIng(),obj.getFechSal(),obj.getModSer());
    }

    @Override
    public void updateCuadroNominalOcupado(AsigCuadroNominal obj) {

        cuadroNominalMapper.updateCuadroNominalOcupado(obj.getCodPlaza());

    }

    @Override
    public void deleteAsignacionPlaza(AsigCuadroNominal obj) {
       cuadroNominalMapper.deleteAsignacion(obj.getCodPlaza());
    }

    @Override
    public void updateCuadroNominalVacante(AsigCuadroNominal obj) {
        cuadroNominalMapper.updateCuadroNominalVacante(obj.getCodPlaza());
    }

    @Override
    public void deleteItemsHistorialPlaza(AsigCuadroNominal obj) {

        cuadroNominalMapper.deleteItemsHistorialPlaza(obj.getCodPlaza());

    }

    @Override
    public List<ModalidadAsignacion> allModalidad() {
        System.out.print("llego");
        return cuadroNominalMapper.allModalidad();

    }


    @Override
    public List<Origen> obtenerDependenciaUsuario(String emailUsuario) {
        return cuadroNominalMapper.obtenerDependenciaUsuario(emailUsuario);
    }
}
