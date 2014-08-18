/**
 * Created with IntelliJ IDEA.
 * User: Jean-PC
 * Date: 15/07/14
 * Time: 09:37 AM
 * To change this template use File | Settings | File Templates.
 */

define(['backbone', 'apps/reportes/form/model/altaCondPla'], function (Backbone, altaCondPlaModel) {

    var altaCondPla = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: altaCondPlaModel,
        setUrl: function(valor1){
            this.url= 'api/reportes/altacondpla/'+valor1;
        }
    });
    return altaCondPla;
});