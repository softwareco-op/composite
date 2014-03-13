/**
* Copyright (C) 2014 SoftwareCo-oP
*/


/**
 * ViewDAG is bridge between a directed acyclic graph of models and their volatile objects (views, dom, etc).
 **/
define(['Collection/DAG'], function(DAG) {


    function ViewDAG(dag) {
        this.dag = dag;
        this.map = {};
    }

    ViewDAG.prototype.add = function(model, object) {
        this.map[model.get('id')] = object;
    }

    return ViewDAG;

});
