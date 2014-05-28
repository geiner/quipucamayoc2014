define(['app', 'hbs!apps/desc_medicos/form/templates/inicio_desc_medicos', 'apps/resoluciones/form/view/servidor-view', 'apps/desc_medicos/form/model/save_descanso',
        'apps/desc_medicos/form/view/descansos_serv', 'apps/desc_medicos/form/model/update_descanso', 'apps/desc_medicos/form/view/tabla_descansos_totales',
        'lib/bootstrap-datetimepicker.min', "lib/moment", "lib/jquery.dataTables.min", "jquery", "lib/bootstrap-datepicker", "bootstrap"],
    function (ErzaManager, layoutTpl, listaServView, addDescanso, DescansosServ, UpdateDescanso, TablaDescansoTotales) {
        ErzaManager.module('DescansoMedicoApp.list.View', function (View, ErzaManager, Backbone, Marionette, $, _) {

            View.Layout = Marionette.Layout.extend({
                template: layoutTpl,

                listaServView: new listaServView(),
                descansosServ: new DescansosServ(),
                tablaDescansoTotales: new TablaDescansoTotales(),


                //variables globales
                dni: null,
                numserest: null,

                servidoresSeleccionados: [],
                fechas_iniciales: [],
                fechas_finales: [],
                idDescMed: null,
                cant_mat: 0,
                aux_mat: 0,
                cant_enf: 0,
                aux_enf: 0,

                regions: {
                    listServ: "#list_serv_reg",
                    regiontabladescansos: "#table-descansos",
                    regiontabladescansostotales: "#table-descansos-tot"
                },
                events: {
                    "click #serv_desc_med": "lista_servidor",
                    "click #show_fech_inic": "show_fech_med",
                    "click #show_fech_fin": "show_fech_fin",
                    "click #clear_inicio": "hide_fech_ini",
                    "click #clear_fin": "hide_fech_fin",
                    "click #table-servidor > tbody >tr": "hide_lista_serv",
                    "click #save_med": "fun_save_descMed",
                    "click #delete-med": "fun_delete_descMed",
                    "click #modalAV": "fun_eliminar",
                    "click #cancel_med": "fun_reset",
                    "click #edit_desc": "fun_edit_desc",
                    "click #update_cancel": "fun_cancel_edit",
                    "click #update_med": "fun_edit_action",
                    "click #search_desc": "fun_buscar_desc",
                    "click #select-all": "seleccionarTodosLosServidores",
                    "click #table-descansos-totales > tbody > tr ": "clickServidorRow",
                    "click #descargar_rep_descansos": "descargarReporteDescansos"

                },

                onRender: function () {
                    this.initialFetch();
                },
                initialize: function () {

                    //initialize model
                    this.model = new Backbone.Model();


                    this.model.set({

                        "addDescanso": new addDescanso(),
                        "updateDescanso": new UpdateDescanso()
                    });
                },
                initialFetch: function () {

                    this.listaServView.fetchServidores();
                },

                fun_cancel_edit: function () {

                    $("#act_med").hide();
                    $("#footer_med").show();

                },
                seleccionarTodosLosServidores: function (ev) {

                    var clickedElement = $(ev.currentTarget);

                    if ($("#select-all").is(':checked')) {

                        var parent = $('.check-all').prop('checked', true);
                        $(".estatic_desc").addClass("color_row");
                        $(".estatic_desc>td>input").prop("checked", true);
                        var cant_dnis = parent.parent().parent().children(':nth-child(3)');

                        for (var i = 0; i < cant_dnis.length; i++) {

                            this.servidoresSeleccionados[i] = cant_dnis[i].innerHTML + "/";

                        }
                        ;

                        for (var i = 0; i < this.servidoresSeleccionados.length; i++) {

                            console.log(this.servidoresSeleccionados[i]);

                        }

                    } else {
                        $(".estatic_desc").removeClass("color_row");
                        $(".estatic_desc>td>input").prop("checked", false);
                        this.servidoresSeleccionados.splice(0, this.servidoresSeleccionados.length);

                    }
                },
                clickServidorRow: function (e) {

                    var clickedElement = $(e.currentTarget);

                    var check = clickedElement.children(':nth-child(1)').children();

                    var dni = clickedElement.children(':nth-child(3)').text();


                    if (check.is(':checked')) {
                        console.log("deschekear")
                        check.prop('checked', false);

                        clickedElement.removeClass('color_row');

                        this.servidoresSeleccionados.splice(this.servidoresSeleccionados.indexOf(dni + "/"), 1);

                        for (var i = 0; i < this.servidoresSeleccionados.length; i++) {

                            console.log(this.servidoresSeleccionados[i]);

                        }
                    }
                    else {
                        check.prop('checked', true);
                        clickedElement.addClass('color_row');
                        this.servidoresSeleccionados.push(dni + "/");
                        console.log("chekear")

                        for (var i = 0; i < this.servidoresSeleccionados.length; i++) {

                            console.log(this.servidoresSeleccionados[i]);


                        }
                    }

                    /*if(clickedElement.hasClass('color_row')&&check.hasClass("check")){
                     clickedElement.removeClass("highlight");
                     check.removeClass("check");
                     check.prop('checked',false);
                     this.servidoresSeleccionados.splice(this.servidoresSeleccionados.indexOf(dni),1);
                     }
                     else{
                     clickedElement.addClass("highlight");
                     check.addClass("check");
                     check.prop('checked',true);
                     this.servidoresSeleccionados.push(dni);

                     };*/

                },
                descargarReporteDescansos: function () {
                    var dnis = "";
                    if (this.servidoresSeleccionados.length == 0) {
                        alert("debe seleccionar al menos un dni");
                    } else {

                        $("#anio").val($("#anio_desc").val());
                        $("#mes").val($("#mes_desc").val());
                        $("#mes_descr").val($("#mes_desc option:selected").html());

                        $("#usuario_report").val($("#email").text());
                        for (var i = 0; i < this.servidoresSeleccionados.length; i++) {
                            dnis = dnis + this.servidoresSeleccionados[i].trim();
                            console.log(this.servidoresSeleccionados[i]);
                        }
                        ;
                        $('#pks').val(dnis);
//                        $('#form_reporte').append('<textarea style="display: none" id="dnis" name="codigos" value='+dnis+' >'+dnis+'</textarea>');
                    }
                    ;

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

                        $("#list_serv_reg").modal();

                    }, 2000);


                },
                fun_reset: function () {
                    $("#descMed_message").hide();
                },

                fun_edit_action: function () {

                    if (this.comprobar_fecha_descmedico($("#fech_ini_med").val(), $("#fech_fin_med").val())) {
                        var self = this;
                        var diaI = parseInt($("#fech_ini_med").val().substring(0, 2));
                        var mesI = parseInt($("#fech_ini_med").val().substring(3, 5));
                        var anioI = parseInt($("#fech_ini_med").val().substring(6, 10));
                        var fechaInic = 365 * anioI + 30 * mesI + diaI;

                        var diaF = parseInt($("#fech_fin_med").val().substring(0, 2));
                        var mesF = parseInt($("#fech_fin_med").val().substring(3, 5));
                        var anioF = parseInt($("#fech_fin_med").val().substring(6, 10));
                        var fechaFin = 365 * anioF + 30 * mesF + diaF;

                        var tiempo = (fechaFin - fechaInic + 1);

                        if ($("#citt").val() != "" && $("#fech_ini_med").val() != "" && $("#fech_fin_med").val() != "") {

                            if ($("#tipo_lic").val() == "0") {
                                $("#descMed_message").removeClass("alert-success");
                                $("#descMed_message").addClass("alert-warning");
                                $("#descMed_message").html("<strong>Seleccione Tipo de Licencia</strong>");
                                $("#descMed_message").show();
                                //alert("SELECCIONE TIPO DE LICENCIA");
                            }
                            else {

                                if (fechaFin > fechaInic) {

                                    this.model.get("updateDescanso").set({

                                        "citt": $("#citt").val(),
                                        "f_inicio": $("#fech_ini_med").val(),
                                        "f_fin": $("#fech_fin_med").val(),
                                        "tipo_lic": $("#tipo_lic option:selected").html(),
                                        "tiempo": tiempo,
                                        "id_desc_med": parseInt(this.idDescMed)

                                    });

                                    this.model.get("updateDescanso").url = "rest/descansos/updateDescMed";

                                    var self_s = this.model.get("updateDescanso").save({}, {wait: true});

                                    self_s.fail(function () {

                                        self.descansosServ.fetchDescansos(self.dni, self.numserest, function () {
                                            if (self.descansosServ.collection.length != 0) {

                                                $("#table-descansos-servidor").dataTable();
                                                $('#table-descansos-servidor_wrapper').append("<div id='footer-table'></div>");
                                                $("#table-descansos-servidor_filter").append("<div  style='float: left;width: 79%;' id='div_dias'> <div style='float: left;margin-left: 21%;'><label class=' control-label'>Maternidad  dias:</label><span id='text_mat'></span></div><div  style='float: left;margin-left: 31%;'><label class='control-label'>Enfermedad  dias:</label><span id='text_enf'></span></div></div>");
                                                $("#table-descansos-servidor_filter>label").addClass("buscador_desc");
                                                $('#table-descansos-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                $('#table-descansos-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                                                $('.dataTables_filter input').attr('placeholder', 'Buscar..');

                                                if ($("#tipo_lic option:selected").html() == "MATERNIDAD") {
                                                    self.cant_mat = self.cant_mat - self.aux_mat;
                                                    self.cant_enf = self.cant_enf - self.aux_enf;
                                                    var tmp_mat = tiempo.split(" ");
                                                    self.cant_mat = self.cant_mat + parseInt(tmp_mat[0]);

                                                }
                                                if ($("#tipo_lic option:selected").html() == "ENFERMEDAD") {
                                                    self.cant_enf = self.cant_enf - self.aux_enf;
                                                    self.cant_mat = self.cant_mat - self.aux_mat;
                                                    var tmp_enf = tiempo.split(" ");
                                                    self.cant_enf = self.cant_enf + parseInt(tmp_enf[0]);

                                                }

                                                $("#text_mat").text(self.cant_mat);
                                                $("#text_enf").text(self.cant_enf);

                                                $("#citt").val("");
                                                $("#fech_ini_med").val("");
                                                $("#fech_fin_med").val("");
                                                $("#tipo_lic").val("0");
                                            }
                                        })
                                        self.regiontabladescansos.show(self.descansosServ)

                                    });
                                    $("#footer_med").show();
                                    $("#act_med").hide();

                                    $("#descMed_message").removeClass("alert-warning");
                                    $("#descMed_message").addClass("alert-success");
                                    $("#descMed_message").html("<strong>Se actualizó con éxito el Descanso Médico</strong>");
                                    $("#descMed_message").show();

                                } else {
                                    $("#descMed_message").removeClass("alert-success");
                                    $("#descMed_message").addClass("alert-warning");
                                    $("#descMed_message").html("<strong>Fechas Incorrectas</strong>");
                                    $("#descMed_message").show();
                                }
                            }
                        }
                        else {


                            $("#descMed_message").removeClass("alert-success");
                            $("#descMed_message").addClass("alert-warning");
                            $("#descMed_message").html("<strong>Campos Obligatorios Incompletos</strong>");
                            $("#descMed_message").show();
                            // alert("CAMPOS OBLIGATORIOS INCOMPLETOS");
                        }

                    }else{
                        $("#descMed_message").removeClass("alert-warning");
                        $("#descMed_message").addClass("alert-danger");
                        $("#descMed_message").html("<strong>Las fechas ingresadas se cruzan alguna de sus licencias</strong>");
                        $("#descMed_message").show();
                    }


                },
                fun_edit_desc: function (ev) {
                    var clickedElement = $(ev.currentTarget);
                    $("#footer_med").hide();
                    $("#act_med").show();
                    $("#descMed_message").hide();
                    var ciit = clickedElement.parent().parent().children(':nth-child(1)').text();
                    var fech_ini = clickedElement.parent().parent().children(':nth-child(3)').text();
                    var fech_fin = clickedElement.parent().parent().children(':nth-child(4)').text();
                    var tip_lic = clickedElement.parent().parent().children(':nth-child(2)').text();
                    var tmp_dias = clickedElement.parent().parent().children(':nth-child(5)').text();
                    this.idDescMed = clickedElement.parent().parent().attr("id");
                    var idTip;

                    var aux = tmp_dias.split(" ");


                    if (tip_lic == "ENFERMEDAD") {
                        idTip = 1;
                        this.aux_enf = parseInt(aux[0]);
                        this.aux_mat = 0;
                        //this.cant_enf=this.cant_enf-parseInt(aux[0]);
                    }
                    if (tip_lic == "MATERNIDAD") {
                        idTip = 2;
                        this.aux_mat = parseInt(aux[0]);
                        this.aux_enf = 0;
                        // this.cant_mat=this.cant_mat-parseInt(aux[0]);
                    }
                    $("#citt").val(ciit);
                    $("#fech_ini_med").val(fech_ini);
                    $("#fech_fin_med").val(fech_fin);
                    $("#tipo_lic").val(idTip);


                },
                hide_lista_serv: function (e) {
                    var self = this;
                    var clickedElement = $(e.currentTarget);

                    var dni_serv = clickedElement.children(':nth-child(2)').text();
                    var descrip_serv = clickedElement.children(':nth-child(1)').text();
                    var codAnt_serv = clickedElement.children(':nth-child(3)').text();
                    var estado_serv = clickedElement.children(':nth-child(6)').text();
                    var abv_est = clickedElement.attr('data3');
                    var abv_tip = clickedElement.attr('data4');
                    $("#div_dias").hide();
                    this.dni = dni_serv;
                    this.numserest = clickedElement.children(':nth-child(7)').text()


                    $("#dni_serv").text(dni_serv);
                    $("#descrip_serv").text(descrip_serv);
                    $("#codAnt_serv").text(codAnt_serv);
                    $("#estado_serv").text(abv_est + " - " + abv_tip);

                    $("#reg_descrip").show();
                    $("#footer_med").show();
                    $("#list_serv_reg").modal("hide");
                    self.cant_enf = 0;
                    self.cant_mat = 0;

                    /*for(var i=0;i<self.listaServView.collection.length;i++){
                     self.fechas_iniciales[i]= self.listaServView.collection.at(i).get("")
                     self.fechas_finales[i]=self.listaServView.collection.at(i).get("")
                     }*/
                    var self_s = self.descansosServ.fetchDescansos(self.dni, self.numserest, function () {

                        for (var i = 0; i < self.descansosServ.collection.length; i++) {
                            if (self.descansosServ.collection.at(i).get("tipo_lic") == "MATERNIDAD") {

                                var palabra1 = self.descansosServ.collection.at(i).get("tiempo").split(" ");

                                self.cant_mat = self.cant_mat + parseInt(palabra1[0]);
                            }
                            if (self.descansosServ.collection.at(i).get("tipo_lic") == "ENFERMEDAD") {
                                var palabra2 = self.descansosServ.collection.at(i).get("tiempo").split(" ");


                                self.cant_enf = self.cant_enf + parseInt(palabra2[0]);
                            }

                            self.fechas_iniciales[i] = self.descansosServ.collection.at(i).get("f_inicio")
                            self.fechas_finales[i] = self.descansosServ.collection.at(i).get("f_fin")
                            console.log(self.descansosServ.collection.at(i).get("f_inicio"))
                            console.log(self.fechas_finales[i] + "***" + self.fechas_iniciales[i]);

                        }

                        if (self.descansosServ.collection.length != 0) {

                            $("#table-descansos-servidor").dataTable();
                            $('#table-descansos-servidor_wrapper').append("<div id='footer-table'></div>");
                            $("#table-descansos-servidor_filter").append("<div  style='float: left;width: 79%;' id='div_dias'> <div style='float: left;margin-left: 21%;'><label class=' control-label'>Maternidad  dias:</label><span id='text_mat'></span></div><div  style='float: left;margin-left: 31%;'><label class='control-label'>Enfermedad  dias:</label><span id='text_enf'></span></div></div>");
                            $("#table-descansos-servidor_filter>label").addClass("buscador_desc");
                            $('#table-descansos-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                            $('#table-descansos-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                            $('.dataTables_filter input').attr('placeholder', 'Buscar..');
                            $("#text_mat").text(self.cant_mat);
                            $("#text_enf").text(self.cant_enf);
                        }
                    });
                    self.regiontabladescansos.show(self.descansosServ)
                    /*$("#text_mat").text(this.cant_mat);
                     $("#text_enf").text(this.cant_enf);*/
                },
                show_fech_med: function () {
                    var med_inicio = $('#fech_ini_med');

                    med_inicio.datepicker({
                        format: 'dd/mm/yyyy',
                        viewMode: 2
                    });

                    med_inicio.datepicker('show');
                },
                hide_fech_ini: function () {
                    $("#fech_ini_med").val("");
                },
                show_fech_fin: function () {
                    var med_fin = $('#fech_fin_med');

                    med_fin.datepicker({
                        format: 'dd/mm/yyyy',
                        viewMode: 2
                    });

                    med_fin.datepicker('show');
                },
                hide_fech_fin: function () {
                    $("#fech_fin_med").val("");
                },
                comprobar_fecha_descmedico: function (fechIni, fechFin) {
                    console.log(fechIni+"*****************"+fechFin);
                    function dateToDMY(date) {
                        var d = date.getDate();
                        var m = date.getMonth() + 1;
                        var y = date.getFullYear();
                        return '' + (d <= 9 ? '0' + d : d) + '/' + (m <= 9 ? '0' + m : m) + '/' + y;
                    }

                    var f_ini_ingr = dateToDMY(new Date(fechIni));
                    var f_fin_ingr = dateToDMY(new Date(fechFin));
                    console.log("antes de enttrar"+f_ini_ingr+"--"+f_fin_ingr)
                    if(this.fechas_iniciales.length!=0){
                        for (var i = 0; i < this.fechas_iniciales.length; i++) {
                            var f_ini_tabla = dateToDMY(new Date(this.fechas_iniciales[i]));
                            var f_fin_tabla = dateToDMY(new Date(this.fechas_finales[i]));
                            console.log("----"+f_ini_tabla+"-----"+f_fin_ingr);
                            if ((f_ini_tabla <= f_ini_ingr && f_ini_ingr <= f_fin_tabla) || (f_ini_tabla <= f_fin_ingr && f_fin_ingr <= f_fin_tabla)
                                || (f_ini_ingr <= f_ini_tabla && f_ini_tabla <= f_fin_ingr) || (f_ini_ingr <= f_fin_tabla && f_fin_tabla <= f_fin_ingr)) {
                                return (false)
                                break;
                            } else {
                                return (true)
                            }
                        }
                    }else{
                        return (true)
                    }


                },
                fun_save_descMed: function () {
                    if (this.comprobar_fecha_descmedico($("#fech_ini_med").val(), $("#fech_fin_med").val())) {
                        var self = this;
                        var diaI = parseInt($("#fech_ini_med").val().substring(0, 2));
                        var mesI = parseInt($("#fech_ini_med").val().substring(3, 5));
                        var anioI = parseInt($("#fech_ini_med").val().substring(6, 10));
                        var fechaInic = 365 * anioI + 30 * mesI + diaI;

                        var diaF = parseInt($("#fech_fin_med").val().substring(0, 2));
                        var mesF = parseInt($("#fech_fin_med").val().substring(3, 5));
                        var anioF = parseInt($("#fech_fin_med").val().substring(6, 10));
                        var fechaFin = 365 * anioF + 30 * mesF + diaF;

                        var tiempo = (fechaFin - fechaInic + 1);


                        // alert(tiempo);
                        if ($("#citt").val() != "" && $("#fech_ini_med").val() != "" && $("#fech_fin_med").val() != "") {

                            if ($("#tipo_lic").val() == "0") {
                                $("#descMed_message").removeClass("alert-success");
                                $("#descMed_message").addClass("alert-warning");
                                $("#descMed_message").html("<strong>Seleccione Tipo de Licencia</strong>");
                                $("#descMed_message").show();
                                //alert("SELECCIONE TIPO DE LICENCIA");
                            }
                            else {
                                if (fechaFin > fechaInic) {


                                    // alert($("#tipo_lic option:selected").html());
                                    $("#div_dias").show();

                                    self.model.get("addDescanso").set({
                                        "id_serv": self.dni,
                                        "numserest": parseInt(self.numserest),
                                        "citt": $("#citt").val(),
                                        "f_inicio": $("#fech_ini_med").val(),
                                        "f_fin": $("#fech_fin_med").val(),
                                        "tipo_lic": $("#tipo_lic option:selected").html(),
                                        "tiempo": tiempo
                                    });

                                    self.model.get("addDescanso").url = "rest/descansos/addDescanso";

                                    var self_s = self.model.get("addDescanso").save({}, {wait: true});

                                    self_s.done(function () {

                                    });
                                    self_s.fail(function () {
                                        self.descansosServ.fetchDescansos(self.dni, self.numserest, function () {
                                            if (self.descansosServ.collection.length != 0) {
                                                $("#table-descansos-servidor").dataTable();
                                                $('#table-descansos-servidor_wrapper').append("<div id='footer-table'></div>");
                                                $("#table-descansos-servidor_filter").append("<div  style='float: left;width: 79%;' id='div_dias'> <div style='float: left;margin-left: 21%;'><label class=' control-label'>Maternidad  dias:</label><span id='text_mat'>0</span></div><div  style='float: left;margin-left: 31%;'><label class='control-label'>Enfermedad  dias:</label><span id='text_enf'>365</span></div></div>");
                                                $("#table-descansos-servidor_filter>label").addClass("buscador_desc");
                                                $('#table-descansos-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                $('#table-descansos-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                                                $('.dataTables_filter input').attr('placeholder', 'Buscar..');

                                                if ($("#tipo_lic option:selected").html() == "MATERNIDAD") {
                                                    var tmp_mat = tiempo.split(" ");
                                                    self.cant_mat = self.cant_mat + parseInt(tmp_mat[0]);

                                                }
                                                if ($("#tipo_lic option:selected").html() == "ENFERMEDAD") {
                                                    var tmp_enf = tiempo.split(" ");
                                                    self.cant_enf = self.cant_enf + parseInt(tmp_enf[0]);

                                                }

                                                $("#text_mat").text(self.cant_mat);
                                                $("#text_enf").text(self.cant_enf);
                                                $("#citt").val("");
                                                $("#fech_ini_med").val("");
                                                $("#fech_fin_med").val("");
                                                $("#tipo_lic").val("0");
                                            }
                                        })
                                        self.regiontabladescansos.show(self.descansosServ)
                                    })


                                    $("#descMed_message").removeClass("alert-warning");
                                    $("#descMed_message").addClass("alert-success");
                                    $("#descMed_message").html("<strong>Se registró con éxito el Descanso Médico</strong>");
                                    $("#descMed_message").show();
                                }
                                else {
                                    //alert("FECHAS INCORRECTAS");
                                    $("#descMed_message").removeClass("alert-success");
                                    $("#descMed_message").addClass("alert-warning");
                                    $("#descMed_message").html("<strong>Fechas Incorrectas</strong>");
                                    $("#descMed_message").show();
                                }

                            }

                        }
                        else {


                            $("#descMed_message").removeClass("alert-success");
                            $("#descMed_message").addClass("alert-warning");
                            $("#descMed_message").html("<strong>Campos Obligatorios Incompletos</strong>");
                            $("#descMed_message").show();
                            // alert("CAMPOS OBLIGATORIOS INCOMPLETOS");
                        }
                    } else {
                        $("#descMed_message").removeClass("alert-warning");
                        $("#descMed_message").addClass("alert-danger");
                        $("#descMed_message").html("<strong>Las fechas ingresadas se cruzan alguna de sus licencias</strong>");
                        $("#descMed_message").show();
                    }
                },
                fun_eliminar: function (e) {
                    var clickedElement = $(e.currentTarget);
                    var tmp_dias = clickedElement.parent().parent().children(':nth-child(5)').text();
                    var tip_lic = clickedElement.parent().parent().children(':nth-child(2)').text();

                    this.idDescMed = clickedElement.parent().parent().attr("id");
                    var aux = tmp_dias.split(" ");


                    if (tip_lic == "ENFERMEDAD") {

                        this.aux_enf = parseInt(aux[0]);
                        this.aux_mat = 0;
                        //this.cant_enf=this.cant_enf-parseInt(aux[0]);
                    }
                    if (tip_lic == "MATERNIDAD") {

                        this.aux_mat = parseInt(aux[0]);
                        this.aux_enf = 0;
                        // this.cant_mat=this.cant_mat-parseInt(aux[0]);
                    }

                },
                fun_delete_descMed: function () {

                    var self = this;
                    var idDescMedico = self.idDescMed;
                    var url = 'rest/descansos/deleteDescansoMed/' + idDescMedico;

                    self.cant_enf = self.cant_enf - self.aux_enf;
                    self.cant_mat = self.cant_mat - self.aux_mat;


                    $.ajax({
                        type: 'DELETE',
                        url: url,
                        success: function () {


                        },
                        error: function () {

                            self.descansosServ.fetchDescansos(self.dni, self.numserest, function () {
                                if (self.descansosServ.collection.length != 0) {
                                    $("#table-descansos-servidor").dataTable();
                                    $('#table-descansos-servidor_wrapper').append("<div id='footer-table'></div>");
                                    $("#table-descansos-servidor_filter").append("<div  style='float: left;width: 79%;' id='div_dias'> <div style='float: left;margin-left: 21%;'><label class=' control-label'>Maternidad  dias:</label><span id='text_mat'>0</span></div><div  style='float: left;margin-left: 31%;'><label class='control-label'>Enfermedad  dias:</label><span id='text_enf'>365</span></div></div>");
                                    $("#table-descansos-servidor_filter>label").addClass("buscador_desc");
                                    $('#table-descansos-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                    $('#table-descansos-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                                    $('.dataTables_filter input').attr('placeholder', 'Buscar..');

                                    $("#text_mat").text(self.cant_mat);
                                    $("#text_enf").text(self.cant_enf);
                                }
                            })
                            self.regiontabladescansos.show(self.descansosServ)

                        }
                    });

                },

                fun_buscar_desc: function () {
                    var self = this;

                    self.tablaDescansoTotales.fetchDescansostotales($("#mes_desc").val(), $("#anio_desc").val(), function () {
                        if (self.tablaDescansoTotales.collection.length != 0) {
                            $("#reporte_show").show();
                            $("#table-descansos-totales").dataTable();
                            $('#table-descansos-totales_wrapper').append("<div id='footer-table'></div>");
                            $('#table-descansos-totales_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                            $('#table-descansos-totales_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                            $('.dataTables_filter input').attr('placeholder', 'Buscar..');
                        }
                    });

                    self.regiontabladescansostotales.show(self.tablaDescansoTotales);

                }


            });
        });
        return ErzaManager.DescansoMedicoApp.list.View;
    });