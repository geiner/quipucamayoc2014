define(["app", "hbs!apps/planillas/list/templates/planillasLayout","apps/planillas/list/view/planillasCAS-select","apps/planillas/list/model/envioacontrolprevio",
    "apps/planillas/list/model/aperturadeplanilla","apps/planillas/list/view/servidoresCAS-table","apps/planillas/list/view/origenes-select",
    "apps/planillas/list/view/unidades-dialog","bootstrap"],
    function (ErzaManager, layoutTpl,PlanillasCASSelectView,EnvioaControlPrevio,AperturaPlanilla,ServidoresCASView,OrigenesSelectView,UnidadesDialogView,$) {

    ErzaManager.module('PlanillasApp.List.View', function (View, ErzaManager, Backbone, Marionette, $, _) {

        View.Layout = Marionette.Layout.extend({
            template: layoutTpl,

            planillasCASSelectView: new PlanillasCASSelectView(),
            servidoresCASView: new ServidoresCASView(),
            origenesSelectView: new OrigenesSelectView(),
            unidadesDialog: new UnidadesDialogView(),

            //variables
            anio: 2013,
            mes: 2,
            servidoresSeleccionados: [],
            numerodePlanillas: [],
            planillasCorrelativo: [],
            unidadSelected: {
                unidadId:10225,
                unidadDesc:"C0319 - PROYECTO QUIPUCAMAYOC"
            },
            unidadClicked: {
                unidadId:10002,
                unidadDesc:"UNMSM"
            },
            elementoClickeado: null,

            planillaCASSelected: null,

            //regiones para los view
            regions: {
                origenesSelect: "#origenes",
                planillasCASSelectRegion: "#planillas",
                tablaServidores: "#tabla-servidores",
                unidadesModal: "#modal-unidades"
            },

            //eventos dentro de layout
            events: {
                "click #a-modal":"invokeModal",
                "click .tree li": "clickUnidades",
                "click #boton-unidad":"cambioUnidad",
                "click #select-all":"seleccionarTodosLosServidores",
                "click .table > tbody > tr ": "clickServidorRow",
                "change #select-anio":"cambioAnio",
                "change #select-planillasCAS":"cambioPlanilla",
                "change #select-mes":"cambioMes",
                "click #boton-reporte-conformidad":"enviarServidoresParaReporteConformidad",
                "click #boton-reporte-pagos":"enviarServidoresParaReportePagos",
                "click #apertura_planilla":"crearNuevaPlanilla",
                "click #boton-enviar-control-previo":"enviaracontrolprevio"

            },

            //inicializa el layout
            onRender: function(){
                this.initialFetch();
                console.log(this.unidadSelected.unidadDesc) ;
//                $('#desc-unidad').text(this.unidadSelected.unidadDesc);
                this.origenesSelect.show(this.origenesSelectView);
                this.planillasCASSelectRegion.show(this.planillasCASSelectView);
                this.tablaServidores.show(this.servidoresCASView);
//                $("#unidadId").val(this.unidadSelected.unidadId);
//                $("#unidadId_pago").val(this.unidadSelected.unidadId);
//                $("#uddesc").val(this.unidadSelected.unidadDesc);
//                $("#uddesc_pago").val(this.unidadSelected.unidadDesc);
//                $("#origen").val(this.origenesSelectView.collection.at(0).get("origenCodigo"));
//                $("#planilla").val();
//                $("#planilla_pago").val();
            },

            initialize: function () {

                //initialize model
                this.model = new Backbone.Model();

                this.model.set({
                    "aperturadeplanilla": new AperturaPlanilla(),
                    "envioacontrolprevio": new EnvioaControlPrevio
                });
            },

            initialFetch: function(){


                var self=this;
               // alert("id:"+this.unidadSelected.unidadId);
               /* this.origenesSelectView.fetchOrigenes(this.unidadSelected.unidadId);
                var fetch=this.planillasCASSelectView.fetchPlanillasCAS(this.anio, this.mes, this.unidadSelected.unidadId);
                fetch.done(function(){
                    self.planillaCASSelected= $("#select-planillasCAS").val();
                    self.servidoresCASView.fetchServidoresCAS(self.anio, self.mes, self.unidadSelected.unidadId, self.planillaCASSelected,function(){
                        for(var i=0;i<self.servidoresCASView.collection.length;i++){
                            var estado=self.servidoresCASView.collection.at(i).get("estadoServidor");
                            var id=self.servidoresCASView.collection.at(i).get("ruc");
                            if(estado=="P"){
                                $("#"+id).addClass('control');
                                $("#"+id).addClass('textonegrito');
                            }
                            if(estado=="N"){
                                $("#"+id).addClass('devueltos');
                                $("#"+id).addClass('textonegrito');
                            }
                            if(estado=="M"){
                                $("#"+id).addClass('rrhh');
                                $("#"+id).addClass('textonegrito');
                            }

                        };
                    });
                })*/
            },

            //funcionalidades del layout
            invokeModal: function(e){
               // this.unidadesModal.reset();
                this.unidadesModal.show(this.unidadesDialog);
                console.log("entrando");
                $('#modal-unidades').modal();
                console.log("saliendo");
            },

            clickUnidades:function(e){
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

            habilitarydeshabilitarReportes:function(){
               if(this.servidoresSeleccionados.length==0){
                 $("#boton-reporte-conformidad").attr('disabled','disabled');
                 $("#boton-reporte-pagos").attr('disabled','disabled');
               }else{
                 $("#boton-reporte-conformidad").removeAttr('disabled');
                 $("#boton-reporte-pagos").removeAttr('disabled');
               };
            },

          cambioUnidad: function(e){

                this.servidoresSeleccionados= [];
                var self=this;
                this.unidadSelected = this.unidadClicked;
                console.log("Cambio unidad: "+this.unidadSelected.unidadDesc);
                /*this.origenesSelectView.fetchOrigenes(this.unidadSelected.unidadId,function(){
                    console.log(self.origenesSelectView.collection);
                    $("#origen").val(self.origenesSelectView.collection.at(0).get("origenCodigo"));
                    $("#origen_pago").val(self.origenesSelectView.collection.at(0).get("origenCodigo"));
                });*/
                /*var fetch=this.planillasCASSelectView.fetchPlanillasCAS(this.anio, this.mes, this.unidadSelected.unidadId);
                fetch.done(function(){
                    self.planillaCASSelected= $("#select-planillasCAS").val();
                    $("#anio").val($('#select-anio').val());
                    $("#anio_pago").val($('#select-anio').val());
                    $("#mes").val($('#select-mes').val());
                    $("#mes_pago").val($('#select-mes').val());
                    $("#planilla").val(self.planillaCASSelected);
                    $("#planilla_pago").val(self.planillaCASSelected);
                    self.servidoresCASView.fetchServidoresCAS(self.anio, self.mes, self.unidadSelected.unidadId, self.planillaCASSelected,function(){
                        for(var i=0;i<self.servidoresCASView.collection.length;i++){
                            var estado=self.servidoresCASView.collection.at(i).get("estadoServidor");
                            var id=self.servidoresCASView.collection.at(i).get("ruc");
                            if(estado=="P"){
                                $("#"+id).addClass('control');
                                $("#"+id).addClass('textonegrito');
                            }
                            if(estado=="N"){
                                $("#"+id).addClass('devueltos');
                                $("#"+id).addClass('textonegrito');
                            }
                            if(estado=="M"){
                                $("#"+id).addClass('rrhh');
                                $("#"+id).addClass('textonegrito');
                            }

                        };
                    });
                });*/
                $('#modal-unidades').modal('hide');
                $('#desc-unidad').text(this.unidadSelected.unidadDesc);
                $("#uddesc").val(this.unidadSelected.unidadDesc);
                $("#uddesc_pago").val(this.unidadSelected.unidadDesc);
                $("#unidadId").val(this.unidadSelected.unidadId);
                $("#unidadId_pago").val(this.unidadSelected.unidadId);
               // this.habilitarydeshabilitarReportes();
            },

            seleccionarTodosLosServidores:function(){
                if($('#select-all').is(':checked'))
                {
                    var parent=$('.check-all').prop('checked',true);
                    $('.check-all').addClass("check");
                    var rucs_sel=parent.parent().parent().children(':nth-child(2)');
                    for(var i=0;i<rucs_sel.length;i++){
                        this.servidoresSeleccionados[i]=rucs_sel[i].innerHTML;
                    };
                    $('.table > tbody > tr ').addClass("highlight");
                }else{
                    $('.check-all').prop('checked',false);
                    $('.check-all').removeClass("check");
                    $('.table > tbody > tr').removeClass("highlight");
                    this.servidoresSeleccionados.splice(0,this.servidoresSeleccionados.length);
                };
                this.habilitarydeshabilitarReportes();
            },

            clickServidorRow:function(e){
                var clickedElement=$(e.currentTarget);
                var ruc=clickedElement.children(':nth-child(2)').text();
                var check=clickedElement.children(':nth-child(1)').children();
                console.log(check);
                if(clickedElement.hasClass('highlight')&&check.hasClass("check")){
                    clickedElement.removeClass("highlight");
                    check.removeClass("check");
                    check.prop('checked',false);
                    this.servidoresSeleccionados.splice(this.servidoresSeleccionados.indexOf(ruc),1);
                }
                else{
                    clickedElement.addClass("highlight");
                    check.addClass("check");
                    check.prop('checked',true);
                    this.servidoresSeleccionados.push(ruc);

                };
                this.habilitarydeshabilitarReportes();

            },

            cambioAnio: function(e){
                this.servidoresSeleccionados= [];
                var self=this;
                var anio=$("#select-anio").val();
                this.anio=anio;
                console.log("Cambio anio: "+anio);
                //Se debe esperar a que el fetch de planillasCAS termine para pasar la primera planilla del select como parametro a la otra funcion
                var fetch=this.planillasCASSelectView.fetchPlanillasCAS(this.anio, this.mes, this.unidadSelected.unidadId, this.planillaCASSelected);
                fetch.done(function(){
                    self.planillaCASSelected= $("#select-planillasCAS").val();
                    $("#planilla").val(self.planillaCASSelected);
                    $("#planilla_pago").val(self.planillaCASSelected);
                    console.log(self.planillaCASSelected);
                    self.servidoresCASView.fetchServidoresCAS(self.anio, self.mes, self.unidadSelected.unidadId, self.planillaCASSelected,function(){
                        for(var i=0;i<self.servidoresCASView.collection.length;i++){
                            var estado=self.servidoresCASView.collection.at(i).get("estadoServidor");
                            console.log(estado);
                            var id=self.servidoresCASView.collection.at(i).get("ruc");
                            if(estado=="P"){
                                $("#"+id).addClass('control');
                                $("#"+id).addClass('textonegrito');
                            }
                            if(estado=="N"){
                                $("#"+id).addClass('devueltos');
                                $("#"+id).addClass('textonegrito');
                            }
                            if(estado=="M"){
                                $("#"+id).addClass('rrhh');
                                $("#"+id).addClass('textonegrito');
                            }

                        };
                    });
                });
                $("#anio").val(anio);
                console.log(anio+"*****************************");
                $("#anio_pago").val(anio);
                this.habilitarydeshabilitarReportes();
            },

            cambioPlanilla: function(e){
                var self=this;
                this.servidoresSeleccionados= [];
                this.planillaCASSelected=$("#select-planillasCAS").val();
                console.log("Cambio planilla: "+this.planillaCASSelected);
                this.servidoresCASView.fetchServidoresCAS(self.anio, self.mes, self.unidadSelected.unidadId, self.planillaCASSelected,function(){
                    for(var i=0;i<self.servidoresCASView.collection.length;i++){
                        var estado=self.servidoresCASView.collection.at(i).get("estadoServidor");
                        console.log(estado);
                        var id=self.servidoresCASView.collection.at(i).get("ruc");
                        if(estado=="P"){
                            $("#"+id).addClass('control');
                            $("#"+id).addClass('textonegrito');
                        }
                        if(estado=="N"){
                            $("#"+id).addClass('devueltos');
                            $("#"+id).addClass('textonegrito');
                        }
                        if(estado=="M"){
                            $("#"+id).addClass('rrhh');
                            $("#"+id).addClass('textonegrito');
                        }

                    };
                });
                $("#planilla").val(this.planillaCASSelected);
                $("#planilla_pago").val(this.planillaCASSelected);
                this.habilitarydeshabilitarReportes();
            },

            enviarServidoresParaReporteConformidad: function(){
                var rucs="";
                if(this.servidoresSeleccionados.length==0){
                  console.log("debe seleccionar al menos un ruc");
                }else{
                    for(var i=0;i<this.servidoresSeleccionados.length;i++){
                        rucs=rucs+this.servidoresSeleccionados[i];
                        console.log(this.servidoresSeleccionados[i]);
                    };
                    $(form).append('<textarea style="display: none" id="rucs" name="rucs" value='+rucs+'>'+rucs+'</textarea>');
                };

            },

            enviarServidoresParaReportePagos: function(){
                var rucs="";
                if(this.servidoresSeleccionados.length==0){
                    console.log("debe seleccionar al menos un ruc");
                }else{
                    for(var i=0;i<this.servidoresSeleccionados.length;i++){
                        rucs=rucs+this.servidoresSeleccionados[i];
                        console.log(this.servidoresSeleccionados[i]);
                    };
                    $(form_pago).append('<textarea style="display: none" id="rucs" name="rucs" value='+rucs+'>'+rucs+'</textarea>');
                };

            },

            cambioMes: function(e){
                this.servidoresSeleccionados= [];
                var self=this;
                var mes=$("#select-mes").val();
                this.mes=mes;
                console.log("Cambio mes: "+mes);
                var fetch=this.planillasCASSelectView.fetchPlanillasCAS(this.anio, this.mes, this.unidadSelected.unidadId);
                fetch.done(function(){
                    self.planillaCASSelected= $("#select-planillasCAS").val();
                    $("#planilla").val(self.planillaCASSelected);
                    $("#planilla_pago").val(self.planillaCASSelected);
                    console.log(self.planillaCASSelected);
                    self.servidoresCASView.fetchServidoresCAS(self.anio, self.mes, self.unidadSelected.unidadId, self.planillaCASSelected,function(){
                        for(var i=0;i<self.servidoresCASView.collection.length;i++){
                            var estado=self.servidoresCASView.collection.at(i).get("estadoServidor");
                            console.log(estado);
                            var id=self.servidoresCASView.collection.at(i).get("ruc");
                            if(estado=="P"){
                                $("#"+id).addClass('control');
                                $("#"+id).addClass('textonegrito');
                            }
                            if(estado=="N"){
                                $("#"+id).addClass('devueltos');
                                $("#"+id).addClass('textonegrito');
                            }
                            if(estado=="M"){
                                $("#"+id).addClass('rrhh');
                                $("#"+id).addClass('textonegrito');
                            }

                        };
                    });
                });
                $("#mes").val(mes);
                $("#mes_pago").val(mes);
                this.habilitarydeshabilitarReportes();
            },

            enviaracontrolprevio:function(){
                var ud_id=this.unidadSelected.unidadId;
                var anio=this.anio;
                var mes=this.mes;
                var plan_cas_sel_view=this.planillasCASSelectView;
                if(this.servidoresSeleccionados.length==0){
                    console.log("debe seleccionar al menos un servidor");
                    $('#advertencia_seleccion_servidores').modal("show");
                }else{
                    for(var i=0;i<this.servidoresSeleccionados.length;i++){
                        this.numerodePlanillas[i]=$("#"+this.servidoresSeleccionados[i]).children(':nth-child(11)').text();
                        this.planillasCorrelativo[i]=$("#"+this.servidoresSeleccionados[i]).children(':nth-child(10)').text();
                    }
                    this.model.get("envioacontrolprevio").set({
                        "plaest":"P",
                        "udid":this.unidadSelected.unidadId,
                        "anio":$("#select-anio").val(),
                        "mes": $("#select-mes").val(),
                        "rucs":this.servidoresSeleccionados,
                        "numerodeplanilla":this.numerodePlanillas,
                        "planillacorrelativo":this.planillasCorrelativo,
                        "origen": $("#select-origenes").val(),
                        "planilla":$("#select-planillasCAS").val()
                    });
                    console.log(this.planillasCorrelativo.length);
                    console.log(this.unidadSelected.unidadId);
                    console.log($("#select-anio").val());
                    console.log($("#select-mes").val());
                    console.log($("#select-origenes").val());
                    console.log($("#select-planillasCAS").val());
                    this.model.get("envioacontrolprevio").url = "api/planillasCAS/updateEstadoServidor";
                    var self=this;
                    console.log( this.model.get("envioacontrolprevio"));

                    var self_s = this.model.get("envioacontrolprevio").save({}, {
                        wait: true
                    });

                    self_s.done(function(model,resp,opt){

                    });

                    self_s.fail(function(model,resp,opt){
                        console.log("save ok");
                        var fetch=plan_cas_sel_view.fetchPlanillasCAS(anio,mes,ud_id);
                        fetch.done(function(){
                            self.planillaCASSelected= $("#select-planillasCAS").val();
                            $("#planilla").val(self.planillaCASSelected);
                            $("#planilla_pago").val(self.planillaCASSelected);
                            self.servidoresCASView.fetchServidoresCAS(self.anio, self.mes, self.unidadSelected.unidadId, self.planillaCASSelected,function(){
                                for(var i=0;i<self.servidoresCASView.collection.length;i++){
                                    var estado=self.servidoresCASView.collection.at(i).get("estadoServidor");
                                    console.log(estado);
                                    var id=self.servidoresCASView.collection.at(i).get("ruc");
                                    if(estado=="P"){
                                        $("#"+id).addClass('control');
                                        $("#"+id).addClass('textonegrito');
                                    }
                                    if(estado=="N"){
                                        $("#"+id).addClass('devueltos');
                                        $("#"+id).addClass('textonegrito');
                                    }
                                    if(estado=="M"){
                                        $("#"+id).addClass('rrhh');
                                        $("#"+id).addClass('textonegrito');
                                    }

                                };
                            });
                        });
                        console.log("todo ok");
                    });

                }
            },

            crearNuevaPlanilla:function(){
                var self=this;
                var ud_id=this.unidadSelected.unidadId;
                var anio=this.anio;
                var mes=this.mes;
                var plan_cas_sel_view=this.planillasCASSelectView;
                this.model.get("aperturadeplanilla").set({
                    "anio": $("#select-anio").val(),
                    "mes": $("#select-mes").val(),
                    "codigoOrigen": $("#select-origenes").val(),
                    "codigoDependencia":this.unidadSelected.unidadId
                });
                console.log("mostrando datos para crear nueva planilla")
                console.log( $("#select-anio").val());
                console.log($("#select-mes").val());
                console.log(this.unidadSelected.unidadId);
                console.log($("#select-origenes").val());
                this.model.get("aperturadeplanilla").url = "api/planillasCAS/aperturaPlanilla";

                console.log(this.model.get("aperturadeplanilla"));

                //save model
                var self_s = this.model.get("aperturadeplanilla").save({}, {
                    wait: true,
                    success: function(model, resp, opt) {
                        console.log("save ok");
                        var fetch=plan_cas_sel_view.fetchPlanillasCAS(anio,mes,ud_id);
                        fetch.done(function(){
                            $('#se_creo_planilla').modal("show");
                            self.planillaCASSelected= $("#select-planillasCAS").val();
                            $("#planilla").val(self.planillaCASSelected);
                            $("#planilla_pago").val(self.planillaCASSelected);
                            self.servidoresCASView.fetchServidoresCAS(self.anio, self.mes, self.unidadSelected.unidadId, self.planillaCASSelected,function(){
                                for(var i=0;i<self.servidoresCASView.collection.length;i++){
                                    var estado=self.servidoresCASView.collection.at(i).get("estadoServidor");
                                    console.log(estado);
                                    var id=self.servidoresCASView.collection.at(i).get("ruc");
                                    if(estado=="P"){
                                        $("#"+id).addClass('control');
                                        $("#"+id).addClass('textonegrito');
                                    }
                                    if(estado=="N"){
                                        $("#"+id).addClass('devueltos');
                                        $("#"+id).addClass('textonegrito');
                                    }
                                    if(estado=="M"){
                                        $("#"+id).addClass('rrhh');
                                        $("#"+id).addClass('textonegrito');
                                    }

                                };
                            });
                        });
                        console.log("todo ok");
                    },
                    error: function(model, resp, opt) {
                        console.log("error", model);
                        console.log("error", resp);
                        console.log("error", opt);
                    }
                });
            }


        });
    });


    return ErzaManager.PlanillasApp.List.View;
});