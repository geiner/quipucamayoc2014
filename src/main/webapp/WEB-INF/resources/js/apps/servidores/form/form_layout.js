define(["app", "hbs!apps/servidores/form/templates/servidoresLayout", 'lib/bootstrap-datepicker', 'lib/bootstrap-tab', 'apps/servidores/form/view/estadosciviles-view',
    'apps/servidores/form/view/tiposdocumento-view', 'apps/servidores/form/view/nacpaises-view', "apps/servidores/form/view/nacdepartamento-view", "apps/servidores/form/view/nacprovincia-view",
    "apps/servidores/form/view/nacdistrito-view", "apps/servidores/form/view/actdepartamento-view", "apps/servidores/form/view/actprovincia-view", "apps/servidores/form/view/actdistrito-view",
    'apps/servidores/form/view/servidorEstado-view', 'apps/servidores/form/view/categoriaServidor-view', 'apps/servidores/form/view/servidorgenericos-view', 'apps/servidores/form/view/servidorTipo-view',
    'apps/servidores/form/view/regimenPensionario-view', 'apps/servidores/form/view/entidadAseguradora-view', 'apps/servidores/form/view/estadosAFP-view',
    'apps/servidores/form/view/tipoPago-view', 'apps/servidores/form/view/condicionPlanilla-view', 'apps/servidores/form/view/tiposOcupaciones_view', "apps/servidores/form/model/servidor",
    'apps/servidores/form/model/servidorLaboral','apps/resoluciones/form/view/servidor-view', "lib/bootstrap-datepicker", "lib/typeahead.min","lib/jquery.dataTables.min", "bootstrap"],
    function (ErzaManager, layoutTpl, datepicker, tab, estadoCivilView, tipoDocumentoView, paisNacimientoView, deptNacimientoView, provNacimientoView, distrNacimientoView, deptActualView,
              provActualView, distrActualView, servidorEstadoView, categoriaServidorView, servidorGenericoView, servidorTipoView, regimenPensionView, entidadAseguradoraView, estadoAFPView,
              tipoPagoView, condicionPlanillaView, tipoOcupacionView, Servidor, ServidorLaboral,listaServView) {
        ErzaManager.module('ServidoresApp.Form.View', function (View, ErzaManager, Backbone, Marionette, $, _) {

            View.Layout = Marionette.Layout.extend({
                template: layoutTpl,
                estadosCivilesView: new estadoCivilView(),
                tiposDocumentoView: new tipoDocumentoView(),
                paisNacimientoView: new paisNacimientoView(),
                deptNacimientoView: new deptNacimientoView(),
                provNacimientoView: new provNacimientoView(),
                distrNacimientoView: new distrNacimientoView(),
                deptActualView: new deptActualView(),
                provActualView: new provActualView(),
                distrActualView: new distrActualView(),
                servidoresEstadoView: new servidorEstadoView(),
                CategoriaServidorView: new categoriaServidorView(),
                servidorGenericosView: new servidorGenericoView(),
                ServidorTipoView: new servidorTipoView(),
                regimenesPensionesView: new regimenPensionView(),
                entidadesAseguradoraView: new entidadAseguradoraView(),
                estadosAFP: new estadoAFPView(),
                tipoPago: new tipoPagoView(),
                CondicionPlanView: new condicionPlanillaView(),
                tipoOcupacionView: new tipoOcupacionView(),
                listaServView: new listaServView(),

                tab:0,
                prov_act: null,
                distr_act: null,
                cod_paisNac: 120,
                guar_o_actu:0,//0 guarda - 1 actualiza I.General
                guar_o_actu2:0,//guarda o actualiza I.laboral
                regions: {
                    div_estados_civiles: "#serv_est_civ",
                    div_nac_paises: "#serv_nac_paises",
                    div_tipos_documentos: "#serv_tip_doc",
                    div_nac_dept: "#serv_nac_dept",
                    div_nac_prov: "#serv_nac_provinc",
                    div_nac_distr: "#serv_nac_distr",
                    div_act_dept: "#serv_act_dept",
                    div_act_prov: "#serv_act_prov",
                    div_act_distr: "#serv_act_distr",
                    div_serv_estado: "#div_serv_est",
                    div_categoria_servidor: "#div_serv_cat",
                    div_serv_gene: "#div_serv_gen",
                    div_servidor_tipo: "#div_serv_tip",
                    div_reg_pension: "#div_rpe",
                    div_ent_aseguradora: "#div_ent_aseg",
                    div_estado_apf: "#div_est_afp",
                    div_tipo_pago: "#div_tip_pag",
                    div_condicion_plan: "#div_cond_pla",
                    div_tipos_ocupaciones: "#div_tip_ocup",
                    listServ: "#list_servidores"

                },
                events: {
                    "click #reg_pen_clos":"limpiar_reg_pen_clos",
                    "click  #serv_ing_unmsm_clos": "limpiar_ing_unmsm",
                    "click #serv_nac_clos": "limipiar_fecha_nac",
                    "click #serv_nac_show": "show_fech_nac",
                    "click #serv_ing_unmsm_show": "serv_ingunmsm_show",
                    "click #save_servidor": "serv_save_servidor",
                    "change #nacdepartamento": "serv_nacdepartamento",
                    "change #serv_nac_provincia": "serv_nacprovin",
                    "change #actdepartamento": "serv_actdepartamento",
                    "change #serv_act_provincia": "serv_actprovincia",
                    "change #serv_gen": "fun_serv_tip",
                    "change #rpe": "fun_lis_ent_aseg",
                    "change #tip_pag": "fun_cue_ban",
                    "change #serv_tip": "fun_cambiar_categoria",
                    "click #reg_pen_show": "fun_reg_pen_show",
                    "click #reg_lab_clos": "fun_reg_lab_clos",
                    "click #reg_lab_show": "fun_reg_lab_show",
                    "click #cod_sea": "lista_servidor",
//                    "click #cod_sea": "fun_search_servidor",
                    "click #save_laborales": "save_serv_lab",
                    "change #serv_act_pais":"fun_camb_pais_resid",
                    "click .tab_a":"fun_camb_tab_a",
                    "click .tab_b":"fun_camb_tab_b",
                    "keyup :input#codigo":"fun_validar_codigo",
                    "click #cancel_servidor":"cancelar_inf_gen",
                    "click #cancel_laboral":"cancelar_inf_gen",
                    "click #table-servidor > tbody >tr": "hide_lista_serv",
                    "click .day":"ocultar"


                },
                onRender: function () {

                    this.initialFetch();

                    this.div_estados_civiles.show(this.estadosCivilesView);
                    this.div_nac_paises.show(this.paisNacimientoView);
                    this.div_nac_dept.show(this.deptNacimientoView);
                    this.div_tipos_documentos.show(this.tiposDocumentoView);
                    this.div_act_dept.show(this.deptActualView);
                    this.div_serv_estado.show(this.servidoresEstadoView);

                    this.div_categoria_servidor.show(this.CategoriaServidorView);

                    this.div_serv_gene.show(this.servidorGenericosView);

                    this.div_servidor_tipo.show(this.ServidorTipoView);

                    this.div_reg_pension.show(this.regimenesPensionesView);

                    this.div_ent_aseguradora.show(this.entidadesAseguradoraView);

                    this.div_estado_apf.show(this.estadosAFP);

                    this.div_tipo_pago.show(this.tipoPago);

                    this.div_condicion_plan.show(this.CondicionPlanView);

                    this.div_tipos_ocupaciones.show(this.tipoOcupacionView);


                },
                initialize: function () {
                    this.model = new Backbone.Model();

                    this.model.set({
                        "servidor": new Servidor(),
                        "servidorlaboral": new ServidorLaboral()
                    });
                },
                initialFetch: function () {
                    var self = this;
                    this.listaServView.fetchServidores();
                    this.estadosCivilesView.fetchEstCivil();
                    this.tiposDocumentoView.fetchTipoDocument();
                    this.paisNacimientoView.fetchNacPais(function () {
                        var callbacks = $.Callbacks();
                        var paises = new Array();
                        var codpaises = new Array();


                        callbacks.add(one);
                        callbacks.add(two);
                        callbacks.add(three);
                        callbacks.fire();
                        callbacks.remove(one);
                        callbacks.remove(two);
                        function one() {
                            for (var i = 0; i < 272; i++) {
                                codpaises[i] = $("ul#lista li:nth-child(" + (i + 1) + ")").attr("id");
                                paises[i] = $("ul#lista li:nth-child(" + (i + 1) + ")").text();


                            }
                        }

                        function two() {
                            $("input.typeahead").typeahead({
                                name: "accounts",

                                local: paises
                            });
                        }

                        function three() {


                            $("#autocom").keyup(function () {

                                for (var i = 0; i < 272; i++) {



                                    if ($("#autocom").val() == "PERÚ" || $("#autocom").val().toUpperCase() == "PERU") {

                                        $("#autocom").val("PERÚ");
                                        $("#div_domic").hide();
                                        $("#div_nac").show();

                                        for (var i = 0; i < 272; i++) {
                                            if (paises[i] == $("#autocom").val()) {

                                                $("#autocom").attr("data", codpaises[i]);
                                            }
                                        }

                                    }
                                    else {
                                        $("#autocom").val($("#autocom").val().toUpperCase());
                                        $("#div_nac").hide();
                                        $("#div_domic").show();

                                        for (var i = 0; i < 272; i++) {
                                            if (paises[i] == $("#autocom").val()) {

                                                $("#autocom").attr("data", codpaises[i]);
                                            }
                                        }

                                    }

                                }


                            });
                        }
                    });
                    this.deptNacimientoView.fetchNacDepart();
                    this.deptActualView.fetchActDepart();
                    this.servidoresEstadoView.initialize();
                    this.CategoriaServidorView.fetchCategoria(4);
                    this.servidorGenericosView.initialize(
                        function () {
                            self.ServidorTipoView.findByTipGen(self.servidorGenericosView.collection.at(0).get("cod"));
                            var temp_helps = $("[id^='help_']");

                            temp_helps.hide();
                            temp_helps.width($("#codigo").width());
                        }
                    );
                    this.ServidorTipoView.initialize();
                    this.regimenesPensionesView.initialize(
                        function () {
                            self.entidadesAseguradoraView.findByRpe(self.regimenesPensionesView.collection.at(0).get("cod"),
                                function () {
                                    if (self.entidadesAseguradoraView.collection.length == 0)
                                        $("#row_reg_pen").hide();
                                    else
                                        $("#row_reg_pen").show();
                                    $("#ent_aseg").val(self.model.get("servidorlaboral").get("entAse"));
                                }
                            );

                            self.estadosAFP.findByRpe(self.regimenesPensionesView.collection.at(0).get("cod"),
                                function () {
                                    if (self.estadosAFP.collection.length == 0)
                                        $("#div_est_afp").hide();
                                    else
                                        $("#div_est_afp").show();
                                    $("#est_afp").val(self.model.get("servidorlaboral").get("estAfp"));
                                }
                            );


                            var temp_num_sis_pri_pen = $("#num_sis_pri_pen");

                            temp_num_sis_pri_pen.val(null);

                            if (self.regimenesPensionesView.collection.at(0).get("cod") == 4)
                                temp_num_sis_pri_pen.parent().parent().parent().show();
                            else
                                temp_num_sis_pri_pen.parent().parent().parent().hide();

                        });
                    this.entidadesAseguradoraView.initialize();
                    this.estadosAFP.initialize();
                    this.tipoPago.initialize(

                    );
                    this.CondicionPlanView.initialize();
                    this.tipoOcupacionView.initialize();

                },
                ocultar:function(){
                    alert("sgrfs")
                    console.log("hola")
                    $('.datepicker').hide();
                },
                limpiar_ing_unmsm: function () {
                    $("#serv_ing_unmsm").val("");
                },
                limpiar_reg_pen_clos:function(){
                    $("#reg_pen").val("");
                },
                limipiar_fecha_nac: function () {
                    $("#serv_nac").val("");
                },
                cancelar_inf_gen:function(){
                  $('#codigo').val("");
                  this.initialFetch();
                  $("#block-descr_serv").hide();

//                    this.fun_validar_codigo();
                },
                serv_actprovincia: function () {
                    var self = this;

                    var act_dep = $('#actdepartamento').val();
                    var act_pro = $('#serv_act_provincia').val();


                    self.distrActualView.fetchActDistritos(act_dep, act_pro, function () {
                        self.div_act_distr.show(self.distrActualView);
                        if (self.distrActualView.collection.length == 0) {

                            $("#serv_act_distr").hide();
                        }
                        else {
                            if (this.distr_act == null) {

                            }
                            else {
                                $("#serv_act_distrito").val(this.distr_act);
                            }
                            $("#serv_act_distr").show();
                        }
                    });
                },
                Comparar_Fecha: function (fecha, fecha2) {
                    var xMonth = fecha.substring(3, 5);
                    var xDay = fecha.substring(0, 2);
                    var xYear = fecha.substring(6, 10);
                    var yMonth = fecha2.substring(3, 5);
                    var yDay = fecha2.substring(0, 2);
                    var yYear = fecha2.substring(6, 10);

                    if (parseInt(xYear) > parseInt(yYear)) {
                        return(true)
                    }
                    else {
                        if (parseInt(xYear) == parseInt(yYear)) {
                            if (parseInt(xMonth) > parseInt(yMonth)) {
                                return(true)
                            }
                            else {
                                if (parseInt(xMonth) == parseInt(yMonth)) {
                                    if (parseInt(xDay) > parseInt(yDay))
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
                fun_camb_pais_resid :function(){
                    if($('#serv_act_pais').val()=="101"){
                        $('#serv_act_dept').hide();
                        $('#serv_act_prov').hide();
                        $('#serv_act_distr').hide();
                    };
                    if($('#serv_act_pais').val()=="100"){
                        $('#serv_act_dept').show();
                    };
                },
                insertar_inf_per_servidor:function(){
                    $('#advertencia').hide();
                    var self=this;
                    if($("#nacdepartamento").val()==""){

                     self.model.get("servidor").set({
                     "codigo":$("#codigo").val(),
                     "paterno": $("#serv_ape_pat").val(),
                     "materno": $("#serv_ape_mat").val(),
                     "nombre":$("#serv_nom").val(),
                     "estCiv":$("#serv_est_civil").val(),
                     "tipoDoc":$("#serv_tip_docu").val(),
                     "numDoc":$("#num_document").val(),
                     "sexo":$("#serv_sexo").val(),
                     "nacimiento":$("#serv_nac").val(),
                     "paisNac":$("#autocom").attr("data"),
                     "codNacdepart":"0",
                     "codNacprov":"0",
                     "codNacditr":"0",
                     "paisDomcilio":$("#serv_act_pais").val(),
                     "codDepartamento":$("#actdepartamento").val(),
                     "codProvincia":$("#serv_act_provincia").val(),
                     "codDistrito":$("#serv_act_distrito").val(),
                     "domicilio":$("#ser_act_domi").val(),
                     "estVit":$("#serv_est_vit").val(),
                     "hij":$("#serv_car_fam").val(),
                     "ruc":$("#serv_ruc").val(),
                     "espfdom":$("#serv_espf_dom").val(),
                     "discapacidad":$("#serv_disc").val(),
                     "fechaInUnmsm":$("#serv_ing_unmsm").val(),
                     "telefono":$("#serv_tel").val(),
                     "celular":$("#serv_cel").val(),
                     "correo":$("#serv_correo").val()


                     });


                     }
                     else{
                     self.model.get("servidor").set({
                     "codigo":$("#codigo").val(),
                     "paterno": $("#serv_ape_pat").val(),
                     "materno": $("#serv_ape_mat").val(),
                     "nombre":$("#serv_nom").val(),
                     "estCiv":$("#serv_est_civil").val(),
                     "tipoDoc":$("#serv_tip_docu").val(),
                     "numDoc":$("#num_document").val(),
                     "sexo":$("#serv_sexo").val(),
                     "nacimiento":$("#serv_nac").val(),
                     "paisNac":$("#autocom").attr("data"),
                     "codNacdepart":$("#nacdepartamento").val(),
                     "codNacprov":$("#serv_nac_provincia").val(),
                     "codNacditr":$("#serv_nac_distrito").val(),
                     "paisDomcilio":$("#serv_act_pais").val(),
                     "codDepartamento":$("#actdepartamento").val(),
                     "codProvincia":$("#serv_act_provincia").val(),
                     "codDistrito":$("#serv_act_distrito").val(),
                     "domicilio":$("#ser_act_domi").val(),
                     "estVit":$("#serv_est_vit").val(),
                     "hij":$("#serv_car_fam").val(),
                     "ruc":$("#serv_ruc").val(),
                     "espfdom":$("#serv_espf_dom").val(),
                     "discapacidad":$("#serv_disc").val(),
                     "fechaInUnmsm":$("#serv_ing_unmsm").val(),
                     "telefono":$("#serv_tel").val(),
                     "celular":$("#serv_cel").val(),
                     "correo":$("#serv_correo").val()


                     });

                     }
                    console.log(self.guar_o_actu+"estoooooooooooo")
                     if(self.guar_o_actu==0){
                         self.model.get("servidor").url = "rest/cas/serv/servidor";
                         var self_s = self.model.get("servidor").save({}, { wait: true});

                         self_s.done(function(){
                             $('#serv_save').html('<strong>la Informacion General se guardo correctamente</strong>')
                             $('#serv_save').show()
                         });
                         self_s.fail(function(){
                             $('#serv_save').html('<strong>la Informacion General se guardo correctamente</strong>')
                             $('#serv_save').show()
                         });
                     }else{
                         self.model.get("servidor").url = "rest/cas/serv/updateservidor";
                         var self_s = self.model.get("servidor").save({}, { wait: true});

                         self_s.done(function(){
                             $('#serv_save').html('<strong>la Informacion General se actualizo correctamente</strong>')
                             $('#serv_save').show()
                         });
                         self_s.fail(function(){
                             $('#serv_save').html('<strong>la Informacion General se actualizo correctamente</strong>')
                             $('#serv_save').show()
                         });
                     }

                },
                serv_save_servidor:function () {
                    var self = this;
                    var fullDate = new Date();
                    var dia=fullDate.getDate()+"";
                    var mes=(fullDate.getMonth()+1)+"";
                    var anio=fullDate.getFullYear()+"";
                    if(dia.length==1){
                        dia='0'+fullDate.getDate();
                    }
                    if(mes.length==1){
                        mes='0'+(fullDate.getMonth()+1);
                    }
                    var currentDate = dia + "/" + mes + "/" + anio;
                    console.log(currentDate)
                    if($('#codigo').val() != "" & !isNaN($('#codigo').val())){
                        if ($('#serv_ape_pat').val() != "" & $('#serv_ape_mat').val() != "" & $('#serv_nom').val() != "" &
                            $('#serv_est_civil').val() != "99" & $('#serv_tip_docu').val() != "99" & $('#num_document').val() != "" & $('#serv_sexo').val() != "99") {

                            if ($('#serv_nac').val() != "" & self.Comparar_Fecha(currentDate, $('#serv_nac').val()) & $('#autocom').val()!="") {
                                if($('#autocom').val()=="PERÚ"){
                                    if($('#nacdepartamento').val()!="99"){
                                        if($('#serv_act_pais').val()=="101" & $('#ser_act_domi').val()!=""){
                                            if($('#serv_car_fam').val()!="" & $('#serv_ruc').val()!=""){
                                                if($('#serv_nac').val() != "" & self.Comparar_Fecha(currentDate, $('#serv_ing_unmsm').val())){
                                                    self.insertar_inf_per_servidor();
                                                }else{
                                                    $('#advertencia').addClass("alert-warning");
                                                    $('#advertencia').html('<strong>La fecha de ingreso a la universidad  esta mal ingresada</strong>')
                                                    $('#advertencia').show();
                                                }
                                            }else{
                                                $('#advertencia').addClass("alert-warning");
                                                $('#advertencia').html('<strong>Existen datos obligatorios en Datos Actuales</strong>')
                                                $('#advertencia').show();
                                            }
                                        }else
                                        if($('#serv_act_pais').val()=="100" & $('#ser_act_domi').val()!="" & $('#actdepartamento').val()!="99"){
                                            if($('#serv_car_fam').val()!="" & $('#serv_ruc').val()!=""){
                                                if($('#serv_nac').val() != "" & self.Comparar_Fecha(currentDate, $('#serv_ing_unmsm').val())){
                                                    self.insertar_inf_per_servidor();
                                                }else{
                                                    $('#advertencia').addClass("alert-warning");
                                                    $('#advertencia').html('<strong>La fecha de ingreso a la universidad esta mal ingresada</strong>')
                                                    $('#advertencia').show();
                                                }
                                            }else{
                                                $('#advertencia').addClass("alert-warning");
                                                $('#advertencia').html('<strong>Existen datos obligatorios en Datos Actuales</strong>')
                                                $('#advertencia').show();
                                            }
                                        }else{
                                            $('#advertencia').addClass("alert-warning");
                                            $('#advertencia').html('<strong>Datos del lugar de Residencia incorrectos</strong>')
                                            $('#advertencia').show();
                                        };

                                    }else{
                                        $('#advertencia').addClass("alert-warning");
                                        $('#advertencia').html('<strong>Datos de nacimiento incorrectos</strong>')
                                        $('#advertencia').show();
                                    }
                                }else{
                                    if($('#serv_espf_dom').val()!=""){
                                        if($('#serv_act_pais').val()=="101" & $('#ser_act_domi').val()!=""){
                                            if($('#serv_car_fam').val()!="" & $('#serv_ruc').val()!=""){
                                                if($('#serv_nac').val() != "" & self.Comparar_Fecha(currentDate, $('#serv_ing_unmsm').val())){
                                                    self.insertar_inf_per_servidor();
                                                }else{
                                                    $('#advertencia').addClass("alert-warning");
                                                    $('#advertencia').html('<strong>La fecha de ingreso a la universidad esta mal ingresada</strong>')
                                                    $('#advertencia').show();
                                                }
                                            }else{
                                                $('#advertencia').addClass("alert-warning");
                                                $('#advertencia').html('<strong>Existen datos obligatorios en Datos Actuales</strong>')
                                                $('#advertencia').show();
                                            }
                                        }else
                                        if($('#serv_act_pais').val()=="100" & $('#ser_act_domi').val()!="" & $('#serv_act_provincia').val()!=""){
                                            if($('#serv_car_fam').val()!="" & $('#serv_ruc').val()!=""){
                                                if($('#serv_nac').val() != "" & self.Comparar_Fecha(currentDate, $('#serv_ing_unmsm').val())){
                                                    self.insertar_inf_per_servidor();
                                                }else{
                                                    $('#advertencia').addClass("alert-warning");
                                                    $('#advertencia').html('<strong>La fecha de ingreso a la universidad esta mal ingresada</strong>')
                                                    $('#advertencia').show();
                                                }
                                            }else{
                                                $('#advertencia').addClass("alert-warning");
                                                $('#advertencia').html('<strong>Existen datos obligatorios en Datos Actuales</strong>')
                                                $('#advertencia').show();
                                            }
                                        }else{
                                            $('#advertencia').addClass("alert-warning");
                                            $('#advertencia').html('<strong>Datos del lugar de Residencia incorrectos</strong>')
                                            $('#advertencia').show();
                                        };
                                    }else{
                                        $('#advertencia').addClass("alert-warning");
                                        $('#advertencia').html('<strong>Datos de nacimiento incorrectos</strong>')
                                        $('#advertencia').show();
                                    }
                                }
                            } else {
                                $('#advertencia').addClass("alert-warning");
                                $('#advertencia').html('<strong>Datos de nacimiento incorrectos</strong>')
                                $('#advertencia').show();
                            }


                        } else {
                            $('#advertencia').addClass("alert-warning");
                            $('#advertencia').html('<strong>La Informacion principal esta mal ingresada</strong>')
                            $('#advertencia').show();
                        }
                    }else{
                        $('#advertencia').addClass("alert-warning");
                        $('#advertencia').html('<strong>Debe Ingresar el codigo del servidor</strong>')
                        $('#advertencia').show();
                    }


                },
                serv_nacprovin: function () {
                    var self = this;

                    var act_dep = $('#nacdepartamento').val();
                    var act_pro = $('#serv_nac_provincia').val();


                    self.distrNacimientoView.fetchNacDistritos(act_dep, act_pro, function () {
                        self.div_nac_distr.show(self.distrNacimientoView);
                        if (self.distrNacimientoView.collection.length == 0) {

                            $("#serv_nac_distr").hide();
                        }
                        else {

                            $("#serv_nac_distr").show();
                        }
                    });

                },
                serv_actdepartamento: function () {
                    var self = this;
                    var act_dep = $("#actdepartamento").val();

                    self.provActualView.fetchActProvincias(act_dep, function () {
                        self.div_act_prov.show(self.provActualView);

                        if (self.provActualView.collection.length == 0) {

                            $("#serv_act_prov").hide();
                        }
                        else {

                            if (this.prov_act == null) {

                            }
                            else {
                                $("#serv_act_provincia").val(this.prov_act);

                            }
                            $("#serv_act_prov").show();
                            $('#serv_act_provincia').trigger('change');
                        }
                    });

                },
                serv_nacdepartamento: function () {
                    var self = this;
                    var act_dep = $('#nacdepartamento').val();


                    self.provNacimientoView.fetchNacProvincias(act_dep, function () {
                        self.div_nac_prov.show(self.provNacimientoView);
                        if (self.provNacimientoView.collection.length == 0) {

                            $("#serv_nac_provinc").hide();
                        }
                        else {

                            $("#serv_nac_provinc").show();
                            $('#serv_nac_provincia').trigger('change');
                        }

                    });

                },
                show_fech_nac: function () {


                    var serv_nac = $('#serv_nac');

                    serv_nac.datepicker({
                        format: 'dd/mm/yyyy',
                        viewMode: 2
                    });

                    serv_nac.datepicker('show');
                },
                fun_serv_tip: function (ev) {
                    var self = this;
                    var temp_cod_tip_gen = $("#serv_gen").val();

                    this.ServidorTipoView.findByTipGen(temp_cod_tip_gen, function () {
                        self.CategoriaServidorView.fetchCategoria(self.ServidorTipoView.collection.at(0).get("cod"));
                    });

                },
                fun_lis_ent_aseg: function (ev) {

                    var self = this;
                    var reg_pen = $("#rpe").val();

                    this.entidadesAseguradoraView.findByRpe(reg_pen, function () {
                        if (self.entidadesAseguradoraView.collection.length == 0)
                            $("#ent_aseg").parent().parent().hide();
                        else
                            $("#ent_aseg").parent().parent().show();
                    });

                    this.estadosAFP.findByRpe(reg_pen, function () {
                        if (self.estadosAFP.collection.length == 0)
                            $("#div_est_afp").hide();
                        else
                            $("#div_est_afp").show();
                    });

                    var temp_num_sis_pri_pen = $("#num_sis_pri_pen");

                    temp_num_sis_pri_pen.val(null);

                    if (reg_pen == 4)
                        temp_num_sis_pri_pen.parent().parent().parent().show();
                    else
                        temp_num_sis_pri_pen.parent().parent().parent().hide();

                },
                fun_cue_ban: function (ev) {

                    var temp_cue_ban = $("#cta_ban");
                    var tem_tit_ban=$('#serv_tit_ban');

                    temp_cue_ban.val(null);

                    if ($("#tip_pag").val() == 1){
                        temp_cue_ban.parent().parent().show();
                        tem_tit_ban.parent().parent().show();
                    }
                    else{
                        temp_cue_ban.parent().parent().hide();
                        tem_tit_ban.parent().parent().hide();
                    }
                },
                fun_reg_pen_show: function () {
                    var temp_reg_pen = $('#reg_pen');

                    temp_reg_pen.datepicker({
                        format: 'dd/mm/yyyy',
                        viewMode: 2
                    });

                    temp_reg_pen.datepicker('show');
                },

                fun_reg_lab_clos: function (ev) {

                    $('#reg_lab').val("");

                },

                fun_reg_lab_show: function (ev) {

                    var temp_reg_lab = $('#reg_lab');

                    temp_reg_lab.datepicker({
                        format: 'dd/mm/yyyy',
                        viewMode: 2
                    });

                    temp_reg_lab.datepicker('show');
                },
                fun_cambiar_categoria: function () {
                    var tem_tipo = $('#serv_tip').val();

                    this.CategoriaServidorView.fetchCategoria(tem_tipo);
                },
                serv_ingunmsm_show: function () {

                    var serv_ing_unmsm = $('#serv_ing_unmsm');

                    serv_ing_unmsm.datepicker({
                        format: 'dd/mm/yyyy',
                        viewMode: 2
                    });

                    serv_ing_unmsm.datepicker('show');
                },
                ingresar_datos_laborales:function(){
                    var self=this;
                    var codigo = $("#codigo").val();


                    this.model.get("servidorlaboral").set({
                        "cod": codigo,
                        "estLab": $("#serv_est").val(),
                        "tipGen": $("#serv_gen").val(),
                        "tip": $("#serv_tip").val(),
                        "cat": $("#serv_cat").val(),
                        "regPen": $("#rpe").val(),
                        "entAse": $("#ent_aseg").val(),
                        "estAfp": $("#est_afp").val(),
                        "numPen": $("#num_sis_pri_pen").val(),
                        "tipPag": $("#tip_pag").val(),
                        "cueBan": $("#cta_ban").val(),
                        "titcueBan": $("#serv_tit_ban").val(),
                        "conPla": $("#cond_pla").val(),
                        "regLab": $("#reg_lab").val(),
                        "insregpen": $("#reg_pen").val(),
                        "tipocupuni": $("#serv_tip_ocup").val(),
                        "sindic": $("#serv_sind").val()
                    });
                    if(self.guar_o_actu2==0){
                        self.model.get("servidorlaboral").url = "rest/cas/serv/servidorlaboral";


                        var self_l = self.model.get("servidorlaboral").save({}, {wait: true});

                        self_l.done(function () {

                            var temp_serv_save = $("#serv_save");

                            temp_serv_save.show();
                            temp_serv_save.text("Datos laborales registrados!");


                        });

                        self_l.fail(function () {

                            var temp_serv_cod = $("#serv_cod");

                            temp_serv_cod.removeClass('alert-warning');
                            temp_serv_cod.addClass('alert-danger');
                            temp_serv_cod.show();
                            temp_serv_cod.text("Error de registro laboral.!");


                        });
                    }else{
                        self.model.get("servidorlaboral").url = "rest/cas/serv/updateservidorlaboral";


                        var self_l = self.model.get("servidorlaboral").save({}, {wait: true});

                        self_l.done(function () {

                            var temp_serv_cod = $("#serv_cod");

                            temp_serv_cod.removeClass('alert-warning');
                            temp_serv_cod.addClass('alert-danger');
                            temp_serv_cod.show();
                            temp_serv_cod.text("Error en la actualizacion laboral.!");
                        });

                        self_l.fail(function () {

                            var temp_serv_save = $("#serv_save");

                            temp_serv_save.show();
                            temp_serv_save.text("Datos laborales actualizados!");


                        });
                    }

                },
                save_serv_lab: function () {
                    var self = this;
                    var fullDate = new Date();
                    var dia=fullDate.getDate()+"";
                    var mes=(fullDate.getMonth()+1)+"";
                    var anio=fullDate.getFullYear()+"";
                    if(dia.length==1){
                        dia='0'+fullDate.getDate();
                    }
                    if(mes.length==1){
                        mes='0'+(fullDate.getMonth()+1);
                    }
                    var currentDate = dia + "/" + mes + "/" + anio;

                    if($("#serv_est").val()!="999" & $("#serv_gen").val()!="999" & $("#serv_tip").val()!="999" & $("#serv_cat").val()!="999" & $("#rpe").val()!="999" & $('#codigo').val()!="" ){

                        if($("#rpe").val()=="5" || $("#rpe").val()=="6"){
                           if($('#tip_pag').val()!="999"){
                               if($('#tip_pag').val()=="1" & $('#cta_ban').val()!="" ){
                                   if($('#cond_pla').val()!="999"){
                                       if ($('#reg_lab').val() != "" & self.Comparar_Fecha(currentDate, $('#reg_lab').val()) ) {
                                           if ($('#reg_pen').val() != "" & self.Comparar_Fecha(currentDate, $('#reg_pen').val()) ) {
                                               if($('#serv_tip_ocup').val()!="999"){
                                                   self.ingresar_datos_laborales();
                                               }
                                           }
                                       }
                                   }
                               };
                               if($('#tip_pag').val()=="2" ){
                                   if($('#cond_pla').val()!="999"){
                                       if ($('#reg_lab').val() != "" & self.Comparar_Fecha(currentDate, $('#reg_lab').val()) ) {
                                           if ($('#reg_pen').val() != "" & self.Comparar_Fecha(currentDate, $('#reg_pen').val()) ) {
                                               if($('#serv_tip_ocup').val()!="999"){
                                                   self.ingresar_datos_laborales();
                                               }
                                           }
                                       }
                                   }
                               }
                           }
                       };

                        if($("#rpe").val()=="4" & $('#ent_aseg').val()!="999" & $('#est_afp').val()!="999" & $('#num_sis_pri_pen').val()!=""){
                            if($('#tip_pag').val()=="1" & $('#cta_ban').val()!="" ){
                                if($('#cond_pla').val()!="999"){
                                    if ($('#reg_lab').val() != "" & self.Comparar_Fecha(currentDate, $('#reg_lab').val()) ) {
                                        if ($('#reg_pen').val() != "" & self.Comparar_Fecha(currentDate, $('#reg_pen').val()) ) {
                                            if($('#serv_tip_ocup').val()!="999"){
                                                self.ingresar_datos_laborales();
                                            }
                                        }
                                    }
                                }
                            };
                            if($('#tip_pag').val()=="2" ){
                                if($('#cond_pla').val()!="999"){
                                    if ($('#reg_lab').val() != "" & self.Comparar_Fecha(currentDate, $('#reg_lab').val()) ) {
                                        if ($('#reg_pen').val() != "" & self.Comparar_Fecha(currentDate, $('#reg_pen').val()) ) {
                                            if($('#serv_tip_ocup').val()!="999"){
                                                self.ingresar_datos_laborales();
                                            }
                                        }
                                    }
                                }
                            }
                        }else{
                            $('#advertencia').addClass("alert-warning");
                            $('#advertencia').html('<strong>Ingresar numero del Sistema privado de pensiones</strong>')
                            $('#advertencia').show();
                        };

                       if($("#rpe").val()=="2" || $("#rpe").val()=="3" || $("#rpe").val()=="1"){
                           if($('#ent_aseg').val()!="999"){
                               if($('#tip_pag').val()=="1" & $('#cta_ban').val()!="" ){
                                   if($('#cond_pla').val()!="999"){
                                       if ($('#reg_lab').val() != "" & self.Comparar_Fecha(currentDate, $('#reg_lab').val()) ) {
                                           if ($('#reg_pen').val() != "" & self.Comparar_Fecha(currentDate, $('#reg_pen').val()) ) {
                                               if($('#serv_tip_ocup').val()!="999"){
                                                   self.ingresar_datos_laborales();
                                               }
                                           }
                                       }
                                   }
                               };
                               if($('#tip_pag').val()=="2" ){
                                   if($('#cond_pla').val()!="999"){
                                       if ($('#reg_lab').val() != "" & self.Comparar_Fecha(currentDate, $('#reg_lab').val()) ) {
                                           if ($('#reg_pen').val() != "" & self.Comparar_Fecha(currentDate, $('#reg_pen').val()) ) {
                                               if($('#serv_tip_ocup').val()!="999"){
                                                   self.ingresar_datos_laborales();
                                               }
                                           }
                                       }
                                   }
                               }
                           }
                       }

                    }else{
                        $('#advertencia').addClass("alert-warning");
                        $('#advertencia').html('<strong>Los datos ingresados son incorrectos</strong>')
                        $('#advertencia').show();
                    }

                },
                fun_camb_tab_a:function(){
                    this.tab=0;
                    $("#serv_cod").hide();
                    $("#block-descr_serv").hide();
                },
                fun_validar_codigo:function(){
                    if(this.tab==1 & ($("#codigo").val().length >7 || $("#codigo").val().length==0)){
                       this.fun_camb_tab_b();
                    };
                    if(this.tab==1 && $("#codigo").val().length <= 8 && $("#codigo").val().length > 0){

                        $("#block-descr_serv").hide();
                        var temp_help = $("#serv_cod");
                        temp_help.removeClass('alert-warning');
                        temp_help.addClass('alert-danger')
                        temp_help.show();
                        temp_help.text("No existe registro!");
                    };
                    if(this.tab==0 && $("#codigo").val().length <= 8 && $("#codigo").val().length > 0){
                        this.fun_search_servidor();
                    }
                },
                fun_camb_tab_b:function(){
                    this.tab=1;
                    var self=this;
                    $('advertencia').hide();
                    var codigo = $("#codigo").val();
                    if(codigo==""){
                        $("#block-descr_serv").hide();
                        var temp_help = $("#serv_cod");
                        temp_help.removeClass('alert-danger');
                        temp_help.addClass('alert-warning')
                        temp_help.show();
                        temp_help.text("debe ingresar el codigo de la persona a la que desea ingresar sus datos laborales!");
                        $('#cancel_laboral').click();
                    }else{
                        $("#serv_cod").hide();
                        self.model.get("servidor").url = "rest/cas/serv/codigo/" + codigo;

                        var fetch_s = self.model.get("servidor").fetch({ data: $.param({"codigo": codigo}) });

                        fetch_s.done(function () {
                            console.log(self.model.get("servidor").get("codigo"));
                            var nom_completo=self.model.get("servidor").get("paterno")+' '+self.model.get("servidor").get("materno")+' '+self.model.get("servidor").get("nombre");
                            $("#block-descr_serv").show();
                            $('#dni_serv_lab').text(self.model.get("servidor").get("codigo"))
                            $('#desc_serv_lab').text(nom_completo)
                            self.fun_search_servidor();
                        });
                        fetch_s.fail(function () {
                            $("#block-descr_serv").hide();
                            var temp_help = $("#serv_cod");
                            temp_help.removeClass('alert-warning');
                            temp_help.addClass('alert-danger')
                            temp_help.show();
                            temp_help.text("No existe registro!");
                        });
                    }



                },
                lista_servidor: function (ev) {
                    var self = this;
                    var clickedElement = $(ev.currentTarget);

                    clickedElement.button('loading');

                    setTimeout(function (e) {

                        clickedElement.button('reset');
                        self.listServ.show(self.listaServView);

                        if (self.listaServView.collection.length != 0) {
                            $("#table-servidor").dataTable();
                            $('#table-servidor_wrapper').append("<div id='footer-table'></div>");
                            $('#table-servidor_next').html("<i class='glyphicon glyphicon-forward'></i>");
                            $('#table-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                            $('.dataTables_filter input').attr('placeholder', 'Buscar..');
                        }

                        $("#list_servidores").modal();

                    }, 2000);


                },
                hide_lista_serv:function(e){
                    var self = this;
                    var clickedElement = $(e.currentTarget);
                    var dni_serv = clickedElement.children(':nth-child(2)').text();
                    $("#codigo").val(dni_serv);
                    this.fun_search_servidor();
                    $("#list_servidores").modal("hide");
                },
                fun_search_servidor: function (ev) {

                    var codigo = $("#codigo").val();

                    this.model.get("servidor").url = "rest/cas/serv/codigo/" + codigo;

                    this.model.get("servidorlaboral").url = "rest/cas/serv/laboral/codigo/" + codigo;

                    var fetch_s = this.model.get("servidor").fetch({ data: $.param({"codigo": codigo}) });

                    var fetch_l = this.model.get("servidorlaboral").fetch({ data: $.param({"codigo": codigo}) });

                    var self = this;


                    $("[id^='help_']").hide();

                    function dateToDMY(date) {
                        var d = date.getDate();
                        var m = date.getMonth() + 1;
                        var y = date.getFullYear();
                        return '' + (d <= 9 ? '0' + d : d) + '/' + (m <= 9 ? '0' + m : m) + '/' + y;
                    }

                    fetch_s.done(function () {
                        var temp_help = $("#serv_cod");

                        temp_help.hide();
                        self.guar_o_actu=1;
                        $("#codigo").val(self.model.get("servidor").get("codigo"));

                        $("#serv_ape_mat").val(self.model.get("servidor").get("materno"));

                        $("#serv_ape_pat").val(self.model.get("servidor").get("paterno"));

                        $("#serv_nom").val(self.model.get("servidor").get("nombre"));

                        $("#serv_tip_docu").val(self.model.get("servidor").get("tipoDoc"));

                        $("#num_document").val(self.model.get("servidor").get("numDoc"));

                        $("#serv_sexo").val(self.model.get("servidor").get("sexo"));

                        $("#serv_nac").val(self.model.get("servidor").get("nacimiento"));

                        $("#autocomple").val(self.model.get("servidor").get("paisNac"));

                        $("#nacdepartamento").val(self.model.get("servidor").get("codNacdepart"));

                        $("#serv_nac_provincia").val(self.model.get("servidor").get("codNacprov"));

                        $("#serv_nac_distrito").val(self.model.get("servidor").get("codNacditr"));

                        $("#serv_act_pais").val(self.model.get("servidor").get("paisDomcilio"));

                        prov_act = self.model.get("servidor").get("codProvincia");

                        distr_act = self.model.get("servidor").get("codDistrito");

                        $("#actdepartamento").val(self.model.get("servidor").get("codDepartamento"));

                        $("#actdepartamento").trigger("change");

                        $("#ser_act_domi").val(self.model.get("servidor").get("domicilio"));

                        $("#serv_car_fam").val(self.model.get("servidor").get("hij"));

                        $("#serv_ruc").val(self.model.get("servidor").get("ruc"));

                        $("#serv_disc").val(self.model.get("servidor").get("discapacidad"));

                        $("#serv_ing_unmsm").val(self.model.get("servidor").get("fechaInUnmsm"));

                        $("#serv_tel").val(self.model.get("servidor").get("telefono"));

                        $("#serv_cel").val(self.model.get("servidor").get("celular"));

                        $("#serv_correo").val(self.model.get("servidor").get("correo"));

                        $("#serv_est_civil").val(self.model.get("servidor").get("estCiv"));
                    });

                    fetch_s.fail(function () {
                        self.guar_o_actu=0;
                        var temp_help = $("#serv_cod");

                        temp_help.show();
                        temp_help.removeClass('alert-warning');
                        temp_help.addClass('alert-danger');
                        temp_help.text("No existe registro!");
                    });

                    fetch_l.done(function () {
                        console.log("done")
                        self.guar_o_actu2=1;
                        var temp_reg_pen = self.model.get("servidorlaboral").get("regPen");
                        self.entidadesAseguradoraView.findByRpe(temp_reg_pen, function () {
                                console.log(self.guar_o_actu2+" valorrrrrrrrrrr")
                                if (self.entidadesAseguradoraView.collection.length == 0)
                                    $("#row_reg_pen").hide();
                                else
                                    $("#row_reg_pen").show();
                                $("#ent_aseg").val(self.model.get("servidorlaboral").get("entAse"));
                            }
                        );

                        self.estadosAFP.findByRpe(temp_reg_pen, function () {
                                if (self.estadosAFP.collection.length == 0)
                                    $("#div_est_afp").hide();
                                else
                                    $("#div_est_afp").show();
                                $("#est_afp").val(self.model.get("servidorlaboral").get("estAfp"));
                            }
                        );

                        var temp_cod_tip_gen = self.model.get("servidorlaboral").get("tipGen");

                        self.ServidorTipoView.findByTipGen(temp_cod_tip_gen, function () {
                                $("#serv_tip").val(self.model.get("servidorlaboral").get("tip"));
                                self.CategoriaServidorView.fetchCategoria(self.model.get("servidorlaboral").get("tip"), function () {
                                    $("#serv_cat").val(self.model.get("servidorlaboral").get("cat"));
                                });
                            }
                        );


                        var temp_num_sis_pri_pen = $("#num_sis_pri_pen");

                        if (temp_reg_pen == 4)
                            temp_num_sis_pri_pen.parent().parent().parent().show();
                        else
                            temp_num_sis_pri_pen.parent().parent().parent().hide();

                        var temp_cue_ban = $("#cta_ban");
                        var tem_tit_ban=$('#serv_tit_ban');


                        if (self.model.get("servidorlaboral").get("tipPag") == 1){
                            temp_cue_ban.parent().parent().show();
                            tem_tit_ban.parent().parent().show();
                        }
                        else{
                            temp_cue_ban.parent().parent().hide();
                            tem_tit_ban.parent().parent().hide();
                        }

                        $("#serv_est").val(self.model.get("servidorlaboral").get("estLab"));
                        $("#serv_cat").val(self.model.get("servidorlaboral").get("cat"));
                        $("#cond_pla").val(self.model.get("servidorlaboral").get("conPla"));
                        $("#serv_gen").val(self.model.get("servidorlaboral").get("tipGen"));
                        $("#tip_pag").val(self.model.get("servidorlaboral").get("tipPag"));
                        $("#reg_lab").val(self.model.get("servidorlaboral").get("regLab"));
                        $("#rpe").val(self.model.get("servidorlaboral").get("regPen"));
                        $("#reg_pen").val(self.model.get("servidorlaboral").get("insregpen"));
                        $("#serv_tip_ocup").val(self.model.get("servidorlaboral").get("tipocupuni"));
                        $("#serv_sind").val(self.model.get("servidorlaboral").get("sindic"));

                        temp_cue_ban.val(self.model.get("servidorlaboral").get("cueBan"));
                        $('#serv_tit_ban').val(self.model.get("servidorlaboral").get("titcueBan"))
                        temp_num_sis_pri_pen.val(self.model.get("servidorlaboral").get("numPen"));

                        //render result
                        var temp_help = $("#help_sin_cas");

                        if (self.model.get("servidorlaboral").get("cat") != '0') {
                            temp_help.show();
                            temp_help.text("Sin registro CAS");
                        }
                        var nom_completo=self.model.get("servidor").get("paterno")+' '+self.model.get("servidor").get("materno")+' '+self.model.get("servidor").get("nombre");
                        $("#block-descr_serv").show();
                        $('#dni_serv_lab').text(self.model.get("servidor").get("codigo"))
                        $('#desc_serv_lab').text(nom_completo)

                    });

                    fetch_l.fail(function () {
                        console.log("fail")
                        self.guar_o_actu2=0;
                        $("#reg_lab").val(null);

                        self.servidoresEstadoView.initialize();
                        self.CondicionPlanView.initialize();
                        self.CategoriaServidorView.initialize();
                        self.servidorGenericosView.initialize();
                        self.ServidorTipoView.initialize();

                        self.tipoPago.initialize(
                            function () {

                                var temp_cue_ban = $("#cta_ban");

                                temp_cue_ban.val(null);

                                if (self.tipoPago.collection.at(0).get("cod") == 1)
                                    temp_cue_ban.parent().parent().show();
                                else
                                    temp_cue_ban.parent().parent().hide();
                            }
                        );

                        self.regimenesPensionesView.initialize(
                            function () {

                                var temp_reg_pen = self.regimenesPensionesView.collection.at(0).get("cod");

                                self.entidadesAseguradoraView.findByRpe(temp_reg_pen, function () {

                                        console.log(self.guar_o_actu2+" valorrrrrrrrrrr")
                                        if (self.entidadesAseguradoraView.collection.length == 0)
                                            $("#row_reg_pen").hide();
                                        else
                                            $("#row_reg_pen").show();
                                        $("#ent_aseg").val(self.model.get("servidorlaboral").get("entAse"));
                                    }
                                );

                                self.estadosAFP.findByRpe(temp_reg_pen, function () {
                                        if (self.estadosAFP.collection.length == 0)
                                            $("#div_est_afp").hide();
                                        else
                                            $("#div_est_afp").show();
                                        $("#est_afp").val(self.model.get("servidorlaboral").get("estAfp"));
                                    }
                                );

                                //render numero sistema privado de pensiones
                                var temp_num_sis_pri_pen = $("#num_sis_pri_pen");

                                temp_num_sis_pri_pen.val(null);

                                if (self.regimenesPensionesView.collection.at(0).get("cod") == 4)
                                    temp_num_sis_pri_pen.parent().parent().parent().show();
                                else
                                    temp_num_sis_pri_pen.parent().parent().parent().hide();

                            }
                        );

                    });
                    return false;
                }


            });
        });
        return ErzaManager.ServidoresApp.Form.View;
    });