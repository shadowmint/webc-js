/// <reference path="../../../defs/webc/webc.d.ts"/>
import webc = require('webc');
declare var data;

webc.component({
  name: 'test-two',
  stylesheet: data.styles,
  template: (r:any) => { return data.markup; },
  init: (r:any) => {}
});
