/**
 * Created with IntelliJ IDEA.
 * User: Jean-PC
 * Date: 15/07/14
 * Time: 09:17 AM
 * To change this template use File | Settings | File Templates.
 */

define(['backbone', 'apps/reportes/form/model/tiposervidorpla'], function (Backbone, TipoServidorplaModel) {

    var TipoServidorpla = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: TipoServidorplaModel,
        url: 'api/reportes/tiposervidor'

    });
    return TipoServidorpla;
});
