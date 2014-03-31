define(["app", "hbs!apps/estado_condicion/form/templates/inicio_estado_condicion","apps/estado_condicion/form/view/listar_servidor",
    "apps/estado_condicion/form/view/listar_resolucion", "apps/estado_condicion/form/view/tipo", "apps/estado_condicion/form/view/estado",
    "apps/estado_condicion/form/view/regimen", "apps/estado_condicion/form/view/entidad",
    "apps/estado_condicion/form/view/estadoafp", "apps/estado_condicion/form/view/tipopago","apps/estado_condicion/form/view/condpla", "apps/estado_condicion/form/view/tabla_cond_lab",
    "apps/estado_condicion/form/view/tabla_pago_banco","apps/estado_condicion/form/view/tabla_cond_aseg",
    "apps/estado_condicion/form/view/tabla_dep","apps/estado_condicion/form/view/tabla_cond_pla", "apps/estado_condicion/form/model/Guardar_Cond_Lab","apps/estado_condicion/form/model/Guardar_Alert",
    "apps/estado_condicion/form/model/Guardar_Cond_Aseg", "apps/estado_condicion/form/model/Guardar_Dependencia", "apps/estado_condicion/form/model/Guardar_Cond_Banco", "apps/estado_condicion/form/model/Guardar_Cond_Pla",
    "apps/estado_condicion/form/view/categoria_prof","apps/planillas/list/view/unidades-dialog",
    "jquery","lib/jquery.dataTables.min","lib/bootstrap-datepicker","lib/avgrund","lib/jquery.numeric","bootstrap"],

    function (ErzaManager, InicioTemp, ListarServidorView, ListarResolView, TipoView, EstadoView, RegimenView,
              EntidadView, EstadoAfpView, TipoPagoView, CondPlaView, Tabla_Cond_LabView, Tabla_Pago_BancoView,Tabla_Cond_AsegView, Tabla_DepView,Tabla_Cond_PlaView, Guardar_CondLabModel,
              Guardar_AlertModel, Guardar_CondAsegModel, Guardar_DependenciaModel,Guardar_PagoBancoModel, Guardar_CondPlaModel, CategoriaProfView,UnidadesDialogView) {
        ErzaManager.module('EstadoCondicionApp.Form.View', function (View, ErzaManager, Backbone, Marionette, $, _) {



            View.Layout = Marionette.Layout.extend({



                template: InicioTemp,
                ListarServidorView: new ListarServidorView(),
                ListarResolView: new ListarResolView(),
                TipoView: new TipoView(),
                EstadoView: new EstadoView(),
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


                // Variables,
                codigo: null,
                numserest: null,
                cod: null,
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



                regions:{
                    ListarReg: "#estado_condicion-modal1",
                    ResolReg: "#listar_resol_modal",
                    TipoReg: "#div_tipo",
                    EstadoReg: "#div_tip_est",
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
                    DocenteReg: "div_docente",
                    unidadesModalReg: "#modal-unidades"


                },

                events:{
                    "click #search": "llamarModalListar",
                    "click #reset-condlab":"resetCondLab",
                    "click .close": "close",
                    "click #bus_resol":"llamarModalResol",
                    "dblclick #tabla > tbody > tr ": "seleccionarServidor",
                    "dblclick #tabla_resol > tbody > tr": "seleccionarResolucion",
                    "click #btn-condlab": "guardarCondLab",

                    "click #header_est_cod>ul>li":"cambPest",
                    //"click .btn-modal": "modalConfirm",
                  //  "change #categ": "cambioCategoria",
                   // "change #div_tipo": "cambioTipo",
                    "change #cod_adm": "cambioAdm",
                    "change #cod_doc": "cambioDoc",
                    "change #cod_doc_mag": "cambioDocMag",
                    "change #cod_adm_salud": "cambioAdmSalud",
                    "change #tipopago": "mostrarctabanco",
                    "click #btn-condaseg": "guardarCondAseg",
                    "click #btn-dep": "guardarDep",
                    "click #btn-pagobanco": "guardarPagoBanco",
                    "click #btn-condpla": "guardarCondPla",
                    "click #bus_dep":"llamarModalUnidades",
                    "click #boton-unidad":"seleccionarunidad",
                    //"click #nomb_fech_show":"mostrarcalendarionomb", // cuando se hace clic en el boton fecha nombramiento...
                    "click #cese_fech_show":"mostrarcalendariocese" //  cuando se hace clic en el boton fecha cese...



                },

                 onRender: function(){
                 this.initialFetch();
                     this.TipoReg.show(this.TipoView),
                     this.EstadoReg.show(this.EstadoView),
                     this.RegReg.show(this.RegimenView),
                     this.EntReg.show(this.EntidadView),
                     this.EstAfpReg.show(this.EstadoAfpView),
                     this.TipoPagoReg.show(this.TipoPagoView),
                     this.CondPlaReg.show(this.CondPlaView),
                     this.CategoriaProfReg.show(this.CategoriaProfView)




                 },

                initialize: function () {

                    //initialize model
                    this.model = new Backbone.Model();


                    this.model.set({
                        "guardarcondlab": new Guardar_CondLabModel(),
                        "guardaralertpend": new Guardar_AlertModel(),
                        "guardarcondaseg": new Guardar_CondAsegModel(),
                        "guardardependencia": new Guardar_DependenciaModel(),
                        "guardarpagobanco": new Guardar_PagoBancoModel(),
                        "guardarcondpla": new Guardar_CondPlaModel()

                    });
                },

                initialFetch: function(){
                    var self=this;
                    //alert("Hola Mundo");
                    this.TipoView.getTipo();
                    this.EstadoView.getTipoEstado();
                    this.RegimenView.getRegimen();
                    this.EntidadView.getEntidad();
                    this.EstadoAfpView.getEstadoAfp();
                    this.CategoriaProfView.fetchCategoriaProf();
                    this.TipoPagoView.getTipoPago();
                    this.CondPlaView.getCondPla();
                    this.ListarServidorView.fetchServ();

                },

                mostrarctabanco: function(){
                    if("1"==$('#tipopago').val()){
                        $('#div_banco').show();
                    } else{
                        $('#div_banco').hide();
                    }
                },

                close:function(){
                    $('#loading').dequeue();
                    $('#new').dequeue();

                    $('#cargando').fadeOut("slow");
                    $('#new').fadeOut("slow");
                },
                resetCondLab:function(){
                  $("#advertencia").hide();
                },
                mostrarcalendariocese: function(e){
                    var fecha_cese = $('#fech_cese');

                    fecha_cese.datepicker({
                        format: 'dd-mm-yyyy',
                        viewMode: 2
                    });

                    fecha_cese.datepicker('show');

                },
                cambPest:function(){
                   $("#correcto").hide();
                   $("#advertencia").hide();
                } ,


                llamarModalUnidades: function(){
                    this.unidadesModalReg.show(this.unidadesDialog);
                    //console.log("entrando");
                    $('#modal-unidades').modal("show");
                    //console.log("saliendo");
                },

                seleccionarunidad:function(){
                    $('#modal-unidades').modal('hide');
                    this.unidadSelected = this.unidadesDialog.unidadClicked;

                    console.log("Cambio unidad: "+this.unidadSelected.unidadDesc);

                    //alert("Cambio unidad: "+this.unidadSelected.unidadDesc);
                    this.udcod= this.unidadSelected.unidadDesc.substr(0,5);
                    //alert(this.udcod);
                    $('#nom_dep').text(this.unidadSelected.unidadDesc);
                },


                tablaEstilos: function(id){
                    $("#"+id+"_wrapper").addClass('table-position');
                    $('#'+id+'_paginate').addClass('table-footer');
                    $('#'+id+'_filter input').on('keyup',function(){
                        $('#'+id+'_previous').addClass('previous');
                        $('#'+id+'_next').addClass('next');
                    })  ;
                    $('#'+id+'_previous').click(function(){

                        $(this).addClass('previous');
                        $('#'+id+'_next').addClass('next');
                    });
                    $('#'+id+'_next').click(function(){
                        $(this).addClass('next');
                        $('#'+id+'_previous').addClass('previous');
                    });
                    $('#'+id+'_previous').addClass('previous');
                    $('#'+id+'_next').addClass('next');
                    $('#'+id).addClass('table-bordered');
                },



                llamarModalListar: function(){

                    var self=this;

                    $("#advertencia").hide();
                    $("#correcto").hide();
                    //$('#div_categ_prof').show();


                    self.ListarReg.show(self.ListarServidorView) ;

                    $("#tabla").dataTable();

                    $('#tabla_wrapper').append("<div id='footer-table'></div>");
                    $('#tabla_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                    $('#tabla_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                    $('.dataTables_filter input').attr('placeholder','Buscar..');

                    //Reseteando los combos
                    $('#tipo').val("1") ;
                    $('#cod_doc').val("0");
                   // $('#div_docente').show();
                    $('#div_administrativo').hide();
                    $('#div_doc_mag').hide();
                    $('#div_adm_salud').hide();
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

                   $("#estado_condicion-modal1").modal();

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



                seleccionarServidor: function(e){
                    var self=this;
                    $('#form_insert').show();
                    $('#form_insert1').show();
                    $('#form_insert2').show();
                    $('#form_insert3').show();
                    $('#form_insert4').show();
                    var clickedElement=$(e.currentTarget);
                    this.codigo=clickedElement.children(':nth-child(1)').text();
                    this.numserest=clickedElement.children(':nth-child(3)').text();
                    this.ti=clickedElement.children(':nth-child(4)').text();
                    var cod=clickedElement.children(':nth-child(1)').text();
                    var nombre=clickedElement.children(':nth-child(2)').text();     //captura los valores del modal servidor ejem: child(1) es el campo 1=codigo
                    var numest=clickedElement.children(':nth-child(3)').text();
                    var desctip=clickedElement.children(':nth-child(4)').text();
                    var est=clickedElement.children(':nth-child(5)').text();
                    var cat=clickedElement.children(':nth-child(6)').text();
                    $('#id-servidor').text(cod);
                    $('#id-numserest').text(numest);
                    $('#employed').text(nombre+" - "+desctip);
                    $('#tipito').val(desctip);
                    $('#catito').val(cat);
                    $('#estito').val(est);
                   //alert(cod+"y su tipo es: "+desctip);
                    $('#estado_condicion-modal1').modal('hide');
                    //Vemos que tipo tiene para asi cargar el layout correspondiente
                    //lert("a"+this.ti+"b"+this.ti.length);
                    $('#cargando').fadeOut("slow");
                    $('#new').fadeOut("slow");
                    if(this.ti=="DOCENTE"){
                       // alert("entro a docente"+this.ti);
                        this.cod_ti=1;
                        $('#cod_doc').val("0") ; //para resetear el combo docente
                        $('#categ_prof').val("9");  //para resetear el combo categoria
                        //-----------------------
                        $('#div_docente').show();
                        $('#div_categ_prof').show();
                        $('#div_administrativo').hide();
                        $('#div_doc_mag').hide();
                        $('#div_adm_salud').hide();


                    }
                    else if(this.ti=="ADMINISTRATIVO          "){
                        //alert("entro a adm"+this.ti);
                        this.cod_ti=2;
                        $('#cod_adm').val("0") ;
                        $('#categ_prof').val("9") ;
                        //-----------------
                        $('#div_docente').hide();
                        $('#div_doc_mag').hide();
                        $('#div_adm_salud').hide();
                        $('#div_administrativo').show();
                        $('#div_categ_prof').show();
                        //this.cambioAdm(e);

                    }  else  if(this.ti=="DOCENTE DEL MAGISTERIO"){
                        this.cod_ti=3;
                        $('#cod_doc_mag').val("0");
                        $('#categ_prof').val("9")  ;
                        //-----------------------
                        $('#div_docente').hide();
                        $('#div_administrativo').hide();
                        $('#div_adm_salud').hide();
                        $('#div_doc_mag').show();
                        $('#div_categ_prof').show();
                        // this.cambioDocMag(e);
                    }  else if(this.ti=="ADM. PROF. DE LA SALUD"){
                        this.cod_ti=4;
                        $('#cod_adm_salud').val("0") ;
                        $('#categ_prof').val("9")     ;
                        //--------------
                        $('#div_docente').hide();
                        $('#div_administrativo').hide();
                        $('#div_doc_mag').hide();
                        $('#div_adm_salud').show();
                        $('#div_categ_prof').show();
                        //this.cambioAdmSalud(e);
                    } else if(this.ti=="OBRERO"){
                        this.cod_ti=5;
                        $('#div_docente').hide();             //porque dependiendo de cual sea se va a llenar el combo de categoria
                        $('#div_administrativo').hide();
                        $('#div_doc_mag').hide();
                        $('#div_adm_salud').hide();
                        $('#div_categ_prof').show();
                        var valor2 = 1;
                        var valor1 = 5;
                        $("#div_categ_prof").show();

                        this.CategoriaProfView.fetchCategoriaProf(valor1, valor2, function(){
                            $("#div_categ_prof").show();
                        });
                        this.CategoriaProfReg.show(this.CategoriaProfView);
                    } else if(this.ti=="SIN TIPO"){
                        this.cod_ti=0;
                        $('#div_docente').hide();
                        $('#div_administrativo').hide();
                        $('#div_doc_mag').hide();
                        $('#div_adm_salud').hide();
                        $('#div_categ_prof').hide();



                    } else if(this.ti=="DESIGNADO"){
                        this.cod_ti=6;
                        $('#div_docente').hide();
                        $('#div_administrativo').hide();
                        $('#div_doc_mag').hide();
                        $('#div_adm_salud').hide();


                        var valor2 = 1;
                        var valor1 = 6;
                        $("#div_categ_prof").show();

                        this.CategoriaProfView.fetchCategoriaProf(valor1, valor2, function(){
                            $("#div_categ_prof").show();
                        });
                        this.CategoriaProfReg.show(this.CategoriaProfView);
                    } else if(this.ti=="DESIGNADO DOC. DEL MAGISTERIO"){
                        this.cod_ti=7;
                        $('#div_docente').hide();      //si $('#tipo')==7
                        $('#div_administrativo').hide();
                        $('#div_doc_mag').hide();
                        $('#div_adm_salud').hide();


                        var valor2 = 2;
                        var valor1 = 7;
                        $("#div_categ_prof").show();

                        this.CategoriaProfView.fetchCategoriaProf(valor1, valor2, function(){
                            $("#div_categ_prof").show();
                        });
                        this.CategoriaProfReg.show(this.CategoriaProfView);
                    }

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


                },

                seleccionarResolucion: function(e){
                    var clickedElement=$(e.currentTarget);
                    this.numresol=clickedElement.children(':nth-child(1)').text();
                    //alert("ahi ta tu resolucion" + this.numresol);
                    $('#numresol').val(this.numresol);
                    $('#numresol_dep').val(this.numresol);
                    $('#numresol_aseg').val(this.numresol);
                    $('#numresol_pla').val(this.numresol);
                    $('#numresol').attr('disabled','disabled');
                    $('#listar_resol_modal').modal('hide');

                },

                guardarCondLab: function(e){

                    var email =$('#email').text();
                   var self=this;
                    //----------------
                   var clickedElement=$(e.currentTarget);
                   var numres = this.numresol;
                   var tipo = $('#tipo').val();
                   var estado = $('#est').val();
                    //para capturar el valor seleccionado en un combo box
                    var d =document.getElementById('est').options.selectedIndex;
                    var desc_estado=document.getElementById('est').options[d].text;


                    if(this.ti!="SIN TIPO"){
                         var categoria = $('#categ_prof').val();
                        //para capturar el valor seleccionado en un combo box
                        var c = document.getElementById('categ_prof').options.selectedIndex;
                        var desc_categoria=document.getElementById('categ_prof').options[c].text;

                    }else{
                        var categoria = "0";
                    }

                   var codigo = this.codigo;//$('#id-servidor').text();
                   var numserest = this.numserest;//$('#id-numserest').text();

                  // alert("el numero de resolucion es: "+numres +", el tipo es: "+tipo+", el estado es: "+estado+", la categoria es: "+categoria+"el codigo es: "+codigo+" el numserest es: "+numserest);

                    if(this.numresol!=null && categoria!="9"){
                        $("#advertencia").hide();

                        $('#estito').val(desc_estado);
                        $('#catito').val(desc_categoria);

                        this.model.get("guardarcondlab").set({
                       "codigo": codigo,
                        "numserest": numserest,
                        "numres1": numres,
                        "codest": estado,
                        "codcat": categoria,
                        "codtip": this.cod_ti

                    })

                    this.model.get("guardarcondlab").url = 'api/estado_condicion/addcondlab';

                    var self_s = this.model.get("guardarcondlab").save({}, {wait: true});


                    self_s.done(function () {

                        console.log("done - funciono");

                    });

                    self_s.fail(function () {

                        console.log("fail - no funciono :)");

                    });

                        this.model.get("guardaralertpend").set({
                            "codigo": codigo,
                            "numserest": numserest,
                            "tipalert":1,
                            "email": email

                        })

                        this.model.get("guardaralertpend").url = 'api/estado_condicion/addalertpend';

                        var self_is = this.model.get("guardaralertpend").save({}, {wait: true});

                        self_is.done(function () {

                            console.log("done - funciono");

                        });
                        var cod=this.codigo;
                        var numest=this.numserest;

                        self_is.fail(function () {
                            console.log("codigo"+cod+" num"+numest);
                            self.Tabla_Cond_LabView.fetchTablaCondLab(cod,numest,function () {

                                    $("#table-cond-lab").dataTable();
                                    $('#table-cond-lab_wrapper').append("<div id='footer-table'></div>");
                                    $('#table-cond-lab_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                    $('#table-cond-lab_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                    $('.dataTables_filter input').attr('placeholder', 'buscar..');


                            });
                            self.TCLReg.show(self.Tabla_Cond_LabView);
                        });

                        $("#correcto").show();





                        $('#cod_doc').val("0");

                        $('#categ_prof').val("9");
                        $('#cod_doc_mag').val("0");
                        $('#cod_adm_salud').val("0") ;
                        $('#cod_adm').val("0") ;
                        $('#numresol').val("");
                        $('#numresol_aseg').val("");
                        $('#numresol_tipo_pago').val("");
                        $('#numresol_dep').val("");
                        $('#numresol_pla').val("");

                        this.numresol=null;

                    }else{
                        $("#correcto").hide();
                        $("#advertencia").show();

                    }




                },

                guardarCondAseg: function(e){

                    var clickedElement=$(e.currentTarget);
                    var email= $('#email').text();
                    var numres= this.numresol;
                    var codigo= this.codigo;
                    var numserest= this.numserest;
                    var regpen= $('#reg').val();
                    var entaseg=$('#ent').val();
                    var estafp=$('#estafp').val();
                    var numsispen=$('#numsispen').val();
                     //alert(email+ numres+ codigo+ numserest+ regpen+ entaseg+ estafp+ numsispen);
                    if(this.numresol!=null){
                        $("#advertencia").hide();
                        this.model.get("guardarcondaseg").set({
                            "codigo":codigo,
                            "numserest":numserest,
                            "numres1":numres,
                            "regpensionario":regpen,
                            "entasegurado":entaseg,
                            "estadoafp":estafp,
                            "numsispen":numsispen

                        })
                        this.model.get("guardarcondaseg").url='api/estado_condicion/addcondaseg';
                        var self_s= this.model.get("guardarcondaseg").save({},{wait:true});
                        var self= this;
                        self_s.done(function(){
                            console.log("done - funciono");
                        });

                        self_s.fail(function(){
                            console.log("falil - no funciono");
                        });
                        //Aqui se inserta en alertas pendientes
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

                            console.log("done - funciono");

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

                        this.numresol=null;

                    }    else{
                        $("#correcto").hide();
                        $("#advertencia").show();
                    }


                },

                guardarDep: function(e){

                    var clickedElement=$(e.currentTarget);
                    var email= $('#email').text();
                    var numres= this.numresol;
                    var codigo= this.codigo;
                    var numserest= this.numserest;
                    var udcod= this.udcod;
                    var cod  =this.codigo;
                    var numest=this.numserest;
                    if(this.numresol!=null && udcod!=""){
                        //alert( udcod);
                        $("#advertencia").hide();
                        this.model.get("guardardependencia").set({
                            "codigo":codigo,
                            "numserest":numserest,
                            "numres1":numres,
                            "udcod":udcod

                        })
                        //
                        // alert(email+ numres+ codigo+ numserest+ udcod);

                        this.model.get("guardardependencia").url='api/estado_condicion/adddep';
                        var self_s= this.model.get("guardardependencia").save({},{wait:true});
                        var self= this;
                        self_s.done(function(){
                            console.log("done - funciono");
                        });

                        self_s.fail(function(){
                            console.log("fail - no funciono");
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

                        var self = this;

                        self_s.done(function () {

                            console.log("done - funciono");

                        });

                        self_s.fail(function () {
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
                        });
                        $('#correcto').show();



                        //reiniciando los campos num. sist. pensionario y numero de resolucion
                        $('#numresol').val("");
                        $('#numresol_aseg').val("");
                        $('#numresol_tipo_pago').val("");
                        $('#numresol_dep').val("");
                        $('#numresol_pla').val("");
                        $('#nom_dep').text("");

                        this.numresol=null;
                        this.udcod=0;
                    }   else{

                        $("#correcto").hide();
                        $("#advertencia").show();
                    }

                },

                guardarPagoBanco: function(e){
                    var clickedElement=$(e.currentTarget);
                    var email=$('#email').text();
                    var codigo=this.codigo;
                    var numserest=this.numserest;
                    this.ctabanco=$('#numctabanco').val();
                    var codtippago=$('#tipopago').val();
                    var cod  =this.codigo;
                    var numest=this.numserest;

                        if(codtippago==1){
                            if(this.ctabanco!=""){
                              $("#advertencia").hide();
                        //Aqui se inserta en la tabla tb_hist_banco
                        this.model.get("guardarpagobanco").set({
                            "codigo": codigo,
                            "numserest": numserest,
                            "ctabanco": this.ctabanco,
                            "codtippago": codtippago
                        })
                        this.model.get("guardarpagobanco").url='api/estado_condicion/addpagobanco';
                        var self_s=this.model.get("guardarpagobanco").save({}, {wait: true});
                        var self=this;
                        self_s.done(function(){
                            console.log("done - funciono");
                        });

                        self_s.fail(function(){
                            console.log("falil - no funciono");
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

                            console.log("done - funciono");

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
                            }else{
                           $("#correcto").hide();
                           $("#advertencia").show();
                            }

                        }  else {
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
                                console.log("done - funciono");
                            });

                            self_s.fail(function(){
                                console.log("falil - no funciono");
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

                                console.log("done - funciono");

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


                },


                guardarCondPla: function(e){

                    var clickedElement=$(e.currentTarget);
                    var email= $('#email').text();
                    var numres= this.numresol;
                    var codigo= this.codigo;
                    var numserest= this.numserest;
                    var codcond=$('#pla').val();
                    var fechcese=$('#fech_cese').val();
                    var cod  =this.codigo;
                    var numest=this.numserest;
                    //var fechnomb=$('#fech_nomb').val();
                    var obser=$('#obs').val();

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
                            console.log("done - funciono");
                        });

                        self_s.fail(function(){
                            console.log("falil - no funciono");
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

                            console.log("done - funciono");

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
                                    console.log("done - funciono");
                                });

                                self_s.fail(function(){
                                    console.log("falil - no funciono");
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

                                    console.log("done - funciono");

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

                    } else{
                        $("#correcto").hide();
                        $("#advertencia").show();
                    }


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
                }


            });
        });
        return ErzaManager.EstadoCondicionApp.Form.View;
    });


