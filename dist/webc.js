(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function async(value) {
    setTimeout(value, 1);
}
exports.async = async;
//# sourceMappingURL=async.js.map

},{}],2:[function(require,module,exports){
//# sourceMappingURL=platform.js.map

},{}],3:[function(require,module,exports){
var async = require('./async');

(function (webc) {
    
    ;

    /** Queue a template definition */
    function component(value) {
        var c = {
            name: null,
            stylesheet: null,
            template: function (root) {
                return "";
            },
            init: function (root) {
                return { root: root };
            }
        };
        for (var key in value) {
            c[key] = value[key];
        }
        dispatch(c);
    }
    webc.component = component;

    /** Dispatch a component load */
    function dispatch(c) {
        var prototype = Object.create(HTMLElement.prototype);
        prototype.createdCallback = function () {
            // Template for entire component
            var tmpl = document.createElement('template');
            tmpl.innerHTML = '';
            if (c.stylesheet) {
                tmpl.innerHTML = tmpl.innerHTML + '<style>' + c.stylesheet + '</style>';
            }
            tmpl.innerHTML = tmpl.innerHTML + c.template(this);

            // Create instance
            var root = this.createShadowRoot();
            var clone = document.importNode(tmpl['content'], true);
            root.appendChild(clone);

            // Invoke the init call async
            async.async(function () {
                c.init(root);
            });
        };
        document['registerElement'](c.name, { prototype: prototype });
    }
})(exports.webc || (exports.webc = {}));
var webc = exports.webc;

try  {
    define('webc', function () {
        return webc;
    });
} catch (e) {
    try  {
        window['webc'] = webc;
    } catch (e) {
    }
}
//# sourceMappingURL=webc.js.map

},{"./async":1}],4:[function(require,module,exports){
function test_register(t) {
    t.ok(true);
    t.done();
}
exports.test_register = test_register;
//# sourceMappingURL=webc_tests.js.map

},{}]},{},[1,2,3,4]);