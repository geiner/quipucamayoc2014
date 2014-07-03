package edu.quipu.rrhh.services.implement;

import edu.quipu.rrhh.models.RegimenPensionario;
import edu.quipu.rrhh.persistence.EstadoAfpMapper;
import edu.quipu.rrhh.services.EstadoAFPService;
import org.springframework.beans.factory.annotation.Autowired;
import edu.quipu.rrhh.models.EstadoAfp;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Repository
@Transactional
public class EstadoAFPServiceOImpl implements EstadoAFPService{
    @Autowired
    private EstadoAfpMapper estadoAfpMapper;


    @Override
    public List<EstadoAfp> FindAllAfp(RegimenPensionario regimenPensionario) {
        List<EstadoAfp> estadoAfp= estadoAfpMapper.findAll();
        return estadoAfp;

    }
}
