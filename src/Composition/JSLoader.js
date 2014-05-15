
/*
 * A global function that loads javascript into a DOM
 */
function _addJS(module, location) {
    var th = document.getElementsByTagName(location)[0];
    var s = document.createElement('script');
    s.setAttribute('type','text/javascript');
    s.setAttribute('src',module);
    th.appendChild(s);
}
