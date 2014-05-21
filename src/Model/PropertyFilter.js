/*
 * (C) 2014 SoftwareCo-oP
 */

(function(COMPOSITE) {

    /*
     * Only allows certain property values to pass.
     *
     * @param {string} option.property to filter on
     * @param {boolean} options.filterUndefined filter undefined value
     * @param {boolean} options.filterNull filter null value
     * @param {Array} options.whiteList contains valid values that aren't filtered
     * @param {Array} options.blackList contains invalid values that are filtered
     */
    function PropertyFilter(options) {
        this.options = options;
    }
    COMPOSITE.PropertyFilter = PropertyFilter;

    PropertyFilter.prototype.add = function(object) {
        var property = this.options.property;
        var filterUndefined = this.options.filterUndefined;
        var filterNull = this.options.filterNull;
        var whiteList = this.options.whiteList;
        var blackList = this.options.blackList;

        if (object[property] === undefined && filterUndefined) {
            throw new Error('object.' + property + ' is undefined.');
        } else if (object[property] === undefined) {
            return object;
        }

        if (object[property] === null && filterNull) {
            throw new Error('object.' + property + ' is null.');
        } else if (object[property] === null) {
            return object;
        }

        if (blackList !== undefined && blackList.indexOf(object[property]) >= 0) {
            throw new Error('object.' + property + ' is ' + object[property] + ' is on the blacklist so filtering.');
        }

        if (whiteList !== undefined && whiteList.indexOf(object[property]) >= 0) {
            return object;
        }

        throw new Error('object.' + property + ' is ' + object[property] + ' is not on the white list so filtering.');
    }

    return PropertyFilter;

})(COMPOSITE)
