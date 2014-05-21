/*
 * (C) 2014 SoftwareCo-oP
 */

if (typeof module !== 'undefined' && module.exports) {
    //in node
    require('../../src/Server/NodeDeps.js');
    require('../../src/Test/UnitTest.js');
    var chai = require('chai');
    var sinon = require('sinon');
} else {
    //in browser
}

(function(PropertyFilter, chai, sinon) {

    //var assert = chai.assert;

    describe('PropertyFilter', function() {

        it('allows an undefined property', function(done) {
            var options = {
                property : 'type'
            }

            var propertyFilter = new PropertyFilter(options);

            try {
                propertyFilter.add({});
                done();
            } catch (error) {
                done(error);
            }

        })

        it('denies an undefined property', function(done) {
            var options = {
                property : 'type',
                filterUndefined : true
            }

            var propertyFilter = new PropertyFilter(options);

            try {
                propertyFilter.add({});
                done('should have thrown an error');
            } catch (error) {
                done();
            }

        })

        it('allows a null property', function(done) {
            var options = {
                property : 'type'
            }

            var propertyFilter = new PropertyFilter(options);

            try {
                propertyFilter.add({type : null});
                done();
            } catch (error) {
                done(error);
            }

        })

        it('denies a null property', function(done) {
            var options = {
                property : 'type',
                filterNull : true
            }

            var propertyFilter = new PropertyFilter(options);

            try {
                propertyFilter.add({type : null});
                done('should have thrown an error');

            } catch (error) {
                done();
            }
        })

        it('denies black list items', function(done) {
            var options = {
                property : 'type',
                blackList : ['Weebles', 'ClientSocket']
            }

            var propertyFilter = new PropertyFilter(options);

            try {
                propertyFilter.add({type : 'ClientSocket'});
                done('should have thrown an error');
            } catch (error) {
                done();
            }
        })

        it('allows white list items', function(done) {
            var options = {
                property : 'type',
                whiteList : ['Feebles', 'HtmlNodes']
            }

            var propertyFilter = new PropertyFilter(options);

            try {
                propertyFilter.add({type : 'HtmlNodes'});
                done();
            } catch (error) {
                done('should not have thrown an error');
            }
        })

        it('denies non white list items', function(done) {
            var options = {
                property : 'type',
                whiteList : ['Feebles', 'HtmlNodes']
            }

            var propertyFilter = new PropertyFilter(options);

            try {
                propertyFilter.add({type : 'HtmlNodeses'});
                done('should have thrown an error');
            } catch (error) {
                done();
            }
        })

    })

})(COMPOSITE.PropertyFilter, chai, sinon)
