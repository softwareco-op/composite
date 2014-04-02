////
//   Copyright (C) 2014 SoftwareCo-oP
///

define(['Composition/Global', 'backbone', 'node-uuid'], function(Global, Backbone, uuid) {

    function AddButton() {}

    AddButton.prototype.perform = function() {

        var dag = Global.dag;
        var Node = Backbone.Model.extend({});
        var id = uuid.v1();

        var p = new Node({id:id, parent:1});
        p.set('type', 'Components/Button');
        p.set('name', 'Copy Component');
        p.set('text', 'Copy Component');
        dag.add(p);

    }

    AddButton.prototype.add = function(model, objdag, dag, dom) {
        return;
    }

    return AddButton;

});
