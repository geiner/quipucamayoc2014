define(["app", "hbs!apps/estado_condicion/form/templates/inicio_estado_condicion","apps/estado_condicion/form/view/listar_servidor",
    "apps/estado_condicion/form/view/listar_resolucion","apps/estado_condicion/form/view/listar_contratos" ,"apps/estado_condicion/form/view/tipo",
    "apps/estado_condicion/form/view/regimen", "apps/estado_condicion/form/view/entidad",
    "apps/estado_condicion/form/view/estadoafp", "apps/estado_condicion/form/view/tipopago","apps/estado_condicion/form/view/condpla", "apps/estado_condicion/form/view/tabla_cond_lab",
    "apps/estado_condicion/form/view/tabla_pago_banco","apps/estado_condicion/form/view/tabla_cond_aseg",
    "apps/estado_condicion/form/view/tabla_dep","apps/estado_condicion/form/view/tabla_cond_pla", "apps/estado_condicion/form/model/Guardar_Cond_Lab","apps/estado_condicion/form/model/Guardar_Alert",
    "apps/estado_condicion/form/model/Guardar_Cond_Aseg", "apps/estado_condicion/form/model/Guardar_Dependencia", "apps/estado_condicion/form/model/Guardar_Cond_Banco", "apps/estado_condicion/form/model/Guardar_Cond_Pla",
    "apps/estado_condicion/form/view/categoria_prof","apps/planillas/list/view/unidades-dialog",
        "apps/estado_condicion/form/view/tablaPlazasAsignadas",
        "apps/estado_condicion/form/view/tablaHistorialPlazas",
        "apps/estado_condicion/form/view/modalEliminacionItemHistorial",
        "apps/estado_condicion/form/model/eliminarHistorialPlaza",
        "apps/estado_condicion/form/model/addHistorialPlaza",

    "jquery","lib/jquery.dataTables.min","lib/bootstrap-datepicker","lib/core/validXtrem","bootstrap"],

    function (ErzaManager, InicioTemp, ListarServidorView, ListarResolView,ListarContrView,TipoView, RegimenView,
              EntidadView, EstadoAfpView, TipoPagoView, CondPlaView, Tabla_Cond_LabView, Tabla_Pago_BancoView,Tabla_Cond_AsegView, Tabla_DepView,Tabla_Cond_PlaView, Guardar_CondLabModel,
              Guardar_AlertModel, Guardar_CondAsegModel, Guardar_DependenciaModel,Guardar_PagoBancoModel, Guardar_CondPlaModel, CategoriaProfView,UnidadesDialogView,tablaPlazasAsignadasView, historialPlazaView, modalEliminacionItemHistorialView,  eliminarHistorialPlazaModel,addHistorialPlazaModel) {
        ErzaManager.module('EstadoCondicionApp.Form.View', function (View, ErzaManager, Backbone, Marionette, $, _) {



            View.Layout = Marionette.Layout.extend({



                template: InicioTemp,
                ListarServidorView: new ListarServidorView(),
                ListarResolView: new ListarResolView(),
                ListarContrView:new ListarContrView(),
                TipoView: new TipoView(),

                RegimenView: new RegimenView(),
                EntidadView: new EntidadView(),
                EstadoAfpView: new EstadoAfpView(),
                TipoPagoView: new TipoPagoView(),
                CondPlaView: new CondPlaView(),
                Tabla_Cond_LabView: new Tabla_Cond_LabView(),
                Tabla_Cond_AsegView: new Tabla_Cond_AsegView(),
                Tabla_DepView: new Tabla_DepView(),
                Tabla_Pago_BancoView: new Tabla_Pago_BancoView(),
                CategoriaProfView: new CategoriaProfView(),
                unidadesDialog: new UnidadesDialogView(),
                Tabla_Cond_PlaView: new Tabla_Cond_PlaView(),

                tablaPlazasAsignadasView: new tablaPlazasAsignadasView(),
                historialPlazaView: new historialPlazaView(),
                modalEliminacionItemHistorialView: new modalEliminacionItemHistorialView(),


                // Variables,
                codigo: null,
                numserest: null,

                codEst:null,
                codCateg:null,
                codGen:null,
                codTipo:null,
                elementoClickeado: null,
                unidadClicked: {
                    unidadId:10002,
                    unidadDesc:"UNMSM"
                },
                depAct:null,
                depCes:null,
                cod: null,
                codDepen:null,
                codGenDepen:null,
                numest:null,
                ti:null,
                cod_ti:null,
                numresol: null,
                udcod:0,
                ctabanco:null,
                unidadSelected: {
                    unidadId:10225,
                    unidadDesc:"C0319 - PROYECTO QUIPUCAMAYOC"
                },



                idPlaza:0,//mio
                nombreDep:"Ninguno",//Mio
                idRotacionPlaza:0,


                regions:{
                    ListarReg: "#estado_condicion-modal1",
                    ListContratos:"#modal_contratos",
                    ResolReg: "#listar_resol_modal",
                    TipoReg: "#div_tipo",

                    RegReg: "#div_reg_pen",
                    EntReg: "#div_ent_aseg",
                    EstAfpReg: "#div_est_afp",
                    TipoPagoReg:"#div_tip_pago",
                    CondPlaReg: "#div_cond_pla",
                    TCLReg: "#table-condlab",
                    TCAReg: "#table-condaseg",
                    TDReg: "#table-depen",
                    TPBReg: "#table-pagobanco",
                    TCPReg: "#table-condpla",
                    CategoriaProfReg: "#div_categ_prof",

                    unidadesModalReg: "#modal-unidades",


                    "tabla_plazas_asignadasHtml":"#tabla_plazas_asignadas",
                    "tabla_historial_plazaHtml":"#tabla_historial_plaza",
                    "modalEliminacionItemHistorialHtml":"#modalEliminacionItemHistorial"


                },

                events:{
                    "click #search": "llamarModalListar",


                    "click #depen":"fun_depen",

                    "click #est_trab":"fun_est_trab",

                    "click #bus_resol":"llamarModalResol",
                    "dblclick #tabla > tbody > tr ": "seleccionarServidor",
                    "dblclick #tabla_resol > tbody > tr": "seleccionarResolucion",
                    "click #btn-condlab": "guardarCondLab",

                    "click #condLab":"fun_condLab",
                    "click #condAseg":"fun_condAseg",
                    "click #tipoPag":"fun_tipoPago",


                    "dblclick #tabla_contratos >tbody>tr":"selectContr",

                    "click #header_est_cod>ul>li":"cambPest",
                    //"click .btn-modal": "modalConfirm",
                  //  "change #categ": "cambioCategoria",
                   // "change #div_tipo": "cambioTipo",

                    "click #bus_contratos":"fun_buscar_contratos",

                    "click #cese_fech_clos":"clear_fecha",

                    "change #pla":"camb_cese",
                    "click .tree li": "clickUnidad",
                    "change #cod_adm": "cambioAdm",
                    "change #cod_doc": "cambioDoc",
                    "change #cod_doc_mag": "cambioDocMag",
                    "change #cod_adm_salud": "cambioAdmSalud",
                    "change #tipopago": "mostrarctabanco",
                    "change #reg":"fun_regimen",
                    "click #btn-condaseg": "guardarCondAseg",
                    "click #btn-dep": "guardarDep",
                    "click #btn-pagobanco": "guardarPagoBanco",
                    "click #btn-condpla": "guardarCondPla",
                    "click #bus_dep":"llamarModalUnidades",
                    "click #boton-unidad":"seleccionarunidad",

                    "click .reset-condlab":"fun_nuevo",
                    //"click #nomb_fech_show":"mostrarcalendarionomb", // cuando se hace clic en el boton fecha nombramiento...
                    "click #cese_fech_show":"mostrarcalendariocese", //  cuando se hace clic en el boton fecha cese...


                    "click #btnMostrarFechaRotacion": "mostrarFechaRotacion",//Mio
                    "click #btnLimpiarFechaRotacion": "limpiarFechaRotacion",//Mio
                    "dblclick #tabla_plazas > tbody > tr ": "seleccionarHistorialPlaza",
                    "click #botonMostrarModalEliminacion":"mostrarModalEliminacion",
                    "click #botonItemHistorialPlaza":"eliminarItemHistorialPlaza",
                    "click #botonAddItemHistorialPlaza":"agregarItemHistorialPlaza",
                    "click #botonClearItemHistorialPlaza":"limpiarFormularioAddItem"



                },

                 onRender: function(){
                 this.initialFetch();
                     this.TipoReg.show(this.TipoView),

                     this.RegReg.show(this.RegimenView),

                     this.EstAfpReg.show(this.EstadoAfpView),
                     this.TipoPagoReg.show(this.TipoPagoView),
                     this.CondPlaReg.show(this.CondPlaView)





                 },

                initialize: function () {

                    //initialize model
                    this.model = new Backbone.Model();


                    this.model.set({
                        "guardarHist": new Guardar_CondLabModel(),
                        "guardaralertpend": new Guardar_AlertModel(),
                        "guardarcondaseg": new Guardar_CondAsegModel(),
                        "guardardependencia": new Guardar_DependenciaModel(),
                        "guardarpagobanco": new Guardar_PagoBancoModel(),
                        "guardarcondpla": new Guardar_CondPlaModel(),



                        eliminarHistorialPlazaModel: new eliminarHistorialPlazaModel(),
                        addHistorialPlazaModel: new addHistorialPlazaModel()

                    });
                },

                initialFetch: function(){

                    this.TipoView.getTipo();

                    this.RegimenView.getRegimen();

                    this.EstadoAfpView.getEstadoAfp();

                    this.TipoPagoView.getTipoPago();
                    this.CondPlaView.getCondPla();
                    this.ListarServidorView.fetchServ();

                },

                mostrarctabanco: function(){
                    if("1"==$('#tipopago').val()){
                        $('#div_banco').show();
                    } else{
                        $('#div_banco').hide();
                        $("#numctabanco").val("");
                    }
                },
                fun_condAseg:function(){
                    $("#est_cond").hide();
                },
                fun_condLab:function(){
                    $("#est_cond").hide();
                },
                fun_tipoPago:function(){
                    $("#est_cond").hide();
                },
                clear_fecha:function(){
                  $("#fech_cese").val("");
                },
                fun_depen:function(){
                    $("#est_cond").hide();
                    $("#numresol_dep").val("");
                    $("#depencia").val("");
                },
                fun_est_trab:function(){
                    $("#est_cond").hide();
                },
                clickUnidad:function(e){
                    if(this.elementoClickeado){
                        $(this.elementoClickeado).css({
                            "background": "",
                            "color": "",
                            "border": ""
                        });
                    }
                    var clickedElement=$(e.currentTarget);
                    var children = clickedElement.find('> ul > li');
                    if (children.is(":visible")) children.hide('fast');
                    else children.show('fast');
                    e.stopPropagation();
                    this.unidadClicked.unidadId=clickedElement.find('input:first').val();
                    this.unidadClicked.unidadDesc=clickedElement.find('a:first').html();
                    console.log(this.unidadClicked);
                    this.elementoClickeado=$(e.currentTarget).find('a:first').css({
                        "background": "#c8e4f8",
                        "color": "#000",
                        "border": "1px solid #94a0b4"
                    });
                },


                mostrarcalendariocese: function(){
                    var fecha_cese = $('#fech_cese');

                    fecha_cese.datepicker({
                        format: 'dd/mm/yyyy',
                        viewMode: 2
                    });

                    fecha_cese.datepicker('show');

                },
                cambPest:function(){
                   $("#correcto").hide();
                   $("#advertencia").hide();
                } ,


                llamarModalUnidades: function(){
                    var self=this;
                    if(self.codigo!=null && self.numserest!=null){
                        this.unidadesModalReg.show(this.unidadesDialog);

                        $('#modal-unidades').modal("show");

                    }


                },


                seleccionarunidad:function(){



                    $('#modal-unidades').modal('hide');
                    this.unidadSelected = this.unidadClicked;

                    var aux=this.unidadSelected.unidadDesc.split("-");

                    $("#depencia").val(aux[1].trim());
                    this.codDepen=aux[0].trim();
                    this.codGenDepen=this.unidadSelected.unidadId;

                    console.log("Cambio unidad: "+this.unidadSelected.unidadDesc);
                    console.log("Cambio unidad: "+this.unidadSelected.unidadId);


                },

                camb_cese:function(){
                  if($("#pla").val()=="5" || $("#pla").val()=="6" || $("#pla").val()=="10" || $("#pla").val()=="9"){

                      $("#div_fech_cese").show();
                  }
                    else{
                      $("#div_fech_cese").hide();
                  }
                },

                fun_nuevo:function(){

                    this.numserest=null;
                    this.codigo=null;

                    $("#sec_est_cond").hide();
                    $("#form_insert").hide();
                    $("#form_insert1").hide();
                    $("#est_cond").hide();
                    $("#form_insert4").hide();
                    $("#form_insert2").hide();
                    $("#form_insert3").hide();
                    this.TCLReg.reset();
                    this.TDReg.reset();
                    this.TCPReg.reset();
                    this.TCAReg.reset();
                    this.TPBReg.reset();
                    $("#tipPago").val("");
                    $("#regPens").val("");
                    $("#entAseg").val("");
                    $("#estAFP").val("");
                    $("#nroPen").val("");
                    $("#nroPensio").val("");
                    $("#numresol_aseg").val("");
                    $("#estafp").val("100");
                    $("#ent").val("100");
                    $("#reg").val("100");
                    $("#div_numPen").hide();
                    $("#div_est_afp").hide();
                    $("#div_ent_aseg").hide();

                    $("#div_fech_cese").hide();
                    $("#obs").val("");
                    $("#numresol_pla").val("");
                    $("#fech_cese").val("");
                    $("#cond_plani").val("");
                    $("#pla").val("100");
                    $("#div_numCuent").hide();

                    $("#unid_depen").val("");
                    $("#depencia").val("");
                    $("#numresol_dep").val("");
                    $("#estito").val("");
                    $("#tipoGen").val("");
                    $("#tipito").val("");
                    $("#catito").val("");
                    $("#estLab").val("");
                    $("#tipoGene").val("");
                    $("#tipoAct").val("");
                    $("#numresol").val("");
                    $("#categ_prof").val("9");


                },
                fun_regimen:function(){
                    var regPen=$("#reg").val();

                    if(regPen=="4"){
                        this.EntidadView.getEntidad(regPen);
                        this.EntReg.show(this.EntidadView);

                        $("#ent").val("100");

                        $("#estafp").val("100");
                        $("#nroPensio").val("");
                        $("#div_ent_aseg").show();
                        $("#div_est_afp").show();

                        $("#div_numPen").show();
                    }
                    if(regPen=="3"){
                        this.EntidadView.getEntidad(regPen);
                        this.EntReg.show(this.EntidadView);

                        $("#estafp").val("100");
                        $("#nroPensio").val("");
                        $("#div_ent_aseg").show();
                        $("#div_est_afp").hide();
                        $("#div_numPen").hide();
                    }
                    if(regPen=="5" || regPen=="6" || regPen=="100"){

                        $("#ent").val("100");

                        $("#estafp").val("100");
                        $("#nroPensio").val("");
                        $("#div_ent_aseg").hide();
                        $("#div_est_afp").hide();
                        $("#div_numPen").hide();
                    }


                },
                fun_buscar_contratos:function(){

                 var self=this;

                    if(self.codigo!=null & self.numserest!=null){

                        if($("#est_emp").text()=="CAS"){
                            self.ListarContrView.fetchContratos(this.codigo,function(){

                                if(self.ListarContrView.collection.length!=0){
                                    $("#tabla_contratos").dataTable();
                                    $('#tabla_contratos_wrapper').append("<div id='footer-table'></div>");
                                    $('#tabla_contratos_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                    $('#tabla_contratos_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                    $('.dataTables_filter input').attr('placeholder','Buscar..');
                                }
                                else{
                                    alert("NO TRAJO NADA");
                                }

                            });

                            self.ListContratos.show(self.ListarContrView);

                            $("#modal_contratos").modal();
                        }else{

                            $("#desc_serv").text($("#employed").text());
                            $("#desc_est").text($("#est_emp").text());
                            $("#modal_message").modal("show");
                        }
                    }



                },





                llamarModalListar: function(e){

                    var self=this;
                    var clickedElement=$(e.currentTarget);

                    clickedElement.button('loading');

                    setTimeout(function () {
                        clickedElement.button('reset');
                        self.ListarReg.show(self.ListarServidorView) ;

                            if(self.ListarServidorView.collection.length!=0){
                                $("#tabla").dataTable();

                                $('#tabla_wrapper').append("<div id='footer-table'></div>");
                                $('#tabla_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                $('#tabla_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                $('.dataTables_filter input').attr('placeholder','Buscar..');
                            }


                        $("#estado_condicion-modal1").modal();

                    },2000);

                    $("#advertencia").hide();
                    $("#correcto").hide();

                    $('#tipo').val("1") ;
                    $('#cod_doc').val("0");

                    $('#div_administrativo').hide();
                   // $('#div_doc_mag').hide();
                   // $('#div_adm_salud').hide();
                    $('#categ_prof').val("9");
                    $('#div_categ_prof').show();
                    $('#numresol').val("");
                    $('#numresol_aseg').val("");
                    $('#numresol_dep').val("");
                    $('#numresol_pla').val("");
                    this.numresol=null;
                    $('#numsispen').val("");
                    $('#numctabanco').val("");
                    $('#obs').val("");



                },

                llamarModalResol: function(){

                    var sel=this;
                    if(sel.codigo!=null & sel.numserest!=null){

                        sel.ListarResolView.fetchResoluciones(sel.codigo, sel.numserest, function(){
                            if(sel.ListarResolView.collection.length!=0){

                                $("#tabla_resol").dataTable();
                                $('#tabla_resol_wrapper').append("<div id='footer-table'></div>");
                                $('#tabla_resol_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                $('#tabla_resol_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                $('.dataTables_filter input').attr('placeholder', 'Buscar..');



                            }
                        });
                        sel.ResolReg.show(sel.ListarResolView);
                        $('#listar_resol_modal').modal();
                    }


                },

                selectContr:function(e){

                    var clickedElement=$(e.currentTarget);
                    var numContrato=clickedElement.children(':nth-child(1)').text();


                  $("#modal_contratos").modal("hide");

                    $("#numresol_dep").val(numContrato);

                },

                seleccionarServidor: function(e){
                    var self=this;

                    $('#form_insert').show();
                    $('#form_insert1').show();
                    $('#form_insert2').show();
                    $('#form_insert3').show();
                    $('#form_insert4').show();
                    $("#sec_est_cond").show();
                    $("#est_cond").hide();
                    var clickedElement=$(e.currentTarget);
/*
                    alert("codigo:"+clickedElement.attr("id")+" numserest:"+clickedElement.children(':nth-child(7)').text()+" ti:"+clickedElement.children(":nth-child(4)").text());
                    alert("nombre:"+clickedElement.children(':nth-child(1)').text()+" estado:"+clickedElement.children(':nth-child(5)').text()+" categoria:"+clickedElement.attr("data"));
*/
                    this.codigo=clickedElement.attr("id");

                    var codGen=clickedElement.attr("data1").trim();
                    var codEst=clickedElement.attr("data2");
                    this.numserest=clickedElement.children(':nth-child(7)').text();
                    this.ti=clickedElement.children(':nth-child(4)').text();

                    this.codTipo=codEst;
                    this.codGen=clickedElement.attr("data5");

                    this.codEst=clickedElement.attr("data3");

                    this.depAct=clickedElement.attr("data7");
                    this.depCes=clickedElement.attr("data6");

                    var conPlani=clickedElement.attr("data8");

                    var regPensi=clickedElement.attr("data9");

                    var entAseg=clickedElement.attr("data10");

                    var estAFP=clickedElement.attr("data11");
                    var numPensiones=clickedElement.attr("data12");
                    var cod=clickedElement.attr("id");
                    var nombre=clickedElement.children(':nth-child(1)').text();     //captura los valores del modal servidor ejem: child(1) es el campo 1=codigo

                    var numest=clickedElement.children(':nth-child(7)').text();

                    var desctip=clickedElement.children(':nth-child(4)').text().trim();

                    var est=clickedElement.children(':nth-child(6)').text().trim();
                    var cat=clickedElement.attr("data");

                    var tipoPago=clickedElement.attr("data13");
                    var numCuenta=clickedElement.attr("data14");
                    var codPago=clickedElement.attr("data15");



                    var dep=clickedElement.children(':nth-child(5)').text().trim();
                    var cod_ant=clickedElement.children(':nth-child(3)').text();

                    var dni=clickedElement.children(':nth-child(2)').text();


                   // alert(dni+" "+nombre+" "+cod_ant+" "+est);
                    if(this.codEst=="2" && this.codTipo=="1" && this.codGen=="1"){
                          $("#div_input").hide();
                          $("#div_select").show();

                    }
                    else{
                        $("#div_input").show();
                        $("#div_select").hide();
                    }

                    if(regPensi=="Ley 19990" || regPensi=="Ley 20530 - ACT" || regPensi=="Ley 20530 - CES"){
                        $("#div_estAFP").hide();
                        $("#div_nroPen").hide();

                    }
                    if(regPensi=="No Afil." || regPensi=="Sin obligacion"){
                        $("#div_entAseg").hide();
                        $("#div_estAFP").hide();
                        $("#div_nroPen").hide();
                    }
                    if(regPensi=="AFP"){
                        $("#div_entAseg").show();
                        $("#div_estAFP").show();
                        $("#div_nroPen").show();
                    }

                    if(codPago=="1"){
                        $("#tipPago").val(tipoPago);
                        $("#numCuenta").val(numCuenta);
                        $("#div_numCuent").show();
                    }
                    else{
                        $("#tipPago").val(tipoPago);
                        $("#div_numCuent").hide();
                    }


                    $("#regPens").val(regPensi);
                    $("#entAseg").val(entAseg);
                    $("#estAFP").val(estAFP);
                    $("#nroPen").val(numPensiones);

                    $("#cond_plani").val(conPlani);

                    $("#dni_emp").text(dni);
                    $('#employed').text(nombre);
                    $('#cod_ant').text(cod_ant);
                    $("#est_emp").text(est);
                    $('#id-numserest').text(numest);

                    $("#unid_depen").val(dep);
                    $('#tipito').val(desctip);
                    $('#catito').val(cat);
                    $('#estito').val(est);
                    $("#tipoGen").val(codGen);

                    $("#estLab").val(est);
                    $("#tipoGene").val(codGen);
                    $("#tipoAct").val(desctip);

                    $("#depencia").val("");

                    //$("#est").val(codEst);
                    $('#estado_condicion-modal1').modal('hide');


                      this.CategoriaProfView.fetchCategoriaProf(codEst,function(){

                          if(est=="CAS" && codGen=="ADMINISTRATIVO" && desctip=="ADMINISTRATIVO"){



                              for(var i=1;i<24;i++){

                                  $("#categ_prof>option").eq(i).hide();

                              }
                              $("#categ_prof>option").eq(17).show();
                              //console.log($("#categ_prof>option").length());
                          }

                          if(est=="CAS" && codGen=="DOCENTE" && desctip=="DOCENTE"){


                          }
                      });



                     this.CategoriaProfReg.show(this.CategoriaProfView);

                    //Levantar la tabla Condicion Laboral

                    self.Tabla_Cond_LabView.fetchTablaCondLab(cod,numest,function () {
                    if(self.Tabla_Cond_LabView.collection.length!=0){
                        $("#table-cond-lab").dataTable();
                        $('#table-cond-lab_wrapper').append("<div id='footer-table'></div>");
                        $('#table-cond-lab_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                        $('#table-cond-lab_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                        $('.dataTables_filter input').attr('placeholder', 'buscar..');
                          }
                        });
                    self.TCLReg.show(self.Tabla_Cond_LabView);

                    //Levantar la tabla Condicion del Asegurado
                    self.Tabla_Cond_AsegView.fetchTablaCondAseg(cod,numest,function () {
                        if(self.Tabla_Cond_AsegView.collection.length!=0){
                            $("#table-cond-aseg").dataTable();
                            $('#table-cond-aseg_wrapper').append("<div id='footer-table'></div>");
                            $('#table-cond-aseg_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                            $('#table-cond-aseg_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                            $('.dataTables_filter input').attr('placeholder', 'buscar..');


                        }
                    });
                    self.TCAReg.show(self.Tabla_Cond_AsegView);

                    //Levantar la tabla Dependencias
                    self.Tabla_DepView.fetchTablaDep(cod,numest,function () {
                        if(self.Tabla_DepView.collection.length!=0){

                            $("#table-dep").dataTable();
                            $('#table-dep_wrapper').append("<div id='footer-table'></div>");
                            $('#table-dep_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                            $('#table-dep_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                            $('.dataTables_filter input').attr('placeholder', 'buscar..');


                        }
                    });
                    self.TDReg.show(self.Tabla_DepView);

                    //Levantar la tabla tipo de pago (tb_hist_banco)
                    self.Tabla_Pago_BancoView.fetchTablaPagoBanco(cod, numest, function(){
                        if(self.Tabla_Pago_BancoView.collection.length!=0){
                            $("#table-pago-banco").dataTable();
                            $('#table-pago-banco_wrapper').append("<div id='footer-table'></div>");
                            $('#table-pago-banco_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                            $('#table-pago-banco_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                            $('.dataTables_filter input').attr('placeholder', 'buscar..');

                        }
                    });
                    self.TPBReg.show(self.Tabla_Pago_BancoView);

                    //Levantar la tabla condicion planilla (tb_hist_cond_plani)
                    self.Tabla_Cond_PlaView.fetchTablaCondPla(cod, numest, function(){
                        if(self.Tabla_Cond_PlaView.collection.length!=0){
                            $("#table-cond-pla").dataTable();

                            $('#table-cond-pla_wrapper').append("<div id='footer-table'></div>");
                            $('#table-cond-pla_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                            $('#table-cond-pla_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                            $('.dataTables_filter input').attr('placeholder', 'buscar..');

                        }
                    });
                    self.TCPReg.show(self.Tabla_Cond_PlaView);








                    this.tablaPlazasAsignadasView.mostrarPlazasAsignadasSegunDependencias(this.codigo,function () {
                        console.log("Entro 28/05/14!!!");
                        if(self.tablaPlazasAsignadasView.collection.length!=0){
                            $("#tabla_plazas").dataTable();
                            $('#tabla_plazas_wrapper').append("<div id='footer-table'></div>");
                            $('#tabla_plazas_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                            $('#tabla_plazas_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                            $('.dataTables_filter input').addClass('buscador');
                            $('.dataTables_filter input').attr('placeholder','Buscar..');
                        }
                        //$('#nom_depen').text(self.unidadSelected.unidadDesc);

                    });

                    this.tabla_plazas_asignadasHtml.show(this.tablaPlazasAsignadasView) ;
                    $("#tabla_historial_plaza").hide();



                },

                seleccionarResolucion: function(e){
                    var clickedElement=$(e.currentTarget);
                    this.numresol=clickedElement.children(':nth-child(1)').text();

                    $('#numresol').val(this.numresol);
                    $('#numresol_dep').val(this.numresol);
                    $('#numresol_aseg').val(this.numresol);
                    $('#numresol_pla').val(this.numresol);


                    $('#textResolRotPlaza').val(this.numresol);//Mio

                    $('#numresol').attr('disabled','disabled');
                    $('#listar_resol_modal').modal('hide');

                },

                guardarCondLab: function(){
                    var self=this;
                     var num_resol=$("#numresol").val();

                      // alert(this.codigo+" "+this.numserest+" "+this.codCateg+" "+this.codEst+" "+this.codGen+" "+this.codTipo);
                    if(this.codEst=="2" && this.codTipo=="1" && this.codGen=="1"){

                        if($("#est_doc").val()=="0"){
                            $("#est_cond").show();
                            $("#est_cond").removeClass("alert-warning");
                            $("#est_cond").removeClass("alert-success");
                            $("#est_cond").html("Seleccione el estado laboral de <strong>"+$("#employed").text()+"</strong>")
                            $("#est_cond").addClass("alert-warning");
                        }
                        else{
                            if($("#categ_prof").val()=="9"){
                                // alert("Seleccione categoria");

                                $("#est_cond").show();
                                $("#est_cond").removeClass("alert-warning");
                                $("#est_cond").removeClass("alert-success");
                                $("#est_cond").html("Seleccione la categoria de <strong>"+$("#employed").text()+"</strong>");
                                $("#est_cond").addClass("alert-warning");
                            }
                            else{
                                if(num_resol==""){

                                    $("#est_cond").show();
                                    $("#est_cond").removeClass("alert-warning");
                                    $("#est_cond").removeClass("alert-success");
                                    $("#est_cond").html("Ingrese un Nro de Resolución para <strong>"+$("#employed").text()+"</strong>");
                                    $("#est_cond").addClass("alert-warning");
                                }
                                else{
                                    this.codCateg=$("#categ_prof").val();
                                    this.codEst=$("#est_doc").val();

                                    this.model.get("guardarHist").set({
                                        "codigo": this.codigo,
                                        "estadoTrabaActual": this.numserest,
                                        "numResol": num_resol,
                                        "codCateg": this.codCateg,
                                        "codEs": this.codEst,
                                        "codGen": this.codGen,
                                        "codEst": this.codTipo,
                                        "codDep":this.depAct,
                                        "codCes":this.depCes


                                    })
                                    this.model.get("guardarHist").url = 'api/estado_condicion/addcondlab';

                                    var self_s = this.model.get("guardarHist").save({}, {wait: true});


                                    self_s.done(function () {



                                    });

                                    self_s.fail(function () {
                                        console.log(self.codigo+" "+self.numserest);
                                        self.Tabla_Cond_LabView.fetchTablaCondLab(self.codigo,self.numserest,function () {
                                            if(self.Tabla_Cond_LabView.collection.length!=0){
                                                $("#table-cond-lab").dataTable();
                                                $('#table-cond-lab_wrapper').append("<div id='footer-table'></div>");
                                                $('#table-cond-lab_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                $('#table-cond-lab_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                $('.dataTables_filter input').attr('placeholder', 'buscar..');
                                            }
                                        });
                                        self.TCLReg.show(self.Tabla_Cond_LabView);

                                        self.ListarServidorView.fetchServ();

                                    });

                                    $("#est_cond").show();
                                    $("#est_cond").removeClass("alert-warning");
                                    $("#est_cond").removeClass("alert-success");
                                    $("#est_cond").html("Se actualizó correctamente la condición del trabajador :<strong>"+$("#employed").text()+"</strong>");
                                    $("#est_cond").removeClass("alert-warning");
                                    $("#est_cond").addClass("alert-success");

                                }
                            }
                        }



                    }
                    else{
                        if($("#categ_prof").val()=="9"){
                            // alert("Seleccione categoria");

                            $("#est_cond").show();
                            $("#est_cond").removeClass("alert-warning");
                            $("#est_cond").removeClass("alert-success");
                            $("#est_cond").html("Seleccione la categoria de <strong>"+$("#employed").text()+"</strong>");
                            $("#est_cond").addClass("alert-warning");
                        }
                        else{

                            if(num_resol==""){
                                $("#est_cond").show();
                                $("#est_cond").removeClass("alert-warning");
                                $("#est_cond").removeClass("alert-success");
                                $("#est_cond").html("Ingrese un Nro de Resolución para <strong>"+$("#employed").text()+"</strong>");
                                $("#est_cond").addClass("alert-warning");
                            }
                            else{

                                this.codCateg=$("#categ_prof").val();

                                this.model.get("guardarHist").set({
                                    "codigo": this.codigo,
                                    "estadoTrabaActual": this.numserest,
                                    "numResol": num_resol,
                                    "codCateg": this.codCateg,
                                    "codEs": this.codEst,
                                    "codGen": this.codGen,
                                    "codEst": this.codTipo,
                                    "codDep":this.depAct,
                                    "codCes":this.depCes


                                })

                                this.model.get("guardarHist").url = 'api/estado_condicion/addcondlab';

                                var self_s = this.model.get("guardarHist").save({}, {wait: true});


                                self_s.done(function () {



                                });

                                self_s.fail(function () {
                                    console.log(self.codigo+" "+self.numserest);
                                    self.Tabla_Cond_LabView.fetchTablaCondLab(self.codigo,self.numserest,function () {
                                        if(self.Tabla_Cond_LabView.collection.length!=0){
                                            $("#table-cond-lab").dataTable();
                                            $('#table-cond-lab_wrapper').append("<div id='footer-table'></div>");
                                            $('#table-cond-lab_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                            $('#table-cond-lab_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                            $('.dataTables_filter input').attr('placeholder', 'buscar..');
                                        }
                                    });
                                    self.TCLReg.show(self.Tabla_Cond_LabView);

                                    self.ListarServidorView.fetchServ();

                                });

                                $("#est_cond").show();
                                $("#est_cond").removeClass("alert-warning");
                                $("#est_cond").removeClass("alert-success");
                                $("#est_cond").html("Se actualizó correctamente la condición del trabajador :<strong>"+$("#employed").text()+"</strong>");
                                $("#est_cond").removeClass("alert-warning");
                                $("#est_cond").addClass("alert-success");
                            }
                        }
                    }

                },

                guardarCondAseg: function(){

                    var self=this;

                    var regpen= $('#reg').val();



                    var entaseg=$('#ent').val();

                    var estafp=$('#estafp').val();
                    var numPen=$('#nroPensio').val();
                    var numResol=$("#docSustento").val();

                    if(regpen=="100"){


                        $("#est_cond").show();
                        $("#est_cond").removeClass("alert-warning");
                        $("#est_cond").removeClass("alert-success");
                        $("#est_cond").html("Seleccione un regimen pensionario para el trabajador :<strong>"+$("#employed").text()+"</strong>");

                        $("#est_cond").addClass("alert-warning");
                    }
                    else{
                        if(regpen=="4"){

                            if(entaseg=="100"){


                                $("#est_cond").show();
                                $("#est_cond").removeClass("alert-warning");
                                $("#est_cond").removeClass("alert-success");
                                $("#est_cond").html("Seleccione una entidad aseguradora para el trabajador :<strong>"+$("#employed").text()+"</strong>");

                                $("#est_cond").addClass("alert-warning");
                            }
                            else{

                                if(estafp=="100"){

                                    $("#est_cond").show();
                                    $("#est_cond").removeClass("alert-warning");
                                    $("#est_cond").removeClass("alert-success");
                                    $("#est_cond").html("Seleccione un Estado AFP para el trabajador :<strong>"+$("#employed").text()+"</strong>");

                                    $("#est_cond").addClass("alert-warning");
                                }else{
                                    if($("#nroPensio").val()==""){

                                        $("#est_cond").show();
                                        $("#est_cond").removeClass("alert-warning");
                                        $("#est_cond").removeClass("alert-success");
                                        $("#est_cond").html("Ingrese un N° de Sis Pensiones para el trabajador :<strong>"+$("#employed").text()+"</strong>");

                                        $("#est_cond").addClass("alert-warning");

                                    }else{



                                            this.model.get("guardarHist").set({
                                                "codigo":this.codigo,
                                                "estadoTrabaActual":this.numserest,
                                                "numResol":numResol,
                                                "idregPen":regpen,
                                                "identAseg":entaseg,
                                                "idestAFP":estafp,
                                                "numPensiones":numPen

                                            })
                                            this.model.get("guardarHist").url='api/estado_condicion/addcondaseg';
                                            var self_s= this.model.get("guardarHist").save({},{wait:true});

                                            self_s.done(function(){

                                            });

                                            self_s.fail(function(){

                                                self.Tabla_Cond_AsegView.fetchTablaCondAseg(self.codigo,self.numserest,function () {
                                                    if(self.Tabla_Cond_AsegView.collection.length!=0){
                                                        $("#table-cond-aseg").dataTable();
                                                        $('#table-cond-aseg_wrapper').append("<div id='footer-table'></div>");
                                                        $('#table-cond-aseg_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                        $('#table-cond-aseg_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                        $('.dataTables_filter input').attr('placeholder', 'buscar..');


                                                    }
                                                });
                                                self.TCAReg.show(self.Tabla_Cond_AsegView);

                                                self.ListarServidorView.fetchServ();

                                            });

                                            $("#est_cond").show();
                                            $("#est_cond").removeClass("alert-warning");
                                            $("#est_cond").removeClass("alert-success");
                                            $("#est_cond").html("Se actualizó correctamente la condición de asegurado del trabajador :<strong>"+$("#employed").text()+"</strong>");

                                            $("#est_cond").addClass("alert-success");


                                    }

                                }

                            }
                        }

                        if(regpen=="3"){

                            if(entaseg=="100"){
                                $("#est_cond").show();
                                $("#est_cond").removeClass("alert-warning");
                                $("#est_cond").removeClass("alert-success");
                                $("#est_cond").html("Seleccione una entidad aseguradora para el trabajador :<strong>"+$("#employed").text()+"</strong>");

                                $("#est_cond").addClass("alert-warning");
                            }else{

                                    this.model.get("guardarHist").set({
                                        "codigo":this.codigo,
                                        "estadoTrabaActual":this.numserest,
                                        "numResol":numResol,
                                        "idregPen":regpen,
                                        "identAseg":entaseg,
                                        "idestAFP":estafp,
                                        "numPensiones":numPen

                                    })
                                    this.model.get("guardarHist").url='api/estado_condicion/addcondaseg';
                                    var self_s= this.model.get("guardarHist").save({},{wait:true});

                                    self_s.done(function(){

                                    });

                                    self_s.fail(function(){
                                        self.Tabla_Cond_AsegView.fetchTablaCondAseg(self.codigo,self.numserest,function () {
                                            if(self.Tabla_Cond_AsegView.collection.length!=0){
                                                $("#table-cond-aseg").dataTable();
                                                $('#table-cond-aseg_wrapper').append("<div id='footer-table'></div>");
                                                $('#table-cond-aseg_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                $('#table-cond-aseg_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                $('.dataTables_filter input').attr('placeholder', 'buscar..');


                                            }
                                        });
                                        self.TCAReg.show(self.Tabla_Cond_AsegView);
                                        self.ListarServidorView.fetchServ();
                                    });

                                    $("#est_cond").show();
                                    $("#est_cond").removeClass("alert-warning");
                                    $("#est_cond").removeClass("alert-success");
                                    $("#est_cond").html("Se actualizó correctamente la condición de asegurado del trabajador :<strong>"+$("#employed").text()+"</strong>");

                                    $("#est_cond").addClass("alert-success");


                            }

                        }

                        if(regpen=="5" || regpen=="6"){



                                this.model.get("guardarHist").set({
                                    "codigo":this.codigo,
                                    "estadoTrabaActual":this.numserest,
                                    "numResol":numResol,
                                    "idregPen":regpen,
                                    "identAseg":entaseg,
                                    "idestAFP":estafp,
                                    "numPensiones":numPen

                                })
                                this.model.get("guardarHist").url='api/estado_condicion/addcondaseg';
                                var self_s= this.model.get("guardarHist").save({},{wait:true});

                                self_s.done(function(){

                                });

                                self_s.fail(function(){
                                    self.Tabla_Cond_AsegView.fetchTablaCondAseg(self.codigo,self.numserest,function () {
                                        if(self.Tabla_Cond_AsegView.collection.length!=0){
                                            $("#table-cond-aseg").dataTable();
                                            $('#table-cond-aseg_wrapper').append("<div id='footer-table'></div>");
                                            $('#table-cond-aseg_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                            $('#table-cond-aseg_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                            $('.dataTables_filter input').attr('placeholder', 'buscar..');


                                        }
                                    });
                                    self.TCAReg.show(self.Tabla_Cond_AsegView);

                                    self.ListarServidorView.fetchServ();
                                });

                                $("#est_cond").show();
                                $("#est_cond").removeClass("alert-warning");
                                $("#est_cond").removeClass("alert-success");
                                $("#est_cond").html("Se actualizó correctamente la condición de asegurado del trabajador :<strong>"+$("#employed").text()+"</strong>");

                                $("#est_cond").addClass("alert-success");

                        }

                    }




                        //Aqui se inserta en alertas pendientes
                    /*
                        this.model.get("guardaralertpend").set({
                            "codigo": codigo,
                            "numserest": numserest,
                            "tipalert":3,
                            "email": email

                        })

                        this.model.get("guardaralertpend").url = 'api/estado_condicion/addalertpend';

                        var self_s = this.model.get("guardaralertpend").save({}, {wait: true});

                        var self = this;

                        self_s.done(function () {



                        });

                        self_s.fail(function () {
                            var cod  =self.codigo;
                            var numest=self.numserest;
                            self.Tabla_Cond_AsegView.fetchTablaCondAseg(cod,numest,function () {
                                if(self.Tabla_Cond_AsegView.collection.length!=0){
                                    $("#table-cond-aseg").dataTable();
                                    $('#table-cond-aseg_wrapper').append("<div id='footer-table'></div>");
                                    $('#table-cond-aseg_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                    $('#table-cond-aseg_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                    $('.dataTables_filter input').attr('placeholder', 'buscar..');


                                }
                            });

                        });

                        self.TCAReg.show(self.Tabla_Cond_AsegView);
                        $("#correcto").show();
                        //reiniciando los campos num. sist. pensionario y numero de resolucion
                        $('#numresol').val("");
                        $('#numresol_aseg').val("");
                        $('#numresol_tipo_pago').val("");
                        $('#numresol_dep').val("");
                        $('#numresol_pla').val("");
                        $('#numsispen').val("");

                        this.numresol=null;*/


                },

                guardarDep: function(){

/*
                    var email= $('#email').text();
                    var numres= this.numresol;
                    var codigo= this.codigo;
                    var numserest= this.numserest;
                    var udcod= this.udcod;
                    var cod  =this.codigo;
                    var numest=this.numserest;*/
                    var self=this;
                 //   alert(this.codigo+" "+this.numserest+" "+$("#numresol_dep").val()+" "+this.codDepen+" "+this.codGenDepen);

                    if($("#est_emp").text()=="CAS"){

                       if($("#depencia").val()==""){

                           $("#est_cond").show();
                           $("#est_cond").removeClass("alert-warning");
                           $("#est_cond").removeClass("alert-success");
                           $("#est_cond").html("Ingrese la dependencia para <strong>"+$("#employed").text()+"</strong>");
                           $("#est_cond").addClass("alert-warning");
                       }
                        else{
                           if($("#numresol_dep").val()==""){
                               $("#est_cond").show();
                               $("#est_cond").removeClass("alert-warning");
                               $("#est_cond").removeClass("alert-success");
                               $("#est_cond").html("Ingrese un Nro de contrato para <strong>"+$("#employed").text()+"</strong>");
                               $("#est_cond").addClass("alert-warning");

                           }
                           else{
                               this.model.get("guardarHist").set({
                                   "codigo":this.codigo,
                                   "estadoTrabaActual":this.numserest,
                                   "numResol":$("#numresol_dep").val(),
                                   "codDep":this.codDepen,
                                   "codGenDep":this.codGenDepen
                               })

                               this.model.get("guardarHist").url='api/estado_condicion/adddep';
                               var self_s= this.model.get("guardarHist").save({},{wait:true});

                               self_s.done(function(){

                               });

                               self_s.fail(function(){
                                   self.Tabla_DepView.fetchTablaDep(self.codigo,self.numserest,function () {
                                       if(self.Tabla_DepView.collection.length!=0){
                                           $("#table-dep").dataTable();
                                           $('#table-dep_wrapper').append("<div id='footer-table'></div>");
                                           $('#table-dep_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                           $('#table-dep_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                           $('.dataTables_filter input').attr('placeholder', 'buscar..');


                                       }
                                   });

                                   self.TDReg.show(self.Tabla_DepView);

                                   self.ListarServidorView.fetchServ();
                               });



                               var email=$("#email").text();



                               this.model.get("guardaralertpend").set({
                                   "codigo": self.codigo,
                                   "numserest": self.numserest,
                                   "tipalert":2,
                                   "email": email

                               })
                               this.model.get("guardaralertpend").url = 'api/estado_condicion/addalertpend';

                               var self_s = this.model.get("guardaralertpend").save({}, {wait: true});

                               self_s.done(function () {



                               });
                               self_s.fail(function () {



                               });

                               $("#est_cond").show();
                               $("#est_cond").removeClass("alert-warning");
                               $("#est_cond").removeClass("alert-success");
                               $("#est_cond").html("Se cambio correctamente la dependencia del trabajador:<strong>"+$("#employed").text()+"</strong>");

                               $("#est_cond").addClass("alert-success");

                           }
                       }



                    }else{
                        //alert("personal no CAS");
                        $("#desc_serv").text($("#employed").text());
                        $("#desc_est").text($("#est_emp").text());
                        $("#modal_message").modal("show");
                    }

/*

*/


                },

                guardarPagoBanco: function(){

                    var email=$('#email').text();
                    var self=this;


                    var codPago=$('#tipopago').val();
                    var numCuenta=$("#numctabanco").val();
                    var susDoc=$("#docSust").val();


                    if(codPago=="0"){
                        $("#est_cond").show();
                        $("#est_cond").removeClass("alert-warning");
                        $("#est_cond").removeClass("alert-success");
                        $("#est_cond").html("Seleccione un tipo de pago para el trabajador: <strong>"+$("#employed").text()+"</strong>");
                        $("#est_cond").addClass("alert-warning");
                    }
                    else{

                        if(codPago=="1"){
                            if(numCuenta==""){
                                $("#est_cond").show();
                                $("#est_cond").removeClass("alert-warning");
                                $("#est_cond").removeClass("alert-success");
                                $("#est_cond").html("Ingrese un número de cuenta para el trabajador: <strong>"+$("#employed").text()+"</strong>");
                                $("#est_cond").addClass("alert-warning");
                            }
                            else{
                                 //Aqui se inserta en la tabla tb_hist_banco
                                this.model.get("guardarHist").set({
                                    "codigo": this.codigo,
                                    "estadoTrabaActual":this.numserest,
                                    "ctaBanco": numCuenta,
                                    "codPago": codPago,
                                    "susDoc":susDoc
                                })
                                this.model.get("guardarHist").url='api/estado_condicion/addpagobanco';
                                var self_s=this.model.get("guardarHist").save({}, {wait: true});

                                self_s.done(function(){

                                });

                                self_s.fail(function(){
                                    self.Tabla_Pago_BancoView.fetchTablaPagoBanco(self.codigo,self.numserest, function(){
                                        if(self.Tabla_Pago_BancoView.collection.length!=0){
                                            $("#table-pago-banco").dataTable();

                                            $('#table-pago-banco_wrapper').append("<div id='footer-table'></div>");
                                            $('#table-pago-banco_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                            $('#table-pago-banco_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                            $('.dataTables_filter input').attr('placeholder', 'buscar..');



                                        }
                                    });
                                    self.TPBReg.show(self.Tabla_Pago_BancoView);

                                    self.ListarServidorView.fetchServ();
                                });
                                $("#est_cond").show();
                                $("#est_cond").removeClass("alert-warning");
                                $("#est_cond").removeClass("alert-success");
                                $("#est_cond").html("Se cambio correctamente el tipo de pago del trabajador:<strong>"+$("#employed").text()+"</strong>");

                                $("#est_cond").addClass("alert-success");

                                $("#docSust").val("");
                                $("#numctabanco").val("");
                                $("#tipopago").val("0");
                            }

                        }
                        else{
                             //Aqui se inserta en la tabla tb_hist_banco
                            this.model.get("guardarHist").set({
                                "codigo": this.codigo,
                                "estadoTrabaActual":this.numserest,
                                "ctaBanco": numCuenta,
                                "codPago": codPago,
                                "susDoc":susDoc
                            })
                            this.model.get("guardarHist").url='api/estado_condicion/addpagobanco';
                            var self_s=this.model.get("guardarHist").save({}, {wait: true});

                            self_s.done(function(){

                            });

                            self_s.fail(function(){
                                self.Tabla_Pago_BancoView.fetchTablaPagoBanco(self.codigo,self.numserest, function(){
                                    if(self.Tabla_Pago_BancoView.collection.length!=0){
                                        $("#table-pago-banco").dataTable();

                                        $('#table-pago-banco_wrapper').append("<div id='footer-table'></div>");
                                        $('#table-pago-banco_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                        $('#table-pago-banco_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                        $('.dataTables_filter input').attr('placeholder', 'buscar..');



                                    }
                                });
                                self.TPBReg.show(self.Tabla_Pago_BancoView);

                                self.ListarServidorView.fetchServ();
                            });

                            $("#est_cond").show();
                            $("#est_cond").removeClass("alert-warning");
                            $("#est_cond").removeClass("alert-success");
                            $("#est_cond").html("Se cambio correctamente el tipo de pago del trabajador:<strong>"+$("#employed").text()+"</strong>");

                            $("#est_cond").addClass("alert-success");

                            $("#docSust").val("");
                            $("#numctabanco").val("");
                            $("#tipopago").val("0");
                        }

                    }


/*
                        this.model.get("guardaralertpend").set({
                            "codigo": codigo,
                            "numserest": numserest,
                            "tipalert":4,
                            "email": email

                        })

                        this.model.get("guardaralertpend").url = 'api/estado_condicion/addalertpend';

                        var self_s = this.model.get("guardaralertpend").save({}, {wait: true});

                        var self = this;

                        self_s.done(function () {


                        });

                        self_s.fail(function () {
                            self.Tabla_Pago_BancoView.fetchTablaPagoBanco(cod, numest, function(){
                                if(self.Tabla_Pago_BancoView.collection.length!=0){
                                    $("#table-pago-banco").dataTable();

                                    $('#table-pago-banco_wrapper').append("<div id='footer-table'></div>");
                                    $('#table-pago-banco_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                    $('#table-pago-banco_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                    $('.dataTables_filter input').attr('placeholder', 'buscar..');

                                }
                            });
                            self.TPBReg.show(self.Tabla_Pago_BancoView);

                        });

                        //Mensaje de confirmacion

                        $("#correcto").show();


                        //Limpiamos los campos
                        $('#numctabanco').val("");
                        $('#numresol').val("");
                        $('#numresol_aseg').val("");
                        $('#numresol_tipo_pago').val("");
                        $('#numresol_dep').val("");
                        $('#numresol_pla').val("");
                                */




                      /*  else {
                            //Aqui se inserta en la tabla tb_hist_banco

                            $("#advertencia").hide();
                            this.model.get("guardarpagobanco").set({
                                "codigo": codigo,
                                "numserest": numserest,
                                "ctabanco": '',
                                "codtippago": codtippago
                            })
                            this.model.get("guardarpagobanco").url='api/estado_condicion/addpagobanco';
                            var self_s=this.model.get("guardarpagobanco").save({}, {wait: true});

                            self_s.done(function(){

                            });

                            self_s.fail(function(){

                            });

                            //Aqui se inserta en la tabla alertas pendientes
                            this.model.get("guardaralertpend").set({
                                "codigo": codigo,
                                "numserest": numserest,
                                "tipalert":4,
                                "email": email

                            })

                            this.model.get("guardaralertpend").url = 'api/estado_condicion/addalertpend';

                            var self_s = this.model.get("guardaralertpend").save({}, {wait: true});

                            var self = this;

                            self_s.done(function () {



                            });

                            self_s.fail(function () {

                            self.Tabla_Pago_BancoView.fetchTablaPagoBanco(cod, numest, function(){
                                    if(self.Tabla_Pago_BancoView.collection.length!=0){
                                        $("#table-pago-banco").dataTable();

                                        $('#table-pago-banco_wrapper').append("<div id='footer-table'></div>");
                                        $('#table-pago-banco_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                        $('#table-pago-banco_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                        $('.dataTables_filter input').attr('placeholder', 'buscar..');

                                    }
                                });
                                self.TPBReg.show(self.Tabla_Pago_BancoView);

                            });
                            $("#correcto").show();
                            $('#numctabanco').val("");
                            $('#numresol').val("");
                            $('#numresol_aseg').val("");
                            $('#numresol_tipo_pago').val("");
                            $('#numresol_dep').val("");
                            $('#numresol_pla').val("");
                        }
*/

                },


                guardarCondPla: function(){

                    var self=this;
                    var fechcese=$('#fech_cese').val();

                    var obser=$('#obs').val();

                    var numResol=$("#numresol_pla").val();
                    var condPlani=$("#pla").val();

                    if($("#pla").val()=="100"){


                        $("#est_cond").show();
                        $("#est_cond").removeClass("alert-warning");
                        $("#est_cond").removeClass("alert-success");
                        $("#est_cond").html("Seleccione la condicion de planilla para <strong>"+$("#employed").text()+"</strong>");
                        $("#est_cond").addClass("alert-warning");
                    }
                    else{

                        if($("#numresol_pla").val()==""){


                            $("#est_cond").show();
                            $("#est_cond").removeClass("alert-warning");
                            $("#est_cond").removeClass("alert-success");
                            $("#est_cond").html("Ingrese una resolucion para <strong>"+$("#employed").text()+"</strong>");
                            $("#est_cond").addClass("alert-warning");
                        }
                        else{

                            if($("#pla").val()=="5"){

                                if($("#fech_cese").val()==""){
                                    $("#est_cond").show();
                                    $("#est_cond").removeClass("alert-warning");
                                    $("#est_cond").removeClass("alert-success");
                                    $("#est_cond").html("Ingrese una fecha de Cese para <strong>"+$("#employed").text()+"</strong>");
                                    $("#est_cond").addClass("alert-warning");
                                }
                                else{
                                    this.model.get("guardarHist").set({
                                        "codigo":this.codigo,
                                        "estadoTrabaActual":this.numserest,
                                        "numResol": numResol,
                                        "codicPlani": condPlani,
                                        "fechaCese": fechcese,
                                        "obsPlani": obser
                                    })

                                    this.model.get("guardarHist").url='api/estado_condicion/addcondpla';
                                    var self_s=this.model.get("guardarHist").save({}, {wait: true});

                                    self_s.done(function(){

                                    });

                                    self_s.fail(function(){

                                        self.Tabla_Cond_PlaView.fetchTablaCondPla(self.codigo,self.numserest, function(){
                                            if(self.Tabla_Cond_PlaView.collection.length!=0){
                                                $("#table-cond-pla").dataTable();

                                                $('#table-cond-pla_wrapper').append("<div id='footer-table'></div>");
                                                $('#table-cond-pla_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                $('#table-cond-pla_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                $('.dataTables_filter input').attr('placeholder', 'buscar..');



                                            }
                                        });
                                        self.TCPReg.show(self.Tabla_Cond_PlaView);

                                        self.ListarServidorView.fetchServ();

                                    });

                                    $("#est_cond").show();
                                    $("#est_cond").removeClass("alert-warning");
                                    $("#est_cond").removeClass("alert-success");
                                    $("#est_cond").html("Se cambio correctamente la condicion de planilla del trabajador:<strong>"+$("#employed").text()+"</strong>");
                                    $("#est_cond").addClass("alert-success");
                                }

                            }
                            else{
                                this.model.get("guardarHist").set({
                                    "codigo":this.codigo,
                                    "estadoTrabaActual":this.numserest,
                                    "numResol": numResol,
                                    "codicPlani": condPlani,
                                    "fechaCese": fechcese,
                                    "obsPlani": obser
                                })

                                this.model.get("guardarHist").url='api/estado_condicion/addcondpla';
                                var self_s=this.model.get("guardarHist").save({}, {wait: true});

                                self_s.done(function(){

                                });

                                self_s.fail(function(){

                                    self.Tabla_Cond_PlaView.fetchTablaCondPla(self.codigo,self.numserest, function(){
                                        if(self.Tabla_Cond_PlaView.collection.length!=0){
                                            $("#table-cond-pla").dataTable();

                                            $('#table-cond-pla_wrapper').append("<div id='footer-table'></div>");
                                            $('#table-cond-pla_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                            $('#table-cond-pla_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                            $('.dataTables_filter input').attr('placeholder', 'buscar..');


                                        }
                                    });
                                    self.TCPReg.show(self.Tabla_Cond_PlaView);

                                    self.ListarServidorView.fetchServ();

                                });

                                $("#est_cond").show();
                                $("#est_cond").removeClass("alert-warning");
                                $("#est_cond").removeClass("alert-success");
                                $("#est_cond").html("Se cambio correctamente la condicion de planilla del trabajador:<strong>"+$("#employed").text()+"</strong>");
                                $("#est_cond").addClass("alert-success");
                            }

                        }
                    }


               //    alert(this.codigo+" "+this.numserest+"/"+numResol+"/"+condPlani+"/"+fechcese+"/"+obser);




/*
                    if(this.numresol!=null){
                        if(codcond!=5){

                           $("#advertencia").hide();
                        //Aqui se inserta en la tabla tb_hist_cond_pla
                        this.model.get("guardarcondpla").set({
                            "codigo": codigo,
                            "numserest": numserest,
                            "numres1": numres,
                            "codcond": codcond,
                            "fechcese": fechcese,
                            //"fechnomb": fechnomb,
                            "obser": obser
                        })
                        this.model.get("guardarcondpla").url='api/estado_condicion/addcondpla';
                        var self_s=this.model.get("guardarcondpla").save({}, {wait: true});
                        var self=this;
                        self_s.done(function(){

                        });

                        self_s.fail(function(){

                        });

                        //Aqui se inserta en la tabla alertas pendientes
                        this.model.get("guardaralertpend").set({
                            "codigo": codigo,
                            "numserest": numserest,
                            "tipalert":5,
                            "email": email

                        })

                        this.model.get("guardaralertpend").url = 'api/estado_condicion/addalertpend';

                        var self_s = this.model.get("guardaralertpend").save({}, {wait: true});

                        var self = this;

                        self_s.done(function () {


                        });

                        self_s.fail(function () {
                            self.Tabla_Cond_PlaView.fetchTablaCondPla(cod, numest, function(){
                                if(self.Tabla_Cond_PlaView.collection.length!=0){
                                    $("#table-cond-pla").dataTable();

                                    $('#table-cond-pla_wrapper').append("<div id='footer-table'></div>");
                                    $('#table-cond-pla_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                    $('#table-cond-pla_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                    $('.dataTables_filter input').attr('placeholder', 'buscar..');

                                }
                            });
                            self.TCPReg.show(self.Tabla_Cond_PlaView);

                        });


                        $("#correcto").show();

                        //Limpiamos los campos
                        $('#numctabanco').val("");
                        $('#numresol').val("");
                        $('#numresol_aseg').val("");
                        $('#numresol_tipo_pago').val("");
                        $('#numresol_dep').val("");
                        $('#numresol_pla').val("");
                        $('#obs').val("");
                        $('#fech_cese').val("");
                        $('#fech_nomb').val("");
                        }else{
                            if(fechcese!=""){
                                $("#advertencia").hide();

                                //Aqui se inserta en la tabla tb_hist_cond_pla
                                this.model.get("guardarcondpla").set({
                                    "codigo": codigo,
                                    "numserest": numserest,
                                    "numres1": numres,
                                    "codcond": codcond,
                                    "fechcese": fechcese,
                                    //"fechnomb": fechnomb,
                                    "obser": obser
                                })
                                this.model.get("guardarcondpla").url='api/estado_condicion/addcondpla';
                                var self_s=this.model.get("guardarcondpla").save({}, {wait: true});
                                var self=this;
                                self_s.done(function(){

                                });

                                self_s.fail(function(){

                                });

                                //Aqui se inserta en la tabla alertas pendientes
                                this.model.get("guardaralertpend").set({
                                    "codigo": codigo,
                                    "numserest": numserest,
                                    "tipalert":5,
                                    "email": email

                                })

                                this.model.get("guardaralertpend").url = 'api/estado_condicion/addalertpend';

                                var self_s = this.model.get("guardaralertpend").save({}, {wait: true});

                                var self = this;

                                self_s.done(function () {



                                });

                                self_s.fail(function () {
                                    self.Tabla_Cond_PlaView.fetchTablaCondPla(cod, numest, function(){
                                        if(self.Tabla_Cond_PlaView.collection.length!=0){
                                            $("#table-cond-pla").dataTable();

                                            $('#table-cond-pla_wrapper').append("<div id='footer-table'></div>");
                                            $('#table-cond-pla_next').html("<i class='icon-forward'></i>");
                                            $('#table-cond-pla_previous').html("<i class='icon-backward'></i>");

                                            $('.dataTables_filter input').attr('placeholder', 'buscar..');

                                        }
                                    });
                                    self.TCPReg.show(self.Tabla_Cond_PlaView);

                                });

                                //Mensaje de confirmacion


                                $("#correcto").show();
                                //Refresco de la tabla condicion planilla





                                //Limpiamos los campos
                                $('#numctabanco').val("");
                                $('#numresol').val("");
                                $('#numresol_aseg').val("");
                                $('#numresol_tipo_pago').val("");
                                $('#numresol_dep').val("");
                                $('#numresol_pla').val("");
                                $('#obs').val("");
                                $('#fech_cese').val("");
                                $('#fech_nomb').val("");

                                this.numresol=null;

                            } else{
                                $('#mensaje_cese').modal("show");
                            }

                        }

                    }
                    else{
                        $("#correcto").hide();
                        $("#advertencia").show();
                    }
*/

                },

                cambioDoc:function(e){
                    var valor2 = $('#cod_doc').val();
                    var valor1 = 1;
                    $("#div_categ_prof").show();

                    this.CategoriaProfView.fetchCategoriaProf(valor1, valor2, function(){
                        $("#div_categ_prof").show();
                    });
                    this.CategoriaProfReg.show(this.CategoriaProfView);
                },
                cambioAdm: function(e){

                 var valor2 = $('#cod_adm').val();
                    var valor1 = 2;


                    this.CategoriaProfView.fetchCategoriaProf(valor1, valor2, function(){
                        $("#div_categ_prof").show();
                    });
                    this.CategoriaProfReg.show(this.CategoriaProfView);
                },
                cambioDocMag:function(e){
                    var valor2 = $('#cod_doc_mag').val();
                    var valor1 = 3;


                    this.CategoriaProfView.fetchCategoriaProf(valor1, valor2, function(){
                        $("div_categ_prof").show();
                    });
                    this.CategoriaProfReg.show(this.CategoriaProfView);
                },
                cambioAdmSalud:function(e){
                    var valor2 = $('#cod_adm_salud').val();
                    var valor1 = 4;


                    this.CategoriaProfView.fetchCategoriaProf(valor1, valor2, function(){
                        $("div_categ_prof").show();
                    });
                    this.CategoriaProfReg.show(this.CategoriaProfView);
                },





                /*
                 *
                 *
                 *
                 *
                 *
                 */




                mostrarFechaRotacion:function(ev){
                    var formatoFecha= $('#fechaRotacion');

                    formatoFecha.datepicker({
                        format: 'dd/mm/yyyy',
                        viewMode: 2
                    });

                    formatoFecha.datepicker('show');
                } ,



                limpiarFechaRotacion:function(ev){

                    $("#fechaRotacion").val("");
                },


                seleccionarHistorialPlaza: function(e){

                    var self=this;
                    var clickedElement=$(e.currentTarget);
                    var cod=clickedElement.children(':nth-child(1)').text();
                    this.idPlaza=cod;
                    var nom=clickedElement.children(':nth-child(2)').text();
                    this.nombreDep=nom;



                    //$("#tabla_historial_plaza").show();

                    console.log("Mensaje:"+this.idPlaza);

                    if(this.idPlaza!="No existen plazas asignadas a este servidor"){

                        $("#tabla_historial_plaza").show();

                        this.historialPlazaView.mostrarHistorialPlaza(this.idPlaza, function () {
                                if (self.historialPlazaView.collection.length != 0) {

                                    $("#tabla_plazas1").dataTable();
                                    $('#tabla_plazas1_wrapper').append("<div id='footer-table'></div>");
                                    $('#tabla_plazas1_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                    $('#tabla_plazas1_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                                    $('.dataTables_filter input').addClass('buscador');
                                    $('.dataTables_filter input').attr('placeholder', 'Buscar..');
                                }

                                $('#nombre-plaza').text(self.idPlaza+"-"+self.nombreDep);
                                // $('#nombre-plaza').text(self.nombreDep);
                                // $('#desc-resolucion').text(nroResol);

                            }
                        )

                        self.tabla_historial_plazaHtml.show(self.historialPlazaView);

                    }else{

                        $("#tabla_historial_plaza").hide();

                    }

                },


                mostrarModalEliminacion: function(ev){
                    var self = this;
                    var clickedElement=$(ev.currentTarget);
                    this.idRotacionPlaza=clickedElement.attr('dataIdRotacion');

                    console.log("Hoy 2 de Junio ingrese"+this.idRotacionPlaza);
                    // console.log("Hoy 2 de Junio ingrese");
                    self.modalEliminacionItemHistorialHtml.show(self.modalEliminacionItemHistorialView);
                    $('#modalEliminacionItemHistorial').modal("show");

                    console.log("11-06-2014:"+this.idRotacionPlaza);

                },



                eliminarItemHistorialPlaza:function(){
                    console.log("Aqui adentro es:"+this.idRotacionPlaza);
                    var self=this;
                    this.model.get("eliminarHistorialPlazaModel").set({

                        "idHistorialPlaza": this.idRotacionPlaza,
                        "codPlaza": 999999,
                        "fechaRotacion": "01/01/1900",
                        "depActual": "Ninguno",
                        "nroDocu": "Ninguno"
                    });
                    console.log("Antes del  url");

                    this.model.get("eliminarHistorialPlazaModel").url = "api/rotaciones/deleteHistorialPlaza";

                    console.log("Ya pase el url");

                    var self_s = this.model.get("eliminarHistorialPlazaModel").save({}, {wait: true});

                    self_s.done(function(){

                    });

                    self_s.fail(function(){
                        console.log("Aqui adentro fail es:"+this.idPlaza);
                        self.historialPlazaView.mostrarHistorialPlaza(self.idPlaza,function(){
                                if(self.historialPlazaView.collection.length!=0){

                                    $("#tabla_plazas1").dataTable();
                                    $('#tabla_plazas1_wrapper').append("<div id='footer-table'></div>");
                                    $('#tabla_plazas1_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                    $('#tabla_plazas1_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                                    $('.dataTables_filter input').addClass('buscador');
                                    $('.dataTables_filter input').attr('placeholder','Buscar..');
                                }
                                // $('#nombre-plaza').text(self.idPlaza);
                                //$('#nombre-plaza').text(self.nombreDep);
                                $('#nombre-plaza').text(self.idPlaza+"-"+self.nombreDep);
                                // $('#desc-resolucion').text(nroResol);

                            }

                        )

                        self.tabla_historial_plazaHtml.show(self.historialPlazaView);

                    }) ;

                    Avgrund.hide();
                },







                agregarItemHistorialPlaza: function () {

                    var self=this;




                    //var cod  =this.codigo;
                    //var numest=this.numserest;



                    if( $('#textResolRotPlaza').val()!="" && $('#fechaRotacion').val()!="" && $('#textDestino').val()!=""  ){




                        console.log("Importante: "+this.unidadSelected.unidadId);

                        self.model.get("addHistorialPlazaModel").set({

                            "idHistorialPlaza": 0,
                            "codPlaza": this.idPlaza,
                            "fechaRotacion": $('#fechaRotacion').val(),
                            "depActual":  this.unidadSelected.unidadId,
                            "nroDocu": $('#textResolRotPlaza').val()
                        });

                        this.model.get("addHistorialPlazaModel").url = "api/rotaciones/addItemHistorialPlaza";

                        var self_s = this.model.get("addHistorialPlazaModel").save({}, {wait: true});

                        self_s.done(function(){


                        });

                        self_s.fail(function(){
                                self.historialPlazaView.mostrarHistorialPlaza(self.idPlaza,function(){
                                    if(self.historialPlazaView.collection.length!=0){

                                        $("#tabla_plazas1").dataTable();
                                        $('#tabla_plazas1_wrapper').append("<div id='footer-table'></div>");
                                        $('#tabla_plazas1_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                        $('#tabla_plazas1_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                                        $('.dataTables_filter input').addClass('buscador');
                                        $('.dataTables_filter input').attr('placeholder','Buscar..');
                                    }
                                    //$('#nombre-plaza').text(self.idPlaza);
                                    // $('#nombre-plaza').text(self.nombreDep);
                                    $('#nombre-plaza').text(self.idPlaza+"-"+self.nombreDep);
                                    // $('#desc-resolucion').text(nroResol);
                                })

                            }

                        );




                        var email= $('#email').text();//

                        var codigo= this.codigo;//
                        var numserest= this.numserest;//
                        var udcod= this.udcod;//


                        console.log("Datos:"+this.codigo+" "+this.numserest+" "+this.udcod+" "+this.email);


                        this.model.get("guardardependencia").set({

                            "codigo":codigo,
                            "numserest":numserest,
                            "numres1":$('#textResolRotPlaza').val(),
                            "udcod":udcod


                        })

                        this.model.get("guardardependencia").url='api/estado_condicion/adddep';
                        var self_s= this.model.get("guardardependencia").save({},{wait:true});
                        //var self= this;
                        self_s.done(function(){

                        });

                        self_s.fail(function(){

                        });




                        //Aqui se inserta en alertas pendientes

                        this.model.get("guardaralertpend").set({
                            "codigo": codigo,
                            "numserest": numserest,
                            "tipalert":2,
                            "email": email

                        })

                        this.model.get("guardaralertpend").url = 'api/estado_condicion/addalertpend';

                        var self_s = this.model.get("guardaralertpend").save({}, {wait: true});

                        //var self = this;

                        self_s.done(function () {

                        });

                        self_s.fail(function () {

                        });









                    }else{


                        console.log("Estamos dentro de la validacion");

                        $('#advCamposHistorial').html("<strong>Por favor, ingrese los campos solicitados</strong>");
                        $('#advCamposHistorial').show();



                    }
                },













                limpiarFormularioAddItem: function(){
                    $('#textResolRotPlaza').val("");
                    $('#fechaRotacion').val("");
                    $('#textDestino').val("");

                }




                /*

                 agregarItemHistorialPlaza: function () {

                 var self=this;

                 if( $('#textResolRotPlaza').val()!="" && $('#fechaRotacion').val()!="" && $('#textDestino').val()!=""  ){




                 console.log("Importante: "+this.unidadSelected.unidadId);

                 self.model.get("addHistorialPlazaModel").set({

                 "idHistorialPlaza": 0,
                 "codPlaza": this.idPlaza,
                 "fechaRotacion": $('#fechaRotacion').val(),
                 "depActual":  this.unidadSelected.unidadId,
                 "nroDocu": $('#textResolRotPlaza').val()
                 });

                 this.model.get("addHistorialPlazaModel").url = "api/rotaciones/addItemHistorialPlaza";

                 var self_s = this.model.get("addHistorialPlazaModel").save({}, {wait: true});

                 self_s.done(function(){


                 });

                 self_s.fail(function(){
                 self.historialPlazaView.mostrarHistorialPlaza(self.idPlaza,function(){
                 if(self.historialPlazaView.collection.length!=0){

                 $("#tabla_plazas1").dataTable();
                 $('#tabla_plazas1_wrapper').append("<div id='footer-table'></div>");
                 $('#tabla_plazas1_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                 $('#tabla_plazas1_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                 $('.dataTables_filter input').addClass('buscador');
                 $('.dataTables_filter input').attr('placeholder','Buscar..');
                 }
                 //$('#nombre-plaza').text(self.idPlaza);
                 // $('#nombre-plaza').text(self.nombreDep);
                 $('#nombre-plaza').text(self.idPlaza+"-"+self.nombreDep);
                 // $('#desc-resolucion').text(nroResol);
                 })

                 }

                 );

                 }else{


                 console.log("Estamos dentro de la validacion");

                 $('#advCamposHistorial').html("<strong>Por favor, ingrese los campos solicitados</strong>");
                 $('#advCamposHistorial').show();



                 }
                 },

                 limpiarFormularioAddItem: function(){
                 $('#textResolRotPlaza').val("");
                 $('#fechaRotacion').val("");
                 $('#textDestino').val("");

                 }

                 */









            });
        });
        return ErzaManager.EstadoCondicionApp.Form.View;
    });


