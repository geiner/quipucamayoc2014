package edu.quipu.rrhh.services.implement;


import edu.quipu.rrhh.models.CargoCAS;
import edu.quipu.rrhh.models.PlazaCAS;
import edu.quipu.rrhh.models.Servidor;
import edu.quipu.rrhh.persistence.ContratosCasMapper;
import edu.quipu.rrhh.services.ContratosCasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Repository
@Transactional
public class ContratosCasServiceImpl implements ContratosCasService {

    @Autowired
    ContratosCasMapper contratosCasMapper;

    @Override
    public List<Servidor> listarServidoresCas(){
        return  contratosCasMapper.listarServidoresCas();
    }

    @Override
    public List<CargoCAS> listarCargos(){
        return  contratosCasMapper.listarCargos();
    }

    @Override
    public List<PlazaCAS> listarPlazas(Integer udid){
        List<PlazaCAS> plazas = contratosCasMapper.listarPlazas(udid);
        return  plazas;
    }

    @Override
    public void updatePlazas(Integer id){
        System.out.println("entro al Serv impl: "+id);
        contratosCasMapper.updatePlazas(id);
    }

    @Override
    public void insertContAden(PlazaCAS plazaCAS){
        System.out.println("entro al Serv impl: "+plazaCAS.getContrato());
        contratosCasMapper.insertContAden( plazaCAS);
        System.out.println("paso al mapper ");
    }

    @Override
    public void insertPlazasHistorial(Integer id){
        contratosCasMapper.insertPlazasHistorial(id);
    }

    @Override
    public List<Servidor> verItem(Servidor servidor){
        System.out.println("bota: "+servidor.getCodigo()+"-"+servidor.getNum_serest());
        return contratosCasMapper.verItem(servidor);
    }

    @Override
    public void updateServidorItem(Servidor servidor){
        System.out.println("entro al Serv impl: "+servidor.getCodigo());
        contratosCasMapper.updateServidorItem(servidor);
    }

    @Override
    public void insertServidorItem(Servidor servidor){
        System.out.println("entro al Serv impl: "+servidor.getCodigo());
        contratosCasMapper.insertServidorItem(servidor);
    }
}
