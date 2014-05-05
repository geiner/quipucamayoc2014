define(['app', 'hbs!apps/desc_medicos/form/templates/inicio_desc_medicos','apps/resoluciones/form/view/servidor-view','apps/desc_medicos/form/model/save_descanso',
        'apps/desc_medicos/form/view/descansos_serv','lib/bootstrap-datetimepicker.min',"lib/moment","lib/jquery.dataTables.min","jquery","lib/bootstrap-datepicker","bootstrap"],
    function (ErzaManager, layoutTpl,listaServView,addDescanso,DescansosServ) {
        ErzaManager.module('DescansoMedicoApp.list.View', function (View, ErzaManager, Backbone, Marionette, $, _) {

            View.Layout = Marionette.Layout.extend({
                template: layoutTpl,

                listaServView:new listaServView(),
                descansosServ:new DescansosServ(),


                //variables globales
                dni:null,
                numserest:null,

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
                  "click #save_med":"fun_save_descMed"
                },

                onRender:function(){
                    this.initialFetch();
                },
                initialize: function () {

                    //initialize model
                    this.model = new Backbone.Model();


                    this.model.set({
                        "addDescanso":new addDescanso()
                    });
                },
                initialFetch: function(){

                    this.listaServView.fetchServidores();
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

                hide_lista_serv:function(e){
                    var self=this;
                    var clickedElement= $(e.currentTarget);

                    var dni_serv=clickedElement.children(':nth-child(2)').text();
                    var descrip_serv=clickedElement.children(':nth-child(1)').text();
                    var codAnt_serv=clickedElement.children(':nth-child(3)').text();
                    var estado_serv=clickedElement.children(':nth-child(6)').text();
                    var abv_est=clickedElement.attr('data3');
                    var abv_tip=clickedElement.attr('data4');

                    this.dni=dni_serv;
                    this.numserest=clickedElement.children(':nth-child(7)').text()



                    $("#dni_serv").text(dni_serv);
                    $("#descrip_serv").text(descrip_serv);
                    $("#codAnt_serv").text(codAnt_serv);
                    $("#estado_serv").text(abv_est+" - "+abv_tip);

                   $("#reg_descrip").show();
                    $("#footer_med").show();
                    $("#list_serv_reg").modal("hide");
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
                    alert("codigo y numser"+this.dni+"-"+this.numserest);

                    self.model.get("addDescanso").set({
                        "id_serv":self.dni,
                        "numserest":parseInt(self.numserest),
                        "citt": $("#citt").val(),
                        "f_inicio": $("#fech_ini_med").val(),
                        "f_fin":  $("#fech_fin_med").val(),
                        "tipo_lic": $("#tipo_lic").val()
                    });

                    self.model.get("addDescanso").url = "rest/descansos/addDescanso";

                    var self_s = self.model.get("addDescanso").save({}, {wait: true});

                    self_s.done(function(){
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
                    });
                    self_s.fail(function(){
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
                    })

                }

            });
        });
        return ErzaManager.DescansoMedicoApp.list.View;
    });