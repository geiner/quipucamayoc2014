package edu.quipu.rrhh.services;

import edu.quipu.rrhh.models.*;

import java.util.List;


public interface LegajosService {

    List<Legajos> buscarLegajos(String dni);

    List<Servidor> buscarServidores();

    List<Legajos> TipoEstudio();

    List<Legajos> nivelEstudio(String tipo);

    List<Legajos> paisEstudio();

    List<Legajos> estadoCivil();
    List<Legajos> tipoBeneficio();
    List<Legajos> tipoDocumento();

    List<Legajos> tipoParentesco();

    List<Legajos> idiomaEstudio();

    void addEstudio(Legajos legajos);

    void removeEstudio(int estid);
    List<LegajosCargaFamiliar> validarExisteDocumento(String numdoc);
    void updateEstudios(Legajos legajos);

    List<TiempoServicio> TipoTiempoServicio(String tipo);

    List<Servidor> getDatosPersonalesServidor(String codSerPer);

    List<Resoluciones> buscarResoluciones(String codigo,Integer numserest);

    void addResolucion(Resoluciones resoluciones);

    List<Resoluciones> buscarResoluciondeServ(String codigo, String numserest);

    void removeTiempoServicio(int id);

    void updateResolucion(Resoluciones resoluciones);

    List<Legajos> tipoPago();

    List<LegajosCargaFamiliar> cargaFamiliar(String dni);
    int idFamiliar(String dni,String serv);
    void addDatosFamiliares(String nom,String fampar,String CargFamdir,String Cargfamdoc,String Cargfamnumdoc,String Cargfamsex,
                            String Cargfamfechnac,String Cargfamtel,String Cargfamrestciv,String Cargfamben,String Cargfamnumessal,
                            String  Cargfamdep,String Cargfamcodser);

    void editarDatosFamiliares(String nom,String fampar,String CargFamdir,String Cargfamdoc,String Cargfamnumdoc,String Cargfamsex,
                               String Cargfamfechnac,String Cargfamtel,String Cargfamrestciv,String Cargfamben,String Cargfamnumessal,
                               String  Cargfamdep,String Cargfamcodser,Integer Cargfamsec);
    void addBeneficiarios(String tipopago, int numcuenta, String titularcuenta,String idFamiliar,String codResol,int tipoBeneficiario);

    void removeFamiliar(Integer idfam);
    void removeBeneficiario(Integer idfam);

   List<LegajosCargaFamiliar> validarEditDocumento(String numdoc, String carfamsec);

    List<Resolucion> getResolsxMotivoPers(String codSerPer);
    List<Resolucion> getBeneficiosXPers(String codSerPer,Integer numserest);
    List<Resolucion> getLicenciasXPers(String codSerPer,Integer numserest);
    List<Resolucion> getInvesXPers(String codSerPer,Integer numserest);
    List<Resolucion> getMeriDemeXPers(String codSerPer,Integer numserest);
}
