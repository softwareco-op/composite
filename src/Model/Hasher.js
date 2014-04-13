/*
 * (C) 2014 SoftwareCo-oP
 */


define(['jssha'],
function(jsSHA) {

    /*
     * Hasher hashes strings and nodes.
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
     * Hashes a node using JSON serialization.
     *
     * @param {Node} node to hash.
     * @return {string} hash value of JSONified node.
     */
    Hasher.prototype.hashNode = function(node) {
        var string = JSON.stringify(node);
        return this.hash(string);
    }

    return Hasher;

})
