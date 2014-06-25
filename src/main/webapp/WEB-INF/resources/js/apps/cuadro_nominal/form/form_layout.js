define(['app',
        'hbs!apps/cuadro_nominal/form/templates/cuadroNominalLayout',
        "apps/cuadro_nominal/form/view/tablaModalServidores",
        "apps/cuadro_nominal/form/view/advAgregarAsignacion",
        "apps/cuadro_nominal/form/view/advEliminarAsignacion",
        "apps/cuadro_nominal/form/view/eliminarAsignacion",

        "apps/cuadro_nominal/form/model/guardarPlazaTrabajador",
        "apps/cuadro_nominal/form/model/borrarPlazaTrabajador",
        "apps/cuadro_nominal/form/view/tablaPlazasCAP",

        "apps/cuadro_nominal/form/view/unidades-dialog",

        "apps/cuadro_nominal/form/view/depenUsuario",

        "lib/bootstrap-datepicker",
        "lib/jquery.dataTables.min",
        "lib/avgrund",
        "bootstrap"],
    function (ErzaManager,
              layoutTpl,
              TablaModalServidores,
              advIncAddAsignacion,
              advIncEliAsignacion,
              eliminarAsignacionView,


            //  TablaModalDependencias,



              addAsignacion,
              deleteAsignacion,
              plazasView,


              UnidadesDialogView,


              depenUsuarioView,


              datePicker) {
        ErzaManager.module('CuadroNominalApp.Form.View', function (View, ErzaManager, Backbone, Marionette, $, _) {

            View.Layout = Marionette.Layout.extend({

                template: layoutTpl,

                modalServidoresPorDependenciaView: new TablaModalServidores(),


                //arbolDependenciasView:new TablaModalDependencias(),



                plazasCAPView: new plazasView(),
                modalAdverIncAddView: new advIncAddAsignacion(),
                modalAdverInconsistenciaEliminarAsigView: new advIncEliAsignacion(),
                modalEliminarAsignacionView: new eliminarAsignacionView(),



                unidadesDialog: new UnidadesDialogView(),


                depenUsuarioView: new depenUsuarioView(),






                cod_Servidor:"Ninguno",
                codPlaza:0,

                unidadSelected: {
                    unidadId:10225,
                    unidadDesc:"C0319 - PROYECTO QUIPUCAMAYOC"
                },
                codDep:0,
                codSer:0,
                numserest:0,


                depUsuario:"Ninguno",
                perfilUsuario:"Ninguno",


                estadoPlaza:"ninguno",

                regions: {
                    "servidoresModalHtml": "#modalServidores",
                    "arbolDependenciasHtml":"#modalDependencias",
                    "tablaPlazasHtml": "#tablaPlazas",
                    "advertenciaInconsistenciaAddAsignacionHtml": "#advertenciaInconsistenciaAgregarAsignacion",
                    "advertenciaInconsistenciaDelAsignacionHtml": "#advertenciaInconsistenciaEliminarAsignacion",
                    "eliminarAsignacionHtml": "#modalEliminarAsignacion",




                    unidadesModal: "#modal-unidadesMio"



                },


                events: {
                    "dblclick #table-servidores_asis > tbody > tr ": "seleccionarServidor",
                    "click #botonBuscarServidores": "mostrarServidoresPorDependencia",
                    "click #botonCapturarDatosParaEliminarPlazaAsignada": "capturarDatosParaEliminarPlazaAsignada",


                   // "click #botonMostrarArbolDeDependencias":"mostrarArbolDependencias",



                    "click #boton-unidadMio":"seleccionarUnidad",//************
                    "click #botonMostrarFechaInicial": "mostrarFechaInicial",
                    "click #botonLimpiarFechaInicial": "limpiarFechaInicial",
                    "click #botonAceptarEliminarPlazaAsignada": "eliminarPlazaAsignada",
                    "click #botonMostrarFechaFinal": "mostrarFechaFinal",
                    "click #botonLimpiarFechaFinal": "limpiarFechaFinal",



                    "click #a-modalMio":"invokeModalMio"

                },


                onRender: function () { //Para cargar html mas no data
                    this.initialFetch();

                  //  this.modalidadAsignacionAHtml.show(this.modalidadAsignacionView);

                },



                initialize: function () {

                    this.model = new Backbone.Model();
                    this.model.set({
                        addServidorAPlaza: new addAsignacion(),
                        deletePlazaAsignada: new deleteAsignacion()

                    });


                },


                initialFetch: function () { //Para cargar la data en la vista
                  // this.tablaModalServidoresVista.TodosServidores(); ORIGINAL


                },




                //funcionalidades del layout
                invokeModalMio: function(e){

                    //var codDep="F0620";

                    var emailUsuario=$('#email').text();
                    console.log("Este es el usuario:"+emailUsuario);
                    var rolUsuario=$('#id_rol').text();
                    console.log("Este es el usuario:"+rolUsuario);


                    var self=this;
                    this.depenUsuarioView.mostrarDependenciaUsuario(emailUsuario,function () {
                        if(self.depenUsuarioView.collection.length!=0){

                            var valor= self.depenUsuarioView.collection.at(0).get("origenCodigo");
                            var valor2= self.depenUsuarioView.collection.at(0).get("origenDescripcion");

                           // console.log("Este es el valor dentro del bucle: "+valor);
                            this.depUsuario=valor;
                            this.perfilUsuario=valor2;

                           // console.log("Este es el valor dentro del constructor de variable global: "+this.depUsuario);

                        }

                        //console.log("Este es el valor dentro del constructor de variable global: "+this.depUsuario);

                        self.unidadesDialog.initialize(this.depUsuario,this.perfilUsuario);

                    });

                 //  console.log("Este es el valor en el metodo: "+this.depUsuario);

                    //this.unidadesDialog.initialize(codDep);
                    this.unidadesModal.show(this.unidadesDialog);
                    $('#modal-unidadesMio').modal();


                },




               /*
                mostrarArbolDependencias:function(){

                    this.arbolDependenciasHtml.show(this.arbolDependenciasView);
                    $("#modalDependencias").modal("show");

                },


                */



                seleccionarServidor: function (e) {

                    var self=this;
                    var clickedElement=$(e.currentTarget);
                    var cod=clickedElement.children(':nth-child(1)').text();
                    this.codSer=cod;
                    var numserest=clickedElement.children(':nth-child(2)').text();
                    this.numserest=numserest;

                    if(this.codSer!="No existen servidores para esta dependencia") {


                        console.log("Esto:" + this.codSer);

                        if ($('#fechaInicial').val() == "") {
                            $('#advertenciaFechaInicial').html("<strong>Por favor, ingrese la fecha inicial</strong>");
                            $('#advertenciaFechaInicial').show();
                        } else {

                            self.model.get("addServidorAPlaza").set({

                                "codPlaza": this.codPlaza,
                                "codServidor": this.codSer,
                                "numserest": this.numserest,
                                "fechIng": $('#fechaInicial').val(),
                                "fechSal": $('#fechaFinal').val(),
                                "modSer": $('#modalidad').val()
                            });

                            this.model.get("addServidorAPlaza").url = "api/cuadro_nominal/addSerCuadroNominal";

                            var self_s = this.model.get("addServidorAPlaza").save({}, {wait: true});

                            self_s.done(function () {
                                self.plazasCAPView.mostrarPlazasSegunDependencias(this.unidadSelected.unidadId, function () {
                                    if (self.plazasCAPView.collection.length != 0) {
                                        $("#tabla_plazas").dataTable();
                                        $('#tabla_plazas_wrapper').append("<div id='footer-table'></div>");
                                        $('#tabla_plazas_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                        $('#tabla_plazas_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                                        $('.dataTables_filter input').addClass('buscador');
                                        $('.dataTables_filter input').attr('placeholder', 'Buscar..');
                                    }
                                })
                            });


                            self_s.fail(function () {
                                self.plazasCAPView.mostrarPlazasSegunDependencias(self.unidadSelected.unidadId, function () {
                                    if (self.plazasCAPView.collection.length != 0) {
                                        $("#tabla_plazas").dataTable();
                                        $('#tabla_plazas_wrapper').append("<div id='footer-table'></div>");
                                        $('#tabla_plazas_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                        $('#tabla_plazas_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                                        $('.dataTables_filter input').addClass('buscador');
                                        $('.dataTables_filter input').attr('placeholder', 'Buscar..');

                                    }

                                    $('#nom_depen').text(self.unidadSelected.unidadDesc);
                                })

                            });

                            $('#modalServidores').modal("hide")
                        }


                    }

                },





                mostrarFechaInicial:function(ev){
                    var formatoFecha= $('#fechaInicial');

                    formatoFecha.datepicker({
                        format: 'dd/mm/yyyy',
                        viewMode: 2
                    });

                    formatoFecha.datepicker('show');
                } ,


                limpiarFechaInicial:function(ev){

                    $("#fechaInicial").val("");
                } ,


/*
                mostrarFechaFinal:function(ev){
                    var formatoFecha= $('#fechaFinal');

                    formatoFecha.datepicker({
                        format: 'dd/mm/yyyy',
                        viewMode: 2
                    });

                    formatoFecha.datepicker('show');
                } ,



                limpiarFechaFinal:function(ev){

                    $("#fechaFinal").val("");
                } ,
*/



                mostrarServidoresPorDependencia: function (ev) {
                    var self = this;
                    var clickedElement = $(ev.currentTarget);
                    this.codPlaza=clickedElement.attr('data5');
                    this.cod_Servidor=clickedElement.attr('data6');
                    this.estadoPlaza=clickedElement.attr('data7');

                    if(this.estadoPlaza=="VACANTE"){
                        self.modalServidoresPorDependenciaView.TodosServidoresPorDependencia(this.unidadSelected.unidadId,function(){
                                $("#table-servidores_asis").dataTable();
                                $('#table-servidores_asis_wrapper').append("<div id='footer-table'></div>");
                                $('#table-servidores_asis_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                $('#table-servidores_asis_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                                $('.dataTables_filter input').attr('placeholder', 'Buscar..');
                            }
                        );

                        self.servidoresModalHtml.show(self.modalServidoresPorDependenciaView);
                        $('#modalServidores').modal();

                    }else{
                        self.advertenciaInconsistenciaAddAsignacionHtml.show(self.modalAdverIncAddView);
                        $('#advertenciaInconsistenciaAgregarAsignacion').modal();

                    }

                },



                seleccionarUnidad:function(){

                    $('  #modal-unidadesMio').modal('hide');

                    this.unidadSelected = this.unidadesDialog.unidadClicked;
                    $('#nom_depen1').text(this.unidadSelected.unidadId);

                    $('#codigoDependencia').val(this.unidadSelected.unidadId);
                    $('#usuarioCN').val($('#email').text());
                    $('#nom_depen').val(this.unidadSelected.unidadDesc);

                    $('#form_reporteCN').show();


                    console.log("Este es el usuario:"+$('#email').text());
                    console.log("Este es el usuario:"+$('#id_rol').text());



                    var self=this;
                    this.plazasCAPView.mostrarPlazasSegunDependencias( this.unidadSelected.unidadId,function () {
                        if(self.plazasCAPView.collection.length!=0){

                            $("#tabla_plazas").dataTable();
                            $('#tabla_plazas_wrapper').append("<div id='footer-table'></div>");
                            $('#tabla_plazas_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                            $('#tabla_plazas_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                            $('.dataTables_filter input').addClass('buscador');
                            $('.dataTables_filter input').attr('placeholder','Buscar..');

                        }
                        $('#nom_depen2').text(self.unidadSelected.unidadDesc);

                    });



                    this.tablaPlazasHtml.show(this.plazasCAPView) ;
                },


                /*
                seleccionarUnidad:function(){

                    $('#modalDependencias').modal('hide');
                    this.unidadSelected = this.arbolDependenciasView.unidadClicked;
                    $('#nom_depen1').text(this.unidadSelected.unidadId);

                    $('#codigoDependencia').val(this.unidadSelected.unidadId);
                    $('#usuarioCN').val($('#email').text());
                    $('#nom_depen').val(this.unidadSelected.unidadDesc);

                    $('#form_reporteCN').show();


                    console.log("Este es el usuario:"+$('#email').text());



                    var self=this;
                    this.plazasCAPView.mostrarPlazasSegunDependencias( this.unidadSelected.unidadId,function () {
                        if(self.plazasCAPView.collection.length!=0){
                                 console.log(self.plazasCAPView.collection.at(1).get('nom_estruc'));
                                 console.log(self.plazasCAPView.collection.at(2).get('nom_estruc'));
                           /* $("#tabla_plazas").dataTable();
                            $('#tabla_plazas_wrapper').append("<div id='footer-table'></div>");
                            $('#tabla_plazas_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                            $('#tabla_plazas_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                            $('.dataTables_filter input').attr('placeholder','Buscar..');

                            $("#tabla_plazas").dataTable();


                            $('#tabla_plazas_wrapper').append("<div id='footer-table'></div>");
                            $('#tabla_plazas_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                            $('#tabla_plazas_previous').html("<i class='glyphicon glyphicon-backward'></i>");


                            $('.dataTables_filter input').attr('placeholder','Buscar..');

                        }
                        $('#nom_depen2').text(self.unidadSelected.unidadDesc);

                    });
                    this.tablaPlazasHtml.show(this.plazasCAPView) ;
                },


*/










                capturarDatosParaEliminarPlazaAsignada: function(ev){
                    var self = this;
                    var clickedElement=$(ev.currentTarget);
                    this.codPlaza=clickedElement.attr('data5');
                    this.estadoPlaza=clickedElement.attr('data7');

                    if(this.estadoPlaza=="OCUPADO"){
                        self.eliminarAsignacionHtml.show(self.modalEliminarAsignacionView);
                        $('#modalEliminarAsignacion').modal();

                    }else{

                        self.advertenciaInconsistenciaDelAsignacionHtml.show(self.modalAdverInconsistenciaEliminarAsigView);
                        $('#advertenciaInconsistenciaEliminarAsignacion').modal();
                    }

                },




                eliminarPlazaAsignada:function(){
                    var self=this;
                        this.model.get("deletePlazaAsignada").set({

                            "codPlaza":this.codPlaza,
                            "codServidor":"Ninguno",
                            "numserest":999,
                            "fechIng": "01/01/1900",
                            "fechSal": "01/01/1900",
                            "modSer":999


                        });
                        this.model.get("deletePlazaAsignada").url = "api/cuadro_nominal/deleteAsignacionPlaza";

                        var self_s = this.model.get("deletePlazaAsignada").save({}, {wait: true});

                        self_s.done(function(){

                        });

                        self_s.fail(function(){

                            self.plazasCAPView.mostrarPlazasSegunDependencias(self.unidadSelected.unidadId, function(){
                                if( self.plazasCAPView.collection.length!=0){
                                    $("#tabla_plazas").dataTable();
                                    $('#tabla_plazas_wrapper').append("<div id='footer-table'></div>");
                                    $('#tabla_plazas_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                    $('#tabla_plazas_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                                    $('.dataTables_filter input').addClass('buscador');
                                    $('.dataTables_filter input').attr('placeholder','Buscar..');

                                }

                                $('#nom_depen').text(self.unidadSelected.unidadDesc);
                            } )

                        }) ;
                       Avgrund.hide();
                }


            });
        });
        return ErzaManager.CuadroNominalApp.Form.View;
    });