Package.describe({
  name: "trn:core",
  version: "1.3.0",
});

Package.onUse( function(api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'fourseven:scss',

    'vulcan:core',
    'vulcan:posts',
    'vulcan:users',
    'xavcz:vulcan-social-share',
    'xavcz:vulcan-wires',
    'xavcz:vulcan-trophies',
    'vulcan:base-components',
    'trn:rest-redux',
  ]);

  api.mainModule('client.js', ['client']);
  api.mainModule('server.js', ['server']);

  api.addFiles([
    'lib/stylesheets/bootstrap.css',
    'lib/stylesheets/main.scss',
    'lib/stylesheets/therugbynet.css',
  ], ['client']);

  api.addAssets([
    'lib/server/emails/newFeedback.handlebars',
  ], ['server']);

});
