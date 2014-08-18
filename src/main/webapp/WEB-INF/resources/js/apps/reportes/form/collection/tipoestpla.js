/**
 * Created with IntelliJ IDEA.
 * User: Jean-PC
 * Date: 15/07/14
 * Time: 09:37 AM
 * To change this template use File | Settings | File Templates.
 */

define(['backbone', 'apps/reportes/form/model/tipoestpla'], function (Backbone, tipoestplaModel) {

    var tipoestpla = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: tipoestplaModel,
        url: 'api/reportes/estservidor'

    });
    return tipoestpla;
});