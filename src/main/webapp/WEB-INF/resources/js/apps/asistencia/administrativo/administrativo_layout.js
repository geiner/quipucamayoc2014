define(['app', 'hbs!apps/asistencia/administrativo/templates/administrativoLayout', "apps/asistencia/administrativo/view/tabla_modal_servidores","apps/planillas/list/view/unidades-dialog",
    "apps/asistencia/administrativo/model/addHorario","apps/asistencia/administrativo/view/tabla_horarios","apps/asistencia/administrativo/view/tipo_documentos","apps/asistencia/administrativo/view/horarios_nocturnos",
    "apps/asistencia/administrativo/view/select_horarios","apps/asistencia/administrativo/model/Horarioactual","apps/asistencia/administrativo/model/AsociacionHorario",
        'lib/bootstrap-datetimepicker.min', "lib/moment", "jquery", "bootstrap", "lib/jquery.dataTables.min","lib/bootstrap-datepicker"],
    function (ErzaManager, layoutTpl, TablaModalServidores,TablaModalDependencias, AddHorario,TablaHorarios,TipoDocumentos,HorariosNocturno,TablaHor,HorarioActual,AsociacionHorario) {
        ErzaManager.module('AsistenciaApp.Form.View', function (View, ErzaManager, Backbone, Marionette, $, _) {

            View.Layout = Marionette.Layout.extend({
                template: layoutTpl,
                tipoDocumentos:new TipoDocumentos(),
                tablaModalServidores: new TablaModalServidores(),
                tablaDependencias:new TablaModalDependencias(),
                tablaHorarios:new TablaHorarios(),
                selectHorarios:new TablaHor(),
                horariosNocturno:new HorariosNocturno(),

                unidadClicked: {
                    unidadId:10002,
                    unidadDesc:"UNMSM"
                },
                elementoClickeado: null,
                codigo: null,
                nombre: null,
                diasSeleccionados: [],
                diasSelecionadoBusqueda:[],
                horadeingresos: [],
                horadesalidas: [],
                descripcion_horario: "",
                cambio:0,
                unidadSelected: {
                    unidadId:10225,
                    unidadDesc:"C0319 - PROYECTO QUIPUCAMAYOC"
                },


                regions: {
                    "div_tipo_doc":"#div_tipo_doc",
                    "servidoresModal": "#serv-table-modal",
                    "div_tablahorarios":"#div_tabla_horarios",
                    "origenModal":"#show_origen",
                    "div_tipo_noct":"#tipo_noct"
                },
                events: {
                    "click #buscar_horarios":"buscar_horarios",
                    "click .tree li": "clickUnidad",
                    "click #cancel_horario":"limpiar_campos",
                    "click #evaluar_horas": "update_horas",
                    "click #save_horario": "guardar_horario",
                    "click #optionsRadios2":"select_noct",
                    "click #optionsRadios1":"select_diurno",
                    "click #table-servidores_asis > tbody > tr ": "seleccionarServidor",
                    "click #f_inicio_cambio_show":"show_fechaInicio",
                    "click #f_final_cambio_show":"show_fechaFin",
                    "click #f_inicio_cambio_clos":"clear_fechaInicio",
                    "click #f_final_cambio_clos":"clear_fechaFin",
                    "click #buscar_serv_hor": "modal_servidores",
                    "click #origen_unidad":"modal_origen",
                    "click #destino_unidad":"modal_destino",
                    "click #boton-unidad":"unidades_dep",
                    "change  .dias": "clickServidorRow",
                    "change #tipo_nocturno":"clickTipoHor",
                    "change  .dia_bus": "agregar_dia_seleccionado",
                    "click #save_asociacion":"guardar_asociacion"
                },
                onRender: function () {
                    this.initialFetch();
                    this.div_tipo_doc.show(this.tipoDocumentos);
                    //this.iniciar_componentes();
                },
                initialize: function () {
                    this.model = new Backbone.Model();

                    this.model.set({
                        "addhorario": new AddHorario(),
                        "horarioactual":new HorarioActual(),
                        "asociacionhorario":new AsociacionHorario()
                    });
                },
                initialFetch: function () {
                    this.tablaModalServidores.TodosServidores();
                    this.tipoDocumentos.getTiposDocumentos(function(){
                        var fullDate = new Date();
                        var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);
                        var currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();
                        $('#fec_doc').val(currentDate);
                    });
                },
                guardar_asociacion:function(){
                    var self=this;
                    if($('#serv_cod').text()!=""){
                        if ($("input[name='options']:checked").val() == "D" || $("input[name='options']:checked").val() == "N") {
                            if($('#tipo_nocturno').val()!="999"){
                                if($('#f_inicio_cambio').val()!="" & $('#f_final_cambio').val()!=""){
                                   if($('#tipo_doc').val()!="000" & $('#num_doc').val()!="" & $('#tipo_doc').val()!="" & $('#num_exp').val()!="000" & $('#fec_doc').val()!=""){
                                        if($('#origen').val()!="" & $('#destino').val()!="" & $('#origen').val()!=$('#destino').val()){
                                            if($('#asunto').val()!=""){
                                                alert("aca es donde se inserta la asociacion!");
                                            }else{
                                                alert("Ingrese asunto")
                                            }
                                        }else{
                                            alert("los campos origen y destino estan mal llenados")
                                        }
                                   }else{
                                       alert("existen campos obligatorios que no han sido llenados")
                                   }
                                }else{
                                    alert("es obligatorio ingresar las fechas")
                                }
                            }else{
                                alert("seleccione un horario")
                            }
                        }else{
                            alert("seleccione un tipo de horario")
                        }
                    }else{
                        alert("seleccione un servidor")
                    }
                },
                agregar_dia_seleccionado:function(e){

                    var clickedElement = $(e.currentTarget);
                    if (clickedElement.is(':checked')) {
                        this.diasSelecionadoBusqueda.push(clickedElement.val());

                    }else{
                        this.diasSelecionadoBusqueda.splice(this.diasSelecionadoBusqueda.indexOf(clickedElement.val()), 1);
                    }
                },
                select_noct:function(){

                    $("#opt_diurno").hide();
                    $("#tipo_noct").hide();
                    $("#div_tabla_horarios").hide();
                },
                select_diurno:function(){
                    $("#opt_diurno").show();
                    $("#tipo_noct").hide();
                    $("#div_tabla_horarios").hide();
                },
                unidades_dep:function(){

                    $('#show_origen').modal('hide');
                    this.unidadSelected = this.unidadClicked;



                    var aux=this.unidadSelected.unidadDesc.split("-");
                    this.udcod=aux[0].trim();


                   // $('#nom_dep').text(this.unidadSelected.unidadDesc);
                    //tablaDependencias
                    if(this.cambio==1){
                        $("#origen").val(aux[1].trim());
                    }
                    if(this.cambio==2){
                        $("#destino").val(aux[1].trim());
                    }

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
                clickTipoHor:function(){
                    var self=this;
                    //alert("NID");
                    var cod= $("#tipo_nocturno").val();
                    var i_domingo="----",i_lunes="----",i_martes="----",i_miercoles="----",i_jueves="----",i_viernes="----",i_sabado="----";
                    var s_domingo="----",s_lunes="----",s_martes="----",s_miercoles="----",s_jueves="----",s_viernes="----",s_sabado="----";

                    self.selectHorarios.selectHorarios(cod,function(){

                            if(self.selectHorarios.collection.length!=0){
                                for(var i=0;i<self.selectHorarios.collection.length;i++){

                                    if(self.selectHorarios.collection.at(i).get("dia")=="1"){
                                        i_domingo= self.convertir_min_hor(self.selectHorarios.collection.at(i).get("ingreso"));
                                        s_domingo=self.convertir_min_hor(self.selectHorarios.collection.at(i).get("salida"));
                                    }
                                    if(self.selectHorarios.collection.at(i).get("dia")=="2"){
                                        i_lunes=self.convertir_min_hor(self.selectHorarios.collection.at(i).get("ingreso"));
                                        s_lunes=self.convertir_min_hor(self.selectHorarios.collection.at(i).get("salida"));
                                    }
                                    if(self.selectHorarios.collection.at(i).get("dia")=="3"){
                                        i_martes=self.convertir_min_hor(self.selectHorarios.collection.at(i).get("ingreso"));
                                        s_martes=self.convertir_min_hor(self.selectHorarios.collection.at(i).get("salida"));
                                    }
                                    if(self.selectHorarios.collection.at(i).get("dia")=="4"){
                                        i_miercoles=self.convertir_min_hor(self.selectHorarios.collection.at(i).get("ingreso"));
                                        s_miercoles=self.convertir_min_hor(self.selectHorarios.collection.at(i).get("salida"));
                                    }
                                    if(self.selectHorarios.collection.at(i).get("dia")=="5"){
                                        i_jueves=self.convertir_min_hor(self.selectHorarios.collection.at(i).get("ingreso"));
                                        s_jueves=self.convertir_min_hor(self.selectHorarios.collection.at(i).get("salida"));
                                    }
                                    if(self.selectHorarios.collection.at(i).get("dia")=="6"){
                                        i_viernes=self.convertir_min_hor(self.selectHorarios.collection.at(i).get("ingreso"));
                                        s_viernes=self.convertir_min_hor(self.selectHorarios.collection.at(i).get("salida"));
                                    }
                                    if(self.selectHorarios.collection.at(i).get("dia")=="7"){
                                        i_sabado=self.convertir_min_hor(self.selectHorarios.collection.at(i).get("ingreso"));
                                        s_sabado=self.convertir_min_hor(self.selectHorarios.collection.at(i).get("salida"));
                                    }
                                }


                                $("#select_horario").html('<tr>'+
                                    '<td>'+'<strong>Entrada</strong>'+'</td>'+
                                    '<td>'+i_domingo+'</td>'+
                                    '<td>'+i_lunes+'</td>'+
                                    '<td>'+i_martes+'</td>'+
                                    '<td>'+i_miercoles+'</td>'+
                                    '<td>'+i_jueves+'</td>'+
                                    '<td>'+i_viernes+'</td>'+
                                    '<td>'+i_sabado+'</td>'+
                                    '</tr>'+
                                    '<tr>' +
                                    '<td>'+'<strong>Salida</strong>'+'</td>'+
                                    '<td>'+s_domingo+'</td>'+
                                    '<td>'+s_lunes+'</td>'+
                                    '<td>'+s_martes+'</td>'+
                                    '<td>'+s_miercoles+'</td>'+
                                    '<td>'+s_jueves+'</td>'+
                                    '<td>'+s_viernes+'</td>'+
                                    '<td>'+s_sabado+'</td>'+
                                    '</tr>')
                            }
                            else{
                                $('#select_horario').append('<tr>'+
                                    '<td colspan="8">No existen estudios para este Servidor</td>'+
                                    '</tr>')
                            }

                    });

                    this.div_tablahorarios.show(self.selectHorarios);


                },
                convertir_min_hor:function(minuto){
                    var residuo=minuto%60;
                    var resultado=(minuto-residuo)/60;
                    var hora;

                    if(residuo==0){
                        residuo="00";
                    }

                    if(resultado<13){
                        hora=resultado+":"+residuo+" AM";
                    }else{

                      if((resultado-12)==0){
                          hora="12:"+residuo+" PM";
                      }
                       else{
                          hora=(resultado-12)+":"+residuo+" PM";
                      }

                    }

                    return hora;
                },
                buscar_horarios:function(){
                    var self=this;
                    var tipo;
                    var codigo_clase="";
                    var tolerancia=0;
                    var lactancia=0;
                    var i_domingo="----",i_lunes="----",i_martes="----",i_miercoles="----",i_jueves="----",i_viernes="----",i_sabado="----";
                    var s_domingo="----",s_lunes="----",s_martes="----",s_miercoles="----",s_jueves="----",s_viernes="----",s_sabado="----";

                    self.diasSelecionadoBusqueda.sort();
                    if ($("input[name='options']:checked").val() == "D" || $("input[name='options']:checked").val() == "N") {
                         if($("input[name='options']:checked").val() == "D"){
                             if ($('.dia_bus').is(':checked')) {
                                 tipo="D";

                                 for(var i=0;i<self.diasSelecionadoBusqueda.length;i++){
                                     codigo_clase= codigo_clase+self.diasSelecionadoBusqueda[i];

                                 };
                                 if ($('#Checkbox1').is(':checked')) {
                                     tolerancia = 1;
                                 };
                                 if ($('#Checkbox2').is(':checked')) {
                                     lactancia = 1;
                                 };
                                 $("#tipo_noct").show();
                                 $("#div_tabla_horarios").show();


                                 self.tablaHorarios.buscarHorarios(codigo_clase,tolerancia,lactancia,
                                 function(){

                                     $("#tipo_nocturno").trigger('change');
                                 });

                                 this.div_tipo_noct.show(self.tablaHorarios);
                             }
                             else{
                                 $('#notificacion').removeClass('alert-succes');
                                 $('#notificacion').removeClass('alert-danger');
                                 $('#notificacion').addClass('alert-warning')
                                 $('#notificacion').html('<strong>debe seleccionar al menos 1 dia para realizar la busqueda</strong>')
                                 $('#notificacion').show();
                             };
                         }
                         else{

                             self.codigo_clase="8";
                             $("#tipo_noct").show();
                             $("#div_tabla_horarios").show();
                             self.horariosNocturno.buscarHorariosNoct(self.codigo_clase,function(){
                                 $("#tipo_nocturno").trigger('change');
                             });
                             self.div_tipo_noct.show(self.horariosNocturno);



                         };

                    }else{

                        $('#notificacion').removeClass('alert-succes');
                        $('#notificacion').removeClass('alert-danger');
                        $('#notificacion').addClass('alert-warning')
                        $('#notificacion').html('<strong>debe seleccionar un tipo de horario</strong>')
                        $('#notificacion').show();
                    }
                },
                show_fechaInicio:function(){
                    var f_inicio_camb = $('#f_inicio_cambio');

                    f_inicio_camb .datepicker({
                        format: 'dd/mm/yyyy',
                        viewMode: 2
                    });

                    f_inicio_camb .datepicker('show');
                },
                clear_fechaInicio:function(){
                   $("#f_inicio_cambio").val("");
                },
                clear_fechaFin:function(){
                  $("#f_final_cambio").val("");
                },
                show_fechaFin:function(){
                    var f_fin_camb = $('#f_final_cambio');

                    f_fin_camb .datepicker({
                        format: 'dd/mm/yyyy',
                        viewMode: 2
                    });

                    f_fin_camb .datepicker('show');
                },
                limpiar_campos:function(){
                    $('#poner_hora').empty();
                    $('.dias').parent().parent().removeClass('pintar');
                    $('.dias').removeAttr('checked');

                    $('#inlineCheckbox1').removeAttr('checked');
                    $('#inlineCheckbox2').removeAttr('checked');

                    $("input[name='optionsRadios']:checked").prop('checked', false);

                    this.diasSeleccionados.length=0;
                    this.horadeingresos.length=0;
                    this.horadesalidas.length=0;
                    this.descripcion_horario="";

                     for(var i=1;i<8;i++){
                         var j=parseInt(i)+7;
                         $('#ingreso'+i).val("");
                         $('#salida'+j).val("");

                         $('#datetimepicker' + i).data("DateTimePicker").disable();
                         $('#datetimepicker' + j).data("DateTimePicker").disable();

                         $('#datetimepicker' + i + ' .input-group-addon').removeClass("addColorEnable");
                         $('#datetimepicker' + j + ' .input-group-addon').removeClass("addColorEnable");
                         $('#datetimepicker' + i + ' .input-group-addon').addClass("addColorDisabled");
                         $('#datetimepicker' + j + ' .input-group-addon').addClass("addColorDisabled");
                     };
                    $('#notificacion').hide();
                },
                modal_origen:function(){
                         this.cambio=1;
                   this.origenModal.show(this.tablaDependencias);

                    $("#show_origen").modal("show");

                },
                modal_destino:function(){
                   this.cambio=2;
                    this.origenModal.show(this.tablaDependencias);

                    $("#show_origen").modal("show");
                },
                update_horas: function () {
                    var self=this;
                    var hora;
                    var temp;
                    var minutos;
                    var hora_s;
                    var temp_s;
                    var minutos_s;
                    var total=0;
                    for (var i = 0; i < self.diasSeleccionados.length; i++) {
                        if ($('#ingreso' + self.diasSeleccionados[i]).val() != "" & $('#salida' + (parseInt(self.diasSeleccionados[i]) + 7)).val() != "") {
                            hora = $('#ingreso' + self.diasSeleccionados[i]).val().split(" ");      //convierte a minutos la hora de ingreso del dia actual
                            if (hora[1] == "AM") {
                                temp = hora[0].split(":");
                                minutos = parseInt(temp[0]) * 60 + parseInt(temp[1]);
                            } else {
                                temp = hora[0].split(":");
                                minutos = (parseInt(temp[0]) + 12) * 60 + parseInt(temp[1]);
                            };

                            hora_s = $('#salida' + (parseInt(self.diasSeleccionados[i]) + 7)).val().split(" ");    //convierte a minutos la hora de salida del dia actual
                            if (hora_s[1] == "AM") {
                                temp_s = hora_s[0].split(":");
                                minutos_s = parseInt(temp_s[0]) * 60 + parseInt(temp_s[1]);
                            } else {
                                temp_s = hora_s[0].split(":");
                                minutos_s = (parseInt(temp_s[0]) + 12) * 60 + parseInt(temp_s[1]);
                            };
                            if((minutos_s-minutos)>0){
                                total=total+(minutos_s-minutos);
                            }else if((minutos_s-minutos)<0){
                                minutos=24*60-minutos;
                                total=total+(minutos_s+minutos);
                                }else{
                                $('#notificacion').removeClass('alert-succces');
                                $('#notificacion').removeClass('alert-danger');
                                $('#notificacion').addClass('alert-warning');
                                $('#notificacion').html('Las horas estan mal ingresadas')
                                $('#notificacion').show();
                            }

                        }
                    }
                    $('#poner_hora').html('<h3>'+parseInt(total/60)+':'+total%60+'</h3>')
                },
                validar_horario_nocturno: function () {
                    var self = this;
                    var hora;
                    var temp;
                    var minutos;
                    var hora_s;
                    var temp_s;
                    var minutos_s;
                    var bandera;
                    for (var i = 0; i < self.diasSeleccionados.length; i++) {
                        if ($('#ingreso' + self.diasSeleccionados[i]).val() == "") {
                            $('#notificacion').removeClass('alert-succces');
                            $('#notificacion').removeClass('alert-danger');
                            $('#notificacion').addClass('alert-warning');
                            $('#notificacion').html('<strong>el dia '+  self.diasSeleccionados[i] +' no tiene hora de ingreso por favor ingresarla</strong>')
                            $('#notificacion').show();
                            self.horadeingresos.length = 0;
                            self.horadesalidas.length = 0;
                            self.descripcion_horario = "";
                            bandera = false;
                            break;
                        } else {
                            if ($('#salida' + (parseInt(self.diasSeleccionados[i]) + 7)).val() == "") {
                                $('#notificacion').removeClass('alert-succces');
                                $('#notificacion').removeClass('alert-danger');
                                $('#notificacion').addClass('alert-warning');
                                $('#notificacion').html('<strong>el dia '+  self.diasSeleccionados[i]  +'  no tiene hora de salida por favor ingresarla</strong>')
                                $('#notificacion').show();
                                self.horadeingresos.length = 0;
                                self.horadesalidas.length = 0;
                                self.descripcion_horario = "";
                                bandera = false;
                                break;
                            } else {
                                hora = $('#ingreso' + self.diasSeleccionados[i]).val().split(" ");      //convierte a minutos la hora de ingreso del dia actual
                                if (hora[1] == "AM") {
                                    temp = hora[0].split(":");
                                    minutos = parseInt(temp[0]) * 60 + parseInt(temp[1]);
                                } else {
                                    temp = hora[0].split(":");
                                    minutos = (parseInt(temp[0]) + 12) * 60 + parseInt(temp[1]);
                                }
                                ;

                                hora_s = $('#salida' + (parseInt(self.diasSeleccionados[i]) + 7)).val().split(" ");    //convierte a minutos la hora de salida del dia actual
                                if (hora_s[1] == "AM") {
                                    temp_s = hora_s[0].split(":");
                                    minutos_s = parseInt(temp_s[0]) * 60 + parseInt(temp_s[1]);
                                } else {
                                    temp_s = hora_s[0].split(":");
                                    minutos_s = (parseInt(temp_s[0]) + 12) * 60 + parseInt(temp_s[1]);
                                }
                                if (minutos_s < minutos) {
                                    if (self.diasSeleccionados[i] == "2") {
                                        self.descripcion_horario = self.descripcion_horario + "LUN " + $('#ingreso' + self.diasSeleccionados[i]).val() + " A " + $('#salida' + (parseInt(self.diasSeleccionados[i]) + 7)).val() + ",";
                                    }
                                    if (self.diasSeleccionados[i] == "3") {
                                        self.descripcion_horario = self.descripcion_horario + "MAR " + $('#ingreso' + self.diasSeleccionados[i]).val() + " A " + $('#salida' + (parseInt(self.diasSeleccionados[i]) + 7)).val() + ",";
                                    }
                                    if (self.diasSeleccionados[i] == "4") {
                                        self.descripcion_horario = self.descripcion_horario + "MIER " + $('#ingreso' + self.diasSeleccionados[i]).val() + " A " + $('#salida' + (parseInt(self.diasSeleccionados[i]) + 7)).val() + ",";
                                    }
                                    if (self.diasSeleccionados[i] == "5") {
                                        self.descripcion_horario = self.descripcion_horario + "JUE " + $('#ingreso' + self.diasSeleccionados[i]).val() + " A " + $('#salida' + (parseInt(self.diasSeleccionados[i]) + 7)).val() + ",";
                                    }
                                    if (self.diasSeleccionados[i] == "6") {
                                        self.descripcion_horario = self.descripcion_horario + "VIE " + $('#ingreso' + self.diasSeleccionados[i]).val() + " A " + $('#salida' + (parseInt(self.diasSeleccionados[i]) + 7)).val() + ",";
                                    }
                                    if (self.diasSeleccionados[i] == "7") {
                                        self.descripcion_horario = self.descripcion_horario + "SAB " + $('#ingreso' + self.diasSeleccionados[i]).val() + " A " + $('#salida' + (parseInt(self.diasSeleccionados[i]) + 7)).val() + ",";
                                    }
                                    if (self.diasSeleccionados[i] == "1") {
                                        self.descripcion_horario = self.descripcion_horario + "DOM " + $('#ingreso' + self.diasSeleccionados[i]).val() + " A " + $('#salida' + (parseInt(self.diasSeleccionados[i]) + 7)).val() + ",";
                                    }
                                    //ingresamos las horas en minutos a cada array
                                    self.horadeingresos.push(minutos);

                                    self.horadesalidas.push(minutos_s);
                                    bandera = true;
                                } else {
                                    $('#notificacion').removeClass('alert-succces');
                                    $('#notificacion').removeClass('alert-danger');
                                    $('#notificacion').addClass('alert-warning');
                                    $('#notificacion').html('<strong>Las horas estan mal ingresadas</strong>')
                                    $('#notificacion').show();
                                    self.horadeingresos.length = 0;
                                    self.horadesalidas.length = 0;
                                    self.descripcion_horario = "";
                                    bandera = false;
                                    break;
                                }

                            }

                        }
                    }
                    ;
                    return bandera;
                },
                validar_horario_diurno: function () {
                    var self = this;
                    var hora;
                    var temp;
                    var minutos;
                    var hora_s;
                    var temp_s;
                    var minutos_s;
                    var bandera;
                    for (var i = 0; i < self.diasSeleccionados.length; i++) {
                        if ($('#ingreso' + self.diasSeleccionados[i]).val() == "") {
                            $('#notificacion').removeClass('alert-succces');
                            $('#notificacion').removeClass('alert-danger');
                            $('#notificacion').addClass('alert-warning');
                            $('#notificacion').html('<strong>el dia '+  self.diasSeleccionados[i] +' no tiene hora de ingreso por favor ingresarla</strong>')
                            $('#notificacion').show();                            self.horadeingresos.length = 0;
                            self.horadesalidas.length = 0;
                            self.descripcion_horario = "";
                            bandera = false;
                            break;
                        } else {
                            if ($('#salida' + (parseInt(self.diasSeleccionados[i]) + 7)).val() == "") {
                                $('#notificacion').removeClass('alert-succces');
                                $('#notificacion').removeClass('alert-danger');
                                $('#notificacion').addClass('alert-warning');
                                $('#notificacion').html('<strong>el dia '+  self.diasSeleccionados[i]  +'  no tiene hora de salida por favor ingresarla</strong>')
                                $('#notificacion').show();                                self.horadeingresos.length = 0;
                                self.horadesalidas.length = 0;
                                self.descripcion_horario = "";
                                bandera = false;
                                break;
                            } else {
                                hora = $('#ingreso' + self.diasSeleccionados[i]).val().split(" ");      //convierte a minutos la hora de ingreso del dia actual
                                if (hora[1] == "AM") {
                                    temp = hora[0].split(":");
                                    minutos = parseInt(temp[0]) * 60 + parseInt(temp[1]);
                                } else {
                                    temp = hora[0].split(":");
                                    minutos = (parseInt(temp[0]) + 12) * 60 + parseInt(temp[1]);
                                }
                                ;

                                hora_s = $('#salida' + (parseInt(self.diasSeleccionados[i]) + 7)).val().split(" ");    //convierte a minutos la hora de salida del dia actual
                                if (hora_s[1] == "AM") {
                                    temp_s = hora_s[0].split(":");
                                    minutos_s = parseInt(temp_s[0]) * 60 + parseInt(temp_s[1]);
                                } else {
                                    temp_s = hora_s[0].split(":");
                                    minutos_s = (parseInt(temp_s[0]) + 12) * 60 + parseInt(temp_s[1]);
                                }
                                if (minutos_s > minutos) {
                                    if (self.diasSeleccionados[i] == "2") {
                                        self.descripcion_horario = self.descripcion_horario + "LUN " + $('#ingreso' + self.diasSeleccionados[i]).val() + " A " + $('#salida' + (parseInt(self.diasSeleccionados[i]) + 7)).val() + ",";
                                    }
                                    if (self.diasSeleccionados[i] == "3") {
                                        self.descripcion_horario = self.descripcion_horario + "MAR " + $('#ingreso' + self.diasSeleccionados[i]).val() + " A " + $('#salida' + (parseInt(self.diasSeleccionados[i]) + 7)).val() + ",";
                                    }
                                    if (self.diasSeleccionados[i] == "4") {
                                        self.descripcion_horario = self.descripcion_horario + "MIER " + $('#ingreso' + self.diasSeleccionados[i]).val() + " A " + $('#salida' + (parseInt(self.diasSeleccionados[i]) + 7)).val() + ",";
                                    }
                                    if (self.diasSeleccionados[i] == "5") {
                                        self.descripcion_horario = self.descripcion_horario + "JUE " + $('#ingreso' + self.diasSeleccionados[i]).val() + " A " + $('#salida' + (parseInt(self.diasSeleccionados[i]) + 7)).val() + ",";
                                    }
                                    if (self.diasSeleccionados[i] == "6") {
                                        self.descripcion_horario = self.descripcion_horario + "VIE " + $('#ingreso' + self.diasSeleccionados[i]).val() + " A " + $('#salida' + (parseInt(self.diasSeleccionados[i]) + 7)).val() + ",";
                                    }
                                    if (self.diasSeleccionados[i] == "7") {
                                        self.descripcion_horario = self.descripcion_horario + "SAB " + $('#ingreso' + self.diasSeleccionados[i]).val() + " A " + $('#salida' + (parseInt(self.diasSeleccionados[i]) + 7)).val() + ",";
                                    }
                                    if (self.diasSeleccionados[i] == "1") {
                                        self.descripcion_horario = self.descripcion_horario + "DOM " + $('#ingreso' + self.diasSeleccionados[i]).val() + " A " + $('#salida' + (parseInt(self.diasSeleccionados[i]) + 7)).val() + ",";
                                    }
                                    //ingresamos las horas en minutos a cada array
                                    self.horadeingresos.push(minutos);

                                    self.horadesalidas.push(minutos_s);
                                    bandera = true;
                                } else {
                                    $('#notificacion').removeClass('alert-succces');
                                    $('#notificacion').removeClass('alert-danger');
                                    $('#notificacion').addClass('alert-warning');
                                    $('#notificacion').html('<strong>Las horas estan mal ingresadas</strong>')
                                    $('#notificacion').show();
                                    self.horadeingresos.length = 0;
                                    self.horadesalidas.length = 0;
                                    self.descripcion_horario = "";
                                    bandera = false;
                                    break;
                                }

                            }

                        }
                    }
                    ;
                    return bandera;

                },
                guardar_horario: function () {
                    var self = this;
                    var tolerancia = 0;
                    var lactancia = 0;
                    this.diasSeleccionados.sort();
                    if ($("input[name='optionsRadios']:checked").val() == "diurno" || $("input[name='optionsRadios']:checked").val() == "nocturno") {
                        if ($('.dias').is(':checked')) {

                            if ($('#inlineCheckbox1').is(':checked')) {
                                tolerancia = 1;
                            };
                            if ($('#inlineCheckbox2').is(':checked')) {
                                lactancia = 1;
                            };

                            if ($("input[name='optionsRadios']:checked").val() == "nocturno") {
                                if (self.validar_horario_nocturno()) {
                                    self.model.get("addhorario").set({
                                        "numero_dia": self.diasSeleccionados,
                                        "ingreso_dia": self.horadeingresos,
                                        "salida_dia": self.horadesalidas,
                                        "tolerancia": parseInt(tolerancia),
                                        "lactancia": lactancia,
                                        "descripcion_hor": self.descripcion_horario,
                                        "tipo_hor": "N"
                                    });
                                    self.model.get("addhorario").url = "api/asistencia/administrativo/addhorario";
                                    var self_s = self.model.get("addhorario").save({}, {wait: true});
                                    self_s.done(function () {
                                        alert("done")
                                    });
                                    self_s.fail(function () {
                                        $('#notificacion').removeClass('alert-danger');
                                        $('#notificacion').removeClass('alert-warning');
                                        $('#notificacion').addClass('alert-succes')
                                        $('#notificacion').html('<strong>el horario nocturno se guardo correctamente</strong>')
                                        $('#notificacion').show();
                                        self.horadeingresos.length = 0;
                                        self.horadesalidas.length = 0;
                                        self.descripcion_horario = "";
                                    })
                                } else {
//                                    $('#notificacion').show();
//                                    $('#notificacion').html('<strong>no se pudo guardar el Horario</strong>')
                                };
                            } else if ($("input[name='optionsRadios']:checked").val() == "diurno") {
                                if (self.validar_horario_diurno()) {
                                    self.model.get("addhorario").set({
                                        "numero_dia": self.diasSeleccionados,
                                        "ingreso_dia": self.horadeingresos,
                                        "salida_dia": self.horadesalidas,
                                        "tolerancia": parseInt(tolerancia),
                                        "lactancia": lactancia,
                                        "descripcion_hor": self.descripcion_horario,
                                        "tipo_hor": "D"
                                    });
                                    self.model.get("addhorario").url = "api/asistencia/administrativo/addhorario";
                                    var self_s = self.model.get("addhorario").save({}, {wait: true});
                                    self_s.done(function () {
                                    });
                                    self_s.fail(function () {
                                        $('#notificacion').removeClass('alert-danger');
                                        $('#notificacion').removeClass('alert-warning');
                                        $('#notificacion').addClass('alert-succes')
                                        $('#notificacion').html('<strong>el horario se guardo correctamente</strong>')
                                        $('#notificacion').show();
                                        self.horadeingresos.length = 0;
                                        self.horadesalidas.length = 0;
                                        self.descripcion_horario = "";
                                    })
                                } else {
//                                    $('#notificacion').show();
//                                    $('#notificacion').html('<strong>no se pudo guardar el Horario</strong>')
                                }
                            }
                            ;

                        } else {
                            $('#notificacion').removeClass('alert-succes');
                            $('#notificacion').removeClass('alert-danger');
                            $('#notificacion').addClass('alert-warning')
                            $('#notificacion').html('<strong>debe seleccionar al menos 1 dia</strong>')
                            $('#notificacion').show();                        }

                    } else {
                        $('#notificacion').removeClass('alert-succes');
                        $('#notificacion').removeClass('alert-danger');
                        $('#notificacion').addClass('alert-warning')
                        $('#notificacion').html('<strong>debe seleccionar un tipo de horario</strong>')
                        $('#notificacion').show();
                    }

                },
                seleccionarServidor: function (e) {
                    var self = this;
                    var clickedElement = $(e.currentTarget);
                    this.codigo = clickedElement.children(':nth-child(1)').text();
                    this.num_ser_est = clickedElement.children(':nth-child(1)').attr('data');
                    this.nombre = clickedElement.children(':nth-child(2)').text();

                    this.model.get("horarioactual").url="api/asistencia/administrativo/horarioactual/codigo/"+this.codigo;
                    var fetch_h=this.model.get("horarioactual").fetch({data: $.param({"codigo_serv":this.codigo})});
                    fetch_h.done(function(){
                        $('#f_inicio_act').val(self.model.get("horarioactual").get("fecha_ini_actual"));
                        $('#f_final_act').val(self.model.get("horarioactual").get("fecha_fin_actual"));
                    });
                    fetch_h.fail(function(){
                        alert("la persona no tiene asignado un horario")
                    });

                    $('#desc-servidor_asis').text(this.nombre);
                    $("#serv_cod").text(this.codigo);
                    $("#cont_serv").show();
                    $('#serv-table-modal').modal("hide");
                },
                modal_servidores: function (e) {
                    var self=this;
                    var clickedElement=$(e.currentTarget);

                    clickedElement.button('loading');

                    setTimeout(function () {
                        clickedElement.button('reset');
                        self.servidoresModal.show(self.tablaModalServidores);

                        if(self.tablaModalServidores.collection.length!=0){
                            $("#table-servidores_asis").dataTable();


                            $('#table-servidores_asis_wrapper').append("<div id='footer-table'></div>");
                            $('#table-servidores_asis_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                            $('#table-servidores_asis_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                            $('.dataTables_filter input').attr('placeholder', 'Buscar..');
                        }


                        $('#serv-table-modal').modal();

                    },2000);

                },
                clickServidorRow: function (e) {
                    var clickedElement = $(e.currentTarget);
                    var check = clickedElement.parent().parent();
                    var dia = clickedElement.parent().parent().children(':nth-child(1)').children().attr('id');
                    var numero_dia1 = clickedElement.parent().parent().children(':nth-child(1)').children().val();
                    var numero_dia2 = parseInt(numero_dia1) + 7;
                    if (clickedElement.is(':checked')) {



                        $('#datetimepicker' + numero_dia1 + ' .input-group-addon').removeClass("addColorDisabled");
                        $('#datetimepicker' + numero_dia2 + ' .input-group-addon').removeClass("addColorDisabled");
                        $('#datetimepicker' + numero_dia1 + ' .input-group-addon').addClass("addColorEnable");
                        $('#datetimepicker' + numero_dia2 + ' .input-group-addon').addClass("addColorEnable");
                        $('#datetimepicker' + numero_dia1).data("DateTimePicker").enable();
                        $('#datetimepicker' + numero_dia2).data("DateTimePicker").enable();
                        check.addClass('pintar');
                        this.diasSeleccionados.push(numero_dia1);

                    }
                    else {
                        check.removeClass('pintar');
                        $('#datetimepicker' + numero_dia1 + ' .input-group-addon').removeClass("addColorEnable");
                        $('#datetimepicker' + numero_dia2 + ' .input-group-addon').removeClass("addColorEnable");
                        $('#datetimepicker' + numero_dia1 + ' .input-group-addon').addClass("addColorDisabled");
                        $('#datetimepicker' + numero_dia2 + ' .input-group-addon').addClass("addColorDisabled");

                        $('#datetimepicker' + numero_dia1).data("DateTimePicker").disable();
                        $('#datetimepicker' + numero_dia2).data("DateTimePicker").disable();
                        this.diasSeleccionados.splice(this.diasSeleccionados.indexOf(numero_dia1), 1);
                    }


                }

            });
        });
        return ErzaManager.AsistenciaApp.Form.View;
    });