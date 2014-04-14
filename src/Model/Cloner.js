/*
 * (C) 2014 SoftwareCo-oP
 */

define(
['lodash'],
function(_) {

    /*
     * Used to clone objects
     */
    function Cloner() {}

    Cloner.prototype.cloneNode = function(node) {
        var toClone = _.omit(node, 'object');
        return this.clone(toClone);
    }

    Cloner.prototype.clone = function(object) {
        return this.jsonClone(object);
    }

    Cloner.prototype.jsonClone = function(object) {
        return JSON.parse(JSON.stringify(object));
    }

    Cloner.prototype.deepClone = function(object) {
        return _.cloneDeep(object);
    }

    return Cloner;

})
