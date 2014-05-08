package edu.quipu.rrhh.services.implement;

import edu.quipu.rrhh.models.DescansoMedico;
import edu.quipu.rrhh.persistence.DescansoMapper;
import edu.quipu.rrhh.services.DescansoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class DescansoServiceImpl implements DescansoService {

    @Autowired
    DescansoMapper descansoMapper;

    @Override
    public void addDescanso(DescansoMedico descansomedico) {
        descansoMapper.addDescanso(descansomedico.getId_serv(),descansomedico.getNumserest(),descansomedico.getCitt(),descansomedico.getF_inicio(),descansomedico.getF_fin(),descansomedico.getTipo_lic(),descansomedico.getTiempo());
    }

    @Override
    public List<DescansoMedico> buscarDescansos(String codigo, Integer numserest) {
        return descansoMapper.buscarDescansos(codigo,numserest);
    }

    @Override
    public void removeDescMed(Integer idDesc) {
        descansoMapper.removeDescMed(idDesc);
    }

    @Override
    public void updateDescMed(DescansoMedico descMed) {
        descansoMapper.updateDescanso(descMed.getCitt(),descMed.getF_inicio(),descMed.getF_fin(),descMed.getTiempo(),descMed.getTipo_lic(),descMed.getId_desc_med());
    }

    @Override
    public List<DescansoMedico> listarDescansos(String anio, String mes) {
        return descansoMapper.listarDescansos(mes,anio);
    }


}
