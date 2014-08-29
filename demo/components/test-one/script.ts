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
  init: (r:any) => {
      console.log('instance');
      console.log(r);
    var foo = r.shadowRoot.getElementById('bar');
    foo.onclick = () => {
      var matches = r.twos();
      for (var i in matches) {
        console.log(matches[i]);
        matches[i].update();
      }
    }
  },
  hello: function() {
    console.log("Hello!");
    console.log(this.shadowRoot.innerHTML);
  },
  twos: function() {
    return this.shadowRoot.getElementsByTagName('test-two');
  }
});
