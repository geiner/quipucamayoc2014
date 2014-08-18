define(['backbone', 'apps/reportes/form/model/tabla_informacion'], function (Backbone, InformacionServModel) {

    var ListServi = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: InformacionServModel,

        setUrlListServi: function(sex,sex1,dia1,mes1,anio1,dia2,mes2,anio2,dia3,mes3,anio3,dia4,mes4,anio4,tip,estados,regimenpen,tipago,categ,dependen){
        this.url= 'api/reportes/tabla_informacion/'+sex+'/'+sex1+'/'+dia1+'/'+mes1+'/'+anio1+'/'+dia2+'/'+mes2+'/'+anio2+'/'+dia3+'/'+mes3+'/'+anio3+'/'+dia4+'/'+mes4+'/'+anio4+'/'+tip+'/'+estados+'/'+regimenpen+'/'+tipago+'/'+categ+'/'+dependen;

        }

    });
    return ListServi;
});
