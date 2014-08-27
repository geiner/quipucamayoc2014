define(["app", "hbs!apps/informe_escalafonario/form/templates/inicio_informe_escalafonario", "apps/informe_escalafonario/form/view/servidor-view",
    "jquery","lib/jquery.dataTables.min","lib/bootstrap-datepicker","lib/jquery.numeric","bootstrap"],
    function (ErzaManager,inicio_informe_escalafonarioTemp,ListarServView
        ) {
        ErzaManager.module('InformeEscalafonarioApp.Form.View', function (View, ErzaManager, Backbone, Marionette, $, _) {
            View.Layout = Marionette.Layout.extend({
                template: inicio_informe_escalafonarioTemp,
                ListarServView: new ListarServView(),

                //declaracionde variables
                tipoServi:"",
                estServi:"",
                dnies:"",
                numservi:"",


                regions:{
                    ListarserReg: "#servModal"
                },

                events:{
                    "click #list_serv_ies": "llamarModalServ",
                    "dblclick #table-servidor > tbody > tr ": "seleccionarServi",
                    "click #btn_desc_ies":"reporteies"
                },

                onRender: function(){
                    this.initialFetch();
                },

                initialize: function () {

                    //initialize model
                    this.model = new Backbone.Model();
                },

                initialFetch: function(){
                    this.ListarServView.fetchServidores() ;
                },

                llamarModalServ:function(e){
                    var self=this;
                    var clickedElement=$(e.currentTarget);

                    clickedElement.button('loading');

                    setTimeout(function () {
                        clickedElement.button('reset');
                        self.ListarserReg.show(self.ListarServView) ;
                        if(self.ListarServView.collection.length!=0){
                            $("#table-servidor").dataTable();
                            $('#table-servidor_wrapper').append("<div id='footer-table'></div>");
                            $('#table-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                            $('#table-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                            $('.dataTables_filter input').attr('placeholder','Buscar..');
                        }

                        $("#servModal").modal();

                    },2000);
                },
                seleccionarServi:function(e){
                    $("#datoServi").show();
                    var clickedElement=$(e.currentTarget);

                    var cod_ant=clickedElement.children(':nth-child(3)').text();
                    var nombre=clickedElement.children(':nth-child(1)').text();
                    var tipTrabIES=clickedElement.children(':nth-child(4)').text();
                    this.tipoServi=tipTrabIES;
                    var est=clickedElement.children(':nth-child(6)').text();
                    this.estServi=est;
                    var dni=clickedElement.children(':nth-child(2)').text();
                    this.dnies=dni;
                    var numserv=clickedElement.children(':nth-child(7)').text();
                    this.numservi=numserv;


                    $("#dniServi").text(dni);
                    $('#nomServi').text(nombre);
                    $('#codiAnt').text(cod_ant);
                    $('#tipTrabIES').text(tipTrabIES);
                    $("#estServi").text(est);

                    $("#servModal").modal('hide');
                    $("#reporte_ies").show();

                },
                reporteies:function (){

                    var usuaries=$('#email').text();

                    $("#dniies").val(this.dnies);
                    $("#numser").val(this.numservi);
                    $("#usuaries").val(usuaries);
                    //alert ("DNI: "+this.dnies+" Num Ser: "+this.numservi+" Usuario: "+usuaries)
                }
            });

        });
        return ErzaManager.InformeEscalafonarioApp.Form.View;
    });