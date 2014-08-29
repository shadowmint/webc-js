/// <reference path="../../../defs/webc/webc.d.ts"/>
import webc = require('webc');
declare var data;

var prototype = webc.component({
  name: 'test-two',
  stylesheet: data.styles,
  template: (r:any) => { return data.markup; },
  update: function() {
    this.shadowRoot.getElementsByTagName('div')[0].className = "test-two updated";
  }
});
