package edu.quipu.rrhh.services.implement;

import edu.quipu.rrhh.models.*;
import edu.quipu.rrhh.persistence.ServidorMapper;
import edu.quipu.rrhh.services.ServidorService;
import org.springframework.stereotype.Repository;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;



@Service
@Repository
@Transactional
public class ServidorServiceImpl implements ServidorService {

    @Autowired
    ServidorMapper servidorMapper;

    @Override
    public void save(Servidor servidor) {
        servidorMapper.save(servidor);
    }

    @Override
    public void saveServidor(Servidor servidor){
        System.out.println("nombree:"+servidor.getNombre());
        servidorMapper.saveServidor(servidor);
    }

    @Override
    public void updateServidor(Servidor servidor) {
        System.out.println("aka en actualizar");
        servidorMapper.updateServidor(servidor);
    }

    @Override
    public void updateServidorLaboral(ServidorLaboral servidorLaboral) {
        System.out.println("aka en actualizar laboral");
        servidorMapper.updateServidorLaboral(servidorLaboral);
    }

    @Override
    public void updateServidorLaboral2(ServidorLaboral servidorLaboral) {
        System.out.println("aka en actualizar laboral2");
        servidorMapper.updateServidorLaboral2(servidorLaboral);
    }

    @Override
    public void saveHistHistDep(ServidorLaboral servidorLaboral) {
        servidorMapper.saveHistHistDep(servidorLaboral);
    }

    @Override
    public void saveHistBanco(ServidorLaboral servidorLaboral) {
        servidorMapper.saveHistBanco(servidorLaboral);
    }

    @Override
    public void saveHistCondAseg(ServidorLaboral servidorLaboral) {
        servidorMapper.saveHistCondAseg(servidorLaboral);
    }

    @Override
    public void saveHistCondLab(ServidorLaboral servidorLaboral) {
        servidorMapper.saveHistCondLab(servidorLaboral);
    }

    @Override
    public void saveHistCondPlani(ServidorLaboral servidorLaboral) {
        servidorMapper.saveHistCondPlani(servidorLaboral);
    }

    @Override
    public void updateHistHistDep(ServidorLaboral servidorLaboral) {
        servidorMapper.updateHistHistDep(servidorLaboral);
    }

    @Override
    public void updateHistCondLab(ServidorLaboral servidorLaboral) {
        servidorMapper.updateHistCondLab(servidorLaboral);
    }

    @Override
    public void updateHistBanco(ServidorLaboral servidorLaboral) {
        servidorMapper.updateHistBanco(servidorLaboral);
    }

    @Override
    public void updateHistCondAseg(ServidorLaboral servidorLaboral) {
        servidorMapper.updateHistCondAseg(servidorLaboral);
    }

    @Override
    public void updateHistCondPlani(ServidorLaboral servidorLaboral) {
        servidorMapper.updateHistCondPlani(servidorLaboral);
    }

    @Override
    public List<ServidorLaboral> selectnumeroRegistros(String codigo,int num_ser_est) {
        return servidorMapper.selectnumeroRegistros(codigo,num_ser_est);
    }

    @Override
    public List<ServidorLaboral> getNumserestServidor(String codSerPer,Integer numserest) {

        System.out.println("Hasta aqui:"+codSerPer+" - "+numserest);
        return servidorMapper.getNumserestServidor(codSerPer,numserest);
    }

    @Override
    public List<Servidor> findByCod(Servidor servidor) {
        return servidorMapper.findByCod(servidor);  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public List<ServidorLaboral> findByCodLaboral(ServidorLaboral servidorLaboral) {
        return servidorMapper.findByCodLab(servidorLaboral);  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void saveLaboral(ServidorLaboral servidorLaboral) {
        servidorMapper.saveLaboral(servidorLaboral);
    }

    @Override
    public List<ServidorGenerico> findAllGen(){
        return servidorMapper.findAllGenerico();
    }

    @Override
    public List<ServidorCargo> findAllCargo(){
        return servidorMapper.findAllCargo();
    }

    @Override
    public List<ServidorEstado> findAllEstado(){
        return servidorMapper.findAllEstado();
    }
    @Override
    public List<ServidorTipo>findAlltipo(){
        return servidorMapper.findAllTipo();
    }
    @Override
    public void saveLaboral2(ServidorLaboral servidorLaboral) {
        servidorMapper.saveLaboral2(servidorLaboral);
    }

    @Override
    public void updateServ(ServidorLaboral servidorLaboral) {
        servidorMapper.updateServ(servidorLaboral);
    }

    @Override
    public List<ServidorTipo> findByTipGen(@Param("tipGen") ServidorGenerico tipGen) {
        return servidorMapper.findByTipGen(tipGen);

    }

    @Override
    public List<CategoriaServidor> findAllCategoria(int categoria) {
        return servidorMapper.findAllCategoria(categoria);  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public List<CondicionPlanilla> findAllCondicionPlanilla() {
        return  servidorMapper.findAllCondicionPlanilla();  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public List<TipoPago> findAllPago() {
        return servidorMapper.findAllPago();  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public List<EntidadAseguradora> findAllEntidad() {
        return servidorMapper.findAllEntidad();  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public List<EntidadAseguradora> findByRpeEntidad(int rpeId) {
        return servidorMapper.findByRpeEntidad(rpeId);  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public boolean Existe_servidor(String correo) {
        List<Servidor> retorno = servidorMapper.ExisteServidor(correo);
//        System.out.println(retorno.get(0).getCodigo()+"<------------");
        if(retorno.size()>0){
            return true;
        }else{
            return false;
        }

    }

    @Override
    public boolean Existe_histusu(String email) {
        List<Servidor> retorno = servidorMapper.Existe_histusu(email);
        System.out.println(retorno.size()+" numero de filas encontradas");
        if(retorno.size()>0){
            return true;
        }else{
            return false;
        }
    }

    @Override
    public void insertUsuPerfil(String email) {
        servidorMapper.insertUsuPerfil(email);
    }

    @Override
    public List<Pais> findAllCountries(){
        return servidorMapper.findAllCountries();
    }

    @Override
    public List<Domicilio> findAllDepartments(){
        return servidorMapper.findAllDepartments();
    }

    @Override
    public List<Domicilio> findAllProvincies(Integer idDep){
        return servidorMapper.findAllProvincies(idDep);
    }

    @Override
    public List<Domicilio> findAllDistricts(Integer idDep, Integer idProv){
        return servidorMapper.findAllDistricts(idDep, idProv);
    }

    @Override
    public List<Servidor> todosServidores() {
        return servidorMapper.todosServidores();  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public List<Pais> nacimientoPaises() {
        return servidorMapper.nacimientoPaises();
    }


}
/* @Override
     public List<ServidorTipo> findbyTipo(@Param("tipGen") ServidorGenerico tipGen) {
         return servidorMapper.findByTipGen(tipGen);
     } */