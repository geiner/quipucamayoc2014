define(['backbone', 'apps/desc_medicos/form/model/citt'], function (Backbone, Citt) {

    var Citts = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: Citt,
        setUrl: function(citt){
            this.url="rest/descansos/citts/"+citt;
        }
    });
    return Citts;
});