/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE, DAGNotify, Pipeline, DAGUtil, chai, sinon) {

    var assert = chai.assert;

    describe('DAGNotify', function() {

        it('handles empty dag', function(done) {
            var dagNotify = {
                id : 'dagNotify',
                type : 'DAGNotify'
            }

            var inMemoryDag = Pipeline.append(dagNotify, Pipeline.memoryDag());

            var node = {}
            dagNotify.object.add(node);

            var parent = DAGUtil.validateNode({});
            node.parent = parent.id;
            dagNotify.object.add(node);

            done();
        })

        it('notifies the node object', function(done) {
            var dagNotify = {
                id : 'dagNotify',
                type : 'DAGNotify'
            }

            var inMemoryDag = Pipeline.append(dagNotify, Pipeline.memoryDag());

            var callback = sinon.spy();
            var object = {addNode:callback}
            var node = {object:object}

            node = inMemoryDag.bin.mux.add(node);

            assert.isTrue(callback.called);

            done();
        })

        it('notifies the parent', function(done) {
            var dagNotify = {
                id : 'dagNotify',
                type : 'DAGNotify'
            }

            var inMemoryDag = Pipeline.append(dagNotify, Pipeline.memoryDag());

            var callback = sinon.spy();
            var node = {object:{addNode:callback}}

            var parent = inMemoryDag.bin.mux.add({});
            var parentAdd = sinon.spy();
            var parentUpdate = sinon.spy();
            parent.object = {add: parentAdd, addChild: parentUpdate}

            node.parent = parent.id;
            node = inMemoryDag.bin.mux.add(node);

            assert.isTrue(callback.called);
            assert.isTrue(parentUpdate.calledOnce);

            done();
        })

        it('notifies the children', function(done) {
            var dagNotify = {
                id : 'dagNotify',
                type : 'DAGNotify'
            }

            var inMemoryDag = Pipeline.append(dagNotify, Pipeline.memoryDag());

            var parent = DAGUtil.validateNode({});
            var parentAdd = sinon.spy();
            var parentUpdate = sinon.spy();
            parent.object = {addNode: parentAdd, addChild: parentUpdate}

            var callback = sinon.spy();
            var addParent = sinon.spy();
            var node = {object:{addNode:callback, addParent: addParent}}
            node.parent = parent.id;
            node = inMemoryDag.bin.mux.add(node);

            assert.isTrue(callback.called);
            assert.isFalse(parentAdd.calledOnce);
            assert.isFalse(addParent.called);
            inMemoryDag.bin.mux.add(parent);
            assert.isTrue(parentAdd.calledOnce);
            done();
        })

    })

})(COMPOSITE, COMPOSITE.DAGNotify, COMPOSITE.Pipeline, COMPOSITE.DAGUtil, chai, sinon)
