# The Rugby Net extensions to Telescope

## Node Dependencies to run RSM (Nova-TRN):
Needed to run the app:
- humps
- normalizr
- redux-thunk
- react-tag-input
- react-dnd
- react-dnd-html5-backend
- griddle-react
- react-dropzone
- isomorphic-fetch
- griddle-react

**--save**

```bash
npm install --save humps normalizr redux-thunk react-tag-input react-dnd react-dnd-html5-backend griddle-react react-dropzone isomorphic-fetch griddle-react
```

## Meteor packages dependencies

#### Clone the additional packages 📂

```bash

# go in your /packages folder
cd /packages

# clone the additional Nova packages
git clone https://github.com/xavcz/nova-forms-upload.git
git clone https://github.com/xavcz/nova-social-share.git
git clone https://github.com/xavcz/nova-wires.git

# clone the TRN packages
git clone https://github.com/dominictracey/trn-core.git
git clone https://github.com/dominictracey/trn-rest-redux.git
git clone https://github.com/dominictracey/trn-region-country-user.git

# go to next section of the readme to tell Nova to start the app with them :)
```

#### Changes in `.meteor/packages` 📃
You'll need to disable `nova:base-styles` and add `xavcz:nova-social-share`, `xavcz:nova-forms-upload`, `trn-core` & `trn-rest-redux`.
The `.meteor/packages` text file should look like:

```
############ Core Packages ############

nova:core                       # core components and wrappers
nova:forms                      # auto-generated forms
nova:routing                    # routing and server-side rendering
nova:email                      # email
nova:users                      # user management and permissions

############ Features Packages ############

nova:events
nova:posts
nova:comments
nova:newsletter
nova:search
nova:notifications
nova:getting-started
nova:categories
nova:voting
nova:embedly
nova:api
nova:rss
nova:subscribe

############ Debug Packages ############

nova:debug
# nova:kadira

############ Theme Packages ############

nova:base-components    # default ui components
# nova:base-styles      # default styling

nova:email-templates    # default email templates for notifications
nova:i18n-en-us         # default language translation

############ Your Packages ############

accounts-password@1.3.3
# accounts-twitter
# accounts-facebook

# customization-demo
# framework-demo

xavcz:nova-forms-upload
xavcz:nova-social-share
xavcz:nova-wires
trn:rest-redux
trn:core
```

## Get updates from Nova & RSM Packages
Copy / paste the `update_trn.sh` to the **root of the app**.

Run `sh update_trn.sh` & enjoy :smile:
