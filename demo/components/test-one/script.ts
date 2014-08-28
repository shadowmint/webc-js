/// <reference path="../../../defs/jquery/jquery.d.ts"/>
/// <reference path="../../../defs/handlebars/handlebars.d.ts"/>
/// <reference path="../../../defs/iwc/iwc.d.ts"/>
import iwc = require('iwc');
import jquery = require('jquery');
import handlebars = require('handlebars');
import game = require('../../state/state');
declare var data:iwc.Data;

/**
 * Common game nav
 */
export class UiToolbar extends iwc.Base {

  public $:JQueryStatic;
  private _t:any;

  constructor() {
    super('zone-ui-guard', data);
    var c = handlebars['default'] ? handlebars['default'] : handlebars;
    this._t = c.compile(data.markup);
    this.$ = jquery;
  }

  public targets(root:any):HTMLElement[] {
    return <HTMLElement[]> (<any> this.$(root).find('.ui-guard'));
  }

  public template(data:any):any {
    return this._t(data);
  }

  public instance(ref:iwc.Ref):void {
    if (!game.state()) {
      this.$(ref.root).show();
    }
  }
}

// Actually register
iwc.component(new UiToolbar().def());
