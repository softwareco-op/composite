/*
 * (C) 2014 SoftwareCo-oP
 */


(function(_) {
    /*
     * Used to clone objects
     */
    function Cloner() {}

    Cloner.prototype.stripNode = function(node) {
        return _.omit(node, 'object');
    }

    Cloner.prototype.cloneNode = function(node) {
        var toClone = this.stripNode(node);
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

    COMPOSITE.Cloner = Cloner;
    return Cloner;

})(_)
