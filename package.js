Package.describe({
  name: "trn:core",
  version: "1.0.0",
});

Package.onUse( function(api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'fourseven:scss',

    'nova:core',
    'nova:posts',
    'nova:users',
    'xavcz:nova-forms-upload',
    'xavcz:nova-social-share',
    'xavcz:nova-wires',
    'nova:base-components',
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
