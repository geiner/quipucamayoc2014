package edu.quipu.rrhh.services.implement;

import edu.quipu.rrhh.models.DescansoMedico;
import edu.quipu.rrhh.persistence.DescansoMapper;
import edu.quipu.rrhh.services.DescansoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by GEINER on 05/05/2014.
 */
@Service
public class DescansoServiceImpl implements DescansoService {

    @Autowired
    DescansoMapper descansoMapper;

    @Override
    public void addDescanso(DescansoMedico descansomedico) {
        descansoMapper.addDescanso(descansomedico.getId_serv(),descansomedico.getNumserest(),descansomedico.getCitt(),descansomedico.getF_inicio(),descansomedico.getF_fin(),descansomedico.getTipo_lic());
    }

    @Override
    public List<DescansoMedico> buscarDescansos(String codigo, Integer numserest) {
        return descansoMapper.buscarDescansos(codigo,numserest);
    }
}
