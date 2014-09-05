define(["app", "hbs!apps/contratosCas/contratos/templates/inicio_contratos","apps/contratosCas/contratos/view/listar_servidorCas" ,  "apps/contratosCas/contratos/view/listar_cargos" ,
    "apps/contratosCas/contratos/view/listar_plazas" ,
    "apps/contratosCas/contratos/model/update_plazas",
    "apps/contratosCas/contratos/model/insert_contrato_adendas",
    "apps/contratosCas/contratos/model/insert_plazas_historial",
    "apps/contratosCas/contratos/model/ver_servidor_item",
    "apps/contratosCas/contratos/model/update_servidor_item",
    "apps/contratosCas/contratos/model/insert_servidor_item",
    "backbone-validation","jquery","lib/jquery.dataTables.min","lib/bootstrap-datepicker","lib/jquery.numeric","bootstrap"],
    function (ErzaManager,inicio_contratosTemp,ListarServidorCasView,
    ListarCargosView, ListarPlazasView,
    updatePlazasModel, insertContratoAdendasModel, insertPlazasHistorialModel,ver_servidor_itemModel, updateServidorItemModel, insertServidorItemModel) {

    ErzaManager.module('ContratosApp.Form.View', function (View, ErzaManager, Backbone, Marionette, $, _) {

        View.Layout = Marionette.Layout.extend({
            template: inicio_contratosTemp,
            ListarServidorCasView: new ListarServidorCasView(),
            ListarCargosView:new ListarCargosView(),
            ListarPlazasView:new ListarPlazasView(),

            //Variables
            tipo:"",
            descTipo:"",
            udid:"",
            dep:"",
            numserest:"",
            dni:"",
            codigo:"",
            nombre:"",
            idCargo:"",
            cargo:"",
            idPlaza:"",
            plaza:"",
            sueldo:"",




            regions: {

                ListarReg: "#servidoresCasModal",
                ListarCarg:"#cargosModal",
                ListarPlaz:"#plazasModal"

            },

            events: {
                "click #list_serv_cas": "llamarModalListarServCas",
                "dblclick #tabla > tbody > tr ":"seleccionarServidor",
                "click #ingres_ini_show": "show_fecha_ini",
                "click #ingres_fin_show": "show_fecha_fin",
                "click #ingres_ini_clos":"limpiarFechaIni",
                "click #ingres_fin_clos":"limpiarFechaFin",
                "click #buscarCargo":"llamarModalListarCargos",
                "click #buscarPlazas":"llamarModalListarPlazas",
                "dblclick #tabla-cargos > tbody > tr ":"seleccionarCargo",
                "dblclick #tabla-plazas > tbody > tr ":"seleccionarPlaza",
                "click #btn_limpiar": "limpiarFormulario",
                "click #btn_guardar_cont": "validarGuardado"
            },

            initialize: function () {
                updatePlazasModel
                //initialize model
                this.model = new Backbone.Model();

                this.model.set({
                    "updatePlazas": new updatePlazasModel(),
                    "insertContratoAdendas": new insertContratoAdendasModel(),
                    "insertPlazasHist":new insertPlazasHistorialModel(),
                    "verServidorItem":new ver_servidor_itemModel(),
                    "updateServidorItem":new updateServidorItemModel(),
                    "insertServidorItem":new insertServidorItemModel()


                });


            },

            onRender: function () {
                this.initialFetch();
                this.ListarPlaz.show(this.ListarPlazasView);

            },

            initialFetch: function(){
                this.ListarServidorCasView.fetchServCas();
                this.ListarCargosView.fetchCargos();
                //this.ListarPlazasView.fetchPlazas();



            },



            llamarModalListarServCas: function(ev){

                var self=this;
                var clickedElement=$(ev.currentTarget);

                clickedElement.button('loading');

                setTimeout(function () {
                    clickedElement.button('reset');
                    self.ListarReg.show(self.ListarServidorCasView) ;

                    if(self.ListarServidorCasView.collection.length!=0){
                        $("#tabla").dataTable();

                        $('#tabla_wrapper').append("<div id='footer-table'></div>");
                        $('#tabla_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                        $('#tabla_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                        $('.dataTables_filter input').attr('placeholder','Buscar..');
                    }


                    $("#servidoresCasModal").modal();

                },2000);


            },

            seleccionarServidor:function(ee){
                $("#exito").hide();
                var self=this;
                $("#datoServCas").show();
                var clickedElement=$(ee.currentTarget);

                this.nombre=clickedElement.children(':nth-child(1)').text();
                this.dni=clickedElement.children(':nth-child(2)').text();
                this.descTipo=clickedElement.children(':nth-child(3)').text();
                this.dep=clickedElement.children(':nth-child(4)').text();
                this.numserest=clickedElement.children(':nth-child(5)').text();
                this.tipo=clickedElement.attr("data");
                this.udid=clickedElement.attr("data1");
                this.codigo=clickedElement.attr("data2");

                //alert("numserest: "+this.numserest+" tipo: "+this.tipo+" udid: "+this.udid+" codigo: "+this.codigo);

                $("#dniServ").text(this.dni);
                $('#nomServ').text(this.nombre);
                $('#tipServ').text(this.descTipo);
                $('#depServ').text(this.dep);


                $("#servidoresCasModal").modal('hide');

            },

            //fechas

            show_fecha_ini: function () {


                var ingres_fecha_ini = $('#fecha_ini_cont');

                ingres_fecha_ini.datepicker({
                    format: 'dd/mm/yyyy',
                    viewMode: 2
                });

                ingres_fecha_ini.datepicker('show');


            },

            show_fecha_fin: function () {


                var ingres_fecha_fin = $('#fecha_fin_cont');

                ingres_fecha_fin.datepicker({
                    format: 'dd/mm/yyyy',
                    viewMode: 2
                });

                ingres_fecha_fin.datepicker('show');


            },

            limpiarFechaIni:function(){
                $("#fecha_ini_cont").val("");
            },

            limpiarFechaFin:function(){
                $("#fecha_fin_cont").val("");
            },

            //Cargos

            llamarModalListarCargos: function(ev){

                var self=this;

                var clickedElement=$(ev.currentTarget);

                clickedElement.button('loading');

                setTimeout(function () {
                    clickedElement.button('reset');

                    self.ListarCarg.show(self.ListarCargosView) ;

                    if(self.ListarCargosView.collection.length!=0){
                        $("#tabla-cargos").dataTable({
                            "bJQueryUI": false,
                            "bPaginate":true,
                            "bLengthChange": false
                        });

                        $("#tabla-cargos").dataTable();

                        $('#tabla-cargos_wrapper').append("<div id='footer-table'></div>");
                        $('#tabla-cargos_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                        $('#tabla-cargos_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                        $('.dataTables_filter input').attr('placeholder','Buscar..');
                    }
                    else{
                        //alert("no hay data");
                    }

                    $("#cargosModal").modal();

                },1000);


            },

            seleccionarCargo:function(ee){
                var self=this;

                var clickedElement=$(ee.currentTarget);
                this.idCargo=clickedElement.attr("data3");
                this.cargo=clickedElement.children(':nth-child(1)').text();
                $("#cargo").val(this.cargo);

               // alert("id: "+this.idCargo+" cargo: "+this.cargo);
                $("#cargosModal").modal('hide');
            },



            //Plazas

            llamarModalListarPlazas: function(ev){

                var self=this;

                var clickedElement=$(ev.currentTarget);

                clickedElement.button('loading');


                this.ListarPlazasView.fetchPlazas(this.udid,function () {


                    if(self.ListarPlazasView.collection.length!=0){
                        $("#tabla-plazas").dataTable({
                            "bJQueryUI": false,
                            "bPaginate":true,
                            "bLengthChange": false
                        });

                        $("#tabla-plazas").dataTable();

                        $('#tabla-plazas_wrapper').append("<div id='footer-table'></div>");
                        $('#tabla-plazas_next').html("<i  class='glyphicon glyphicon-forward'></i>");
                        $('#tabla-plazas_previous').html("<i class='glyphicon glyphicon-backward'></i>");

                        $('.dataTables_filter input').attr('placeholder','Buscar..');
                    }


                });
                this.ListarPlaz.show(this.ListarPlazasView) ;
                setTimeout(function () {
                    clickedElement.button('reset');
                    $("#plazasModal").modal();

                },1000);

            },

            seleccionarPlaza:function(ee){
                var self=this;

                var clickedElement=$(ee.currentTarget);
                this.idPlaza=clickedElement.attr("data4");
                this.plaza=clickedElement.children(':nth-child(1)').text();
                $("#plaza").val(this.plaza);

                //alert("id: "+this.idPlaza+" plaza: "+this.plaza);
                $("#plazasModal").modal('hide');
            },

            limpiarFormulario:function(){
                //escaondiendo el div y limpiando campos de datos del servidor
                $("#datoServCas").hide();
                $("#dniServ").text("");
                $('#nomServ').text("");
                $('#tipServ').text("");
                $('#depServ').text("");

                //limpiando los campos del formulario
                $("#numCont").val("");
                $("#tipoCont").val("2");
                $("#fecha_ini_cont").val("");
                $("#fecha_fin_cont").val("");
                $("#numHoras").val("");
                $("#sueldo").val("");
                $("#cargo").val("");
                $("#plaza").val("");

                //esconder mensajes
                $("#errorFech").hide();
                $("#camposOblig").hide();
                $("#exito").hide();

            },

            /////////////////////////////
            validarGuardado:function(){
                //this.guardar();
                 //Validando Campos Obligatorios
                 if($("#numCont").val()==""){
                 $("#camposOblig").show();
                 }else{
                 if($("#tipoCont").val()==""){
                 $("#camposOblig").show();
                 } else{
                 if($("#fecha_ini_cont").val()==""){
                 $("#camposOblig").show();
                 }else{
                 if($("#fecha_fin_cont").val()==""){
                 $("#camposOblig").show();
                 } else{
                 if($("#numHoras").val()==""){
                 $("#camposOblig").show();
                 } else{
                 if($("#sueldo").val()==""){
                 $("#camposOblig").show();
                 } else{
                 if($("#cargo").val()==""){
                 $("#camposOblig").show();
                 }else{
                 if($("#plaza").val()==""){
                 $("#camposOblig").show();
                 }else{
                 //Validando Fechas
                 var iniMes= $('#fecha_ini_cont').val().substring(3,5) ;
                 var iniDia = $('#fecha_ini_cont').val().substring(0, 2);
                 var iniAno = $('#fecha_ini_cont').val().substring(6, 10);
                 var finMes = $('#fecha_fin_cont').val().substring(3, 5);
                 var finDia = $('#fecha_fin_cont').val().substring(0, 2);
                 var finAno = $('#fecha_fin_cont').val().substring(6, 10);
                 //alert(iniMes);

                 if(iniAno<finAno){
                // alert("fechas correctas");

                 //llamar al guardado
                 this.guardar();


                 } else{
                         if(iniAno==finAno) {
                                             if(finMes>iniMes){
                                                // alert("año igual y mes del fin mayor...ok")

                                                 //llamar al guardado
                                                 this.guardar();

                                             }else{
                                                     if(finMes==iniMes){
                                                             if(finDia>iniDia){
                                                             //alert("año igual, mes igual....y dia del fin mayor...ok")

                                                             //llamar al guardado
                                                             this.guardar();

                                                             }else  {
                                                                        //alert("ini mayor que fin")
                                                                        $("#errorFech").show();

                                                                     }
                                                    } else{
                                                            // alert("inicio mayor que fin")
                                                             $("#errorFech").show();
                                                          }
                                                   }
                         }else{
                                //alert("inicio es mayor")
                                 $("#errorFech").show();
                              }
                       }

                 }
                 }
                 }} } }} }
            },

            guardar:function(){
                var self=this;

                // alert("entro a guardar")
                 //alert("plaza q entra: "+self.idPlaza)
                 // var id=this.idPlaza
                 //update en la tabla plazas
                // alert("update plazas");
                 self.model.get("updatePlazas").set({
                 "id":  self.idPlaza

                 })

                 self.model.get("updatePlazas").url = 'api/contratosCas/updatePlazas';

                 var self_s = self.model.get("updatePlazas").save({}, {wait: true});


                 self_s.done(function () {
                 });

                 self_s.fail(function () {
                 });

                //insert en la tabla contrato_adendas
               // alert("insert contrato_adenda");
                var contrato=  $("#numCont").val();
                var fIni=$("#fecha_ini_cont").val();
                var fFin=$("#fecha_fin_cont").val();

                var tip= $("#tipoCont").val();
                        var tipito="";
                        if(tip==1){
                           tipito="DOCENTE"
                        }else{
                            tipito="ADMINISTRATIVO"
                        }

                var hor=$("#numHoras").val();
                var monto= $("#sueldo").val();
                self.sueldo=monto;

               // alert("contrato: "+contrato+"inicio: "+fIni+"fin: "+fFin+"tipo: "+tip+"hora: "+hor+"monto: "+monto+ "udid: "+self.udid+"dni: "+self.dni+ "numserest: "+self.numserest);
                self.model.get("insertContratoAdendas").set({

                    "contrato": contrato ,
                    "fechaIni": fIni,
                    "fechaFin": fFin,
                    "horas": hor,
                    "tipoServ": tipito,
                    "udId": self.udid,
                    "idCargo": self.idCargo,
                    "dniServ": self.dni,
                    "montoServ": monto,
                    "num_serest": self.numserest



                })

                self.model.get("insertContratoAdendas").url = 'api/contratosCas/insertContAdendas';
               // alert("antes")        ;

                var self_s = self.model.get("insertContratoAdendas").save({}, {wait: true});
               // alert("des")        ;

                self_s.done(function () {
                });

                self_s.fail(function () {
                });


                setTimeout(function(){
                 //insertar en tabla Plaza Historial


                 self.model.get("insertPlazasHist").set({
                 "id": self.idPlaza

                 })
                 self.model.get("insertPlazasHist").url='api/contratosCas/insertPlazasHist';
                 var self_s=self.model.get("insertPlazasHist").save({}, {wait: true});
                 self_s.done(function(){

                 });

                 self_s.fail(function(){

                 });

                }, 1000);
                 //verificando si ya existe en la tabla servidor item fijo            verServidorItem
                 self.model.get("verServidorItem").url = "api/contratosCas/verServItem/" + self.dni + "/"+self.numserest ;
                // alert("antes"+self.dni+" - "+self.numserest)
                 var fetch_s = self.model.get("verServidorItem").fetch({ data: $.param({"codigo": self.dni },{"num_serest": self.numserest}) });

                 fetch_s.done(function () {    /////////////////// //existe registro entonces update al monto
                // alert("done monto :"+self.model.get("verServidorItem").get("monto1"))  ;

                // alert("entro update servidorItem");
                 self.model.get("updateServidorItem").set({
                 "codigo":  self.dni,
                 "num_serest": self.numserest,
                 "monto1": self.sueldo

                 })

                 self.model.get("updateServidorItem").url = 'api/contratosCas/updateServItem';
                // alert("antes up serv_item")

                 var self_s = self.model.get("updateServidorItem").save({}, {wait: true});
                 //alert("des up serv_item")

                 self_s.done(function () {
                 });

                 self_s.fail(function () {
                 });

                 });
                 fetch_s.fail(function () {   ////////////////////////////// no existe registro entonces insert
                // alert("fail monto :"+self.model.get("verServidorItem").get("monto1"))  ;

                // alert("entro insert servidorItem");
                 self.model.get("insertServidorItem").set({
                 "codigo":  self.dni,
                 "num_serest": self.numserest,
                 "monto1": self.sueldo

                 })

                 self.model.get("insertServidorItem").url = 'api/contratosCas/insertServItem';
                // alert("antes add serv_item")

                 var self_s = self.model.get("insertServidorItem").save({}, {wait: true});
                 //alert("des add serv_item")

                 self_s.done(function () {
                 });

                 self_s.fail(function () {
                 });

                 });


                /////////////         Exito       /////////////////
                setTimeout(function () {
                    $("#exito").show();
                    //escaondiendo el div y limpiando campos de datos del servidor
                    $("#datoServCas").hide();
                    $("#dniServ").text("");
                    $('#nomServ').text("");
                    $('#tipServ').text("");
                    $('#depServ').text("");

                    //limpiando los campos del formulario
                    $("#numCont").val("");
                    $("#tipoCont").val("2");
                    $("#fecha_ini_cont").val("");
                    $("#fecha_fin_cont").val("");
                    $("#numHoras").val("");
                    $("#sueldo").val("");
                    $("#cargo").val("");
                    $("#plaza").val("");
                },1000);




            }


        });
    });
    return ErzaManager.ContratosApp.Form.View;
});

