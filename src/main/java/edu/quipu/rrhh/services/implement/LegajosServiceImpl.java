package edu.quipu.rrhh.services.implement;

import edu.quipu.rrhh.models.*;
import edu.quipu.rrhh.persistence.LegajosMapper;
import edu.quipu.rrhh.services.LegajosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: GEINNER
 * Date: 28/10/13
 * Time: 10:22 AM
 * To change this template use File | Settings | File Templates.
 */
@Service
public class LegajosServiceImpl implements LegajosService{

    @Autowired
    LegajosMapper legajosMapper;


    @Override
    public List<Legajos> buscarLegajos(String dni) {
        return   legajosMapper.buscarLegajos(dni);
    }

    @Override
    public List<Servidor> buscarServidores() {
        return legajosMapper.buscarServidores();
    }

    @Override
    public List<Legajos> TipoEstudio() {
        System.out.println(legajosMapper.TipEstudio().size());
        return legajosMapper.TipEstudio();
    }
    @Override
    public List<Servidor> getDatosPersonalesServidor(String codSerPer) {
        return legajosMapper.getDatosPersonalesServidor(codSerPer);  //To change body of implemented methods use File | Settings | File Templates.
    }
    @Override
    public List<Legajos> nivelEstudio(String tipo) {
        return legajosMapper.nivelEstudio(tipo);
    }

    @Override
    public List<Legajos> paisEstudio() {
        return legajosMapper.paisEstudio();
    }

    @Override
    public List<Legajos> estadoCivil() {
        return legajosMapper.estadoCivil();
    }

    @Override
    public List<Legajos> tipoBeneficio() {
        return legajosMapper.tipoBeneficio();
    }
    @Override
    public List<Legajos> tipoDocumento() {
        return legajosMapper.tipoDocumento();
    }

    @Override
    public List<Legajos> tipoParentesco() {
        // System.out.println(legajosMapper.TipEstudio().get(1).getDesc_parent()+"-");
        return legajosMapper.tipoParentesco();
    }

    @Override
    public List<Legajos> idiomaEstudio() {
        return legajosMapper.idiomaEstudio();
    }

    @Override
    public void addEstudio(Legajos legajos) {
        System.out.println("service");
        System.out.println(legajos.getCodigo()+"/"+legajos.getTipCod()+"/"+legajos.getCertificado()+"/"+legajos.getNiveldescripcion()+"/"+
                legajos.getCentro_estudio()+"/"+legajos.getF_inicio()+"/"+legajos.getF_fin()+"/"+legajos.getHoras()+"/"+legajos.getNro_colegiatura()
                +"/"+legajos.getDuracion()+"/"+legajos.getNro_titulacion()+"/"+legajos.getEspecialidad()+"-"+legajos.getFecha_expedicion());

        legajosMapper.addEstudio(legajos.getCodigo(),legajos.getTipCod(),legajos.getNiveldescripcion(),
                legajos.getCentro_estudio(),legajos.getCertificado(),legajos.getF_inicio(),legajos.getF_fin(),legajos.getHoras(),legajos.getEspecialidad(),legajos.getNro_titulacion()
                ,legajos.getFecha_expedicion(),legajos.getCodpais(),legajos.getDuracion(),legajos.getNro_colegiatura());

    }

    @Override
    public void removeEstudio(int estid) {
        legajosMapper.removeEstudio(estid);
    }

    @Override
    public List<LegajosCargaFamiliar> validarExisteDocumento(String numdoc) {
        return legajosMapper.validarExisteDocumento(numdoc);
    }

    @Override
    public void updateEstudios(Legajos legajos) {
        legajosMapper.updateEstudios(legajos.getId(),legajos.getTipCod(),legajos.getF_inicio(),legajos.getF_fin(),
                legajos.getCentro_estudio(),legajos.getDuracion(),legajos.getEspecialidad(),legajos.getNro_titulacion(),legajos.getFecha_expedicion(),
                legajos.getCertificado(),legajos.getCodpais(),legajos.getNro_colegiatura(),legajos.getHoras(),legajos.getNiveldescripcion());
    }

    @Override
    public List<TiempoServicio> TipoTiempoServicio(String tipo) {
        return legajosMapper.tipoTiempoServicio(tipo);  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public List<Resoluciones> buscarResoluciones(String codigo,Integer numserest) {
        return legajosMapper.buscarResoluciones(codigo,numserest);
    }

    @Override
    public void addResolucion(Resoluciones resoluciones) {
        legajosMapper.addResolucion(resoluciones.getRes_tipo_cod(),resoluciones.getRes_fecha(),resoluciones.getRes_id(),resoluciones.getRes_anio(),resoluciones.getRes_mes()
                ,resoluciones.getRes_dia(),resoluciones.getRes_codser(),resoluciones.getRes_num_serest());
    }

    @Override
    public List<Resoluciones> buscarResoluciondeServ(String codigo, String numserest) {
        return legajosMapper.buscarResoluciondeServ(codigo, numserest);
    }

    @Override
    public void removeTiempoServicio(int id) {
        legajosMapper.removeTiempoServicio(id);
    }

    @Override
    public void updateResolucion(Resoluciones resoluciones) {
        legajosMapper.updateResolucion(resoluciones.getRes_seq_tmp_serv(),resoluciones.getRes_fecha(),resoluciones.getRes_id(),resoluciones.getRes_anio()
                ,resoluciones.getRes_mes(),resoluciones.getRes_dia());
    }

    @Override
    public List<Legajos> tipoPago() {
        System.out.println(legajosMapper.TipEstudio().get(1).getDesc_parent()+"-");
        return legajosMapper.tipoPago();
    }


    @Override
    public List<LegajosCargaFamiliar> cargaFamiliar(String dni) {
        System.out.println("ACA"+dni);
        //System.out.println(legajosMapper.cargaFamiliar(dni).get(1).getCarfamnom()+"-");
        return legajosMapper.cargaFamiliar(dni);
    }

    @Override
    public void addDatosFamiliares(String nom,String fampar,String CargFamdir,String Cargfamdoc,String Cargfamnumdoc,String Cargfamsex,
                                   String Cargfamfechnac,String Cargfamtel,String Cargfamrestciv,String Cargfamben,String Cargfamnumessal,
                                   String  Cargfamdep,String Cargfamcodser) {
        //System.out.println("ACA"+dni);
        //System.out.println(legajosMapper.cargaFamiliar(dni).get(1).getCarfamnom()+"-");
        legajosMapper.addDatosFamiliares(nom,fampar, CargFamdir, Cargfamdoc,Cargfamnumdoc, Cargfamsex,Cargfamfechnac,Cargfamtel, Cargfamrestciv,Cargfamben,Cargfamnumessal,Cargfamdep,Cargfamcodser);
    }
    @Override
    public void editarDatosFamiliares(String nom,String fampar,String CargFamdir,String Cargfamdoc,String Cargfamnumdoc,String Cargfamsex,
                                      String Cargfamfechnac,String Cargfamtel,String Cargfamrestciv,String Cargfamben,String Cargfamnumessal,
                                      String  Cargfamdep,String Cargfamcodser,Integer carfamsec) {
        //System.out.println("ACA"+dni);
        //System.out.println(legajosMapper.cargaFamiliar(dni).get(1).getCarfamnom()+"-");
        legajosMapper.editarDatosFamiliares(nom,fampar, CargFamdir, Cargfamdoc,Cargfamnumdoc, Cargfamsex,Cargfamfechnac,Cargfamtel, Cargfamrestciv,Cargfamben,Cargfamnumessal,Cargfamdep,Cargfamcodser,carfamsec);
    }
    @Override
    public int idFamiliar(String dni,String serv){
        //System.out.println("ACA"+dni);
        //System.out.println(legajosMapper.cargaFamiliar(dni).get(1).getCarfamnom()+"-");
        List<LegajosCargaFamiliar> lcf = legajosMapper.idFamiliar(dni,serv);
        System.out.println("Vuelta"+lcf.get(0).getCargfamsec());
        return lcf.get(0).getCargfamsec();
    }

    @Override
    public void addBeneficiarios(String tipopago, int numcuenta, String titularcuenta,String idFamiliar,String codResol,int tipoBeneficiario){
        //System.out.println("ACA"+dni);
        //System.out.println(legajosMapper.cargaFamiliar(dni).get(1).getCarfamnom()+"-");
        legajosMapper.addBeneficiarios(tipopago,numcuenta,titularcuenta,idFamiliar,codResol,tipoBeneficiario);
    }
    @Override
    public void removeFamiliar(Integer idfam ){
        //System.out.println("ACA"+dni);
        //System.out.println(legajosMapper.cargaFamiliar(dni).get(1).getCarfamnom()+"-");
        legajosMapper.removeFamiliar(idfam);
    }
    @Override
    public void removeBeneficiario(Integer idfam ){
        //System.out.println("ACA"+dni);
        //System.out.println(legajosMapper.cargaFamiliar(dni).get(1).getCarfamnom()+"-");
        legajosMapper.removeBeneficiario(idfam);
    }

    @Override
    public List<LegajosCargaFamiliar> validarEditDocumento(String numdoc, String carfamsec) {
        return legajosMapper.validarEditDocumento(numdoc,carfamsec);
    }
    @Override
    public List<Resolucion> getResolsxMotivoPers(String codSerPer) {
        return legajosMapper.getResolsxMotivoPers(codSerPer);  //To change body of implemented methods use File | Settings | File Templates.
    }
    @Override
    public List<Resolucion> getBeneficiosXPers(String codSerPer,Integer numserest) {
        return legajosMapper.getBeneficiosXPers(codSerPer,numserest);  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public List<Resolucion> getLicenciasXPers(String codSerPer,Integer numserest) {
        return legajosMapper.getLicenciasXPers(codSerPer,numserest);  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public List<Resolucion> getInvesXPers(String codSerPer,Integer numserest) {
        return legajosMapper.getInvesXPers(codSerPer,numserest);  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public List<Resolucion> getMeriDemeXPers(String codSerPer,Integer numserest) {
        return legajosMapper.getMeriDemeXPers(codSerPer,numserest);  //To change body of implemented methods use File | Settings | File Templates.
    }
}
