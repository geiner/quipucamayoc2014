define([ 'backbone', 'marionette','hbs!apps/cuadro_nominal/form/templates/unidades-modal', 'apps/cuadro_nominal/form/collection/unidades'],
    function (Backbone, Marionette, unidadesModalTemplate, Unidades) {

        var UnidadesDialog = Backbone.Marionette.ItemView.extend({
            template: unidadesModalTemplate,
            collection: new Unidades(),

            unidadClicked: {

                unidadId:10002,
                unidadDesc:"UNMSM"
            },

            elementoClickeado: null,
            events: {
                "click .tree li": "clickUnidad"
            },




            initialize: function(codDependencia,perfil){

                this.collection.unidadesSegunUsuario(codDependencia,perfil)
                this.collection.on("sync", this.render, this);
                this.collection.fetch({ data: { page: 'no'} });

            },


/*
            dependenciasSegunUsuario: function(){

                this.collection.unidadesSegunUsuario("F0620")
                this.collection.on("sync", this.render, this);
                this.collection.fetch({ data: { page: 'no'} });

            },*/







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
        return UnidadesDialog;
    }
);