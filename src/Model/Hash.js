/*
 * (C) 2014 SoftwareCo-oP
 */


define(['jssha'],
function(jsSHA) {

    function Hasher() {
        var shaObj = new jsSHA("This is a Test", "TEXT");
        var hash = shaObj.getHash("SHA-256", "HEX");
    }

    Hasher.prototype.hash = function(string) {
        var shaObj = new jsSHA(string, "TEXT");
        var hash = shaObj.getHash("SHA-256", "HEX");
        return hash;
    }

    return Hasher;
})
