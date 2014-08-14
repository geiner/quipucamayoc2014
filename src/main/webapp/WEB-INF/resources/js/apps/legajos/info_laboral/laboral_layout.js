define(['app', 'hbs!apps/legajos/info_laboral/templates/infoLaboral_layout',"apps/legajos/form/view/servidores-table","apps/legajos/info_laboral/view/beneficiosXPers-view",
        "apps/legajos/info_laboral/view/licenciasXPers-view","apps/legajos/info_laboral/view/invesXPers-view","apps/legajos/info_laboral/view/meriDemeXPers-view",
        "lib/jquery.dataTables.min",'lib/bootstrap-datetimepicker.min',"lib/moment","jquery","bootstrap"],
    function (ErzaManager, layoutTpl,ServidoresTableView,TableBeneXPersView,TableLicxPersView,TableInvesXPersView,TableMeriDemeXPersView) {
        ErzaManager.module('LegajosApp.list.View', function (View, ErzaManager, Backbone, Marionette, $, _) {

            View.Layout = Marionette.Layout.extend({
                template: layoutTpl,


                servidoresTableView:new ServidoresTableView(),
                tableBeneXPersView:new TableBeneXPersView(),
                tableLicxPersView:new TableLicxPersView(),
                tableInvesXPersView:new TableInvesXPersView(),
                tableMeriDemeXPersView:new TableMeriDemeXPersView(),

                num_ser_est:null,
                codigo:null,



                regions:{
                    servidoresModal: "#serv-table-modal1",
                    "tablaBeneXPers":"#tabla_benefic_per",
                    tablaLicXPers:"#tabla_lic_per",
                    tablaInvesXPers:"#tabla_inves_per",
                    tablaMeriDemeXPers:"#tabla_meriDeme_per"


                },
                events:{
                    "click #search": "invokeModalServ",
                    "dblclick #table-servidores2 > tbody > tr ": "seleccionarServidor",
                    "dblclick #table-beneficios_per > tbody > tr":"selectBenf",
                    "dblclick #table-licencia_per > tbody > tr":"selectLicencia",
                    "dblclick #table-inves_per > tbody > tr":"selectInvestigacion",
                    "dblclick #table-meriDeme_per > tbody > tr":"selectMerito"
                },
                onRender:function(){
                    this.initialFetch();
                },
                initialize:function(){

                },
                initialFetch:function(){
                    this.servidoresTableView.fetchServidores(function(){ });
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
                seleccionarServidor:function(e){

                    var self=this;

                    var clickedElement=$(e.currentTarget);
                    this.codigo=clickedElement.attr("id");


                    var nombre=clickedElement.children(':nth-child(1)').text();
                    var cod_ant=clickedElement.children(':nth-child(3)').text();
                    var estado=clickedElement.children(':nth-child(6)').text();

                    var dni_emp=clickedElement.children(':nth-child(2)').text();

                    this.num_ser_est= clickedElement.children(':nth-child(7)').text();

                    $("#sec_div").hide();
                    $("#sec_licen").hide();
                    $("#sec_invest").hide();
                    $("#sec_merito").hide();

                    $("#tipo_benf").val("");
                    $("#periodo_benf").val("");
                    $("#resol_benf").val("");
                    $("#tipo_licen").val("");
                    $("#periodo_licen").val("");
                    $("#resol_licen").val("");
                    $("#tipo_invest").val("");
                    $("#periodo_invest").val("");
                    $("#resol_invest").val("");
                    $("#tipo_merito").val("");
                    $("#periodo_merito").val("");
                    $("#resol_merito").val("");

                    $('#desc-servidor').text(nombre);
                    $("#text-cod").text(dni_emp);
                    $("#cod-ant").text(cod_ant);
                    $('#estado').text(estado);
                    $("#block-descr").show();

                   //APARECEN BENEFICIOS
                    this.tableBeneXPersView.fetchBeneficiosXPers(this.codigo,this.num_ser_est,
                        function(){
                            if(self.tableBeneXPersView.collection.length!=0){
                                $("#table-beneficios_per").dataTable();

                                $('#table-beneficios_per_wrapper').append("<div id='footer-table'></div>");
                                $('#table-beneficios_per_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                $('#table-beneficios_per_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                $('.dataTables_filter input').attr('placeholder','Buscar..');
                            }
                        }
                    )
                    this.tablaBeneXPers.show(this.tableBeneXPersView);

                   //APARECE LICENCIAS
                    this.tableLicxPersView.fetchLicenciasXPers(this.codigo,this.num_ser_est,
                        function(){
                            if(self.tableLicxPersView.collection.length!=0){
                                $("#table-licencia_per").dataTable();

                                $('#table-licencia_per_wrapper').append("<div id='footer-table'></div>");
                                $('#table-licencia_per_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                $('#table-licencia_per_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                $('.dataTables_filter input').attr('placeholder','Buscar..');
                            }
                        })
                    this.tablaLicXPers.show(this.tableLicxPersView);

                    //APARECE INVES Y PUBLICS
                    this.tableInvesXPersView.fetchInvesXPers(this.codigo,this.num_ser_est,
                        function(){
                            if(self.tableInvesXPersView.collection.length!=0){
                                $("#table-inves_per").dataTable();

                                $('#table-inves_per_wrapper').append("<div id='footer-table'></div>");
                                $('#table-inves_per_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                $('#table-inves_per_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                $('.dataTables_filter input').attr('placeholder','Buscar..');
                            }
                        }
                    )
                    this.tablaInvesXPers.show(this.tableInvesXPersView);

                    //APARCE MERITOS Y DEMERITOS
                    this.tableMeriDemeXPersView.fetchMeriDemeXPers(this.codigo,this.num_ser_est,
                        function(){
                            if(self.tableMeriDemeXPersView.collection.length!=0){
                                $("#table-meriDeme_per").dataTable();

                                $('#table-meriDeme_per_wrapper').append("<div id='footer-table'></div>");
                                $('#table-meriDeme_per_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                $('#table-meriDeme_per_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                $('.dataTables_filter input').attr('placeholder','Buscar..');
                            }
                        })
                    this.tablaMeriDemeXPers.show(this.tableMeriDemeXPersView);

                    $('#serv-table-modal1').modal("hide");
                },

                selectBenf:function(e){

                    var clickedElement=$(e.currentTarget);
                    var tipo=clickedElement.children(':nth-child(2)').text();
                    var fecha_resol=clickedElement.attr("data");
                    var resol=clickedElement.attr("data1");

                    $("#tipo_benf").val(tipo);

                    $("#resol_benf").val(resol);
                    $("#periodo_benf").val(fecha_resol);

                },
                selectLicencia:function(e){

                    var clickedElement=$(e.currentTarget);
                    var tipo=clickedElement.children(':nth-child(2)').text();
                    var fecha_resol=clickedElement.attr("data");
                    var resol=clickedElement.attr("data1");


                    $("#tipo_licen").val(tipo)
                    $("#periodo_licen").val(fecha_resol);
                    $("#resol_licen").val(resol);
                },

                selectInvestigacion:function(e){
                    var clickedElement=$(e.currentTarget);
                    var tipo=clickedElement.children(':nth-child(2)').text();
                    var fecha_resol=clickedElement.attr("data3");
                    var resol=clickedElement.attr("data2");

                    $("#tipo_invest").val(tipo);
                    $("#periodo_invest").val(fecha_resol);
                    $("#resol_invest").val(resol);
                },

                selectMerito:function(e){
                    var clickedElement=$(e.currentTarget);
                    var tipo=clickedElement.children(':nth-child(2)').text();
                    var fecha_resol=clickedElement.attr("data3");
                    var resol=clickedElement.attr("data2");

                    $("#tipo_merito").val(tipo);
                    $("#periodo_merito").val(fecha_resol);
                    $("#resol_merito").val(resol);
                }


            });
        });
        return ErzaManager.LegajosApp.list.View;
    });
