define(['app', 'hbs!apps/servidores/numserest/templates/numserestLayout','apps/resoluciones/form/view/servidor-view','apps/servidores/form/view/servidorEstado-view',
        'apps/servidores/form/view/categoriaServidor-view','apps/servidores/form/view/servidorgenericos-view', 'apps/servidores/form/view/servidorTipo-view',
        'apps/servidores/form/view/regimenPensionario-view', 'apps/servidores/form/view/entidadAseguradora-view', 'apps/servidores/form/view/estadosAFP-view',
        'apps/servidores/form/view/tipoPago-view', 'apps/servidores/form/view/condicionPlanilla-view',"apps/planillas/list/view/unidades-dialog"
        ,"jquery","lib/bootstrap-datepicker","lib/jquery.dataTables.min","bootstrap"],
    function (ErzaManager, layoutTpl,listaServView,servidorEstadoView,categoriaServidorView,servidorGenericoView, servidorTipoView, regimenPensionView, entidadAseguradoraView, estadoAFPView,
              tipoPagoView, condicionPlanillaView,TablaModalDependencias) {
        ErzaManager.module('AsistenciaApp.Numserest.View', function (View, ErzaManager, Backbone, Marionette, $, _) {

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

                elementoClickeado: null,
                unidadClicked: {
                    unidadId:10002,
                    unidadDesc:"UNMSM"
                },
                unidadSelected: {
                    unidadId:10225,
                    unidadDesc:"C0319 - PROYECTO QUIPUCAMAYOC"
                },
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
                    "click #reg_lab_show": "fun_reg_lab_show"
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
                },
                initialize: function () {

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
                    this.CondicionPlanView.initialize();
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
                    var cod_serv = clickedElement.children(':nth-child(8)').text();
                    var dni_serv = clickedElement.children(':nth-child(2)').text();
                    var nom_serv = clickedElement.children(':nth-child(1)').text();

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
                fun_serv_est:function(){
                    if($('#serv_est').val()==7){
                        $('#serv_gen').val("999");
                        $('#serv_tip').val("999");
                        $('#div_ruc').show();
                        $('#serv_gen  > option'). eq(2).hide();
                        $('#serv_gen  > option'). eq(4).hide();
                        $('#serv_gen  > option'). eq(5).hide();
                    }else{
                        $('#serv_gen  > option'). eq(2).show();
                        $('#serv_gen  > option'). eq(4).show();
                        $('#serv_gen  > option'). eq(5).show();
                        $('#serv_ruc').val("");
                        $('#div_ruc').hide();
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
                }

            });
        });
        return ErzaManager.AsistenciaApp.Numserest.View;
    });