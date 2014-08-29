(function(data) {
  define(["require", "exports", 'webc', "./test-two"], function(require, exports, webc) {
    webc.component({
      name: 'test-one',
      stylesheet: data.styles,
      template: function(r) {
        console.log(r);
        return data.markup;
      },
      init: function(r) {}
    });
  });
  //# sourceMappingURL=script.js.map

})({
  styles: ".test-one h1 {\n  color: #f00; }\n\n/*# sourceMappingURL=styles.css.map */\n",
  markup: "<div class=\"test-one\"><h1>test-one</h1><test-two></test-two></div>",
  resources: {}
});