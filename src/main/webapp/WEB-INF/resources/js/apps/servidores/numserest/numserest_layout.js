define(['app', 'hbs!apps/servidores/numserest/templates/numserestLayout','apps/resoluciones/form/view/servidor-view','apps/servidores/form/view/servidorEstado-view',
        'apps/servidores/form/view/categoriaServidor-view','apps/servidores/form/view/servidorgenericos-view', 'apps/servidores/form/view/servidorTipo-view',
        'apps/servidores/form/view/regimenPensionario-view', 'apps/servidores/form/view/entidadAseguradora-view', 'apps/servidores/form/view/estadosAFP-view',
        'apps/servidores/form/view/tipoPago-view', 'apps/servidores/form/view/condicionPlanilla-view',"apps/planillas/list/view/unidades-dialog","apps/servidores/form/view/tiposOcupaciones_view"
        ,'apps/servidores/form/model/servidorLaboral'
        ,"jquery","lib/bootstrap-datepicker","lib/jquery.dataTables.min","bootstrap"],
    function (ErzaManager, layoutTpl,listaServView,servidorEstadoView,categoriaServidorView,servidorGenericoView, servidorTipoView, regimenPensionView, entidadAseguradoraView, estadoAFPView,
              tipoPagoView, condicionPlanillaView,TablaModalDependencias,tipoOcupacionView,ServidorLaboral) {
        ErzaManager.module('ServidoresApp.Numserest.View', function (View, ErzaManager, Backbone, Marionette, $, _) {

            View.Layout = Marionette.Layout.extend({
                template: layoutTpl,
                servidoresEstadoView: new servidorEstadoView(),
                listaServView: new listaServView(),
                CategoriaServidorView: new categoriaServidorView(),
                servidorGenericosView: new servidorGenericoView(),
                ServidorTipoView: new servidorTipoView(),
                regimenesPensionesView: new regimenPensionView(),
                entidadesAseguradoraView: new entidadAseguradoraView(),
                estadosAFP: new estadoAFPView(),
                tipoPago: new tipoPagoView(),
                CondicionPlanView: new condicionPlanillaView(),
                tablaDependencias:new TablaModalDependencias(),
                tipoOcupacionView: new tipoOcupacionView(),

                elementoClickeado: null,
                unidadClicked: {
                    unidadId:10002,
                    unidadDesc:"UNMSM"
                },
                unidadSelected: {
                    unidadId:10225,
                    unidadDesc:"C0319 - PROYECTO QUIPUCAMAYOC"
                },
                num_ser_estado :0,
                regions: {
                    listServ: "#list_servidores",
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
                    dependModal:"#show_depend"
                },

                events: {
                    "click #bus_ser": "lista_servidor",
                    "click #table-servidor > tbody >tr": "hide_lista_serv",
                    "change #serv_gen": "fun_serv_tip",
                    "change #rpe": "fun_lis_ent_aseg",
                    "change #tip_pag": "fun_cue_ban",
                    "change #serv_est": "fun_serv_est",
                    "change #serv_tip": "fun_cambiar_categoria",
                    "click #unidad":"modal_depend",
                    "click .tree li": "clickUnidad",
                    "click #boton-unidad":"unidades_dep",
                    "click #reg_pen_clos":"limpiar_reg_pen_clos",
                    "click #reg_pen_show": "fun_reg_pen_show",
                    "click #reg_lab_clos": "fun_reg_lab_clos",
                    "click #reg_lab_show": "fun_reg_lab_show",
                    "click #save_numserest": "save_numserest"
                },

                onRender: function () {
                    this.initialFetch();

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
                        "servidorlaboral": new ServidorLaboral()
                    });
                },

                initialFetch: function () {
                    this.listaServView.fetchServidores();
                    this.servidoresEstadoView.initialize();
                    this.CategoriaServidorView.fetchCategoria(4);
                    this.servidorGenericosView.initialize();
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
                    this.tipoPago.initialize();
                    this.CondicionPlanView.initialize(function(){
                        $('#cond_pla').attr('disabled', 'disabled');
                    });
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


                    var self=this;
                    var clickedElement = $(e.currentTarget);
                    var cod_serv = clickedElement.children(':nth-child(8)').text();
                    var dni_serv = clickedElement.children(':nth-child(2)').text();
                    var nom_serv = clickedElement.children(':nth-child(1)').text();
                    this.num_ser_estado=clickedElement.children(':nth-child(7)').text();



                    this.model.get("servidorlaboral").url ="rest/cas/serv/getNumserest/"+ cod_serv+"/"+this.num_ser_estado;

                    var fetch_s = this.model.get("servidorlaboral").fetch({ data: $.param({"cod": cod_serv},{"num_ser_est": this.num_ser_estado}) });

                    fetch_s.done(function(){

                        $("#rpe").val(self.model.get("servidorlaboral").get("regPen")).trigger('change');

                        $("#rpe").attr("disabled","disabled");
                        $("#reg_pen").val(self.model.get("servidorlaboral").get("fechPen"));
                        $("#tip_pag").val(self.model.get("servidorlaboral").get("tipPag")).trigger('change');

                        $("#tip_pag").attr("disabled","disabled");
                            setTimeout(function () {
                                $("#ent_aseg").val(self.model.get("servidorlaboral").get("entAse"));
                                $("#rucLab").val(self.model.get("servidorlaboral").get("ruc"));
                                $("#ent_aseg").attr("disabled","disabled");
                                $("#cta_ban").val(self.model.get("servidorlaboral").get("cueBan"));
                                $("#cta_ban").attr("disabled","disabled");
                                $("#serv_tit_ban").val(self.model.get("servidorlaboral").get("titcueBan"));
                                $("#serv_tit_ban").attr("disabled","disabled");
                                setTimeout(function(){
                                    $("#est_afp").val(self.model.get("servidorlaboral").get("estAfp"));
                                    $("#est_afp").attr("disabled","disabled");
                                    $("#num_sis_pri_pen").val(self.model.get("servidorlaboral").get("numPen"));
                                    $("#num_sis_pri_pen").attr("disabled","disabled");
                                },1000)
                            },1000)


                       // $("#ent_aseg").val(self.model.get("servidorlaboral").get("entAse"));
                       /* $("#est_afp").val(self.model.get("servidorlaboral").get("estAfp"));
                        $("#num_sis_pri_pen").val(self.model.get("servidorlaboral").get("numPen"));
                        $("#tip_pag").val(self.model.get("servidorlaboral").get("tipPag"));
                        $("#cta_ban").val(self.model.get("servidorlaboral").get("cueBan"));
                        $("#serv_tit_ban").val(self.model.get("servidorlaboral").get("titcueBan"));*/





                    });
                    $("#block-descr_serv").show();
                    $('#cod_serv_lab').text(cod_serv);
                    $('#dni_serv_lab').text(dni_serv);
                    $('#desc_serv_lab').text(nom_serv)
                    $("#list_servidores").modal("hide");
                },
                fun_serv_tip: function (ev) {
                    var self = this;
                    var temp_cod_tip_gen = $("#serv_gen").val();
                    console.log(temp_cod_tip_gen+"srfg------------")
                    this.ServidorTipoView.findByTipGen(temp_cod_tip_gen, function () {
                        if(temp_cod_tip_gen==2 && $('#serv_est').val()=="7"){
                            $('#serv_tip > option').eq(1).hide();
                        }else{
                            if(temp_cod_tip_gen==1 && $('#serv_est').val()=="7"){
                                $('#serv_tip > option').eq(2).hide();
                            }
                        }
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
                        /*if (self.estadosAFP.collection.length == 0)
                         $("#div_est_afp").hide();
                         else*/
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
                fun_serv_est: function () {
                    if ($('#serv_est').val() == 7 || $('#serv_est').val() == 6 || $('#serv_est').val() == 4) {
                        $('#serv_gen').val("999");
                        $('#serv_tip').val("999");
                        $('#div_ruc').show();
                        $('#div_cod_ant').hide();
                        $('#codigo_antiguo').val("");
                        $('#serv_gen  > option').eq(2).hide();
                        $('#serv_gen  > option').eq(4).hide();
                        $('#serv_gen  > option').eq(5).hide();
                    } else {
                        $('#serv_gen  > option').eq(2).show();
                        $('#serv_gen  > option').eq(4).show();
                        $('#serv_gen  > option').eq(5).show();
                        $('#serv_ruc').val("");
                        $('#div_ruc').hide();
                        $('#div_cod_ant').show();
                        $('#serv_gen').val("999");
                        $('#serv_tip').val("999");
                        $('#serv_gen').trigger('change');
                    }
                },
                fun_cambiar_categoria: function () {
                    var tem_tipo = $('#serv_tip').val();

                    this.CategoriaServidorView.fetchCategoria(tem_tipo,function(){
                        if(tem_tipo==2 && $('#serv_est').val()==7){
                            for(var i=1;i<=23;i++){
                                if(i!=17){
                                    $('#serv_cat > option').eq(i).hide();
                                }
                            }
                        }else{
                            if(tem_tipo==1 && $('#serv_est').val()==7){
                                for(var i=1;i<=115;i++){
                                    $('#serv_cat > option').eq(i).hide();
                                }
                            }
                        }

                    });
                },
                modal_depend:function(){
                    this.dependModal.show(this.tablaDependencias);
                    $("#show_depend").modal("show");

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
                unidades_dep:function(){

                    $('#show_depend').modal('hide');
                    this.unidadSelected = this.unidadClicked;
                    var aux=this.unidadSelected.unidadDesc.split("-");
                    this.unidadSelected.unidadId=aux[0];
                    $("#origen").val(aux[1].trim());


                },
                limpiar_reg_pen_clos:function(){
                    $("#reg_pen").val("");
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

                save_numserest:function () {
                    var self = this;
                    var fullDate = new Date();
                    var dia = fullDate.getDate() + "";
                    var mes = (fullDate.getMonth() + 1) + "";
                    var anio = fullDate.getFullYear() + "";
                    if (dia.length == 1) {
                        dia = '0' + fullDate.getDate();
                    }
                    if (mes.length == 1) {
                        mes = '0' + (fullDate.getMonth() + 1);
                    }
                    var currentDate = dia + "/" + mes + "/" + anio;

                    if ($("#serv_est").val() != "999" & $("#serv_gen").val() != "999" & $("#serv_tip").val() != "999" & $("#serv_cat").val() != "999" & $("#rpe").val() != "999" & $('#codigo').val() != "") {

                        if ($("#rpe").val() == "5" || $("#rpe").val() == "6") {
                            if ($('#tip_pag').val() != "999") {
                                if ($('#tip_pag').val() == "2") {
                                    if ($('#cond_pla').val() != "999") {
                                        if ($('#reg_lab').val() != "" & self.Comparar_Fecha(currentDate, $('#reg_lab').val())) {
                                            if ($('#reg_pen').val() != "" & self.Comparar_Fecha(currentDate, $('#reg_pen').val())) {
                                                if ($('#serv_tip_ocup').val() != "999") {
                                                    if ($('#origen').val() != "") {
                                                        if ($('#serv_est').val() != 7 & $('#serv_est').val() != 6 & $('#serv_est').val() != 4) {
                                                            if ($('#codigo_antiguo').val() != "") {
                                                                self.ingresar_datos_laborales();
                                                            } else {
                                                                $('#advertencia').addClass("alert-warning");
                                                                $('#advertencia').html('<strong>Es necesario ingresar el codigo antiguo</strong>')
                                                                $('#advertencia').show();
                                                            }
                                                        } else {
                                                            if ($('#serv_ruc').val() != "") {
                                                                self.ingresar_datos_laborales();
                                                            } else {
                                                                $('#advertencia').addClass("alert-warning");
                                                                $('#advertencia').html('<strong>Es necesario ingresar el numero de RUC</strong>')
                                                                $('#advertencia').show();
                                                            }
                                                        }
                                                    } else {
                                                        $('#mensaje').removeClass('alert-danger');
                                                        $('#mensaje').removeClass('alert-success');
                                                        $('#mensaje').addClass("alert-warning");
                                                        $('#mensaje').html('<strong>Es necesario ingresar la dependencia</strong>')
                                                        $('#mensaje').show();
                                                    }
                                                } else {
                                                    $('#mensaje').removeClass('alert-danger');
                                                    $('#mensaje').removeClass('alert-success');
                                                    $('#mensaje').addClass("alert-warning");
                                                    $('#mensaje').html('<strong>Es necesario ingresar el tipo de ocupacion universitaria</strong>')
                                                    $('#mensaje').show();
                                                }
                                            } else {
                                                $('#mensaje').removeClass('alert-danger');
                                                $('#mensaje').removeClass('alert-success');
                                                $('#mensaje').addClass("alert-warning");
                                                $('#mensaje').html('<strong>La fecha de inscripcion de regimen pensionario esta mal ingresada</strong>')
                                                $('#mensaje').show();
                                            }
                                        } else {
                                            $('#mensaje').removeClass('alert-danger');
                                            $('#mensaje').removeClass('alert-success');
                                            $('#mensaje').addClass("alert-warning");
                                            $('#mensaje').html('<strong>La fecha de registro laboral esta mal ingresada</strong>')
                                            $('#mensaje').show();
                                        }
                                    } else {
                                        $('#mensaje').removeClass('alert-danger');
                                        $('#mensaje').removeClass('alert-success');
                                        $('#mensaje').addClass("alert-warning");
                                        $('#mensaje').html('<strong>Es necesario ingresar condicion de la planilla</strong>')
                                        $('#mensaje').show();
                                    }
                                } else {
                                    if ($('#tip_pag').val() == "1" & $('#cta_ban').val() != "") {
                                        if ($('#cond_pla').val() != "999") {
                                            if ($('#reg_lab').val() != "" & self.Comparar_Fecha(currentDate, $('#reg_lab').val())) {
                                                if ($('#reg_pen').val() != "" & self.Comparar_Fecha(currentDate, $('#reg_pen').val())) {
                                                    if ($('#serv_tip_ocup').val() != "999") {
                                                        if ($('#origen').val() != "") {
                                                            if ($('#serv_est').val() != 7 & $('#serv_est').val() != 6 & $('#serv_est').val() != 4) {
                                                                if ($('#codigo_antiguo').val() != "") {
                                                                    self.ingresar_datos_laborales();
                                                                } else {
                                                                    $('#advertencia').addClass("alert-warning");
                                                                    $('#advertencia').html('<strong>Es necesario ingresar el codigo antiguo</strong>')
                                                                    $('#advertencia').show();
                                                                }
                                                            } else {
                                                                if ($('#serv_ruc').val() != "") {
                                                                    self.ingresar_datos_laborales();
                                                                } else {
                                                                    $('#advertencia').addClass("alert-warning");
                                                                    $('#advertencia').html('<strong>Es necesario ingresar el numero de RUC</strong>')
                                                                    $('#advertencia').show();
                                                                }
                                                            }
                                                        } else {
                                                            $('#mensaje').removeClass('alert-danger');
                                                            $('#mensaje').removeClass('alert-success');
                                                            $('#mensaje').addClass("alert-warning");
                                                            $('#mensaje').html('<strong>Es necesario ingresar la dependencia</strong>')
                                                            $('#mensaje').show();
                                                        }
                                                    } else {
                                                        $('#mensaje').removeClass('alert-danger');
                                                        $('#mensaje').removeClass('alert-success');
                                                        $('#mensaje').addClass("alert-warning");
                                                        $('#mensaje').html('<strong>Es necesario ingresar el tipo de ocupacion universitaria</strong>')
                                                        $('#mensaje').show();
                                                    }
                                                } else {
                                                    $('#mensaje').removeClass('alert-danger');
                                                    $('#mensaje').removeClass('alert-success');
                                                    $('#mensaje').addClass("alert-warning");
                                                    $('#mensaje').html('<strong>La fecha de inscripcion de regimen pensionario esta mal ingresada</strong>')
                                                    $('#mensaje').show();
                                                }
                                            } else {
                                                $('#mensaje').removeClass('alert-danger');
                                                $('#mensaje').removeClass('alert-success');
                                                $('#mensaje').addClass("alert-warning");
                                                $('#mensaje').html('<strong>La fecha de registro laboral esta mal ingresada</strong>')
                                                $('#mensaje').show();
                                            }
                                        } else {
                                            $('#mensaje').removeClass('alert-danger');
                                            $('#mensaje').removeClass('alert-success');
                                            $('#mensaje').addClass("alert-warning");
                                            $('#mensaje').html('<strong>Es necesario ingresar condicion de la planilla</strong>')
                                            $('#mensaje').show();
                                        }
                                    } else {
                                        $('#mensaje').removeClass('alert-danger');
                                        $('#mensaje').removeClass('alert-success');
                                        $('#mensaje').addClass("alert-warning");
                                        $('#mensaje').html('<strong>Es necesario ingresar el numero de cuenta</strong>')
                                        $('#mensaje').show();
                                    }
                                }
                            } else {
                                $('#mensaje').removeClass('alert-danger');
                                $('#mensaje').removeClass('alert-success');
                                $('#mensaje').addClass("alert-warning");
                                $('#mensaje').html('<strong>Es necesario ingresar el tipo de pago</strong>')
                                $('#mensaje').show();
                            }
                        }
                        ;

                        if ($("#rpe").val() == "4") {
                            if ($('#ent_aseg').val() != "999" & $('#est_afp').val() != "999" & $('#num_sis_pri_pen').val() != "") {
                                if ($('#tip_pag').val() != "999") {
                                    if ($('#tip_pag').val() == "2") {
                                        if ($('#cond_pla').val() != "999") {
                                            if ($('#reg_lab').val() != "" & self.Comparar_Fecha(currentDate, $('#reg_lab').val())) {
                                                if ($('#reg_pen').val() != "" & self.Comparar_Fecha(currentDate, $('#reg_pen').val())) {
                                                    if ($('#serv_tip_ocup').val() != "999") {
                                                        if ($('#origen').val() != "") {
                                                            if ($('#serv_est').val() != 7 & $('#serv_est').val() != 6 & $('#serv_est').val() != 4) {
                                                                if ($('#codigo_antiguo').val() != "") {
                                                                    self.ingresar_datos_laborales();
                                                                } else {
                                                                    $('#advertencia').addClass("alert-warning");
                                                                    $('#advertencia').html('<strong>Es necesario ingresar el codigo antiguo</strong>')
                                                                    $('#advertencia').show();
                                                                }
                                                            } else {
                                                                if ($('#serv_ruc').val() != "") {
                                                                    self.ingresar_datos_laborales();
                                                                } else {
                                                                    $('#advertencia').addClass("alert-warning");
                                                                    $('#advertencia').html('<strong>Es necesario ingresar el numero de RUC</strong>')
                                                                    $('#advertencia').show();
                                                                }
                                                            }
                                                        } else {
                                                            $('#mensaje').removeClass('alert-danger');
                                                            $('#mensaje').removeClass('alert-success');
                                                            $('#mensaje').addClass("alert-warning");
                                                            $('#mensaje').html('<strong>Es necesario ingresar la dependencia</strong>')
                                                            $('#mensaje').show();
                                                        }
                                                    } else {
                                                        $('#mensaje').removeClass('alert-danger');
                                                        $('#mensaje').removeClass('alert-success');
                                                        $('#mensaje').addClass("alert-warning");
                                                        $('#mensaje').html('<strong>Es necesario ingresar el tipo de ocupacion universitaria</strong>')
                                                        $('#mensaje').show();
                                                    }
                                                } else {
                                                    $('#mensaje').removeClass('alert-danger');
                                                    $('#mensaje').removeClass('alert-success');
                                                    $('#mensaje').addClass("alert-warning");
                                                    $('#mensaje').html('<strong>La fecha de inscripcion de regimen pensionario esta mal ingresada</strong>')
                                                    $('#mensaje').show();
                                                }
                                            } else {
                                                $('#mensaje').removeClass('alert-danger');
                                                $('#mensaje').removeClass('alert-success');
                                                $('#mensaje').addClass("alert-warning");
                                                $('#mensaje').html('<strong>La fecha de registro laboral esta mal ingresada</strong>')
                                                $('#mensaje').show();
                                            }
                                        } else {
                                            $('#mensaje').removeClass('alert-danger');
                                            $('#mensaje').removeClass('alert-success');
                                            $('#mensaje').addClass("alert-warning");
                                            $('#mensaje').html('<strong>Es necesario ingresar condicion de la planilla</strong>')
                                            $('#mensaje').show();
                                        }
                                    } else {
                                        if ($('#tip_pag').val() == "1" & $('#cta_ban').val() != "") {
                                            if ($('#cond_pla').val() != "999") {
                                                if ($('#reg_lab').val() != "" & self.Comparar_Fecha(currentDate, $('#reg_lab').val())) {
                                                    if ($('#reg_pen').val() != "" & self.Comparar_Fecha(currentDate, $('#reg_pen').val())) {
                                                        if ($('#serv_tip_ocup').val() != "999") {
                                                            if ($('#origen').val() != "") {
                                                                if ($('#serv_est').val() != 7 & $('#serv_est').val() != 6 & $('#serv_est').val() != 4) {
                                                                    if ($('#codigo_antiguo').val() != "") {
                                                                        self.ingresar_datos_laborales();
                                                                    } else {
                                                                        $('#advertencia').addClass("alert-warning");
                                                                        $('#advertencia').html('<strong>Es necesario ingresar el codigo antiguo</strong>')
                                                                        $('#advertencia').show();
                                                                    }
                                                                } else {
                                                                    if ($('#serv_ruc').val() != "") {
                                                                        self.ingresar_datos_laborales();
                                                                    } else {
                                                                        $('#advertencia').addClass("alert-warning");
                                                                        $('#advertencia').html('<strong>Es necesario ingresar el numero de RUC</strong>')
                                                                        $('#advertencia').show();
                                                                    }
                                                                }
                                                            } else {
                                                                $('#mensaje').removeClass('alert-danger');
                                                                $('#mensaje').removeClass('alert-success');
                                                                $('#mensaje').addClass("alert-warning");
                                                                $('#mensaje').html('<strong>Es necesario ingresar la dependencia</strong>')
                                                                $('#mensaje').show();
                                                            }
                                                        } else {
                                                            $('#mensaje').removeClass('alert-danger');
                                                            $('#mensaje').removeClass('alert-success');
                                                            $('#mensaje').addClass("alert-warning");
                                                            $('#mensaje').html('<strong>Es necesario ingresar el tipo de ocupacion universitaria</strong>')
                                                            $('#mensaje').show();
                                                        }
                                                    } else {
                                                        $('#mensaje').removeClass('alert-danger');
                                                        $('#mensaje').removeClass('alert-success');
                                                        $('#mensaje').addClass("alert-warning");
                                                        $('#mensaje').html('<strong>La fecha de inscripcion de regimen pensionario esta mal ingresada</strong>')
                                                        $('#mensaje').show();
                                                    }
                                                } else {
                                                    $('#mensaje').removeClass('alert-danger');
                                                    $('#mensaje').removeClass('alert-success');
                                                    $('#mensaje').addClass("alert-warning");
                                                    $('#mensaje').html('<strong>La fecha de registro laboral esta mal ingresada</strong>')
                                                    $('#mensaje').show();
                                                }
                                            } else {
                                                $('#mensaje').removeClass('alert-danger');
                                                $('#mensaje').removeClass('alert-success');
                                                $('#mensaje').addClass("alert-warning");
                                                $('#mensaje').html('<strong>Es necesario ingresar condicion de la planilla</strong>')
                                                $('#mensaje').show();
                                            }
                                        } else {
                                            $('#mensaje').removeClass('alert-danger');
                                            $('#mensaje').removeClass('alert-success');
                                            $('#mensaje').addClass("alert-warning");
                                            $('#mensaje').html('<strong>Es necesario ingresar el numero de cuenta</strong>')
                                            $('#mensaje').show();
                                        }
                                    }
                                } else {
                                    $('#mensaje').removeClass('alert-danger');
                                    $('#mensaje').removeClass('alert-success');
                                    $('#mensaje').addClass("alert-warning");
                                    $('#mensaje').html('<strong>Es necesario ingresar el tipo de pago</strong>')
                                    $('#mensaje').show();
                                }
                            } else {
                                $('#mensaje').removeClass('alert-danger');
                                $('#mensaje').removeClass('alert-success');
                                $('#mensaje').addClass("alert-warning");
                                $('#mensaje').html('<strong>Es necesario ingresar entidad aseguradora ,estados AFP y numero de Sistema privado de pensiones</strong>')
                                $('#mensaje').show();
                            }
                        };

                        if ($("#rpe").val() == "2" || $("#rpe").val() == "3" || $("#rpe").val() == "1") {
                            if ($('#ent_aseg').val() != "999") {
                                if ($('#tip_pag').val() != "999") {
                                    if ($('#tip_pag').val() == "2") {
                                        if ($('#cond_pla').val() != "999") {
                                            if ($('#reg_lab').val() != "" & self.Comparar_Fecha(currentDate, $('#reg_lab').val())) {
                                                if ($('#reg_pen').val() != "" & self.Comparar_Fecha(currentDate, $('#reg_pen').val())) {
                                                    if ($('#serv_tip_ocup').val() != "999") {
                                                        if ($('#origen').val() != "") {
                                                            if ($('#serv_est').val() != 7 & $('#serv_est').val() != 6 & $('#serv_est').val() != 4) {
                                                                if ($('#codigo_antiguo').val() != "") {
                                                                    self.ingresar_datos_laborales();
                                                                } else {
                                                                    $('#advertencia').addClass("alert-warning");
                                                                    $('#advertencia').html('<strong>Es necesario ingresar el codigo antiguo</strong>')
                                                                    $('#advertencia').show();
                                                                }
                                                            } else {
                                                                if ($('#serv_ruc').val() != "") {
                                                                    self.ingresar_datos_laborales();
                                                                } else {
                                                                    $('#advertencia').addClass("alert-warning");
                                                                    $('#advertencia').html('<strong>Es necesario ingresar el numero de RUC</strong>')
                                                                    $('#advertencia').show();
                                                                }
                                                            }
                                                        } else {
                                                            $('#mensaje').removeClass('alert-danger');
                                                            $('#mensaje').removeClass('alert-success');
                                                            $('#mensaje').addClass("alert-warning");
                                                            $('#mensaje').html('<strong>Es necesario ingresar la dependencia</strong>')
                                                            $('#mensaje').show();
                                                        }
                                                    } else {
                                                        $('#mensaje').removeClass('alert-danger');
                                                        $('#mensaje').removeClass('alert-success');
                                                        $('#mensaje').addClass("alert-warning");
                                                        $('#mensaje').html('<strong>Es necesario ingresar el tipo de ocupacion universitaria</strong>')
                                                        $('#mensaje').show();
                                                    }
                                                } else {
                                                    $('#mensaje').removeClass('alert-danger');
                                                    $('#mensaje').removeClass('alert-success');
                                                    $('#mensaje').addClass("alert-warning");
                                                    $('#mensaje').html('<strong>La fecha de inscripcion de regimen pensionario esta mal ingresada</strong>')
                                                    $('#mensaje').show();
                                                }
                                            } else {
                                                $('#mensaje').removeClass('alert-danger');
                                                $('#mensaje').removeClass('alert-success');
                                                $('#mensaje').addClass("alert-warning");
                                                $('#mensaje').html('<strong>La fecha de registro laboral esta mal ingresada</strong>')
                                                $('#mensaje').show();
                                            }
                                        } else {
                                            $('#mensaje').removeClass('alert-danger');
                                            $('#mensaje').removeClass('alert-success');
                                            $('#mensaje').addClass("alert-warning");
                                            $('#mensaje').html('<strong>Es necesario ingresar condicion de la planilla</strong>')
                                            $('#mensaje').show();
                                        }
                                    } else {
                                        if ($('#tip_pag').val() == "1" & $('#cta_ban').val() != "") {
                                            if ($('#cond_pla').val() != "999") {
                                                if ($('#reg_lab').val() != "" & self.Comparar_Fecha(currentDate, $('#reg_lab').val())) {
                                                    if ($('#reg_pen').val() != "" & self.Comparar_Fecha(currentDate, $('#reg_pen').val())) {
                                                        if ($('#serv_tip_ocup').val() != "999") {
                                                            if ($('#origen').val() != "") {
                                                                if ($('#serv_est').val() != 7 & $('#serv_est').val() != 6 & $('#serv_est').val() != 4) {
                                                                    if ($('#codigo_antiguo').val() != "") {
                                                                        self.ingresar_datos_laborales();
                                                                    } else {
                                                                        $('#advertencia').addClass("alert-warning");
                                                                        $('#advertencia').html('<strong>Es necesario ingresar el codigo antiguo</strong>')
                                                                        $('#advertencia').show();
                                                                    }
                                                                } else {
                                                                    if ($('#serv_ruc').val() != "") {
                                                                        self.ingresar_datos_laborales();
                                                                    } else {
                                                                        $('#advertencia').addClass("alert-warning");
                                                                        $('#advertencia').html('<strong>Es necesario ingresar el numero de RUC</strong>')
                                                                        $('#advertencia').show();
                                                                    }
                                                                }
                                                            } else {
                                                                $('#mensaje').removeClass('alert-danger');
                                                                $('#mensaje').removeClass('alert-success');
                                                                $('#mensaje').addClass("alert-warning");
                                                                $('#mensaje').html('<strong>Es necesario ingresar la dependencia</strong>')
                                                                $('#mensaje').show();
                                                            }
                                                        } else {
                                                            $('#mensaje').removeClass('alert-danger');
                                                            $('#mensaje').removeClass('alert-success');
                                                            $('#mensaje').addClass("alert-warning");
                                                            $('#mensaje').html('<strong>Es necesario ingresar el tipo de ocupacion universitaria</strong>')
                                                            $('#mensaje').show();
                                                        }
                                                    } else {
                                                        $('#mensaje').removeClass('alert-danger');
                                                        $('#mensaje').removeClass('alert-success');
                                                        $('#mensaje').addClass("alert-warning");
                                                        $('#mensaje').html('<strong>La fecha de inscripcion de regimen pensionario esta mal ingresada</strong>')
                                                        $('#mensaje').show();
                                                    }
                                                } else {
                                                    $('#mensaje').removeClass('alert-danger');
                                                    $('#mensaje').removeClass('alert-success');
                                                    $('#mensaje').addClass("alert-warning");
                                                    $('#mensaje').html('<strong>La fecha de registro laboral esta mal ingresada</strong>')
                                                    $('#mensaje').show();
                                                }
                                            } else {
                                                $('#mensaje').removeClass('alert-danger');
                                                $('#mensaje').removeClass('alert-success');
                                                $('#mensaje').addClass("alert-warning");
                                                $('#mensaje').html('<strong>Es necesario ingresar condicion de la planilla</strong>')
                                                $('#mensaje').show();
                                            }
                                        } else {
                                            $('#mensaje').removeClass('alert-danger');
                                            $('#mensaje').removeClass('alert-success');
                                            $('#mensaje').addClass("alert-warning");
                                            $('#mensaje').html('<strong>Es necesario ingresar el numero de cuenta</strong>')
                                            $('#mensaje').show();
                                        }
                                    }
                                }else {
                                    $('#mensaje').removeClass('alert-danger');
                                    $('#mensaje').removeClass('alert-success');
                                    $('#mensaje').addClass("alert-warning");
                                    $('#mensaje').html('<strong>Es necesario ingresar el tipo de pago</strong>')
                                    $('#mensaje').show();
                                }
                            }else {
                                $('#mensaje').removeClass('alert-danger');
                                $('#mensaje').removeClass('alert-success');
                                $('#mensaje').addClass("alert-warning");
                                $('#mensaje').html('<strong>Es necesario ingresar la entidad aseguradora</strong>')
                                $('#mensaje').show();
                            }
                        }

                    } else {
                        $('#mensaje').removeClass('alert-danger');
                        $('#mensaje').removeClass('alert-success');
                        $('#mensaje').addClass("alert-warning");
                        $('#mensaje').html('<strong>Falta ingresar campos obligatorios</strong>')
                        $('#mensaje').show();
                    }

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
                                    if (parseInt(xDay) >= parseInt(yDay))
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

                ingresar_datos_laborales: function () {
                    var self = this;
                    $('#mensaje').hide();
                    var codigo = $("#cod_serv_lab").text();
                    console.log(codigo+" 5555555555555555555555555555")
                    if ($("#ent_aseg").val() == "999") {
                        $("#ent_aseg").val("");
                    }
                    console.log(self.num_ser_estado+" ---numserest")

                    this.model.get("servidorlaboral").set({
                        "cod": codigo,
                        "estLab": $("#serv_est").val(),
                        "num_ser_est":self.num_ser_estado,
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
                        "sindic": $("#serv_sind").val(),
                        "ruc": $("#serv_ruc").val(),
                        "cod_antiguo": $("#codigo_antiguo").val(),
                        "dependencia": self.unidadSelected.unidadId
                    });
                    console.log($("#serv_ruc").val() + " akaaa");
//                    if (self.guar_o_actu2 == 0) {
                        self.model.get("servidorlaboral").url = "rest/cas/serv/servidorlaboral";


                        var self_l = self.model.get("servidorlaboral").save({}, {wait: true});

                        self_l.done(function () {

                            var temp_serv_save = $("#mensaje");
                            temp_serv_save.removeClass("alert-warning");
                            temp_serv_save.removeClass("alert-danger");
                            temp_serv_save.addClass("alert-success");
                            temp_serv_save.show();
                            temp_serv_save.text("Se completaron satisfactoriamente los datos del servidor!");
                            $('#cancel_laboral').click();
                            self.initialFetch();
                        });

                        self_l.fail(function () {

                            var temp_serv_cod = $("#serv_cod");

                            temp_serv_cod.removeClass('alert-warning');
                            temp_serv_cod.addClass('alert-danger');
                            temp_serv_cod.show();
                            temp_serv_cod.text("Error de registro laboral.!");


                        });
                    /*} else {
                        console.log("actualizar  ...................")
                        self.numregistros.fetchNumRegistros(codigo,self.num_ser_estado, function(){
                            var num1=self.numregistros.collection.at(0).get('num1');
                            var num2=self.numregistros.collection.at(0).get('num2');
                            var num3=self.numregistros.collection.at(0).get('num3');
                            var num4=self.numregistros.collection.at(0).get('num4');
                            var num5=self.numregistros.collection.at(0).get('num5');
                            console.log(num1+"/"+num2+"/"+num3+"/"+num4+"/"+num5);
                            if((num1>1) || (num2>1) || (num3>1) || (num4>1) || (num5>1)){
                                $('#texto').html('<strong>No es posible actualizar los datos laborales debido a que ya tiene historial de cambios</strong>')
                                $('#footer_modal').html(' <button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>')
                                $('#modal_message').modal();
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
                                    $('#cancel_laboral').click();
                                });
                            }

                        })

                    }*/

                },
                cancelar_inf_gen2: function () {
                    $("#block-descr_serv").hide();

                    /*$('.tab_a').click();
                    setTimeout(function () {
                        $('#cancel_servidor').click();
                    }, 1000);*/

//                    this.fun_validar_codigo();
                }



            });
        });
        return ErzaManager.ServidoresApp.Numserest.View;
    });