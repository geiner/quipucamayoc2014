package edu.quipu.rrhh.services.implement;

import edu.quipu.rrhh.models.*;
import edu.quipu.rrhh.persistence.ResolucionesMapper;
import edu.quipu.rrhh.services.ResolucionesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Repository
@Transactional

public class ResolucionesServiceImpl implements ResolucionesService{
    @Autowired
    ResolucionesMapper resolucionesMapper;

    @Override
    public List<Resolucion> todasResoluciones() {
        return resolucionesMapper.todasResoluciones();  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public List<tipoResolucion> verTiposResol() {
        return resolucionesMapper.verTiposResol();  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public List<Dependencia> verDependenciasPorCod(char codTr) {
        return resolucionesMapper.verDependenciasPorCod(codTr);  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public List<Motivo> verTiposMotivo() {
        return resolucionesMapper.verTiposMotivo();  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void saveResolucion(Resolucion resolu) {
        resolucionesMapper.addResolucion(resolu.getNumero_resol(),resolu.getFecha_expedicion(),resolu.getFecha_inicio(),resolu.getObliga(),resolu.getAdicional(),resolu.getCod_resol(),
                resolu.getMotivo(),resolu.getFecha_fin());
    }

    @Override
    public List<Resolucion> buscarAnio(String anio) {
        return resolucionesMapper.buscarResolAnio(anio);
    }

    @Override
    public List<TrabajadorResolucion> trabaPorResol(String resol) {
        return resolucionesMapper.trabaPorResol(resol);  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void addServidor(TrabajadorResolucion traba) {
        resolucionesMapper.addServidor(traba.getNroResol(),traba.getDni(),traba.getSerEstado(),traba.getCodAntiguo());
    }



    @Override
    public void eliminarResolucionTrabajador(String resol, String dni,int numser) {
        resolucionesMapper.removeResoluTrabaja(resol,dni,numser);
    }

    @Override
    public void updateResolucion(Resolucion reso) {
        resolucionesMapper.updateResolucion(reso.getNumero_resol(), reso.getFecha_expedicion(), reso.getFecha_inicio(), reso.getObliga(),reso.getAdicional(),reso.getCod_resol(),reso.getMotivo(),reso.getFecha_fin(),reso.getIdResolucion());
    }
    @Override
    public void updateMotivoTraba(MotivoTrabajador editMotivo){
        resolucionesMapper.updateMotivoTraba(editMotivo.getIdMotivoTraba(),editMotivo.getResolucion(),editMotivo.getCodTraba(),editMotivo.getDescrip(),editMotivo.getServiEstado(),editMotivo.getFechaIni(),editMotivo.getFechaFin(),editMotivo.getNroMotivo());
    }
    @Override
    public List<TrabajadorResolucion> auxDniServidor(String reso) {
        return resolucionesMapper.auxDniServidor(reso);  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void addMotivoTrabajador(MotivoTrabajador m) {
        resolucionesMapper.addMotivoTrabajador(m.getResolucion(),m.getCodTraba(),m.getServiEstado(),m.getNroMotivo(),m.getFechaIni(),m.getFechaFin(),m.getDescrip());
        //String resolucion,String codTraba,int serviEstado, String nroMotivo, String fechaIni, String fechaFin, String descrip
    }

    @Override
    public List<Motivo> mostrarMotivoTrabajador(String serCod) {
        return resolucionesMapper.mostrarMotivoTrabajador(serCod);  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void borrarMotivo(String serCod, String nroMoti) {
        resolucionesMapper.borrarMotivo(serCod,nroMoti);
    }

    @Override
    public void borrarServidorConMotivo(String dni,String resol,int numser,String cod_motivo) {
        resolucionesMapper.borrarServidorConMotivo(dni,resol,numser,cod_motivo);
    }

    @Override
    public void actualizarResoServi(String nuevaR, String resol) {
        resolucionesMapper.actualizarResoServi(nuevaR,resol);
    }

    @Override
    public void actualizarResoMoti(String nuevaR, String resol) {
        resolucionesMapper.actualizarResoMoti(nuevaR,resol);
    }

    @Override
    public List<Resolucion> buscarresolxfechas(String inicio, String fin) {
        return resolucionesMapper.buscarResolxfecha(inicio,fin);
    }

    @Override
    public List<Resolucion> validarExisteResolucion(String restranum) {
        return resolucionesMapper.validarExisteResolucion(restranum);
    }
    @Override
    public List<Resolucion> validarUpdateResol(String idResol,String descResol) {
        return resolucionesMapper.validarUpdateResol(idResol,descResol);
    }
    @Override
    public void removeResolucion(String numero) {
        resolucionesMapper.deleteResolucion(numero);
    }

    @Override
    public void removeAsociados(String numero) {
        resolucionesMapper.deleteAsociados(numero);
    }

    @Override
    public List<TrabajadorResolucion> contartraconmot(String resol, String dni, int numser) {
        return resolucionesMapper.contarServidores(resol,dni,numser);
    }

    @Override
    public List<Resoluciones> buscar_resoluciones_asociados(String codigo, int numserest) {
       return resolucionesMapper.buscar_resoluciones_asociados(codigo,numserest);
    }

    @Override
    public void addMotivoTrab(TrabajadorResolucion traba) {
        System.out.println(traba.getNroResol()+" "+traba.getDni()+" "+traba.getSerEstado()+" "+traba.getCod_motivo()+" "+traba.getFec_ini_mot()+" "+traba.getFec_fin_mot()+" "+traba.getDesc_mot());
        resolucionesMapper.addMotivoTrab(traba.getNroResol(),traba.getDni(),traba.getSerEstado(),traba.getCod_motivo(),traba.getFec_ini_mot(),traba.getFec_fin_mot(),traba.getDesc_mot());
    }


}
