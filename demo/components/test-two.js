(function(data) {
  define(["require", "exports", 'webc'], function(require, exports, webc) {
    var prototype = webc.component({
      name: 'test-two',
      stylesheet: data.styles,
      template: function(r) {
        return data.markup;
      },
      update: function() {
        this.shadowRoot.getElementsByTagName('div')[0].className = "test-two updated";
      }
    });
  });
  //# sourceMappingURL=script.js.map

})({
  styles: ".test-two.updated {\n  border: 3px solid #f00; }\n.test-two input {\n  width: 200px;\n  height: 50px; }\n\n/*# sourceMappingURL=styles.css.map */\n",
  markup: "<div class=\"test-two\"><input type=\"button\"/><input type=\"button\"/><input type=\"button\"/><input type=\"button\"/></div>",
  resources: {}
});