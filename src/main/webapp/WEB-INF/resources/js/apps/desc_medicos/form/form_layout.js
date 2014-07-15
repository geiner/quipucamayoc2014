define(['app', 'hbs!apps/desc_medicos/form/templates/inicio_desc_medicos', 'apps/resoluciones/form/view/servidor-view', 'apps/desc_medicos/form/model/save_descanso',
        'apps/desc_medicos/form/view/descansos_serv', 'apps/desc_medicos/form/model/update_descanso', 'apps/desc_medicos/form/view/tabla_descansos_totales',
        'apps/desc_medicos/form/view/total_acumulado','apps/desc_medicos/form/view/list_citt',
        'lib/bootstrap-datetimepicker.min', "lib/moment", "lib/jquery.dataTables.min", "jquery","lib/core/validXtrem", "lib/bootstrap-datepicker", "bootstrap"],
    function (ErzaManager, layoutTpl, listaServView, addDescanso, DescansosServ, UpdateDescanso, TablaDescansoTotales, TotalAcumulado,ListCITT) {
        ErzaManager.module('DescansoMedicoApp.list.View', function (View, ErzaManager, Backbone, Marionette, $, _) {

            View.Layout = Marionette.Layout.extend({
                template: layoutTpl,

                listaServView: new listaServView(),
                descansosServ: new DescansosServ(),
                totalAcumulado: new TotalAcumulado(),
                tablaDescansoTotales: new TablaDescansoTotales(),
                "listcitt": new ListCITT(),



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
                    "click #nuevo_med": "fun_nuevo",
//                    "click #edit_desc": "fun_edit_desc",
                    "click #update_cancel": "fun_cancel_edit",
                    "click #update_med": "fun_edit_action",
                    "click #search_desc": "fun_buscar_desc",
                    "click #select-all": "seleccionarTodosLosServidores",
                    "click #table-descansos-totales > tbody > tr ": "clickServidorRow",
                    "click .b": "cambiar_tab_reportes",
                    "click .a":"cambiar_tab_registrar",
                    "click #option1":"citt_en_tramite",
                    "click #option2":"asignar_citt",
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

                },
                citt_en_tramite:function(){
                    $('#citt').val("EN TRAMITE");
                    $('#citt').attr('disabled','disabled');
                },
                asignar_citt:function(){
                    $('#citt').val("");
                    $('#citt').removeAttr('disabled','disabled');
                },
                descargarReporteDescansos: function () {
                    var dnis = "";
                    if (this.servidoresSeleccionados.length == 0) {
                        $("#descMed_message").removeClass("alert-success");
                        $("#descMed_message").removeClass("alert-danger");
                        $("#descMed_message").addClass("alert-warning");
                        $("#descMed_message").html("<strong>debe seleccionar al menos un DNI</strong>");
                        $("#descMed_message").show();
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
                    }
                    ;

                },

                lista_servidor: function (ev) {
                    $('#cancel_med').click();
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
                fun_nuevo:function(){
                    $("#descMed_message").hide();
                    $('#cancel_med').click();
                    $("#dni_serv").text("");
                    $("#descrip_serv").text("");
                    $("#codAnt_serv").text("");
                    $("#estado_serv").text("");

                    $("#reg_descrip").hide();

                    this.regiontabladescansos.reset();

                    $('#footer_med').hide();


                },
                cambiar_tab_registrar:function(){
                    $("#serv_desc_med").show();
                },
                cambiar_tab_reportes: function () {
                    $("#descMed_message").hide();
                    $("#serv_desc_med").hide();
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

                            if ($("#tipo_lic").val() ==0) {
                                $("#descMed_message").removeClass("alert-success");
                                $("#descMed_message").removeClass("alert-danger");
                                $("#descMed_message").addClass("alert-warning");
                                $("#descMed_message").html("<strong>Seleccione Tipo de Licencia</strong>");
                                $("#descMed_message").show();
                            }else {
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
                                    $("#descMed_message").removeClass("alert-danger");
                                    $("#descMed_message").addClass("alert-success");
                                    $("#descMed_message").html("<strong>Se actualizó con éxito el Descanso Médico</strong>");
                                    $("#descMed_message").show();

                                } else {
                                    $("#descMed_message").removeClass("alert-success");
                                    $("#descMed_message").removeClass("alert-danger");
                                    $("#descMed_message").addClass("alert-warning");
                                    $("#descMed_message").html("<strong>Fechas Incorrectas</strong>");
                                    $("#descMed_message").show();
                                }
                            }
                        }else {
                            $("#descMed_message").removeClass("alert-success");
                            $("#descMed_message").removeClass("alert-danger");
                            $("#descMed_message").addClass("alert-warning");
                            $("#descMed_message").html("<strong>Campos Obligatorios Incompletos</strong>");
                            $("#descMed_message").show();
                        }

                    } else {
                        $("#descMed_message").removeClass("alert-warning");
                        $("#descMed_message").removeClass("alert-success");
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
                    $("#descMed_message").hide();

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

                    var self_s = self.descansosServ.fetchDescansos(self.dni, self.numserest, function () {
                        self.fechas_iniciales.length = 0;
                        self.fechas_finales.length = 0;
                        var acumulado = 0;
                        self.totalAcumulado.fetchtotal(self.dni, self.numserest, function () {
                            if (self.totalAcumulado.collection.length != 0) {
                                for (var i = 0; i < self.totalAcumulado.collection.length; i++) {
                                    acumulado = acumulado + parseInt(self.totalAcumulado.collection.at(i).get("tiempo"));
                                }
                                $("#text_acum").text(acumulado);
                            }
                        });
                        for (var i = 0; i < self.descansosServ.collection.length; i++) {
                            if (self.descansosServ.collection.at(i).get("tipo_lic") == "MATERNIDAD") {

                                var palabra1 = self.descansosServ.collection.at(i).get("tiempo");

                                self.cant_mat = self.cant_mat + parseInt(palabra1);
                            }
                            if (self.descansosServ.collection.at(i).get("tipo_lic") == "ENFERMEDAD") {
                                var palabra2 = self.descansosServ.collection.at(i).get("tiempo");


                                self.cant_enf = self.cant_enf + parseInt(palabra2);
                            }

                            self.fechas_iniciales[i] = self.descansosServ.collection.at(i).get("f_inicio")
                            self.fechas_finales[i] = self.descansosServ.collection.at(i).get("f_fin")
                            console.log(self.descansosServ.collection.at(i).get("f_inicio"))
                            console.log(self.fechas_finales[i] + "***" + self.fechas_iniciales[i]);

                        }

                        if (self.descansosServ.collection.length != 0) {

                            $("#table-descansos-servidor").dataTable();
                            $('#table-descansos-servidor_wrapper').append("<div id='footer-table'></div>");
                            $("#table-descansos-servidor_filter").append("<div  style='float: left;width: 79%;' id='div_dias'> <div style='float: left;margin-left: 10%;'><label class=' control-label'>Maternidad  dias:</label><span id='text_mat'></span></div><div  style='float: left;margin-left: 15%;'><label class='control-label'>Enfermedad  dias:</label><span id='text_enf'></span></div><div  style='float: left;margin-left: 15%;'><label class='control-label'>Acumulado dias:</label><span id='text_acum'></span></div></div>");
                            $("#table-descansos-servidor_filter>label").addClass("buscador_desc");
                            $('#table-descansos-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                            $('#table-descansos-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                            $('.dataTables_filter input').attr('placeholder', 'Buscar..');
                            $("#text_mat").text(self.cant_mat);
                            $("#text_enf").text(self.cant_enf);
                        }
                    });
                    self.regiontabladescansos.show(self.descansosServ)
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
                                console.log("mayor mes:" + fecha + " - " + fecha2)
                                return(true);
                            }
                            else {
                                if (parseInt(xMonth) == parseInt(yMonth)) {
                                    if (parseInt(xDay) >= parseInt(yDay)) {
                                        console.log("mayor dia :" + fecha + " - " + fecha2)
                                        return(true);
                                    }
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
                Comparar_Fecha2: function (fecha, fecha2) {
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
                comprobar_fecha_descmedico: function (fechIni, fechFin) {
                    console.log(fechIni + "*****************" + fechFin);
                    var self = this;

                    function dateToDMY(date) {
                        var m = date.getDate();
                        var d = date.getMonth() + 1;
                        var y = date.getFullYear();
                        return '' + (d <= 9 ? '0' + d : d) + '/' + (m <= 9 ? '0' + m : m) + '/' + y;
                    }

                    var f_ini_ingr = fechIni;
                    var f_fin_ingr = fechFin;
                    var bandera;
                    console.log("antes de enttrar" + f_ini_ingr + "--" + f_fin_ingr)
                    if (this.fechas_iniciales.length != 0) {
                        for (var i = 0; i < this.fechas_iniciales.length; i++) {
                            var f_ini_tabla = this.fechas_iniciales[i];
                            var f_fin_tabla = this.fechas_finales[i];
                            console.log("----" + f_ini_tabla + "-----" + f_fin_tabla);
                            if ((self.Comparar_Fecha(f_fin_ingr, f_ini_tabla) && self.Comparar_Fecha(f_fin_tabla, f_ini_ingr)) || (self.Comparar_Fecha(f_fin_ingr, f_ini_tabla) && self.Comparar_Fecha(f_fin_tabla, f_fin_ingr))
                                || (self.Comparar_Fecha(f_ini_tabla, f_ini_ingr) && self.Comparar_Fecha(f_fin_ingr, f_fin_tabla))) {
                                bandera = false;
                                console.log("esta es la  bandera : " + bandera)
                                return (false);
                                break;
                            }
                        }
                        bandera = true;
                        console.log("esta es la  bandera1 : " + bandera)
                        return true;
                    } else {
                        bandera = true;
                        console.log("esta es la  bandera : " + bandera)
                        return true;
                    }

                },
                fun_save_descMed: function () {
                    var self = this;
                    var diasdelmes;
                    var mesactual;
                    var tiempo=0;
                    var diaI = parseInt($("#fech_ini_med").val().substring(0, 2));
                    var mesI = parseInt($("#fech_ini_med").val().substring(3, 5));
                    var anioI = parseInt($("#fech_ini_med").val().substring(6, 10));
                    var fechaInic = 365 * anioI + 30 * mesI + diaI;

                    var diaF = parseInt($("#fech_fin_med").val().substring(0, 2));
                    var mesF = parseInt($("#fech_fin_med").val().substring(3, 5));
                    var anioF = parseInt($("#fech_fin_med").val().substring(6, 10));
                    var fechaFin = 365 * anioF + 30 * mesF + diaF;

                    mesactual=mesI;
                    if((mesF-mesI)>0){
                        while(mesactual != mesF){
                            if (mesactual == 4 || mesactual == 6 || mesactual == 9 || mesactual == 11){
                                diasdelmes = 30;
                            }else{
                                if (mesactual == 2){
                                    diasdelmes = 28;
                                } else{
                                    diasdelmes = 31;
                                }
                            };

                            if(mesactual==mesI){
                                tiempo=tiempo+((diasdelmes-diaI)+1);
                            }else{
                                tiempo=tiempo+diasdelmes;
                            };

                            if(mesactual==12){
                                mesactual=1;
                                anioI=anioI+1;
                            }else{
                                mesactual=mesactual+1;
                            }
                        }
                        tiempo=tiempo+diaF;
                    }else{
                        tiempo=(diaF-diaI)+1;
                    }

                    console.log(tiempo+" este es el tiempo");

                    if ($("#citt").val() != "") {
                        if ($("#fech_ini_med").val() != ""){
                            if ($("#fech_fin_med").val() != ""){
                                if ($("#tipo_lic").val() != "0") {
                                    if(this.Comparar_Fecha2($("#fech_fin_med").val(), $("#fech_ini_med").val())){
                                        if (this.comprobar_fecha_descmedico($("#fech_ini_med").val(), $("#fech_fin_med").val())) {
                                            if($("#tipo_lic").val() == "1"){
                                                if(parseInt(tiempo) <= 30){
                                                    if (fechaFin > fechaInic) {
                                                        var self=this;
                                                        var citt=$("#citt").val();
                                                        if($("input[name='optionsRadios']:checked").val()=="option2"){
                                                            self.listcitt.fetchcitt(citt,function(){
                                                                if(self.listcitt.collection.length == 0){
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
                                                                        self.cant_mat = 0;
                                                                        self.cant_enf = 0;
                                                                        self.descansosServ.fetchDescansos(self.dni, self.numserest, function () {
                                                                            var acumulado = 0;
                                                                            self.totalAcumulado.fetchtotal(self.dni, self.numserest, function () {
                                                                                if (self.totalAcumulado.collection.length != 0) {
                                                                                    for (var i = 0; i < self.totalAcumulado.collection.length; i++) {
                                                                                        acumulado = acumulado + parseInt(self.totalAcumulado.collection.at(i).get("tiempo"));
                                                                                    }
                                                                                    $("#text_acum").text(acumulado);
                                                                                }
                                                                            });
                                                                            for (var i = 0; i < self.descansosServ.collection.length; i++) {
                                                                                if (self.descansosServ.collection.at(i).get("tipo_lic") == "MATERNIDAD") {

                                                                                    var palabra1 = self.descansosServ.collection.at(i).get("tiempo");

                                                                                    self.cant_mat = self.cant_mat + parseInt(palabra1);
                                                                                }
                                                                                if (self.descansosServ.collection.at(i).get("tipo_lic") == "ENFERMEDAD") {
                                                                                    var palabra2 = self.descansosServ.collection.at(i).get("tiempo");
                                                                                    self.cant_enf = self.cant_enf + parseInt(palabra2);
                                                                                }

                                                                                self.fechas_iniciales[i] = self.descansosServ.collection.at(i).get("f_inicio")
                                                                                self.fechas_finales[i] = self.descansosServ.collection.at(i).get("f_fin")
                                                                                console.log(self.descansosServ.collection.at(i).get("f_inicio"))
                                                                                console.log(self.fechas_finales[i] + "***" + self.fechas_iniciales[i]);

                                                                            }
                                                                            if (self.descansosServ.collection.length != 0) {
                                                                                $("#table-descansos-servidor").dataTable();
                                                                                $('#table-descansos-servidor_wrapper').append("<div id='footer-table'></div>");
                                                                                $("#table-descansos-servidor_filter").append("<div  style='float: left;width: 79%;' id='div_dias'> <div style='float: left;margin-left: 10%;'><label class=' control-label'>Maternidad  dias:</label><span id='text_mat'></span></div><div  style='float: left;margin-left: 15%;'><label class='control-label'>Enfermedad  dias:</label><span id='text_enf'></span></div><div  style='float: left;margin-left: 15%;'><label class='control-label'>Acumulado dias:</label><span id='text_acum'></span></div></div>");
                                                                                $("#table-descansos-servidor_filter>label").addClass("buscador_desc");
                                                                                $('#table-descansos-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                                                $('#table-descansos-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                                                                                $('.dataTables_filter input').attr('placeholder', 'Buscar..');

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
                                                                    $("#descMed_message").removeClass("alert-danger")
                                                                    $("#descMed_message").addClass("alert-success");
                                                                    $("#descMed_message").html("<strong>Se registró con éxito el Descanso Médico</strong>");
                                                                    $("#descMed_message").show();
                                                                }else{
                                                                    $("#descMed_message").removeClass("alert-warning");
                                                                    $("#descMed_message").removeClass("alert-success")
                                                                    $("#descMed_message").addClass("alert-danger");
                                                                    $("#descMed_message").html("<strong>El Citt ingresado ya existe</strong>");
                                                                    $("#descMed_message").show();
                                                                }
                                                            });

                                                        }else{
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
                                                                self.cant_mat = 0;
                                                                self.cant_enf = 0;
                                                                self.descansosServ.fetchDescansos(self.dni, self.numserest, function () {
                                                                    var acumulado = 0;
                                                                    self.totalAcumulado.fetchtotal(self.dni, self.numserest, function () {
                                                                        if (self.totalAcumulado.collection.length != 0) {
                                                                            for (var i = 0; i < self.totalAcumulado.collection.length; i++) {
                                                                                acumulado = acumulado + parseInt(self.totalAcumulado.collection.at(i).get("tiempo"));
                                                                            }
                                                                            $("#text_acum").text(acumulado);
                                                                        }
                                                                    });
                                                                    for (var i = 0; i < self.descansosServ.collection.length; i++) {
                                                                        if (self.descansosServ.collection.at(i).get("tipo_lic") == "MATERNIDAD") {

                                                                            var palabra1 = self.descansosServ.collection.at(i).get("tiempo");

                                                                            self.cant_mat = self.cant_mat + parseInt(palabra1);
                                                                        }
                                                                        if (self.descansosServ.collection.at(i).get("tipo_lic") == "ENFERMEDAD") {
                                                                            var palabra2 = self.descansosServ.collection.at(i).get("tiempo");
                                                                            self.cant_enf = self.cant_enf + parseInt(palabra2);
                                                                        }

                                                                        self.fechas_iniciales[i] = self.descansosServ.collection.at(i).get("f_inicio")
                                                                        self.fechas_finales[i] = self.descansosServ.collection.at(i).get("f_fin")
                                                                        console.log(self.descansosServ.collection.at(i).get("f_inicio"))
                                                                        console.log(self.fechas_finales[i] + "***" + self.fechas_iniciales[i]);

                                                                    }
                                                                    if (self.descansosServ.collection.length != 0) {
                                                                        $("#table-descansos-servidor").dataTable();
                                                                        $('#table-descansos-servidor_wrapper').append("<div id='footer-table'></div>");
                                                                        $("#table-descansos-servidor_filter").append("<div  style='float: left;width: 79%;' id='div_dias'> <div style='float: left;margin-left: 10%;'><label class=' control-label'>Maternidad  dias:</label><span id='text_mat'></span></div><div  style='float: left;margin-left: 15%;'><label class='control-label'>Enfermedad  dias:</label><span id='text_enf'></span></div><div  style='float: left;margin-left: 15%;'><label class='control-label'>Acumulado dias:</label><span id='text_acum'></span></div></div>");
                                                                        $("#table-descansos-servidor_filter>label").addClass("buscador_desc");
                                                                        $('#table-descansos-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                                                        $('#table-descansos-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                                                                        $('.dataTables_filter input').attr('placeholder', 'Buscar..');

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
                                                            $("#descMed_message").removeClass("alert-danger")
                                                            $("#descMed_message").addClass("alert-success");
                                                            $("#descMed_message").html("<strong>Se registró con éxito el Descanso Médico</strong>");
                                                            $("#descMed_message").show();
                                                        };

                                                    }
                                                    else {
                                                        $("#descMed_message").removeClass("alert-success");
                                                        $("#descMed_message").removeClass("alert-danger")
                                                        $("#descMed_message").addClass("alert-warning");
                                                        $("#descMed_message").html("<strong>Fechas Incorrectas</strong>");
                                                        $("#descMed_message").show();
                                                    }
                                                }else{
                                                    $("#descMed_message").removeClass("alert-warning");
                                                    $("#descMed_message").removeClass("alert-success")
                                                    $("#descMed_message").addClass("alert-danger");
                                                    $("#descMed_message").html("<strong>Esta permitido un maximo de 30 dias para las licencias por enfermedad</strong>");
                                                    $("#descMed_message").show();
                                                }
                                            };
                                            if($("#tipo_lic").val() == "2"){
                                                if(parseInt(tiempo) <= 90){
                                                    if (fechaFin > fechaInic) {
                                                        var self=this;
                                                        var citt=$("#citt").val();
                                                        if($("input[name='optionsRadios']:checked").val()=="option2"){
                                                            self.listcitt.fetchcitt(citt,function(){

                                                                if(self.listcitt.collection.length == 0){
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
                                                                        self.cant_mat = 0;
                                                                        self.cant_enf = 0;
                                                                        self.descansosServ.fetchDescansos(self.dni, self.numserest, function () {
                                                                            var acumulado = 0;
                                                                            self.totalAcumulado.fetchtotal(self.dni, self.numserest, function () {
                                                                                if (self.totalAcumulado.collection.length != 0) {
                                                                                    for (var i = 0; i < self.totalAcumulado.collection.length; i++) {
                                                                                        acumulado = acumulado + parseInt(self.totalAcumulado.collection.at(i).get("tiempo"));
                                                                                    }
                                                                                    $("#text_acum").text(acumulado);
                                                                                }
                                                                            });
                                                                            for (var i = 0; i < self.descansosServ.collection.length; i++) {
                                                                                if (self.descansosServ.collection.at(i).get("tipo_lic") == "MATERNIDAD") {

                                                                                    var palabra1 = self.descansosServ.collection.at(i).get("tiempo");

                                                                                    self.cant_mat = self.cant_mat + parseInt(palabra1);
                                                                                }
                                                                                if (self.descansosServ.collection.at(i).get("tipo_lic") == "ENFERMEDAD") {
                                                                                    var palabra2 = self.descansosServ.collection.at(i).get("tiempo");
                                                                                    self.cant_enf = self.cant_enf + parseInt(palabra2);
                                                                                }

                                                                                self.fechas_iniciales[i] = self.descansosServ.collection.at(i).get("f_inicio")
                                                                                self.fechas_finales[i] = self.descansosServ.collection.at(i).get("f_fin")
                                                                                console.log(self.descansosServ.collection.at(i).get("f_inicio"))
                                                                                console.log(self.fechas_finales[i] + "***" + self.fechas_iniciales[i]);

                                                                            }
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
                                                                                $("#citt").val("");
                                                                                $("#fech_ini_med").val("");
                                                                                $("#fech_fin_med").val("");
                                                                                $("#tipo_lic").val("0");
                                                                            }
                                                                        })
                                                                        self.regiontabladescansos.show(self.descansosServ)
                                                                    })


                                                                    $("#descMed_message").removeClass("alert-warning");
                                                                    $("#descMed_message").removeClass("alert-danger");
                                                                    $("#descMed_message").addClass("alert-success");
                                                                    $("#descMed_message").html("<strong>Se registró con éxito el Descanso Médico</strong>");
                                                                    $("#descMed_message").show();
                                                                }else{
                                                                    $("#descMed_message").removeClass("alert-warning");
                                                                    $("#descMed_message").removeClass("alert-success");
                                                                    $("#descMed_message").addClass("alert-danger");
                                                                    $("#descMed_message").html("<strong>El Citt ingresado ya existe/strong>");
                                                                    $("#descMed_message").show();
                                                                }
                                                            });

                                                        }else{
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
                                                                self.cant_mat = 0;
                                                                self.cant_enf = 0;
                                                                self.descansosServ.fetchDescansos(self.dni, self.numserest, function () {
                                                                    var acumulado = 0;
                                                                    self.totalAcumulado.fetchtotal(self.dni, self.numserest, function () {
                                                                        if (self.totalAcumulado.collection.length != 0) {
                                                                            for (var i = 0; i < self.totalAcumulado.collection.length; i++) {
                                                                                acumulado = acumulado + parseInt(self.totalAcumulado.collection.at(i).get("tiempo"));
                                                                            }
                                                                            $("#text_acum").text(acumulado);
                                                                        }
                                                                    });
                                                                    for (var i = 0; i < self.descansosServ.collection.length; i++) {
                                                                        if (self.descansosServ.collection.at(i).get("tipo_lic") == "MATERNIDAD") {

                                                                            var palabra1 = self.descansosServ.collection.at(i).get("tiempo");

                                                                            self.cant_mat = self.cant_mat + parseInt(palabra1);
                                                                        }
                                                                        if (self.descansosServ.collection.at(i).get("tipo_lic") == "ENFERMEDAD") {
                                                                            var palabra2 = self.descansosServ.collection.at(i).get("tiempo");
                                                                            self.cant_enf = self.cant_enf + parseInt(palabra2);
                                                                        }

                                                                        self.fechas_iniciales[i] = self.descansosServ.collection.at(i).get("f_inicio")
                                                                        self.fechas_finales[i] = self.descansosServ.collection.at(i).get("f_fin")
                                                                        console.log(self.descansosServ.collection.at(i).get("f_inicio"))
                                                                        console.log(self.fechas_finales[i] + "***" + self.fechas_iniciales[i]);

                                                                    }
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
                                                                        $("#citt").val("");
                                                                        $("#fech_ini_med").val("");
                                                                        $("#fech_fin_med").val("");
                                                                        $("#tipo_lic").val("0");
                                                                    }
                                                                })
                                                                self.regiontabladescansos.show(self.descansosServ)
                                                            })


                                                            $("#descMed_message").removeClass("alert-warning");
                                                            $("#descMed_message").removeClass("alert-danger");
                                                            $("#descMed_message").addClass("alert-success");
                                                            $("#descMed_message").html("<strong>Se registró con éxito el Descanso Médico</strong>");
                                                            $("#descMed_message").show();
                                                        }
                                                    }
                                                    else {
                                                        $("#descMed_message").removeClass("alert-success");
                                                        $("#descMed_message").removeClass("alert-danger");
                                                        $("#descMed_message").addClass("alert-warning");
                                                        $("#descMed_message").html("<strong>Fechas Incorrectas</strong>");
                                                        $("#descMed_message").show();
                                                    }
                                                }else{
                                                    $("#descMed_message").removeClass("alert-warning");
                                                    $("#descMed_message").removeClass("alert-succes");
                                                    $("#descMed_message").addClass("alert-danger");
                                                    $("#descMed_message").html("<strong>Esta permitido un maximo de 90 dias para las licencias por maternidad</strong>");
                                                    $("#descMed_message").show();
                                                }
                                            };
                                        }else{
                                            $("#descMed_message").removeClass("alert-warning");
                                            $("#descMed_message").removeClass("alert-danger");
                                            $("#descMed_message").addClass("alert-danger");
                                            $("#descMed_message").html("<strong>Las fechas ingresadas se cruzan alguna de sus licencias</strong>");
                                            $("#descMed_message").show();
                                        }
                                    }else{
                                        $("#descMed_message").removeClass("alert-success");
                                        $("#descMed_message").removeClass("alert-danger");
                                        $("#descMed_message").addClass("alert-warning");
                                        $("#descMed_message").html("<strong>La fecha final debe ser mayor o igual a la fecha inicial</strong>");
                                        $("#descMed_message").show();
                                    }
                                }else{
                                    $("#descMed_message").removeClass("alert-success");
                                    $("#descMed_message").removeClass("alert-danger");
                                    $("#descMed_message").addClass("alert-warning");
                                    $("#descMed_message").html("<strong>Seleccione Tipo de Licencia</strong>");
                                    $("#descMed_message").show();
                                }
                            }else{
                                $("#descMed_message").removeClass("alert-success");
                                $("#descMed_message").removeClass("alert-danger");
                                $("#descMed_message").addClass("alert-warning");
                                $("#descMed_message").html("<strong>debe llenar la fecha final</strong>");
                                $("#descMed_message").show();
                            }
                        }else{
                            $("#descMed_message").removeClass("alert-success");
                            $("#descMed_message").removeClass("alert-danger");
                            $("#descMed_message").addClass("alert-warning");
                            $("#descMed_message").html("<strong>debe llenar la fecha de inicio</strong>");
                            $("#descMed_message").show();
                        }
                    }else{
                        $("#descMed_message").removeClass("alert-success");
                        $("#descMed_message").removeClass("alert-danger");
                        $("#descMed_message").addClass("alert-warning");
                        $("#descMed_message").html("<strong>El campo obligatorio CITT no ha sido ingresado</strong>");
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
                    }
                    if (tip_lic == "MATERNIDAD") {

                        this.aux_mat = parseInt(aux[0]);
                        this.aux_enf = 0;
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