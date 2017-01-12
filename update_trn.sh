echo "// ------ 🔭 Updating Nova"
echo "// ------ Stashing your changes..."
git add .
git stash 
# devel = Nova Apollo stable branch at the moment
git checkout devel
# origin = https://github.com/TelescopeJS/Telescope.git
git pull origin
echo "// ------ 🔭 Nova updated!"
echo "// ------ Applying your changes..."
git stash apply
cd packages/trn-core
echo "// ------ 🏉 Updating package trn-core"
echo "// ------ Stashing your changes..."
git stash 
# origin = https://github.com/dominictracey/trn-core.git
git pull origin
echo "// ------ 🏉 Package trn-core updated!"
echo "// ------ Applying your changes..."
git stash apply
cd ../trn-rest-redux
echo "// ------ 🏉 Updating package trn-rest-redux"
echo "// ------ Stashing your changes..."
git stash 
# origin = https://github.com/dominictracey/trn-rest-redux.git
git pull origin
echo "// ------ 🏉 Package trn-rest-redux updated!"
echo "// ------ Applying your changes..."
git stash apply
cd ../..
echo "// ------ 🚀 Ready to dev!"
