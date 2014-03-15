/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/



define(['Composition/CompositeView',
        'UI/ViewSupplier',
        'UI/TypedModelContext',
        'UI/UIContext',
        'Collection/DAG',
        'UI/ViewDAG',
        'UI/View',
        'localstorage',
        'backbone'],
function(CompositeView,
         ViewSupplier,
         TypedModelContext,
         UIContext,
         DAG,
         ViewDAG,
         View,
         BackboneLocalStorage,
         Backbone) {

    var Node = Backbone.Model.extend({
        sayId: function() {
            console.log(this.get('id'));
        }
    });


    var NodeCollection = Backbone.Collection.extend({
        model: Node,
        localStorage:new BackboneLocalStorage('ViewDAG-test')
    });

    function CompositionContext() {
        this.uiContext = new UIContext();

        //this.typedModelContext = new TypedModelContext();
        //var Collection = this.typedModelContext.collection();

        // //initialize an empty view supplier
        // this.views = {};
        // this.viewSupplier = new ViewSupplier(this.views);

        // //Add to the view map
        // this.views['File/URLView'] = this.urlView(document);
        // this.views['Composition/CompositeView'] = this.compositeView(document);

        // this.collection = new Collection();
    }

    CompositionContext.prototype.compositeView = function() {
        var self = this;
        return function(model) {
            return new CompositeView(self.collection, self.viewSupplier, model);
        }
    }

    CompositionContext.prototype.run = function(element, document) {
        var collection = new NodeCollection();
        var dag = new DAG(collection);

        var viewDAG = new ViewDAG(dag, document);

        var p = new Node({id:1});
        self = this;

        var view = self.uiContext.makeButton('Hello', 'Hello World', function() {
            alert('hi');
        });

        element.appendChild(view.getWrap(document));

        viewDAG.add(p, view);

    }

    return CompositionContext;
});
