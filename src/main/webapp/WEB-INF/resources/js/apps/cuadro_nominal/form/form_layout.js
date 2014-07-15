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

       "apps/cuadro_nominal/form/view/modalidadAsignacion",

        "apps/cuadro_nominal/form/view/anioPlazas",

        "apps/cuadro_nominal/form/view/DepySubDep",

        "apps/cuadro_nominal/form/view/tablaModalServidores2",

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
              addAsignacion,
              deleteAsignacion,
              plazasView,
              UnidadesDialogView,
              depenUsuarioView,
              modalidadAsignacionView,
              anioPlazasView,
              depySubDepView,

              TablaModalServidores2,


              datePicker) {
        ErzaManager.module('CuadroNominalApp.Form.View', function (View, ErzaManager, Backbone, Marionette, $, _) {

            View.Layout = Marionette.Layout.extend({

                template: layoutTpl,

                modalServidoresPorDependenciaView: new TablaModalServidores(),
                plazasCAPView: new plazasView(),
                modalAdverIncAddView: new advIncAddAsignacion(),
                modalAdverInconsistenciaEliminarAsigView: new advIncEliAsignacion(),
                modalEliminarAsignacionView: new eliminarAsignacionView(),
                unidadesDialog: new UnidadesDialogView(),
                depenUsuarioView: new depenUsuarioView(),
                modalidadAsignacionView:new   modalidadAsignacionView(),
                anioPlazasView: new anioPlazasView(),
                depySubDepView: new depySubDepView(),

                modalServidoresPorDependenciaView2: new TablaModalServidores2(),



                unidadClicked: {

                    unidadId:10002,
                    unidadDesc:"UNMSM"
                },

                elementoClickeado: null,



                unidadSelected: {
                    unidadId:10225,
                    unidadDesc:"C0319 - PROYECTO QUIPUCAMAYOC"
                },




                codPlaza:0,
                añoPlazas:0,

                codDepServidores:0,

                depUsuario:"Ninguno",
                perfilUsuario:"Ninguno",
                encabezado:"Ninguno",







                regions: {
                    "servidoresModalHtml": "#modalServidores",
                    "arbolDependenciasHtml":"#modalDependencias",
                    "tablaPlazasHtml": "#tablaPlazas",
                    "advertenciaInconsistenciaAddAsignacionHtml": "#advertenciaInconsistenciaAgregarAsignacion",
                    "advertenciaInconsistenciaDelAsignacionHtml": "#advertenciaInconsistenciaEliminarAsignacion",
                    "eliminarAsignacionHtml": "#modalEliminarAsignacion",
                    unidadesModal: "#modal-unidadesMio",
                    modalidadAsignacionAHtml:"#id_modalidades",
                    anioPlazasAHtml:"#anioPlazas",


                    "servidoresModalHtml2": "#modalServidores2"

                },


                events: {
                    "dblclick #table-servidores_asis > tbody > tr ": "seleccionarServidor",
                    "click #botonBuscarServidores": "mostrarServidoresPorDependencia",
                    "click #botonCapturarDatosParaEliminarPlazaAsignada": "capturarDatosParaEliminarPlazaAsignada",
                    "click #boton-unidadMio":"seleccionarUnidad",//************
                    "click #botonMostrarFechaInicial": "mostrarFechaInicial",
                    "click #botonLimpiarFechaInicial": "limpiarFechaInicial",
                    "click #botonAceptarEliminarPlazaAsignada": "eliminarPlazaAsignada",
                    "click #botonMostrarFechaFinal": "mostrarFechaFinal",
                    "click #botonLimpiarFechaFinal": "limpiarFechaFinal",
                    "click #a-modalMio":"invokeModalMio",
                    "change #anio_plazas": "cambiarAlertaAnio",

                    "dblclick #table-servidores_asis2 > tbody > tr ": "seleccionarServidor2",

                  //  "click #jjjjjjj":"clickUnidad"
                    "click .tree li": "clickUnidad"


                },


                onRender: function () { //Para cargar html mas no data
                    this.initialFetch();

                    this.modalidadAsignacionAHtml.show(this.modalidadAsignacionView);
                    this.anioPlazasAHtml.show(this.anioPlazasView);

                },


                initialize: function () {

                    this.model = new Backbone.Model();
                    this.model.set({
                        addServidorAPlaza: new addAsignacion(),
                        deletePlazaAsignada: new deleteAsignacion()

                    });

                },


                initialFetch: function () { //Para cargar la data en la vista

                    this.modalidadAsignacionView.mostrarModalidades();
                    this.anioPlazasView.mostrarAnioPlazas();
                },





                invokeModalMio: function(e){

                    if ($('#anio_plazas').val() ==99) {
                        $('#advertenciaAnioPlaza').html("<strong>Por favor, seleccione un año</strong>");
                        $('#advertenciaAnioPlaza').show();
                    } else {

                        var emailUsuario=$('#email').text();
                        console.log("Este es el usuario:"+emailUsuario);
                        var rolUsuario=$('#id_rol').text();
                        console.log("Este es el usuario:"+rolUsuario);

                        var self=this;
                        this.depenUsuarioView.mostrarDependenciaUsuario(emailUsuario,function () {
                            if(self.depenUsuarioView.collection.length!=0){

                                var depUsu= self.depenUsuarioView.collection.at(0).get("origenCodigo");
                                var perfUsu= self.depenUsuarioView.collection.at(0).get("origenDescripcion");

                                self.depUsuario=depUsu;
                                self.perfilUsuario=perfUsu;

                            }

                            self.unidadesDialog.initialize(self.depUsuario,self.perfilUsuario);
                            self.unidadesModal.show(self.unidadesDialog);
                            $('#modal-unidadesMio').modal();

                        });

                    }


                  /*

                    if ($('#anio_plazas').val() ==99) {
                        $('#advertenciaAnioPlaza').html("<strong>Por favor, seleccione un año</strong>");
                        $('#advertenciaAnioPlaza').show();
                    } else {

                        var emailUsuario=$('#email').text();
                        console.log("Este es el usuario:"+emailUsuario);
                        var rolUsuario=$('#id_rol').text();
                        console.log("Este es el usuario:"+rolUsuario);

                        var self=this;
                        this.depenUsuarioView.mostrarDependenciaUsuario(emailUsuario,function () {
                            if(self.depenUsuarioView.collection.length!=0){

                                var depUsu= self.depenUsuarioView.collection.at(0).get("origenCodigo");
                                var perfUsu= self.depenUsuarioView.collection.at(0).get("origenDescripcion");

                                this.depUsuario=depUsu;
                                this.perfilUsuario=perfUsu;

                                console.log("Perfil usuario origen:"+this.perfilUsuario);

                            }

                            self.unidadesDialog.initialize(this.depUsuario,this.perfilUsuario);
                            self.unidadesModal.show(self.unidadesDialog);
                            $('#modal-unidadesMio').modal();

                        });

                    }

                    */


                },






                seleccionarServidor: function (e) {

                    var self=this;
                    var clickedElement=$(e.currentTarget);
                    var cod=clickedElement.children(':nth-child(1)').text();
                    var numserest=clickedElement.children(':nth-child(2)').text();


                    if(cod!="No existen servidores para esta dependencia") {

                        if ($('#fechaInicial').val() == "") {

                            $('#advertenciaFechaInicial').html("<strong>Por favor, ingrese la fecha inicial</strong>");
                            $('#advertenciaFechaInicial').show();

                        } else {

                            self.model.get("addServidorAPlaza").set({
                                "codPlaza": this.codPlaza,
                                "codServidor": cod,
                                "numserest": numserest,
                                "fechIng": $('#fechaInicial').val(),
                                "fechSal": $('#fechaFinal').val(),
                                "modSer": $('#modalidad').val(),
                                "estPlaza": $('#ModOcupado').val()


                            });


                            this.model.get("addServidorAPlaza").url = "api/cuadro_nominal/addSerCuadroNominal2";

                            var self_s = this.model.get("addServidorAPlaza").save({}, {wait: true});

                            self_s.done(function () {


                            });

                            self_s.fail(function () {

                                self.plazasCAPView.mostrarPlazasSegunDependencias(self.unidadSelected.unidadId,self.añoPlazas,function () {
                                    if (self.plazasCAPView.collection.length != 0) {
                                        $("#tabla_plazas").dataTable();
                                        $('#tabla_plazas_wrapper').append("<div id='footer-table'></div>");
                                        $('#tabla_plazas_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                        $('#tabla_plazas_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                                        $('.dataTables_filter input').addClass('buscador');
                                        $('.dataTables_filter input').attr('placeholder', 'Buscar..');

                                    }

                                    $('#nom_encabezado_plazas').text(self.encabezado);

                                })

                            });

                            $('#modalServidores').modal("hide")
                        }
                    }
                },



                seleccionarServidor2: function (e) {

                    var self=this;
                    var clickedElement=$(e.currentTarget);
                    var cod=clickedElement.children(':nth-child(1)').text();
                    var numserest=clickedElement.children(':nth-child(2)').text();


                    if(cod!="No existen servidores para esta dependencia") {

                        if ($('#fechaInicial').val() == "") {

                            $('#advertenciaFechaInicial').html("<strong>Por favor, ingrese la fecha inicial</strong>");
                            $('#advertenciaFechaInicial').show();

                        } else {

                            self.model.get("addServidorAPlaza").set({
                                "codPlaza": this.codPlaza,
                                "codServidor": cod,
                                "numserest": numserest,
                                "fechIng": $('#fechaInicial').val(),
                                "fechSal": $('#fechaFinal').val(),
                                "modSer": $('#modalidad').val()
                            });


                            this.model.get("addServidorAPlaza").url = "api/cuadro_nominal/addSerCuadroNominal";

                            var self_s = this.model.get("addServidorAPlaza").save({}, {wait: true});

                            self_s.done(function () {


                            });

                            self_s.fail(function () {

                                self.plazasCAPView.mostrarPlazasSegunDependencias(self.unidadSelected.unidadId,self.añoPlazas,function () {
                                    if (self.plazasCAPView.collection.length != 0) {
                                        $("#tabla_plazas").dataTable();
                                        $('#tabla_plazas_wrapper').append("<div id='footer-table'></div>");
                                        $('#tabla_plazas_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                        $('#tabla_plazas_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                                        $('.dataTables_filter input').addClass('buscador');
                                        $('.dataTables_filter input').attr('placeholder', 'Buscar..');

                                    }

                                    $('#nom_encabezado_plazas').text(self.encabezado);

                                })

                            });

                            $('#modalServidores2').modal("hide")
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





                mostrarServidoresPorDependencia: function (ev) {

                    var self = this;
                    var clickedElement = $(ev.currentTarget);
                    this.codPlaza=clickedElement.attr('cod_plaza');
                    var  cod_est_plaza=clickedElement.attr('cod_est_plaza');

                    if(cod_est_plaza==3 || cod_est_plaza==5){

                        console.log("Dependencia usuario destino:"+this.perfilUsuario);
                        console.log("Perfil usuario destino:"+this.depUsuario);



                        if(this.perfilUsuario=="ADMIN"){

                            self.modalServidoresPorDependenciaView.TodosServidoresPorDependencia(this.codDepServidores,function(){

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

                            self.modalServidoresPorDependenciaView2.TodosServidoresPorDependencia(this.codDepServidores,function(){

                                    $("#table-servidores_asis2").dataTable();
                                    $('#table-servidores_asis2_wrapper').append("<div id='footer-table'></div>");
                                    $('#table-servidores_asis2_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                    $('#table-servidores_asis2_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                                    $('.dataTables_filter input').attr('placeholder', 'Buscar..');

                                }

                            );


                            self.servidoresModalHtml2.show(self.modalServidoresPorDependenciaView2);
                            $('#modalServidores2').modal();


                        }



                    }else{
                        self.advertenciaInconsistenciaAddAsignacionHtml.show(self.modalAdverIncAddView);
                        $('#advertenciaInconsistenciaAgregarAsignacion').modal();

                    }

                },






                seleccionarUnidad:function(){

                   $('#modal-unidadesMio').modal('hide');

                    this.unidadSelected = this.unidadClicked;
                   //$('#nom_depen1').text(this.unidadSelected.unidadId);// para probar


                   $('#codigoDependencia').val(this.unidadSelected.unidadId);
                   $('#usuarioCN').val($('#email').text());
                   //$('#nom_depen').val(this.unidadSelected.unidadDesc);
                   $('#anio').val($('#anio_plazas').val());
                   $('#form_reporteCN').show();

                    this.añoPlazas=$('#anio_plazas').val();

                    var nombreEncabezado = " ";
                    var codigoDependencia=" ";


                    var self=this;

                    this.depySubDepView.obtenerEncabezado(this.unidadSelected.unidadId,function () {

                            if (self.depySubDepView.collection.length != 0  &&  self.depySubDepView.collection.length == 2) {

                                //console.log("Cantidad de filas: " + self.depySubDepView.collection.length);

                                var fila1_ud_id_h = self.depySubDepView.collection.at(0).get("ud_id_hijo");
                                var fila1_ud_cod_h = self.depySubDepView.collection.at(0).get("ud_cod_hijo");
                                var fila1_ud_dsc_h = self.depySubDepView.collection.at(0).get("ud_dsc_hijo");
                                var fila1_ud_id_p = self.depySubDepView.collection.at(0).get("ud_id_padre");
                                var fila1_ud_cod_p = self.depySubDepView.collection.at(0).get("ud_cod_padre");
                                var fila1_ud_dsc_p = self.depySubDepView.collection.at(0).get("ud_dsc_padre");

                                var fila2_ud_id_h = self.depySubDepView.collection.at(1).get("ud_id_hijo");
                                var fila2_ud_cod_h = self.depySubDepView.collection.at(1).get("ud_cod_hijo");
                                var fila2_ud_dsc_h = self.depySubDepView.collection.at(1).get("ud_dsc_hijo");
                                var fila2_ud_id_p = self.depySubDepView.collection.at(1).get("ud_id_padre");
                                var fila2_ud_cod_p = self.depySubDepView.collection.at(1).get("ud_cod_padre");
                                var fila2_ud_dsc_p = self.depySubDepView.collection.at(1).get("ud_dsc_padre");

                                var primerCaracter = fila1_ud_cod_h.substring(0, 1);
                                var cantidadCaracteres = fila1_ud_cod_h.length;

                                console.log("Fila 1: " + fila1_ud_id_h + " " + fila1_ud_cod_h + " " + fila1_ud_dsc_h + " " + fila1_ud_id_p + " " + fila1_ud_cod_p + " " + fila1_ud_dsc_p);
                                console.log("Fila 2: " + fila2_ud_id_h + " " + fila2_ud_cod_h + " " + fila2_ud_dsc_h + " " + fila2_ud_id_p + " " + fila2_ud_cod_p + " " + fila2_ud_dsc_p);


                                if (primerCaracter == "F" && cantidadCaracteres > 5) {

                                    nombreEncabezado = fila1_ud_dsc_p + " - " + fila1_ud_dsc_h;
                                    codigoDependencia=fila1_ud_id_p;


                                }else{

                                    if (primerCaracter == "F" && cantidadCaracteres == 5) {

                                        nombreEncabezado = fila2_ud_dsc_h;
                                        codigoDependencia=fila1_ud_id_p;



                                    }else{

                                        if (primerCaracter != "F" && cantidadCaracteres > 3) {

                                            nombreEncabezado = fila2_ud_dsc_p + " - " + fila2_ud_dsc_h;
                                            codigoDependencia=fila2_ud_id_p;

                                        }

                                    }

                                }

                                self.encabezado=nombreEncabezado;
                                self.codDepServidores=codigoDependencia;

                            }else{

                                if(self.depySubDepView.collection.length != 0  &&  self.depySubDepView.collection.length == 1){



                                    var fila1_ud_id_h = self.depySubDepView.collection.at(0).get("ud_id_hijo");
                                    var fila1_ud_cod_h = self.depySubDepView.collection.at(0).get("ud_cod_hijo");
                                    var fila1_ud_dsc_h = self.depySubDepView.collection.at(0).get("ud_dsc_hijo");
                                    var fila1_ud_id_p = self.depySubDepView.collection.at(0).get("ud_id_padre");
                                    var fila1_ud_cod_p = self.depySubDepView.collection.at(0).get("ud_cod_padre");
                                    var fila1_ud_dsc_p = self.depySubDepView.collection.at(0).get("ud_dsc_padre");


                                    var primerCaracter = fila1_ud_cod_h.substring(0, 1);
                                    var cantidadCaracteres = fila1_ud_cod_h.length;

                                    console.log("Fila 1: " + fila1_ud_id_h + " " + fila1_ud_cod_h + " " + fila1_ud_dsc_h + " " + fila1_ud_id_p + " " + fila1_ud_cod_p + " " + fila1_ud_dsc_p);

                                    if (primerCaracter == "F" && cantidadCaracteres == 3) {

                                        nombreEncabezado = fila1_ud_dsc_p;
                                        codigoDependencia=fila1_ud_id_p;

                                    }else{

                                        if (primerCaracter != "F" && cantidadCaracteres == 3) {

                                            nombreEncabezado = fila1_ud_dsc_p;
                                            codigoDependencia=fila1_ud_id_p;

                                        }

                                    }

                                    self.encabezado=nombreEncabezado;
                                    self.codDepServidores=codigoDependencia;




                                }



                            }






                      $('#nom_depen').val(nombreEncabezado);

                    });


                    this.plazasCAPView.mostrarPlazasSegunDependencias(this.unidadSelected.unidadId,this.añoPlazas,function () {
                        if(self.plazasCAPView.collection.length!=0){

                            //var valor= self.plazasCAPView.collection.at(0).get("nom_estruc");

                            $("#tabla_plazas").dataTable();
                            $('#tabla_plazas_wrapper').append("<div id='footer-table'></div>");
                            $('#tabla_plazas_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                            $('#tabla_plazas_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                            $('.dataTables_filter input').addClass('buscador');
                            $('.dataTables_filter input').attr('placeholder','Buscar..');

                        }

                        $('#nom_encabezado_plazas').text(self.encabezado);

                    });

                    this.tablaPlazasHtml.show(this.plazasCAPView) ;

                },






                capturarDatosParaEliminarPlazaAsignada: function(ev){

                    var self = this;
                    var clickedElement=$(ev.currentTarget);
                    this.codPlaza=clickedElement.attr('codPlaza');
                    var  cod_est_plaza=clickedElement.attr('cod_est_plaza');


                    if(cod_est_plaza==4  ||  cod_est_plaza==6){
                        self.eliminarAsignacionHtml.show(self.modalEliminarAsignacionView);
                        $('#modalEliminarAsignacion').modal();

                    }else{

                        self.advertenciaInconsistenciaDelAsignacionHtml.show(self.modalAdverInconsistenciaEliminarAsigView);
                        $('#advertenciaInconsistenciaEliminarAsignacion').modal();
                    }

                },






                cambiarAlertaAnio: function () {

                    //console.log("Entro alerta anio");
                    $("#advertenciaAnioPlaza").hide();

                   // $("#tablaPlazas").hide();

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

                            self.plazasCAPView.mostrarPlazasSegunDependencias(self.unidadSelected.unidadId,self.añoPlazas, function(){

                                if( self.plazasCAPView.collection.length!=0){
                                    $("#tabla_plazas").dataTable();
                                    $('#tabla_plazas_wrapper').append("<div id='footer-table'></div>");
                                    $('#tabla_plazas_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                    $('#tabla_plazas_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                                    $('.dataTables_filter input').addClass('buscador');
                                    $('.dataTables_filter input').attr('placeholder','Buscar..');

                                }

                                $('#nom_encabezado_plazas').text(self.encabezado);
                            } )

                        }) ;

                       Avgrund.hide();
                },



                clickUnidad : function(e){

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

                }


            });
        });
        return ErzaManager.CuadroNominalApp.Form.View;
    });