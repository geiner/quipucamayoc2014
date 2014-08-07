define(["app", "hbs!apps/contratos/adendas/templates/plazas-layout","apps/contratos/adendas/view/unidades-view",
        "lib/bootstrap-datepicker","apps/contratos/adendas/view/contratoscas-view","apps/contratos/adendas/view/plazas-view",
        "apps/contratos/adendas/view/servidortipos-view", "apps/contratos/adendas/view/servidorgenericos-view", "apps/contratos/adendas/view/servidorcargos-view",
        "apps/contratos/adendas/model/servidor", "apps/contratos/adendas/model/servidorlaboral", "apps/contratos/adendas/model/contratocas"
        ,"backbone-validation","jquery","bootstrap"],function (ErzaManager, layoutTpl,UnidadesView,datepicker,ContratosCASView,PlazasView,ServidorTiposView, ServidorGenericosView, ServidorCargosView, Servidor, ServidorLaboral, ContratoCAS) {

    ErzaManager.module('ContratosApp.Adendas.View', function (View, ErzaManager, Backbone, Marionette, $, _) {

        View.Layout = Marionette.Layout.extend({
            template: layoutTpl,

            unidadesView: new UnidadesView(),
            contratosCASView: new ContratosCASView(),
            plazasView: new PlazasView(),
            servidorTiposView: new ServidorTiposView(),
            servidorGenericosView: new ServidorGenericosView(),
            servidorCargosView: new ServidorCargosView(),

            regions: {
                div_unidades: "#div_unidades",
                div_plazas: "#div_plazas",
                div_add_plaza: "#div_add_plaza",
                div_servidor_tipos: "#div_serv_tip",
                div_servidor_genericos: "#div_serv_gen",
                div_serv_carg: "#div_serv_carg"
            },

            events: {
                "click #sear_uni": "fun_show_modal",
                "click #btn_unidad": "fun_select_unidad",
                "click #serv_ini_clos": "fun_serv_ini_clos",
                "click #serv_ini_show": "fun_serv_ini_show",
                "click #serv_ter_clos": "fun_serv_ter_clos",
                "click #serv_ter_show": "fun_serv_ter_show",
                "click #add_plaza": "fun_show_modal_add_plaza",
                "click .delplaza": "fun_del_plaza",
                "click #sear_cod": "fun_search_servidor",
                "click #btn_new_plaza": "fun_new_plaza",
                "change #serv_gen": "fun_serv_tip"
            },

            initialize: function () {

                //initialize model
                this.model = new Backbone.Model();

                this.model.set({
                    "servidorlaboral": new ServidorLaboral(),
                    "contratocas": new ContratoCAS()
//                    "servidor": new Servidor()
                });

                //initialize validation from view
                Backbone.Validation.bind(this);

                //using model validation
                _.extend(Backbone.Model.prototype, Backbone.Validation.mixin);
            },

            onRender: function () {

                var self = this;
                this.$el.html(this.template);

                this.unidadesView.initialize();
                this.div_unidades.show(this.unidadesView);

                this.contratosCASView.initialize();
                this.div_plazas.show(this.contratosCASView);

                this.plazasView.initialize();
                this.div_add_plaza.show(this.plazasView);

                this.servidorTiposView.initialize();
                this.div_servidor_tipos.show(this.servidorTiposView);

                this.servidorGenericosView.initialize(
                    function () {
                        self.servidorTiposView.findByTipGen(self.servidorGenericosView.collection.at(0).get("cod"));
                    }
                );
                this.div_servidor_genericos.show(this.servidorGenericosView);

                this.servidorCargosView.initialize();
                this.div_serv_carg.show(this.servidorCargosView);

                //customizer helps
                var temp_helps = $("[id^='help_']");

                temp_helps.hide();
                temp_helps.width($("#codigo").width());

            },

            fun_show_modal: function (ev) {

                $('#div_unidades').modal();

                return false;
            },

            fun_show_modal_add_plaza: function (ev) {

                $('#div_add_plaza').modal();

                return false;
            },

            fun_select_unidad: function (ev) {

                var self = this;

                var update_fields_unidad = function () {
                    var temp_uni = $("#uni");
                    temp_uni.text(self.unidadesView.unidad_select.text());
                    temp_uni.attr('name', self.unidadesView.unidad_select.attr('name'));
                    $('#div_unidades').modal('hide');
                };

                var update_unidad_view = function () {
                    self.unidadesView.fun_select_unidad(update_fields_unidad);
                };


                var update_plazas = function () {
                    self.contratosCASView.findByUnidad($("#uni").attr('name'),
                        function () {
                            var dateToDMY = function (date) {
                                var d = date.getDate();
                                var m = date.getMonth() + 1;
                                var y = date.getFullYear();
                                return '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
                            }

                            for (var i = 0; i < self.contratosCASView.collection.length; i++) {

                                var temp_model = self.contratosCASView.collection.at(i);

                                if (temp_model.get('ini'))
                                    $("#" + temp_model.get('plazaCAS').id)
                                        .children('.inis').text(dateToDMY(new Date(temp_model.get('ini'))));

                                if (temp_model.get('fin'))
                                    $("#" + temp_model.get('plazaCAS').id)
                                        .children('.fins').text(dateToDMY(new Date(temp_model.get('fin'))));
                            }
                        }
                    );
                }

                var callbacks = $.Callbacks();

                callbacks.add(update_unidad_view);
                callbacks.add(update_plazas);

                callbacks.fire();

                return false;
            },

            fun_serv_ini_clos: function (ev) {

                $('#serv_ini').datepicker('hide');
            },

            fun_serv_ini_show: function (ev) {

                var temp_serv_ini = $('#serv_ini');

                temp_serv_ini.datepicker({
                    format: 'dd-mm-yyyy',
                    viewMode: 2
                });

                temp_serv_ini.datepicker('show');
            },

            fun_serv_ter_clos: function (ev) {

                $('#serv_ter').datepicker('hide');
            },

            fun_serv_ter_show: function (ev) {

                var temp_serv_ter = $('#serv_ter');

                temp_serv_ter.datepicker({
                    format: 'dd-mm-yyyy',
                    viewMode: 2
                });

                temp_serv_ter.datepicker('show');
            },

            fun_serv_tip: function (ev) {

                var temp_cod_tip_gen = $("#serv_gen").val();

                this.servidorTiposView.findByTipGen(temp_cod_tip_gen);
            },

            fun_del_plaza: function (ev) {

                var self = this;

                var element = $(ev.currentTarget);

                var plaza = new Backbone.Model({
                    dsc: 'modelo para destruir'
                });

                //noinspection JSValidateTypes
                plaza.url = 'rest/cas/plazas/plaza/' + element.parent().parent().attr('id');

                var temp_del = $.ajax({
                    type: "DELETE",
                    url: plaza.url
                });

                temp_del.done(function (data) {

                    self.contratosCASView.findByUnidad($("#uni").attr('name'),
                        function () {
                            var dateToDMY = function (date) {
                                var d = date.getDate();
                                var m = date.getMonth() + 1;
                                var y = date.getFullYear();
                                return '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
                            }

                            for (var i = 0; i < self.contratosCASView.collection.length; i++) {

                                var temp_model = self.contratosCASView.collection.at(i);

                                if (temp_model.get('ini'))
                                    $("#" + temp_model.get('plazaCAS').cod)
                                        .children('.inis').text(dateToDMY(new Date(temp_model.get('ini'))));

                                if (temp_model.get('fin'))
                                    $("#" + temp_model.get('plazaCAS').cod)
                                        .children('.fins').text(dateToDMY(new Date(temp_model.get('fin'))));
                            }
                        }
                    );
                });

                return false;
            },

            fun_search_servidor: function (ev) {

                var codigo = $("#codigo").val();

                this.model.get("servidor").url = "rest/cas/serv/codigo/" + codigo;

                this.model.get("servidorlaboral").url = "rest/cas/serv/laboral/codigo/" + codigo;

                var fetch_s = this.model.get("servidor").fetch({ data: $.param({"codigo": codigo}) });

                var fetch_l = this.model.get("servidorlaboral").fetch({ data: $.param({"codigo": codigo}) });

                var self = this;

                //hide helps
                $("[id^='help_']").hide();

                function dateToDMY(date) {
                    var d = date.getDate();
                    var m = date.getMonth() + 1;
                    var y = date.getFullYear();
                    return '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
                }

                fetch_s.done(function () {



                    $("#codigo").val(self.model.get("servidor").get("codigo"));

//                    $("#serv_ape_mat").val(self.model.get("servidor").get("materno"));
//                    $("#serv_ape_pat").val(self.model.get("servidor").get("paterno"));
//                    $("#serv_nom").val(self.model.get("servidor").get("nombre"));
                });

                fetch_s.fail(function () {



                    var temp_help = $("#help_codigo");

                    temp_help.show();
                    temp_help.text("No existe registro!");
                });

                fetch_l.done(function () {


                    //render result
                    var temp_help = $("#help_sin_cas");

                    if (self.model.get("servidorlaboral").get("cat") != '0') {
                        temp_help.show();
                        temp_help.text("Sin registro CAS");
                    } else {
                        temp_help.show();
                        temp_help.text("Con registro CAS");
                    }


                });

                return false;
            },

            fun_new_plaza: function (ev) {
                //validar campos


                //traer datos
                var self = this;

                var parseDate = function (s) {
                    var re = /^(\d\d)-(\d\d)-(\d{4})$/;
                    var m = re.exec(s);
                    return m ? new Date(m[3], m[2] - 1, m[1]) : null;
                };

                this.model.get('contratocas').set({
                    'numCont': $.trim($('#serv_num_cont').val()),
                    'ini': parseDate($("#serv_ini").val()),
                    'fin': parseDate($("#serv_ter").val()),
                    'horas': parseInt($('#serv_horas').val()),
                    'tipo': $.trim($('#serv_tip').text()),
                    'udId': parseInt(self.unidadesView.unidad_select.attr('name')),
                    'idCargo': parseInt($('#serv_car').val()),
                    'idServidor': $('#codigo').val(),
                    'monto': parseInt($('#serv_rem').val())

                });

                //salvar datos

                this.model.get('contratocas').url = 'rest/cas/plazas/new';
                var fetch_c = this.model.get('contratocas').save();


                //funciones de estados de restpuesta
                fetch_c.done(function () {

                    self.fun_select_unidad();
                });

                fetch_c.fail(function () {

                });

                $('#div_add_plaza').modal('hide');

                return false;
            }



        });
    });
    return ErzaManager.ContratosApp.Adendas.View;
});