declare module WEBC {

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
    }

    /** Register a new component type */
    export function component(config:any):void;
}

declare module "webc" {
    export = WEBC;
}
