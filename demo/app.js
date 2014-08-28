require.config({
  paths: {
    'webc': '../dist/webc',
  }
});

require(['./components/test-one'], function(c) {
  console.log('ready: ' + c);
});
