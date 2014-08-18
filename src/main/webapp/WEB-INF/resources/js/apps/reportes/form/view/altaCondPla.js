/**
 * Created with IntelliJ IDEA.
 * User: Jean-PC
 * Date: 15/07/14
 * Time: 12:23 PM
 * To change this template use File | Settings | File Templates.
 */
define([ 'backbone', 'marionette','hbs!apps/reportes/form/templates/altaCondPla', 'apps/reportes/form/collection/altaCondPla'],
    function (Backbone, Marionette, AltaCondPlaTemp, AltaCondPlaColl) {
        var altaCondPla=Backbone.Marionette.ItemView.extend({

            template: AltaCondPlaTemp,
            collection: new AltaCondPlaColl(),


            getAltaCondPla: function(valor1){
                this.collection.setUrl(valor1);
                this.collection.on("sync", this.render, this);
                this.collection.fetch().done();

            }

        })
        return altaCondPla;

    });
