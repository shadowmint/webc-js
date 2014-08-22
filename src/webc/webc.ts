import platform = require('./platform');
import async = require('./async');
((a) => {})(platform);

export module webc {

    /** Interface to define for a module */
    export interface Component {

        /** The component tag name to bind */
        name:string;

        /** The stylesheet for this component */
        stylesheet:string;

        /** Invoke this for each template instance */
        template:{(root:any):string};

        /** Invoke this on new component instances after they are created */
        factory:{(root:any):any};
    };

    /** Modules waiting to load */
    var waiting = [];

    /** Ready yet? */
    var ready:boolean = false;

    /** Queue a template definition */
    export function component(value:any) {
        var c:Component = {
            name: null,
            stylesheet: null,
            template: (root:any) => { return "" },
            factory: (root:any):any => { return { root: root }; }
        };
        for (var key in value) {
            c[key] = value[key];
        }
        if (ready) {
            dispatch(c);
        }
        else {
            waiting.push(c);
        }
    }

    /** Process stylesheet

    /** Dispatch a component load */
    function dispatch(c:Component) {

        var prototype = Object.create(HTMLElement.prototype);
        prototype.createdCallback = function() {

            // Template for entire component
            var tmpl = document.createElement('template');
            tmpl.innerHTML = '';
            if (c.stylesheet) { tmpl.innerHTML = tmpl.innerHTML + '<style>' + c.stylesheet + '</style>'; }
            tmpl.innerHTML = tmpl.innerHTML + c.template(this);

            // Create instance
            var root = this.createShadowRoot();
            var clone = document.importNode(tmpl['content'], true);
            root.appendChild(clone);

            // Invoke the init call async
            async.async(() => { c.factory(root); });
        };
        document['registerElement'](c.name, { prototype: prototype });
    }

    // Watch for platform ready
    window.addEventListener('WebComponentsReady', () => {
        ready = true;
        for (var i = 0; i < waiting.length; ++i) {
            dispatch(waiting[i]);
        }
    });
}

// Support AMD and whatever
declare var define:any;
try { define('webc', function () { return webc; }); } catch (e) {
    try { window['webc'] = webc; } catch(e) {}
}