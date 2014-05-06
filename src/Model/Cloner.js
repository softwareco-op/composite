/*
 * (C) 2014 SoftwareCo-oP
 */


(function(COMPOSITE, _) {
    /*
     * Used to clone objects
     */
    function Cloner() {}
    COMPOSITE.Cloner = Cloner;

    Cloner.prototype.stripNode = function(node) {
        return _.omit(node, COMPOSITE.Transient);
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

    return Cloner;

})(COMPOSITE, _)
