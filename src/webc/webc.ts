import async = require('./async');

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
        init:{(root:any):any};
    };

    /** Queue a template definition */
    export function component(value:any):any {
        var api:any = {};
        var c:Component = {
            name: null,
            stylesheet: null,
            template: (root:any) => { return "" },
            init: (root:any):any => { return { root: root }; }
        };
        for (var key in value) {
            if ((key == 'name') || (key == 'stylesheet') || (key == 'template') || (key == 'init')) {
              c[key] = value[key];
            }
            else {
              api[key] = value[key];
            }
        }
        return dispatch(c, api);
    }

    /** Dispatch a component load */
    function dispatch(c:Component, api:any):void {
        var prototype = Object.create(HTMLElement.prototype);
        prototype.createdCallback = function() {

            // Template for entire component
            var rendered = c.template(this);
            var tmpl = document.createElement('template');
            tmpl.innerHTML = '';
            if (c.stylesheet) {
              tmpl.innerHTML = tmpl.innerHTML + '<style>' + c.stylesheet + '</style>';
            }
            if (rendered) {
              tmpl.innerHTML = tmpl.innerHTML + rendered;
            }

            // Create instance
            var root = this.createShadowRoot();
            var clone = document.importNode(tmpl['content'], true);
            root.appendChild(clone);

            // Invoke the init call async
            async.async(() => {
              c.init(this);
              this.innerHTML = "";
            });
        };

        // Populate the type API before registering
        for (var key in api) {
          prototype[key] = api[key];
        }

        // Register
        document['registerElement'](c.name, { prototype: prototype });
    }
}

// Support AMD and whatever
declare var define:any;
try { define('webc', function () { return webc; }); } catch (e) {
    try { window['webc'] = webc; } catch(e) {}
}
