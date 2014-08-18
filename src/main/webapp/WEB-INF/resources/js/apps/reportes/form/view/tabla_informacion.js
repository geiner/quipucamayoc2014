define([ 'backbone', 'marionette','hbs!apps/reportes/form/templates/tabla_informacion','apps/reportes/form/collection/tabla_informacion'],
    function (Backbone, Marionette, InformacionServTemplate,InformacionServColl) {

        var InformacionServ = Backbone.Marionette.ItemView.extend({
            template: InformacionServTemplate,
            collection: new InformacionServColl(),

            getInformacionServ:function(sex,sex1,dia1,mes1,anio1,dia2,mes2,anio2,dia3,mes3,anio3,dia4,mes4,anio4,tip,estados,regimenpen,tipago,categ,dependen,callback){

            this.collection.setUrlListServi(sex,sex1,dia1,mes1,anio1,dia2,mes2,anio2,dia3,mes3,anio3,dia4,mes4,anio4,tip,estados,regimenpen,tipago,categ,dependen);
            this.collection.on("sync", this.render, this);
            this.collection.fetch().done(callback);
            }
        });
        return InformacionServ;
    }
);