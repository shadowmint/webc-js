(function(data) {
  define(["require", "exports", 'webc'], function(require, exports, webc) {
    webc.component({
      name: 'test-two',
      stylesheet: data.styles,
      template: function(r) {
        return data.markup;
      },
      init: function(r) {}
    });
  });
  //# sourceMappingURL=script.js.map

})({
  styles: ".test-two input {\n  width: 200px;\n  height: 50px; }\n\n/*# sourceMappingURL=styles.css.map */\n",
  markup: "<div class=\"test-two\"><input type=\"button\"/><input type=\"button\"/><input type=\"button\"/><input type=\"button\"/></div>",
  resources: {}
});