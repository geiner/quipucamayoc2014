/**
 * Created with IntelliJ IDEA.
 * User: Jean-PC
 * Date: 15/07/14
 * Time: 09:13 AM
 * To change this template use File | Settings | File Templates.
 */
define([ 'backbone', 'marionette','hbs!apps/reportes/form/templates/tiposervidorpla', 'apps/reportes/form/collection/tiposervidorpla'],
    function (Backbone, Marionette, TipoServPlaTemp, TipoServPlaColl) {
        var TipoServidorPla=Backbone.Marionette.ItemView.extend({

            template: TipoServPlaTemp,
            collection: new TipoServPlaColl(),


            getTipoServidorPla: function(){

                this.collection.on("sync", this.render, this);
                this.collection.fetch().done();

            }

        })
        return TipoServidorPla;

    });
