/// <amd-dependency path="./test-two"/>
/// <reference path="../../../defs/webc/webc.d.ts"/>
import webc = require('webc');
declare var data;

webc.component({
  name: 'test-one',
  stylesheet: data.styles,
  template: (r:any) => {
    console.log(r);
    return data.markup;
  },
  init: (r:any) => {}
});
