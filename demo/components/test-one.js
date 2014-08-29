(function(data) {
  define(["require", "exports", 'webc', "./test-two"], function(require, exports, webc) {
    webc.component({
      name: 'test-one',
      stylesheet: data.styles,
      template: function(r) {
        console.log(r);
        return data.markup;
      },
      init: function(r) {
        console.log('instance');
        console.log(r);
        var foo = r.shadowRoot.getElementById('bar');
        foo.onclick = function() {
          var matches = r.twos();
          for (var i in matches) {
            console.log(matches[i]);
            matches[i].update();
          }
        };
      },
      hello: function() {
        console.log("Hello!");
        console.log(this.shadowRoot.innerHTML);
      },
      twos: function() {
        return this.shadowRoot.getElementsByTagName('test-two');
      }
    });
  });
  //# sourceMappingURL=script.js.map

})({
  styles: ".test-one h1 {\n  color: #f00; }\n\n/*# sourceMappingURL=styles.css.map */\n",
  markup: "<div class=\"test-one\"><h1>test-one</h1><button id=\"bar\">change</button><test-two></test-two></div>",
  resources: {}
});