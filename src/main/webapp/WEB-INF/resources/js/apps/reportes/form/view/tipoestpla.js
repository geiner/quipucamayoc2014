/**
 * Created with IntelliJ IDEA.
 * User: Jean-PC
 * Date: 15/07/14
 * Time: 09:34 AM
 * To change this template use File | Settings | File Templates.
 */
define([ 'backbone', 'marionette','hbs!apps/reportes/form/templates/tipoestpla', 'apps/reportes/form/collection/tipoestpla'],
    function (Backbone, Marionette, TipoEstPlaTemp, TipoEstPlaColl) {
        var tipoestpla=Backbone.Marionette.ItemView.extend({

            template: TipoEstPlaTemp,
            collection: new TipoEstPlaColl,


            getTipoEstadoPla: function(){

                this.collection.on("sync", this.render, this);
                this.collection.fetch().done();

            }

        })
        return tipoestpla;

    });
