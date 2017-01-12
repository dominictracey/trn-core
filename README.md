# The Rugby Net extensions to Telescope

### Node Dependecies to run RSM (Nova-TRN):
Needed to run the app:
- humps 
- normalizr 
- redux-thunk 
- react-tag-input 
- react-dnd 
- react-dnd-html5-backend

**--save**

```
npm install --save humps normalizr redux-thunk react-tag-input react-dnd react-dnd-html5-backend
```

### Changes in .meteor/packages
You'll need to disable `nova:base-styles` and add `trn-core` & `trn-rest-redux`.
The `.meteor/packages` text file should look like:

```
############ Core Packages ############

nova:core                       # core components and wrappers
nova:forms                      # auto-generated forms
nova:apollo                     # data layer
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

trn:rest-redux
trn:core
```

### Get updates from Nova & RSM Packages
Copy / paste the `update_trn.sh` to the **root of the app**.

Run `sh update_trn.sh` & enjoy :smile:
