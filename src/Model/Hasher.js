/*
 * (C) 2014 SoftwareCo-oP
 */


define(['jssha'],
function(jsSHA) {

    /*
     * Hasher hashes strings and Backbone models.
     * @param {string} hashAlgorithm to use.  See https://github.com/Caligatio/jsSHA for options.
     */
    function Hasher(hashAlgorithm) {
        this.hashAlgorithm = hashAlgorithm;
    }

    /*
     * Hashes a string using our predefined hashAlgorithm.
     * @param {string} string to hash
     * @return {string} hash value
     */
    Hasher.prototype.hash = function(string) {
        var shaObj = new jsSHA(string, "TEXT");
        var hash = shaObj.getHash(this.hashAlgorithm, "HEX");
        return hash;
    }

    /*
     * Hashes a Backbone model using JSON serialization.
     *
     * @param {Backbone.Model} model to hash.
     * @return {string} hash value of JSONified model.
     */
    Hasher.prototype.hashModel = function(model) {
        var string = JSON.stringify(model);
        return this.hash(string);
    }

    return Hasher;

})
