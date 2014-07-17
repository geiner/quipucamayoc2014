package edu.quipu.rrhh.services;

import edu.quipu.rrhh.models.*;

import java.util.List;


public interface ServidorService {
    public void save(Servidor servidor);
    public void saveServidor(Servidor servidor);
    List<Servidor> findByCod(Servidor servidor);
    public List<ServidorLaboral> findByCodLaboral(ServidorLaboral servidorLaboral);
    public void saveLaboral(ServidorLaboral servidorLaboral);
    List<ServidorGenerico> findAllGen();
    List<ServidorCargo> findAllCargo();
    List<ServidorEstado> findAllEstado();
    List<ServidorTipo> findAlltipo();
    public List<ServidorTipo> findByTipGen(ServidorGenerico tipGen);
    public List<CategoriaServidor> findAllCategoria(int categoria);
    public List<CondicionPlanilla> findAllCondicionPlanilla();
    public List<TipoPago> findAllPago();
    public List<EntidadAseguradora> findAllEntidad();
    public List<EntidadAseguradora> findByRpeEntidad(int rpeId);
    public boolean Existe_servidor(String correo);
    boolean Existe_histusu(String email);
    void insertUsuPerfil(String email);
    public List<Pais> findAllCountries();
    public List<Domicilio> findAllDepartments();
    public List<Domicilio> findAllProvincies(Integer idDep);
    public List<Domicilio> findAllDistricts(Integer idDep, Integer idProv);
    public List<Servidor> todosServidores();
    void saveLaboral2(ServidorLaboral servidorLaboral);
    public List<Pais> nacimientoPaises();

    void updateServidor(Servidor servidor);

    void updateServidorLaboral(ServidorLaboral servidorLaboral);

    void updateServidorLaboral2(ServidorLaboral servidorLaboral);

    void saveHistHistDep(ServidorLaboral servidorLaboral);

    void saveHistBanco(ServidorLaboral servidorLaboral);

    void saveHistCondAseg(ServidorLaboral servidorLaboral);

    void saveHistCondLab(ServidorLaboral servidorLaboral);

    void saveHistCondPlani(ServidorLaboral servidorLaboral);
}
