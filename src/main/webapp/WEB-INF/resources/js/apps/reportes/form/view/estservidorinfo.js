define([ 'backbone', 'marionette','hbs!apps/reportes/form/templates/estservidorinfo', 'apps/reportes/form/collection/estservidorinfo'],
    function (Backbone, Marionette, EstServidorInfoTemp, EstServidorInfoColl) {
        var EstServidorInfo=Backbone.Marionette.ItemView.extend({

            template: EstServidorInfoTemp,
            collection: new EstServidorInfoColl,


            getEstServidorInfo: function(){

                this.collection.on("sync", this.render, this);
                this.collection.fetch().done();

            }

        })
        return EstServidorInfo;

    });
