/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/


/**
 * DAG is directed acyclic graph on a backbone collection.
 **/
define(['src/Collection/DAG', 'chai'], function(DAG, chai) {

    var expect = chai.expect;

    describe('DAG', function() {
        it('passes the test', function(done) {
            var dag = new DAG();
            dag.getChildren({});
            done();
        });
    });

});
