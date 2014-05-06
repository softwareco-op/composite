/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, DAGNotify, chai, sinon) {

    var assert = chai.assert;

    describe('DAGNotify', function() {

        it('handles empty dag', function(done) {
            var dagNotify = new DAGNotify();
            var node = {}
            dagNotify.add(node);

            var parent = dagNotify.dag.add({});
            node.parent = parent.id;
            dagNotify.add(node);

            done();
        })

        it('notifies the node object', function(done) {
            var dagNotify = new DAGNotify();

            var callback = sinon.spy();
            var object = {add:callback}
            var node = {object:object}

            node = dagNotify.dag.add(node);

            assert.isFalse(callback.called);

            dagNotify.add(node);

            assert.isTrue(callback.called);

            done();
        })

        it('notifies the parent', function(done) {
            var dagNotify = new DAGNotify();

            var callback = sinon.spy();
            var node = {object:{add:callback}}

            var parent = dagNotify.dag.add({});
            node.parent = parent.id;
            var parentAdd = sinon.spy();
            var parentUpdate = sinon.spy();
            parent.object = {add: parentAdd, addChild: parentUpdate}

            node = dagNotify.dag.add(node);


            dagNotify.add(node);
            assert.isTrue(callback.called);
            assert.isFalse(parentAdd.calledOnce);
            dagNotify.add(parent);
            assert.isTrue(parentAdd.calledOnce);
            assert.isTrue(parentUpdate.calledOnce);

            done();
        })

        it('notifies the children', function(done) {
            var dagNotify = new DAGNotify();

            var callback = sinon.spy();
            var addParent = sinon.spy();
            var node = {object:{add:callback, addParent: addParent}}

            var parent = dagNotify.dag.add({});
            node.parent = parent.id;
            var parentAdd = sinon.spy();
            var addChild = sinon.spy();
            parent.object = {add: parentAdd, addChild: addChild}

            node = dagNotify.dag.add(node);
            dagNotify.dag.addChild(parent, node);


            dagNotify.add(node);
            assert.isTrue(callback.called);
            assert.isFalse(parentAdd.calledOnce);
            assert.isFalse(addParent.called);
            dagNotify.add(parent);
            assert.isTrue(parentAdd.calledOnce);
            assert.isTrue(addChild.calledOnce);
            assert.isTrue(addParent.called);
            done();
        })

    })

})(COMPOSITE, COMPOSITE.DAGNotify, chai, sinon)
