/**
 * Created with IntelliJ IDEA.
 * User: Jean-PC
 * Date: 16/07/14
 * Time: 12:19 PM
 * To change this template use File | Settings | File Templates.
 */

define([ 'backbone', 'marionette','hbs!apps/reportes/form/templates/altabajamodal2'],
    function (Backbone, Marionette, altabajamodal2Temp) {
        var altabaja2=Backbone.Marionette.ItemView.extend({

            template: altabajamodal2Temp





        })
        return altabaja2;

    });
