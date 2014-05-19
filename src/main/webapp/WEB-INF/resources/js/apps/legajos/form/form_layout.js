define(["app", "hbs!apps/legajos/form/templates/inicio_legajos","apps/legajos/form/view/servidores-table","apps/legajos/form/view/legajos-tipoestudio",
    "apps/legajos/form/view/nivel-estudio","apps/legajos/form/view/pais-estudio","apps/legajos/form/view/table-estudio","apps/legajos/form/view/estado-civil","apps/legajos/form/view/tipo-beneficio",
    "apps/legajos/form/view/tipo-documento","apps/legajos/form/view/tipo-parentesco","apps/legajos/form/view/carrera-especialidad","apps/legajos/form/view/idioma-estudiado",
    "apps/legajos/form/model/addEstudio","apps/legajos/form/model/updateEstudio","apps/legajos/form/view/tipo-tiempo-servicio","apps/legajos/form/view/tipo-tiempo-reconoc","apps/legajos/form/view/resoluciones-table","apps/legajos/form/view/resoluciones-fam",
    "apps/legajos/form/model/addResolucion","apps/legajos/form/view/table-resolucion","apps/legajos/form/model/updateResolucion","apps/legajos/form/view/table-familiar",
    "apps/legajos/form/view/tipo-pago","apps/legajos/form/model/addDatosFamiliares","apps/legajos/form/model/editDatosFamiliares","apps/legajos/form/model/beneficiario",
    "apps/legajos/form/model/updateBenef","apps/legajos/form/view/validarDocumento","apps/legajos/form/view/validarEditDocument","lib/jquery.dataTables.min","lib/core/validXtrem","lib/bootstrap-datepicker","bootstrap"],
    function (ErzaManager, layoutTpl,ServidoresTableView,TipoEstudioView,NivelEstudioView,PaisEstudioView,TableEstudioView,
              EstadoCivilView,TipoBeneficioView,TipDocumentView,TipoParentescoView,CarreraEstudioView,IdiomaEstudioView,AddEstudio,UpdateEstudio,
              TipoTiempoServicioView,TipoTiempoReconciView,ResolucionesTableView,ResolucionesFamiliar,AddResolucion,TableResolucionView,UpdateResolucion,TableFamiliarView,TipoPagoView,
              AddDatosFami,EditDatosFami,AddBeneficiario,UpdateBenef,validarDocumento,validarEditDocumento) {
    ErzaManager.module('LegajosApp.Form.View', function (View, ErzaManager, Backbone, Marionette, $, _) {

        View.Layout = Marionette.Layout.extend({

            template: layoutTpl,

            servidoresTableView:new ServidoresTableView(),
            tipoEstudioView: new TipoEstudioView(),
            nivelEstudioView:new NivelEstudioView(),
            paisEstudioView:new PaisEstudioView(),
            tableEstudioView:new TableEstudioView(),
            estadoCivilView:new EstadoCivilView(),
            tipoBeneficioView:new TipoBeneficioView(),
            tipoDocumentoView:new TipDocumentView(),
            tipoParentescoView:new TipoParentescoView(),
            carreraEstudioView:new CarreraEstudioView(),
            idiomaEstudioView:new IdiomaEstudioView(),
            tipoTiempoServicioView:new TipoTiempoServicioView(),
            tipoTiempoReconociView:new TipoTiempoReconciView(),
            resolucionesTableView:new ResolucionesTableView(),
            resolucionesFamiliar:new ResolucionesFamiliar(),
            tableResolucionView:new TableResolucionView(),
            tipoPagoView:new TipoPagoView(),
            validarExistenteDocument:new validarDocumento(),
            validarEditDocument:new validarEditDocumento(),
            tableFamiliarView:new TableFamiliarView(),

            tipo:'001',
            tipo_antiguo:null,
            codigo:null,
            horas:0,
            duracion:null,
            id:null,
            id_tiempo:'0',
            id_tiempo_servicio:null,

            tip_tmpo_serv_o_recon:'001',
            tip_tmpo_serv:'001',
            tipo_tmpo_recon:'002',
            num_ser_est:null,
            resolucion:null,
            fecha_resolucion:null,
            cargar:0,
            espec:null,
            certif:null,
            fecha_ini:null,
            fecha_fin:null,
            fecha_exp:null,
            nro_tit:null,
            nro_coleg:null,
            xfecha_xduracion:0,
            nvl_alcanz:null,
            id_est_delete:null,
            id_tyrs_delete:null,
            id_familiar:null,
            regions:{
                servidoresModal: "#serv-table-modal1",
                resolucionesModal: "#resol-table-modal",
                resolucionesModalFam:"#resol-table-fam",
                legajosTipEstudio:"#div_tip_estu",
                nivelEstudio:"#div_niv_est" ,
                paisEstudio: "#div_pais_estu",
                tablaEstudios:"#table-estudios",
                tablefamily:"#table-familiares",
                estadoCivil:"#div_est_civil",
                tipoBeneficio:"#tipo_benef_fam",
                tipoDocumento:"#div_tip_doc",
                tipoParentesco:"#div_tip_paren",
                idi_carr_o_espec:"#carr_estud_espec",
                tipoTiempoServicio:"#tipo_tpo_serv",
                tipoReconocimientoServicio:"#tipo_reconocimiento",
                tablaResoluciones:"#table-resol",
                tipoPago:"#div_tip_pagos"
            },

            events: {
                "click #search": "invokeModalServ",
                 "click #header-x":"closeModal",
                "click #bus_resol": "invokeModalResol",
                "click #fam-resol":"famModalResol",
                "dblclick #table-servidores2 > tbody > tr ": "seleccionarServidor",
                "dblclick #table-resoluciones > tbody > tr ": "seleccionarResolucion",
                "dblclick #resoluciones-fam > tbody > tr":"seleccionarResolucionFam",
                "change #leg_tip": "cambioTipo",
                "change #nivel":"MostrarSexo",
                "change #beneficio":"fun_legaj_bene",
                "click #legaj_fech_show":"fun_legaj_fech_show",
                "click #legaj_fech_clos":"fun_legaj_fech_clos",
                "click #leg_fin_show":"fun_leg_fin_show",
                "click #leg_fin_clos":"fun_leg_fin_clos",
                "click #leg_exp_show":"fun_leg_exp_show",
                "click #leg_exp_clos":"fun_leg_exp_clos",
                "click #legaj_nac_show":"fun_legaj_nac_show",
                "click #legaj_nac_clos":"fun_legaj_nac_clos",
                "click #legaj_ing_show":"fun_legaj_ing_show",
                "click #legaj_ing_clos":"fun_legaj_ing_clos",
                "click #legaj_rec_show":"fun_legaj_rec_show",
                "click #legaj_rec_clos":"fun_legaj_rec_clos",
                "click #optionsRadios1":"fun_options_radios1",
                "click #optionsRadios2":"fun_options_radios2",
                "click #option_ts":"fun_options_tpo_servicio",
                "click #option_rts":"fun_options_reconocimiento",
                "click #save_estudio" :"agregarEstudio",
                "click #continuar": "fun_del_estudio",
                "click #cancel_estudio": "resetEstudio",
                "click #upd_est": "fun_cargar_estudio",
                "click #update_estudio": "update_estudio",
                "click #save_resolucion" :"agregarResolucion",
                "click #cancel_resolucion": "resetResolucion",
                "click #continuar2": "fun_del_tmp_serv",
                "click #upd_tmp_ser": "fun_cargar_tmp_servicio",
                "click #update_resolucion": "update_resolucion",
                "change #lega_tip_pago":"fun_tipo_pago",
                "click #btn-fam":"fun_save_fam",
                "click #add-observacion":"fun_fam_edit",
                "click #edit-fam-button":"fun_action_fam_edit",
                "click #delete-fam":"fun_delete_fam",
                "click #cancel_fam":"fun_cancel_fam",
                "click #modalAV":"avmodal",
                "click #cancavmodal":"cancelaravmodal",
                "click .avgrund-close":"cancelaravmodal",
                "click #modalAV2":"avmodal2",
                "click #navLegajos > li >a":"limpiar_navtab",
                "click #modalBV":"bvmodal",
                "click #legaj_fing_clos":"fun_close_fechIng"
            },

            onRender: function(){

                this.initialFetch();
                this.legajosTipEstudio.show(this.tipoEstudioView)
                this.nivelEstudio.show(this.nivelEstudioView)
                this.paisEstudio.show(this.paisEstudioView)
                this.estadoCivil.show(this.estadoCivilView)
                this.tipoBeneficio.show(this.tipoBeneficioView)
                this.tipoDocumento.show(this.tipoDocumentoView)
                this.tipoParentesco.show(this.tipoParentescoView)
                this.idi_carr_o_espec.show(this.carreraEstudioView)
                this.tipoTiempoServicio.show(this.tipoTiempoServicioView)
                this.tipoReconocimientoServicio.show(this.tipoTiempoReconociView)
                this.tipoPago.show(this.tipoPagoView)
            },

            initialize: function () {
                this.model = new Backbone.Model();

                this.model.set({
                    "addestudio":new AddEstudio(),
                    "updateestudio":new UpdateEstudio(),
                    "addresolucion":new AddResolucion(),
                    "updateresolucion":new UpdateResolucion(),
                    "datosfamiliares": new AddDatosFami(),
                    "beneficiarios":new AddBeneficiario(),
                    "editdatosfamiliares":new EditDatosFami(),
                    "updatebenefam":new UpdateBenef()
                });
            },

            initialFetch: function(){


                this.tipoEstudioView.getTipoEstudio(
                    function () {
                        $("#idio_est").hide();
                        $("#idio_est_lbl").hide();
                        $("#form_update").hide();
                        $("#form_insert").hide();
                        $("#form_insert_ts").hide();
                        $("#form_insert_rts").hide();
                        $("#form_update_ts").hide();
                        $("#form_update_rts").hide();
                        $('#por_reconocimiento').hide();
                    }
                );
                this.nivelEstudioView.fetchNivelEstudio(this.tipo);
                this.paisEstudioView.fetchPaisEstudio();
                this.idiomaEstudioView.fetchIdiomasEstudios();
                this.estadoCivilView.getEstadoCivil();
                this.tipoBeneficioView.getTipoBeneficio();
                this.tipoDocumentoView.getTipDocument();
                this.tipoParentescoView.getTipParentesco();
                this.tipoTiempoServicioView.fetchTipots(this.tip_tmpo_serv);

                this.tipoTiempoReconociView.fetchReconcimiento(this.tipo_tmpo_recon);
                this.tipoPagoView.getTipPago();
                this.servidoresTableView.fetchServidores(function(){



                });
            },




            invokeModalServ: function(e){
                var self=this;
                var clickedElement=$(e.currentTarget);

                clickedElement.button('loading');

                setTimeout(function () {
                    clickedElement.button('reset');

                    self.servidoresModal.show(self.servidoresTableView);

                    if(self.servidoresTableView.collection.length!=0){
                        $("#table-servidores2").dataTable();


                        $('#table-servidores2_wrapper').append("<div id='footer-table'></div>");
                        $('#table-servidores2_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                        $('#table-servidores2_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                        $('.dataTables_filter input').attr('placeholder','Buscar..');
                    }


                    $('#serv-table-modal1').modal();
                }, 2000);



            },

            invokeModalResol:function(){
                var self=this;
                if(this.codigo!=null & this.num_ser_est!=null){
                    self.resolucionesTableView.fetchResoluciones(self.codigo,self.num_ser_est,
                        function(){
                            if(self.resolucionesTableView.collection.length!=0){
                                $("#table-resoluciones").dataTable();
                                $('#table-resoluciones_wrapper').append("<div id='footer-table'></div>");
                                $('#table-resoluciones_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                $('#table-resoluciones_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                $('.dataTables_filter input').attr('placeholder','Buscar..');


                            }
                        }
                    );
                    self.resolucionesModal.show(self.resolucionesTableView);
                    $('#resol-table-modal').modal()
                }

            },
             famModalResol:function(){

                 var self=this;
                 if(this.codigo!=null & this.num_ser_est!=null){

                     self.resolucionesFamiliar.fetchResolucionesFamiliar(self.codigo,self.num_ser_est,function(){
                         if(self.resolucionesFamiliar.collection.length!=0){
                             $("#resoluciones-fam").dataTable();

                             $("#resoluciones-fam_wrapper").append("<div id='footer-table'></div>");
                             $('#resoluciones-fam_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                             $('#resoluciones-fam_previous').html("<i class='glyphicon glyphicon-backward'></i>");


                             $('.dataTables_filter input').attr('placeholder','Buscar..');


                         }
                     });
                     self.resolucionesModalFam.show(self.resolucionesFamiliar);
                     $('#resol-table-fam').modal();

                 }
             },
            fun_close_fechIng:function(){

                $("#f_ingreso").val("");
            },
            seleccionarResolucion: function(e){

                var clickedElement=$(e.currentTarget);
                this.resolucion=clickedElement.children(':nth-child(1)').text();
                this.fecha_resolucion= clickedElement.children(':nth-child(2)').text();
                if(this.tip_tmpo_serv_o_recon=='001'){
                    $('#fecha_resolt').val(this.fecha_resolucion);
                    $('#resolucion').val(this.resolucion);
                    $('#resolucion').attr('disabled','disabled');
                }
                if(this.tip_tmpo_serv_o_recon=='002'){
                    $('#fecha_resolt_recono').val(this.fecha_resolucion);
                    $('#resolucion_recono').val(this.resolucion);
                    $('#resolucion_recono').attr('disabled','disabled');
                }
                $('#resol-table-modal').modal('hide');

            },
            seleccionarResolucionFam:function(e){
                var clickedElement=$(e.currentTarget);
                this.resolucion=clickedElement.children(':nth-child(1)').text();


                $("#fam-resolucion").val(this.resolucion);
                $("#fam-resolucion").attr('disabled','disabled');

                $('#resol-table-fam').modal('hide');
            },
            seleccionarServidor: function(e){

                var self=this;
                var clickedElement=$(e.currentTarget);
                this.codigo=clickedElement.attr("id");
                this.num_ser_est= clickedElement.children(':nth-child(7)').text();

                $("#fam-resolucion").attr('disabled','disabled');
                $('#resolucion').attr('disabled','disabled');
                var nombre=clickedElement.children(':nth-child(1)').text();
                var cod_ant=clickedElement.children(':nth-child(3)').text();
                var estado=clickedElement.children(':nth-child(6)').text();

                var dni_emp=clickedElement.children(':nth-child(2)').text();

                $('#desc-servidor').text(nombre);
                $("#text-cod").text(dni_emp);
                $("#cod-ant").text(cod_ant);
                $('#estado').text(estado);
                $("#block-descr").show();
                $("#form_insert").show();
                $('#form_save_rts').show();
                $("#form_insert_ts").show();
                $("#form_insert_rts").show();

              this.tableFamiliarView.fetchFamiliares(this.codigo,
                    function () {

                        if(self.tableFamiliarView.collection.length!=0){
                            $("#table-familiare-servidor").dataTable();


                            $('#table-familiare-servidor_wrapper').append("<div id='footer-table'></div>");
                            $('#table-familiare-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                            $('#table-familiare-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");


                            $('.dataTables_filter input').attr('placeholder','Buscar..');

                        }
                });
                this.tablefamily.show(this.tableFamiliarView);


                this.tableEstudioView.fetchEstudios(this.codigo,
                    function () {
                        if(self.tableEstudioView.collection.length!=0){
                            $("#table-estudios-servidor").dataTable();


                            $('#table-estudios-servidor_wrapper').append("<div id='footer-table'></div>");
                            $('#table-estudios-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                            $('#table-estudios-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                            $('.dataTables_filter input').attr('placeholder','Buscar..');

                        }
                    });
                this.tablaEstudios.show(this.tableEstudioView);


                this.tableResolucionView.fetchResol(this.codigo,this.num_ser_est,
                    function () {
                        if(self.tableResolucionView.collection.length!=0){
                            $("#table-resoluciones-servidor").dataTable();

                            $('#table-resoluciones-servidor_wrapper').append("<div id='footer-table'></div>");
                            $('#table-resoluciones-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                            $('#table-resoluciones-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                            $('.dataTables_filter input').attr('placeholder','Buscar..');

                        }
                });
                this.tablaResoluciones.show(this.tableResolucionView);



                $('#serv-table-modal1').modal("hide");

            },

            fun_options_tpo_servicio:function(){

                this.tip_tmpo_serv_o_recon='001';

                $('#por_tiempo_servicio').show();
                $('#por_reconocimiento').hide();


                 $("#tipo_rec").val("0");
                $("#f_recono").val("");
                $("#fecha_resolt_recono").val("");
                $("#resolucion_recono").val("");
                $("#fecha_resolt_anio").val("");
                $("#fecha_resolt_mes").val("");
                $("#fecha_resolt_dia").val("");

                if($('#desc-servidor').text()==""){
                    $("#form_insert_ts").hide();
                    $("#form_insert_rts").hide();
                    $("#form_update_ts").hide();
                    $("#form_update_rts").hide();
                }
            },

            fun_options_reconocimiento:function(){
               this.tip_tmpo_serv_o_recon='002';


                $('#por_tiempo_servicio').hide();
                $('#por_reconocimiento').show();


                $("#tipo_ts").val("0");
                $("#f_ingreso").val("");
                $("#resolucion").val("");
                $("#fecha_resolt").val("");

                if($('#desc-servidor').text()==""){
                    $("#form_insert_ts").hide();
                    $("#form_insert_rts").hide();
                    $("#form_update_ts").hide();
                    $("#form_update_rts").hide();
                }
            },

            fun_cancel_fam:function(){

                $("#fam-advertencia").hide();
                $('#legaj_nom_ape').val("");
                $('#legaj_domici').val("");
                $('#lega_seguro').val("");
                $('#lega_tel').val("");
                $('#legaj_naci').val("");
                $('#numcuenta').val("");
                $('#serv_ape_pat').val("");
                $('#lega_tip_pago').val("1").trigger('change');
                $('#depen').val("0").trigger('change');
                $('#beneficio').val("0").trigger('change');
                $('#sexo').val("M").trigger('change');
                $('#leg_tip_parent').val("001 ").trigger('change');
                $('#leg_tip_document').val("7").trigger('change');
                $('#form_edit_rts').hide();
                $('#form_save_rts').show();

            },



            cambioTipo:function(carrera,callBack){


                var self=this;

                $('#leg_exp').val("");
                var tipoyxhoras=$("#leg_tip").val();
                this.tipo=tipoyxhoras.substr(0,3);

                var xhoras=tipoyxhoras.substr(4);


                var fetch=this.nivelEstudioView.fetchNivelEstudio(self.tipo,


                function () {
                    if(self.nivelEstudioView.collection.length==0){

                        $('#div_niv_est').hide();

                    }else{
                        $('#div_niv_est').show();
                    };
                    if(xhoras==0){
                        $('#num_horas').hide();
                        $('#titul_exped').show();
                        $('#nro_colegiatura').show()
                    }else{
                        $('#num_horas').show();
                        $('#titul_exped').hide();
                        $('#nro_colegiatura').hide();
                    };
                    if(self.tipo=='000'){
                        $("#leg_tip").val("000");
                        $('#espec_certif').show();
                        $('#titul_exped').show();
                        $('#coleg_horas').show();
                        $('#especialidad').show();
                        $('#idio_est').hide();
                        $("#idio_est_lbl").hide();
                        $("#div_niv_est").hide();
                        self.idi_carr_o_espec.reset();
                        self.idi_carr_o_espec.show(self.carreraEstudioView)
                    }
                    else
                    if(self.tipo=='007'){


                        $('#coleg_horas').hide();
                        $('#espec_certif').show();
                        $('#titul_exped').show();
                        self.idi_carr_o_espec.reset();
                        self.idi_carr_o_espec.show(self.idiomaEstudioView)
                    }else
                        if(self.tipo=='008'||self.tipo=='009'){
                            $('#espec_certif').hide();
                            $('#titul_exped').hide();
                            $('#coleg_horas').hide();
                            self.idi_carr_o_espec.reset();
                            self.idi_carr_o_espec.show(self.carreraEstudioView)

                        }else{
                            if((self.tipo=='001'||self.tipo=='002'||self.tipo=='003')&self.cargar==0){
                            $('#espec_certif').show();
                            $('#titul_exped').show();
                            $('#coleg_horas').show();
                            $('#especialidad').show();
                            $('#idio_est').hide();
                            $("#idio_est_lbl").hide();
                            self.idi_carr_o_espec.reset();
                            self.idi_carr_o_espec.show(self.carreraEstudioView)
                            }else{
                                if(self.tipo=='004'||self.tipo=='005'||self.tipo=='006'){
                                    $('#espec_certif').show();
                                    $('#titul_exped').show();
                                    $('#coleg_horas').show();
                                    $('#especialidad').show();
                                    $('#idio_est').hide();
                                    $("#idio_est_lbl").hide();
                                }else{
                                    $('#espec_certif').show();
                                    $('#titul_exped').show();
                                    $('#coleg_horas').show();
                                    $('#especialidad').show();
                                    $('#idio_est').hide();
                                    $("#idio_est_lbl").hide();
                                    self.idi_carr_o_espec.reset();
                                    self.idi_carr_o_espec.show(self.carreraEstudioView)
                                    $('#especialidad').val(carrera);
                                }
                            }
                        }
                });
                if (typeof callBack == 'function'){
                   $('#especialidad').delay(8000).queue(function(){
                       callBack.call();
                   })

                }

            },

            fun_legaj_bene:function(){

                if("000"==$("#beneficio").val()){
                    $('#numcuenta').val("");
                    $("#fam-resolucion").val("");
                    $("#titularcuenta").val("0").trigger('change');
                    $('#lega_tip_pago').val("9").trigger('change');
                    $('#div_benef').hide();

                }
                if("1"==$('#beneficio').val()){

                    $('#numcuenta').val("");
                    $('#lega_tip_pago').val("0").trigger('change');
                    $('#div_benef').show();


                }
                if("0"==$('#beneficio').val()){
                    $('#numcuenta').val("");
                    $("#fam-resolucion").val("");
                    $("#titularcuenta").val("0").trigger('change');
                    $('#lega_tip_pago').val("9").trigger('change');
                    $('#div_benef').hide();
                }
            },

            fun_options_radios1:function(){
                this.xfecha_xduracion=0;
                $('#fecha').show();
                $('#periodo').hide();
                $("#anio").val("");
                $("#mes").val("");
                $("#dia").val("");
            },

            fun_options_radios2:function(){
                this.xfecha_xduracion=1;


                $("#legaj_nac").val("");
                $("#legaj_fin").val("");
                $('#fecha').hide();
                $('#periodo').show();
            },

            MostrarSexo:function(){

            },

            fun_legaj_nac_show:function(){


                var legaj_nac = $('#legaj_naci');

                legaj_nac.datepicker({
                    format: 'dd/mm/yyyy',
                    viewMode: 2
                });

                legaj_nac.datepicker('show');
            },

            fun_legaj_ing_show:function(){


                var legaj_nac = $('#f_ingreso');

                legaj_nac.datepicker({
                    format: 'dd/mm/yyyy',
                    viewMode: 2
                });

                legaj_nac.datepicker('show');
            },

            fun_legaj_rec_show:function(){


                var legaj_nac = $('#f_recono');

                legaj_nac.datepicker({
                    format: 'dd/mm/yyyy',
                    viewMode: 2
                });

                legaj_nac.datepicker('show');
            },

            fun_legaj_ing_clos:function(){
                $('#f_ingreso').datepicker('hide');
            },

            fun_legaj_rec_clos:function(){
                $('#f_recono').datepicker('hide');
                $("#f_recono").val("");
            },

            fun_legaj_nac_clos:function(){
                $('#f_resol').datepicker('hide');
                $("#legaj_naci").val("");

            },

            fun_leg_fin_show:function(){

                var legaj_fin = $('#legaj_fin');

                legaj_fin.datepicker({
                    format: 'dd/mm/yyyy',
                    viewMode: 2
                });

                legaj_fin.datepicker('show');
            },

            fun_leg_exp_clos:function(){
                $('#leg_exp').datepicker('hide');
                $("#leg_exp").val("");
            },

            fun_leg_exp_show:function(){

                var legaj_exp = $('#leg_exp');

                legaj_exp.datepicker({
                    format: 'dd/mm/yyyy',
                    viewMode: 2
                });

                legaj_exp.datepicker('show');
            },

            fun_leg_fin_clos:function(){

                $('#legaj_fin').datepicker('hide');

                $("#legaj_fin").val("");
            },

            fun_legaj_fech_show:function(){
                var legaj_nac = $('#legaj_nac');

                legaj_nac.datepicker({
                    format: 'dd/mm/yyyy',
                    viewMode: 2
                });

                legaj_nac.datepicker('show');
            },

            fun_legaj_fech_clos:function(){
                $('#legaj_nac').datepicker('hide');
                $("#legaj_nac").val("");
            },



            agregarEstudio: function(){
                var self=this;


                    if($("#leg_tip").val()=="000"){
                        $("#fam-advertencia").removeClass("alert-success");
                        $("#fam-advertencia").removeClass("alert-danger");
                        $("#fam-advertencia").addClass("alert-warning");
                        $("#fam-advertencia").html("<strong>Seleccione el Tipo de Estudio</strong>");

                        $("#fam-advertencia").show();
                    }else{
                        if($("#leg_tip").val()=="001-0"|| $("#leg_tip").val()=="002-0" || $("#leg_tip").val()=="003-0"){

                           if($("#centro_estudio").val()!="" && $("#especialidad").val()!="" && $("#certificado").val()!=""
                               && $("#nro_titu").val()!="" && $("#nro_coleg").val()!="" && $("#leg_exp").val()!="" && $("#pais_est").val()!="0"){

                               if(isNaN($("#nro_titu").val())){
                                   $("#fam-advertencia").removeClass("alert-success");
                                   $("#fam-advertencia").removeClass("alert-danger");
                                   $("#fam-advertencia").addClass("alert-warning");
                                   $("#fam-advertencia").html("<strong>El Número de Titulación no debe tener Caracteres</strong>");
                                   $("#fam-advertencia").show();
                               }else{
                                  if(isNaN($("#nro_coleg").val())){
                                      $("#fam-advertencia").removeClass("alert-success");
                                      $("#fam-advertencia").removeClass("alert-danger");
                                      $("#fam-advertencia").addClass("alert-warning");
                                      $("#fam-advertencia").html("<strong>El Número de Colegiatura no debe tener Caracteres</strong>");
                                      $("#fam-advertencia").show();
                                  }
                                   else{
                                      if($('#optionsRadios1').is(':checked')){

                                          if($('#legaj_nac').val()!="" &&  $("#legaj_fin").val()!=""){

                                              var diaI=parseInt($("#legaj_nac").val().substring(0,2));
                                              var mesI=parseInt($("#legaj_nac").val().substring(3,5));
                                              var anioI=parseInt($("#legaj_nac").val().substring(6,10));
                                              var fechaInicio=365*anioI+30*mesI+diaI;

                                              var diaF=parseInt($("#legaj_fin").val().substring(0,2));
                                              var mesF=parseInt($("#legaj_fin").val().substring(3,5));
                                              var anioF=parseInt($("#legaj_fin").val().substring(6,10));
                                              var fechaFin=365*anioF+30*mesF+diaF;

                                              if(fechaFin>fechaInicio){

                                                  if(self.xfecha_xduracion==0){
                                                      self.duracion="-";
                                                  };

                                                  if(self.xfecha_xduracion==1){
                                                      $('#legaj_nac').val("");
                                                      $("#legaj_fin").val("");
                                                      self.duracion=$('#anio').val()+"-"+$('#mes').val()+"-"+$('#dia').val();
                                                  };

                                                  var tipoyxhoras=$("#leg_tip").val();
                                                  var tipo=tipoyxhoras.substr(0,3);


                                                  self.espec= $("#especialidad").val();
                                                  self.nro_tit= $("#nro_titu").val();
                                                  self.fecha_exp=$("#leg_exp").val();
                                                  self.certif=$("#certificado").val();
                                                  self.nro_coleg=$("#nro_coleg").val();
                                                  self.nvl_alcanz=$("#niv_est").val();

                                                  self.model.get("addestudio").set({
                                                      "codigo": self.codigo,
                                                      "tipCod": self.tipo,
                                                      "f_inicio":$('#legaj_nac').val(),
                                                      "f_fin":$('#legaj_fin').val(),
                                                      "centro_estudio": $("#centro_estudio").val(),
                                                      "duracion": self.duracion,
                                                      "especialidad": self.espec,
                                                      "nro_titulacion":self.nro_tit,
                                                      "fecha_expedicion":self.fecha_exp,
                                                      "codpais":$("#pais_est").val(),
                                                      "nro_colegiatura":self.nro_coleg,
                                                      "certificado": self.certif,
                                                      "horas": self.horas,
                                                      "niveldescripcion":self.nvl_alcanz
                                                  });


                                                  self.model.get("addestudio").url = "api/legajos/addEstudio";

                                                  var self_s=self.model.get("addestudio").save({}, {wait: true});


                                                  self_s.fail(function () {

                                                      self.tableEstudioView.fetchEstudios(self.codigo,
                                                          function () {
                                                              $("#table-estudios-servidor").dataTable();
                                                              $('#table-estudios-servidor_wrapper').append("<div id='footer-table'></div>");


                                                              $('#table-estudios-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                              $('#table-estudios-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                              $('.dataTables_filter input').attr('placeholder','Buscar..');


                                                              $("#centro_estudio").val("");
                                                              $("#especialidad").val("");
                                                              $("#certificado").val("");
                                                              $("#nro_titu").val("");
                                                              $("#nro_coleg").val("");
                                                              $("#leg_exp").val("");
                                                              $("#legaj_nac").val("");
                                                              $("#legaj_fin").val("");
                                                              $("#anio").val("");
                                                              $("#mes").val("");
                                                              $("#dia").val("");
                                                              $("#pais_est").val("0").trigger('change');
                                                              $("#leg_tip").val("000").trigger('change');
                                                              $("#optionsRadios1").prop("checked", true).trigger('click');

                                                          });
                                                      self.tablaEstudios.show(self.tableEstudioView);

                                                  });

                                                  $("#fam-advertencia").removeClass("alert-warning");
                                                  $("#fam-advertencia").removeClass("alert-danger");
                                                  $("#fam-advertencia").addClass("alert-success");
                                                  $("#fam-advertencia").html("<strong>Se registro con éxito los Datos de Estudio</strong>");
                                                  $("#fam-advertencia").show();
                                              }else{
                                                  $("#fam-advertencia").removeClass("alert-success");
                                                  $("#fam-advertencia").removeClass("alert-danger");
                                                  $("#fam-advertencia").addClass("alert-warning");
                                                  $("#fam-advertencia").html("<strong>La Fecha de Inicio no debe ser mayor o igual a la Fecha Fin</strong>");
                                                  $("#fam-advertencia").show();
                                              }



                                          }
                                          else{
                                              $("#fam-advertencia").removeClass("alert-success");
                                              $("#fam-advertencia").removeClass("alert-danger");
                                              $("#fam-advertencia").addClass("alert-warning");
                                              $("#fam-advertencia").html("<strong>Ingrese Fecha de Estudio</strong>");
                                              $("#fam-advertencia").show();

                                          }
                                      }
                                      if($("#optionsRadios2").is(':checked')){

                                          if($("#anio").val()!="" && $("#mes").val()!="" && $("#dia").val()!=""){

                                              if(isNaN($("#anio").val()) || isNaN($("#mes").val()) || isNaN($("#dia").val())){
                                                  $("#fam-advertencia").removeClass("alert-success");
                                                  $("#fam-advertencia").removeClass("alert-danger");
                                                  $("#fam-advertencia").addClass("alert-warning");
                                                  $("#fam-advertencia").html("<strong>El Tiempo de Duración de Estudio no debe tener Caracteres</strong>");
                                                  $("#fam-advertencia").show();
                                              }
                                              else{

                                                  if(self.xfecha_xduracion==0){
                                                      self.duracion="-";
                                                  };

                                                  if(self.xfecha_xduracion==1){
                                                      $('#legaj_nac').val("");
                                                      $("#legaj_fin").val("");
                                                      self.duracion=$('#anio').val()+"-"+$('#mes').val()+"-"+$('#dia').val();
                                                  };

                                                  var tipoyxhoras=$("#leg_tip").val();


                                                  self.espec= $("#especialidad").val();
                                                  self.nro_tit= $("#nro_titu").val();
                                                  self.fecha_exp=$("#leg_exp").val();
                                                  self.certif=$("#certificado").val();
                                                  self.nro_coleg=$("#nro_coleg").val();
                                                  self.nvl_alcanz=$("#niv_est").val();




                                                  self.model.get("addestudio").set({
                                                      "codigo": self.codigo,
                                                      "tipCod": self.tipo,
                                                      "f_inicio":$('#legaj_nac').val(),
                                                      "f_fin":$('#legaj_fin').val(),
                                                      "centro_estudio": $("#centro_estudio").val(),
                                                      "duracion": self.duracion,
                                                      "especialidad": self.espec,
                                                      "nro_titulacion":self.nro_tit,
                                                      "fecha_expedicion":self.fecha_exp,
                                                      "codpais":$("#pais_est").val(),
                                                      "nro_colegiatura":self.nro_coleg,
                                                      "certificado": self.certif,
                                                      "horas": self.horas,
                                                      "niveldescripcion":self.nvl_alcanz
                                                  });


                                                  self.model.get("addestudio").url = "api/legajos/addEstudio";

                                                  var self_s=self.model.get("addestudio").save({}, {wait: true});

                                                  self_s.fail(function () {

                                                      self.tableEstudioView.fetchEstudios(self.codigo,
                                                          function () {
                                                              $("#table-estudios-servidor").dataTable();
                                                              $('#table-estudios-servidor_wrapper').append("<div id='footer-table'></div>");
                                                              $('#table-estudios-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                              $('#table-estudios-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");



                                                              $('.dataTables_filter input').attr('placeholder','Buscar..');
                                                              $("#centro_estudio").val("");
                                                              $("#especialidad").val("");
                                                              $("#certificado").val("");
                                                              $("#nro_titu").val("");
                                                              $("#nro_coleg").val("");
                                                              $("#leg_exp").val("");
                                                              $("#legaj_nac").val("");
                                                              $("#legaj_fin").val("");
                                                              $("#anio").val("");
                                                              $("#mes").val("");
                                                              $("#dia").val("");
                                                              $("#pais_est").val("0").trigger('change');
                                                              $("#leg_tip").val("000").trigger('change');
                                                              $("#optionsRadios1").prop("checked", true).trigger('click');

                                                          });
                                                      self.tablaEstudios.show(self.tableEstudioView);

                                                  });

                                                  $("#fam-advertencia").removeClass("alert-warning");
                                                  $("#fam-advertencia").removeClass("alert-danger");
                                                  $("#fam-advertencia").addClass("alert-success");
                                                  $("#fam-advertencia").html("<strong>Se registro con éxito los Datos de Estudio</strong>");
                                                  $("#fam-advertencia").show();
                                              }


                                          }
                                          else{
                                              $("#fam-advertencia").removeClass("alert-success");
                                              $("#fam-advertencia").removeClass("alert-danger");
                                              $("#fam-advertencia").addClass("alert-warning");
                                              $("#fam-advertencia").html("<strong>Ingrese Duración de Estudio</strong>");
                                              $("#fam-advertencia").show();

                                          }
                                      }
                                  }
                               }



                           }
                            else{
                               $("#fam-advertencia").removeClass("alert-success");
                               $("#fam-advertencia").removeClass("alert-danger");
                               $("#fam-advertencia").addClass("alert-warning");
                               $("#fam-advertencia").html("<strong>Campos Obligatorios Incompletos</strong>");
                               $("#fam-advertencia").show();

                           }

                        }
                        if($("#leg_tip").val()=="004-1" || $("#leg_tip").val()=="005-1" || $("#leg_tip").val()=="006-1"){
                             if($("#centro_estudio").val()!="" && $("#especialidad").val()!="" && $("#certificado").val()!=""
                                 && $("#nro_titu").val()!="" && $("#horas").val()!="" && $("#leg_exp").val()!="" && $("#pais_est").val()!="0"){

                                  if(isNaN($("#nro_titu").val())){
                                      $("#fam-advertencia").removeClass("alert-success");
                                      $("#fam-advertencia").removeClass("alert-danger");
                                      $("#fam-advertencia").addClass("alert-warning");
                                      $("#fam-advertencia").html("<strong>El Número de Titulación no debe tener Caracteres</strong>");
                                      $("#fam-advertencia").show();
                                  }
                                 else{
                                     if(isNaN($("#horas").val())){
                                         $("#fam-advertencia").removeClass("alert-success");
                                         $("#fam-advertencia").removeClass("alert-danger");
                                         $("#fam-advertencia").addClass("alert-warning");
                                         $("#fam-advertencia").html("<strong>El Número de Horas no debe tener Caracteres</strong>");
                                         $("#fam-advertencia").show();
                                     }
                                      else{


                                         if($('#optionsRadios1').is(':checked')){
                                             if($('#legaj_nac').val()!="" &&  $("#legaj_fin").val()!=""){

                                                 var diaI=parseInt($("#legaj_nac").val().substring(0,2));
                                                 var mesI=parseInt($("#legaj_nac").val().substring(3,5));
                                                 var anioI=parseInt($("#legaj_nac").val().substring(6,10));
                                                 var fechaInicio=365*anioI+30*mesI+diaI;

                                                 var diaF=parseInt($("#legaj_fin").val().substring(0,2));
                                                 var mesF=parseInt($("#legaj_fin").val().substring(3,5));
                                                 var anioF=parseInt($("#legaj_fin").val().substring(6,10));
                                                 var fechaFin=365*anioF+30*mesF+diaF;
                                                 if(fechaFin>fechaInicio){

                                                     if(self.xfecha_xduracion==0){
                                                         self.duracion="-";
                                                     };

                                                     if(self.xfecha_xduracion==1){
                                                         $('#legaj_nac').val("");
                                                         $("#legaj_fin").val("");
                                                         self.duracion=$('#anio').val()+"-"+$('#mes').val()+"-"+$('#dia').val();
                                                     };

                                                     var tipoyxhoras=$("#leg_tip").val();




                                                     self.espec= $("#especialidad").val();
                                                     self.nro_tit= $("#nro_titu").val();
                                                     self.fecha_exp=$("#leg_exp").val();
                                                     self.certif=$("#certificado").val();
                                                     self.nro_coleg="-";
                                                     self.nvl_alcanz="-";
                                                     self.horas=parseInt($('#horas').val());



                                                     self.model.get("addestudio").set({
                                                         "codigo": self.codigo,
                                                         "tipCod": self.tipo,
                                                         "f_inicio":$('#legaj_nac').val(),
                                                         "f_fin":$('#legaj_fin').val(),
                                                         "centro_estudio": $("#centro_estudio").val(),
                                                         "duracion": self.duracion,
                                                         "especialidad": self.espec,
                                                         "nro_titulacion":self.nro_tit,
                                                         "fecha_expedicion":self.fecha_exp,
                                                         "codpais":$("#pais_est").val(),
                                                         "nro_colegiatura":self.nro_coleg,
                                                         "certificado": self.certif,
                                                         "horas": self.horas,
                                                         "niveldescripcion":self.nvl_alcanz
                                                     });


                                                     self.model.get("addestudio").url = "api/legajos/addEstudio";

                                                     var self_s=self.model.get("addestudio").save({}, {wait: true});

                                                     self_s.fail(function () {

                                                         self.tableEstudioView.fetchEstudios(self.codigo,
                                                             function () {
                                                                 $("#table-estudios-servidor").dataTable();
                                                                 $('#table-estudios-servidor_wrapper').append("<div id='footer-table'></div>");


                                                                 $('#table-estudios-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                                 $('#table-estudios-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                                 $('.dataTables_filter input').attr('placeholder','Buscar..');

                                                                 $("#centro_estudio").val("");
                                                                 $("#especialidad").val("");
                                                                 $("#certificado").val("");
                                                                 $("#nro_titu").val("");
                                                                 $("#nro_coleg").val("");
                                                                 $("#leg_exp").val("");
                                                                 $("#legaj_nac").val("");
                                                                 $("#legaj_fin").val("");
                                                                 $("#anio").val("");
                                                                 $("#mes").val("");
                                                                 $("#dia").val("");
                                                                 $("#pais_est").val("0").trigger('change');
                                                                 $("#leg_tip").val("000").trigger('change');
                                                                 $("#optionsRadios1").prop("checked", true).trigger('click');
                                                             });
                                                         self.tablaEstudios.show(self.tableEstudioView);

                                                     });

                                                     $("#fam-advertencia").removeClass("alert-warning");
                                                     $("#fam-advertencia").removeClass("alert-danger");
                                                     $("#fam-advertencia").addClass("alert-success");
                                                     $("#fam-advertencia").html("<strong>Se registro con éxito los Datos de Estudio</strong>");
                                                     $("#fam-advertencia").show();
                                                 }
                                                 else{
                                                     $("#fam-advertencia").removeClass("alert-success");
                                                     $("#fam-advertencia").removeClass("alert-danger");
                                                     $("#fam-advertencia").addClass("alert-warning");
                                                     $("#fam-advertencia").html("<strong>La Fecha de Inicio no debe ser mayor o igual a la Fecha Fin</strong>");
                                                     $("#fam-advertencia").show();
                                                 }


                                             }
                                             else{
                                                 $("#fam-advertencia").removeClass("alert-success");
                                                 $("#fam-advertencia").removeClass("alert-danger");
                                                 $("#fam-advertencia").addClass("alert-warning");
                                                 $("#fam-advertencia").html("<strong>Ingrese Fecha de Estudio</strong>");
                                                 $("#fam-advertencia").show();

                                             }

                                         }
                                         if($("#optionsRadios2").is(':checked')){
                                             if($("#anio").val()!="" && $("#mes").val()!="" && $("#dia").val()!=""){

                                                 if(isNaN($("#anio").val()) || isNaN($("#mes").val()) || isNaN($("#dia").val())){
                                                     $("#fam-advertencia").removeClass("alert-success");
                                                     $("#fam-advertencia").removeClass("alert-danger");
                                                     $("#fam-advertencia").addClass("alert-warning");
                                                     $("#fam-advertencia").html("<strong>El Tiempo de Duración de Estudio no debe tener Caracteres</strong>");
                                                     $("#fam-advertencia").show();
                                                 }
                                                 else{

                                                     if(self.xfecha_xduracion==0){
                                                         self.duracion="-";
                                                     };

                                                     if(self.xfecha_xduracion==1){
                                                         $('#legaj_nac').val("");
                                                         $("#legaj_fin").val("");
                                                         self.duracion=$('#anio').val()+"-"+$('#mes').val()+"-"+$('#dia').val();
                                                     };

                                                     var tipoyxhoras=$("#leg_tip").val();


                                                     self.espec= $("#especialidad").val();
                                                     self.nro_tit= $("#nro_titu").val();
                                                     self.fecha_exp=$("#leg_exp").val();
                                                     self.certif=$("#certificado").val();
                                                     self.nro_coleg="-";
                                                     self.nvl_alcanz="-";
                                                     self.horas=parseInt($('#horas').val());



                                                     self.model.get("addestudio").set({
                                                         "codigo": self.codigo,
                                                         "tipCod": self.tipo,
                                                         "f_inicio":$('#legaj_nac').val(),
                                                         "f_fin":$('#legaj_fin').val(),
                                                         "centro_estudio": $("#centro_estudio").val(),
                                                         "duracion": self.duracion,
                                                         "especialidad": self.espec,
                                                         "nro_titulacion":self.nro_tit,
                                                         "fecha_expedicion":self.fecha_exp,
                                                         "codpais":$("#pais_est").val(),
                                                         "nro_colegiatura":self.nro_coleg,
                                                         "certificado": self.certif,
                                                         "horas": self.horas,
                                                         "niveldescripcion":self.nvl_alcanz
                                                     });


                                                     self.model.get("addestudio").url = "api/legajos/addEstudio";

                                                     var self_s=self.model.get("addestudio").save({}, {wait: true});

                                                     self_s.fail(function () {

                                                         self.tableEstudioView.fetchEstudios(self.codigo,
                                                             function () {
                                                                 $("#table-estudios-servidor").dataTable();
                                                                 $('#table-estudios-servidor_wrapper').append("<div id='footer-table'></div>");


                                                                 $('#table-estudios-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                                 $('#table-estudios-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                                 $('.dataTables_filter input').attr('placeholder','Buscar..');

                                                                 $("#centro_estudio").val("");
                                                                 $("#especialidad").val("");
                                                                 $("#certificado").val("");
                                                                 $("#nro_titu").val("");
                                                                 $("#nro_coleg").val("");
                                                                 $("#leg_exp").val("");
                                                                 $("#legaj_nac").val("");
                                                                 $("#legaj_fin").val("");
                                                                 $("#anio").val("");
                                                                 $("#mes").val("");
                                                                 $("#dia").val("");
                                                                 $("#pais_est").val("0").trigger('change');
                                                                 $("#leg_tip").val("000").trigger('change');
                                                                 $("#optionsRadios1").prop("checked", true).trigger('click');
                                                             });
                                                         self.tablaEstudios.show(self.tableEstudioView);

                                                     });
                                                     $("#fam-advertencia").removeClass("alert-warning");
                                                     $("#fam-advertencia").removeClass("alert-danger");
                                                     $("#fam-advertencia").addClass("alert-success");
                                                     $("#fam-advertencia").html("<strong>Se registro con éxito los Datos de Estudio</strong>");
                                                     $("#fam-advertencia").show();
                                                 }

                                             }
                                             else{
                                                 $("#fam-advertencia").removeClass("alert-success");
                                                 $("#fam-advertencia").removeClass("alert-danger");
                                                 $("#fam-advertencia").addClass("alert-warning");
                                                 $("#fam-advertencia").html("<strong>Ingrese Duración de Estudio</strong>");
                                                 $("#fam-advertencia").show();

                                             }

                                         }
                                     }
                                  }



                             }
                              else{
                                 $("#fam-advertencia").removeClass("alert-success");
                                 $("#fam-advertencia").removeClass("alert-danger");
                                 $("#fam-advertencia").addClass("alert-warning");
                                 $("#fam-advertencia").html("<strong>Campos Obligatorios Incompletos</strong>");
                                 $("#fam-advertencia").show();

                             }

                        }
                        if($("#leg_tip").val()=="007-0"){
                           if($("#centro_estudio").val()!="" && $("#certificado").val()!="" && $("#nro_titu").val()!="" && $("#leg_exp").val()!=""
                               && $("#pais_est").val()!="0" && $("#idio_est").val()!="00"){

                               if(isNaN($("#nro_titu").val())){


                                   $("#fam-advertencia").removeClass("alert-success");
                                   $("#fam-advertencia").removeClass("alert-danger");
                                   $("#fam-advertencia").addClass("alert-warning");
                                   $("#fam-advertencia").html("<strong>El Número de Titulación no debe tener Caracteres</strong>");
                                   $("#fam-advertencia").show();
                               }
                               else{
                                   if($("#optionsRadios1").is(':checked')){
                                       if($('#legaj_nac').val()!="" &&  $("#legaj_fin").val()!=""){
                                           var diaI=parseInt($("#legaj_nac").val().substring(0,2));
                                           var mesI=parseInt($("#legaj_nac").val().substring(3,5));
                                           var anioI=parseInt($("#legaj_nac").val().substring(6,10));
                                           var fechaInicio=365*anioI+30*mesI+diaI;

                                           var diaF=parseInt($("#legaj_fin").val().substring(0,2));
                                           var mesF=parseInt($("#legaj_fin").val().substring(3,5));
                                           var anioF=parseInt($("#legaj_fin").val().substring(6,10));
                                           var fechaFin=365*anioF+30*mesF+diaF;

                                           if(fechaFin>fechaInicio){

                                               if(self.xfecha_xduracion==0){
                                                   self.duracion="-";
                                               };

                                               if(self.xfecha_xduracion==1){
                                                   $('#legaj_nac').val("");
                                                   $("#legaj_fin").val("");
                                                   self.duracion=$('#anio').val()+"-"+$('#mes').val()+"-"+$('#dia').val();
                                               };

                                               var tipoyxhoras=$("#leg_tip").val();



                                               self.espec= $("#idio_est").val();
                                               self.nro_tit= $("#nro_titu").val();
                                               self.fecha_exp=$("#leg_exp").val();
                                               self.certif=$

                                               self.model.get("addestudio").set({
                                                   "codigo": self.codigo,
                                                   "tipCod": self.tipo,
                                                   "f_inicio":$('#legaj_nac').val(),
                                                   "f_fin":$('#legaj_fin').val(),
                                                   "centro_estudio": $("#centro_estudio").val(),
                                                   "duracion": self.duracion,
                                                   "especialidad": self.espec,
                                                   "nro_titulacion":self.nro_tit,
                                                   "fecha_expedicion":self.fecha_exp,
                                                   "codpais":$("#pais_est").val(),
                                                   "nro_colegiatura":self.nro_coleg,
                                                   "certificado": self.certif,
                                                   "horas": self.horas,
                                                   "niveldescripcion":self.nvl_alcanz
                                               });


                                               self.model.get("addestudio").url = "api/legajos/addEstudio";

                                               var self_s=self.model.get("addestudio").save({}, {wait: true});

                                               self_s.fail(function () {

                                                   self.tableEstudioView.fetchEstudios(self.codigo,
                                                       function () {
                                                           $("#table-estudios-servidor").dataTable();
                                                           $('#table-estudios-servidor_wrapper').append("<div id='footer-table'></div>");

                                                           $('#table-estudios-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                           $('#table-estudios-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                           $('.dataTables_filter input').attr('placeholder','Buscar..');

                                                           $("#centro_estudio").val("");
                                                           $("#especialidad").val("");
                                                           $("#certificado").val("");
                                                           $("#nro_titu").val("");
                                                           $("#nro_coleg").val("");
                                                           $("#leg_exp").val("");
                                                           $("#legaj_nac").val("");
                                                           $("#legaj_fin").val("");
                                                           $("#anio").val("");
                                                           $("#mes").val("");
                                                           $("#dia").val("");
                                                           $("#pais_est").val("0").trigger('change');
                                                           $("#leg_tip").val("000").trigger('change');
                                                           $("#optionsRadios1").prop("checked", true).trigger('click');
                                                       });
                                                   self.tablaEstudios.show(self.tableEstudioView);

                                               });("#certificado").val();
                                               self.nro_coleg="-";
                                               self.nvl_alcanz=$("#niv_est").val();

                                               $("#fam-advertencia").removeClass("alert-warning");
                                               $("#fam-advertencia").removeClass("alert-danger");
                                               $("#fam-advertencia").addClass("alert-success");
                                               $("#fam-advertencia").html("<strong>Se registro con éxito los Datos de Estudio</strong>");
                                               $("#fam-advertencia").show();
                                           }
                                           else{
                                               $("#fam-advertencia").removeClass("alert-success");
                                               $("#fam-advertencia").removeClass("alert-danger");
                                               $("#fam-advertencia").addClass("alert-warning");
                                               $("#fam-advertencia").html("<strong>La Fecha de Inicio no debe ser mayor o igual a la Fecha Fin</strong>");
                                               $("#fam-advertencia").show();
                                           }

                                       }else{
                                           $("#fam-advertencia").removeClass("alert-success");
                                           $("#fam-advertencia").removeClass("alert-danger");
                                           $("#fam-advertencia").addClass("alert-warning");
                                           $("#fam-advertencia").html("<strong>Ingrese Fecha de Estudio</strong>");
                                           $("#fam-advertencia").show();

                                       }
                                   }
                                   if($("#optionsRadios2").is(':checked')){
                                       if($("#anio").val()!="" && $("#mes").val()!="" && $("#dia").val()!=""){
                                           if(isNaN($("#anio").val()) || isNaN($("#mes").val()) || isNaN($("#dia").val())){
                                               $("#fam-advertencia").removeClass("alert-success");
                                               $("#fam-advertencia").removeClass("alert-danger");
                                               $("#fam-advertencia").addClass("alert-warning");
                                               $("#fam-advertencia").html("<strong>El Tiempo de Duración de Estudio no debe tener Caracteres</strong>");
                                               $("#fam-advertencia").show();
                                           }
                                           else{


                                               if(self.xfecha_xduracion==0){
                                                   self.duracion="-";
                                               };

                                               if(self.xfecha_xduracion==1){
                                                   $('#legaj_nac').val("");
                                                   $("#legaj_fin").val("");
                                                   self.duracion=$('#anio').val()+"-"+$('#mes').val()+"-"+$('#dia').val();
                                               };





                                               self.espec= $("#idio_est").val();
                                               self.nro_tit= $("#nro_titu").val();
                                               self.fecha_exp=$("#leg_exp").val();
                                               self.certif=$("#certificado").val();
                                               self.nro_coleg="-";
                                               self.nvl_alcanz=$("#niv_est").val();


                                               self.model.get("addestudio").set({
                                                   "codigo": self.codigo,
                                                   "tipCod": self.tipo,
                                                   "f_inicio":$('#legaj_nac').val(),
                                                   "f_fin":$('#legaj_fin').val(),
                                                   "centro_estudio": $("#centro_estudio").val(),
                                                   "duracion": self.duracion,
                                                   "especialidad": self.espec,
                                                   "nro_titulacion":self.nro_tit,
                                                   "fecha_expedicion":self.fecha_exp,
                                                   "codpais":$("#pais_est").val(),
                                                   "nro_colegiatura":self.nro_coleg,
                                                   "certificado": self.certif,
                                                   "horas": self.horas,
                                                   "niveldescripcion":self.nvl_alcanz
                                               });

                                               self.model.get("addestudio").url = "api/legajos/addEstudio";

                                               var self_s=self.model.get("addestudio").save({}, {wait: true});

                                               self_s.fail(function () {

                                                   self.tableEstudioView.fetchEstudios(self.codigo,
                                                       function () {
                                                           $("#table-estudios-servidor").dataTable();
                                                           $('#table-estudios-servidor_wrapper').append("<div id='footer-table'></div>");


                                                           $('#table-estudios-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                           $('#table-estudios-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                           $('.dataTables_filter input').attr('placeholder','Buscar..');
                                                           $("#centro_estudio").val("");
                                                           $("#especialidad").val("");
                                                           $("#certificado").val("");
                                                           $("#nro_titu").val("");
                                                           $("#nro_coleg").val("");
                                                           $("#leg_exp").val("");
                                                           $("#legaj_nac").val("");
                                                           $("#legaj_fin").val("");
                                                           $("#anio").val("");
                                                           $("#mes").val("");
                                                           $("#dia").val("");
                                                           $("#pais_est").val("0").trigger('change');
                                                           $("#leg_tip").val("000").trigger('change');
                                                           $("#optionsRadios1").prop("checked", true).trigger('click');
                                                       });
                                                   self.tablaEstudios.show(self.tableEstudioView);

                                               });

                                               $("#fam-advertencia").removeClass("alert-warning");
                                               $("#fam-advertencia").removeClass("alert-danger");
                                               $("#fam-advertencia").addClass("alert-success");
                                               $("#fam-advertencia").html("<strong>Se registro con éxito los Datos de Estudio</strong>");
                                               $("#fam-advertencia").show();
                                           }


                                       }
                                       else{
                                           $("#fam-advertencia").removeClass("alert-success");
                                           $("#fam-advertencia").removeClass("alert-danger");
                                           $("#fam-advertencia").addClass("alert-warning");
                                           $("#fam-advertencia").html("<strong>Ingrese Duración de Estudio</strong>");
                                           $("#fam-advertencia").show();

                                       }
                                   }
                               }


                           }
                            else{
                               $("#fam-advertencia").removeClass("alert-success");
                               $("#fam-advertencia").removeClass("alert-danger");
                               $("#fam-advertencia").addClass("alert-warning");
                               $("#fam-advertencia").html("<strong>Campos Obligatorios Incompletos</strong>");
                               $("#fam-advertencia").show();

                           }
                        }
                        if($("#leg_tip").val()=="008-0" || $("#leg_tip").val()=="009-0"){
                            if($("#centro_estudio").val()!="" && $("#pais_est").val()!="0"){

                                if($("#optionsRadios1").is(':checked')){
                                    if($('#legaj_nac').val()!="" &&  $("#legaj_fin").val()!=""){
                                        var diaI=parseInt($("#legaj_nac").val().substring(0,2));
                                        var mesI=parseInt($("#legaj_nac").val().substring(3,5));
                                        var anioI=parseInt($("#legaj_nac").val().substring(6,10));
                                        var fechaInicio=365*anioI+30*mesI+diaI;

                                        var diaF=parseInt($("#legaj_fin").val().substring(0,2));
                                        var mesF=parseInt($("#legaj_fin").val().substring(3,5));
                                        var anioF=parseInt($("#legaj_fin").val().substring(6,10));
                                        var fechaFin=365*anioF+30*mesF+diaF;
                                       if(fechaFin>fechaInicio){

                                           if(self.xfecha_xduracion==0){
                                               self.duracion="-";
                                           };

                                           if(self.xfecha_xduracion==1){
                                               $('#legaj_nac').val("");
                                               $("#legaj_fin").val("");
                                               self.duracion=$('#anio').val()+"-"+$('#mes').val()+"-"+$('#dia').val();
                                           };




                                           self.espec="-";
                                           self.nro_tit="-";
                                           self.fecha_exp=$("#leg_exp").val();
                                           self.certif="-";
                                           self.nro_coleg="-";
                                           self.nvl_alcanz=$("#niv_est").val();



                                           self.model.get("addestudio").set({
                                               "codigo": self.codigo,
                                               "tipCod": self.tipo,
                                               "f_inicio":$('#legaj_nac').val(),
                                               "f_fin":$('#legaj_fin').val(),
                                               "centro_estudio": $("#centro_estudio").val(),
                                               "duracion": self.duracion,
                                               "especialidad": self.espec,
                                               "nro_titulacion":self.nro_tit,
                                               "fecha_expedicion":self.fecha_exp,
                                               "codpais":$("#pais_est").val(),
                                               "nro_colegiatura":self.nro_coleg,
                                               "certificado": self.certif,
                                               "horas": self.horas,
                                               "niveldescripcion":self.nvl_alcanz
                                           });


                                           self.model.get("addestudio").url = "api/legajos/addEstudio";

                                           var self_s=self.model.get("addestudio").save({}, {wait: true});

                                           self_s.fail(function () {

                                               self.tableEstudioView.fetchEstudios(self.codigo,
                                                   function () {
                                                       $("#table-estudios-servidor").dataTable();
                                                       $('#table-estudios-servidor_wrapper').append("<div id='footer-table'></div>");


                                                       $('#table-estudios-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                       $('#table-estudios-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                       $('.dataTables_filter input').attr('placeholder','Buscar..');

                                                       $("#centro_estudio").val("");
                                                       $("#especialidad").val("");
                                                       $("#certificado").val("");
                                                       $("#nro_titu").val("");
                                                       $("#nro_coleg").val("");
                                                       $("#leg_exp").val("");
                                                       $("#legaj_nac").val("");
                                                       $("#legaj_fin").val("");
                                                       $("#anio").val("");
                                                       $("#mes").val("");
                                                       $("#dia").val("");
                                                       $("#pais_est").val("0").trigger('change');
                                                       $("#leg_tip").val("000").trigger('change');
                                                       $("#optionsRadios1").prop("checked", true).trigger('click');
                                                   });
                                               self.tablaEstudios.show(self.tableEstudioView);

                                           });

                                           $("#fam-advertencia").removeClass("alert-warning");
                                           $("#fam-advertencia").removeClass("alert-danger");
                                           $("#fam-advertencia").addClass("alert-success");
                                           $("#fam-advertencia").html("<strong>Se registro con éxito los Datos de Estudio</strong>");
                                           $("#fam-advertencia").show();
                                       }else{
                                           $("#fam-advertencia").removeClass("alert-success");
                                           $("#fam-advertencia").removeClass("alert-danger");
                                           $("#fam-advertencia").addClass("alert-warning");
                                           $("#fam-advertencia").html("<strong>La Fecha de Inicio no debe ser mayor o igual a la Fecha Fin</strong>");
                                           $("#fam-advertencia").show();
                                       }

                                    }
                                    else{
                                        $("#fam-advertencia").removeClass("alert-success");
                                        $("#fam-advertencia").removeClass("alert-danger");
                                        $("#fam-advertencia").addClass("alert-warning");
                                        $("#fam-advertencia").html("<strong>Ingrese Fecha de Estudio</strong>");
                                        $("#fam-advertencia").show();

                                    }
                                }
                                if($("#optionsRadios2").is(':checked')){
                                    if($("#anio").val()!="" && $("#mes").val()!="" && $("#dia").val()!=""){
                                        if(isNaN($("#anio").val()) || isNaN($("#mes").val()) || isNaN($("#dia").val())){
                                            $("#fam-advertencia").removeClass("alert-success");
                                            $("#fam-advertencia").removeClass("alert-danger");
                                            $("#fam-advertencia").addClass("alert-warning");
                                            $("#fam-advertencia").html("<strong>El Tiempo de Duración de Estudio no debe tener Caracteres</strong>");
                                            $("#fam-advertencia").show();
                                        }
                                        else{

                                            if(self.xfecha_xduracion==0){
                                                self.duracion="-";
                                            };

                                            if(self.xfecha_xduracion==1){
                                                $('#legaj_nac').val("");
                                                $("#legaj_fin").val("");
                                                self.duracion=$('#anio').val()+"-"+$('#mes').val()+"-"+$('#dia').val();
                                            };




                                            self.espec="-";
                                            self.nro_tit="-";
                                            self.fecha_exp=$("#leg_exp").val();
                                            self.certif="-";
                                            self.nro_coleg="-";
                                            self.nvl_alcanz=$("#niv_est").val();



                                            self.model.get("addestudio").set({
                                                "codigo": self.codigo,
                                                "tipCod": self.tipo,
                                                "f_inicio":$('#legaj_nac').val(),
                                                "f_fin":$('#legaj_fin').val(),
                                                "centro_estudio": $("#centro_estudio").val(),
                                                "duracion": self.duracion,
                                                "especialidad": self.espec,
                                                "nro_titulacion":self.nro_tit,
                                                "fecha_expedicion":self.fecha_exp,
                                                "codpais":$("#pais_est").val(),
                                                "nro_colegiatura":self.nro_coleg,
                                                "certificado": self.certif,
                                                "horas": self.horas,
                                                "niveldescripcion":self.nvl_alcanz
                                            });


                                            self.model.get("addestudio").url = "api/legajos/addEstudio";

                                            var self_s=self.model.get("addestudio").save({}, {wait: true});

                                            self_s.fail(function () {

                                                self.tableEstudioView.fetchEstudios(self.codigo,
                                                    function () {
                                                        $("#table-estudios-servidor").dataTable();
                                                        $('#table-estudios-servidor_wrapper').append("<div id='footer-table'></div>");


                                                        $('#table-estudios-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                        $('#table-estudios-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                        $('.dataTables_filter input').attr('placeholder','Buscar..');

                                                        $("#centro_estudio").val("");
                                                        $("#especialidad").val("");
                                                        $("#certificado").val("");
                                                        $("#nro_titu").val("");
                                                        $("#nro_coleg").val("");
                                                        $("#leg_exp").val("");
                                                        $("#legaj_nac").val("");
                                                        $("#legaj_fin").val("");
                                                        $("#anio").val("");
                                                        $("#mes").val("");
                                                        $("#dia").val("");
                                                        $("#pais_est").val("0").trigger('change');
                                                        $("#leg_tip").val("000").trigger('change');
                                                        $("#optionsRadios1").prop("checked", true).trigger('click');
                                                    });
                                                self.tablaEstudios.show(self.tableEstudioView);

                                            });
                                            $("#fam-advertencia").removeClass("alert-warning");
                                            $("#fam-advertencia").removeClass("alert-danger");
                                            $("#fam-advertencia").addClass("alert-success");
                                            $("#fam-advertencia").html("<strong>Se registro con éxito los Datos de Estudio</strong>");
                                            $("#fam-advertencia").show();
                                        }

                                    }
                                    else{
                                        $("#fam-advertencia").removeClass("alert-success");
                                        $("#fam-advertencia").removeClass("alert-danger");
                                        $("#fam-advertencia").addClass("alert-warning");
                                        $("#fam-advertencia").html("<strong>Ingrese Duración de Estudio</strong>");
                                        $("#fam-advertencia").show();

                                    }
                                }

                            }
                            else{
                                $("#fam-advertencia").removeClass("alert-success");
                                $("#fam-advertencia").removeClass("alert-danger");
                                $("#fam-advertencia").addClass("alert-warning");
                                $("#fam-advertencia").html("<strong>Campos Obligatorios Incompletos</strong>");
                                $("#fam-advertencia").show();

                            }
                        }
                    }



            },

            fun_del_estudio:function(){
                var self = this;

                var url='api/legajos/deleteEstudio/'+self.id_est_delete;
                $.ajax({
                    type: 'DELETE',
                    url: url,
                    success: function(){

                        self.tableEstudioView.fetchEstudios(self.codigo,
                            function () {
                                $("#table-estudios-servidor").dataTable();
                                $('#table-estudios-servidor_wrapper').append("<div id='footer-table'></div>");
                                $('#table-estudios-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                $('#table-estudios-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                $('.dataTables_filter input').attr('placeholder','Buscar..');
                            });
                        self.tablaEstudios.show(self.tableEstudioView);

                    },
                    error: function(){
                        self.tableEstudioView.fetchEstudios(self.codigo,
                            function () {
                                $("#table-estudios-servidor").dataTable();
                                $('#table-estudios-servidor_wrapper').append("<div id='footer-table'></div>");
                                $('#table-estudios-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                $('#table-estudios-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                $('.dataTables_filter input').attr('placeholder','Buscar..');
                            });
                        self.tablaEstudios.show(self.tableEstudioView);

                    }
                });


            },

            resetEstudio:function(){
                this.cargar=0;

                $("#fam-advertencia").hide();
               //
                $("#centro_estudio").val("");
                $("#especialidad").val("");
                $("#certificado").val("");
                $("#nro_titu").val("");
                $("#nro_coleg").val("");
                $("#leg_exp").val("");
                $("#legaj_nac").val("");
                $("#legaj_fin").val("");
                $("#anio").val("");
                $("#mes").val("");
                $("#dia").val("");
                $('#leg_tip > #'+this.tipo).removeAttr("selected");
                $("#pais_est").val("0").trigger('change');
               $("#leg_tip").val("000").trigger('change');
                $("#optionsRadios1").prop("checked", true).trigger('click');

                $("#form_update").hide();
                $("#form_insert").show();
                $("#leg_tip").prop("disabled",false);
            },

            resetResolucion:function(){
                $("#option_ts").prop("disabled",false);
                $("#tipo_ts").prop("disabled",false);
                $("#tipo_rec").prop("disabled",false);
                $("#option_rts").prop("disabled",false);
                $("#fam-advertencia").hide();
                $("#option_ts").prop("checked", true).trigger('click');
                $("#form_insert_rts").show();
                $("#form_update_rts").hide();
                $("#form_insert_ts").show();
                $("#form_update_ts").hide();
            },


            fun_cargar_estudio:function(ev){

                this.cargar=1;
                 $('#leg_tip > #'+this.tipo).removeAttr("selected");
                var element = $(ev.currentTarget);
                this.id = element.parent().parent().attr('id');
                var tipo=element.parent().parent().children(':nth-child(1)').attr('data');
                var xhoras=element.parent().parent().children(':nth-child(2)').attr('data');
                $('#leg_tip > #'+tipo).prop('selected', true);


                var carrera=element.parent().parent().children(':nth-child(7)').text();
                this.cambioTipo(carrera,function(){

                    $('#niv_est').val(element.parent().parent().children(':nth-child(10)').text().trim());
                    $('#niv_est > #'+element.parent().parent().children(':nth-child(10)').text()).attr('selected', true);
                });

                if(xhoras==1){
                    $('#horas').val(element.parent().parent().children(':nth-child(9)').text().trim())
                }else{
                    $('#horas').val("");
                };

                $('#leg_tip').prop('disabled', 'disabled');
                $("#centro_estudio").val(element.parent().parent().children(':nth-child(3)').text().trim());
                $("#certificado").val(element.parent().parent().children(':nth-child(8)').text().trim());
                $("#legaj_nac").val(element.parent().parent().children(':nth-child(4)').text().trim());
                $("#legaj_fin").val(element.parent().parent().children(':nth-child(5)').text().trim());
                $("#leg_exp").val(element.parent().parent().children(':nth-child(8)').attr('data').trim());
                $("#nro_titu").val(element.parent().parent().children(':nth-child(3)').attr('data').trim());
                $("#nro_coleg").val(element.parent().parent().children(':nth-child(4)').attr('data').trim());
                $("#pais_est option[value="+element.parent().parent().children(':nth-child(5)').attr('data')+"]").prop('selected', 'selected');

                if(tipo=='007'){
                    $("#idio_est option[value="+element.parent().parent().children(':nth-child(7)').text().trim()+"]").prop('selected', 'selected');
                }else{
                    $("#especialidad").val(element.parent().parent().children(':nth-child(7)').text().trim());
                };

                if(element.parent().parent().children(':nth-child(6)').text().trim()!="-"){
                    $('input:radio[name=optionsRadios][value=option2]').click();
                    var array=element.parent().parent().children(':nth-child(6)').text().trim().split('-');
                    $('#anio').val(array[0]);
                    $('#mes').val(array[1]);
                    $('#dia').val(array[2]);
                }else{
                    $('input:radio[name=optionsRadios][value=option1]').click();
                    $('#anio').val("");
                    $('#mes').val("");
                    $('#dia').val("");
                }
                $("#form_insert").hide();
                $("#form_update").show();
            },

            update_estudio:function(){

                var self=this;

                if($("#leg_tip").val()=="000"){
                    $("#fam-advertencia").removeClass("alert-success");
                    $("#fam-advertencia").removeClass("alert-danger");
                    $("#fam-advertencia").addClass("alert-warning");
                    $("#fam-advertencia").html("<strong>Seleccione el Tipo de Estudio</strong>");

                    $("#fam-advertencia").show();
                }else{
                    if($("#leg_tip").val()=="001-0"|| $("#leg_tip").val()=="002-0" || $("#leg_tip").val()=="003-0"){

                        if($("#centro_estudio").val()!="" && $("#especialidad").val()!="" && $("#certificado").val()!=""
                            && $("#nro_titu").val()!="" && $("#nro_coleg").val()!="" && $("#leg_exp").val()!="" && $("#pais_est").val()!="0"){

                            if(isNaN($("#nro_titu").val())){
                                $("#fam-advertencia").removeClass("alert-success");
                                $("#fam-advertencia").removeClass("alert-danger");
                                $("#fam-advertencia").addClass("alert-warning");
                                $("#fam-advertencia").html("<strong>El Número de Titulación no debe tener Caracteres</strong>");
                                $("#fam-advertencia").show();
                            }
                            else{
                                if(isNaN($("#nro_coleg").val())){
                                    $("#fam-advertencia").removeClass("alert-success");
                                    $("#fam-advertencia").removeClass("alert-danger");
                                    $("#fam-advertencia").addClass("alert-warning");
                                    $("#fam-advertencia").html("<strong>El Número de Colegiatura no debe tener Caracteres</strong>");
                                    $("#fam-advertencia").show();
                                }
                                else{
                                    if($('#optionsRadios1').is(':checked')){
                                        if($('#legaj_nac').val()!="" &&  $("#legaj_fin").val()!=""){
                                            var diaI=parseInt($("#legaj_nac").val().substring(0,2));
                                            var mesI=parseInt($("#legaj_nac").val().substring(3,5));
                                            var anioI=parseInt($("#legaj_nac").val().substring(6,10));
                                            var fechaInicio=365*anioI+30*mesI+diaI;

                                            var diaF=parseInt($("#legaj_fin").val().substring(0,2));
                                            var mesF=parseInt($("#legaj_fin").val().substring(3,5));
                                            var anioF=parseInt($("#legaj_fin").val().substring(6,10));
                                            var fechaFin=365*anioF+30*mesF+diaF;

                                            if(fechaFin>fechaInicio){
                                                this.cargar=0;
                                                var tipoyxhoras=$("#leg_tip").val();


                                                if(this.xfecha_xduracion==0){
                                                    this.duracion="-";
                                                }

                                                if(this.xfecha_xduracion==1){
                                                    $('#legaj_nac').val("");
                                                    $("#legaj_fin").val("");
                                                    this.duracion=$('#anio').val()+"-"+$('#mes').val()+"-"+$('#dia').val();
                                                }

                                                self.espec= $("#especialidad").val();
                                                self.nro_tit= $("#nro_titu").val();
                                                self.fecha_exp=$("#leg_exp").val();
                                                self.certif=$("#certificado").val();
                                                self.nro_coleg=$("#nro_coleg").val();
                                                self.nvl_alcanz=$("#niv_est").val();
                                                self.horas=0;


                                                this.model.get("updateestudio").set({
                                                    "id":this.id,
                                                    "tipCod": this.tipo,
                                                    "f_inicio":$('#legaj_nac').val(),
                                                    "f_fin":$('#legaj_fin').val(),
                                                    "centro_estudio": $("#centro_estudio").val(),
                                                    "duracion": this.duracion,
                                                    "especialidad": self.espec,
                                                    "nro_titulacion":self.nro_tit,
                                                    "fecha_expedicion":self.fecha_exp,
                                                    "codpais":$("#pais_est").val(),
                                                    "nro_colegiatura":self.nro_coleg,
                                                    "certificado": self.certif,
                                                    "horas": self.horas,
                                                    "niveldescripcion":self.nvl_alcanz
                                                });
                                                this.model.get("updateestudio").url = "api/legajos/updateEstudio";

                                                var self_s=this.model.get("updateestudio").save({}, {wait: true});

                                                self_s.fail(function () {

                                                    self.tableEstudioView.fetchEstudios(self.codigo,
                                                        function () {
                                                            $("#table-estudios-servidor").dataTable();
                                                            $('#table-estudios-servidor_wrapper').append("<div id='footer-table'></div>");
                                                            $('#table-estudios-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                            $('#table-estudios-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                            $('.dataTables_filter input').attr('placeholder','Buscar..');

                                                            $("#centro_estudio").val("");
                                                            $("#especialidad").val("");
                                                            $("#certificado").val("");
                                                            $("#nro_titu").val("");
                                                            $("#nro_coleg").val("");
                                                            $("#leg_exp").val("");
                                                            $("#legaj_nac").val("");
                                                            $("#legaj_fin").val("");
                                                            $("#anio").val("");
                                                            $("#mes").val("");
                                                            $("#dia").val("");
                                                            $("#pais_est").val("0").trigger('change');
                                                            $("#leg_tip").val("000").trigger('change');
                                                            $("#optionsRadios1").prop("checked", true).trigger('click');


                                                            $("#leg_tip").prop('disabled', false);

                                                            $("#form_update").hide();
                                                            $("#form_insert").show();
                                                        });
                                                    self.tablaEstudios.show(self.tableEstudioView);

                                                });
                                                $("#fam-advertencia").removeClass("alert-warning");
                                                $("#fam-advertencia").removeClass("alert-danger");
                                                $("#fam-advertencia").addClass("alert-success");
                                                $("#fam-advertencia").html("<strong>Se actualizo con éxito los Datos de Estudio</strong>");
                                                $("#fam-advertencia").show();
                                            }
                                            else{
                                                $("#fam-advertencia").removeClass("alert-success");
                                                $("#fam-advertencia").removeClass("alert-danger");
                                                $("#fam-advertencia").addClass("alert-warning");
                                                $("#fam-advertencia").html("<strong>La Fecha de Inicio no debe ser mayor o igual a la Fecha Fin</strong>");
                                                $("#fam-advertencia").show();
                                            }
                                        }
                                        else{
                                            $("#fam-advertencia").removeClass("alert-success");
                                            $("#fam-advertencia").removeClass("alert-danger");
                                            $("#fam-advertencia").addClass("alert-warning");
                                            $("#fam-advertencia").html("<strong>Ingrese Fecha de Estudio</strong>");
                                            $("#fam-advertencia").show();
                                        }
                                    }
                                    if($("#optionsRadios2").is(':checked')){
                                        if($("#anio").val()!="" && $("#mes").val()!="" && $("#dia").val()!=""){
                                            if(isNaN($("#anio").val()) || isNaN($("#mes").val()) || isNaN($("#dia").val())){
                                                $("#fam-advertencia").removeClass("alert-success");
                                                $("#fam-advertencia").removeClass("alert-danger");
                                                $("#fam-advertencia").addClass("alert-warning");
                                                $("#fam-advertencia").html("<strong>El Tiempo de Duración de Estudio no debe tener Caracteres</strong>");
                                                $("#fam-advertencia").show();
                                            } else{
                                                this.cargar=0;
                                                var tipoyxhoras=$("#leg_tip").val();


                                                if(this.xfecha_xduracion==0){
                                                    this.duracion="-";
                                                }

                                                if(this.xfecha_xduracion==1){
                                                    $('#legaj_nac').val("");
                                                    $("#legaj_fin").val("");
                                                    this.duracion=$('#anio').val()+"-"+$('#mes').val()+"-"+$('#dia').val();
                                                }

                                                self.espec= $("#especialidad").val();
                                                self.nro_tit= $("#nro_titu").val();
                                                self.fecha_exp=$("#leg_exp").val();
                                                self.certif=$("#certificado").val();
                                                self.nro_coleg=$("#nro_coleg").val();
                                                self.nvl_alcanz=$("#niv_est").val();
                                                self.horas=0;


                                                this.model.get("updateestudio").set({
                                                    "id":this.id,
                                                    "tipCod": this.tipo,
                                                    "f_inicio":$('#legaj_nac').val(),
                                                    "f_fin":$('#legaj_fin').val(),
                                                    "centro_estudio": $("#centro_estudio").val(),
                                                    "duracion": this.duracion,
                                                    "especialidad": self.espec,
                                                    "nro_titulacion":self.nro_tit,
                                                    "fecha_expedicion":self.fecha_exp,
                                                    "codpais":$("#pais_est").val(),
                                                    "nro_colegiatura":self.nro_coleg,
                                                    "certificado": self.certif,
                                                    "horas": self.horas,
                                                    "niveldescripcion":self.nvl_alcanz
                                                });
                                                this.model.get("updateestudio").url = "api/legajos/updateEstudio";

                                                var self_s=this.model.get("updateestudio").save({}, {wait: true});

                                                self_s.fail(function () {

                                                    self.tableEstudioView.fetchEstudios(self.codigo,
                                                        function () {
                                                            $("#table-estudios-servidor").dataTable();
                                                            $('#table-estudios-servidor_wrapper').append("<div id='footer-table'></div>");
                                                            $('#table-estudios-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                            $('#table-estudios-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                            $('.dataTables_filter input').attr('placeholder','Buscar..');

                                                            $("#centro_estudio").val("");
                                                            $("#especialidad").val("");
                                                            $("#certificado").val("");
                                                            $("#nro_titu").val("");
                                                            $("#nro_coleg").val("");
                                                            $("#leg_exp").val("");
                                                            $("#legaj_nac").val("");
                                                            $("#legaj_fin").val("");
                                                            $("#anio").val("");
                                                            $("#mes").val("");
                                                            $("#dia").val("");
                                                            $("#pais_est").val("0").trigger('change');
                                                            $("#leg_tip").val("000").trigger('change');
                                                            $("#optionsRadios1").prop("checked", true).trigger('click');

                                                            $("#leg_tip").prop('disabled', false);

                                                            $("#form_update").hide();
                                                            $("#form_insert").show();
                                                        });
                                                    self.tablaEstudios.show(self.tableEstudioView);

                                                });
                                                $("#fam-advertencia").removeClass("alert-warning");
                                                $("#fam-advertencia").removeClass("alert-danger");
                                                $("#fam-advertencia").addClass("alert-success");
                                                $("#fam-advertencia").html("<strong>Se actualizo con éxito los Datos de Estudio</strong>");
                                                $("#fam-advertencia").show();

                                            }
                                        } else{
                                            $("#fam-advertencia").removeClass("alert-success");
                                            $("#fam-advertencia").removeClass("alert-danger");
                                            $("#fam-advertencia").addClass("alert-warning");
                                            $("#fam-advertencia").html("<strong>Ingrese Duración de Estudio</strong>");
                                            $("#fam-advertencia").show();
                                        }
                                    }
                                }


                            }

                        }else{
                            $("#fam-advertencia").removeClass("alert-success");
                            $("#fam-advertencia").removeClass("alert-danger");
                            $("#fam-advertencia").addClass("alert-warning");
                            $("#fam-advertencia").html("<strong>Campos Obligatorios Incompletos</strong>");
                            $("#fam-advertencia").show();
                        }

                    }
                    if($("#leg_tip").val()=="004-1" || $("#leg_tip").val()=="005-1" || $("#leg_tip").val()=="006-1"){
                        if($("#centro_estudio").val()!="" && $("#especialidad").val()!="" && $("#certificado").val()!=""
                            && $("#nro_titu").val()!="" && $("#horas").val()!="" && $("#leg_exp").val()!="" && $("#pais_est").val()!="0"){
                            if(isNaN($("#nro_titu").val())){
                                $("#fam-advertencia").removeClass("alert-success");
                                $("#fam-advertencia").removeClass("alert-danger");
                                $("#fam-advertencia").addClass("alert-warning");
                                $("#fam-advertencia").html("<strong>El Número de Titulación no debe tener Caracteres</strong>");
                                $("#fam-advertencia").show();
                            }else{
                                if(isNaN($("#horas").val())){
                                    $("#fam-advertencia").removeClass("alert-success");
                                    $("#fam-advertencia").removeClass("alert-danger");
                                    $("#fam-advertencia").addClass("alert-warning");
                                    $("#fam-advertencia").html("<strong>El Número de Horas no debe tener Caracteres</strong>");
                                    $("#fam-advertencia").show();
                                }else{

                                    if($('#optionsRadios1').is(':checked')){
                                        if($('#legaj_nac').val()!="" &&  $("#legaj_fin").val()!=""){
                                            var diaI=parseInt($("#legaj_nac").val().substring(0,2));
                                            var mesI=parseInt($("#legaj_nac").val().substring(3,5));
                                            var anioI=parseInt($("#legaj_nac").val().substring(6,10));
                                            var fechaInicio=365*anioI+30*mesI+diaI;

                                            var diaF=parseInt($("#legaj_fin").val().substring(0,2));
                                            var mesF=parseInt($("#legaj_fin").val().substring(3,5));
                                            var anioF=parseInt($("#legaj_fin").val().substring(6,10));
                                            var fechaFin=365*anioF+30*mesF+diaF;

                                            if(fechaFin>fechaInicio){
                                                this.cargar=0;
                                                var tipoyxhoras=$("#leg_tip").val();



                                                if(this.xfecha_xduracion==0){
                                                    this.duracion="-";
                                                }

                                                if(this.xfecha_xduracion==1){
                                                    $('#legaj_nac').val("");
                                                    $("#legaj_fin").val("");
                                                    this.duracion=$('#anio').val()+"-"+$('#mes').val()+"-"+$('#dia').val();
                                                }
                                                self.espec= $("#especialidad").val();
                                                self.nro_tit= $("#nro_titu").val();
                                                self.fecha_exp=$("#leg_exp").val();
                                                self.certif=$("#certificado").val();
                                                self.nro_coleg="-";
                                                self.nvl_alcanz="-";
                                                self.horas=parseInt($('#horas').val());

                                                this.model.get("updateestudio").set({
                                                    "id":this.id,
                                                    "tipCod": this.tipo,
                                                    "f_inicio":$('#legaj_nac').val(),
                                                    "f_fin":$('#legaj_fin').val(),
                                                    "centro_estudio": $("#centro_estudio").val(),
                                                    "duracion": this.duracion,
                                                    "especialidad": self.espec,
                                                    "nro_titulacion":self.nro_tit,
                                                    "fecha_expedicion":self.fecha_exp,
                                                    "codpais":$("#pais_est").val(),
                                                    "nro_colegiatura":self.nro_coleg,
                                                    "certificado": self.certif,
                                                    "horas": self.horas,
                                                    "niveldescripcion":self.nvl_alcanz
                                                });
                                                this.model.get("updateestudio").url = "api/legajos/updateEstudio";

                                                var self_s=this.model.get("updateestudio").save({}, {wait: true});

                                                self_s.fail(function () {

                                                    self.tableEstudioView.fetchEstudios(self.codigo,
                                                        function () {
                                                            $("#table-estudios-servidor").dataTable();
                                                            $('#table-estudios-servidor_wrapper').append("<div id='footer-table'></div>");
                                                            $('#table-estudios-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                            $('#table-estudios-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                            $('.dataTables_filter input').attr('placeholder','Buscar..');

                                                            $("#centro_estudio").val("");
                                                            $("#especialidad").val("");
                                                            $("#certificado").val("");
                                                            $("#nro_titu").val("");
                                                            $("#nro_coleg").val("");
                                                            $("#leg_exp").val("");
                                                            $("#legaj_nac").val("");
                                                            $("#legaj_fin").val("");
                                                            $("#anio").val("");
                                                            $("#mes").val("");
                                                            $("#dia").val("");
                                                            $("#pais_est").val("0").trigger('change');
                                                            $("#leg_tip").val("000").trigger('change');
                                                            $("#optionsRadios1").prop("checked", true).trigger('click');

                                                            $("#leg_tip").prop('disabled', false);
                                                            $("#form_update").hide();
                                                            $("#form_insert").show();
                                                        });
                                                    self.tablaEstudios.show(self.tableEstudioView);


                                                });
                                                $("#fam-advertencia").removeClass("alert-warning");
                                                $("#fam-advertencia").removeClass("alert-danger");
                                                $("#fam-advertencia").addClass("alert-success");
                                                $("#fam-advertencia").html("<strong>Se actualizo con éxito los Datos de Estudio</strong>");
                                                $("#fam-advertencia").show();
                                            }else{
                                                $("#fam-advertencia").removeClass("alert-success");
                                                $("#fam-advertencia").removeClass("alert-danger");
                                                $("#fam-advertencia").addClass("alert-warning");
                                                $("#fam-advertencia").html("<strong>La Fecha de Inicio no debe ser mayor o igual a la Fecha Fin</strong>");
                                                $("#fam-advertencia").show();
                                            }


                                        }else{
                                            $("#fam-advertencia").removeClass("alert-success");
                                            $("#fam-advertencia").removeClass("alert-danger");
                                            $("#fam-advertencia").addClass("alert-warning");
                                            $("#fam-advertencia").html("<strong>Ingrese Fecha de Estudio</strong>");
                                            $("#fam-advertencia").show();
                                        }
                                    }
                                    if($("#optionsRadios2").is(':checked')){
                                        if($("#anio").val()!="" && $("#mes").val()!="" && $("#dia").val()!=""){
                                            if(isNaN($("#anio").val()) || isNaN($("#mes").val()) || isNaN($("#dia").val())){
                                                $("#fam-advertencia").removeClass("alert-success");
                                                $("#fam-advertencia").removeClass("alert-danger");
                                                $("#fam-advertencia").addClass("alert-warning");
                                                $("#fam-advertencia").html("<strong>El Tiempo de Duración de Estudio no debe tener Caracteres</strong>");
                                                $("#fam-advertencia").show();
                                            }
                                            else{
                                                this.cargar=0;
                                                var tipoyxhoras=$("#leg_tip").val();



                                                if(this.xfecha_xduracion==0){
                                                    this.duracion="-";
                                                }

                                                if(this.xfecha_xduracion==1){
                                                    $('#legaj_nac').val("");
                                                    $("#legaj_fin").val("");
                                                    this.duracion=$('#anio').val()+"-"+$('#mes').val()+"-"+$('#dia').val();
                                                }
                                                self.espec= $("#especialidad").val();
                                                self.nro_tit= $("#nro_titu").val();
                                                self.fecha_exp=$("#leg_exp").val();
                                                self.certif=$("#certificado").val();
                                                self.nro_coleg="-";
                                                self.nvl_alcanz="-";
                                                self.horas=parseInt($('#horas').val());

                                                this.model.get("updateestudio").set({
                                                    "id":this.id,
                                                    "tipCod": this.tipo,
                                                    "f_inicio":$('#legaj_nac').val(),
                                                    "f_fin":$('#legaj_fin').val(),
                                                    "centro_estudio": $("#centro_estudio").val(),
                                                    "duracion": this.duracion,
                                                    "especialidad": self.espec,
                                                    "nro_titulacion":self.nro_tit,
                                                    "fecha_expedicion":self.fecha_exp,
                                                    "codpais":$("#pais_est").val(),
                                                    "nro_colegiatura":self.nro_coleg,
                                                    "certificado": self.certif,
                                                    "horas": self.horas,
                                                    "niveldescripcion":self.nvl_alcanz
                                                });
                                                this.model.get("updateestudio").url = "api/legajos/updateEstudio";

                                                var self_s=this.model.get("updateestudio").save({}, {wait: true});

                                                self_s.fail(function () {

                                                    self.tableEstudioView.fetchEstudios(self.codigo,
                                                        function () {
                                                            $("#table-estudios-servidor").dataTable();
                                                            $('#table-estudios-servidor_wrapper').append("<div id='footer-table'></div>");
                                                            $('#table-estudios-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                            $('#table-estudios-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                            $('.dataTables_filter input').attr('placeholder','Buscar..');

                                                            $("#centro_estudio").val("");
                                                            $("#especialidad").val("");
                                                            $("#certificado").val("");
                                                            $("#nro_titu").val("");
                                                            $("#nro_coleg").val("");
                                                            $("#leg_exp").val("");
                                                            $("#legaj_nac").val("");
                                                            $("#legaj_fin").val("");
                                                            $("#anio").val("");
                                                            $("#mes").val("");
                                                            $("#dia").val("");
                                                            $("#pais_est").val("0").trigger('change');
                                                            $("#leg_tip").val("000").trigger('change');
                                                            $("#optionsRadios1").prop("checked", true).trigger('click');

                                                            $("#leg_tip").prop('disabled', false);
                                                            $("#form_update").hide();
                                                            $("#form_insert").show();
                                                        });
                                                    self.tablaEstudios.show(self.tableEstudioView);


                                                });
                                                $("#fam-advertencia").removeClass("alert-warning");
                                                $("#fam-advertencia").removeClass("alert-danger");
                                                $("#fam-advertencia").addClass("alert-success");
                                                $("#fam-advertencia").html("<strong>Se actualizo con éxito los Datos de Estudio</strong>");
                                                $("#fam-advertencia").show();
                                            }
                                        }else{
                                            $("#fam-advertencia").removeClass("alert-success");
                                            $("#fam-advertencia").removeClass("alert-danger");
                                            $("#fam-advertencia").addClass("alert-warning");
                                            $("#fam-advertencia").html("<strong>Ingrese Duración de Estudio</strong>");
                                            $("#fam-advertencia").show();
                                        }
                                    }
                                }
                            }
                        } else{
                            $("#fam-advertencia").removeClass("alert-success");
                            $("#fam-advertencia").removeClass("alert-danger");
                            $("#fam-advertencia").addClass("alert-warning");
                            $("#fam-advertencia").html("<strong>Campos Obligatorios Incompletos</strong>");
                            $("#fam-advertencia").show();
                        }
                    }
                    if($("#leg_tip").val()=="007-0"){
                        if($("#centro_estudio").val()!="" && $("#certificado").val()!="" && $("#nro_titu").val()!="" && $("#leg_exp").val()!=""
                            && $("#pais_est").val()!="0" && $("#idio_est").val()!="00"){
                            if(isNaN($("#nro_titu").val())){


                                $("#fam-advertencia").removeClass("alert-success");
                                $("#fam-advertencia").removeClass("alert-danger");
                                $("#fam-advertencia").addClass("alert-warning");
                                $("#fam-advertencia").html("<strong>El Número de Titulación no debe tener Caracteres</strong>");
                                $("#fam-advertencia").show();
                            }
                            else{
                                if($("#optionsRadios1").is(':checked')){

                                    if($('#legaj_nac').val()!="" &&  $("#legaj_fin").val()!=""){
                                        var diaI=parseInt($("#legaj_nac").val().substring(0,2));
                                        var mesI=parseInt($("#legaj_nac").val().substring(3,5));
                                        var anioI=parseInt($("#legaj_nac").val().substring(6,10));
                                        var fechaInicio=365*anioI+30*mesI+diaI;

                                        var diaF=parseInt($("#legaj_fin").val().substring(0,2));
                                        var mesF=parseInt($("#legaj_fin").val().substring(3,5));
                                        var anioF=parseInt($("#legaj_fin").val().substring(6,10));
                                        var fechaFin=365*anioF+30*mesF+diaF;

                                        if(fechaFin>fechaInicio){
                                            this.cargar=0;
                                            var tipoyxhoras=$("#leg_tip").val();
                                            var tipo=tipoyxhoras.substr(0,3);


                                            if(this.xfecha_xduracion==0){
                                                this.duracion="-";
                                            };

                                            if(this.xfecha_xduracion==1){
                                                $('#legaj_nac').val("");
                                                $("#legaj_fin").val("");
                                                this.duracion=$('#anio').val()+"-"+$('#mes').val()+"-"+$('#dia').val();
                                            };

                                            self.espec= $("#idio_est").val();
                                            self.nro_tit= $("#nro_titu").val();
                                            self.fecha_exp=$("#leg_exp").val();
                                            self.certif=$("#certificado").val();
                                            self.nro_coleg="-";
                                            self.nvl_alcanz=$("#niv_est").val();
                                            self.horas=0;

                                            this.model.get("updateestudio").set({
                                                "id":this.id,
                                                "tipCod": this.tipo,
                                                "f_inicio":$('#legaj_nac').val(),
                                                "f_fin":$('#legaj_fin').val(),
                                                "centro_estudio": $("#centro_estudio").val(),
                                                "duracion": this.duracion,
                                                "especialidad": self.espec,
                                                "nro_titulacion":self.nro_tit,
                                                "fecha_expedicion":self.fecha_exp,
                                                "codpais":$("#pais_est").val(),
                                                "nro_colegiatura":self.nro_coleg,
                                                "certificado": self.certif,
                                                "horas": self.horas,
                                                "niveldescripcion":self.nvl_alcanz
                                            });
                                            this.model.get("updateestudio").url = "api/legajos/updateEstudio";

                                            var self_s=this.model.get("updateestudio").save({}, {wait: true});

                                            self_s.fail(function () {

                                                self.tableEstudioView.fetchEstudios(self.codigo,
                                                    function () {
                                                        $("#table-estudios-servidor").dataTable();
                                                        $('#table-estudios-servidor_wrapper').append("<div id='footer-table'></div>");
                                                        $('#table-estudios-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                        $('#table-estudios-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                        $('.dataTables_filter input').attr('placeholder','Buscar..');

                                                        $("#centro_estudio").val("");
                                                        $("#especialidad").val("");
                                                        $("#certificado").val("");
                                                        $("#nro_titu").val("");
                                                        $("#nro_coleg").val("");
                                                        $("#leg_exp").val("");
                                                        $("#legaj_nac").val("");
                                                        $("#legaj_fin").val("");
                                                        $("#anio").val("");
                                                        $("#mes").val("");
                                                        $("#dia").val("");
                                                        $("#pais_est").val("0").trigger('change');
                                                        $("#leg_tip").val("000").trigger('change');
                                                        $("#optionsRadios1").prop("checked", true).trigger('click');
                                                        $("#leg_tip").prop('disabled', false);
                                                        $("#form_update").hide();
                                                        $("#form_insert").show();
                                                    });
                                                self.tablaEstudios.show(self.tableEstudioView);

                                            });
                                            $("#fam-advertencia").removeClass("alert-warning");
                                            $("#fam-advertencia").removeClass("alert-danger");
                                            $("#fam-advertencia").addClass("alert-success");
                                            $("#fam-advertencia").html("<strong>Se actualizo con éxito los Datos de Estudio</strong>");
                                            $("#fam-advertencia").show();
                                        }else{
                                            $("#fam-advertencia").removeClass("alert-success");
                                            $("#fam-advertencia").removeClass("alert-danger");
                                            $("#fam-advertencia").addClass("alert-warning");
                                            $("#fam-advertencia").html("<strong>La Fecha de Inicio no debe ser mayor o igual a la Fecha Fin</strong>");
                                            $("#fam-advertencia").show();
                                        }
                                    }else{
                                        $("#fam-advertencia").removeClass("alert-success");
                                        $("#fam-advertencia").removeClass("alert-danger");
                                        $("#fam-advertencia").addClass("alert-warning");
                                        $("#fam-advertencia").html("<strong>Ingrese Fecha de Estudio</strong>");
                                        $("#fam-advertencia").show();
                                    }
                                }
                                if($("#optionsRadios2").is(':checked')){
                                    if($("#anio").val()!="" && $("#mes").val()!="" && $("#dia").val()!=""){
                                        if(isNaN($("#anio").val()) || isNaN($("#mes").val()) || isNaN($("#dia").val())){
                                            $("#fam-advertencia").removeClass("alert-success");
                                            $("#fam-advertencia").removeClass("alert-danger");
                                            $("#fam-advertencia").addClass("alert-warning");
                                            $("#fam-advertencia").html("<strong>El Tiempo de Duración de Estudio no debe tener Caracteres</strong>");
                                            $("#fam-advertencia").show();
                                        }else{
                                            this.cargar=0;
                                            var tipoyxhoras=$("#leg_tip").val();
                                            var tipo=tipoyxhoras.substr(0,3);


                                            if(this.xfecha_xduracion==0){
                                                this.duracion="-";
                                            }

                                            if(this.xfecha_xduracion==1){
                                                $('#legaj_nac').val("");
                                                $("#legaj_fin").val("");
                                                this.duracion=$('#anio').val()+"-"+$('#mes').val()+"-"+$('#dia').val();
                                            }
                                            self.espec= $("#idio_est").val();
                                            self.nro_tit= $("#nro_titu").val();
                                            self.fecha_exp=$("#leg_exp").val();
                                            self.certif=$("#certificado").val();
                                            self.nro_coleg="-";
                                            self.nvl_alcanz=$("#niv_est").val();
                                            self.horas=0;

                                            this.model.get("updateestudio").set({
                                                "id":this.id,
                                                "tipCod": this.tipo,
                                                "f_inicio":$('#legaj_nac').val(),
                                                "f_fin":$('#legaj_fin').val(),
                                                "centro_estudio": $("#centro_estudio").val(),
                                                "duracion": this.duracion,
                                                "especialidad": self.espec,
                                                "nro_titulacion":self.nro_tit,
                                                "fecha_expedicion":self.fecha_exp,
                                                "codpais":$("#pais_est").val(),
                                                "nro_colegiatura":self.nro_coleg,
                                                "certificado": self.certif,
                                                "horas": self.horas,
                                                "niveldescripcion":self.nvl_alcanz
                                            });
                                            this.model.get("updateestudio").url = "api/legajos/updateEstudio";

                                            var self_s=this.model.get("updateestudio").save({}, {wait: true});

                                            self_s.fail(function () {

                                                self.tableEstudioView.fetchEstudios(self.codigo,
                                                    function () {
                                                        $("#table-estudios-servidor").dataTable();
                                                        $('#table-estudios-servidor_wrapper').append("<div id='footer-table'></div>");
                                                        $('#table-estudios-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                        $('#table-estudios-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                        $('.dataTables_filter input').attr('placeholder','Buscar..');

                                                        $("#centro_estudio").val("");
                                                        $("#especialidad").val("");
                                                        $("#certificado").val("");
                                                        $("#nro_titu").val("");
                                                        $("#nro_coleg").val("");
                                                        $("#leg_exp").val("");
                                                        $("#legaj_nac").val("");
                                                        $("#legaj_fin").val("");
                                                        $("#anio").val("");
                                                        $("#mes").val("");
                                                        $("#dia").val("");
                                                        $("#pais_est").val("0").trigger('change');
                                                        $("#leg_tip").val("000").trigger('change');
                                                        $("#optionsRadios1").prop("checked", true).trigger('click');
                                                        $("#leg_tip").prop('disabled', false);
                                                        $("#form_update").hide();
                                                        $("#form_insert").show();
                                                    });
                                                self.tablaEstudios.show(self.tableEstudioView);

                                            });
                                            $("#fam-advertencia").removeClass("alert-warning");
                                            $("#fam-advertencia").removeClass("alert-danger");
                                            $("#fam-advertencia").addClass("alert-success");
                                            $("#fam-advertencia").html("<strong>Se registro con éxito los Datos de Estudio</strong>");
                                            $("#fam-advertencia").show();
                                        }
                                    }else{
                                        $("#fam-advertencia").removeClass("alert-success");
                                        $("#fam-advertencia").removeClass("alert-danger");
                                        $("#fam-advertencia").addClass("alert-warning");
                                        $("#fam-advertencia").html("<strong>Ingrese Duración de Estudio</strong>");
                                        $("#fam-advertencia").show();
                                    }
                                }

                            }
                        }else{
                            $("#fam-advertencia").removeClass("alert-success");
                            $("#fam-advertencia").removeClass("alert-danger");
                            $("#fam-advertencia").addClass("alert-warning");
                            $("#fam-advertencia").html("<strong>Campos Obligatorios Incompletos</strong>");
                            $("#fam-advertencia").show();
                        }
                    }
                    if($("#leg_tip").val()=="008-0" || $("#leg_tip").val()=="009-0"){
                        if($("#centro_estudio").val()!="" && $("#pais_est").val()!="0"){
                            if($("#optionsRadios1").is(':checked')){
                                if($('#legaj_nac').val()!="" &&  $("#legaj_fin").val()!=""){
                                    this.cargar=0;
                                    var tipoyxhoras=$("#leg_tip").val();
                                    var tipo=tipoyxhoras.substr(0,3);


                                    if(this.xfecha_xduracion==0){
                                        this.duracion="-";
                                    }

                                    if(this.xfecha_xduracion==1){
                                        $('#legaj_nac').val("");
                                        $("#legaj_fin").val("");
                                        this.duracion=$('#anio').val()+"-"+$('#mes').val()+"-"+$('#dia').val();
                                    }

                                    self.espec="-";
                                    self.nro_tit="-";
                                    self.fecha_exp=$("#leg_exp").val();
                                    self.certif="-";
                                    self.nro_coleg="-";
                                    self.nvl_alcanz=$("#niv_est").val();
                                    self.horas=0;

                                    this.model.get("updateestudio").set({
                                        "id":this.id,
                                        "tipCod": this.tipo,
                                        "f_inicio":$('#legaj_nac').val(),
                                        "f_fin":$('#legaj_fin').val(),
                                        "centro_estudio": $("#centro_estudio").val(),
                                        "duracion": this.duracion,
                                        "especialidad": self.espec,
                                        "nro_titulacion":self.nro_tit,
                                        "fecha_expedicion":self.fecha_exp,
                                        "codpais":$("#pais_est").val(),
                                        "nro_colegiatura":self.nro_coleg,
                                        "certificado": self.certif,
                                        "horas": self.horas,
                                        "niveldescripcion":self.nvl_alcanz
                                    });
                                    this.model.get("updateestudio").url = "api/legajos/updateEstudio";

                                    var self_s=this.model.get("updateestudio").save({}, {wait: true});

                                    self_s.fail(function () {

                                        self.tableEstudioView.fetchEstudios(self.codigo,
                                            function () {
                                                $("#table-estudios-servidor").dataTable();
                                                $('#table-estudios-servidor_wrapper').append("<div id='footer-table'></div>");
                                                $('#table-estudios-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                $('#table-estudios-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                $('.dataTables_filter input').attr('placeholder','Buscar..');

                                                $("#centro_estudio").val("");
                                                $("#especialidad").val("");
                                                $("#certificado").val("");
                                                $("#nro_titu").val("");
                                                $("#nro_coleg").val("");
                                                $("#leg_exp").val("");
                                                $("#legaj_nac").val("");
                                                $("#legaj_fin").val("");
                                                $("#anio").val("");
                                                $("#mes").val("");
                                                $("#dia").val("");
                                                $("#pais_est").val("0").trigger('change');
                                                $("#leg_tip").val("000").trigger('change');
                                                $("#optionsRadios1").prop("checked", true).trigger('click');
                                                $("#leg_tip").prop('disabled', false);
                                                $("#form_update").hide();
                                                $("#form_insert").show();
                                            });
                                        self.tablaEstudios.show(self.tableEstudioView);

                                    });
                                    $("#fam-advertencia").removeClass("alert-warning");
                                    $("#fam-advertencia").removeClass("alert-danger");
                                    $("#fam-advertencia").addClass("alert-success");
                                    $("#fam-advertencia").html("<strong>Se actualizo con éxito los Datos de Estudio</strong>");
                                    $("#fam-advertencia").show();

                                }else{
                                    $("#fam-advertencia").removeClass("alert-success");
                                    $("#fam-advertencia").removeClass("alert-danger");
                                    $("#fam-advertencia").addClass("alert-warning");
                                    $("#fam-advertencia").html("<strong>Ingrese Fecha de Estudio</strong>");
                                    $("#fam-advertencia").show();
                                }
                            }
                            if($("#optionsRadios2").is(':checked')){
                                if($("#anio").val()!="" && $("#mes").val()!="" && $("#dia").val()!=""){
                                    if(isNaN($("#anio").val()) || isNaN($("#mes").val()) || isNaN($("#dia").val())){
                                        $("#fam-advertencia").removeClass("alert-success");
                                        $("#fam-advertencia").removeClass("alert-danger");
                                        $("#fam-advertencia").addClass("alert-warning");
                                        $("#fam-advertencia").html("<strong>El Tiempo de Duración de Estudio no debe tener Caracteres</strong>");
                                        $("#fam-advertencia").show();
                                    }
                                    else{
                                        this.cargar=0;
                                        var tipoyxhoras=$("#leg_tip").val();
                                        var tipo=tipoyxhoras.substr(0,3);


                                        if(this.xfecha_xduracion==0){
                                            this.duracion="-";
                                        };

                                        if(this.xfecha_xduracion==1){
                                            $('#legaj_nac').val("");
                                            $("#legaj_fin").val("");
                                            this.duracion=$('#anio').val()+"-"+$('#mes').val()+"-"+$('#dia').val();
                                        };

                                        self.espec="-";
                                        self.nro_tit="-";
                                        self.fecha_exp=$("#leg_exp").val();
                                        self.certif="-";
                                        self.nro_coleg="-";
                                        self.nvl_alcanz=$("#niv_est").val();
                                        self.horas=0;

                                        this.model.get("updateestudio").set({
                                            "id":this.id,
                                            "tipCod": this.tipo,
                                            "f_inicio":$('#legaj_nac').val(),
                                            "f_fin":$('#legaj_fin').val(),
                                            "centro_estudio": $("#centro_estudio").val(),
                                            "duracion": this.duracion,
                                            "especialidad": self.espec,
                                            "nro_titulacion":self.nro_tit,
                                            "fecha_expedicion":self.fecha_exp,
                                            "codpais":$("#pais_est").val(),
                                            "nro_colegiatura":self.nro_coleg,
                                            "certificado": self.certif,
                                            "horas": self.horas,
                                            "niveldescripcion":self.nvl_alcanz
                                        });
                                        this.model.get("updateestudio").url = "api/legajos/updateEstudio";

                                        var self_s=this.model.get("updateestudio").save({}, {wait: true});

                                        self_s.fail(function () {

                                            self.tableEstudioView.fetchEstudios(self.codigo,
                                                function () {
                                                    $("#table-estudios-servidor").dataTable();
                                                    $('#table-estudios-servidor_wrapper').append("<div id='footer-table'></div>");
                                                    $('#table-estudios-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                    $('#table-estudios-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                    $('.dataTables_filter input').attr('placeholder','Buscar..');


                                                    $("#centro_estudio").val("");
                                                    $("#especialidad").val("");
                                                    $("#certificado").val("");
                                                    $("#nro_titu").val("");
                                                    $("#nro_coleg").val("");
                                                    $("#leg_exp").val("");
                                                    $("#legaj_nac").val("");
                                                    $("#legaj_fin").val("");
                                                    $("#anio").val("");
                                                    $("#mes").val("");
                                                    $("#dia").val("");
                                                    $("#pais_est").val("0").trigger('change');
                                                    $("#leg_tip").val("000").trigger('change');
                                                    $("#optionsRadios1").prop("checked", true).trigger('click');
                                                    $("#leg_tip").prop('disabled', false);
                                                    $("#form_update").hide();
                                                    $("#form_insert").show();
                                                });
                                            self.tablaEstudios.show(self.tableEstudioView);

                                        });
                                        $("#fam-advertencia").removeClass("alert-warning");
                                        $("#fam-advertencia").removeClass("alert-danger");
                                        $("#fam-advertencia").addClass("alert-success");
                                        $("#fam-advertencia").html("<strong>Se actualizo con éxito los Datos de Estudio</strong>");
                                        $("#fam-advertencia").show();

                                    }
                                }
                                else{
                                    $("#fam-advertencia").removeClass("alert-success");
                                    $("#fam-advertencia").removeClass("alert-danger");
                                    $("#fam-advertencia").addClass("alert-warning");
                                    $("#fam-advertencia").html("<strong>Ingrese Duración de Estudio</strong>");
                                    $("#fam-advertencia").show();
                                }
                            }
                        }else{
                            $("#fam-advertencia").removeClass("alert-success");
                            $("#fam-advertencia").removeClass("alert-danger");
                            $("#fam-advertencia").addClass("alert-warning");
                            $("#fam-advertencia").html("<strong>Campos Obligatorios Incompletos</strong>");
                            $("#fam-advertencia").show();
                        }
                    }
                }

            } ,

            agregarResolucion:function(){
                var self=this;
                var fullDate = new Date();
                var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) :(fullDate.getMonth() + 1);
                var twoDigitDay=((fullDate.getDate().length) === 1) ? (fullDate.getDate()) :(fullDate.getDate());
                if(twoDigitMonth<10){
                    twoDigitMonth="0"+twoDigitMonth;
                }
                if(twoDigitDay<10){
                    twoDigitDay="0"+twoDigitDay;
                }

                var currentDate = twoDigitDay + "/" + twoDigitMonth + "/" + fullDate.getFullYear();

                if($("#tipo_ts").val()!="0" || $("#tipo_rec").val()!="0"){
                    if($("#option_ts").is(':checked')){
                         if($("#f_ingreso").val()!="" && $("#resolucion").val()!="" && $("#fecha_resolt").val()!=""){
                              if(this.Comparar_Fecha(currentDate,$("#f_ingreso").val())){

                                  self.model.get("addresolucion").set({
                                      "res_tipo_cod": $("#tipo_ts").val(),
                                      "res_fecha": $("#f_ingreso").val(),
                                      "res_id":$("#resolucion").val(),
                                      "res_anio":0,
                                      "res_mes": 0,
                                      "res_dia": 0,
                                      "res_codser":self.codigo,
                                      "res_num_serest": self.num_ser_est
                                  });

                                  self.model.get("addresolucion").url = "api/legajos/addResolucion";
                                  var self_s=self.model.get("addresolucion").save({}, {wait: true});

                                  self_s.fail(function () {

                                      self.tableResolucionView.fetchResol(self.codigo,self.num_ser_est,
                                          function () {
                                              if(self.tableResolucionView.collection.length!=0){
                                                  $("#table-resoluciones-servidor").dataTable();
                                                  $('#table-resoluciones-servidor_wrapper').append("<div id='footer-table'></div>");
                                                  $('#table-resoluciones-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                  $('#table-resoluciones-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                  $('.dataTables_filter input').attr('placeholder','Buscar..');

                                                  $("#f_ingreso").val("");
                                                  $("#resolucion").val("");
                                                  $("#fecha_resolt").val("");
                                                  $("#tipo_ts").val("0").trigger('change');
                                              }
                                          });
                                      self.tablaResoluciones.show(self.tableResolucionView);


                                  });
                                  $("#fam-advertencia").removeClass("alert-warning");
                                  $("#fam-advertencia").removeClass("alert-danger");
                                  $("#fam-advertencia").addClass("alert-success");
                                  $("#fam-advertencia").html("<strong>Se registro con éxito el Tiempo de Servicio</strong>");
                                  $("#fam-advertencia").show();
                              }else{
                                  $("#fam-advertencia").removeClass("alert-success");
                                  $("#fam-advertencia").removeClass("alert-danger");
                                  $("#fam-advertencia").addClass("alert-warning");
                                  $("#fam-advertencia").html("<strong>La Fecha de Ingreso es mayor que la Fecha Actual</strong>");
                                  $("#fam-advertencia").show();
                              }

                         }else{
                             $("#fam-advertencia").removeClass("alert-success");
                             $("#fam-advertencia").removeClass("alert-danger");
                             $("#fam-advertencia").addClass("alert-warning");
                             $("#fam-advertencia").html("<strong>Campos Obligatorios Incompletos</strong>");
                             $("#fam-advertencia").show();


                         }
                    }
                    if($("#option_rts").is(':checked')){

                       if($("#f_recono").val()!="" && $("#resolucion_recono").val()!="" && $("#fecha_resolt_recono").val()!=""
                       && $("#fecha_resolt_anio").val()!="" && $("#fecha_resolt_mes").val()!="" && $("#fecha_resolt_dia").val()!=""){

                           if(isNaN($("#fecha_resolt_anio").val()) || isNaN($("#fecha_resolt_mes").val()) || isNaN($("#fecha_resolt_dia").val())){

                               $("#fam-advertencia").removeClass("alert-success");
                               $("#fam-advertencia").removeClass("alert-danger");
                               $("#fam-advertencia").addClass("alert-warning");
                               $("#fam-advertencia").html("<strong>El tiempo de Reconocimiento no debe tener caracteres</strong>");
                               $("#fam-advertencia").show();
                           }else{
                               if(this.Comparar_Fecha(currentDate,$("#f_recono").val())){
                                   self.model.get("addresolucion").set({
                                       "res_tipo_cod": $("#tipo_rec").val(),
                                       "res_fecha": $("#f_recono").val(),
                                       "res_id":$("#resolucion_recono").val(),
                                       "res_anio":$("#fecha_resolt_anio").val(),
                                       "res_mes": $("#fecha_resolt_mes").val(),
                                       "res_dia": $("#fecha_resolt_dia").val(),
                                       "res_codser":self.codigo,
                                       "res_num_serest": self.num_ser_est
                                   });


                                   self.model.get("addresolucion").url = "api/legajos/addResolucion";
                                   var self_s=self.model.get("addresolucion").save({}, {wait: true});

                                   self_s.fail(function () {

                                       self.tableResolucionView.fetchResol(self.codigo,self.num_ser_est,
                                           function () {
                                               if(self.tableResolucionView.collection.length!=0){
                                                   $("#table-resoluciones-servidor").dataTable();
                                                   $('#table-resoluciones-servidor_wrapper').append("<div id='footer-table'></div>");
                                                   $('#table-resoluciones-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                   $('#table-resoluciones-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                   $('.dataTables_filter input').attr('placeholder','Buscar..');

                                                   $("#f_recono").val("");
                                                   $("#resolucion_recono").val("");
                                                   $("#fecha_resolt_recono").val("");
                                                   $("#fecha_resolt_anio").val("");
                                                   $("#fecha_resolt_mes").val("");
                                                   $("#fecha_resolt_dia").val("");
                                                   $("#tipo_rec").val("0").trigger('change');
                                               }
                                           });
                                       self.tablaResoluciones.show(self.tableResolucionView);

                                   });
                                   $("#fam-advertencia").removeClass("alert-warning");
                                   $("#fam-advertencia").removeClass("alert-danger");
                                   $("#fam-advertencia").addClass("alert-success");
                                   $("#fam-advertencia").html("<strong>Se registro con éxito el Reconocimiento de Tiempo de Servicio</strong>");
                                   $("#fam-advertencia").show();
                               }else{
                                   $("#fam-advertencia").removeClass("alert-success");
                                   $("#fam-advertencia").removeClass("alert-danger");
                                   $("#fam-advertencia").addClass("alert-warning");
                                   $("#fam-advertencia").html("<strong>La Fecha de Reconocimiento es mayor que la Fecha Actual</strong>");
                                   $("#fam-advertencia").show();
                               }

                           }

                       } else{
                           $("#fam-advertencia").removeClass("alert-success");
                           $("#fam-advertencia").removeClass("alert-danger");
                           $("#fam-advertencia").addClass("alert-warning");
                           $("#fam-advertencia").html("<strong>Campos Obligatorios Incompletos</strong>");
                           $("#fam-advertencia").show();

                       }




                    }
                }else{
                    $("#fam-advertencia").removeClass("alert-success");
                    $("#fam-advertencia").removeClass("alert-danger");
                    $("#fam-advertencia").addClass("alert-warning");
                    $("#fam-advertencia").html("<strong>Seleccione Tipo</strong>");
                    $("#fam-advertencia").show();
                }

            },

            fun_del_tmp_serv: function(){
                var self = this;

                var url='api/legajos/deleteTiempoServicio/'+self.id_tyrs_delete;

                $.ajax({
                    type: 'DELETE',
                    url: url,
                    success: function(){

                        self.tableResolucionView.fetchResol(self.codigo,self.num_ser_est,
                            function () {
                                if(self.tableResolucionView.collection.length!=0){
                                    $("#table-resoluciones-servidor").dataTable();
                                    $('#table-resoluciones-servidor_wrapper').append("<div id='footer-table'></div>");
                                    $('#table-resoluciones-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                    $('#table-resoluciones-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                    $('.dataTables_filter input').attr('placeholder','Buscar..');
                                }
                            });
                        self.tablaResoluciones.show(self.tableResolucionView);

                    },
                    error: function(){

                        self.tableResolucionView.fetchResol(self.codigo,self.num_ser_est,
                            function () {
                                if(self.tableResolucionView.collection.length!=0){
                                    $("#table-resoluciones-servidor").dataTable();
                                    $('#table-resoluciones-servidor_wrapper').append("<div id='footer-table'></div>");
                                    $('#table-resoluciones-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                    $('#table-resoluciones-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                    $('.dataTables_filter input').attr('placeholder','Buscar..');
                                }
                            });
                        self.tablaResoluciones.show(self.tableResolucionView);

                    }
                });

            },

            fun_cargar_tmp_servicio:function(ev){

                $("#option_rts").prop("disabled",false);
                $("#option_ts").prop("disabled",false);
                var element = $(ev.currentTarget);
                this.id_tiempo_servicio=element.parent().parent().attr('id');
                var temporal=element.parent().parent().children(':nth-child(1)').attr('data');


                this.id_tiempo=element.parent().parent().children(':nth-child(1)').attr('data1');


                $('input:radio[name=tipos_servicio][value='+temporal+']').click();
                if(temporal=='001'){


                        this.tip_tmpo_serv_o_recon=temporal;


                       $("#option_rts").prop("disabled",true);



                       $("#tipo_ts").val(this.id_tiempo);

                       $("#tipo_ts").prop("disabled",true);
                        $('#form_insert_ts').hide();
                        $('#form_update_ts').show();
                        $("#resolucion").val(element.parent().parent().children(':nth-child(3)').text());
                        $("#fecha_resolt").val(element.parent().parent().children(':nth-child(3)').attr('data'));
                        $("#f_ingreso").val(element.parent().parent().children(':nth-child(2)').text());


                };
                if(temporal=='002'){





                        $("#option_ts").prop("disabled",true);
                        this.tip_tmpo_serv_o_recon=temporal;

                        $('#form_insert_rts').hide();
                        $('#form_update_rts').show();
                        $("#tipo_rec").val(this.id_tiempo);
                        $("#tipo_rec").prop("disabled",true);
                        $("#resolucion_recono").val(element.parent().parent().children(':nth-child(3)').text());
                        $("#fecha_resolt_recono").val(element.parent().parent().children(':nth-child(3)').attr('data'));
                        $("#f_recono").val(element.parent().parent().children(':nth-child(2)').text());
                        var recono_actual=element.parent().parent().children(':nth-child(4)').text();
                        var fecha=recono_actual.split("-");
                        $("#fecha_resolt_anio").val(fecha[0]);
                        $("#fecha_resolt_mes").val(fecha[1]);
                        $("#fecha_resolt_dia").val(fecha[2]);


                };
            },
            Comparar_Fecha: function (fecha, fecha2) {
                var xMonth = fecha.substring(3, 5);
                var xDay = fecha.substring(0, 2);
                var xYear = fecha.substring(6, 10);
                var yMonth = fecha2.substring(3, 5);
                var yDay = fecha2.substring(0, 2);
                var yYear = fecha2.substring(6, 10);
                if (xYear > yYear) {
                    return(true)
                }
                else {
                    if (xYear == yYear) {
                        if (xMonth > yMonth) {
                            return(true)
                        }
                        else {
                            if (xMonth == yMonth) {
                                if (xDay > yDay)
                                    return(true);
                                else
                                    return(false);
                            }
                            else
                                return(false);
                        }
                    }
                    else
                        return(false);
                }

            },

            update_resolucion:function(){

                var self=this;
                if($("#tipo_ts").val()!="0" || $("#tipo_rec").val()!="0"){
                    if($("#option_ts").is(':checked')){
                        if($("#f_ingreso").val()!="" && $("#resolucion").val()!="" && $("#fecha_resolt").val()!=""){

                            self.model.get("updateresolucion").set({
                                "res_seq_tmp_serv": self.id_tiempo_servicio,
                                "res_fecha": $("#f_ingreso").val(),
                                "res_id":$("#resolucion").val(),
                                "res_anio":0,
                                "res_mes": 0,
                                "res_dia": 0
                            });


                            this.model.get("updateresolucion").url = "api/legajos/updateResolucion";

                            var self_s=this.model.get("updateresolucion").save({}, {wait: true});

                            self_s.fail(function () {

                                self.tableResolucionView.fetchResol(self.codigo,self.num_ser_est,
                                    function () {
                                        if(self.tableResolucionView.collection.length!=0){
                                            $("#table-resoluciones-servidor").dataTable();
                                            $('#table-resoluciones-servidor_wrapper').append("<div id='footer-table'></div>");
                                            $('#table-resoluciones-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                            $('#table-resoluciones-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                            $('.dataTables_filter input').attr('placeholder','Buscar..');

                                            $("#option_ts").prop("disabled",false);
                                            $("#tipo_ts").prop("disabled",false);
                                            $("#tipo_rec").prop("disabled",false);
                                            $("#option_rts").prop("disabled",false);
                                            $("#f_ingreso").val("");
                                            $("#resolucion").val("");
                                            $("#fecha_resolt").val("");
                                            $("#option_ts").prop("checked", true).trigger('click');
                                            $("#form_insert_rts").show();
                                            $("#form_update_rts").hide();
                                            $("#form_insert_ts").show();
                                            $("#form_update_ts").hide();

                                        }
                                    });
                                self.tablaResoluciones.show(self.tableResolucionView);


                            });
                            $("#fam-advertencia").removeClass("alert-warning");
                            $("#fam-advertencia").removeClass("alert-danger");
                            $("#fam-advertencia").addClass("alert-success");
                            $("#fam-advertencia").html("<strong>Se actualizo con éxito el Tiempo de Servicio</strong>");
                            $("#fam-advertencia").show();
                        }
                        else{
                            $("#fam-advertencia").removeClass("alert-success");
                            $("#fam-advertencia").removeClass("alert-danger");
                            $("#fam-advertencia").addClass("alert-warning");
                            $("#fam-advertencia").html("<strong>Campos Obligatorios Incompletos</strong>");
                            $("#fam-advertencia").show();
                        }
                    }
                    if($("#option_rts").is(':checked')){
                        if($("#f_recono").val()!="" && $("#resolucion_recono").val()!="" && $("#fecha_resolt_recono").val()!=""
                            && $("#fecha_resolt_anio").val()!="" && $("#fecha_resolt_mes").val()!="" && $("#fecha_resolt_dia").val()!=""){

                            if(isNaN($("#fecha_resolt_anio").val()) || isNaN($("#fecha_resolt_mes").val()) || isNaN($("#fecha_resolt_dia").val())){


                                $("#fam-advertencia").removeClass("alert-success");
                                $("#fam-advertencia").removeClass("alert-danger");
                                $("#fam-advertencia").addClass("alert-warning");
                                $("#fam-advertencia").html("<strong>El tiempo de Reconocimiento no debe tener caracteres</strong>");
                                $("#fam-advertencia").show();
                            }else{
                                self.model.get("updateresolucion").set({
                                    "res_seq_tmp_serv": self.id_tiempo_servicio,
                                    "res_fecha": $("#f_recono").val(),
                                    "res_id":$("#resolucion_recono").val(),
                                    "res_anio":$("#fecha_resolt_anio").val(),
                                    "res_mes": $("#fecha_resolt_mes").val(),
                                    "res_dia": $("#fecha_resolt_dia").val()
                                });

                                this.model.get("updateresolucion").url = "api/legajos/updateResolucion";

                                var self_s=this.model.get("updateresolucion").save({}, {wait: true});

                                self_s.fail(function () {

                                    self.tableResolucionView.fetchResol(self.codigo,self.num_ser_est,
                                        function () {
                                            if(self.tableResolucionView.collection.length!=0){
                                                $("#table-resoluciones-servidor").dataTable();
                                                $('#table-resoluciones-servidor_wrapper').append("<div id='footer-table'></div>");
                                                $('#table-resoluciones-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                $('#table-resoluciones-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                $('.dataTables_filter input').attr('placeholder','Buscar..');

                                                $("#option_ts").prop("disabled",false);
                                                $("#tipo_ts").prop("disabled",false);
                                                $("#tipo_rec").prop("disabled",false);
                                                $("#option_rts").prop("disabled",false);
                                                $("#f_recono").val("");
                                                $("#resolucion_recono").val("");
                                                $("#fecha_resolt_recono").val("");
                                                $("#fecha_resolt_anio").val("");
                                                $("#fecha_resolt_mes").val("");
                                                $("#fecha_resolt_dia").val("");
                                                $("#option_ts").prop("checked", true).trigger('click');
                                                $("#form_insert_rts").show();
                                                $("#form_update_rts").hide();
                                                $("#form_insert_ts").show();
                                                $("#form_update_ts").hide();
                                            }
                                        });
                                    self.tablaResoluciones.show(self.tableResolucionView);

                                });

                                $("#fam-advertencia").removeClass("alert-warning");
                                $("#fam-advertencia").removeClass("alert-danger");
                                $("#fam-advertencia").addClass("alert-success");
                                $("#fam-advertencia").html("<strong>Se actualizo con éxito el Reconocimiento de Tiempo de Servicio</strong>");
                                $("#fam-advertencia").show();
                            }
                        }
                        else{
                            $("#fam-advertencia").removeClass("alert-success");
                            $("#fam-advertencia").removeClass("alert-danger");
                            $("#fam-advertencia").addClass("alert-warning");
                            $("#fam-advertencia").html("<strong>Campos Obligatorios Incompletos</strong>");
                            $("#fam-advertencia").show();
                        }
                    }
                }
                else{
                    $("#fam-advertencia").removeClass("alert-success");
                    $("#fam-advertencia").removeClass("alert-danger");
                    $("#fam-advertencia").addClass("alert-warning");
                    $("#fam-advertencia").html("<strong>Seleccione Tipo</strong>");
                    $("#fam-advertencia").show();
                }

            },

            fun_tipo_pago:function(){

                if("1"==$("#lega_tip_pago").val()){


                    $('#num_cuenta').val("");

                    $('#num_cuenta').show();
                    $('#tit_cuenta').show();
                }else{
                    $('#numcuenta').removeAttr("data-validetta");
                    $('#nume span').remove();
                    $('#num_cuenta').val("");
                    $('#numcuenta').val("");
                    $('#num_cuenta').hide();
                    $('#tit_cuenta').hide();
                }
            },

            fun_save_fam:function(){
                var self = this;
                var fullDate = new Date();
                var dia=fullDate.getDate()+"";
                var mes=(fullDate.getMonth()+1)+"";
                var anio=fullDate.getFullYear()+"";


                var depen_fam;
                var benef_fam;
                var sex_fam;

                if($("#sexo").val()=="0"){
                         sex_fam="";
                }else{
                    sex_fam=$("#sexo").val();
                }

                if($("#depen").val()=="000"){
                    depen_fam="0";
                }
                else{
                    depen_fam=$("#depen").val();
                }
                if($("#beneficio").val()=="000"){
                    benef_fam="0";
                }
                else{
                    benef_fam=$("#beneficio").val();
                }
                if(dia.length==1){
                    dia='0'+fullDate.getDate();
                }
                if(mes.length==1){
                    mes='0'+(fullDate.getMonth()+1);
                }
                var currentDate = dia + "/" + mes + "/" + anio;


                    if($("#legaj_nom_ape").val()!="" && $("#ap_paterno").val()!="" && $("#ap_materno").val()!=""
                        && $("#leg_tip_parent").val()!="0")
                                      {
                                    if(this.Comparar_Fecha(currentDate,$("#legaj_naci").val())){

                                        if($("#serv_ape_pat").val()!=""){

                                            if($("#leg_tip_document").val()=="0"){
                                                $("#fam-advertencia").removeClass("alert-success");
                                                $("#fam-advertencia").removeClass("alert-danger");
                                                $("#fam-advertencia").addClass("alert-warning");
                                                $("#fam-advertencia").html("<strong>Seleccione Tipo de Documento</strong>");
                                                $("#fam-advertencia").show();
                                            }
                                            else{
                                                this.validarExistenteDocument.fetchdocumento($("#serv_ape_pat").val(),function(){
                                                    if(self.validarExistenteDocument.collection.length!=0){
                                                        $("#fam-advertencia").removeClass("alert-success");
                                                        $("#fam-advertencia").removeClass("alert-warning");

                                                        $("#fam-advertencia").addClass("alert-danger");
                                                        $("#fam-advertencia").html("<strong>El Numero de Documento ya existe</strong>");
                                                        $("#fam-advertencia").show();

                                                    }
                                                    else{
                                                        if($("#beneficio").val()=="0" || $("#beneficio").val()=="000"){

                                                            self.model.get("datosfamiliares").set({
                                                                "cargfamnom": $("#ap_paterno").val()+" "+$("#ap_materno").val()+" "+$("#legaj_nom_ape").val(),
                                                                "cargfampar": $("#leg_tip_parent").val(),
                                                                "cargfamdir": $("#legaj_domici").val(),
                                                                "cargfamdoc": $("#leg_tip_document").val(),
                                                                "cargfamnumdoc": $("#serv_ape_pat").val(),
                                                                "cargfamsex": sex_fam,
                                                                "cargfamfechnac": $("#legaj_naci").val(),
                                                                "cargfamtel": $("#lega_tel").val(),
                                                                "cargfamrestciv": $("#leg_est_civil").val(),
                                                                "cargfamben": benef_fam,
                                                                "cargfamnumessal": $("#lega_seguro").val(),
                                                                "cargfamdep": depen_fam,
                                                                "cargfamcodser": self.codigo
                                                            });

                                                            self.model.get("datosfamiliares").url = "api/legajos/addDatosFamiliares";
                                                            var self_s = self.model.get("datosfamiliares").save({}, { wait: true});

                                                            self_s.done(function(){ });
                                                            self_s.fail(function(){
                                                                self.tableFamiliarView.fetchFamiliares(self.codigo,
                                                                    function () {
                                                                        $("#table-familiare-servidor").dataTable();
                                                                        $('#table-familiare-servidor_wrapper').append("<div id='footer-table'></div>");
                                                                        $('#table-familiare-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                                        $('#table-familiare-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                                        $('.dataTables_filter input').attr('placeholder','Buscar..');

                                                                        $("#legaj_nom_ape").val("");
                                                                        $("#legaj_domici").val("");
                                                                        $("#ap_paterno").val("");
                                                                        $("#ap_materno").val("");
                                                                        $("#serv_ape_pat").val("");
                                                                        $("#lega_tel").val("");
                                                                        $("#legaj_naci").val("");
                                                                        $("#lega_seguro").val("");
                                                                        $("#leg_tip_parent").val("0").trigger('change');
                                                                        $("#leg_est_civil").val("0").trigger('change');
                                                                        $("#leg_tip_document").val("0").trigger('change');
                                                                        $("#depen").val("000").trigger('change');
                                                                        $("#sexo").val("0").trigger('change');
                                                                        $("#beneficio").val("000").trigger('change');
                                                                    });


                                                                self.tablefamily.show(self.tableFamiliarView);

                                                            });
                                                            $("#fam-advertencia").removeClass("alert-warning");
                                                            $("#fam-advertencia").removeClass("alert-danger");
                                                            $("#fam-advertencia").addClass("alert-success");
                                                            $("#fam-advertencia").html("<strong>Se registro con éxito los Datos Familiares</strong>");
                                                            $("#fam-advertencia").show();




                                                        }
                                                        else{
                                                            if($("#tip_benef_fam").val()=="0"){
                                                                $("#fam-advertencia").removeClass("alert-success");
                                                                $("#fam-advertencia").removeClass("alert-danger");
                                                                $("#fam-advertencia").addClass("alert-warning");
                                                                $("#fam-advertencia").html("<strong>Seleccione Tipo de Beneficio</strong>");
                                                                $("#fam-advertencia").show();
                                                            }
                                                            else{
                                                                if($("#lega_tip_pago").val()=="0"){
                                                                    $("#fam-advertencia").removeClass("alert-success");
                                                                    $("#fam-advertencia").removeClass("alert-danger");
                                                                    $("#fam-advertencia").addClass("alert-warning");
                                                                    $("#fam-advertencia").html("<strong>Seleccione Tipo de Pago</strong>");
                                                                    $("#fam-advertencia").show();
                                                                }else{
                                                                    if($("#lega_tip_pago").val()=="1"){

                                                                        if($("#numcuenta").val()!=""){

                                                                            self.model.get("datosfamiliares").set({
                                                                                "cargfamnom": $("#ap_paterno").val()+" "+$("#ap_materno").val()+" "+$("#legaj_nom_ape").val(),
                                                                                "cargfampar": $("#leg_tip_parent").val(),
                                                                                "cargfamdir": $("#legaj_domici").val(),
                                                                                "cargfamdoc": $("#leg_tip_document").val(),
                                                                                "cargfamnumdoc": $("#serv_ape_pat").val(),
                                                                                "cargfamsex": sex_fam,
                                                                                "cargfamfechnac": $("#legaj_naci").val(),
                                                                                "cargfamtel": $("#lega_tel").val(),
                                                                                "cargfamrestciv": $("#leg_est_civil").val(),
                                                                                "cargfamben": benef_fam,
                                                                                "cargfamnumessal": $("#lega_seguro").val(),
                                                                                "cargfamdep": depen_fam,
                                                                                "cargfamcodser": self.codigo
                                                                            });

                                                                            self.model.get("datosfamiliares").url = "api/legajos/addDatosFamiliares";
                                                                            var self_s = self.model.get("datosfamiliares").save({}, { wait: true});

                                                                            self_s.done(function(){

                                                                                self.tableFamiliarView.fetchFamiliares(self.codigo,
                                                                                    function () {
                                                                                        $("#table-familiare-servidor").dataTable();
                                                                                        $('#table-familiare-servidor_wrapper').append("<div id='footer-table'></div>");
                                                                                        $('#table-familiare-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                                                        $('#table-familiare-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                                                        $('.dataTables_filter input').attr('placeholder','Buscar..');
                                                                                    });
                                                                                self.tablefamily.show(self.tableFamiliarView);

                                                                            });
                                                                            self_s.fail(function(){

                                                                                self.model.get("beneficiarios").set({
                                                                                    "tipopago": $("#lega_tip_pago").val(),
                                                                                    "tipbeneficio":$("#tip_benef_fam").val(),
                                                                                    "codresol":$("#fam-resolucion").val(),
                                                                                    "numcuenta": $("#numcuenta").val(),
                                                                                    "titularcuenta": $("#titularcuenta").val(),
                                                                                    "cargfamnom": $("#ap_paterno").val()+" "+$("#ap_materno").val()+" "+$("#legaj_nom_ape").val(),
                                                                                    "cargfamcodser": self.codigo

                                                                                });
                                                                                self.model.get("beneficiarios").url = "api/legajos/addBeneficiarios";

                                                                                var self_p=self.model.get("beneficiarios").save({}, { wait: true});

                                                                                self_p.done(function(){

                                                                                });
                                                                                self_p.fail(function(){
                                                                                    self.tableFamiliarView.fetchFamiliares(self.codigo,
                                                                                        function () {
                                                                                            $("#table-familiare-servidor").dataTable();
                                                                                            $('#table-familiare-servidor_wrapper').append("<div id='footer-table'></div>");
                                                                                            $('#table-familiare-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                                                            $('#table-familiare-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                                                            $('.dataTables_filter input').attr('placeholder','Buscar..');


                                                                                            $("#legaj_nom_ape").val("");
                                                                                            $("#ap_paterno").val("");
                                                                                            $("#ap_materno").val("");
                                                                                            $("#legaj_domici").val("");
                                                                                            $("#serv_ape_pat").val("");
                                                                                            $("#lega_tel").val("");
                                                                                            $("#legaj_naci").val("");
                                                                                            $("#lega_seguro").val("");
                                                                                            $("#leg_tip_parent").val("0").trigger('change');
                                                                                            $("#leg_est_civil").val("0").trigger('change');
                                                                                            $("#leg_tip_document").val("0").trigger('change');
                                                                                            $("#depen").val("000").trigger('change');
                                                                                            $("#sexo").val("0").trigger('change');
                                                                                            $("#beneficio").val("000").trigger('change');
                                                                                        });


                                                                                    self.tablefamily.show(self.tableFamiliarView);


                                                                                });

                                                                            });
                                                                            $("#fam-advertencia").removeClass("alert-warning");
                                                                            $("#fam-advertencia").removeClass("alert-danger");
                                                                            $("#fam-advertencia").addClass("alert-success");
                                                                            $("#fam-advertencia").html("<strong>Se registro con éxito los Datos Familiares</strong>");
                                                                            $("#fam-advertencia").show();




                                                                        }else{

                                                                            $("#fam-advertencia").removeClass("alert-success");
                                                                            $("#fam-advertencia").removeClass("alert-danger");
                                                                            $("#fam-advertencia").addClass("alert-warning");
                                                                            $("#fam-advertencia").html("<strong>Ingrese Numero de Cuenta</strong>");
                                                                            $("#fam-advertencia").show();
                                                                        }

                                                                    }
                                                                    else{


                                                                        self.model.get("datosfamiliares").set({
                                                                            "cargfamnom": $("#ap_paterno").val()+" "+$("#ap_materno").val()+" "+$("#legaj_nom_ape").val(),
                                                                            "cargfampar": $("#leg_tip_parent").val(),
                                                                            "cargfamdir": $("#legaj_domici").val(),
                                                                            "cargfamdoc": $("#leg_tip_document").val(),
                                                                            "cargfamnumdoc": $("#serv_ape_pat").val(),
                                                                            "cargfamsex": sex_fam,
                                                                            "cargfamfechnac": $("#legaj_naci").val(),
                                                                            "cargfamtel": $("#lega_tel").val(),
                                                                            "cargfamrestciv": $("#leg_est_civil").val(),
                                                                            "cargfamben": benef_fam,
                                                                            "cargfamnumessal": $("#lega_seguro").val(),
                                                                            "cargfamdep": depen_fam,
                                                                            "cargfamcodser": self.codigo
                                                                        });

                                                                        self.model.get("datosfamiliares").url = "api/legajos/addDatosFamiliares";
                                                                        var self_s = self.model.get("datosfamiliares").save({}, { wait: true});

                                                                        self_s.done(function(){

                                                                        });
                                                                        self_s.fail(function(){

                                                                            self.model.get("beneficiarios").set({
                                                                                "tipopago": $("#lega_tip_pago").val(),
                                                                                "tipbeneficio":$("#tip_benef_fam").val(),
                                                                                "codresol":$("#fam-resolucion").val(),
                                                                                "numcuenta": $("#numcuenta").val(),
                                                                                "titularcuenta": $("#titularcuenta").val(),
                                                                                "cargfamnom": $("#ap_paterno").val()+" "+$("#ap_materno").val()+" "+$("#legaj_nom_ape").val(),
                                                                                "cargfamcodser": self.codigo

                                                                            });
                                                                            self.model.get("beneficiarios").url = "api/legajos/addBeneficiarios";

                                                                            var self_p=self.model.get("beneficiarios").save({}, { wait: true});

                                                                            self_p.done(function(){

                                                                            });
                                                                            self_p.fail(function(){
                                                                                self.tableFamiliarView.fetchFamiliares(self.codigo,
                                                                                    function () {
                                                                                        $("#table-familiare-servidor").dataTable();
                                                                                        $('#table-familiare-servidor_wrapper').append("<div id='footer-table'></div>");
                                                                                        $('#table-familiare-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                                                        $('#table-familiare-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                                                        $('.dataTables_filter input').attr('placeholder','Buscar..');

                                                                                        $("#legaj_nom_ape").val("");
                                                                                        $("#ap_paterno").val("");
                                                                                        $("#ap_materno").val("");
                                                                                        $("#legaj_domici").val("");
                                                                                        $("#serv_ape_pat").val("");
                                                                                        $("#lega_tel").val("");
                                                                                        $("#legaj_naci").val("");
                                                                                        $("#lega_seguro").val("");
                                                                                        $("#leg_tip_parent").val("0").trigger('change');
                                                                                        $("#leg_est_civil").val("0").trigger('change');
                                                                                        $("#leg_tip_document").val("0").trigger('change');
                                                                                        $("#depen").val("000").trigger('change');
                                                                                        $("#sexo").val("0").trigger('change');
                                                                                        $("#beneficio").val("000").trigger('change');
                                                                                    });


                                                                                self.tablefamily.show(self.tableFamiliarView);
                                                                            });

                                                                        });
                                                                        $("#fam-advertencia").removeClass("alert-warning");
                                                                        $("#fam-advertencia").removeClass("alert-danger");
                                                                        $("#fam-advertencia").addClass("alert-success");
                                                                        $("#fam-advertencia").html("<strong>Se registro con éxito los Datos Familiares</strong>");
                                                                        $("#fam-advertencia").show();


                                                                    }
                                                                }



                                                            }






                                                        }
                                                    }
                                                });
                                            }


                                        }
                                        else{
                                            if($("#beneficio").val()=="0" || $("#beneficio").val()=="000"){

                                                self.model.get("datosfamiliares").set({
                                                    "cargfamnom": $("#ap_paterno").val()+" "+$("#ap_materno").val()+" "+$("#legaj_nom_ape").val(),
                                                    "cargfampar": $("#leg_tip_parent").val(),
                                                    "cargfamdir": $("#legaj_domici").val(),
                                                    "cargfamdoc": "0",
                                                    "cargfamnumdoc": $("#serv_ape_pat").val(),
                                                    "cargfamsex": sex_fam,
                                                    "cargfamfechnac": $("#legaj_naci").val(),
                                                    "cargfamtel": $("#lega_tel").val(),
                                                    "cargfamrestciv": $("#leg_est_civil").val(),
                                                    "cargfamben": benef_fam,
                                                    "cargfamnumessal": $("#lega_seguro").val(),
                                                    "cargfamdep": depen_fam,
                                                    "cargfamcodser": self.codigo
                                                });

                                                self.model.get("datosfamiliares").url = "api/legajos/addDatosFamiliares";
                                                var self_s = self.model.get("datosfamiliares").save({}, { wait: true});

                                                self_s.done(function(){ });
                                                self_s.fail(function(){
                                                   console.log("entroo");
                                                    self.tableFamiliarView.fetchFamiliares(self.codigo,
                                                        function () {
                                                            $("#table-familiare-servidor").dataTable();
                                                            $('#table-familiare-servidor_wrapper').append("<div id='footer-table'></div>");
                                                            $('#table-familiare-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                            $('#table-familiare-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                            $('.dataTables_filter input').attr('placeholder','Buscar..');

                                                            $("#legaj_nom_ape").val("");
                                                            $("#legaj_domici").val("");
                                                            $("#ap_paterno").val("");
                                                            $("#ap_materno").val("");
                                                            $("#serv_ape_pat").val("");
                                                            $("#lega_tel").val("");
                                                            $("#legaj_naci").val("");
                                                            $("#lega_seguro").val("");
                                                            $("#leg_tip_parent").val("0").trigger('change');
                                                            $("#leg_est_civil").val("0").trigger('change');
                                                            $("#leg_tip_document").val("0").trigger('change');
                                                            $("#depen").val("000").trigger('change');
                                                            $("#sexo").val("0").trigger('change');
                                                            $("#beneficio").val("000").trigger('change');
                                                        });


                                                    self.tablefamily.show(self.tableFamiliarView);

                                                });
                                                $("#fam-advertencia").removeClass("alert-warning");
                                                $("#fam-advertencia").removeClass("alert-danger");
                                                $("#fam-advertencia").addClass("alert-success");
                                                $("#fam-advertencia").html("<strong>Se registro con éxito los Datos Familiares</strong>");
                                                $("#fam-advertencia").show();




                                            }
                                            else{
                                                if($("#tip_benef_fam").val()=="0"){
                                                    $("#fam-advertencia").removeClass("alert-success");
                                                    $("#fam-advertencia").removeClass("alert-danger");
                                                    $("#fam-advertencia").addClass("alert-warning");
                                                    $("#fam-advertencia").html("<strong>Seleccione Tipo de Beneficio</strong>");
                                                    $("#fam-advertencia").show();
                                                }
                                                else{
                                                    if($("#lega_tip_pago").val()=="0"){
                                                        $("#fam-advertencia").removeClass("alert-success");
                                                        $("#fam-advertencia").removeClass("alert-danger");
                                                        $("#fam-advertencia").addClass("alert-warning");
                                                        $("#fam-advertencia").html("<strong>Seleccione Tipo de Pago</strong>");
                                                        $("#fam-advertencia").show();
                                                    }else{
                                                        if($("#lega_tip_pago").val()=="1"){

                                                            if($("#numcuenta").val()!=""){

                                                                self.model.get("datosfamiliares").set({
                                                                    "cargfamnom": $("#ap_paterno").val()+" "+$("#ap_materno").val()+" "+$("#legaj_nom_ape").val(),
                                                                    "cargfampar": $("#leg_tip_parent").val(),
                                                                    "cargfamdir": $("#legaj_domici").val(),
                                                                    "cargfamdoc": "0",
                                                                    "cargfamnumdoc": $("#serv_ape_pat").val(),
                                                                    "cargfamsex": sex_fam,
                                                                    "cargfamfechnac": $("#legaj_naci").val(),
                                                                    "cargfamtel": $("#lega_tel").val(),
                                                                    "cargfamrestciv": $("#leg_est_civil").val(),
                                                                    "cargfamben": benef_fam,
                                                                    "cargfamnumessal": $("#lega_seguro").val(),
                                                                    "cargfamdep": depen_fam,
                                                                    "cargfamcodser": self.codigo
                                                                });

                                                                self.model.get("datosfamiliares").url = "api/legajos/addDatosFamiliares";
                                                                var self_s = self.model.get("datosfamiliares").save({}, { wait: true});

                                                                self_s.done(function(){

                                                                    self.tableFamiliarView.fetchFamiliares(self.codigo,
                                                                        function () {
                                                                            $("#table-familiare-servidor").dataTable();
                                                                            $('#table-familiare-servidor_wrapper').append("<div id='footer-table'></div>");
                                                                            $('#table-familiare-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                                            $('#table-familiare-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                                            $('.dataTables_filter input').attr('placeholder','Buscar..');
                                                                        });
                                                                    self.tablefamily.show(self.tableFamiliarView);

                                                                });
                                                                self_s.fail(function(){

                                                                    self.model.get("beneficiarios").set({
                                                                        "tipopago": $("#lega_tip_pago").val(),
                                                                        "tipbeneficio":$("#tip_benef_fam").val(),
                                                                        "codresol":$("#fam-resolucion").val(),
                                                                        "numcuenta": $("#numcuenta").val(),
                                                                        "titularcuenta": $("#titularcuenta").val(),
                                                                        "cargfamnom": $("#ap_paterno").val()+" "+$("#ap_materno").val()+" "+$("#legaj_nom_ape").val(),
                                                                        "cargfamcodser": self.codigo

                                                                    });
                                                                    self.model.get("beneficiarios").url = "api/legajos/addBeneficiarios";

                                                                    var self_p=self.model.get("beneficiarios").save({}, { wait: true});

                                                                    self_p.done(function(){

                                                                    });
                                                                    self_p.fail(function(){
                                                                        self.tableFamiliarView.fetchFamiliares(self.codigo,
                                                                            function () {
                                                                                $("#table-familiare-servidor").dataTable();
                                                                                $('#table-familiare-servidor_wrapper').append("<div id='footer-table'></div>");
                                                                                $('#table-familiare-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                                                $('#table-familiare-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                                                $('.dataTables_filter input').attr('placeholder','Buscar..');


                                                                                $("#legaj_nom_ape").val("");
                                                                                $("#ap_paterno").val("");
                                                                                $("#ap_materno").val("");
                                                                                $("#legaj_domici").val("");
                                                                                $("#serv_ape_pat").val("");
                                                                                $("#lega_tel").val("");
                                                                                $("#legaj_naci").val("");
                                                                                $("#lega_seguro").val("");
                                                                                $("#leg_tip_parent").val("0").trigger('change');
                                                                                $("#leg_est_civil").val("0").trigger('change');
                                                                                $("#leg_tip_document").val("0").trigger('change');
                                                                                $("#depen").val("000").trigger('change');
                                                                                $("#sexo").val("0").trigger('change');
                                                                                $("#beneficio").val("000").trigger('change');
                                                                            });


                                                                        self.tablefamily.show(self.tableFamiliarView);


                                                                    });

                                                                });
                                                                $("#fam-advertencia").removeClass("alert-warning");
                                                                $("#fam-advertencia").removeClass("alert-danger");
                                                                $("#fam-advertencia").addClass("alert-success");
                                                                $("#fam-advertencia").html("<strong>Se registro con éxito los Datos Familiares</strong>");
                                                                $("#fam-advertencia").show();




                                                            }else{

                                                                $("#fam-advertencia").removeClass("alert-success");
                                                                $("#fam-advertencia").removeClass("alert-danger");
                                                                $("#fam-advertencia").addClass("alert-warning");
                                                                $("#fam-advertencia").html("<strong>Ingrese Numero de Cuenta</strong>");
                                                                $("#fam-advertencia").show();
                                                            }

                                                        }
                                                        else{


                                                            self.model.get("datosfamiliares").set({
                                                                "cargfamnom": $("#ap_paterno").val()+" "+$("#ap_materno").val()+" "+$("#legaj_nom_ape").val(),
                                                                "cargfampar": $("#leg_tip_parent").val(),
                                                                "cargfamdir": $("#legaj_domici").val(),
                                                                "cargfamdoc": "0",
                                                                "cargfamnumdoc": $("#serv_ape_pat").val(),
                                                                "cargfamsex":sex_fam,
                                                                "cargfamfechnac": $("#legaj_naci").val(),
                                                                "cargfamtel": $("#lega_tel").val(),
                                                                "cargfamrestciv": $("#leg_est_civil").val(),
                                                                "cargfamben": benef_fam,
                                                                "cargfamnumessal": $("#lega_seguro").val(),
                                                                "cargfamdep": depen_fam,
                                                                "cargfamcodser": self.codigo
                                                            });

                                                            self.model.get("datosfamiliares").url = "api/legajos/addDatosFamiliares";
                                                            var self_s = self.model.get("datosfamiliares").save({}, { wait: true});

                                                            self_s.done(function(){

                                                            });
                                                            self_s.fail(function(){

                                                                self.model.get("beneficiarios").set({
                                                                    "tipopago": $("#lega_tip_pago").val(),
                                                                    "tipbeneficio":$("#tip_benef_fam").val(),
                                                                    "codresol":$("#fam-resolucion").val(),
                                                                    "numcuenta": $("#numcuenta").val(),
                                                                    "titularcuenta": $("#titularcuenta").val(),
                                                                    "cargfamnom": $("#ap_paterno").val()+" "+$("#ap_materno").val()+" "+$("#legaj_nom_ape").val(),
                                                                    "cargfamcodser": self.codigo

                                                                });
                                                                self.model.get("beneficiarios").url = "api/legajos/addBeneficiarios";

                                                                var self_p=self.model.get("beneficiarios").save({}, { wait: true});

                                                                self_p.done(function(){

                                                                });
                                                                self_p.fail(function(){
                                                                    self.tableFamiliarView.fetchFamiliares(self.codigo,
                                                                        function () {
                                                                            $("#table-familiare-servidor").dataTable();
                                                                            $('#table-familiare-servidor_wrapper').append("<div id='footer-table'></div>");
                                                                            $('#table-familiare-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                                            $('#table-familiare-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                                            $('.dataTables_filter input').attr('placeholder','Buscar..');

                                                                            $("#legaj_nom_ape").val("");
                                                                            $("#ap_paterno").val("");
                                                                            $("#ap_materno").val("");
                                                                            $("#legaj_domici").val("");
                                                                            $("#serv_ape_pat").val("");
                                                                            $("#lega_tel").val("");
                                                                            $("#legaj_naci").val("");
                                                                            $("#lega_seguro").val("");
                                                                            $("#leg_tip_parent").val("0").trigger('change');
                                                                            $("#leg_est_civil").val("0").trigger('change');
                                                                            $("#leg_tip_document").val("0").trigger('change');
                                                                            $("#depen").val("000").trigger('change');
                                                                            $("#sexo").val("0").trigger('change');
                                                                            $("#beneficio").val("000").trigger('change');
                                                                        });


                                                                    self.tablefamily.show(self.tableFamiliarView);
                                                                });

                                                            });
                                                            $("#fam-advertencia").removeClass("alert-warning");
                                                            $("#fam-advertencia").removeClass("alert-danger");
                                                            $("#fam-advertencia").addClass("alert-success");
                                                            $("#fam-advertencia").html("<strong>Se registro con éxito los Datos Familiares</strong>");
                                                            $("#fam-advertencia").show();


                                                        }
                                                    }



                                                }






                                            }
                                        }


                                    }
                                     else{
                                        $("#fam-advertencia").removeClass("alert-success");
                                        $("#fam-advertencia").removeClass("alert-danger");
                                        $("#fam-advertencia").addClass("alert-warning");
                                        $("#fam-advertencia").html("<strong>El Fecha de Nacimiento debe ser menor a la Fecha Actual</strong>");
                                        $("#fam-advertencia").show();
                                    }






                    }
                    else{
                        $("#fam-advertencia").removeClass("alert-success");
                        $("#fam-advertencia").removeClass("alert-danger");
                        $("#fam-advertencia").addClass("alert-warning");
                        $("#fam-advertencia").html("<strong>Existen campos obligatorios incompletos</strong>");
                        $("#fam-advertencia").show();
                    }


            },

            fun_fam_edit:function(e){

                var clickedElement=$(e.currentTarget);
                var nom_ape=clickedElement.parent().parent().children(':nth-child(1)').text().split(" ");
                var domicilio=clickedElement.parent().parent().children(':nth-child(2)').text();
                var num_document=clickedElement.parent().parent().children(':nth-child(5)').text();
                var sexo=clickedElement.parent().parent().children(':nth-child(6)').text();
                var parent=clickedElement.parent().parent().attr('dataparent');
                var telef=clickedElement.parent().parent().attr('datatel');
                var tipdocume=clickedElement.parent().parent().attr('datadocum');
                var numseguro=clickedElement.parent().parent().attr('datasegur');
                var estcivil=clickedElement.parent().parent().attr('dataestcivil');
                var depend=clickedElement.parent().parent().attr('datadep');
                var benef=clickedElement.parent().parent().attr('databenf');
                var fechnac=clickedElement.parent().parent().attr('datafechnac');
                var numcuen=clickedElement.parent().parent().attr('datanumcuen');
                var tipopago=clickedElement.parent().parent().attr('datatipago');
                var titular=clickedElement.parent().parent().attr('datatitular');
                var idfamiliar=clickedElement.parent().parent().attr('dataid');

                var tipobenef=clickedElement.parent().parent().attr('datatipbenf');
                var idresol=clickedElement.parent().parent().attr('dataresol');
                var aux_nom="";

                for(var i=2;i<nom_ape.length;i++){
                    aux_nom=aux_nom+nom_ape[i]+" ";
                }

                $('#idfamiliar').text(idfamiliar);
                $('#form_save_rts').hide();
                $('#form_edit_rts').show();


                parent.trim();
                $('#legaj_nom_ape').val(aux_nom);
                $("#ap_paterno").val(nom_ape[0]);
                $("#ap_materno").val(nom_ape[1]);
                $('#legaj_domici').val(domicilio);
                $('#serv_ape_pat').val(num_document.trim());
                $('#sexo').val(sexo);
                $('#legaj_naci').val(fechnac);
                $('#beneficio').val(benef).trigger('change');
                $('#lega_seguro').val(numseguro.trim());
                $('#leg_tip_document').val(tipdocume);
                $('#lega_tel').val(telef);
                $('#leg_est_civil').val(estcivil.trim());
                $('#leg_tip_parent').val(parent.trim()+' ');
                $('#depen').val(depend);

                if(benef=='1'){
                    $('#lega_tip_pago').val(tipopago).trigger('change');
                    $('#tip_benef_fam').val(tipobenef).trigger('change');
                    $('#fam-resolucion').val(idresol);
                    if(tipopago=='1'){
                        $('#numcuenta').val(numcuen);
                    }
                    $('#titularcuenta').val(titular).trigger('change');
                }
            },

            fun_action_fam_edit:function(){
                var fullDate = new Date();
                var dia=fullDate.getDate()+"";
                var mes=(fullDate.getMonth()+1)+"";
                var anio=fullDate.getFullYear()+"";
                var self=this;
                var depen_fam;
                var benef_fam;
                var sex_fam;

                if($("#sexo").val()=="0"){
                    sex_fam="";
                }else{
                    sex_fam=$("#sexo").val();
                }

                if($("#depen").val()=="000"){
                    depen_fam="0";
                }
                else{
                    depen_fam=$("#depen").val();
                }
                if($("#beneficio").val()=="000"){
                    benef_fam="0";
                }
                else{
                    benef_fam=$("#beneficio").val();
                }
                if(dia.length==1){
                    dia='0'+fullDate.getDate();
                }
                if(mes.length==1){
                    mes='0'+(fullDate.getMonth()+1);
                }
                var currentDate = dia + "/" + mes + "/" + anio;

                        if($("#legaj_nom_ape").val()!="" && $("#ap_paterno").val()!="" && $("#ap_materno").val()!=""
                            && $("#leg_tip_parent").val()!="0"){

                            if(this.Comparar_Fecha(currentDate,$("#legaj_naci").val())){

                                if($("#serv_ape_pat").val()!=""){
                                    if($("#leg_tip_document").val()=="0"){
                                        $("#fam-advertencia").removeClass("alert-success");
                                        $("#fam-advertencia").removeClass("alert-danger");
                                        $("#fam-advertencia").addClass("alert-warning");
                                        $("#fam-advertencia").html("<strong>Seleccione Tipo de Documento</strong>");
                                        $("#fam-advertencia").show();
                                    }
                                    else{
                                        this.validarEditDocument.fetchEditdocumento($("#serv_ape_pat").val(),$("#idfamiliar").text(),function(){

                                            if(self.validarEditDocument.collection.length!=0){
                                                $("#fam-advertencia").removeClass("alert-success");
                                                $("#fam-advertencia").removeClass("alert-warning");

                                                $("#fam-advertencia").addClass("alert-danger");
                                                $("#fam-advertencia").html("<strong>El Numero de Documento ya existe</strong>");
                                                $("#fam-advertencia").show();
                                            }
                                            else{
                                                if($("#beneficio").val()=="0" || $("#beneficio").val()=="000"){
                                                    var beneficio=$("#beneficio").val();

                                                    self.model.get("editdatosfamiliares").set({
                                                        "cargfamnom":$("#ap_paterno").val()+" "+$("#ap_materno").val()+" "+ $("#legaj_nom_ape").val(),
                                                        "cargfampar": $("#leg_tip_parent").val(),
                                                        "cargfamdir": $("#legaj_domici").val(),
                                                        "cargfamdoc": $("#leg_tip_document").val(),
                                                        "cargfamnumdoc": $("#serv_ape_pat").val(),
                                                        "cargfamsex": sex_fam,
                                                        "cargfamfechnac": $("#legaj_naci").val(),
                                                        "cargfamtel": $("#lega_tel").val(),
                                                        "cargfamrestciv": $("#leg_est_civil").val(),
                                                        "cargfamben":benef_fam,
                                                        "cargfamnumessal": $("#lega_seguro").val(),
                                                        "cargfamdep": depen_fam,
                                                        "cargfamcodser": $("#id-servidor").text(),
                                                        "cargfamsec":$('#idfamiliar').text()
                                                    });
                                                    self.model.get("editdatosfamiliares").url = "api/legajos/editDatosFamiliares";
                                                    var self_s = self.model.get("editdatosfamiliares").save({}, { wait: true});

                                                    self_s.fail(function(){

                                                        self.tableFamiliarView.fetchFamiliares(self.codigo,
                                                            function () {
                                                                $("#table-familiare-servidor").dataTable();
                                                                $('#table-familiare-servidor_wrapper').append("<div id='footer-table'></div>");
                                                                $('#table-familiare-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                                $('#table-familiare-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                                $('.dataTables_filter input').attr('placeholder','Buscar..');

                                                                $("#legaj_nom_ape").val("");
                                                                $("#ap_paterno").val("");
                                                                $("#ap_materno").val("");
                                                                $("#legaj_domici").val("");
                                                                $("#serv_ape_pat").val("");
                                                                $("#lega_tel").val("");
                                                                $("#legaj_naci").val("");
                                                                $("#lega_seguro").val("");
                                                                $("#leg_tip_parent").val("0").trigger('change');
                                                                $("#leg_est_civil").val("0").trigger('change');
                                                                $("#leg_tip_document").val("0").trigger('change');
                                                                $("#depen").val("000").trigger('change');
                                                                $("#sexo").val("0").trigger('change');
                                                                $("#beneficio").val("000").trigger('change');

                                                                $("#form_edit_rts").hide();
                                                                $("#form_save_rts").show();

                                                            });

                                                        self.tablefamily.show(self.tableFamiliarView);



                                                    });
                                                    $("#fam-advertencia").removeClass("alert-warning");
                                                    $("#fam-advertencia").removeClass("alert-danger");
                                                    $("#fam-advertencia").addClass("alert-success");
                                                    $("#fam-advertencia").html("<strong>Se actualizo con éxito los Datos Familiares</strong>");
                                                    $("#fam-advertencia").show();
                                                }
                                                else{
                                                    if($("#tip_benef_fam").val()=="0"){
                                                        $("#fam-advertencia").removeClass("alert-success");
                                                        $("#fam-advertencia").removeClass("alert-danger");
                                                        $("#fam-advertencia").addClass("alert-warning");
                                                        $("#fam-advertencia").html("<strong>Seleccione Tipo de Beneficio</strong>");
                                                        $("#fam-advertencia").show();
                                                    }
                                                    else{
                                                        if($("#lega_tip_pago").val()=="0"){
                                                            $("#fam-advertencia").removeClass("alert-success");
                                                            $("#fam-advertencia").removeClass("alert-danger");
                                                            $("#fam-advertencia").addClass("alert-warning");
                                                            $("#fam-advertencia").html("<strong>Seleccione Tipo de Pago</strong>");
                                                            $("#fam-advertencia").show();
                                                        }
                                                        else{
                                                            if($("#lega_tip_pago").val()=="1"){

                                                                if($("#numcuenta").val()!=""){

                                                                    var beneficio=$("#beneficio").val();

                                                                    self.model.get("editdatosfamiliares").set({
                                                                        "cargfamnom": $("#ap_paterno").val()+" "+$("#ap_materno").val()+" "+ $("#legaj_nom_ape").val(),
                                                                        "cargfampar": $("#leg_tip_parent").val(),
                                                                        "cargfamdir": $("#legaj_domici").val(),
                                                                        "cargfamdoc": $("#leg_tip_document").val(),
                                                                        "cargfamnumdoc": $("#serv_ape_pat").val(),
                                                                        "cargfamsex": sex_fam,
                                                                        "cargfamfechnac": $("#legaj_naci").val(),
                                                                        "cargfamtel": $("#lega_tel").val(),
                                                                        "cargfamrestciv": $("#leg_est_civil").val(),
                                                                        "cargfamben": benef_fam,
                                                                        "cargfamnumessal": $("#lega_seguro").val(),
                                                                        "cargfamdep": depen_fam,
                                                                        "cargfamcodser": $("#id-servidor").text(),
                                                                        "cargfamsec":$('#idfamiliar').text()
                                                                    });

                                                                    self.model.get("editdatosfamiliares").url = "api/legajos/editDatosFamiliares";

                                                                    var self_s = self.model.get("editdatosfamiliares").save({}, { wait: true});

                                                                    self_s.done(function(){
                                                                    });
                                                                    self_s.fail(function(){
                                                                        self.model.get("updatebenefam").set({
                                                                            "titularcuenta":$('#titularcuenta').val(),
                                                                            "tipbeneficio":$("#tip_benef_fam").val(),
                                                                            "codresol":$("#fam-resolucion").val(),

                                                                            "numcuenta":$('#numcuenta').val(),
                                                                            "tipopago":$('#lega_tip_pago').val(),
                                                                            "cargfamsec":$('#idfamiliar').text()
                                                                        });

                                                                        self.model.get("updatebenefam").url = "api/legajos/updateBenef";

                                                                        var self_s = self.model.get("updatebenefam").save({}, { wait: true});

                                                                        self_s.done(function(){

                                                                            self.tableFamiliarView.fetchFamiliares(self.codigo,
                                                                                function () {
                                                                                    $("#table-familiare-servidor").dataTable();
                                                                                    $('#table-familiare-servidor_wrapper').append("<div id='footer-table'></div>");
                                                                                    $('#table-familiare-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                                                    $('#table-familiare-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                                                    $('.dataTables_filter input').attr('placeholder','Buscar..');
                                                                                });

                                                                            self.tablefamily.show(self.tableFamiliarView);


                                                                        });
                                                                        self_s.fail(function(){

                                                                            self.tableFamiliarView.fetchFamiliares(self.codigo,
                                                                                function () {
                                                                                    $("#table-familiare-servidor").dataTable();
                                                                                    $('#table-familiare-servidor_wrapper').append("<div id='footer-table'></div>");
                                                                                    $('#table-familiare-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                                                    $('#table-familiare-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                                                    $('.dataTables_filter input').attr('placeholder','Buscar..');
                                                                                    $("#legaj_nom_ape").val("");
                                                                                    $("#ap_paterno").val("");
                                                                                    $("#ap_materno").val("");
                                                                                    $("#legaj_domici").val("");
                                                                                    $("#serv_ape_pat").val("");
                                                                                    $("#lega_tel").val("");
                                                                                    $("#legaj_naci").val("");
                                                                                    $("#lega_seguro").val("");
                                                                                    $("#leg_tip_parent").val("0").trigger('change');
                                                                                    $("#leg_est_civil").val("0").trigger('change');
                                                                                    $("#leg_tip_document").val("0").trigger('change');
                                                                                    $("#depen").val("000").trigger('change');
                                                                                    $("#sexo").val("0").trigger('change');
                                                                                    $("#beneficio").val("000").trigger('change');

                                                                                    $("#form_edit_rts").hide();
                                                                                    $("#form_save_rts").show();
                                                                                });

                                                                            self.tablefamily.show(self.tableFamiliarView);

                                                                        });
                                                                    });
                                                                    $("#fam-advertencia").removeClass("alert-warning");
                                                                    $("#fam-advertencia").removeClass("alert-danger");
                                                                    $("#fam-advertencia").addClass("alert-success");
                                                                    $("#fam-advertencia").html("<strong>Se actualizo con éxito los Datos Familiares</strong>");
                                                                    $("#fam-advertencia").show();

                                                                }
                                                                else{
                                                                    $("#fam-advertencia").removeClass("alert-success");
                                                                    $("#fam-advertencia").removeClass("alert-danger");
                                                                    $("#fam-advertencia").addClass("alert-warning");
                                                                    $("#fam-advertencia").html("<strong>Ingrese Numero de Cuenta</strong>");
                                                                    $("#fam-advertencia").show();
                                                                }
                                                            }
                                                            else{
                                                                var beneficio=$("#beneficio").val();

                                                                self.model.get("editdatosfamiliares").set({
                                                                    "cargfamnom": $("#ap_paterno").val()+" "+$("#ap_materno").val()+" "+$("#legaj_nom_ape").val(),
                                                                    "cargfampar": $("#leg_tip_parent").val(),
                                                                    "cargfamdir": $("#legaj_domici").val(),
                                                                    "cargfamdoc": $("#leg_tip_document").val(),
                                                                    "cargfamnumdoc": $("#serv_ape_pat").val(),
                                                                    "cargfamsex": sex_fam,
                                                                    "cargfamfechnac": $("#legaj_naci").val(),
                                                                    "cargfamtel": $("#lega_tel").val(),
                                                                    "cargfamrestciv": $("#leg_est_civil").val(),
                                                                    "cargfamben": benef_fam,
                                                                    "cargfamnumessal": $("#lega_seguro").val(),
                                                                    "cargfamdep": depen_fam,
                                                                    "cargfamcodser": $("#id-servidor").text(),
                                                                    "cargfamsec":$('#idfamiliar').text()
                                                                });

                                                                self.model.get("editdatosfamiliares").url = "api/legajos/editDatosFamiliares";

                                                                var self_s = self.model.get("editdatosfamiliares").save({}, { wait: true});

                                                                self_s.done(function(){
                                                                });
                                                                self_s.fail(function(){
                                                                    self.model.get("updatebenefam").set({
                                                                        "titularcuenta":$('#titularcuenta').val(),
                                                                        "tipbeneficio":$("#tip_benef_fam").val(),
                                                                        "codresol":$("#fam-resolucion").val(),

                                                                        "numcuenta":$('#numcuenta').val(),
                                                                        "tipopago":$('#lega_tip_pago').val(),
                                                                        "cargfamsec":$('#idfamiliar').text()
                                                                    });

                                                                    self.model.get("updatebenefam").url = "api/legajos/updateBenef";

                                                                    var self_s = self.model.get("updatebenefam").save({}, { wait: true});

                                                                    self_s.done(function(){ });
                                                                    self_s.fail(function(){

                                                                        self.tableFamiliarView.fetchFamiliares(self.codigo,
                                                                            function () {
                                                                                $("#table-familiare-servidor").dataTable();
                                                                                $('#table-familiare-servidor_wrapper').append("<div id='footer-table'></div>");
                                                                                $('#table-familiare-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                                                $('#table-familiare-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                                                $('.dataTables_filter input').attr('placeholder','Buscar..');
                                                                                $("#legaj_nom_ape").val("");
                                                                                $("#ap_paterno").val("");
                                                                                $("#ap_materno").val("");
                                                                                $("#legaj_domici").val("");
                                                                                $("#serv_ape_pat").val("");
                                                                                $("#lega_tel").val("");
                                                                                $("#legaj_naci").val("");
                                                                                $("#lega_seguro").val("");
                                                                                $("#leg_tip_parent").val("0").trigger('change');
                                                                                $("#leg_est_civil").val("0").trigger('change');
                                                                                $("#leg_tip_document").val("0").trigger('change');
                                                                                $("#depen").val("000").trigger('change');
                                                                                $("#sexo").val("0").trigger('change');
                                                                                $("#beneficio").val("000").trigger('change');

                                                                                $("#form_edit_rts").hide();
                                                                                $("#form_save_rts").show();
                                                                            });

                                                                        self.tablefamily.show(self.tableFamiliarView);

                                                                    });
                                                                });
                                                                $("#fam-advertencia").removeClass("alert-warning");
                                                                $("#fam-advertencia").removeClass("alert-danger");
                                                                $("#fam-advertencia").addClass("alert-success");
                                                                $("#fam-advertencia").html("<strong>Se registro con actualizo los Datos Familiares</strong>");
                                                                $("#fam-advertencia").show();
                                                            }
                                                        }
                                                    }





                                                }

                                            }
                                        });
                                    }
                                }
                                else{
                                    if($("#beneficio").val()=="0" || $("#beneficio").val()=="000"){


                                        self.model.get("editdatosfamiliares").set({
                                            "cargfamnom":$("#ap_paterno").val()+" "+$("#ap_materno").val()+" "+ $("#legaj_nom_ape").val(),
                                            "cargfampar": $("#leg_tip_parent").val(),
                                            "cargfamdir": $("#legaj_domici").val(),
                                            "cargfamdoc": "0",
                                            "cargfamnumdoc": $("#serv_ape_pat").val(),
                                            "cargfamsex": sex_fam,
                                            "cargfamfechnac": $("#legaj_naci").val(),
                                            "cargfamtel": $("#lega_tel").val(),
                                            "cargfamrestciv": $("#leg_est_civil").val(),
                                            "cargfamben":benef_fam,
                                            "cargfamnumessal": $("#lega_seguro").val(),
                                            "cargfamdep": depen_fam,
                                            "cargfamcodser": $("#id-servidor").text(),
                                            "cargfamsec":$('#idfamiliar').text()
                                        });
                                        self.model.get("editdatosfamiliares").url = "api/legajos/editDatosFamiliares";
                                        var self_s = self.model.get("editdatosfamiliares").save({}, { wait: true});

                                        self_s.fail(function(){

                                            self.tableFamiliarView.fetchFamiliares(self.codigo,
                                                function () {
                                                    $("#table-familiare-servidor").dataTable();
                                                    $('#table-familiare-servidor_wrapper').append("<div id='footer-table'></div>");
                                                    $('#table-familiare-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                    $('#table-familiare-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                    $('.dataTables_filter input').attr('placeholder','Buscar..');

                                                    $("#legaj_nom_ape").val("");
                                                    $("#ap_paterno").val("");
                                                    $("#ap_materno").val("");
                                                    $("#legaj_domici").val("");
                                                    $("#serv_ape_pat").val("");
                                                    $("#lega_tel").val("");
                                                    $("#legaj_naci").val("");
                                                    $("#lega_seguro").val("");
                                                    $("#leg_tip_parent").val("0").trigger('change');
                                                    $("#leg_est_civil").val("0").trigger('change');
                                                    $("#leg_tip_document").val("0").trigger('change');
                                                    $("#depen").val("000").trigger('change');
                                                    $("#sexo").val("0").trigger('change');
                                                    $("#beneficio").val("000").trigger('change');

                                                    $("#form_edit_rts").hide();
                                                    $("#form_save_rts").show();

                                                });

                                            self.tablefamily.show(self.tableFamiliarView);



                                        });
                                        $("#fam-advertencia").removeClass("alert-warning");
                                        $("#fam-advertencia").removeClass("alert-danger");
                                        $("#fam-advertencia").addClass("alert-success");
                                        $("#fam-advertencia").html("<strong>Se actualizo con éxito los Datos Familiares</strong>");
                                        $("#fam-advertencia").show();
                                    }
                                    else{
                                        if($("#tip_benef_fam").val()=="0"){
                                            $("#fam-advertencia").removeClass("alert-success");
                                            $("#fam-advertencia").removeClass("alert-danger");
                                            $("#fam-advertencia").addClass("alert-warning");
                                            $("#fam-advertencia").html("<strong>Seleccione Tipo de Beneficio</strong>");
                                            $("#fam-advertencia").show();
                                        }
                                        else{
                                            if($("#lega_tip_pago").val()=="0"){
                                                $("#fam-advertencia").removeClass("alert-success");
                                                $("#fam-advertencia").removeClass("alert-danger");
                                                $("#fam-advertencia").addClass("alert-warning");
                                                $("#fam-advertencia").html("<strong>Seleccione Tipo de Pago</strong>");
                                                $("#fam-advertencia").show();
                                            }else{
                                                if($("#lega_tip_pago").val()=="1"){

                                                    if($("#numcuenta").val()!=""){

                                                        var beneficio=$("#beneficio").val();

                                                        self.model.get("editdatosfamiliares").set({
                                                            "cargfamnom": $("#ap_paterno").val()+" "+$("#ap_materno").val()+" "+ $("#legaj_nom_ape").val(),
                                                            "cargfampar": $("#leg_tip_parent").val(),
                                                            "cargfamdir": $("#legaj_domici").val(),
                                                            "cargfamdoc": "0",
                                                            "cargfamnumdoc": $("#serv_ape_pat").val(),
                                                            "cargfamsex": sex_fam,
                                                            "cargfamfechnac": $("#legaj_naci").val(),
                                                            "cargfamtel": $("#lega_tel").val(),
                                                            "cargfamrestciv": $("#leg_est_civil").val(),
                                                            "cargfamben": benef_fam,
                                                            "cargfamnumessal": $("#lega_seguro").val(),
                                                            "cargfamdep": depen_fam,
                                                            "cargfamcodser": $("#id-servidor").text(),
                                                            "cargfamsec":$('#idfamiliar').text()
                                                        });

                                                        self.model.get("editdatosfamiliares").url = "api/legajos/editDatosFamiliares";

                                                        var self_s = self.model.get("editdatosfamiliares").save({}, { wait: true});

                                                        self_s.done(function(){
                                                        });
                                                        self_s.fail(function(){
                                                            self.model.get("updatebenefam").set({
                                                                "titularcuenta":$('#titularcuenta').val(),
                                                                "tipbeneficio":$("#tip_benef_fam").val(),
                                                                "codresol":$("#fam-resolucion").val(),

                                                                "numcuenta":$('#numcuenta').val(),
                                                                "tipopago":$('#lega_tip_pago').val(),
                                                                "cargfamsec":$('#idfamiliar').text()
                                                            });

                                                            self.model.get("updatebenefam").url = "api/legajos/updateBenef";

                                                            var self_s = self.model.get("updatebenefam").save({}, { wait: true});

                                                            self_s.done(function(){

                                                                self.tableFamiliarView.fetchFamiliares(self.codigo,
                                                                    function () {
                                                                        $("#table-familiare-servidor").dataTable();
                                                                        $('#table-familiare-servidor_wrapper').append("<div id='footer-table'></div>");
                                                                        $('#table-familiare-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                                        $('#table-familiare-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                                        $('.dataTables_filter input').attr('placeholder','Buscar..');
                                                                    });

                                                                self.tablefamily.show(self.tableFamiliarView);


                                                            });
                                                            self_s.fail(function(){

                                                                self.tableFamiliarView.fetchFamiliares(self.codigo,
                                                                    function () {
                                                                        $("#table-familiare-servidor").dataTable();
                                                                        $('#table-familiare-servidor_wrapper').append("<div id='footer-table'></div>");
                                                                        $('#table-familiare-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                                        $('#table-familiare-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                                        $('.dataTables_filter input').attr('placeholder','Buscar..');
                                                                        $("#legaj_nom_ape").val("");
                                                                        $("#ap_paterno").val("");
                                                                        $("#ap_materno").val("");
                                                                        $("#legaj_domici").val("");
                                                                        $("#serv_ape_pat").val("");
                                                                        $("#lega_tel").val("");
                                                                        $("#legaj_naci").val("");
                                                                        $("#lega_seguro").val("");
                                                                        $("#leg_tip_parent").val("0").trigger('change');
                                                                        $("#leg_est_civil").val("0").trigger('change');
                                                                        $("#leg_tip_document").val("0").trigger('change');
                                                                        $("#depen").val("000").trigger('change');
                                                                        $("#sexo").val("0").trigger('change');
                                                                        $("#beneficio").val("000").trigger('change');

                                                                        $("#form_edit_rts").hide();
                                                                        $("#form_save_rts").show();
                                                                    });

                                                                self.tablefamily.show(self.tableFamiliarView);

                                                            });
                                                        });
                                                        $("#fam-advertencia").removeClass("alert-warning");
                                                        $("#fam-advertencia").removeClass("alert-danger");
                                                        $("#fam-advertencia").addClass("alert-success");
                                                        $("#fam-advertencia").html("<strong>Se actualizo con éxito los Datos Familiares</strong>");
                                                        $("#fam-advertencia").show();

                                                    }
                                                    else{
                                                        $("#fam-advertencia").removeClass("alert-success");
                                                        $("#fam-advertencia").removeClass("alert-danger");
                                                        $("#fam-advertencia").addClass("alert-warning");
                                                        $("#fam-advertencia").html("<strong>Ingrese Numero de Cuenta</strong>");
                                                        $("#fam-advertencia").show();
                                                    }
                                                }
                                                else{


                                                    self.model.get("editdatosfamiliares").set({
                                                        "cargfamnom": $("#ap_paterno").val()+" "+$("#ap_materno").val()+" "+$("#legaj_nom_ape").val(),
                                                        "cargfampar": $("#leg_tip_parent").val(),
                                                        "cargfamdir": $("#legaj_domici").val(),
                                                        "cargfamdoc": "0",
                                                        "cargfamnumdoc": $("#serv_ape_pat").val(),
                                                        "cargfamsex": sex_fam,
                                                        "cargfamfechnac": $("#legaj_naci").val(),
                                                        "cargfamtel": $("#lega_tel").val(),
                                                        "cargfamrestciv": $("#leg_est_civil").val(),
                                                        "cargfamben": benef_fam,
                                                        "cargfamnumessal": $("#lega_seguro").val(),
                                                        "cargfamdep": depen_fam,
                                                        "cargfamcodser": $("#id-servidor").text(),
                                                        "cargfamsec":$('#idfamiliar').text()
                                                    });

                                                    self.model.get("editdatosfamiliares").url = "api/legajos/editDatosFamiliares";

                                                    var self_s = self.model.get("editdatosfamiliares").save({}, { wait: true});

                                                    self_s.done(function(){
                                                    });
                                                    self_s.fail(function(){
                                                        self.model.get("updatebenefam").set({
                                                            "titularcuenta":$('#titularcuenta').val(),
                                                            "tipbeneficio":$("#tip_benef_fam").val(),
                                                            "codresol":$("#fam-resolucion").val(),

                                                            "numcuenta":$('#numcuenta').val(),
                                                            "tipopago":$('#lega_tip_pago').val(),
                                                            "cargfamsec":$('#idfamiliar').text()
                                                        });

                                                        self.model.get("updatebenefam").url = "api/legajos/updateBenef";

                                                        var self_s = self.model.get("updatebenefam").save({}, { wait: true});

                                                        self_s.done(function(){ });
                                                        self_s.fail(function(){

                                                            self.tableFamiliarView.fetchFamiliares(self.codigo,
                                                                function () {
                                                                    $("#table-familiare-servidor").dataTable();
                                                                    $('#table-familiare-servidor_wrapper').append("<div id='footer-table'></div>");
                                                                    $('#table-familiare-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                                    $('#table-familiare-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                                                    $('.dataTables_filter input').attr('placeholder','Buscar..');
                                                                    $("#legaj_nom_ape").val("");
                                                                    $("#ap_paterno").val("");
                                                                    $("#ap_materno").val("");
                                                                    $("#legaj_domici").val("");
                                                                    $("#serv_ape_pat").val("");
                                                                    $("#lega_tel").val("");
                                                                    $("#legaj_naci").val("");
                                                                    $("#lega_seguro").val("");
                                                                    $("#leg_tip_parent").val("0").trigger('change');
                                                                    $("#leg_est_civil").val("0").trigger('change');
                                                                    $("#leg_tip_document").val("0").trigger('change');
                                                                    $("#depen").val("000").trigger('change');
                                                                    $("#sexo").val("0").trigger('change');
                                                                    $("#beneficio").val("000").trigger('change');

                                                                    $("#form_edit_rts").hide();
                                                                    $("#form_save_rts").show();
                                                                });

                                                            self.tablefamily.show(self.tableFamiliarView);

                                                        });
                                                    });
                                                    $("#fam-advertencia").removeClass("alert-warning");
                                                    $("#fam-advertencia").removeClass("alert-danger");
                                                    $("#fam-advertencia").addClass("alert-success");
                                                    $("#fam-advertencia").html("<strong>Se registro con actualizo los Datos Familiares</strong>");
                                                    $("#fam-advertencia").show();
                                                }
                                            }
                                        }




                                    }
                                }

                            }else{
                                $("#fam-advertencia").removeClass("alert-success");
                                $("#fam-advertencia").removeClass("alert-danger");
                                $("#fam-advertencia").addClass("alert-warning");
                                $("#fam-advertencia").html("<strong>El Fecha de Nacimiento debe ser menor a la Fecha Actual</strong>");
                                $("#fam-advertencia").show();
                            }













                         }
                        else{
                            $("#fam-advertencia").removeClass("alert-success");
                            $("#fam-advertencia").removeClass("alert-danger");
                            $("#fam-advertencia").addClass("alert-warning");
                            $("#fam-advertencia").html("<strong>Existen campos obligatorios incompletos</strong>");
                            $("#fam-advertencia").show();
                        }

            },

            fun_delete_fam:function(e){
                var self = this;

                var url='api/legajos/deleteFamiliar/'+self.id_familiar;

                $.ajax({
                    type: 'DELETE',
                    url: url,
                    success: function(){

                        self.tableFamiliarView.fetchFamiliares(self.codigo,
                            function () {
                                $("#table-familiare-servidor").dataTable();
                                $('#table-familiare-servidor_wrapper').append("<div id='footer-table'></div>");
                                $('#table-familiare-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                $('#table-familiare-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                $('.dataTables_filter input').attr('placeholder','Buscar..');
                            });

                        self.tablefamily.show(self.tableFamiliarView);

                    },
                    error: function(){


                        self.tableFamiliarView.fetchFamiliares(self.codigo,
                            function () {
                                $("#table-familiare-servidor").dataTable();
                                $('#table-familiare-servidor_wrapper').append("<div id='footer-table'></div>");
                                $('#table-familiare-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                $('#table-familiare-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                $('.dataTables_filter input').attr('placeholder','Buscar..');
                            });
                        self.tablefamily.show(self.tableFamiliarView);

                    }
                });

            },
            bvmodal:function(e){
                var clickedElement=$(e.currentTarget);
                this.id_familiar=clickedElement.parent().parent().attr('dataid');

            },
            avmodal:function(ev){


                var element = $(ev.currentTarget);
                this.id_est_delete =element.parent().parent().attr('id');

            },


            avmodal2:function(ev){

                var element = $(ev.currentTarget);
                this.id_tyrs_delete=element.parent().parent().attr('id');

            },

            limpiar_navtab:function(){
                 $("#fam-advertencia").hide();
            }
        });
    });
    return ErzaManager.LegajosApp.Form.View;
});