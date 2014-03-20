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
        p.set('name', 'Hello World');
        p.set('text', 'Hello World');
        p.set('action', 'Actions/CopyTree');
        dag.add(p);

    }

    return AddButton;

});
