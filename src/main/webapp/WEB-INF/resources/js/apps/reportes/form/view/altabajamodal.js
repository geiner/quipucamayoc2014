/**
 * Created with IntelliJ IDEA.
 * User: Jean-PC
 * Date: 16/07/14
 * Time: 12:19 PM
 * To change this template use File | Settings | File Templates.
 */

define([ 'backbone', 'marionette','hbs!apps/reportes/form/templates/altabajamodal'],
    function (Backbone, Marionette, altabajamodalTemp) {
        var altabaja=Backbone.Marionette.ItemView.extend({

            template: altabajamodalTemp





        })
        return altabaja;

    });
