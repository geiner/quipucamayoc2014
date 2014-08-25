define(["app", "hbs!apps/reportes/form/templates/inicio_reportes","apps/reportes/form/view/tiposervidor",  "apps/reportes/form/view/estservidor", "apps/reportes/form/view/catservidor" ,
    "apps/reportes/form/view/regpenservidor", "apps/reportes/form/view/tipagoservidor","apps/reportes/form/view/depservidor","apps/reportes/form/view/tiposervidorinfo",
    "apps/reportes/form/view/tabla_informacion",    "apps/reportes/form/view/estservidorinfo", "apps/reportes/form/view/seleccion","apps/resoluciones/form/view/servidor-view",
    "apps/reportes/form/view/tiposervpla","apps/reportes/form/view/tipoestpla", "apps/reportes/form/view/altaCondPla","apps/reportes/form/view/altabajamodal","apps/reportes/form/view/altabajamodal2",
    "apps/reportes/form/view/listarServCondPla", "apps/resoluciones/form/view/servidor-view","apps/reportes/form/view/tablaCambioInfoServ", "apps/reportes/form/view/listarServCondPla2",

    "jquery","lib/jquery.dataTables.min","lib/bootstrap-datepicker","lib/jquery.numeric","bootstrap"],

    function (ErzaManager, inicio_reportesTemp, tiposervidorView, estservidorView ,catservidorView ,regpenservidorView ,tipagoservidorView,
              depservidorView ,tiposervidorinfoView ,InformacionServView,estservidorinfoView,SeleccionView,ListarServidorView,
              tiposervplaView,tipoestplaView,altaCondPlaView, altabajaView, altabaja2View,listarServCondPlaView,listarServidorccpView,
              tablaCambioInfoServView, listarServCondPla2View
              ) {
        ErzaManager.module('ReportesApp.Form.View', function (View, ErzaManager, Backbone, Marionette, $, _) {



            View.Layout = Marionette.Layout.extend({



                template: inicio_reportesTemp,
                tiposervidorView: new tiposervidorView(),
                tiposervidorinfoView:new tiposervidorinfoView(),
                estservidorView: new estservidorView(),
                catservidorView: new catservidorView(),
                regpenservidorView:new regpenservidorView(),
                tipagoservidorView: new tipagoservidorView(),
                depservidorView: new depservidorView(),
                estservidorinfoView:new estservidorinfoView(),
                SeleccionView:new SeleccionView(),
                ListarServidorView: new ListarServidorView(),
                tablaCambioInfoServView: new tablaCambioInfoServView(),

                InformacionServView: new InformacionServView(),     //fer
                tiposervplaView: new tiposervplaView(),                  //jean
                tipoestplaView: new tipoestplaView(),//j
                altaCondPlaView: new altaCondPlaView(),  //j
                altabajaView: new altabajaView(),           //j
                altabaja2View:new altabaja2View(),             //j
                listarServCondPlaView:new listarServCondPlaView(),//j
                ListarServidorccpView: new listarServidorccpView(),//j para el boton de buscar servidores de la pestaña ccp

                //parte de jean
                listarServCondPla2View: new listarServCondPla2View(),

                ///////////////aqui crear la tabla de baja

                // Variables,

                band1:false,     //se activara cuando se seleccione un servidor....
                tipoServ:"",
                estServ:"",
                e1:"",
                e2:"",
                e3:"",
                e4:"",
                e5:"",
                e6:"",
                e7:"",
                e8:"",
                anioIni:"",
                anioFin:"",
                mesIni:"",
                mesFin:"",
                dni:"",
                tipito:"",
                estito:"",
                ParEst:"",
                ParCat:"",
                ParDep:"",
                ParRegPen:"",
                ParEntAseg:"",


                //regiones
                regions:{
                //parte de carlos
                tablaInfocisReg: "#tabla_cis",
                tiposerReg:"#tiposer",
                estserReg:"#estser",
                catserReg:"#catser",
                regpenserReg:"#regpenser",
                tipagoserReg:"#tipagoser",
                depserReg:"#depser",
                tiposerinfoReg:"#tiposerinfo",
                estserinfoReg:"#estserinfo",
                seleccionReg:"#seleccionModal",
                ListarReg: "#servidoresModal",
                tablaCambioInfoServReg: "table-cambio-info-serv",

                tablainfoReg:"#tablainfoser",   //fer
                    //parte de jean
                tiposervpla:"#tiposervpla",//jean
                tipoestpla:"#tipoestpla",   //j
                    altaCondPlaReg:"#altaCondPla",//j
                    altabajaReg:"#modal-altabaja",   //j
                    altabaja2Reg:"#modal-altabaja2",    //j
                    listarServCondPlaReg:"#listar_cond_plani",//j
                    ListarccpReg:"#servidoresccpModal", //j


                  listarServCondPla2Reg: "#listar_cond_plani2"

                 },

                events: {
                    //parte Carlos
                    "click #btn_limpiar_cis":"limpiarCabeceraTabs",
                    "click #btn_desc_cis":"reporte_info_grupal",
                    "click #btn_desc_cis1":"reporte_info_servidor",
                    "click #mostrar_serv":"entroListar",
                    "click .todos":"desseleccionarOtrosChecks",
                    "click .checkitos":"desseleccionarTodos",
                    "click #ingres_ini_info_clos":"limpiarFechaIni",
                    "click #ingres_fin_info_clos":"limpiarFechaFin",
                    "click .tabDos":"limpiarCabeceraTabsFernando",
                    "click .tabUno":"limpiarCabeceraTabs",
                    "dblclick #table-servidor > tbody > tr ": "seleccionarServidor",
                    "click #list_serv_cis": "llamarModalServidores",
                    "click #btn_selec_cis": "metodoBotonSeleccionar",

                    "click #ingres_ini_info_show": "show_ingres_ini_info",
                    "click #ingres_fin_info_show": "show_ingres_fin_info",



                    ///////////parte de Fernando
                    "click #nac_ini_show": "show_nac_ini",
                    "click #nac_fin_show": "show_nac_fin",
                    "click #ingres_ini_show": "show_ingres_ini",
                    "click #ingres_fin_show": "show_ingres_fin",
                    "click #nac_ini_clos": "clos_nac_ini",
                    "click #nac_fin_clos": "clos_nac_fin",
                    "click #ingres_ini_clos": "clos_ingres_ini",
                    "click #ingres_fin_clos": "clos_ingres_fin",//f
                    "change #chedad":"mostrarfechas",
                    "change #chsex":"mostrarsexo",
                    "change #chtipo":"mostrartipo",
                    "change #chest": "mostrarestado",
                    "change #chcat": "mostrarcategoria",
                    "change #chreg":"mostrarregimen",
                    "change #chtpago":"mostrarpago",
                    "change #chdep":"mostrardep",
                    "change #chfing":"mostrarfecing",
                    "click #list_serv_ias":"mostrartabla",//f
                    "click #limpiar_ias":"limpiarias",
                    "click #desc_reporte_ias":"reporte_ias",

                    //parte Jean
                    "click #ingres_ini_plani_show": "show_ingres_ini_plani",
                    "click #ingres_fin_plani_show": "show_ingres_fin_plani",
                    "click #condpla":"condEnPlanilla" ,      //j
                    "click #cond_pla_alta":"modal_altabaja1",   //j
                    "click #cond_pla_baja":"modal_altabaja2",       //j
                    "click #mostrar_serv_cond_pla2":"listar_serv_cond_pla2",         //j
                    "click #mostrar_serv_cond_pla1":"listar_serv_cond_pla", //lista todos los servidores // j
                    "click .todosCCP":"desseleccionarOtrosCCP",
                    "click .checkCCP": "desseleccionarTodosCCP",

                    "click .todosBajas":"desseleccionarBajas",
                    "click .bajas":"dessleccionarTodosBajas",
                    "click #ingres_fin_plani_refresh":"limpiarFinCCP",
                    "click #ingres_ini_plani_refresh":"limpiarIniCCP",

                    "click #list_serv_pla_limpiar": "limpiarTodoCCP",
                    "click #descargar_serv_cond_pla": "descargarReportServCondPla",
                    "click #descargar_un_serv_cond_pla":"descargarReportServUnCondPla"




                },

                onRender: function(){
                    this.initialFetch();

                    this.tiposerinfoReg.show(this.tiposervidorinfoView),
                    this.estserinfoReg.show(this.estservidorinfoView),
                    this.tablaInfocisReg.show(this.tablaCambioInfoServView);




                    //////////////////////////  parte de Fernando////////////////////
                    this.tiposerReg.show(this.tiposervidorView),
                        this.estserReg.show(this.estservidorView),
                        this.catserReg.show(this.catservidorView),
                        this.regpenserReg.show(this.regpenservidorView),
                        this.tipagoserReg.show(this.tipagoservidorView),
                        this.depserReg.show(this.depservidorView) ,
                        this.tablainfoReg.show(this.InformacionServView),

                    /////////////parte de Jean/////////////////////////////

                    this.tiposervpla.show(this.tiposervplaView),//jean
                    this.tipoestpla.show(this.tipoestplaView), //j
                    this.altaCondPlaReg.show(this.altaCondPlaView),     //j
                        this.altabajaReg.show(this.altabajaView),    //j
                        this.altabaja2Reg.show(this.altabaja2View),//j
                        this.listarServCondPlaReg.show(this.listarServCondPlaView),//j
                    this.listarServCondPla2Reg.show(this.listarServCondPla2View) //j tabla para baja



                },

                initialize: function () {

                    //initialize model
                    this.model = new Backbone.Model();
                },

                initialFetch: function(){
                    this.ListarServidorView.fetchServidores() ;
                    this.tiposervidorView.getTipoServidor();
                    this.estservidorView.getEstServidor();
                    this.catservidorView.getCatServidor();
                    this.regpenservidorView.getRegPenServidor();
                    this.tipagoservidorView.getTiPagoServidor();
                    this.depservidorView.getDepServidor();
                    this.tiposervidorinfoView.getTipoServidorInfo();
                    this.estservidorinfoView.getEstServidorInfo();


                    this.tiposervplaView.getTipoServidorPla();//j
                    this.tipoestplaView.getTipoEstadoPla();//j
                    this.ListarServidorccpView.fetchServidores();//j

                },
                //
                llamarModalServidores:function(e){
                    var self=this;
                    var clickedElement=$(e.currentTarget);

                    clickedElement.button('loading');

                    setTimeout(function () {
                        clickedElement.button('reset');
                        self.ListarReg.show(self.ListarServidorView) ;
                            if(self.ListarServidorView.collection.length!=0){
                                $("#table-servidor").dataTable();
                                $('#table-servidor_wrapper').append("<div id='footer-table'></div>");
                                $('#table-servidor_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                $('#table-servidor_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                                $('.dataTables_filter input').attr('placeholder','Buscar..');
                            }

                        $("#servidoresModal").modal();

                    },2000);
                },

                seleccionarServidor:function(e){

                    $("#datoServ").show();
                    var clickedElement=$(e.currentTarget);

                    var cod_ant=clickedElement.children(':nth-child(3)').text();
                    var nombre=clickedElement.children(':nth-child(1)').text();
                    var tipTrabCCP=clickedElement.children(':nth-child(4)').text();
                    this.tipoServ=tipTrabCCP;
                    var est=clickedElement.children(':nth-child(6)').text();
                    this.estServ=est;
                    var dni=clickedElement.children(':nth-child(2)').text();
                    this.dni=dni;


                    $("#dniServ").text(dni);
                    $('#nomServ').text(nombre);
                    $('#codAnt').text(cod_ant);
                    $('#tipTrabCCP').text(tipTrabCCP);
                    $("#estServ").text(est);

                    $("#servidoresModal").modal('hide');
                    $("#tipYest").hide();

                    //parte de jean
                    $("#tipYestCCP").hide();
                    $("#div_un_trabajador").show();  //selecciono un trabajador -> muestra el boton para descargar de un trabajador
                    $("#div_todos_trabajadores").hide(); //esconde el boton de descargar grupal

                    this.band1=true; //para no tomar en cuenta los combos de tipo y estado
                    //alert("band1 es ahora: "+this.band1);

                    //ocultando el boton generar reporte grupal y mostrando boton generar reporte de un servidor
                    $("#reporte_grupal_show_cis").hide();
                    $("#reporte_servidor_show_cis").show();
                    //mostrar fecha fin
                    $('#div_fech_fin').show();
                    $('#fechaFinCCP').show();

                },
                metodoBotonSeleccionar:function(e){
                    //ocultar mensaje de no Data
                    $('#noData').hide();
                    //alert("band1 al entrar a seleccionar: "+this.band1);
                    $("#noTipoNiEstado").hide();
                    $("#noTipo").hide();
                    $("#noEstado").hide();
                    $("#errorFech").hide();
                    $("#noFechFin").hide();
                    $("#noFechIni").hide();
                    $("#noFechas").hide();
                    //validar si se trata de consulta para un servidor
                    //validando fechas
                    if(this.band1==true){//es decir se selecciono a un servidor en especial...solo hace falta el codigo del servidor para el filtrado
                        // alert("band1 es true")

                        if($('#ingres_ini_info').val()!="" && $('#ingres_fin_info').val()!=""){
                            //alert("entro a fechas diferentes de null");

                            var iniMes= $('#ingres_ini_info').val().substring(3,5) ;
                            var iniDia = $('#ingres_ini_info').val().substring(0, 2);
                            var iniAno = $('#ingres_ini_info').val().substring(6, 10);
                            var finMes = $('#ingres_fin_info').val().substring(3, 5);
                            var finDia = $('#ingres_fin_info').val().substring(0, 2);
                            var finAno = $('#ingres_fin_info').val().substring(6, 10);
                            // alert(iniMes);
                            if(iniAno<finAno){
                                // alert("fechas correctas");

                                this.llamarModalSeleccionar(e);

                            } else{
                                if(iniAno==finAno) {
                                    if(finMes>iniMes){
                                        // alert("año igual y mes del fin mayor...ok")

                                        //Validando el tipo y estado del servidor

                                        this.llamarModalSeleccionar(e);


                                    }else{
                                        if(finMes==iniMes){
                                            if(finDia>iniDia){
                                                // alert("año igual, mes igual....y dia del fin mayor...ok")

                                                this.llamarModalSeleccionar(e);

                                            }else  {
                                                if(finDia==iniDia){
                                                    // alert("ini y fin son identicos....")
                                                    this.llamarModalSeleccionar(e);
                                                }else{
                                                    //  alert("ini mayor que fin")
                                                    $("#errorFech").show();
                                                }
                                            }
                                        } else{
                                            // alert("inicio mayor que fin")
                                            $("#errorFech").show();
                                        }
                                    }}else{
                                    //alert("inicio es mayor")
                                    $("#errorFech").show();
                                }
                            }
                        }
                        if($('#ingres_ini_info').val()!="" && $('#ingres_fin_info').val()==""){
                            // alert("no ingreso la fecha  de fin");

                            this.llamarModalSeleccionar(e);
                            $("#noFechFin").show();

                        }
                        if ($('#ingres_ini_info').val()=="" && $('#ingres_fin_info').val()!=""){
                            //alert("no ingreso la fecha de inicio ");

                            this.llamarModalSeleccionar(e);
                            $("#noFechIni").show();

                        }
                        if ($('#ingres_ini_info').val()=="" && $('#ingres_fin_info').val()==""){
                            // alert("entro a fechas nulas");
                            // alert("band1 entra en: "+this.band1);


                            this.llamarModalSeleccionar(e);
                            $("#noFechas").show();

                        }
                    }


                    //validar si se trata de consulta por grupo
                    //validando fechas
                    if(this.band1!=true){

                        if($('#ingres_ini_info').val()!=""){
                            var iniMes= $('#ingres_ini_info').val().substring(3,5) ;
                            var iniDia = $('#ingres_ini_info').val().substring(0, 2);
                            var iniAnio = $('#ingres_ini_info').val().substring(6, 10);

                            // alert("mes: "+iniMes);
                            // alert ("año:"+ iniAnio);
                            //se listaran a todos los servidores y se debe tomar el tipo y el estado de los combos para el filtrado
                            tipoServ=$('#tiposervidorinfo').val();
                            estServ=$('#estservidorinfo').val();
                            //alert("tipo: "+tipoServ + "estado: "+estServ);

                            this.llamarModalSeleccionar(e);
                        }else{
                            $('#errorNoFech').show();
                        }
                    }


                },

                llamarModalSeleccionar:function(e){
                    var self=this;
                    var clickedElement=$(e.currentTarget);

                    clickedElement.button('loading');

                    //setTimeout(function () {
                    clickedElement.button('reset');
                    self.seleccionReg.show(self.SeleccionView) ;

                    $("#seleccionModal").modal();

                    //},2000)
                },

                limpiarCabeceraTabs:function(){
                    //mostrar el boton buscar servidor
                    $("#list_serv_cis").show();

                    $("#errorCamposOblig").hide();
                    $("#errorFech").hide();
                    $('#errorNoFech').hide();

                    $("#datoServ").hide();
                    $("#errorFechNac").hide();
                    $("#errorFechIng").hide();
                    $("#errorFechNacIV").hide();
                    $("#errorFechNacFV").hide();
                    $("#errorFechIngIV").hide();
                    $("#errorFechIngFV").hide();
                    $("#errorSel").hide();
                    this.band1="false";
                    $("#tipYest").show();
                    this.tablaInfocisReg.reset();
                    $("#listar_cis").attr("hidden","hidden");

                    //limpiando combos
                    $('#tiposervidorinfo').val("1");
                    $('#estservidorinfo').val("99");

                    //botones generar reporte
                    $("#reporte_grupal_show_cis").show();
                    $("#reporte_servidor_show_cis").hide();
                    //limpiando fechas

                    $("#ingres_ini_info").val("");
                    $("#ingres_fin_info").val("");

                    //limpiando lo de Jean
                    $('#tiposervidorpla').val("1");
                    $('#estadoservidorplani').val("99");

                    //ocultar fecha fin
                    $('#div_fech_fin').hide();
                    //ocultar mensaje de no Data
                    $('#noData').hide();
                },

                limpiarCabeceraTabsFernando:function(){
                    $("#errorCamposOblig").hide();
                    $("#errorFech").hide();
                    $('#errorNoFech').hide();

                    $("#datoServ").hide();
                    $("#errorFechNac").hide();
                    $("#errorFechIng").hide();
                    $("#errorFechNacIV").hide();
                    $("#errorFechNacFV").hide();
                    $("#errorFechIngIV").hide();
                    $("#errorFechIngFV").hide();
                    $("#errorSel").hide();
                    this.band1="false";
                    $("#tipYest").show();
                    this.tablaInfocisReg.reset();
                    $("#listar_cis").attr("hidden","hidden");
                    //limpiando combos
                    $('#tiposervidorinfo').val("1");
                    $('#estservidorinfo').val("99");

                    //botones generar reporte
                    $("#reporte_grupal_show_cis").show();
                    $("#reporte_servidor_show_cis").hide();
                    //limpiando fechas

                    $("#ingres_ini_info").val("");
                    $("#ingres_fin_info").val("");

                    //esconder el boton buscar servidor para Fernando
                    $("#list_serv_cis").hide();

                    //limpiando lo de Jean
                    $('#tiposervidorpla').val("1");
                    $('#estadoservidorplani').val("99");
                    //ocultar fecha fin
                    $('#div_fech_fin').hide();
                    //ocultar mensaje de no Data
                    $('#noData').hide();
                },

                limpiarFechaIni:function(){
                    $("#ingres_ini_info").val("");
                },

                limpiarFechaFin:function(){

                    $("#ingres_fin_info").val("");
                },


                desseleccionarTodos:function(){
                   $('.todos ').prop('checked',false);   //desselecciono todos  al seleccionar otro checkbox

                    //alert("clickeando");
                   //$('.todos').removeClass("checked")
                },
                desseleccionarOtrosChecks:function(){
                    $('.checkitos ').prop('checked',false);    //al seleccionar todos, se desselecciona los demas checkboxs
                },

                entroListar:function(vv){
                    var self=this;
                    var clickedElement=$(vv.currentTarget);
                    clickedElement.button('loading');


                    //verificando fechas para enviar
                    if($('#ingres_ini_info').val()!="" )  {
                        this.anioIni=$('#ingres_ini_info').val().substring(6, 10);
                        this.mesIni= $('#ingres_ini_info').val().substring(3,5) ;
                    }else{
                        this.anioIni=2000;
                        this.mesIni=01;
                    }

                    if($('#ingres_fin_info').val()!="" )  {
                        this.anioFin=$('#ingres_fin_info').val().substring(6, 10);
                        this.mesFin= $('#ingres_fin_info').val().substring(3,5) ;
                    }else{
                        this.anioFin=2050;
                        this.mesFin=12;
                    }


                    //alert ("año inicial: " + this.anioIni + "mes inicial: "+this.mesIni)  ;
                    //alert ("año final: " + this.anioFin + "mes final: "+this.mesFin)  ;
                    var anioIni=this.anioIni;
                    var anioFin=this.anioFin;
                    var mesIni=this.mesIni;
                    var mesFin=this.mesFin;
                    //verificando tipo y estado
                    if(this.band1==true){          //osea se trata de un solo servidor
                        ////tipo
                        var tipito;
                        if(this.tipoServ=="SIN TIPO"){
                            tipito=0;
                        }
                        if(this.tipoServ=="DOCENTE"){
                            tipito=1;
                        }
                        if(this.tipoServ.indexOf("ADMINISTRATIVO")!=-1){
                            tipito=2;
                        }
                        if(this.tipoServ=="DOCENTE DEL MAGISTERIO"){
                            tipito=3;
                        }
                        if(this.tipoServ=="ADM. PROF. DE LA SALUD"){
                            tipito=4;
                        }
                        if(this.tipoServ=="OBRERO"){
                            tipito=5;
                        }
                        if(this.tipoServ=="DESIGNADO"){
                            tipito=6;
                        }
                        if(this.tipoServ=="DESIGNADO DOC. DEL MAGISTERIO"){
                            tipito=7;
                        }
                        //alert("tipito: "+tipito);


                        ////estado
                        var estito;
                        if(this.estServ=="SIN ESTADO"){
                            estito=0;
                        }
                        if(this.estServ=="PERMANENTE"){
                            estito=1;
                        }
                        if(this.estServ=="CONTRATADO"){
                            estito=2;
                        }
                        if(this.estServ=="CESANTE"){
                            estito=3;
                        }
                        if(this.estServ=="SNP"){
                            estito=4;
                        }
                        if(this.estServ=="CONTRATO PERSONAL"){
                            estito=5;
                        }
                        if(this.estServ=="AMC"){
                            estito=6;
                        }
                        if(this.estServ=="CAS"){
                            estito=7;
                        }
                        //alert("estito: "+estito);

                        // para el reporte
                        this.tipito=tipito;
                        this.estito=estito;



                    }else{                       //osea se mostraran todos los servidores
                        this.tipoServ=$('#tiposervidorinfo').val();
                        var tipo=this.tipoServ;

                        this.e1=$('#estservidorinfo').val();

                        //alert("tipo:  "+this.tipoServ +" estado: "+this.e1+this.e2+this.e3);
                        var e1= this.e1;

                    }

                    //verificar los checkbox clickeados
                    var chtodos =$("#chtodos:checked").val();
                    var chestado =$("#chestado:checked").val();
                    //var chclase =$("#chclase:checked").val();
                    var chcateg =$("#chcateg:checked").val();
                    var chdep =$("#chdep:checked").val();
                    var chreg =$("#chreg:checked").val();
                    // var chafp =$("#chafp:checked").val();
                    var chaseg =$("#chaseg:checked").val();

                    //ver si se trata de un solo servidor para llamar a una query distinta
                    if(this.band1==true){   //un solo servidor
                        //dependiendo de los checkbox, se llamara a las tablas, ya que se ocultaran o no algunas columnas

                        if( chtodos==undefined && chestado==undefined  && chcateg==undefined &&
                            chdep==undefined && chreg==undefined  && chaseg==undefined){
                            // alert("no se selecciono ningun checkbox...no debe salir nada");
                        }else{

                            if (chtodos!=undefined){
                                // alert("se mostraran todas las columnas");    ///aqui colocar todas las columnas-------------------ojo------------------------------

                                /*setTimeout(function() {
                                 alert("activoo!!");
                                 $('#preloader').hide();

                                 }, 5000);*/
                                this.tablaCambioInfoServView.fetchtablaCambiosInfoDelServ(anioIni,mesIni,anioFin,mesFin,this.dni,tipito,estito,function () {
                                    //  alert("entro a la funcion tabla");
                                    if(self.tablaCambioInfoServView.collection.length!=0){

                                        $('#tabla_head > tr').append('<th id="tipDoc" style=" text-align: center">Tip. Doc.</th>')
                                        $('#tabla_head > tr').append('<th id="numDoc" style="text-align: center">Num. Doc.</th>')
                                        $('#tabla_head > tr').append('<th id="codServ" style="text-align: center">Cod. Serv.</th>')
                                        $('#tabla_head > tr').append('<th id="nomServ" style="text-align: center">Apellidos y Nombres</th>')
                                        $('#tabla_head > tr').append('<th id="fecha" style="text-align: center">Fecha</th>')

                                        $('#tabla_head > tr').append('<th id="estServ" style="text-align: center ">Estado</th>')
                                        $('#tabla_head > tr').append('<th id="catServ" style="text-align: center ">Categoria</th>')
                                        $('#tabla_head > tr').append('<th id="depServ" style="text-align: center ">Dependencia</th>')
                                        $('#tabla_head > tr').append('<th id="regPen" style="text-align: center ">Reg. Pen.</th>')
                                        $('#tabla_head > tr').append('<th id="entAseg" style="text-align: center ">Ent. Aseg.</th>')

                                        for(var i=0;i<self.tablaCambioInfoServView.collection.length;i++){
                                            $('#tabla_serv_info_body').append('<tr colspan="8" id="'+i+ '"></tr>')
                                            $('#'+i).append('<td style="width:50px; text-align: center" >'+self.tablaCambioInfoServView.collection.at(i).get("tipoDoc") +'</td>')
                                            $('#'+i).append('<td style="text-align: center" >'+self.tablaCambioInfoServView.collection.at(i).get("numDoc") +'</td>')
                                            $('#'+i).append('<td style="text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("codSer") +'</td>')
                                            $('#'+i).append('<td style="width:222px; text-align: center"  >'+self.tablaCambioInfoServView.collection.at(i).get("apePat")+" "+self.tablaCambioInfoServView.collection.at(i).get("apeMat")+", "+self.tablaCambioInfoServView.collection.at(i).get("nombre") +'</td>')
                                            $('#'+i).append('<td style="text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("mes")+" / "+self.tablaCambioInfoServView.collection.at(i).get("anio") +'</td>')

                                            $('#'+i).append('<td style="width:75px; text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("condFech") +'</td>')
                                            $('#'+i).append('<td style="width:75px; text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("cat") +'</td>')
                                            $('#'+i).append('<td style="width:222px; text-align: center" >'+self.tablaCambioInfoServView.collection.at(i).get("dep") +'</td>')
                                            $('#'+i).append('<td style="text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("reg") +'</td>')
                                            $('#'+i).append('<td style="text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("entAseg") +'</td>')
                                        }
                                        $("#table-cambio-info-serv").dataTable();
                                        $('#table-cambio-info-serv_wrapper').append("<div id='footer-table'></div>");
                                        $('#table-cambio-info-serv_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                        $('#table-cambio-info-serv_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                        $('.dataTables_filter input').attr('placeholder', 'buscar..');


                                    } else{
                                        $('#noData').show();
                                    }
                                });
                                this.tablaInfocisReg.show(this.tablaCambioInfoServView);
                                $("#listar_cis").removeAttr("hidden");

                                setTimeout(function () {
                                    clickedElement.button('reset');
                                    $("#seleccionModal").modal("hide");
                                },2000);

                            }

                            else{  //mostrando solo las columnas seleccionadas

                                //levantando la tabla
                                // alert("antes de levantar la tabla")  ;


                                this.tablaCambioInfoServView.fetchtablaCambiosInfoDelServ(anioIni,mesIni,anioFin,mesFin,this.dni,tipito,estito,function () {
                                    // alert("entro a la funcion tabla");
                                    if(self.tablaCambioInfoServView.collection.length!=0){

                                        $('#tabla_head > tr').append('<th id="tipDoc" style=" text-align: center">Tip. Doc.</th>')
                                        $('#tabla_head > tr').append('<th id="numDoc" style="text-align: center">Num. Doc.</th>')
                                        $('#tabla_head > tr').append('<th id="codServ" style="text-align: center">Cod. Serv.</th>')
                                        $('#tabla_head > tr').append('<th id="nomServ" style="text-align: center">Apellidos y Nombres</th>')
                                        $('#tabla_head > tr').append('<th id="fecha" style="text-align: center">Fecha</th>')

                                        if(chestado!=undefined){
                                            $('#tabla_head > tr').append('<th id="estServ" style="text-align: center ">Estado</th>')
                                        }
                                        if(chcateg!=undefined){
                                            $('#tabla_head > tr').append('<th id="catServ" style="text-align: center ">Categoria</th>')
                                        }
                                        if(chdep!=undefined){
                                            $('#tabla_head > tr').append('<th id="depServ" style="text-align: center ">Dependencia</th>')
                                        }
                                        if(chreg!=undefined){
                                            $('#tabla_head > tr').append('<th id="regPen" style="text-align: center ">Reg. Pen.</th>')
                                        }
                                        if(chaseg!=undefined){
                                            $('#tabla_head > tr').append('<th id="entAseg" style="text-align: center ">Ent. Aseg.</th>')
                                        }


                                        for(var i=0;i<self.tablaCambioInfoServView.collection.length;i++){
                                            $('#tabla_serv_info_body').append('<tr colspan="8" id="'+i+ '"></tr>')
                                            $('#'+i).append('<td style="width:50px; text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("tipoDoc") +'</td>')
                                            $('#'+i).append('<td style="text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("numDoc") +'</td>')
                                            $('#'+i).append('<td style="text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("codSer") +'</td>')
                                            $('#'+i).append('<td style="width:222px; text-align: center" >'+self.tablaCambioInfoServView.collection.at(i).get("apePat")+" "+self.tablaCambioInfoServView.collection.at(i).get("apeMat")+", "+self.tablaCambioInfoServView.collection.at(i).get("nombre") +'</td>')
                                            $('#'+i).append('<td style="text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("mes")+" / "+self.tablaCambioInfoServView.collection.at(i).get("anio") +'</td>')
                                            if(chestado!=undefined){
                                                $('#'+i).append('<td style="width:75px; text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("condFech") +'</td>')
                                            }
                                            if(chcateg!=undefined) {
                                                $('#'+i).append('<td style="width:75px; text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("cat") +'</td>')
                                            }
                                            if(chdep!=undefined) {
                                                $('#'+i).append('<td style="width:222px; text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("dep") +'</td>')
                                            }
                                            if(chreg!=undefined) {
                                                $('#'+i).append('<td style="text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("reg") +'</td>')
                                            }
                                            if(chaseg!=undefined) {
                                                $('#'+i).append('<td style="text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("entAseg") +'</td>')
                                            }
                                        }


                                        $("#table-cambio-info-serv").dataTable();
                                        $('#table-cambio-info-serv_wrapper').append("<div id='footer-table'></div>");
                                        $('#table-cambio-info-serv_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                        $('#table-cambio-info-serv_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                        $('.dataTables_filter input').attr('placeholder', 'buscar..');


                                    }else{
                                        $('#noData').show();
                                    }

                                });
                                this.tablaInfocisReg.show(this.tablaCambioInfoServView);
                                $("#listar_cis").removeAttr("hidden");

                                setTimeout(function () {
                                    clickedElement.button('reset');
                                    $("#seleccionModal").modal("hide");
                                },2000);
                            }
                        }

                    }else{          //todos
                        //dependiendo de los checkbox, se llamara a las tablas, ya que se ocultaran o no algunas columnas

                        if( chtodos==undefined && chestado==undefined  && chcateg==undefined &&
                            chdep==undefined && chreg==undefined  && chaseg==undefined){
                            // alert("no se selecciono ningun checkbox...no debe salir nada");
                        }else{

                            if (chtodos!=undefined){
                                // alert("se mostraran todas las columnas");    ///aqui colocar todas las columnas-------------------ojo------------------------------

                                //var self=this;
                                //this.tablaCambioInfoServReg.show(this.tablaCambioInfoServView);
                                this.tablaCambioInfoServView.fetchtablaCambiosInfoServ(anioIni,mesIni,tipo,e1,function () {
                                    // alert("entro a la funcion tabla");
                                    if(self.tablaCambioInfoServView.collection.length!=0){



                                        $('#tabla_head > tr').append('<th id="tipDoc" style=" text-align: center">Tip. Doc.</th>')
                                        $('#tabla_head > tr').append('<th id="numDoc" style="text-align: center">Num. Doc.</th>')
                                        $('#tabla_head > tr').append('<th id="codServ" style="text-align: center">Cod. Serv.</th>')
                                        $('#tabla_head > tr').append('<th id="nomServ" style="text-align: center">Apellidos y Nombres</th>')
                                        $('#tabla_head > tr').append('<th id="fecha" style="text-align: center">Fecha</th>')

                                        $('#tabla_head > tr').append('<th id="estServ" style="text-align: center ">Estado</th>')
                                        $('#tabla_head > tr').append('<th id="catServ" style="text-align: center ">Categoria</th>')
                                        $('#tabla_head > tr').append('<th id="depServ" style="text-align: center ">Dependencia</th>')
                                        $('#tabla_head > tr').append('<th id="regPen" style="text-align: center ">Reg. Pen.</th>')
                                        $('#tabla_head > tr').append('<th id="entAseg" style="text-align: center ">Ent. Aseg.</th>')

                                        for(var i=0;i<self.tablaCambioInfoServView.collection.length;i++){
                                            $('#tabla_serv_info_body').append('<tr colspan="8" id="'+i+ '"></tr>')
                                            $('#'+i).append('<td style="width:50px; text-align: center" >'+self.tablaCambioInfoServView.collection.at(i).get("tipoDoc") +'</td>')
                                            $('#'+i).append('<td style="text-align: center" >'+self.tablaCambioInfoServView.collection.at(i).get("numDoc") +'</td>')
                                            $('#'+i).append('<td style="text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("codSer") +'</td>')
                                            $('#'+i).append('<td style="width:222px; text-align: center"  >'+self.tablaCambioInfoServView.collection.at(i).get("apePat")+" "+self.tablaCambioInfoServView.collection.at(i).get("apeMat")+", "+self.tablaCambioInfoServView.collection.at(i).get("nombre") +'</td>')
                                            $('#'+i).append('<td style="text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("mes")+" / "+self.tablaCambioInfoServView.collection.at(i).get("anio") +'</td>')

                                            $('#'+i).append('<td style="width:75px; text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("condFech") +'</td>')
                                            $('#'+i).append('<td style="width:75px; text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("cat") +'</td>')
                                            $('#'+i).append('<td style="width:222px; text-align: center" >'+self.tablaCambioInfoServView.collection.at(i).get("dep") +'</td>')
                                            $('#'+i).append('<td style="text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("reg") +'</td>')
                                            $('#'+i).append('<td style="text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("entAseg") +'</td>')
                                        }
                                        $("#table-cambio-info-serv").dataTable();
                                        $('#table-cambio-info-serv_wrapper').append("<div id='footer-table'></div>");
                                        $('#table-cambio-info-serv_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                        $('#table-cambio-info-serv_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                        $('.dataTables_filter input').attr('placeholder', 'buscar..');


                                    }else{
                                        $('#noData').show();
                                    }
                                });
                                this.tablaInfocisReg.show(this.tablaCambioInfoServView);
                                $("#listar_cis").removeAttr("hidden");

                                setTimeout(function () {
                                    clickedElement.button('reset');
                                    $("#seleccionModal").modal("hide");
                                },8000);

                            }

                            else{  //mostrando solo las columnas seleccionadas

                                //levantando la tabla
                                // alert("antes de levantar la tabla")  ;
                                var valor1=1;
                                //var self=this;
                                //this.tablaCambioInfoServReg.show(this.tablaCambioInfoServView);
                                this.tablaCambioInfoServView.fetchtablaCambiosInfoServ(anioIni,mesIni,tipo,e1,function () {
                                    // alert("entro a la funcion tabla");
                                    if(self.tablaCambioInfoServView.collection.length!=0){

                                        $('#tabla_head > tr').append('<th id="tipDoc" style=" text-align: center">Tip. Doc.</th>')
                                        $('#tabla_head > tr').append('<th id="numDoc" style="text-align: center">Num. Doc.</th>')
                                        $('#tabla_head > tr').append('<th id="codServ" style="text-align: center">Cod. Serv.</th>')
                                        $('#tabla_head > tr').append('<th id="nomServ" style="text-align: center">Apellidos y Nombres</th>')
                                        $('#tabla_head > tr').append('<th id="fecha" style="text-align: center">Fecha</th>')

                                        if(chestado!=undefined){
                                            $('#tabla_head > tr').append('<th id="estServ" style="text-align: center ">Estado</th>')
                                        }
                                        if(chcateg!=undefined){
                                            $('#tabla_head > tr').append('<th id="catServ" style="text-align: center ">Categoria</th>')
                                        }
                                        if(chdep!=undefined){
                                            $('#tabla_head > tr').append('<th id="depServ" style="text-align: center ">Dependencia</th>')
                                        }
                                        if(chreg!=undefined){
                                            $('#tabla_head > tr').append('<th id="regPen" style="text-align: center ">Reg. Pen.</th>')
                                        }
                                        if(chaseg!=undefined){
                                            $('#tabla_head > tr').append('<th id="entAseg" style="text-align: center ">Ent. Aseg.</th>')
                                        }

                                        for(var i=0;i<self.tablaCambioInfoServView.collection.length;i++){
                                            $('#tabla_serv_info_body').append('<tr colspan="8" id="'+i+ '"></tr>')
                                            $('#'+i).append('<td style="width:50px; text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("tipoDoc") +'</td>')
                                            $('#'+i).append('<td style="text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("numDoc") +'</td>')
                                            $('#'+i).append('<td style="text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("codSer") +'</td>')
                                            $('#'+i).append('<td style="width:222px; text-align: center" >'+self.tablaCambioInfoServView.collection.at(i).get("apePat")+" "+self.tablaCambioInfoServView.collection.at(i).get("apeMat")+", "+self.tablaCambioInfoServView.collection.at(i).get("nombre") +'</td>')
                                            $('#'+i).append('<td style="text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("mes")+" / "+self.tablaCambioInfoServView.collection.at(i).get("anio") +'</td>')
                                            if(chestado!=undefined){
                                                $('#'+i).append('<td style="width:75px; text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("condFech") +'</td>')
                                            }
                                            if(chcateg!=undefined) {
                                                $('#'+i).append('<td style="width:75px; text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("cat") +'</td>')
                                            }
                                            if(chdep!=undefined) {
                                                $('#'+i).append('<td style="width:222px; text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("dep") +'</td>')
                                            }
                                            if(chreg!=undefined) {
                                                $('#'+i).append('<td style="text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("reg") +'</td>')
                                            }
                                            if(chaseg!=undefined) {
                                                $('#'+i).append('<td style="text-align: center">'+self.tablaCambioInfoServView.collection.at(i).get("entAseg") +'</td>')
                                            }
                                        }


                                        $("#table-cambio-info-serv").dataTable();
                                        $('#table-cambio-info-serv_wrapper').append("<div id='footer-table'></div>");
                                        $('#table-cambio-info-serv_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                        $('#table-cambio-info-serv_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                        $('.dataTables_filter input').attr('placeholder', 'buscar..');


                                    } else{
                                        $('#noData').show();
                                    }
                                });
                                this.tablaInfocisReg.show(this.tablaCambioInfoServView);
                                $("#listar_cis").removeAttr("hidden");

                                setTimeout(function () {
                                    clickedElement.button('reset');
                                    $("#seleccionModal").modal("hide");
                                },8000);

                            }
                        }
                    }



                },
                reporte_info_servidor:function(){           //osea reporte de un solo servidor
                    $("#reporte_servidor_show_cis").show();
                    //alert("entro a reporte");
                    var usuario=$('#email').text();


                    //verificando fechas para enviar
                    if($('#ingres_ini_info').val()!="" )  {
                        this.anioIni=$('#ingres_ini_info').val().substring(6, 10);
                        this.mesIni= $('#ingres_ini_info').val().substring(3,5) ;
                    }else{
                        this.anioIni=2000;
                        this.mesIni=01;
                    }

                    if($('#ingres_fin_info').val()!="" )  {
                        this.anioFin=$('#ingres_fin_info').val().substring(6, 10);
                        this.mesFin= $('#ingres_fin_info').val().substring(3,5) ;
                    }else{
                        this.anioFin=2050;
                        this.mesFin=12;
                    }


                    // alert ("año inicial: " + this.anioIni + "mes inicial: "+this.mesIni)  ;
                    // alert ("año final: " + this.anioFin + "mes final: "+this.mesFin)  ;

                    var anioIni=this.anioIni;
                    var anioFin=this.anioFin;
                    var mesIni=this.mesIni;
                    var mesFin=this.mesFin;


                    //  alert("tipito: "+this.tipito)
                    // alert("estito: "+this.estito);


                    //verificar los checkbox clickeados
                    var chtodos =$("#chtodos:checked").val();
                    var chestado =$("#chestado:checked").val();
                    var chcateg =$("#chcateg:checked").val();
                    var chdep =$("#chdep:checked").val();
                    var chreg =$("#chreg:checked").val();
                    var chaseg =$("#chaseg:checked").val();

                    //activar todas las columnas en el reporte
                    this.ParEst=true;
                    this.ParCat=true;
                    this.ParDep=true;
                    this.ParRegPen=true;
                    this.ParEntAseg=true;

                    if (chtodos!=undefined){
                        // alert("se mostraran todas las columnas");    ///aqui colocar todas las columnas-------------------ojo------------------------------
                        //activar todas las columnas en el reporte
                        this.ParEst=true;
                        this.ParCat=true;
                        this.ParDep=true;
                        this.ParRegPen=true;
                        this.ParEntAseg=true;
                    }else{
                        if(chestado==undefined){
                            this.ParEst=false;
                        }
                        if(chcateg==undefined){
                            this.ParCat=false;
                        }
                        if(chdep==undefined){
                            this.ParDep=false;
                        }
                        if(chreg==undefined){
                            this.ParRegPen=false;
                        }
                        if(chaseg==undefined){
                            this.ParEntAseg=false;
                        }
                    }

                    //  alert("Parest: " + this.ParEst+"ParCat: "+this.ParCat)  ;

                    $("#anioIni1").val(anioIni);
                    $("#anioFin1").val(anioFin);
                    $("#mesIni1").val(mesIni);
                    $("#mesFin1").val(mesFin);
                    $("#tipito1").val(this.tipito);
                    $("#estito1").val(this.estito);
                    $("#dni1").val(this.dni);
                    $("#ParEst1").val(this.ParEst);
                    $("#ParCat1").val(this.ParCat);
                    $("#ParDep1").val(this.ParDep);
                    $("#ParRegPen1").val(this.ParRegPen);
                    $("#ParEntAseg1").val(this.ParEntAseg);
                    $("#usuario1").val(usuario);

                    //  alert("tipito: "+this.tipito+"estito: " + this.estito+"dni: "+this.dni+"usuario: "+usuario)
                },

                reporte_info_grupal:function(){      //osea reporte grupal

                    $("#reporte_grupal_show_cis").show();
                    //  alert("entro a reporte");
                    var usuario=$('#email').text();

                    //verificando fechas para enviar
                    if($('#ingres_ini_info').val()!="" )  {
                        this.anioIni=$('#ingres_ini_info').val().substring(6, 10);
                        this.mesIni= $('#ingres_ini_info').val().substring(3,5) ;
                    }else{
                        this.anioIni=2000;
                        this.mesIni=01;
                    }


                    //  alert ("año inicial: " + this.anioIni + "mes inicial: "+this.mesIni)  ;


                    var anioIni=this.anioIni;
                    var mesIni=this.mesIni;


                    this.tipoServ=$('#tiposervidorinfo').val();
                    var tipo=this.tipoServ;

                    this.e1=$('#estservidorinfo').val();

                    //  alert("e1 = "+this.e1) ;



                    //verificar los checkbox clickeados
                    var chtodos =$("#chtodos:checked").val();
                    var chestado =$("#chestado:checked").val();
                    var chcateg =$("#chcateg:checked").val();
                    var chdep =$("#chdep:checked").val();
                    var chreg =$("#chreg:checked").val();
                    var chaseg =$("#chaseg:checked").val();

                    //activar todas las columnas en el reporte
                    this.ParEst=true;
                    this.ParCat=true;
                    this.ParDep=true;
                    this.ParRegPen=true;
                    this.ParEntAseg=true;

                    if (chtodos!=undefined){
                        //  alert("se mostraran todas las columnas");    ///aqui colocar todas las columnas-------------------ojo------------------------------
                        //activar todas las columnas en el reporte
                        this.ParEst=true;
                        this.ParCat=true;
                        this.ParDep=true;
                        this.ParRegPen=true;
                        this.ParEntAseg=true;
                    }else{
                        if(chestado==undefined){
                            this.ParEst=false;
                        }
                        if(chcateg==undefined){
                            this.ParCat=false;
                        }
                        if(chdep==undefined){
                            this.ParDep=false;
                        }
                        if(chreg==undefined){
                            this.ParRegPen=false;
                        }
                        if(chaseg==undefined){
                            this.ParEntAseg=false;
                        }
                    }

                    // alert("Parest: " + this.ParEst+"ParCat: "+this.ParCat)  ;

                    $("#anioIni").val(anioIni);
                    $("#mesIni").val(mesIni);
                    $("#tipo").val(tipo);
                    $("#e1").val(this.e1);
                    $("#ParEst").val(this.ParEst);
                    $("#ParCat").val(this.ParCat);
                    $("#ParDep").val(this.ParDep);
                    $("#ParRegPen").val(this.ParRegPen);
                    $("#ParEntAseg").val(this.ParEntAseg);
                    $("#usuario").val(usuario);


                },



                show_nac_ini: function (e) {


                    var nac_ini = $('#nac_ini');

                    nac_ini.datepicker({
                        format: 'dd/mm/yyyy',
                        viewMode: 2
                    });

                    nac_ini.datepicker('show');
                    $("#errorFechNac").hide();
                    $("#errorFechNacFV").hide();
                    $("#errorFechNacIV").hide();


                },

                show_nac_fin: function () {


                    var nac_fin = $('#nac_fin');

                    nac_fin.datepicker({
                        format: 'dd/mm/yyyy',
                        viewMode: 2
                    });

                    nac_fin.datepicker('show');
                    $("#errorFechNacFV").hide();
                    $("#errorFechNac").hide();
                    $("#errorFechNacIV").hide();
                },


                show_ingres_ini: function () {


                    var ingres_ini = $('#ingres_ini');

                    ingres_ini.datepicker({
                        format: 'dd/mm/yyyy',
                        viewMode: 2
                    });

                    ingres_ini.datepicker('show');
                    $("#errorFechIng").hide();
                    $("#errorFechIngFV").hide();
                    $("#errorFechIngIV").hide();
                },

                show_ingres_fin: function () {


                    var ingres_fin = $('#ingres_fin');

                    ingres_fin.datepicker({
                        format: 'dd/mm/yyyy',
                        viewMode: 2
                    });

                    ingres_fin.datepicker('show');
                    $("#errorFechIng").hide();
                    $("#errorFechIngFV").hide();
                    $("#errorFechIngIV").hide();
                },


                show_ingres_ini_plani: function () {


                    var ingres_ini_plani = $('#ingres_ini_plani');

                    ingres_ini_plani.datepicker({
                        format: 'dd/mm/yyyy',
                        viewMode: 2
                    });

                    ingres_ini_plani.datepicker('show');

                },

                show_ingres_fin_plani: function () {


                    var ingres_fin_plani = $('#ingres_fin_plani');

                    ingres_fin_plani.datepicker({
                        format: 'dd/mm/yyyy',
                        viewMode: 2
                    });

                    ingres_fin_plani.datepicker('show');

                },



                ///////////////////////////////////////////////////////// fechas de Carlos....cambios de informacion ///////////////////////////////////////////////////
                show_ingres_ini_info: function () {


                    var ingres_ini_info = $('#ingres_ini_info');

                    ingres_ini_info.datepicker({
                        format: 'dd/mm/yyyy',
                        viewMode: 2
                    });

                    ingres_ini_info.datepicker('show');
                    $("#errorFech").hide();
                    $('#errorNoFech').hide();

                },

                show_ingres_fin_info: function () {


                    var ingres_fin_info = $('#ingres_fin_info');

                    ingres_fin_info.datepicker({
                        format: 'dd/mm/yyyy',
                        viewMode: 2
                    });

                    ingres_fin_info.datepicker('show');
                    $("#errorFech").hide();
                    $('#errorNoFech').hide();

                },
                ////////////////////////////////////////////////////////////////////////////////////////




                clos_nac_ini: function(e){
                    $("#nac_ini").val("") ;
                    $("#errorFechNac").hide();
                    $("#errorFechNacIV").hide();
                    $("#errorFechNacFV").hide();

                },
                clos_nac_fin: function(e){
                    $("#nac_fin").val("");
                    $("#errorFechNac").hide();
                    $("#errorFechNacIV").hide();
                    $("#errorFechNacFV").hide();
                },
                clos_ingres_ini: function(e){
                    $("#ingres_ini").val("");
                    $("#errorFechIng").hide();
                    $("#errorFechIngIV").hide();
                    $("#errorFechIngFV").hide();
                },
                clos_ingres_fin: function(e){
                    $("#ingres_fin").val("");
                    $("#errorFechIng").hide();
                    $("#errorFechIngIV").hide();
                    $("#errorFechIngFV").hide();
                },
                mostrarfechas:function(e){
                    var clickedElement = $(e.currentTarget);

                    if (clickedElement.is(':checked')) {
                        $("#nac_ini_show").removeAttr("disabled");
                        $("#nac_ini_clos").removeAttr("disabled");
                        $("#nac_fin_show").removeAttr("disabled");
                        $("#nac_fin_clos").removeAttr("disabled");
                        $("#errorSel").hide();
                    }
                    else{
                        $("#nac_ini_show").attr("disabled","true");
                        $("#nac_ini_clos").attr("disabled","true");
                        $("#nac_fin_show").attr("disabled","true");
                        $("#nac_fin_clos").attr("disabled","true");
                        $("#nac_ini").val("");
                        $("#nac_fin").val("");
                        $("#errorFechNacIV").hide();
                        $("#errorFechNacFV").hide();
                        $("#errorFechNac").hide();
                    }
                },

                mostrarsexo: function(e){

                    var clickedElement = $(e.currentTarget);

                    if (clickedElement.is(':checked')) {

                        $("#cboxsex").removeAttr("disabled");
                        $("#errorSel").hide();
                    }
                    else{
                        $("#cboxsex").attr("disabled","true");
                        $("#cboxsex").val("0");

                    }
                },

                mostrartipo: function(e){
                    var clickedElement = $(e.currentTarget);

                    if (clickedElement.is(':checked')) {

                        $("#tiposervidor").removeAttr("disabled");
                        $("#errorSel").hide();
                    }
                    else{
                        $("#tiposervidor").attr("disabled","true");
                        $("#tiposervidor").val("99")
                    }
                },

                mostrarestado: function(e){
                    var clickedElement = $(e.currentTarget);

                    if (clickedElement.is(':checked')) {

                        $("#estservidor").removeAttr("disabled");
                        $("#errorSel").hide();
                    }
                    else{
                        $("#estservidor").attr("disabled","true");
                        $("#estservidor").val("99")
                    }
                },

                mostrarcategoria: function(e){
                    var clickedElement = $(e.currentTarget);

                    if (clickedElement.is(':checked')) {

                        $("#catservidor").removeAttr("disabled");
                        $("#errorSel").hide();
                    }
                    else{
                        $("#catservidor").attr("disabled","true");
                        $("#catservidor").val("99")
                    }
                },

                mostrarregimen: function(e){
                    var clickedElement = $(e.currentTarget);

                    if (clickedElement.is(':checked')) {

                        $("#regpenservidor").removeAttr("disabled");
                        $("#errorSel").hide();
                    }
                    else{
                        $("#regpenservidor").attr("disabled","true");
                        $("#regpenservidor").val("99")
                    }
                },

                mostrarpago: function(e){
                    var clickedElement = $(e.currentTarget);

                    if (clickedElement.is(':checked')) {

                        $("#tipagoservidor").removeAttr("disabled");
                        $("#errorSel").hide();
                    }
                    else{
                        $("#tipagoservidor").attr("disabled","true");
                        $("#tipagoservidor").val("99")
                    }
                },

                mostrardep: function(e){
                    var clickedElement = $(e.currentTarget);

                    if (clickedElement.is(':checked')) {

                        $("#depservidor").removeAttr("disabled");
                        $("#errorSel").hide();
                    }
                    else{
                        $("#depservidor").attr("disabled","true");
                        $("#depservidor").val("99")
                    }
                },
                mostrarfecing:function(e){
                    var clickedElement = $(e.currentTarget);

                    if (clickedElement.is(':checked')) {
                        $("#ingres_ini_show").removeAttr("disabled");
                        $("#ingres_ini_clos").removeAttr("disabled");
                        $("#ingres_fin_show").removeAttr("disabled");
                        $("#ingres_fin_clos").removeAttr("disabled");
                        $("#errorSel").hide();
                    }
                    else{
                        $("#ingres_ini_show").attr("disabled","true");
                        $("#ingres_ini_clos").attr("disabled","true");
                        $("#ingres_fin_show").attr("disabled","true");
                        $("#ingres_fin_clos").attr("disabled","true");
                        $("#ingres_ini").val("");
                        $("#ingres_fin").val("");
                        $("#errorFechIngIV").hide();
                        $("#errorFechIngFV").hide();
                        $("#errorFechIng").hide();
                    }
                },
                //--------------------------------------------parte de Fernado --------------------------------------------------------------------

                mostrartabla:function(e){

                    var clickedElement=$(e.currentTarget);


                    var self=this;
                    var fec=$("#chedad:checked").val();
                    var se =$("#chsex:checked").val();
                    var ts=$("#chtipo:checked").val();
                    var est=$("#chest:checked").val();
                    var ca=$("#chcat:checked").val();
                    var rp=$("#chreg:checked").val();
                    var tpa=$("#chtpago:checked").val();
                    var dep=$("#chdep:checked").val();
                    var fecin=$("#chfing:checked").val();

                    var ni=$("#nac_ini").val();
                    var nf=$("#nac_fin").val();
                    var s=$("#cboxsex").val();
                    var t=$("#tiposervidor").val();
                    var e=$("#estservidor").val();
                    var c=$("#catservidor").val();
                    var r=$("#regpenservidor").val();
                    var tp=$("#tipagoservidor").val();
                    var d=$("#depservidor").val();
                    var ini=$("#ingres_ini").val();
                    var inf=$("#ingres_fin").val();

                    var a1=0;
                    var b1=0;
                    var dia1="01";
                    var mes1="01";
                    var anio1="1900";
                    var dia2="31";
                    var mes2="12";
                    var anio2="2020";
                    var dia3="01";
                    var mes3="01";
                    var anio3="1900";
                    var dia4="31";
                    var mes4="12";
                    var anio4="2020";
                    var tip="";
                    var estados="";
                    var regimenpen="";
                    var dependen="";
                    var categ="";
                    var tipago="";
                    var al="";
                    var al1="";
                    var al2="";
                    var al3="";
                    if(fec!=undefined || fecin!=undefined){

                        if($('#nac_ini').val()!="" && $('#nac_fin').val()!=""){
                            var NiniMes= $('#nac_ini').val().substring(3,5) ;
                            var NiniDia = $('#nac_ini').val().substring(0, 2);
                            var NiniAno = $('#nac_ini').val().substring(6, 10);
                            var NfinMes = $('#nac_fin').val().substring(3, 5);
                            var NfinDia = $('#nac_fin').val().substring(0, 2);
                            var NfinAno = $('#nac_fin').val().substring(6, 10);

                            if(NiniAno<NfinAno){

                                a1=1;

                            } else{
                                if(NiniAno==NfinAno) {
                                    if(NfinMes>NiniMes){

                                        a1=1;


                                    } else{
                                        if(NfinMes==NiniMes){
                                            if(NfinDia>NiniDia){

                                                a1=1;

                                            }else  {
                                                if(NfinDia==NiniDia){

                                                    a1=1;
                                                }else{

                                                    $("#errorFechNac").show();
                                                }
                                            }
                                        } else{

                                            $("#errorFechNac").show();
                                        }}
                                }else{

                                    $("#errorFechNac").show();
                                }
                            }
                        }else{
                            if($('#nac_ini').val()!="" && $('#nac_fin').val()==""){

                                $("#errorFechNacFV").show();

                            }else{
                                if ($('#nac_ini').val()=="" && $('#nac_fin').val()!=""){

                                    $("#errorFechNacIV").show();
                                }}}


                        ////////////// fecha Ingreso
                        if($('#ingres_ini').val()!="" && $('#ingres_fin').val()!=""){
                            var IiniMes= $('#ingres_ini').val().substring(3,5) ;
                            var IiniDia = $('#ingres_ini').val().substring(0, 2);
                            var IiniAno = $('#ingres_ini').val().substring(6, 10);
                            var IfinMes = $('#ingres_fin').val().substring(3, 5);
                            var IfinDia = $('#ingres_fin').val().substring(0, 2);
                            var IfinAno = $('#ingres_fin').val().substring(6, 10);
                            //  alert(IiniMes);
                            if(IiniAno<IfinAno){

                                b1=1;

                            } else{
                                if(IiniAno==IfinAno) {
                                    if(IfinMes>IiniMes){

                                        b1=1;


                                    }  else{
                                        if(IfinMes==IiniMes){
                                            if(IfinDia>IiniDia){

                                                b1=1;

                                            }else  {
                                                if(IfinDia==IiniDia){
                                                    b1=1;
                                                }else{
                                                    //   alert("ini mayor que fin")
                                                    $("#errorFechIng").show();
                                                }
                                            }
                                        } else{
                                            //    alert("inicio mayor que fin")
                                            $("#errorFechIng").show();
                                        }}
                                }else{
                                    //    alert("inicio es mayor")
                                    $("#errorFechIng").show();
                                }
                            }
                        } else{
                            if($('#ingres_ini').val()!="" && $('#ingres_fin').val()==""){
                                //   alert("debe ingresar la fecha  de fin");
                                $("#errorFechIngIV").show();

                            } else{
                                if ($('#ingres_ini').val()=="" && $('#ingres_fin').val()!=""){
                                    //    alert("debe ingresar la fecha de inicio ");
                                    $("#errorFechIngFV").show();
                                }} }

                        if(fec!=undefined && fecin!=undefined){
                            if(a1==1 && b1==1){

                                self.tablainfoReg.show(self.InformacionServView);
                            }
                        }else{
                            if(fec!=undefined && fecin==undefined){
                                if(a1==1 && b1==0){

                                    self.tablainfoReg.show(self.InformacionServView);
                                }
                            }else{
                                if(fec==undefined && fecin!=undefined){
                                    if(a1==0 && b1==1){

                                        self.tablainfoReg.show(self.InformacionServView);
                                    }
                                }
                            }
                        }





                    }
                    // self.tablainfoReg.show(self.InformacionServView);

                    ///fechas de nacimiento para mandar los parametros
                    if($('#nac_ini').val()!=""){
                        var NiniMes1= $('#nac_ini').val().substring(3,5) ;
                        var NiniDia1 = $('#nac_ini').val().substring(0, 2);
                        var NiniAno1 = $('#nac_ini').val().substring(6, 10);

                    }
                    if( $('#nac_fin').val()!=""){
                        var NfinMes1 = $('#nac_fin').val().substring(3, 5);
                        var NfinDia1 = $('#nac_fin').val().substring(0, 2);
                        var NfinAno1 = $('#nac_fin').val().substring(6, 10);
                    }
                    ///fechas de ingreso para mandar los parametros
                    if($('#ingres_ini').val()!="" ){
                        var IiniMes1= $('#ingres_ini').val().substring(3,5) ;
                        var IiniDia1 = $('#ingres_ini').val().substring(0, 2);
                        var IiniAno1 = $('#ingres_ini').val().substring(6, 10);

                    }
                    if($('#ingres_fin').val()!=""){
                        var IfinMes1 = $('#ingres_fin').val().substring(3, 5);
                        var IfinDia1 = $('#ingres_fin').val().substring(0, 2);
                        var IfinAno1 = $('#ingres_fin').val().substring(6, 10);
                    }
                    if(fec!=undefined || se!=undefined || ts!=undefined || est!=undefined || ca!=undefined || rp!=undefined || tpa!=undefined || dep!=undefined || fecin!=undefined){
                        clickedElement.button('loading');

                        if(s=="T") {
                            var sex="M";
                            var sex1="F";

                        }else{
                            var sex=s;
                            var sex1=s;
                        }

                        ///fecha de nacimiento
                        if (fec!=undefined){
                            if(ni!=""){
                                dia1=NiniDia1;
                                mes1=NiniMes1;
                                anio1=NiniAno1;

                            }
                            if(nf!=""){
                                dia2=NfinDia1;
                                mes2=NfinMes1;
                                anio2=NfinAno1;

                            }

                        }
                        //tipo de servidor
                        if(t=="99"){
                            tip="-";

                        }else{
                            tip=t;

                        }
                        ///estado de servidor
                        if(e=="99"){
                            estados="-";
                        }else{
                            estados=e;

                        }

                        ///categoria
                        if(c=="99"){
                            categ="--";
                        }else{
                            categ=c;
                        }

                        //regimen pensionario
                        if(r=="99"){
                            regimenpen="-";
                        }else{
                            regimenpen=r;
                        }

                        //dependencia
                        if(d=="99"){
                            dependen="-";
                        }else{
                            dependen=d;

                        }

                        //tipo de pago
                        if(tp=="99"){
                            tipago="-";
                        }else{
                            tipago=tp;
                        }

                        ///fecha de ingreso

                        if (fecin!=undefined){
                            if(ini!=""){

                                dia3=IiniDia1;
                                mes3=IiniMes1;
                                anio3=IiniAno1;

                            }
                            if(inf!=""){
                                dia4=IfinDia1;
                                mes4=IfinMes1;
                                anio4=IfinAno1;

                            }

                        }







                        this.InformacionServView.getInformacionServ(sex,sex1,dia1,mes1,anio1,dia2,mes2,anio2,dia3,mes3,anio3,dia4,mes4,anio4,tip,estados,regimenpen,tipago,categ,dependen,function(){
                            setTimeout(function () {
                                clickedElement.button('reset');
                                if(self.InformacionServView.collection.length!=0){
                                    $('#tabla_ser_head > tr').append('<th id ="tdoc" style="text-align: center" >Tipo de Doc.</th>')
                                    $('#tabla_ser_head > tr').append('<th id ="ndoc" style="text-align: center" >N°Doc. Identidad</th>')
                                    $('#tabla_ser_head > tr').append('<th id ="cser" style="text-align: center" >Cod. Servidor</th>')
                                    $('#tabla_ser_head > tr').append('<th id ="apn" style="text-align: center" >Apellidos y Nombres</th>')
                                    $('#tabla_ser_head > tr').append('<th id="ttipos" style="text-align: center" >Tipo de Servidor</th>')
                                    $('#tabla_ser_head > tr').append('<th id="testado" style="text-align: center" >Estado</th>')

                                    if(fec!=undefined){
                                        $('#tabla_ser_head > tr').append('<th id="tedad" style="text-align: center" >Edad</th>')
                                    }

                                    if(se!=undefined){
                                        $('#tabla_ser_head > tr').append('<th id="tsexo" style="text-align: center" >Sexo</th>')
                                    }

                                    //categoria
                                    if(ca!=undefined){
                                        $('#tabla_ser_head > tr').append('<th id="tcategoria" style="text-align: center" >Categoria</th>')
                                    }

                                    //reg pensionario
                                    if(rp!=undefined){
                                        $('#tabla_ser_head > tr').append('<th id="tregpen" style="text-align: center" >Régimen Pensionario</th>')
                                    }

                                    //tipo de pago
                                    if(tpa!=undefined){
                                        $('#tabla_ser_head > tr').append('<th id="ttipoo" style="text-align: center" >Tipo de Pago</th>')
                                    }

                                    //dep
                                    if(dep!=undefined){
                                        $('#tabla_ser_head > tr').append('<th id="tdep" style="text-align: center" >Dependencia</th>')
                                    }

                                    if(fecin!=undefined){
                                        $('#tabla_ser_head > tr').append('<th id="tfeching" style="text-align: center" >Fecha Ingreso</th>')
                                    }


                                    for(var i=0;i<self.InformacionServView.collection.length;i++){
                                        $('#tabla_inform_ser_body').append('<tr colspan="6" id="'+i+ '"></tr>')
                                        $('#'+i).append('<td >'+self.InformacionServView.collection.at(i).get("tip_doc") +'</td>')
                                        $('#'+i).append('<td >'+self.InformacionServView.collection.at(i).get("nu_doc") +'</td>')
                                        $('#'+i).append('<td >'+self.InformacionServView.collection.at(i).get("co_serv") +'</td>')
                                        $('#'+i).append('<td >'+self.InformacionServView.collection.at(i).get("ap_pat")+" " +self.InformacionServView.collection.at(i).get("ap_mat")+","+self.InformacionServView.collection.at(i).get("nom")+'</td>')
                                        $('#'+i).append('<td >'+self.InformacionServView.collection.at(i).get("ti_ser") +'</td>')
                                        $('#'+i).append('<td >'+self.InformacionServView.collection.at(i).get("estad") +'</td>')
                                        //selecciono fecha de nacimiento
                                        if(fec!=undefined){
                                            $('#'+i).append('<td >'+self.InformacionServView.collection.at(i).get("eda") +'</td>')
                                        }

                                        //selecciono sexo
                                        if(se!=undefined){
                                            $('#'+i).append('<td >'+self.InformacionServView.collection.at(i).get("sex") +'</td>')
                                        }

                                        //categoria
                                        if(ca!=undefined){
                                            $('#'+i).append('<td >'+self.InformacionServView.collection.at(i).get("cate") +'</td>')
                                        }

                                        //reg pensionario
                                        if(rp!=undefined){
                                            $('#'+i).append('<td >'+self.InformacionServView.collection.at(i).get("reg_pe") +'</td>')
                                        }

                                        //tipo de pago
                                        if(tpa!=undefined){
                                            $('#'+i).append('<td >'+self.InformacionServView.collection.at(i).get("ti_pag") +'</td>')
                                        }

                                        //dep
                                        if(dep!=undefined){
                                            $('#'+i).append('<td >'+self.InformacionServView.collection.at(i).get("dep_serv") +'</td>')
                                        }

                                        //fecha en unmsm
                                        if(fecin!=undefined){
                                            $('#'+i).append('<td >'+self.InformacionServView.collection.at(i).get("ingre_unmsm") +'</td>')
                                        }
                                    }


                                    $("#tabla-informacion-serv").dataTable();
                                    $('#tabla-informacion-serv_wrapper').append("<div id='footer-table'></div>");
                                    $('#tabla-informacion-serv_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                    $('#tabla-informacion-serv_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                                    $('.dataTables_filter input').attr('placeholder', 'buscar..');


                                }else{
                                    $("#nodata").show();
                                }



                            },2000);




                        })
                        this.tablainfoReg.show(this.InformacionServView);
                        $("#tablainfoser").show();


                        /*



                         if(tpa!=undefined){

                         }
                         if(dep!=undefined){

                         } */


                    }else{
                        $("#errorSel").show();

                    }
                },

                limpiarias:function(){
                    $("#tablainfoser").hide();
                    $(".iasc").prop('checked',false);      ///desactiva

                    //limpiar fechas de nacimiento
                    $("#nac_ini_show").attr("disabled","true");
                    $("#nac_ini_clos").attr("disabled","true");
                    $("#nac_fin_show").attr("disabled","true");
                    $("#nac_fin_clos").attr("disabled","true");
                    $("#nac_ini").val("");
                    $("#nac_fin").val("");
                    $("#errorFechNacIV").hide();
                    $("#errorFechNacFV").hide();
                    $("#errorFechNac").hide();

                    //limpiar combo sexo
                    $("#cboxsex").attr("disabled","true");
                    $("#cboxsex").val("0");

                    //limpiar combo tipo de servidor
                    $("#tiposervidor").attr("disabled","true");
                    $("#tiposervidor").val("99")

                    //limpiar combo estado
                    $("#estservidor").attr("disabled","true");
                    $("#estservidor").val("99")

                    //limpiar combo categoria
                    $("#catservidor").val("99");
                    $("#catservidor").attr("disabled","true");

                    //limpiar combo regimen
                    $("#regpenservidor").attr("disabled","true");
                    $("#regpenservidor").val("99")

                    //limpiar combo tipo pago
                    $("#tipagoservidor").attr("disabled","true");
                    $("#tipagoservidor").val("99")

                    //limpiar combo dependencia
                    $("#depservidor").attr("disabled","true");
                    $("#depservidor").val("99")

                    //limpiar fechas de ingreso
                    $("#ingres_ini_show").attr("disabled","true");
                    $("#ingres_ini_clos").attr("disabled","true");
                    $("#ingres_fin_show").attr("disabled","true");
                    $("#ingres_fin_clos").attr("disabled","true");
                    $("#ingres_ini").val("");
                    $("#ingres_fin").val("");
                    $("#errorFechIngIV").hide();
                    $("#errorFechIngFV").hide();
                    $("#errorFechIng").hide();

                    //limpiar el mensaje de no data
                    $("#nodata1").hide();

                },


                reporte_ias:function(){
                    $("#reporte_show_ias").show();

                    var self=this;
                    var fec=$("#chedad:checked").val();
                    var se =$("#chsex:checked").val();
                    var ts=$("#chtipo:checked").val();
                    var est=$("#chest:checked").val();
                    var ca=$("#chcat:checked").val();
                    var rp=$("#chreg:checked").val();
                    var tpa=$("#chtpago:checked").val();
                    var dep=$("#chdep:checked").val();
                    var fecin=$("#chfing:checked").val();

                    var ni=$("#nac_ini").val();
                    var nf=$("#nac_fin").val();
                    var s=$("#cboxsex").val();
                    var t=$("#tiposervidor").val();
                    var e=$("#estservidor").val();
                    var c=$("#catservidor").val();
                    var r=$("#regpenservidor").val();
                    var tp=$("#tipagoservidor").val();
                    var d=$("#depservidor").val();
                    var ini=$("#ingres_ini").val();
                    var inf=$("#ingres_fin").val();

                    //variables para filtros
                    var fedad=true;
                    var fsexo=true;
                    var fcategoria=true;
                    var fregimen=true;
                    var ftipopago=true;
                    var fdependencia=true;
                    var funmsm=true;

                    var dia1="01";
                    var mes1="01";
                    var anio1="1900";
                    var dia2="31";
                    var mes2="12";
                    var anio2="2020";
                    var dia3="01";
                    var mes3="01";
                    var anio3="1900";
                    var dia4="31";
                    var mes4="12";
                    var anio4="2020";
                    var sexo1ias="";
                    var sexo2ias="";
                    var tipoias="";
                    var estaias="";
                    var regias="";
                    var depias="";
                    var catias="";
                    var pagias="";
                    var usuarias=$('#email').text();






                    ///fechas de nacimiento para mandar los parametros
                    if($('#nac_ini').val()!=""){
                        var NiniMes1= $('#nac_ini').val().substring(3,5) ;
                        var NiniDia1 = $('#nac_ini').val().substring(0, 2);
                        var NiniAno1 = $('#nac_ini').val().substring(6, 10);

                    }
                    if( $('#nac_fin').val()!=""){
                        var NfinMes1 = $('#nac_fin').val().substring(3, 5);
                        var NfinDia1 = $('#nac_fin').val().substring(0, 2);
                        var NfinAno1 = $('#nac_fin').val().substring(6, 10);
                    }
                    ///fechas de ingreso para mandar los parametros
                    if($('#ingres_ini').val()!="" ){
                        var IiniMes1= $('#ingres_ini').val().substring(3,5) ;
                        var IiniDia1 = $('#ingres_ini').val().substring(0, 2);
                        var IiniAno1 = $('#ingres_ini').val().substring(6, 10);

                    }
                    if($('#ingres_fin').val()!=""){
                        var IfinMes1 = $('#ingres_fin').val().substring(3, 5);
                        var IfinDia1 = $('#ingres_fin').val().substring(0, 2);
                        var IfinAno1 = $('#ingres_fin').val().substring(6, 10);
                    }


                    ////cambio a mostrar las columnas
                    if(fec!=undefined){
                        fedad=true;
                    }else{
                        fedad=false;
                    }

                    //selecciono sexo
                    if(se!=undefined){
                        fsexo=true;
                    }else{
                        fsexo=false;
                    }

                    //categoria
                    if(ca!=undefined){
                        fcategoria=true;
                    }else{
                        fcategoria=false;
                    }

                    //reg pensionario
                    if(rp!=undefined){
                        fregimen=true;
                    }else{
                        fregimen=false;
                    }

                    //tipo de pago
                    if(tpa!=undefined){
                        ftipopago=true;
                    }else{
                        ftipopago=false;
                    }

                    //dep
                    if(dep!=undefined){
                        fdependencia=true;
                    }else{
                        fdependencia=false;
                    }

                    //fecha en unmsm
                    if(fecin!=undefined){
                        funmsm=true;
                    }else{
                        funmsm=false;
                    }




                    ///fecha de nacimiento
                    if (fec!=undefined){
                        if(ni!=""){
                            dia1=NiniDia1;
                            mes1=NiniMes1;
                            anio1=NiniAno1;

                        }
                        if(nf!=""){
                            dia2=NfinDia1;
                            mes2=NfinMes1;
                            anio2=NfinAno1;

                        }

                    }

                    if(s=="T") {
                        sexo1ias="M";
                        sexo2ias="F";

                    }else{
                        sexo1ias=s;
                        sexo2ias=s;

                    }

                    //tipo de servidor
                    if(t=="99"){
                        tipoias="-";

                    }else{
                        tipoias=t;

                    }
                    ///estado de servidor
                    if(e=="99"){
                        estaias="-";
                    }else{
                        estaias=e;
                    }

                    ///categoria
                    if(c=="99"){
                        catias="--";
                    }else{
                        catias=c;
                    }

                    //regimen pensionario
                    if(r=="99"){
                        regias="-";
                    }else{
                        regias=r;
                    }

                    //dependencia
                    if(d=="99"){
                        depias="-";
                    }else{
                        depias=d;

                    }

                    //tipo de pago
                    if(tp=="99"){
                        pagias="-";
                    }else{
                        pagias=tp;
                    }

                    ///fecha de ingreso

                    if (fecin!=undefined){
                        if(ini!=""){

                            dia3=IiniDia1;
                            mes3=IiniMes1;
                            anio3=IiniAno1;

                        }
                        if(inf!=""){
                            dia4=IfinDia1;
                            mes4=IfinMes1;
                            anio4=IfinAno1;

                        }

                    }


                    $("#dia1").val(dia1);
                    $("#mes1").val(mes1);
                    $("#anio1").val(anio1);
                    $("#dia2").val(dia2);
                    $("#mes2").val(mes2);
                    $("#anio2").val(anio2);
                    $("#sexo1ias").val(sexo1ias);
                    $("#sexo2ias").val(sexo2ias);
                    $("#tipoias").val(tipoias);
                    $("#estaias").val(estaias);
                    $("#catias").val(catias);
                    $("#regias").val(regias);
                    $("#depias").val(depias);
                    $("#pagias").val(pagias);
                    $("#dia3").val(dia3);
                    $("#mes3").val(mes3);
                    $("#anio3").val(anio3);
                    $("#dia4").val(dia4);
                    $("#mes4").val(mes4);
                    $("#anio4").val(anio4);
                    $("#usuarias").val(usuarias);
                    $("#fedad").val(fedad);
                    $("#fsexo").val(fsexo);
                    $("#fcategoria").val(fcategoria);
                    $("#fregimen").val(fregimen);
                    $("#ftipopago").val(ftipopago);
                    $("#fdependencia").val(fdependencia);
                    $("#funmsm").val(funmsm);






                },


                //-------------------------------------------------------------------parte de jean--------------------------------------------------------------------------
                condEnPlanilla: function(){
                    //1 es alta      2 es baja

                    if ($("input[name='myradio']:checked").val() == "1") {

                        // alert("selecciono alta: el id es"+$("#cond_pla_alta").val())
                        //$("#altaCondPla").show();
                        // var valor1= 1;

                        //this.altaCondPlaView.getAltaCondPla(valor1, function(){
                        // $("#altaCondPla").show();
                        // });
                        //this.altaCondPlaReg.show(this.altaCondPlaView);


                    }
                    if($("input[name='myradio']:checked").val() == "2"){
                        //alert("selecciono baja "+$("#cond_pla_baja").val())
                        // $("#altaCondPla").show();
                        //var valor1=2;

                        // this.altaCondPlaView.getAltaCondPla(valor1, function(){
                        //  $("#altaCondPla").show();
                        //this.altaCondPlaReg.show(this.altaCondPlaView);
                        //  });
                    }
                }   ,


                modal_altabaja1 : function(){

                    var estCCP= $("#estServ").text();
                    var tipCCP= $("#tipTrabCCP").text();
                    var dniCCP=$("#dniServ").text();

                    if($('#ingres_ini_plani').val()=="" && estCCP=="" && tipCCP=="" && dniCCP==""){
                        $("#faltaFechaIni").show();
                    }
                    else {

                        $("#faltaFechaIni").hide();


                        if ($('#ingres_ini_plani').val() != "" && $('#ingres_fin_plani').val() != "") {
                            //   alert("entro a fechas diferentes de null");
                            var iniMes = $('#ingres_ini_plani').val().substring(3, 5);
                            var iniDia = $('#ingres_ini_plani').val().substring(0, 2);
                            var iniAno = $('#ingres_ini_plani').val().substring(6, 10);
                            var finMes = $('#ingres_fin_plani').val().substring(3, 5);
                            var finDia = $('#ingres_fin_plani').val().substring(0, 2);
                            var finAno = $('#ingres_fin_plani').val().substring(6, 10);
                            //  alert(iniMes);
                            if (iniAno < finAno) {
                                //     alert("fechas correctas");

                                //Validando el tipo y estado del servidor

                                if (this.band1 == true) {//es decir se selecciono a un servidor en especial...solo hace falta el codigo del servidor para el filtrado
                                    //   alert("band1 es true")
                                    this.altabajaReg.show(this.altabajaView);
                                    $('#modal-altabaja').modal("show");
                                } else {//se listaran a todos los servidores y se debe tomar el tipo y el estado de los combos para el filtrado
                                    tipoServ = $('#tiposervidorpla').val();
                                    estServ = $('#estadoservidorplani').val();
                                    if (tipoServ == 99 && estServ == 99) {
                                        $('#modal-altabaja').modal("show");
                                        $("#tipoServidor_ccp_vacio").hide();
                                        $("#tipoEstado_ccp_vacio").hide();
                                        $("#tipoSer_Est_cpp_vacios").show();
                                    } else if (tipoServ == 99) {
                                        //   alert("tipo: "+tipoServ + "estado: "+estServ);
                                        $('#modal-altabaja').modal("show");
                                        $("#tipoServidor_ccp_vacio").show();
                                        $("#tipoEstado_ccp_vacio").hide();
                                        $("#tipoSer_Est_cpp_vacios").hide();
                                    } else if (estServ == 99) {
                                        $('#modal-altabaja').modal("show");
                                        $("#tipoServidor_ccp_vacio").hide();
                                        $("#tipoEstado_ccp_vacio").show();
                                        $("#tipoSer_Est_cpp_vacios").hide();
                                    } else {
                                        this.altabajaReg.show(this.altabajaView);
                                        $('#modal-altabaja').modal("show");
                                    }
                                }
                            } else {
                                if (iniAno == finAno) {
                                    if (finMes > iniMes) {
                                        //    alert("año igual y mes del fin mayor...ok")

                                        //Validando el tipo y estado del servidor

                                        if (this.band1 == true) {//es decir se selecciono a un servidor en especial...solo hace falta el codigo del servidor para el filtrado
                                            //    alert("band1 es true")
                                            this.altabajaReg.show(this.altabajaView);
                                            $('#modal-altabaja').modal("show");
                                        } else {//se listaran a todos los servidores y se debe tomar el tipo y el estado de los combos para el filtrado

                                            tipoServ = $('#tiposervidorpla').val();
                                            estServ = $('#estadoservidorplani').val();
                                            if (tipoServ == 99 && estServ == 99) {
                                                $('#modal-altabaja').modal("show");
                                                $("#tipoServidor_ccp_vacio").hide();
                                                $("#tipoEstado_ccp_vacio").hide();
                                                $("#tipoSer_Est_cpp_vacios").show();
                                            } else if (tipoServ == 99) {
                                                //   alert("tipo: "+tipoServ + "estado: "+estServ);
                                                $('#modal-altabaja').modal("show");
                                                $("#tipoServidor_ccp_vacio").show();
                                                $("#tipoEstado_ccp_vacio").hide();
                                                $("#tipoSer_Est_cpp_vacios").hide();
                                            } else if (estServ == 99) {
                                                $('#modal-altabaja').modal("show");
                                                $("#tipoServidor_ccp_vacio").hide();
                                                $("#tipoEstado_ccp_vacio").show();
                                                $("#tipoSer_Est_cpp_vacios").hide();
                                            } else {
                                                this.altabajaReg.show(this.altabajaView);
                                                $('#modal-altabaja').modal("show");
                                            }
                                        }

                                    }
                                    if (finMes == iniMes) {
                                        if (finDia > iniDia) {
                                            //  alert("año igual, mes igual....y dia del fin mayor...ok")

                                            //Validando el tipo y estado del servidor

                                            if (this.band1 == true) {//es decir se selecciono a un servidor en especial...solo hace falta el codigo del servidor para el filtrado
                                                //    alert("band1 es true")
                                                this.altabajaReg.show(this.altabajaView);
                                                $('#modal-altabaja').modal("show");
                                            } else {//se listaran a todos los servidores y se debe tomar el tipo y el estado de los combos para el filtrado
                                                tipoServ = $('#tiposervidorpla').val();
                                                estServ = $('#estadoservidorplani').val();
                                                if (tipoServ == 99 && estServ == 99) {
                                                    $('#modal-altabaja').modal("show");
                                                    $("#tipoServidor_ccp_vacio").hide();
                                                    $("#tipoEstado_ccp_vacio").hide();
                                                    $("#tipoSer_Est_cpp_vacios").show();
                                                } else if (tipoServ == 99) {
                                                    //   alert("tipo: "+tipoServ + "estado: "+estServ);
                                                    $('#modal-altabaja').modal("show");
                                                    $("#tipoServidor_ccp_vacio").show();
                                                    $("#tipoEstado_ccp_vacio").hide();
                                                    $("#tipoSer_Est_cpp_vacios").hide();
                                                } else if (estServ == 99) {
                                                    $('#modal-altabaja').modal("show");
                                                    $("#tipoServidor_ccp_vacio").hide();
                                                    $("#tipoEstado_ccp_vacio").show();
                                                    $("#tipoSer_Est_cpp_vacios").hide();
                                                } else {
                                                    this.altabajaReg.show(this.altabajaView);
                                                    $('#modal-altabaja').modal("show");
                                                }
                                            }
                                        } else {
                                            if (finDia == iniDia) {
                                                //  alert("ini y fin son identicos....no seguir")
                                                $("#errorFech").show();   //poner el mensaje en el modal de alta y baja
                                            } else {
                                                //   alert("ini mayor que fin") //el dia de inicio es mayor que el fin
                                                $("#errorFech").show();   //poner el mensaje en el modal de alta y baja
                                            }
                                        }
                                    } else {
                                        //  alert("inicio mayor que fin")//el mes de inicio es mayor que el fin
                                        $("#errorFech").show();   //poner el mensaje en el modal de alta y baja
                                    }
                                } else {
                                    //  alert("inicio es mayor")  //el año de inicio es mayor
                                    $("#errorFech").show();   //poner el mensaje en el modal de alta y baja
                                }
                            }
                        }
                        if ($('#ingres_ini_plani').val() != "" && $('#ingres_fin_plani').val() == "") {

                            //  alert("No selecciono fecha de fin, se tomara hasta la fecha actual");//poner el mensaje en el modal alta y baja
                            $('#modal-altabaja').modal("show");
                            if(tipCCP!="" && estCCP!="" && dniCCP!=""){
                                $("#fecha_fin_cpp_vacio").show();
                            }


                        }
                        if ($('#ingres_ini_plani').val() == "" && $('#ingres_fin_plani').val() != "") {
                            //   alert("No selecciono fecha de inicio, se tomara desde la fecha inicial ");  //poner el mensaje en el modal alta y baja
                            $('#modal-altabaja').modal("show");
                            $("#fecha_inicio_cpp_vacio").show();
                        }
                        if ($('#ingres_ini_plani').val() == "" && $('#ingres_fin_plani').val() == "") {
                            // alert("entro a fechas nulas, se tomaran todas las fechas");  //poner el mensaje en el modal alta y baja
                            //  alert("band1 entra en: "+this.band1);
                            $('#modal-altabaja').modal("show");
                            $("#fecha_ini_fin_cpp_vacios").show();
                            //   alert("despues del mensaje");


                            //Validando el tipo y estado del servidor

                            if (this.band1 == true) {//es decir se selecciono a un servidor en especial...solo hace falta el codigo del servidor para el filtrado
                                //   alert("band1 es true")
                                this.altabajaReg.show(this.altabajaView);
                                $('#modal-altabaja').modal("show");
                            } else {//se listaran a todos los servidores y se debe tomar el tipo y el estado de los combos para el filtrado
                                tipoServ = $('#tiposervidorpla').val();
                                estServ = $('#estadoservidorplani').val();
                                if (tipoServ == 99 && estServ == 99) {
                                    $('#modal-altabaja').modal("show");
                                    $("#tipoServidor_ccp_vacio").hide();
                                    $("#tipoEstado_ccp_vacio").hide();
                                    $("#tipoSer_Est_cpp_vacios").show();
                                } else if (tipoServ == 99) {
                                    //   alert("tipo: "+tipoServ + "estado: "+estServ);
                                    $('#modal-altabaja').modal("show");
                                    $("#tipoServidor_ccp_vacio").show();
                                    $("#tipoEstado_ccp_vacio").hide();
                                    $("#tipoSer_Est_cpp_vacios").hide();
                                } else if (estServ == 99) {
                                    $('#modal-altabaja').modal("show");
                                    $("#tipoServidor_ccp_vacio").hide();
                                    $("#tipoEstado_ccp_vacio").show();
                                    $("#tipoSer_Est_cpp_vacios").hide();
                                } else {
                                    this.altabajaReg.show(this.altabajaView);
                                    $('#modal-altabaja').modal("show");
                                }
                            }
                        }

                    }
                },


                modal_altabaja2:function(){

                    var estCCP= $("#estServ").text();
                    var tipCCP= $("#tipTrabCCP").text();
                    var dniCCP=$("#dniServ").text();

                    if($('#ingres_ini_plani').val()=="" && estCCP=="" && tipCCP=="" && dniCCP==""){
                        $("#faltaFechaIni").show();
                    }
                    else {

                        $("#faltaFechaIni").hide();


                        if ($('#ingres_ini_plani').val() != "" && $('#ingres_fin_plani').val() != "") {
                            //  alert("entro a fechas diferentes de null");
                            var iniMes = $('#ingres_ini_plani').val().substring(3, 5);
                            var iniDia = $('#ingres_ini_plani').val().substring(0, 2);
                            var iniAno = $('#ingres_ini_plani').val().substring(6, 10);
                            var finMes = $('#ingres_fin_plani').val().substring(3, 5);
                            var finDia = $('#ingres_fin_plani').val().substring(0, 2);
                            var finAno = $('#ingres_fin_plani').val().substring(6, 10);
                            // alert(iniMes);
                            if (iniAno < finAno) {
                                //   alert("fechas correctas");

                                //Validando el tipo y estado del servidor

                                if (this.band1 == true) {//es decir se selecciono a un servidor en especial...solo hace falta el codigo del servidor para el filtrado
                                    //   alert("band1 es true")
                                    this.altabajaReg.show(this.altabajaView);
                                    $('#modal-altabaja2').modal("show");
                                } else {//se listaran a todos los servidores y se debe tomar el tipo y el estado de los combos para el filtrado
                                    tipoServ = $('#tiposervidorpla').val();
                                    estServ = $('#estadoservidorplani').val();
                                    if (tipoServ == 99 && estServ == 99) {
                                        $('#modal-altabaja2').modal("show");
                                        $("#tipoServidor_ccp_vacio2").hide();
                                        $("#tipoEstado_ccp_vacio2").hide();
                                        $("#tipoSer_Est_cpp_vacios2").show();
                                    } else if (tipoServ == 99) {
                                        //   alert("tipo: "+tipoServ + "estado: "+estServ);
                                        $('#modal-altabaja2').modal("show");
                                        $("#tipoServidor_ccp_vacio2").show();
                                        $("#tipoEstado_ccp_vacio2").hide();
                                        $("#tipoSer_Est_cpp_vacios2").hide();
                                    } else if (estServ == 99) {
                                        $('#modal-altabaja2').modal("show");
                                        $("#tipoServidor_ccp_vacio2").hide();
                                        $("#tipoEstado_ccp_vacio2").show();
                                        $("#tipoSer_Est_cpp_vacios2").hide();
                                    } else {
                                        this.altabajaReg.show(this.altabajaView);
                                        $('#modal-altabaja2').modal("show");
                                    }
                                }
                            } else {
                                if (iniAno == finAno) {
                                    if (finMes > iniMes) {
                                        //   alert("año igual y mes del fin mayor...ok")

                                        //Validando el tipo y estado del servidor

                                        if (this.band1 == true) {//es decir se selecciono a un servidor en especial...solo hace falta el codigo del servidor para el filtrado
                                            //   alert("band1 es true")
                                            this.altabajaReg.show(this.altabajaView);
                                            $('#modal-altabaja2').modal("show");
                                        } else {//se listaran a todos los servidores y se debe tomar el tipo y el estado de los combos para el filtrado

                                            tipoServ = $('#tiposervidorpla').val();
                                            estServ = $('#estadoservidorplani').val();
                                            if (tipoServ == 99 && estServ == 99) {
                                                $('#modal-altabaja2').modal("show");
                                                $("#tipoServidor_ccp_vacio2").hide();
                                                $("#tipoEstado_ccp_vacio2").hide();
                                                $("#tipoSer_Est_cpp_vacios2").show();
                                            } else if (tipoServ == 99) {
                                                //    alert("tipo: "+tipoServ + "estado: "+estServ);
                                                $('#modal-altabaja2').modal("show");
                                                $("#tipoServidor_ccp_vacio2").show();
                                                $("#tipoEstado_ccp_vacio2").hide();
                                                $("#tipoSer_Est_cpp_vacios2").hide();
                                            } else if (estServ == 99) {
                                                $('#modal-altabaja2').modal("show");
                                                $("#tipoServidor_ccp_vacio2").hide();
                                                $("#tipoEstado_ccp_vacio2").show();
                                                $("#tipoSer_Est_cpp_vacios2").hide();
                                            } else {
                                                this.altabajaReg.show(this.altabajaView);
                                                $('#modal-altabaja2').modal("show");
                                            }
                                        }

                                    }
                                    if (finMes == iniMes) {
                                        if (finDia > iniDia) {
                                            //   alert("año igual, mes igual....y dia del fin mayor...ok")

                                            //Validando el tipo y estado del servidor

                                            if (this.band1 == true) {//es decir se selecciono a un servidor en especial...solo hace falta el codigo del servidor para el filtrado
                                                //   alert("band1 es true")
                                                this.altabajaReg.show(this.altabajaView);
                                                $('#modal-altabaja2').modal("show");
                                            } else {//se listaran a todos los servidores y se debe tomar el tipo y el estado de los combos para el filtrado
                                                tipoServ = $('#tiposervidorpla').val();
                                                estServ = $('#estadoservidorplani').val();
                                                if (tipoServ == 99 && estServ == 99) {
                                                    $('#modal-altabaja2').modal("show");
                                                    $("#tipoServidor_ccp_vacio2").hide();
                                                    $("#tipoEstado_ccp_vacio2").hide();
                                                    $("#tipoSer_Est_cpp_vacios2").show();
                                                } else if (tipoServ == 99) {
                                                    //  alert("tipo: "+tipoServ + "estado: "+estServ);
                                                    $('#modal-altabaja2').modal("show");
                                                    $("#tipoServidor_ccp_vacio2").show();
                                                    $("#tipoEstado_ccp_vacio2").hide();
                                                    $("#tipoSer_Est_cpp_vacios2").hide();
                                                } else if (estServ == 99) {
                                                    $('#modal-altabaja2').modal("show");
                                                    $("#tipoServidor_ccp_vacio2").hide();
                                                    $("#tipoEstado_ccp_vacio2").show();
                                                    $("#tipoSer_Est_cpp_vacios2").hide();
                                                } else {
                                                    this.altabajaReg.show(this.altabajaView);
                                                    $('#modal-altabaja2').modal("show");
                                                }
                                            }
                                        } else {
                                            if (finDia == iniDia) {
                                                //  alert("ini y fin son identicos....no seguir")
                                                $("#errorFech").show();
                                            } else {
                                                //  alert("ini mayor que fin")
                                                $("#errorFech").show();
                                            }
                                        }
                                    } else {
                                        //   alert("inicio mayor que fin")
                                        $("#errorFech").show();
                                    }
                                } else {
                                    //  alert("inicio es mayor")
                                    $("#errorFech").show();
                                }
                            }
                        }
                        if ($('#ingres_ini_plani').val() != "" && $('#ingres_fin_plani').val() == "") {

                            //   alert("debe ingresar la fecha  de fin");
                            $('#modal-altabaja2').modal("show");

                            $("#fecha_inicio_cpp_vacio2").hide();
                            $("#fecha_ini_fin_cpp_vacios2").hide();
                            $("#fecha_fin_cpp_vacio2").show();


                        }
                        if ($('#ingres_ini_plani').val() == "" && $('#ingres_fin_plani').val() != "") {
                            //   alert("debe ingresar la fecha de inicio ");
                            $('#modal-altabaja2').modal("show");
                            $("#fecha_fin_cpp_vacio2").hide();
                            $("#fecha_ini_fin_cpp_vacios2").hide();
                            $("#fecha_inicio_cpp_vacio2").show();
                        }
                        if ($('#ingres_ini_plani').val() == "" && $('#ingres_fin_plani').val() == "") {
                            //  alert("entro a fechas nulas");
                            //  alert("band1 entra en: "+this.band1);
                            $('#modal-altabaja2').modal("show");
                            $("#fecha_fin_cpp_vacio2").hide();
                            $("#fecha_inicio_cpp_vacio2").hide();
                            $("#fecha_ini_fin_cpp_vacios2").show();

                            //Validando el tipo y estado del servidor

                            if (this.band1 == true) {//es decir se selecciono a un servidor en especial...solo hace falta el codigo del servidor para el filtrado
                                //   alert("band1 es true")
                                this.altabajaReg.show(this.altabajaView);
                                $('#modal-altabaja2').modal("show");
                            } else {//se listaran a todos los servidores y se debe tomar el tipo y el estado de los combos para el filtrado
                                tipoServ = $('#tiposervidorpla').val();
                                estServ = $('#estadoservidorplani').val();
                                if (tipoServ == 99 && estServ == 99) {
                                    $('#modal-altabaja2').modal("show");
                                    $("#tipoServidor_ccp_vacio2").hide();
                                    $("#tipoEstado_ccp_vacio2").hide();
                                    $("#tipoSer_Est_cpp_vacios2").show();
                                } else if (tipoServ == 99) {
                                    //   alert("tipo: "+tipoServ + "estado: "+estServ);
                                    $('#modal-altabaja2').modal("show");
                                    $("#tipoServidor_ccp_vacio2").show();
                                    $("#tipoEstado_ccp_vacio2").hide();
                                    $("#tipoSer_Est_cpp_vacios2").hide();
                                } else if (estServ == 99) {
                                    $('#modal-altabaja2').modal("show");
                                    $("#tipoServidor_ccp_vacio2").hide();
                                    $("#tipoEstado_ccp_vacio2").show();
                                    $("#tipoSer_Est_cpp_vacios2").hide();
                                } else {
                                    this.altabajaReg.show(this.altabajaView);
                                    $('#modal-altabaja2').modal("show");
                                }
                            }
                        }
                    }
                },


                //cuando selecciona alta
                listar_serv_cond_pla:function(e){
                    var clickedElement=$(e.currentTarget);
                    var tipoTrabCond = $("#tiposervidorpla").val();
                    var estadoTrabCond = $("#estadoservidorplani").val();


                    // le asigna un valor a cada item del combo cuando selecciona todos
                    if(tipoTrabCond==99){
                        var docCCP=1;
                        var admCCP=2;
                        var docMagCCP=3;
                        var  admProfSaludCCP=4;
                        var obreroCCP=5;
                        var sinTipoCCP=0;
                        var desigCCP=6;
                        var desigSaludCCP=7;


                    }
                    if(tipoTrabCond!=99){
                        var docCCP=$("#tiposervidorpla").val();
                        var admCCP=$("#tiposervidorpla").val();
                        var docMagCCP=$("#tiposervidorpla").val();
                        var  admProfSaludCCP=$("#tiposervidorpla").val();
                        var obreroCCP=$("#tiposervidorpla").val();
                        var sinTipoCCP=$("#tiposervidorpla").val();
                        var desigCCP=$("#tiposervidorpla").val();
                        var desigSaludCCP=$("#tiposervidorpla").val();
                    }

                    if(estadoTrabCond==99){
                        var permCCP=1;
                        var contrat=2;
                        var cesa=3;
                        var snp=4;
                        var sinEst=0;
                        var contrPers=5;
                        var cas=7;
                        var amc=6;

                    }

                    if(estadoTrabCond!=99){
                        var permCCP=$("#estadoservidorplani").val();
                        var contrat=$("#estadoservidorplani").val();
                        var cesa=$("#estadoservidorplani").val();
                        var snp=$("#estadoservidorplani").val();
                        var sinEst=$("#estadoservidorplani").val();
                        var contrPers=$("#estadoservidorplani").val();
                        var cas=$("#estadoservidorplani").val();
                        var amc=$("#estadoservidorplani").val();
                    }



                    //me trae los valores siempre y cuando el checkbox este seleccionado

                    var activo=$("#activo:checked").val();
                    /////////////////////////////////////////////////////////////
                    //// si se ha seleccionado a un trabajador entra al if
                    var estCCP= $("#estServ").text();
                    var tipCCP= $("#tipTrabCCP").text();
                    var dniCCP=$("#dniServ").text();
                    //  alert("estado trabajador:"+estCCP);
                    //  alert("tipo de trabajador:"+tipCCP);
                    //  alert("dni:"+dniCCP);

                    if($("#estServ").text()=="" && $("#tipTrabCCP").text()=="" && $("#dniServ").text()==""){
                        //  alert("entro a limpiar las variables");
                        var   estCCP="";
                        var  tipCCP="";
                        var  dniCCP="";
                    }

                    //   alert("despues del if de limpiar "+estCCP+" "+tipCCP+" "+dniCCP)
                    var fInicioCCP=$("#ingres_ini_plani").val();
                    var fFinCCP=$("#ingres_fin_plani").val();


                    //si la fecha de inico no esta vacio -> tomamos el año y el mes por separado
                    if(fInicioCCP!=""){
                        var anioIniCCP= fInicioCCP.substring(6)
                        var mesIniCCP=fInicioCCP.substring(3,5)
                    }
                    //si la fecha de inicio es vacia se pone una fecha por defecto
                    if(fInicioCCP==""){
                        var anioIniCCP=2014;
                        var mesIniCCP=01;
                    }
                    //lo mismo para la fecha fin
                    if(fFinCCP!=""){
                        var anioFinCCP=fFinCCP.substring(6)
                        var mesFinCCP=fFinCCP.substring(3,5)
                    }
                    if(fFinCCP==""){             //como siempre sera vacio entrara aca -> asignarle el valor de anio de inicio
                        var anioFinCCP=2050;
                        var mesFinCCP=12;
                    }



                    //  alert("fecha inicio: "+fInicioCCP+" fecha fin: "+fFinCCP+" anioIni: "+anioIniCCP+" anioFin: "+anioFinCCP+
                    //     " mesIni: "+mesIniCCP+" mesFin: "+mesFinCCP);

                    if(estCCP!="" || tipCCP!="" || dniCCP!=""){
                        //   alert("entro al if de alta se buscara por un trabajador en especifico")
                        //ponemos en 100 todas las bajas, ya que estamos en altas(activo)
                        var susp_ina=100;
                        var cese=100;
                        var fallecido=100;
                        var funmsm=100;
                        var fplani=100;
                        var term_cont=100;
                        var ren=100;
                        var pen_susp=100;
                        var lsgh=100;
                        var noRat=100;
                        var destac=100;
                        var lcgh=100;
                        var exclu=100;
                        var cadPen=100;

                        //CAMBIAR LA DESCRIPCION DEL TIPO DE TRABAJADOR POR EL CODIGO DEL TRABAJADOR
                        if(tipCCP=="DOCENTE"){
                            var codTipCCP=1;
                        }
                        if(tipCCP=="ADMINISTRATIVO"){
                            var codTipCCP=2;
                        }
                        if(tipCCP.indexOf("ADMINISTRATIVO")!=-1){
                            var codTipCCP=2;
                        }
                        if(tipCCP=="DOCENTE DEL MAGISTERIO"){
                            var codTipCCP=3;
                        }
                        if(tipCCP=="ADM. PROF. DE LA SALUD"){
                            var codTipCCP=4;
                        }
                        if(tipCCP=="OBRERO"){
                            var codTipCCP=5;
                        }
                        if(tipCCP=="SIN TIPO"){
                            var codTipCCP=0;
                        }
                        if(tipCCP=="DESIGNADO"){
                            var codTipCCP=6;
                        }
                        if(tipCCP=="DESIGNADO DOC. DEL MAGISTERIO"){
                            var codTipCCP=7;
                        }

                        //CAMBIAR LA DESCRIPCION DEL ESTADO DEL TRABAJADOR POR EL CODIGO DEL ESTADO DEL TRABAJADOR
                        if(estCCP=="PERMANENTE"){
                            var codEstCCP=1;
                        }
                        if(estCCP=="CONTRATADO"){
                            var codEstCCP=2;
                        }
                        if(estCCP=="CESANTE"){
                            var codEstCCP=3;
                        }
                        if(estCCP=="SNP"){
                            var codEstCCP=4;
                        }
                        if(estCCP=="SIN ESTADO"){
                            var codEstCCP=0;
                        }
                        if(estCCP=="CONTRATO PERSONAL"){
                            var codEstCCP=5;
                        }
                        if(estCCP=="CAS"){
                            var codEstCCP=6;
                        }
                        if(estCCP=="AMC"){
                            var codEstCCP=7;
                        }


                        //   alert("el tipo es: "+codTipCCP+" el estado es: "+codEstCCP)


                        var  valor1=activo;
                        var self=this;
                        this.listarServCondPlaView.getListarUnActivoServCond(valor1, susp_ina, cese,  fallecido,  funmsm,  fplani,  term_cont,
                            ren,  pen_susp, lsgh,  noRat,  destac,  lcgh, exclu, cadPen, codTipCCP, codEstCCP, dniCCP, anioIniCCP, mesIniCCP, anioFinCCP, mesFinCCP, function(){
                                if(self.listarServCondPlaView.collection.length!=0){
                                    //   alert("entro al if");
                                    $("#table-cond-pla").dataTable();


                                    $('#table-cond-pla_wrapper').append("<div id='footer-table'></div>");
                                    $('#table-cond-pla_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                    $('#table-cond-pla_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                                    $('.dataTables_filter input').attr('placeholder','Buscar..');

                                }


                                clickedElement.button('loading');
                                setTimeout(function () {
                                    clickedElement.button('reset');
                                    self.ListarReg.show(self.ListarServidorView) ;
                                    if(self.ListarServidorView.collection.length!=0){
                                        $("#listar_servidores_cond_planilla").removeAttr("hidden")
                                        $("#table-cond-pla2").hide();
                                    }

                                    //    $("#servidoresModal").modal();

                                },5000);

                                //    $("#altaCondPla").show();
                                //descomentar lo de abajo si es que falla el temporizador
                                /* $("#listar_servidores_cond_planilla").removeAttr("hidden")
                                 $("#table-cond-pla2").hide();  */
                                //  $("#condFechCCP").removeAttr("hidden");
                                // $("#fechCambCCP").removeAttr("hidden");

                            });


                        clickedElement.button('loading');
                        setTimeout(function () {
                            clickedElement.button('reset');
                            self.ListarReg.show(self.ListarServidorView) ;
                            if(self.ListarServidorView.collection.length!=0){
                                $('#listar_servidores_cond_planilla').show();
                                //probando si aqui va
                                this.listarServCondPla2Reg.reset(this.listarServCondPla2View)

                                this.listarServCondPlaReg.show(this.listarServCondPlaView);
                            }

                            //    $("#servidoresModal").modal();

                        },5000);
                        //descomentar lo de abajo si es que el temporizador no funciona
                        /*  $('#listar_servidores_cond_planilla').show();
                         //probando si aqui va
                         this.listarServCondPla2Reg.reset(this.listarServCondPla2View)

                         this.listarServCondPlaReg.show(this.listarServCondPlaView);*/


                    }
                    else {

                        if(fFinCCP==""){             //como siempre sera vacio entrara aca -> asignarle el valor de anio de inicio
                            var anioFinCCP=anioIniCCP;
                            var mesFinCCP=mesIniCCP;}
                        //   alert("entro al else se buscara por todos los trabajadores");
                        //   alert("el tipo seleccionado es: "+tipoTrabCond+" estado es: "+estadoTrabCond+" pen_susp "+pen_susp+
                        //      "activo"+activo+" lsgh:"+lsgh+" no ratific:"+noRat+" destacado:"+destac+" lcgh:"+lcgh+" excluido:"+exclu+" cadPen:"+cadPen);
                        //  alert("anio fin: "+anioFinCCP+" mes fin: "+mesFinCCP);

                        //22-08-2014 comentado la linea de abajo
                        //    $('#listar_servidores_cond_planilla').show();
                        //probando si aqui va
                        this.listarServCondPla2Reg.reset(this.listarServCondPla2View)
                        this.listarServCondPlaReg.show(this.listarServCondPlaView);
                        if(pen_susp==undefined && activo==undefined && lsgh==undefined && noRat==undefined
                            && destac==undefined && lcgh==undefined && exclu==undefined && cadPen==undefined){
                            //22-08-2014 comentado la linea de abajo
                            //   $("#listar_servidores_cond_planilla").removeAttr("hidden")

                            // $("#condFechCCP").attr("hidden","hidden");
                            // $("#fechCambCCP").attr("hidden","hidden");
                            // $("#condicion").attr("hidden","hidden");
                            //$("#fechaCambio").attr("hidden","hidden");
                            //    alert("no se selecciono una alta no mostrar campo")
                        }    else{
                            //$("#condFechCCP").removeAttr("hidden");
                            //$("#fechCambCCP").removeAttr("hidden");
                            //    alert("se selecciono una alta mostrar campo")
                            var self=this;

                            //ponemos en 100 todas las bajas, ya que estamos en altas(activo)
                            var susp_ina=100;
                            var cese=100;
                            var fallecido=100;
                            var funmsm=100;
                            var fplani=100;
                            var term_cont=100;
                            var ren=100;
                            var pen_susp=100;
                            var lsgh=100;
                            var noRat=100;
                            var destac=100;
                            var lcgh=100;
                            var exclu=100;
                            var cadPen=100;
                            //  var sanc_disc=100;
                            var  valor1=activo;
                            this.listarServCondPlaView.getListarServCond(valor1, susp_ina, cese,  fallecido,  funmsm,  fplani,  term_cont,
                                ren,  pen_susp, lsgh,  noRat,  destac,  lcgh, exclu, cadPen, docCCP, admCCP, docMagCCP, admProfSaludCCP, obreroCCP, sinTipoCCP,
                                desigCCP, desigSaludCCP, permCCP, contrat,cesa, snp, sinEst,contrPers,cas, amc, anioIniCCP, mesIniCCP, anioFinCCP, mesFinCCP, function(){
                                    if(self.listarServCondPlaView.collection.length!=0){
                                        //  alert("entro al if");
                                        $("#table-cond-pla").dataTable();


                                        $('#table-cond-pla_wrapper').append("<div id='footer-table'></div>");
                                        $('#table-cond-pla_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                        $('#table-cond-pla_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                                        $('.dataTables_filter input').attr('placeholder','Buscar..');

                                    }

                                    clickedElement.button('loading');
                                    setTimeout(function () {
                                        clickedElement.button('reset');
                                        self.ListarReg.show(self.ListarServidorView) ;
                                        if(self.ListarServidorView.collection.length!=0){
                                            $("#listar_servidores_cond_planilla").removeAttr("hidden")
                                            $("#table-cond-pla2").hide();
                                        }

                                        //    $("#servidoresModal").modal();

                                    },12000);


                                    //    $("#altaCondPla").show();
                                    //descomentar si es que el temporizador falla
                                    /*     $("#listar_servidores_cond_planilla").removeAttr("hidden")
                                     $("#table-cond-pla2").hide();     */
                                    //  $("#condFechCCP").removeAttr("hidden");
                                    // $("#fechCambCCP").removeAttr("hidden");

                                });

                            clickedElement.button('loading');
                            setTimeout(function () {
                                clickedElement.button('reset');
                                self.ListarReg.show(self.ListarServidorView) ;
                                if(self.ListarServidorView.collection.length!=0){
                                    $('#listar_servidores_cond_planilla').show();
                                    this.listarServCondPla2Reg.reset(this.listarServCondPla2View);
                                    this.listarServCondPlaReg.show(this.listarServCondPlaView);
                                }

                                //    $("#servidoresModal").modal();

                            },12000);


                            //descomentar si el temporizador no funciona
                            /*    $('#listar_servidores_cond_planilla').show();
                             this.listarServCondPla2Reg.reset(this.listarServCondPla2View);
                             this.listarServCondPlaReg.show(this.listarServCondPlaView); */

                            // this.listarServCondPlaReg.show(this.listarServCondPlaView)
                        }
                        //  $("#listar_servidores_cond_planilla").removeAttr("hidden")

                        clickedElement.button('loading');
                        setTimeout(function () {
                            clickedElement.button('reset');
                            self.ListarReg.show(self.ListarServidorView) ;
                            if(self.ListarServidorView.collection.length!=0){
                                $('#modal-altabaja').modal("hide");
                                $('#modal-altabaja2').modal("hide");
                            }

                            //    $("#servidoresModal").modal();

                        },12000);

                        //descomentar lo de abajo si es que no funciona el temporizador
                        /* $('#modal-altabaja').modal("hide");
                         $('#modal-altabaja2').modal("hide"); */

                    }


                    clickedElement.button('loading');
                    setTimeout(function () {
                        clickedElement.button('reset');
                        self.ListarReg.show(self.ListarServidorView) ;
                        if(self.ListarServidorView.collection.length!=0){
                            $('#modal-altabaja').modal("hide");
                            $('#modal-altabaja2').modal("hide");
                        }

                        //    $("#servidoresModal").modal();

                    },5000);

                    //descomentar lo de abajo si es que no funciona el temporizador
                    /*   $('#modal-altabaja').modal("hide");
                     $('#modal-altabaja2').modal("hide"); */



                },


                //cuando selecciona baja
                listar_serv_cond_pla2:function(e){
                    var clickedElement=$(e.currentTarget)



                    var tipoTrabCond = $("#tiposervidorpla").val();
                    var estadoTrabCond = $("#estadoservidorplani").val();

                    var sanc_disc=$("#sanc_disc:checked").val();
                    var susp_ina=$("#susp_ina:checked").val();
                    var cese=$("#cese:checked").val();
                    var fallecido=$("#fall:checked").val();
                    var funmsm=$("#funms:checked").val();
                    var fplani=$("#fplani:checked").val();
                    var term_cont=$("#term_cont:checked").val();
                    var ren=$("#ren:checked").val();

                    var pen_susp =$("#pen_susp:checked").val();
                    var lsgh=$("#lsgh:checked").val();
                    var noRat=$("#noRat:checked").val();
                    var destac=$("#destac:checked").val();
                    var lcgh=$("#lcgh:checked").val();
                    var exclu=$("#exclu:checked").val();
                    var cadPen=$("#cadPen:checked").val();
                    //  var dni=clickedElement.children(':nth-child(2)').text();
                    var estCCP= $("#estServ").text();
                    var tipCCP= $("#tipTrabCCP").text();
                    var dniCCP=$("#dniServ").text();

                    if($("#estServ").text()=="" && $("#tipTrabCCP").text()=="" && $("#dniServ").text()==""){
                        estCCP="";
                        tipCCP="";
                        dniCCP="";
                    }



                    var fInicioCCP=$("#ingres_ini_plani").val();
                    var fFinCCP=$("#ingres_fin_plani").val();
                    //     var anioIniCCP= fInicioCCP.substring(6)
                    //     var anioFinCCP=fFinCCP.substring(6)
                    //     var mesIniCCP=fInicioCCP.substring(3,5)
                    //  var mesFinCCP=fFinCCP.substring(3,5)
                    //   alert("fecha inicio: "+fInicioCCP+" fecha fin: "+fFinCCP+" anioIni: "+anioIniCCP+" anioFin: "+anioFinCCP+
                    //   " mesIni: "+mesIniCCP+" mesFin: "+mesFinCCP);

                    //si la fecha de inico no esta vacio -> tomamos el año y el mes por separado
                    if(fInicioCCP!=""){
                        var anioIniCCP= fInicioCCP.substring(6,10)
                        var mesIniCCP=fInicioCCP.substring(3,5)
                    }
                    //si la fecha de inicio es vacia se pone una fecha por defecto
                    if(fInicioCCP==""){
                        var anioIniCCP=2000;
                        var mesIniCCP=01;
                    }
                    //lo mismo para la fecha fin
                    if(fFinCCP!=""){
                        var anioFinCCP=fFinCCP.substring(6,10)
                        var mesFinCCP=fFinCCP.substring(3,5)
                    }
                    if(fFinCCP==""){
                        var anioFinCCP=2050;
                        var mesFinCCP=12;
                    }


                    //  alert("fecha inicio: "+fInicioCCP+" fecha fin: "+fFinCCP+" anioIni: "+anioIniCCP+" anioFin: "+anioFinCCP+
                    //      " mesIni: "+mesIniCCP+" mesFin: "+mesFinCCP);

                    if(estCCP!="" || tipCCP!="" || dniCCP!=""){ // si esta lleno el tipo y estado de un trabajador
                        //    alert("entro al if");
                        //   alert("fecha inicio: "+fInicioCCP+" fecha fin: "+fFinCCP+" anioIni: "+anioIniCCP+" anioFin: "+anioFinCCP+
                        //       " mesIni: "+mesIniCCP+" mesFin: "+mesFinCCP);
                        //   alert("funmsm: "+funmsm);
                        //   this.listarServCondPla2Reg.show(this.listarServCondPla2View);
                        if(sanc_disc==undefined && susp_ina==undefined && cese==undefined && fallecido==undefined
                            && funmsm==undefined && fplani==undefined && term_cont==undefined && ren==undefined
                            && pen_susp==undefined && lsgh==undefined && noRat==undefined && destac==undefined && lcgh==undefined
                            && exclu==undefined && cadPen==undefined){  // quiere decir que esta seleccionado todos.
                            var sanc_disc=$("#sanc_disc").val();
                            var susp_ina=$("#susp_ina").val();
                            var cese=$("#cese").val();
                            var fallecido=$("#fall").val();
                            var funmsm=$("#funms").val();
                            //     alert("funmsm directo: "+$("#funms").val());
                            // var  funmsm="7";
                            var fplani=$("#fplani").val();
                            var term_cont=$("#term_cont").val();
                            var ren=$("#ren").val();

                            var pen_susp =$("#pen_susp").val();
                            var lsgh=$("#lsgh").val();
                            var noRat=$("#noRat").val();
                            var destac=$("#destac").val();
                            var lcgh=$("#lcgh").val();
                            var exclu=$("#exclu").val();
                            var cadPen=$("#cadPen").val();

                            var valor1=sanc_disc;
                            var self=this;

                            //CAMBIAR LA DESCRIPCION DEL TIPO DE TRABAJADOR POR EL CODIGO DEL TRABAJADOR
                            if(tipCCP=="DOCENTE"){
                                var codTipCCP=1;
                            }
                            if(tipCCP=="ADMINISTRATIVO"){
                                var codTipCCP=2;
                            }
                            if(tipCCP.indexOf("ADMINISTRATIVO")!=-1){
                                var codTipCCP=2;
                            }
                            if(tipCCP=="DOCENTE DEL MAGISTERIO"){
                                var codTipCCP=3;
                            }
                            if(tipCCP=="ADM. PROF. DE LA SALUD"){
                                var codTipCCP=4;
                            }
                            if(tipCCP=="OBRERO"){
                                var codTipCCP=5;
                            }
                            if(tipCCP=="SIN TIPO"){
                                var codTipCCP=0;
                            }
                            if(tipCCP=="DESIGNADO"){
                                var codTipCCP=6;
                            }
                            if(tipCCP=="DESIGNADO DOC. DEL MAGISTERIO"){
                                var codTipCCP=7;
                            }

                            //CAMBIAR LA DESCRIPCION DEL ESTADO DEL TRABAJADOR POR EL CODIGO DEL ESTADO DEL TRABAJADOR
                            if(estCCP=="PERMANENTE"){
                                var codEstCCP=1;
                            }
                            if(estCCP=="CONTRATADO"){
                                var codEstCCP=2;
                            }
                            if(estCCP=="CESANTE"){
                                var codEstCCP=3;
                            }
                            if(estCCP=="SNP"){
                                var codEstCCP=4;
                            }
                            if(estCCP=="SIN ESTADO"){
                                var codEstCCP=0;
                            }
                            if(estCCP=="CONTRATO PERSONAL"){
                                var codEstCCP=5;
                            }
                            if(estCCP=="CAS"){
                                var codEstCCP=6;
                            }
                            if(estCCP=="AMC"){
                                var codEstCCP=7;
                            }


                            //    alert("el tipo es: "+codTipCCP+" el estado es: "+codEstCCP)

                            //   alert("antes de listar el funmsm es: "+funmsm+" y fallecido es: "+fallecido);
                            //    alert("buscara por un trabajador: anio fin: "+anioFinCCP+" mes fin: "+mesFinCCP);

                            //esta es la tabla que tengo que cambiar y agregarle en la query la busqueda por dni
                            this.listarServCondPla2View.getLisarUnServCond2(valor1, susp_ina, cese,  fallecido,  funmsm,  fplani,  term_cont,
                                ren,  pen_susp, lsgh,  noRat,  destac,  lcgh, exclu, cadPen, codTipCCP, codEstCCP, dniCCP,anioIniCCP, mesIniCCP, anioFinCCP, mesFinCCP,
                                function(){  //para la tabla de baja
                                    //  $("#condfech").removeAttr("hidden");
                                    //$("#fechcamb").removeAttr("hidden");
                                    //$("#cond").removeAttr("hidden");
                                    // $("#fechacambio").removeAttr("hidden");
                                    if(self.listarServCondPla2View.collection.length!=0){
                                        //              alert("entro al if");

                                        $("#table-cond-pla2").dataTable();
                                        $('#table-cond-pla2_wrapper').append("<div id='footer-table'></div>");
                                        $('#table-cond-pla2_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                        $('#table-cond-pla2_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                                        $('.dataTables_filter input').attr('placeholder','Buscar..');

                                    }


                                    //    $("#altaCondPla").show();


                                });

                            $("#table-cond-pla").hide();
                            $('#listar_servidores_cond_planilla').show();
                            this.listarServCondPlaReg.reset(this.listarServCondPlaView);
                            this.listarServCondPla2Reg.show(this.listarServCondPla2View);



                            //  alert("no se selecciono una alta no mostrar campo")
                        }
                        else{ //  si selecciona una baja buscara solo por ese y a los demas les pondra 100

                            //  alert("entro al else snp"+snp)
                            //  alert("se selecciono una baja mostrar campo")

                            //comprueva si es o no indefinido para asignarle un valor grande y que no afecte en el IN()
                            if(susp_ina==undefined){ susp_ina=100;}
                            if(cese==undefined){cese=100;}
                            if(fallecido==undefined){fallecido=100;}
                            if(funmsm==undefined){funmsm=100;}
                            if(fplani==undefined){fplani=100;}
                            if(term_cont==undefined){term_cont=100;}
                            if(ren==undefined){ren=100;}
                            if(pen_susp==undefined){pen_susp=100;}
                            if(lsgh==undefined){lsgh=100;}
                            if(noRat==undefined){noRat=100;}
                            if(destac==undefined){destac=100;}
                            if(lcgh==undefined){lcgh=100;}
                            if(exclu==undefined){exclu=100;}
                            if(cadPen==undefined){cadPen=100;}
                            if(sanc_disc==undefined){sanc_disc=100;}



                            //CAMBIAR LA DESCRIPCION DEL TIPO DE TRABAJADOR POR EL CODIGO DEL TRABAJADOR
                            if(tipCCP=="DOCENTE"){var codTipCCP=1;}
                            if(tipCCP=="ADMINISTRATIVO"){var codTipCCP=2;}
                            if(tipCCP.indexOf("ADMINISTRATIVO")!=-1){var codTipCCP=2;}
                            if(tipCCP=="DOCENTE DEL MAGISTERIO"){var codTipCCP=3;}
                            if(tipCCP=="ADM. PROF. DE LA SALUD"){var codTipCCP=4;}
                            if(tipCCP=="OBRERO"){var codTipCCP=5;}
                            if(tipCCP=="SIN TIPO"){var codTipCCP=0;}
                            if(tipCCP=="DESIGNADO"){var codTipCCP=6;}
                            if(tipCCP=="DESIGNADO DOC. DEL MAGISTERIO"){var codTipCCP=7;}

                            //CAMBIAR LA DESCRIPCION DEL ESTADO DEL TRABAJADOR POR EL CODIGO DEL ESTADO DEL TRABAJADOR
                            if(estCCP=="PERMANENTE"){var codEstCCP=1;}
                            if(estCCP=="CONTRATADO"){var codEstCCP=2;}
                            if(estCCP=="CESANTE"){var codEstCCP=3;}
                            if(estCCP=="SNP"){var codEstCCP=4;}
                            if(estCCP=="SIN ESTADO"){var codEstCCP=0;}
                            if(estCCP=="CONTRATO PERSONAL"){var codEstCCP=5;}
                            if(estCCP=="CAS"){var codEstCCP=6;}
                            if(estCCP=="AMC"){var codEstCCP=7;}


                            //  alert("el tipo es: "+codTipCCP+" el estado es: "+codEstCCP)

                            var  valor1=sanc_disc;
                            var self=this;
                            this.listarServCondPla2View.getLisarUnServCond2(valor1, susp_ina, cese,  fallecido,  funmsm,  fplani,  term_cont,
                                ren,  pen_susp, lsgh,  noRat,  destac,  lcgh, exclu, cadPen, codTipCCP, codEstCCP, dniCCP, anioIniCCP, mesIniCCP, anioFinCCP, mesFinCCP, function(){  //para la tabla de baja

                                    if(self.listarServCondPla2View.collection.length!=0){
                                        //   alert("entro al if");

                                        $("#table-cond-pla2").dataTable();
                                        $('#table-cond-pla2_wrapper').append("<div id='footer-table'></div>");
                                        $('#table-cond-pla2_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                        $('#table-cond-pla2_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                                        $('.dataTables_filter input').attr('placeholder','Buscar..');

                                    }





                                });

                            $("#table-cond-pla").hide();
                            $('#listar_servidores_cond_planilla').show();
                            this.listarServCondPlaReg.reset(this.listarServCondPlaView);

                            this.listarServCondPla2Reg.show(this.listarServCondPla2View);

                            // this.listarServCondPla2Reg.show(this.listarServCondPla2View)

                        }

                        clickedElement.button('loading');
                        setTimeout(function () {
                            clickedElement.button('reset');
                            self.ListarReg.show(self.ListarServidorView) ;
                            if(self.ListarServidorView.collection.length!=0){
                                $("#listar_servidores_cond_planilla").removeAttr("hidden","hidden")
                                $('#modal-altabaja').modal("hide");
                                $('#modal-altabaja2').modal("hide");
                            }

                            //    $("#servidoresModal").modal();

                        },2000);

                        //descomentar lo de abajo si es que el temporizador no funciona
                        /*   $("#listar_servidores_cond_planilla").removeAttr("hidden","hidden")
                         $('#modal-altabaja').modal("hide");
                         $('#modal-altabaja2').modal("hide");   */




                    }
                    else{

                        if(fFinCCP==""){             //como siempre sera vacio entrara aca -> asignarle el valor de anio de inicio
                            var anioFinCCP=anioIniCCP;
                            var mesFinCCP=mesIniCCP;}
                        //  alert("entro al else, buscara de todos los trabajadores")
                        //  alert("anio fin: "+anioFinCCP+" mes fin: "+mesFinCCP);
                        // le asigna un valor a cada item del combo cuando selecciona todos
                        if(tipoTrabCond==99){
                            var docCCP=1;
                            var admCCP=2;
                            var docMagCCP=3;
                            var admProfSaludCCP=4;
                            var obreroCCP=5;
                            var sinTipoCCP=0;
                            var desigCCP=6;
                            var desigSaludCCP=7;


                        }


                        //cuando selecciona diferente de todos se le pone el valor seleccionado
                        if(tipoTrabCond!=99){
                            var docCCP=$("#tiposervidorpla").val();
                            var admCCP=$("#tiposervidorpla").val();
                            var docMagCCP=$("#tiposervidorpla").val();
                            var  admProfSaludCCP=$("#tiposervidorpla").val();
                            var obreroCCP=$("#tiposervidorpla").val();
                            var sinTipoCCP=$("#tiposervidorpla").val();
                            var desigCCP=$("#tiposervidorpla").val();
                            var desigSaludCCP=$("#tiposervidorpla").val();
                        }

                        if(estadoTrabCond==99){
                            var permCCP=1;
                            var contrat=2;
                            var cesa=3;
                            var snp=4;
                            var sinEst=0;
                            var contrPers=5;
                            var cas=7;
                            var amc=6;

                        }

                        if(estadoTrabCond!=99){
                            var permCCP=$("#estadoservidorplani").val();
                            var contrat=$("#estadoservidorplani").val();
                            var cesa=$("#estadoservidorplani").val();
                            var snp=$("#estadoservidorplani").val();
                            var sinEst=$("#estadoservidorplani").val();
                            var contrPers=$("#estadoservidorplani").val();
                            var cas=$("#estadoservidorplani").val();
                            var amc=$("#estadoservidorplani").val();
                        }
                        // alert("snp"+snp)
                        // alert("el tipo seleccionado es: "+tipoTrabCond+" estado es: "+estadoTrabCond+" san_disc: "+sanc_disc+" susp_ina:"+susp_ina+
                        //   "cese: "+cese+" fallecido: "+fallecido+" funmsm: "+funmsm+" fplani: "+fplani+" term_cont: "+term_cont+" ren: "+ren);

                        //   this.listarServCondPla2Reg.show(this.listarServCondPla2View);
                        if(sanc_disc==undefined && susp_ina==undefined && cese==undefined && fallecido==undefined
                            && funmsm==undefined && fplani==undefined && term_cont==undefined && ren==undefined
                            && pen_susp==undefined && lsgh==undefined && noRat==undefined && destac==undefined && lcgh==undefined
                            && exclu==undefined && cadPen==undefined){  // quiere decir que esta seleccionado todos.
                            var sanc_disc=$("#sanc_disc").val();
                            var susp_ina=$("#susp_ina").val();
                            var cese=$("#cese").val();
                            var fallecido=$("#fall").val();
                            var funmsm=$("#funms").val();
                            var fplani=$("#fplani").val();
                            var term_cont=$("#term_cont").val();
                            var ren=$("#ren").val();

                            var pen_susp =$("#pen_susp").val();
                            var lsgh=$("#lsgh").val();
                            var noRat=$("#noRat").val();
                            var destac=$("#destac").val();
                            var lcgh=$("#lcgh").val();
                            var exclu=$("#exclu").val();
                            var cadPen=$("#cadPen").val();

                            var  valor1=sanc_disc;
                            var self=this;
                            this.listarServCondPla2View.getListarServCond2(valor1, susp_ina, cese,  fallecido,  funmsm,  fplani,  term_cont,
                                ren,  pen_susp, lsgh,  noRat,  destac,  lcgh, exclu, cadPen, docCCP, admCCP, docMagCCP, admProfSaludCCP, obreroCCP, sinTipoCCP,
                                desigCCP, desigSaludCCP,permCCP, contrat,cesa, snp, sinEst,contrPers,cas, amc, anioIniCCP, mesIniCCP, anioFinCCP, mesFinCCP,
                                function(){  //para la tabla de baja
                                    //  $("#condfech").removeAttr("hidden");
                                    //$("#fechcamb").removeAttr("hidden");
                                    //$("#cond").removeAttr("hidden");
                                    // $("#fechacambio").removeAttr("hidden");
                                    if(self.listarServCondPla2View.collection.length!=0){
                                        //   alert("entro al if");

                                        $("#table-cond-pla2").dataTable();
                                        $('#table-cond-pla2_wrapper').append("<div id='footer-table'></div>");
                                        $('#table-cond-pla2_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                        $('#table-cond-pla2_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                                        $('.dataTables_filter input').attr('placeholder','Buscar..');

                                    }


                                    //    $("#altaCondPla").show();


                                });

                            clickedElement.button('loading');
                            setTimeout(function () {
                                clickedElement.button('reset');
                                self.ListarReg.show(self.ListarServidorView) ;
                                if(self.ListarServidorView.collection.length!=0){
                                    $("#table-cond-pla").hide();
                                    $('#listar_servidores_cond_planilla').show();
                                }

                                //    $("#servidoresModal").modal();

                            },2000);


                            /*  $("#table-cond-pla").hide();
                             $('#listar_servidores_cond_planilla').show(); */
                            this.listarServCondPlaReg.reset(this.listarServCondPlaView);
                            this.listarServCondPla2Reg.show(this.listarServCondPla2View);



                            //  alert("no se selecciono una baja no mostrar campo")
                        }    else{ //

                            // alert("entro al else snp"+snp)
                            // alert("se selecciono una baja mostrar campo")

                            //comprueva si es o no indefinido para asignarle un valor grande y que no afecte en el IN()
                            if(susp_ina==undefined){ susp_ina=100;}
                            if(cese==undefined){cese=100;}
                            if(fallecido==undefined){fallecido=100;}
                            if(funmsm==undefined){funmsm=100;}
                            if(fplani==undefined){fplani=100;}
                            if(term_cont==undefined){term_cont=100;}
                            if(ren==undefined){ren=100;}
                            if(pen_susp==undefined){pen_susp=100;}
                            if(lsgh==undefined){lsgh=100;}
                            if(noRat==undefined){noRat=100;}
                            if(destac==undefined){destac=100;}
                            if(lcgh==undefined){lcgh=100;}
                            if(exclu==undefined){exclu=100;}
                            if(cadPen==undefined){cadPen=100;}
                            if(sanc_disc==undefined){sanc_disc=100;}


                            var  valor1=sanc_disc;
                            var self=this;
                            this.listarServCondPla2View.getListarServCond2(valor1, susp_ina, cese,  fallecido,  funmsm,  fplani,  term_cont,
                                ren,  pen_susp, lsgh,  noRat,  destac,  lcgh, exclu, cadPen, docCCP, admCCP, docMagCCP, admProfSaludCCP, obreroCCP, sinTipoCCP,
                                desigCCP, desigSaludCCP,permCCP, contrat,cesa, snp, sinEst,contrPers,cas, amc,anioIniCCP, mesIniCCP, anioFinCCP, mesFinCCP, function(){  //para la tabla de baja
                                    //  $("#condfech").removeAttr("hidden");
                                    //$("#fechcamb").removeAttr("hidden");
                                    //$("#cond").removeAttr("hidden");
                                    // $("#fechacambio").removeAttr("hidden");
                                    if(self.listarServCondPla2View.collection.length!=0){
                                        //   alert("entro al if");

                                        $("#table-cond-pla2").dataTable();
                                        $('#table-cond-pla2_wrapper').append("<div id='footer-table'></div>");
                                        $('#table-cond-pla2_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                                        $('#table-cond-pla2_previous').html("<i class='glyphicon glyphicon-backward'></i>");
                                        $('.dataTables_filter input').attr('placeholder','Buscar..');

                                    }


                                    //    $("#altaCondPla").show();


                                });
                            //$("#condfech").removeAttr("hidden");
                            // $("#fechcamb").removeAttr("hidden");
                            //$("#cond").removeAttr("hidden");
                            //$("#fechacambio").removeAttr("hidden");

                            clickedElement.button('loading');
                            setTimeout(function () {
                                clickedElement.button('reset');
                                self.ListarReg.show(self.ListarServidorView) ;
                                if(self.ListarServidorView.collection.length!=0){
                                    $("#table-cond-pla").hide();
                                    $('#listar_servidores_cond_planilla').show();
                                }

                                //    $("#servidoresModal").modal();

                            },2000);
                            //descomentar lo de abajo si es que no funciona
                            /*      $("#table-cond-pla").hide();
                             $('#listar_servidores_cond_planilla').show();  */
                            this.listarServCondPlaReg.reset(this.listarServCondPlaView);
                            // $("#condFechCCP2").removeAttr("hidden","hidden");
                            // $("#fechCambCCP2").removeAttr("hidden","hidden");
                            // $("#condicion2").removeAttr("hidden","hidden");
                            // $("#fechaCambio2").removeAttr("hidden","hidden");
                            this.listarServCondPla2Reg.show(this.listarServCondPla2View);

                            // this.listarServCondPla2Reg.show(this.listarServCondPla2View)

                        }

                        clickedElement.button('loading');
                        setTimeout(function () {
                            clickedElement.button('reset');
                            self.ListarReg.show(self.ListarServidorView) ;
                            if(self.ListarServidorView.collection.length!=0){
                                $("#listar_servidores_cond_planilla").removeAttr("hidden","hidden")
                                $('#modal-altabaja').modal("hide");
                                $('#modal-altabaja2').modal("hide");
                            }

                            //    $("#servidoresModal").modal();

                        },2000);


                        //descomentar si es que lo no funciona el temporizador
                        /*    $("#listar_servidores_cond_planilla").removeAttr("hidden","hidden")
                         $('#modal-altabaja').modal("hide");
                         $('#modal-altabaja2').modal("hide");  */
                    }
                },

                desseleccionarOtrosCCP:function(){
                    $('.checkCCP').prop('checked',false); //desselecciona los otros check cuando selecciona todos
                },

                desseleccionarTodosCCP:function(){
                    $('.todosCCP').prop('checked',false);    //desselecciona todos cuando selecciona uno de los otros
                },

                desseleccionarBajas:function(){
                    $('.bajas').prop('checked',false); //desseleccionar las bajas seleccionadas
                },
                dessleccionarTodosBajas:function(){
                    $('.todosBajas').prop('checked',false); //desseleccionar todos
                },

                limpiarFinCCP:function(){
                    $('#ingres_fin_plani').val("");

                },

                limpiarIniCCP:function(){
                    $('#ingres_ini_plani').val("");
                },

                limpiarTodoCCP: function(){ //limpia todo con el boton de limpiar

                    $('#ingres_ini_plani').val("");
                    $('#ingres_fin_plani').val("");
                    $('#tipYestCCP').show();
                    $('#listar_servidores_cond_planilla').hide();
                    $('#datoServ').hide();
                    $('#tiposervidorpla').val("1");
                    $('#estadoservidorplani').val("99");

                    $('#dniServ').text("");
                    $('#nomServ').text("");
                    $('#codAnt').text("");
                    $('#estServ').text("");
                    $('#tipTrabCCP').text("");

                    $("#div_un_trabajador").hide();  //selecciono un trabajador -> muestra el boton para descargar de un trabajador
                    $("#div_todos_trabajadores").show(); //esconde el boton de descargar grupal



                    //segunda parte de jean 19-08-2014
                    $('#fechaFinCCP').hide();


                },

                descargarReportServUnCondPla:function(){

                    var usuario=$('#email').text();

                    var tipoTrabCond = $("#tiposervidorpla").val();
                    var estadoTrabCond = $("#estadoservidorplani").val();

                    var sanc_disc=$("#sanc_disc:checked").val();
                    var susp_ina=$("#susp_ina:checked").val();
                    var cese=$("#cese:checked").val();
                    var fallecido=$("#fall:checked").val();
                    var funmsm=$("#funms:checked").val();
                    var fplani=$("#fplani:checked").val();
                    var term_cont=$("#term_cont:checked").val();
                    var ren=$("#ren:checked").val();

                    var pen_susp =$("#pen_susp:checked").val();
                    var lsgh=$("#lsgh:checked").val();
                    var noRat=$("#noRat:checked").val();
                    var destac=$("#destac:checked").val();
                    var lcgh=$("#lcgh:checked").val();
                    var exclu=$("#exclu:checked").val();
                    var cadPen=$("#cadPen:checked").val();
                    //  var dni=clickedElement.children(':nth-child(2)').text();
                    var estCCP= $("#estServ").text();
                    var tipCCP= $("#tipTrabCCP").text();
                    var dniCCP=$("#dniServ").text();

                    if($("#estServ").text()=="" && $("#tipTrabCCP").text()=="" && $("#dniServ").text()==""){
                        estCCP="";
                        tipCCP="";
                        dniCCP="";
                    }

                    //  alert("estado trabajador:"+estCCP);
                    //  alert("tipo de trabajador:"+tipCCP);

                    var fInicioCCP=$("#ingres_ini_plani").val();
                    var fFinCCP=$("#ingres_fin_plani").val();

                    if(fInicioCCP!=""){
                        var anioIniCCP= fInicioCCP.substring(6)
                        var mesIniCCP=fInicioCCP.substring(3,5)
                    }
                    //si la fecha de inicio es vacia se pone una fecha por defecto
                    if(fInicioCCP==""){
                        var anioIniCCP=2000;
                        var mesIniCCP=01;
                    }
                    //lo mismo para la fecha fin
                    if(fFinCCP!=""){
                        var anioFinCCP=fFinCCP.substring(6)
                        var mesFinCCP=fFinCCP.substring(3,5)
                    }
                    if(fFinCCP==""){
                        var anioFinCCP=2050;
                        var mesFinCCP=12;
                    }


                    if($('input:radio[name=myradio]:checked').val()==1){
                        //  alert("usted selecciono un alta para un trabajador");
                        if(tipCCP!="" || estCCP!="" || dniCCP!=""){
                            var sanc_disc=$("#activo:checked").val();
                            var susp_ina=100;
                            var cese=100;
                            var fallecido=100;
                            var funmsm=100;
                            var fplani=100;
                            var term_cont=100;
                            var ren=100;

                            var pen_susp =100;
                            var lsgh=100;
                            var noRat=100;
                            var destac=100;
                            var lcgh=100;
                            var exclu=100;
                            var cadPen=100;

                            //CAMBIAR LA DESCRIPCION DEL TIPO DE TRABAJADOR POR EL CODIGO DEL TRABAJADOR
                            if(tipCCP=="DOCENTE"){var codTipCCP=1;}
                            if(tipCCP=="ADMINISTRATIVO"){var codTipCCP=2;}
                            if(tipCCP.indexOf("ADMINISTRATIVO")!=-1){var codTipCCP=2;}
                            if(tipCCP=="DOCENTE DEL MAGISTERIO"){var codTipCCP=3;}
                            if(tipCCP=="ADM. PROF. DE LA SALUD"){var codTipCCP=4;}
                            if(tipCCP=="OBRERO"){var codTipCCP=5;}
                            if(tipCCP=="SIN TIPO"){var codTipCCP=0;}
                            if(tipCCP=="DESIGNADO"){var codTipCCP=6;}
                            if(tipCCP=="DESIGNADO DOC. DEL MAGISTERIO"){var codTipCCP=7;}

                            //CAMBIAR LA DESCRIPCION DEL ESTADO DEL TRABAJADOR POR EL CODIGO DEL ESTADO DEL TRABAJADOR
                            if(estCCP=="PERMANENTE"){var codEstCCP=1;}
                            if(estCCP=="CONTRATADO"){var codEstCCP=2;}
                            if(estCCP=="CESANTE"){var codEstCCP=3;}
                            if(estCCP=="SNP"){var codEstCCP=4;}
                            if(estCCP=="SIN ESTADO"){var codEstCCP=0;}
                            if(estCCP=="CONTRATO PERSONAL"){var codEstCCP=5;}
                            if(estCCP=="CAS"){var codEstCCP=6;}
                            if(estCCP=="AMC"){var codEstCCP=7;}

                            $("#sanc_di_form").val(sanc_disc);
                            $("#susp_in_form").val(susp_ina);
                            $("#ces_form").val(cese);
                            $("#fallec_form").val(fallecido);
                            $("#fun_form").val(funmsm);
                            $("#fpla_form").val(fplani);
                            $("#term_con_form").val(term_cont);
                            $("#re_form").val(ren);
                            $("#pen_sus_form").val(pen_susp);
                            $("#lsgh_2_form").val(lsgh);
                            $("#noRa_form").val(noRat);
                            $("#desta_form").val(destac);
                            $("#lcgh_2_form").val(lcgh);
                            $("#excl_form").val(exclu);
                            $("#cadP_form").val(cadPen);

                            //jala el tipo y estado del trabajador pero del seleccionado de la tabla
                            $("#tiCCP_form").val(codTipCCP);
                            $("#estCCP_form").val(codEstCCP);

                            $("#anoIniCCP_form").val(anioIniCCP);
                            $("#meesIniCCP_form").val(mesIniCCP);
                            $("#anoFinCCP_form").val(anioFinCCP);
                            $("#meesFinCCP_form").val(mesFinCCP);

                            $("#dniCCP_form").val(dniCCP);
                        }
                    }

                    else if($('input:radio[name=myradio]:checked').val()==2){

                        //  alert("usted selecciono una baja para un trabajador");
                        if(tipCCP!="" || estCCP!="" || dniCCP!=""){   //quiere decir que selecciono un trabajador

                            if(sanc_disc==undefined && susp_ina==undefined && cese==undefined && fallecido==undefined
                                && funmsm==undefined && fplani==undefined && term_cont==undefined && ren==undefined
                                && pen_susp==undefined && lsgh==undefined && noRat==undefined && destac==undefined && lcgh==undefined
                                && exclu==undefined && cadPen==undefined){  // quiere decir que esta seleccionado todos.

                                var sanc_disc=$("#sanc_disc").val();
                                var susp_ina=$("#susp_ina").val();
                                var cese=$("#cese").val();
                                var fallecido=$("#fall").val();
                                var funmsm=$("#funms").val();
                                var fplani=$("#fplani").val();
                                var term_cont=$("#term_cont").val();
                                var ren=$("#ren").val();

                                var pen_susp =$("#pen_susp").val();
                                var lsgh=$("#lsgh").val();
                                var noRat=$("#noRat").val();
                                var destac=$("#destac").val();
                                var lcgh=$("#lcgh").val();
                                var exclu=$("#exclu").val();
                                var cadPen=$("#cadPen").val();

                                //CAMBIAR LA DESCRIPCION DEL TIPO DE TRABAJADOR POR EL CODIGO DEL TRABAJADOR
                                if(tipCCP=="DOCENTE"){var codTipCCP=1;}
                                if(tipCCP=="ADMINISTRATIVO"){var codTipCCP=2;}
                                if(tipCCP.indexOf("ADMINISTRATIVO")!=-1){var codTipCCP=2;}
                                if(tipCCP=="DOCENTE DEL MAGISTERIO"){var codTipCCP=3;}
                                if(tipCCP=="ADM. PROF. DE LA SALUD"){var codTipCCP=4;}
                                if(tipCCP=="OBRERO"){var codTipCCP=5;}
                                if(tipCCP=="SIN TIPO"){var codTipCCP=0;}
                                if(tipCCP=="DESIGNADO"){var codTipCCP=6;}
                                if(tipCCP=="DESIGNADO DOC. DEL MAGISTERIO"){var codTipCCP=7;}

                                //CAMBIAR LA DESCRIPCION DEL ESTADO DEL TRABAJADOR POR EL CODIGO DEL ESTADO DEL TRABAJADOR
                                if(estCCP=="PERMANENTE"){var codEstCCP=1;}
                                if(estCCP=="CONTRATADO"){var codEstCCP=2;}
                                if(estCCP=="CESANTE"){var codEstCCP=3;}
                                if(estCCP=="SNP"){var codEstCCP=4;}
                                if(estCCP=="SIN ESTADO"){var codEstCCP=0;}
                                if(estCCP=="CONTRATO PERSONAL"){var codEstCCP=5;}
                                if(estCCP=="CAS"){var codEstCCP=6;}
                                if(estCCP=="AMC"){var codEstCCP=7;}

                                $("#sanc_di_form").val(sanc_disc);
                                $("#susp_in_form").val(susp_ina);
                                $("#ces_form").val(cese);
                                $("#fallec_form").val(fallecido);
                                $("#fun_form").val(funmsm);
                                $("#fpla_form").val(fplani);
                                $("#term_con_form").val(term_cont);
                                $("#re_form").val(ren);
                                $("#pen_sus_form").val(pen_susp);
                                $("#lsgh_2_form").val(lsgh);
                                $("#noRa_form").val(noRat);
                                $("#desta_form").val(destac);
                                $("#lcgh_2_form").val(lcgh);
                                $("#excl_form").val(exclu);
                                $("#cadP_form").val(cadPen);

                                //jala el tipo y estado del trabajador pero del seleccionado de la tabla
                                $("#tiCCP_form").val(codTipCCP);
                                $("#estCCP_form").val(codEstCCP);

                                $("#anoIniCCP_form").val(anioIniCCP);
                                $("#meesIniCCP_form").val(mesIniCCP);
                                $("#anoFinCCP_form").val(anioFinCCP);
                                $("#meesFinCCP_form").val(mesFinCCP);

                                $("#dniCCP_form").val(dniCCP);

                                //   alert("datos: "+codTipCCP+" "+codEstCCP+" "+anioIniCCP+" "+anioFinCCP+" "+mesIniCCP+" "+mesFinCCP+" "+dniCCP);


                            }
                            else{ //  si selecciona una baja buscara solo por ese y a los demas les pondra 100

                                //    alert("entro al else snp"+snp)
                                //  alert("se selecciono una baja mostrar campo")

                                //comprueva si es o no indefinido para asignarle un valor grande y que no afecte en el IN()
                                if(susp_ina==undefined){ susp_ina=100;}
                                if(cese==undefined){cese=100;}
                                if(fallecido==undefined){fallecido=100;}
                                if(funmsm==undefined){funmsm=100;}
                                if(fplani==undefined){fplani=100;}
                                if(term_cont==undefined){term_cont=100;}
                                if(ren==undefined){ren=100;}
                                if(pen_susp==undefined){pen_susp=100;}
                                if(lsgh==undefined){lsgh=100;}
                                if(noRat==undefined){noRat=100;}
                                if(destac==undefined){destac=100;}
                                if(lcgh==undefined){lcgh=100;}
                                if(exclu==undefined){exclu=100;}
                                if(cadPen==undefined){cadPen=100;}
                                if(sanc_disc==undefined){sanc_disc=100;}



                                //CAMBIAR LA DESCRIPCION DEL TIPO DE TRABAJADOR POR EL CODIGO DEL TRABAJADOR
                                if(tipCCP=="DOCENTE"){var codTipCCP=1;}
                                if(tipCCP=="ADMINISTRATIVO"){var codTipCCP=2;}
                                if(tipCCP.indexOf("ADMINISTRATIVO")!=-1){var codTipCCP=2;}
                                if(tipCCP=="DOCENTE DEL MAGISTERIO"){var codTipCCP=3;}
                                if(tipCCP=="ADM. PROF. DE LA SALUD"){var codTipCCP=4;}
                                if(tipCCP=="OBRERO"){var codTipCCP=5;}
                                if(tipCCP=="SIN TIPO"){var codTipCCP=0;}
                                if(tipCCP=="DESIGNADO"){var codTipCCP=6;}
                                if(tipCCP=="DESIGNADO DOC. DEL MAGISTERIO"){var codTipCCP=7;}

                                //CAMBIAR LA DESCRIPCION DEL ESTADO DEL TRABAJADOR POR EL CODIGO DEL ESTADO DEL TRABAJADOR
                                if(estCCP=="PERMANENTE"){var codEstCCP=1;}
                                if(estCCP=="CONTRATADO"){var codEstCCP=2;}
                                if(estCCP=="CESANTE"){var codEstCCP=3;}
                                if(estCCP=="SNP"){var codEstCCP=4;}
                                if(estCCP=="SIN ESTADO"){var codEstCCP=0;}
                                if(estCCP=="CONTRATO PERSONAL"){var codEstCCP=5;}
                                if(estCCP=="CAS"){var codEstCCP=6;}
                                if(estCCP=="AMC"){var codEstCCP=7;}


                                $("#sanc_di_form").val(sanc_disc);
                                $("#susp_in_form").val(susp_ina);
                                $("#ces_form").val(cese);
                                $("#fallec_form").val(fallecido);
                                $("#fun_form").val(funmsm);
                                $("#fpla_form").val(fplani);
                                $("#term_con_form").val(term_cont);
                                $("#re_form").val(ren);
                                $("#pen_sus_form").val(pen_susp);
                                $("#lsgh_2_form").val(lsgh);
                                $("#noRa_form").val(noRat);
                                $("#desta_form").val(destac);
                                $("#lcgh_2_form").val(lcgh);
                                $("#excl_form").val(exclu);
                                $("#cadP_form").val(cadPen);

                                //jala el tipo y estado del trabajador pero del seleccionado de la tabla
                                $("#tiCCP_form").val(codTipCCP);
                                $("#estCCP_form").val(codEstCCP);

                                $("#anoIniCCP_form").val(anioIniCCP);
                                $("#meesIniCCP_form").val(mesIniCCP);
                                $("#anoFinCCP_form").val(anioFinCCP);
                                $("#meesFinCCP_form").val(mesFinCCP);

                                $("#dniCCP_form").val(dniCCP);
                                //  alert("datos: entro al else"+codTipCCP+" "+codEstCCP+" "+anioIniCCP+" "+anioFinCCP+" "+mesIniCCP+" "+mesFinCCP+" "+dniCCP);


                            }

                        }
                    }


                },

                descargarReportServCondPla: function(){
                    var usuario=$('#email').text();

                    var tipoTrabCond = $("#tiposervidorpla").val();
                    var estadoTrabCond = $("#estadoservidorplani").val();

                    var sanc_disc=$("#sanc_disc:checked").val();
                    var susp_ina=$("#susp_ina:checked").val();
                    var cese=$("#cese:checked").val();
                    var fallecido=$("#fall:checked").val();
                    var funmsm=$("#funms:checked").val();
                    var fplani=$("#fplani:checked").val();
                    var term_cont=$("#term_cont:checked").val();
                    var ren=$("#ren:checked").val();

                    var pen_susp =$("#pen_susp:checked").val();
                    var lsgh=$("#lsgh:checked").val();
                    var noRat=$("#noRat:checked").val();
                    var destac=$("#destac:checked").val();
                    var lcgh=$("#lcgh:checked").val();
                    var exclu=$("#exclu:checked").val();
                    var cadPen=$("#cadPen:checked").val();
                    //  var dni=clickedElement.children(':nth-child(2)').text();
                    var estCCP= $("#estServ").text();
                    var tipCCP= $("#tipTrabCCP").text();
                    var dniCCP=$("#dniServ").text();

                    if($("#estServ").text()=="" && $("#tipTrabCCP").text()=="" && $("#dniServ").text()==""){
                        estCCP="";
                        tipCCP="";
                        dniCCP="";
                    }

                    // alert("estado trabajador:"+estCCP);
                    // alert("tipo de trabajador:"+tipCCP);

                    var fInicioCCP=$("#ingres_ini_plani").val();
                    var fFinCCP=$("#ingres_fin_plani").val();

                    if(fInicioCCP!=""){
                        var anioIniCCP= fInicioCCP.substring(6)
                        var mesIniCCP=fInicioCCP.substring(3,5)
                    }
                    //si la fecha de inicio es vacia se pone una fecha por defecto
                    if(fInicioCCP==""){
                        var anioIniCCP=2000;
                        var mesIniCCP=01;
                    }
                    //lo mismo para la fecha fin
                    if(fFinCCP!=""){
                        var anioFinCCP=fFinCCP.substring(6)
                        var mesFinCCP=fFinCCP.substring(3,5)
                    }
                    if(fFinCCP==""){
                        var anioFinCCP=2050;
                        var mesFinCCP=12;
                    }



                    if($('input:radio[name=myradio]:checked').val()==1){  //quiere decir que selecciono alta
                        //  alert("usted selecciono alta");
                        if(fFinCCP==""){             //como siempre sera vacio entrara aca -> asignarle el valor de anio de inicio
                            var anioFinCCP=anioIniCCP;
                            var mesFinCCP=mesIniCCP;}
                        // alert("descargara por todos los trabajadores anio fin: "+anioFinCCP+" mes fin: "+mesFinCCP);
                        if(tipCCP=="" || estCCP=="" || dniCCP==""){

                            var sanc_disc=$("#activo:checked").val();
                            var susp_ina=100;
                            var cese=100;
                            var fallecido=100;
                            var funmsm=100;
                            var fplani=100;
                            var term_cont=100;
                            var ren=100;

                            var pen_susp =100;
                            var lsgh=100;
                            var noRat=100;
                            var destac=100;
                            var lcgh=100;
                            var exclu=100;
                            var cadPen=100;

                            var  valor1=sanc_disc;
                            var self=this;




                            //si deja el estado en todos entonces a cada item se le pasa un valor
                            if(estadoTrabCond==99){
                                var permCCP=1;
                                var contrat=2;
                                var cesa=3;
                                var snp=4;
                                var sinEst=0;
                                var contrPers=5;
                                var cas=7;
                                var amc=6;

                            }
                            //sino si selecciona diferente de todos entonces a todas las variables se le pasa el valor del seleccionado
                            if(estadoTrabCond!=99){
                                var permCCP=$("#estadoservidorplani").val();
                                var contrat=$("#estadoservidorplani").val();
                                var cesa=$("#estadoservidorplani").val();
                                var snp=$("#estadoservidorplani").val();
                                var sinEst=$("#estadoservidorplani").val();
                                var contrPers=$("#estadoservidorplani").val();
                                var cas=$("#estadoservidorplani").val();
                                var amc=$("#estadoservidorplani").val();
                            }

                            $("#sanc_disc_form").val(sanc_disc);
                            $("#susp_ina_form").val(susp_ina);
                            $("#cese_form").val(cese);
                            $("#fallecido_form").val(fallecido);
                            $("#funmsm_form").val(funmsm);
                            $("#fplani_form").val(fplani);
                            $("#term_cont_form").val(term_cont);
                            $("#ren_form").val(ren);
                            $("#pen_susp_form").val(pen_susp);
                            $("#lsgh_form").val(lsgh);
                            $("#noRat_form").val(noRat);
                            $("#destac_form").val(destac);
                            $("#lcgh_form").val(lcgh);
                            $("#exclu_form").val(exclu);
                            $("#cadPen_form").val(cadPen);

                            //jala el tipo y estado del trabajador pero de los combos
                            $("#tipCCP_form").val(tipoTrabCond);

                            $("#permCCP_form").val(permCCP);
                            $("#contrat_form").val(contrat);
                            $("#cesa_form").val(cesa);
                            $("#snp_form").val(snp);
                            $("#sinEst_form").val(sinEst);
                            $("#contrPers_form").val(contrPers);
                            $("#cas_form").val(cas);
                            $("#amc_form").val(amc);

                            $("#anioIniCCP_form").val(anioIniCCP);
                            $("#mesIniCCP_form").val(mesIniCCP);
                            $("#anioFinCCP_form").val(anioFinCCP);
                            $("#mesFinCCP_form").val(mesFinCCP);

                            //  alert("el tipo es: "+codTipCCP+" el estado es: "+codEstCCP)


                            //      }
                            //    else{ //  si selecciona una baja buscara solo por ese y a los demas les pondra 100

                            //  alert("entro al else snp"+snp)
                            /*      alert("se selecciono una baja mostrar campo")

                             //comprueba si es o no indefinido para asignarle un valor grande y que no afecte en el IN()
                             if(susp_ina==undefined){ susp_ina=100;}
                             if(cese==undefined){cese=100;}
                             if(fallecido==undefined){fallecido=100;}
                             if(funmsm==undefined){funmsm=100;}
                             if(fplani==undefined){fplani=100;}
                             if(term_cont==undefined){term_cont=100;}
                             if(ren==undefined){ren=100;}
                             if(pen_susp==undefined){pen_susp=100;}
                             if(lsgh==undefined){lsgh=100;}
                             if(noRat==undefined){noRat=100;}
                             if(destac==undefined){destac=100;}
                             if(lcgh==undefined){lcgh=100;}
                             if(exclu==undefined){exclu=100;}
                             if(cadPen==undefined){cadPen=100;}
                             if(sanc_disc==undefined){sanc_disc=100;}


                             //si deja el estado en todos entonces a cada item se le pasa un valor
                             if(estadoTrabCond==99){
                             var permCCP=1;
                             var contrat=2;
                             var cesa=3;
                             var snp=4;
                             var sinEst=0;
                             var contrPers=5;
                             var cas=7;
                             var amc=6;

                             }
                             //sino si selecciona diferente de todos entonces a todas las variables se le pasa el valor del seleccionado
                             if(estadoTrabCond!=99){
                             var permCCP=$("#estadoservidorplani").val();
                             var contrat=$("#estadoservidorplani").val();
                             var cesa=$("#estadoservidorplani").val();
                             var snp=$("#estadoservidorplani").val();
                             var sinEst=$("#estadoservidorplani").val();
                             var contrPers=$("#estadoservidorplani").val();
                             var cas=$("#estadoservidorplani").val();
                             var amc=$("#estadoservidorplani").val();
                             }

                             $("#sanc_disc_form").val(sanc_disc);
                             $("#susp_ina_form").val(susp_ina);
                             $("#cese_form").val(cese);
                             $("#fallecido_form").val(fallecido);
                             $("#funmsm_form").val(funmsm);
                             $("#fplani_form").val(fplani);
                             $("#term_cont_form").val(term_cont);
                             $("#ren_form").val(ren);
                             $("#pen_susp_form").val(pen_susp);
                             $("#lsgh_form").val(lsgh);
                             $("#noRat_form").val(noRat);
                             $("#destac_form").val(destac);
                             $("#lcgh_form").val(lcgh);
                             $("#exclu_form").val(exclu);
                             $("#cadPen_form").val(cadPen);

                             //jala el tipo y estado del trabajador pero de los combos
                             $("#tipCCP_form").val(tipoTrabCond);

                             $("#permCCP_form").val(permCCP);
                             $("#contrat_form").val(contrat);
                             $("#cesa_form").val(cesa);
                             $("#snp_form").val(snp);
                             $("#sinEst_form").val(sinEst);
                             $("#contrPers_form").val(contrPers);
                             $("#cas_form").val(cas);
                             $("#amc_form").val(amc);

                             $("#anioIniCCP_form").val(anioIniCCP);
                             $("#mesIniCCP_form").val(mesIniCCP);
                             $("#anioFinCCP_form").val(anioFinCCP);
                             $("#mesFinCCP_form").val(mesFinCCP);


                             alert("estado descripcip: "+estCCP+" codigo estado: "+codEstCCP+" tipo descripcion: "+tipCCP+" codigo tipo: "+codTipCCP);  */
                            // }


                            //$.ajax({
                            //   type: 'GET',
                            // url: '/api/reportes/condicionplanilla/reportecondplanilla/pdf/'+sanc_disc+'/'+susp_ina+'/'+cese+'/'+fallecido+'/'+funmsm+'/'+fplani+'/'+term_cont+'/'+ren+'/'+pen_susp+'/'+lsgh+'/'+noRat+'/'+destac+'/'+lcgh+'/'+exclu+'/'+cadPen
                            // });
                            // this.model.get("reporteResolAsoc").url = "rest/reportes/resoluciones/reporteresoluciones/pdf/"+this.rep_cod_serv+"/"+this.rep_numserest_serv+"/"+this.rep_nomb_serv+"/"+this.rep_cod_serv+"/"+usuario;
                            // var fetch_s = this.model.get("reporteResolAsoc").fetch({ data: $.param({"codigo": this.rep_cod_serv,"numserest":this.rep_numserest_serv,"nom_serv":this.rep_nomb_serv,"cod_serv":this.rep_cod_serv,"usuario":usuario}) });
                        }


                    }

                    else if($('input:radio[name=myradio]:checked').val()==2)  {

                        // alert("usted selecciono baja");
                        if(fFinCCP==""){             //como siempre sera vacio entrara aca -> asignarle el valor de anio de inicio
                            var anioFinCCP=anioIniCCP;
                            var mesFinCCP=mesIniCCP;}
                        // alert("descargara por todos los trabajadores anio fin: "+anioFinCCP+" mes fin: "+mesFinCCP);
                        if(tipCCP=="" || estCCP=="" || dniCCP==""){  //quiere decir que buscara por todos los trabajadores

                            //aqui hay dos opciones 1) que seleccione todas las bajas 2)seleccione algunas bajas
                            if(sanc_disc==undefined && susp_ina==undefined && cese==undefined && fallecido==undefined
                                && funmsm==undefined && fplani==undefined && term_cont==undefined && ren==undefined
                                && pen_susp==undefined && lsgh==undefined && noRat==undefined && destac==undefined && lcgh==undefined
                                && exclu==undefined && cadPen==undefined){  // quiere decir que esta seleccionado todos.

                                var sanc_disc=$("#sanc_disc").val();
                                var susp_ina=$("#susp_ina").val();
                                var cese=$("#cese").val();
                                var fallecido=$("#fall").val();
                                var funmsm=$("#funms").val();
                                var fplani=$("#fplani").val();
                                var term_cont=$("#term_cont").val();
                                var ren=$("#ren").val();

                                var pen_susp =$("#pen_susp").val();
                                var lsgh=$("#lsgh").val();
                                var noRat=$("#noRat").val();
                                var destac=$("#destac").val();
                                var lcgh=$("#lcgh").val();
                                var exclu=$("#exclu").val();
                                var cadPen=$("#cadPen").val();

                                var  valor1=sanc_disc;
                                var self=this;




                                //si deja el estado en todos entonces a cada item se le pasa un valor
                                if(estadoTrabCond==99){
                                    var permCCP=1;
                                    var contrat=2;
                                    var cesa=3;
                                    var snp=4;
                                    var sinEst=0;
                                    var contrPers=5;
                                    var cas=7;
                                    var amc=6;

                                }
                                //sino si selecciona diferente de todos entonces a todas las variables se le pasa el valor del seleccionado
                                if(estadoTrabCond!=99){
                                    var permCCP=$("#estadoservidorplani").val();
                                    var contrat=$("#estadoservidorplani").val();
                                    var cesa=$("#estadoservidorplani").val();
                                    var snp=$("#estadoservidorplani").val();
                                    var sinEst=$("#estadoservidorplani").val();
                                    var contrPers=$("#estadoservidorplani").val();
                                    var cas=$("#estadoservidorplani").val();
                                    var amc=$("#estadoservidorplani").val();
                                }

                                $("#sanc_disc_form").val(sanc_disc);
                                $("#susp_ina_form").val(susp_ina);
                                $("#cese_form").val(cese);
                                $("#fallecido_form").val(fallecido);
                                $("#funmsm_form").val(funmsm);
                                $("#fplani_form").val(fplani);
                                $("#term_cont_form").val(term_cont);
                                $("#ren_form").val(ren);
                                $("#pen_susp_form").val(pen_susp);
                                $("#lsgh_form").val(lsgh);
                                $("#noRat_form").val(noRat);
                                $("#destac_form").val(destac);
                                $("#lcgh_form").val(lcgh);
                                $("#exclu_form").val(exclu);
                                $("#cadPen_form").val(cadPen);

                                //jala el tipo y estado del trabajador pero de los combos
                                $("#tipCCP_form").val(tipoTrabCond);

                                $("#permCCP_form").val(permCCP);
                                $("#contrat_form").val(contrat);
                                $("#cesa_form").val(cesa);
                                $("#snp_form").val(snp);
                                $("#sinEst_form").val(sinEst);
                                $("#contrPers_form").val(contrPers);
                                $("#cas_form").val(cas);
                                $("#amc_form").val(amc);

                                $("#anioIniCCP_form").val(anioIniCCP);
                                $("#mesIniCCP_form").val(mesIniCCP);
                                $("#anioFinCCP_form").val(anioFinCCP);
                                $("#mesFinCCP_form").val(mesFinCCP);

                                //  alert("el tipo es: "+codTipCCP+" el estado es: "+codEstCCP)


                            }
                            else{ //  si selecciona una baja buscara solo por ese y a los demas les pondra 100

                                //  alert("entro al else snp"+snp)
                                //  alert("se selecciono una baja mostrar campo")

                                //comprueba si es o no indefinido para asignarle un valor grande y que no afecte en el IN()
                                if(susp_ina==undefined){ susp_ina=100;}
                                if(cese==undefined){cese=100;}
                                if(fallecido==undefined){fallecido=100;}
                                if(funmsm==undefined){funmsm=100;}
                                if(fplani==undefined){fplani=100;}
                                if(term_cont==undefined){term_cont=100;}
                                if(ren==undefined){ren=100;}
                                if(pen_susp==undefined){pen_susp=100;}
                                if(lsgh==undefined){lsgh=100;}
                                if(noRat==undefined){noRat=100;}
                                if(destac==undefined){destac=100;}
                                if(lcgh==undefined){lcgh=100;}
                                if(exclu==undefined){exclu=100;}
                                if(cadPen==undefined){cadPen=100;}
                                if(sanc_disc==undefined){sanc_disc=100;}


                                //si deja el estado en todos entonces a cada item se le pasa un valor
                                if(estadoTrabCond==99){
                                    var permCCP=1;
                                    var contrat=2;
                                    var cesa=3;
                                    var snp=4;
                                    var sinEst=0;
                                    var contrPers=5;
                                    var cas=7;
                                    var amc=6;

                                }
                                //sino si selecciona diferente de todos entonces a todas las variables se le pasa el valor del seleccionado
                                if(estadoTrabCond!=99){
                                    var permCCP=$("#estadoservidorplani").val();
                                    var contrat=$("#estadoservidorplani").val();
                                    var cesa=$("#estadoservidorplani").val();
                                    var snp=$("#estadoservidorplani").val();
                                    var sinEst=$("#estadoservidorplani").val();
                                    var contrPers=$("#estadoservidorplani").val();
                                    var cas=$("#estadoservidorplani").val();
                                    var amc=$("#estadoservidorplani").val();
                                }

                                $("#sanc_disc_form").val(sanc_disc);
                                $("#susp_ina_form").val(susp_ina);
                                $("#cese_form").val(cese);
                                $("#fallecido_form").val(fallecido);
                                $("#funmsm_form").val(funmsm);
                                $("#fplani_form").val(fplani);
                                $("#term_cont_form").val(term_cont);
                                $("#ren_form").val(ren);
                                $("#pen_susp_form").val(pen_susp);
                                $("#lsgh_form").val(lsgh);
                                $("#noRat_form").val(noRat);
                                $("#destac_form").val(destac);
                                $("#lcgh_form").val(lcgh);
                                $("#exclu_form").val(exclu);
                                $("#cadPen_form").val(cadPen);

                                //jala el tipo y estado del trabajador pero de los combos
                                $("#tipCCP_form").val(tipoTrabCond);

                                $("#permCCP_form").val(permCCP);
                                $("#contrat_form").val(contrat);
                                $("#cesa_form").val(cesa);
                                $("#snp_form").val(snp);
                                $("#sinEst_form").val(sinEst);
                                $("#contrPers_form").val(contrPers);
                                $("#cas_form").val(cas);
                                $("#amc_form").val(amc);

                                $("#anioIniCCP_form").val(anioIniCCP);
                                $("#mesIniCCP_form").val(mesIniCCP);
                                $("#anioFinCCP_form").val(anioFinCCP);
                                $("#mesFinCCP_form").val(mesFinCCP);


                                //  alert("estado descripcip: "+estCCP+" codigo estado: "+codEstCCP+" tipo descripcion: "+tipCCP+" codigo tipo: "+codTipCCP);
                            }


                            //$.ajax({
                            //   type: 'GET',
                            // url: '/api/reportes/condicionplanilla/reportecondplanilla/pdf/'+sanc_disc+'/'+susp_ina+'/'+cese+'/'+fallecido+'/'+funmsm+'/'+fplani+'/'+term_cont+'/'+ren+'/'+pen_susp+'/'+lsgh+'/'+noRat+'/'+destac+'/'+lcgh+'/'+exclu+'/'+cadPen
                            // });
                            // this.model.get("reporteResolAsoc").url = "rest/reportes/resoluciones/reporteresoluciones/pdf/"+this.rep_cod_serv+"/"+this.rep_numserest_serv+"/"+this.rep_nomb_serv+"/"+this.rep_cod_serv+"/"+usuario;
                            // var fetch_s = this.model.get("reporteResolAsoc").fetch({ data: $.param({"codigo": this.rep_cod_serv,"numserest":this.rep_numserest_serv,"nom_serv":this.rep_nomb_serv,"cod_serv":this.rep_cod_serv,"usuario":usuario}) });
                        }
                    }
                }   //ACA TERMINA








            });
        });
        return ErzaManager.ReportesApp.Form.View;
    });


