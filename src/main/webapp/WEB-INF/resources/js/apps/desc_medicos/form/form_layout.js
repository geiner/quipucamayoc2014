define(['app', 'hbs!apps/desc_medicos/form/templates/inicio_desc_medicos','apps/resoluciones/form/view/servidor-view','apps/desc_medicos/form/model/save_descanso',
        'apps/desc_medicos/form/view/descansos_serv','apps/desc_medicos/form/model/update_descanso','lib/bootstrap-datetimepicker.min',"lib/moment","lib/jquery.dataTables.min","jquery","lib/bootstrap-datepicker","bootstrap"],
    function (ErzaManager, layoutTpl,listaServView,addDescanso,DescansosServ,UpdateDescanso) {
        ErzaManager.module('DescansoMedicoApp.list.View', function (View, ErzaManager, Backbone, Marionette, $, _) {

            View.Layout = Marionette.Layout.extend({
                template: layoutTpl,

                listaServView:new listaServView(),
                descansosServ:new DescansosServ(),


                //variables globales
                dni:null,
                numserest:null,

                idDescMed:null,
                cant_mat:0,
                cant_enf:0,

                regions:{
                   listServ:"#list_serv_reg",
                   regiontabladescansos:"#table-descansos"
                },
                events:{
                  "click #serv_desc_med":"lista_servidor",
                  "click #show_fech_inic":"show_fech_med",
                  "click #show_fech_fin":"show_fech_fin",
                  "click #clear_inicio":"hide_fech_ini",
                  "click #clear_fin":"hide_fech_fin",
                  "click #table-servidor > tbody >tr":"hide_lista_serv",
                  "click #save_med":"fun_save_descMed",
                  "click #delete-med":"fun_delete_descMed",
                  "click #modalAV":"fun_eliminar",
                  "click #cancel_med":"fun_reset",
                  "click #edit_desc":"fun_edit_desc",
                  "click #update_cancel":"fun_cancel_edit",
                  "click #update_med":"fun_edit_action"

                },

                onRender:function(){
                    this.initialFetch();
                },
                initialize: function () {

                    //initialize model
                    this.model = new Backbone.Model();


                    this.model.set({

                        "addDescanso":new addDescanso(),
                        "updateDescanso":new UpdateDescanso()
                    });
                },
                initialFetch: function(){

                    this.listaServView.fetchServidores();
                },

                fun_cancel_edit:function(){

                    $("#act_med").hide();
                    $("#footer_med").show();

                },

                lista_servidor:function(ev){
                    var self=this;
                    var clickedElement=$(ev.currentTarget);

                     clickedElement.button('loading');

                    setTimeout(function(e){

                        clickedElement.button('reset');
                        self.listServ.show(self.listaServView);

                        if(self.listaServView.collection.length!=0){
                            $("#table-servidor").dataTable();
                            $('#table-servidor_wrapper').append("<div id='footer-table'></div>");
                            $('#table-servidor_next').html("<i class='glyphicon glyphicon-forward'></i>");
                            $('#table-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                            $('.dataTables_filter input').attr('placeholder','Buscar..');
                        }

                        $("#list_serv_reg").modal();

                    },2000);



                },
                fun_reset:function(){
                   $("#descMed_message").hide();
                } ,

                fun_edit_action:function(){


                    var self=this;
                    var diaI=parseInt($("#fech_ini_med").val().substring(0,2));
                    var mesI=parseInt($("#fech_ini_med").val().substring(3,5));
                    var anioI=parseInt($("#fech_ini_med").val().substring(6,10));
                    var fechaInic=365*anioI+30*mesI+diaI;

                    var diaF=parseInt($("#fech_fin_med").val().substring(0,2));
                    var mesF=parseInt($("#fech_fin_med").val().substring(3,5));
                    var anioF=parseInt($("#fech_fin_med").val().substring(6,10));
                    var fechaFin=365*anioF+30*mesF+diaF;

                    var tiempo=(fechaFin-fechaInic)+" dias";

                    if( $("#citt").val()!="" && $("#fech_ini_med").val()!="" && $("#fech_fin_med").val()!=""){

                        if($("#tipo_lic").val()=="0"){
                            $("#descMed_message").removeClass("alert-success");
                            $("#descMed_message").addClass("alert-warning");
                            $("#descMed_message").html("<strong>Seleccione Tipo de Licencia</strong>");
                            $("#descMed_message").show();
                            //alert("SELECCIONE TIPO DE LICENCIA");
                        }
                        else{

                            if(fechaFin>fechaInic){

                                this.model.get("updateDescanso").set({

                                    "citt": $("#citt").val(),
                                    "f_inicio": $("#fech_ini_med").val(),
                                    "f_fin":  $("#fech_fin_med").val(),
                                    "tipo_lic": $("#tipo_lic option:selected").html(),
                                    "tiempo":tiempo,
                                    "id_desc_med":parseInt(this.idDescMed)

                                });

                                this.model.get("updateDescanso").url = "rest/descansos/updateDescMed";

                                var self_s=this.model.get("updateDescanso").save({}, {wait: true});

                                self_s.fail(function () {

                                    self.descansosServ.fetchDescansos(self.dni,self.numserest,function(){
                                        if(self.descansosServ.collection.length!=0){

                                            $("#table-descansos-servidor").dataTable();
                                            $('#table-descansos-servidor_wrapper').append("<div id='footer-table'></div>");
                                            $('#table-descansos-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                            $('#table-descansos-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                                            $('.dataTables_filter input').attr('placeholder','Buscar..');

                                            if($("#tipo_lic option:selected").html()=="MATERNIDAD"){
                                                var tmp_mat=tiempo.split(" ");
                                                self.cant_mat=self.cant_mat+parseInt(tmp_mat[0]);

                                            }
                                            if($("#tipo_lic option:selected").html()=="ENFERMEDAD"){
                                                var tmp_enf=tiempo.split(" ");
                                                self.cant_enf=self.cant_enf+parseInt(tmp_enf[0]);

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

                            }else{
                                $("#descMed_message").removeClass("alert-success");
                                $("#descMed_message").addClass("alert-warning");
                                $("#descMed_message").html("<strong>Fechas Incorrectas</strong>");
                                $("#descMed_message").show();
                            }
                        }
                    }
                    else{


                        $("#descMed_message").removeClass("alert-success");
                        $("#descMed_message").addClass("alert-warning");
                        $("#descMed_message").html("<strong>Campos Obligatorios Incompletos</strong>");
                        $("#descMed_message").show();
                        // alert("CAMPOS OBLIGATORIOS INCOMPLETOS");
                    }


                },
                fun_edit_desc:function(ev){
                    var clickedElement=$(ev.currentTarget);
                    $("#footer_med").hide();
                    $("#act_med").show();
                    $("#descMed_message").hide();
                    var ciit=clickedElement.parent().parent().children(':nth-child(1)').text();
                    var fech_ini=clickedElement.parent().parent().children(':nth-child(3)').text();
                    var fech_fin=clickedElement.parent().parent().children(':nth-child(4)').text();
                    var tip_lic=clickedElement.parent().parent().children(':nth-child(2)').text();
                    var tmp_dias=clickedElement.parent().parent().children(':nth-child(5)').text();
                    this.idDescMed=clickedElement.parent().parent().attr("id");
                    var idTip;

                    var aux=tmp_dias.split(" ");



                    if(tip_lic=="ENFERMEDAD"){
                        idTip=1;
                        this.cant_enf=this.cant_enf-parseInt(aux[0]);
                    }
                    if(tip_lic=="MATERNIDAD"){
                        idTip=2;
                        this.cant_mat=this.cant_mat-parseInt(aux[0]);
                    }
                    $("#citt").val(ciit);
                    $("#fech_ini_med").val(fech_ini);
                    $("#fech_fin_med").val(fech_fin);
                    $("#tipo_lic").val(idTip);


                },
                hide_lista_serv:function(e){
                    var self=this;
                    var clickedElement= $(e.currentTarget);

                    var dni_serv=clickedElement.children(':nth-child(2)').text();
                    var descrip_serv=clickedElement.children(':nth-child(1)').text();
                    var codAnt_serv=clickedElement.children(':nth-child(3)').text();
                    var estado_serv=clickedElement.children(':nth-child(6)').text();
                    var abv_est=clickedElement.attr('data3');
                    var abv_tip=clickedElement.attr('data4');
                    $("#div_dias").hide();
                    this.dni=dni_serv;
                    this.numserest=clickedElement.children(':nth-child(7)').text()


                    $("#dni_serv").text(dni_serv);
                    $("#descrip_serv").text(descrip_serv);
                    $("#codAnt_serv").text(codAnt_serv);
                    $("#estado_serv").text(abv_est+" - "+abv_tip);

                   $("#reg_descrip").show();
                    $("#footer_med").show();
                    $("#list_serv_reg").modal("hide");
                    self.cant_enf=0;
                    self.cant_mat=0;
                    self.descansosServ.fetchDescansos(self.dni,self.numserest,function(){

                            for(var i=0;i<self.descansosServ.collection.length;i++){
                                if(self.descansosServ.collection.at(i).get("tipo_lic")=="MATERNIDAD"){

                                  var palabra1= self.descansosServ.collection.at(i).get("tiempo").split(" ");

                                    self.cant_mat=self.cant_mat+parseInt(palabra1[0]);
                                }
                                if(self.descansosServ.collection.at(i).get("tipo_lic")=="ENFERMEDAD"){
                                    var palabra2= self.descansosServ.collection.at(i).get("tiempo").split(" ");


                                    self.cant_enf=self.cant_enf+parseInt(palabra2[0]);
                                }

                            }

                        if(self.descansosServ.collection.length!=0){

                          //console.log(self.cant_mat+" "+self.cant_enf);
                            $("#div_dias").show();
                            $("#text_mat").text(self.cant_mat);
                            $("#text_enf").text(self.cant_enf);
                            $("#table-descansos-servidor").dataTable();
                            $('#table-descansos-servidor_wrapper').append("<div id='footer-table'></div>");
                            $('#table-descansos-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                            $('#table-descansos-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                            $('.dataTables_filter input').attr('placeholder','Buscar..');



                        }
                    })
                    self.regiontabladescansos.show(self.descansosServ)
                    /*$("#text_mat").text(this.cant_mat);
                    $("#text_enf").text(this.cant_enf);*/
                },
                show_fech_med:function(){
                    var med_inicio = $('#fech_ini_med');

                    med_inicio.datepicker({
                        format: 'dd/mm/yyyy',
                        viewMode: 2
                    });

                    med_inicio.datepicker('show');
                },
                hide_fech_ini:function(){
                    $("#fech_ini_med").val("");
                },
                show_fech_fin:function(){
                    var med_fin = $('#fech_fin_med');

                    med_fin.datepicker({
                        format: 'dd/mm/yyyy',
                        viewMode: 2
                    });

                    med_fin.datepicker('show');
                },
                hide_fech_fin:function(){
                    $("#fech_fin_med").val("");
                },
                fun_save_descMed:function(){
                    var self=this;
                    var diaI=parseInt($("#fech_ini_med").val().substring(0,2));
                    var mesI=parseInt($("#fech_ini_med").val().substring(3,5));
                    var anioI=parseInt($("#fech_ini_med").val().substring(6,10));
                    var fechaInic=365*anioI+30*mesI+diaI;

                    var diaF=parseInt($("#fech_fin_med").val().substring(0,2));
                    var mesF=parseInt($("#fech_fin_med").val().substring(3,5));
                    var anioF=parseInt($("#fech_fin_med").val().substring(6,10));
                    var fechaFin=365*anioF+30*mesF+diaF;

                    var tiempo=(fechaFin-fechaInic)+" dias";


                   // alert(tiempo);
                    if( $("#citt").val()!="" && $("#fech_ini_med").val()!="" && $("#fech_fin_med").val()!=""){

                        if($("#tipo_lic").val()=="0"){
                            $("#descMed_message").removeClass("alert-success");
                            $("#descMed_message").addClass("alert-warning");
                            $("#descMed_message").html("<strong>Seleccione Tipo de Licencia</strong>");
                            $("#descMed_message").show();
                            //alert("SELECCIONE TIPO DE LICENCIA");
                        }
                        else{
                            if(fechaFin>fechaInic){


                               // alert($("#tipo_lic option:selected").html());
                                $("#div_dias").show();

                                  self.model.get("addDescanso").set({
                                 "id_serv":self.dni,
                                 "numserest":parseInt(self.numserest),
                                 "citt": $("#citt").val(),
                                 "f_inicio": $("#fech_ini_med").val(),
                                 "f_fin":  $("#fech_fin_med").val(),
                                 "tipo_lic": $("#tipo_lic option:selected").html(),
                                 "tiempo":tiempo
                                 });

                                 self.model.get("addDescanso").url = "rest/descansos/addDescanso";

                                 var self_s = self.model.get("addDescanso").save({}, {wait: true});

                                 self_s.done(function(){

                                 });
                                 self_s.fail(function(){
                                 self.descansosServ.fetchDescansos(self.dni,self.numserest,function(){
                                 if(self.descansosServ.collection.length!=0){
                                 $("#table-descansos-servidor").dataTable();
                                 $('#table-descansos-servidor_wrapper').append("<div id='footer-table'></div>");
                                 $('#table-descansos-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                 $('#table-descansos-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                                 $('.dataTables_filter input').attr('placeholder','Buscar..');

                                     if($("#tipo_lic option:selected").html()=="MATERNIDAD"){
                                         var tmp_mat=tiempo.split(" ");
                                         self.cant_mat=self.cant_mat+parseInt(tmp_mat[0]);

                                     }
                                     if($("#tipo_lic option:selected").html()=="ENFERMEDAD"){
                                         var tmp_enf=tiempo.split(" ");
                                         self.cant_enf=self.cant_enf+parseInt(tmp_enf[0]);

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
                            else{
                                //alert("FECHAS INCORRECTAS");
                                $("#descMed_message").removeClass("alert-success");
                                $("#descMed_message").addClass("alert-warning");
                                $("#descMed_message").html("<strong>Fechas Incorrectas</strong>");
                                $("#descMed_message").show();
                            }

                        }

                    }
                    else{


                        $("#descMed_message").removeClass("alert-success");
                        $("#descMed_message").addClass("alert-warning");
                        $("#descMed_message").html("<strong>Campos Obligatorios Incompletos</strong>");
                        $("#descMed_message").show();
                       // alert("CAMPOS OBLIGATORIOS INCOMPLETOS");
                    }



                },
                fun_eliminar:function(e){
                    var clickedElement= $(e.currentTarget);
                    this.idDescMed=clickedElement.parent().parent().attr("id");

                },
                fun_delete_descMed:function(){

                    var self = this;
                    var idDescMedico=self.idDescMed;
                    var url='rest/descansos/deleteDescansoMed/'+idDescMedico;

                    $.ajax({
                        type: 'DELETE',
                        url: url,
                        success: function(){



                        },
                        error: function(){

                            self.descansosServ.fetchDescansos(self.dni,self.numserest,function(){
                                if(self.descansosServ.collection.length!=0){
                                    $("#table-descansos-servidor").dataTable();
                                    $('#table-descansos-servidor_wrapper').append("<div id='footer-table'></div>");
                                    $('#table-descansos-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                    $('#table-descansos-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                                    $('.dataTables_filter input').attr('placeholder','Buscar..');
                                }
                            })
                            self.regiontabladescansos.show(self.descansosServ)

                        }
                    });

                }


            });
        });
        return ErzaManager.DescansoMedicoApp.list.View;
    });