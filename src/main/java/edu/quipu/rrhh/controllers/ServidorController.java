package edu.quipu.rrhh.controllers;

//import edu.quipu.rrhh.services.DocumentoIdentidadService;
//import edu.quipu.rrhh.services.EstadoAFPService;
//import edu.quipu.rrhh.services.EstadoCivilService;
//import edu.quipu.rrhh.services.ServidorService;
import edu.quipu.rrhh.models.*;
import edu.quipu.rrhh.services.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(value = "/rest/cas/serv")
public class ServidorController {

    static final Logger logger = LoggerFactory.getLogger(ServidorController.class);

    @Autowired
    private DocumentoIdentidadService documentoIdentidadService;
    //
    @Autowired
    private EstadoCivilService estadoCivilService;


    @Autowired
    private EstadoAFPService estadoAFPService;
    //
    @Autowired
    private RegimenPensionarioService  regimenPensionarioService;

    @Autowired
    private ServidorService servidorService;

    @Autowired
    private TipoEstudioService tipoEstudioService;

    @Autowired
    private NivelEducacionService nivelEducacionService;

    @Autowired
    private TipOcupacionUniService tipoOcupacionUniService;

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json", produces = "application/json", value = "/servidor")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String saveServid(@RequestBody Servidor servidor) {
        System.out.println("Entroooooooooooooo!!!!!!!!");
        System.out.println(servidor.getCodigo()+"-"+servidor.getPaterno()+"-"+servidor.getMaterno()+"-"+servidor.getNombre()+"-"+servidor.getEstCiv()+
        "-"+servidor.getTipoDoc()+"-"+servidor.getNumDoc()+"-"+servidor.getSexo()+"-"+ servidor.getNacimiento()+"-"+servidor.getPaisNac()+"-"+servidor.getCodNacdepart()+"-"+servidor.getCodNacprov()+"-"+servidor.getCodNacditr()+"-"+servidor.getEspfdom()+
        "-"+servidor.getPaisDomcilio()+"-"+servidor.getCodDepartamento()+"-"+servidor.getCodProvincia()+"-"+servidor.getCodDistrito()+"-"+servidor.getDomicilio()+"-"+servidor.getHij()+"-"+servidor.getRuc()+
        "-"+servidor.getEstVit()+"-"+servidor.getDiscapacidad()+"-"+servidor.getFechaInUnmsm()+"-"+"-"+servidor.getTelefono()+"-"+servidor.getCelular()+"-"+servidor.getCorreo()+" fin");
        //logger.info(servidor.toString());
        servidorService.saveServidor(servidor);
       //servidor = servidorService.findByCod(servidor).get(0);
        return "save";
    }
    @RequestMapping(method = RequestMethod.POST,consumes = "application/json",produces = "application/json",value = "/updateservidor")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String updateServidor(@RequestBody Servidor servidor){
        System.out.println(servidor.getEspfdom()+"/"+servidor.getPaisNac());
        servidorService.updateServidor(servidor);
        return "";
    }

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json", produces = "application/json", value = "/servidor/save")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void saveServidor(@RequestBody Servidor servidor){
        servidorService.saveServidor(servidor);
    }

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json", produces = "application/json", value = "/servidorlaboral")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public ServidorLaboral saveLaboral(@RequestBody ServidorLaboral servidorLaboral) {
        System.out.println("entro");
        System.out.println(servidorLaboral.getCod()+"-"+servidorLaboral.getCat()+"-"+servidorLaboral.getTip()+"-"+servidorLaboral.getRegPen()+"-"+servidorLaboral.getCueBan()
                +"-"+servidorLaboral.getTipPag()+"-"+servidorLaboral.getConPla()+"-"+servidorLaboral.getEntAse()+"-"+servidorLaboral.getTipGen()+"-"+servidorLaboral.getNumPen()
                +"-"+servidorLaboral.getEstAfp()+"-"+servidorLaboral.getRegLab()+"-"+servidorLaboral.getInsregpen()+"-"+servidorLaboral.getSindic()+"-"+servidorLaboral.getTipocupuni());
        servidorService.saveLaboral(servidorLaboral);
        System.out.println("segundo");
        servidorService.saveLaboral2(servidorLaboral);

        return servidorLaboral;
    }

    @RequestMapping(method = RequestMethod.POST,consumes = "application/json",produces = "application/json",value = "/updateservidorlaboral")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public String updateServidoLaboral(@RequestBody ServidorLaboral servidorLaboral){
        System.out.println(servidorLaboral.getRuc()+"!!!!!!!!!!!!!!!!!!!");
        servidorService.updateServidorLaboral(servidorLaboral);
        servidorService.updateServidorLaboral2(servidorLaboral);
        return "";
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/tiposdocumento")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<DocumentoIdentidad> listarTiposDocumentos() {
        return  documentoIdentidadService.findAllIdentidad();
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/servidorgenericos")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<ServidorGenerico> listarServidorGenericos() {
        return servidorService.findAllGen();
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/servidortipo/tipgen/{tipgen}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<ServidorTipo> listarServidores(@PathVariable(value = "tipgen") Integer codTipGen) {
        ServidorGenerico servidorGenerico = new ServidorGenerico();
        servidorGenerico.setCod(codTipGen);
        return servidorService.findByTipGen(servidorGenerico);
    }
    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/laboral/codigo/{codigo}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public ServidorLaboral findLaboralByCod(@PathVariable(value = "codigo") String codigo) {
        ServidorLaboral servidorLaboral = new ServidorLaboral();
        servidorLaboral.setCod(codigo);
        List<ServidorLaboral> servidores = servidorService.findByCodLaboral(servidorLaboral);
        if (servidores.size() == 0)
            return null;
        return servidores.get(0);
    }


    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/estadosciviles")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<EstadoCivil> listarEstadosCiviles() {
        return estadoCivilService.findAllCivil();
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/estadosservidor")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<ServidorEstado> listarEstadosServidor() {
        return servidorService.findAllEstado();
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/servidortipos")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<ServidorTipo> listarServidorTipos() {
        return servidorService.findAlltipo();
    }
    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/servidorcargos")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<ServidorCargo> listarServidorCargos() {
        return servidorService.findAllCargo();
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/estadosafp", params = {"regPen"})
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<EstadoAfp> listarEstadosAfp(@RequestParam(value = "regPen") Integer regPen) {
        RegimenPensionario regimenPensionario = new RegimenPensionario();
        regimenPensionario.setCod(regPen);
        return estadoAFPService.FindAllAfp(regimenPensionario);
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/regimenpensionario")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<RegimenPensionario> listarRegimenesPensionarios() {
        return regimenPensionarioService.findAllRegimen();
    }


    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/categoriaservidor/{cat}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<CategoriaServidor> listarServidorCategorias(@PathVariable(value = "cat") int categoria) {
        return servidorService.findAllCategoria(categoria);
    }



    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/condicionesplanilla")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<CondicionPlanilla> listarCondicionesPlanilla() {
        return servidorService.findAllCondicionPlanilla();
    }


    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/tiposdepago")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<TipoPago> listarTiposDePago() {
        return servidorService.findAllPago();
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/codigo/{codigo}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public Servidor findByCod(@PathVariable(value = "codigo") String codigo) {
        Servidor servidor = new Servidor();
        System.out.println("codigooooo!!!"+codigo);
        servidor.setCodigo(codigo);
        List<Servidor> servidores = servidorService.findByCod(servidor);
        if (servidores.size() == 0)
            return null;
        return servidores.get(0);
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/entidadaseguradora")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<EntidadAseguradora> findAllEntidad(){

        return servidorService.findAllEntidad();
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/entidadesaseguradoras", params={"regPen"})
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<EntidadAseguradora> findByRpeEntidad(@RequestParam(value = "regPen") Integer regPen){
        return servidorService.findByRpeEntidad(regPen);
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/tiposestudio")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<TipoEstudio> listarTiposEstudio() {
        return tipoEstudioService.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/niveleseducacion/{tipEst}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<NivelEducacion> listarNivelesEducacion(@PathVariable(value = "tipEst") String tipEst) {
        return nivelEducacionService.findAll(tipEst);
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/paises")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<Pais> findAllCountries(){
        System.out.println("findAllCountries");
        return servidorService.findAllCountries();
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/paisNacimiento")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<Pais> listarPaisNacimiento(){
        System.out.println("findAllCountries");
        return servidorService.nacimientoPaises();
    }


    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/departments")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<Domicilio> findAllDepartments(){
        System.out.println("findAllDepartments");
        return servidorService.findAllDepartments();
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/provincies/{idDep}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<Domicilio> findAllProvincies(@PathVariable(value = "idDep") Integer idDep){
        System.out.println("findAllProvincies");
        return servidorService.findAllProvincies(idDep);
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/districts/{idDep}/{idProv}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<Domicilio> findAllDistricts(@PathVariable(value = "idDep") Integer idDep, @PathVariable(value = "idProv") Integer idProv){
        System.out.println("findAllDistricts");
        return servidorService.findAllDistricts(idDep, idProv);
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/tipocupacionuni")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody
    public List<TipOcupacionUni> listarTipOcupacionUni() {
        return  tipoOcupacionUniService.findAllOcupacion();
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json", value = "/servidores")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ResponseBody

    public List<Servidor> todosServidores() {
        System.out.println("TODOS LOS SERVIDORES!!!");
        return servidorService.todosServidores();
    }
//

}

