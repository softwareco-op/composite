/*
 * (C) 2014 SoftwareCo-oP
 */

(function(Mux, DAG, DAGUtil, COMPOSITE, _, chai, sinon) {

    var assert = chai.assert;

    describe('Mux', function() {

        it('performs the function when there is no dag', function(done) {
            var node = {
                object: {
                    add :function() {
                        done();
                    }
                }
            }

            var mux = new Mux(node)

            node.bin.mux.add({});
        })

        it('does not fail when there is a dag and no children', function(done) {
            var dag = new DAG();

            COMPOSITE.dag = dag;

            var node = {
                object: {
                    add :function() {
                        done();
                    }
                }
            }

            var mux = new Mux(node);

            node.bin.mux.add({});

            done();
        })

        it('calls children functions', function(done) {
            var dag = new DAG();

            COMPOSITE.dag = dag;

            var spy = sinon.spy();
            var node = {
                object: {
                    add :function() {
                        spy();
                    }
                }
            }
            var mux = new Mux(node);

            var childNode = {
                object: {
                    add :function() {
                        assert.isTrue(spy.calledOnce);
                        done()
                    }
                }
            }
            var mux2 = new Mux(childNode);

            DAGUtil.addChild(node, childNode);
            dag.addAll([node, childNode]);

            node.bin.mux.add({});
        })

    })

})(COMPOSITE.Mux, COMPOSITE.DAG, COMPOSITE.DAGUtil, COMPOSITE, _, chai, sinon)
