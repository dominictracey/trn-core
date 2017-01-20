Package.describe({
  name: "trn:core",
  version: "0.1.0",
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
    'lib/server/emails/customNewPost.handlebars',
    'lib/server/emails/customEmail.handlebars'
  ], ['server']);

});
