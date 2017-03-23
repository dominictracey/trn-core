echo "// ------ 🔭 Updating Nova"
echo "// ------ Stashing your changes..."
git add .
git stash 
# devel = Nova Apollo stable branch at the moment
git checkout master
# origin = https://github.com/TelescopeJS/Telescope.git
git pull origin
echo "// ------ 🔭 Nova updated!"
echo "// ------ Applying your changes..."
git stash apply

echo ""

cd ../nova-social-share
echo "// ------ 🔭 Updating package nova-social-share"
echo "// ------ Stashing your changes..."
git stash 
# origin = https://github.com/xavcz/nova-social-share.git
git pull origin
echo "// ------ 🔭 Package nova-social-share updated!"
echo "// ------ Applying your changes..."
git stash apply

echo ""

cd ../nova-forms-upload
echo "// ------ 🔭 Updating package nova-forms-upload"
echo "// ------ Stashing your changes..."
git stash 
# origin = https://github.com/xavcz/nova-forms-upload.git
git pull origin
echo "// ------ 🔭 Updating package nova-forms-upload"
echo "// ------ Applying your changes..."
git stash apply

echo ""

cd ../nova-wires
echo "// ------ 🔭 Updating package nova-wires"
echo "// ------ Stashing your changes..."
git stash 
# origin = https://github.com/xavcz/nova-wires.git
git pull origin
echo "// ------ 🔭 Updating package nova-wires"
echo "// ------ Applying your changes..."
git stash apply

echo ""

cd ../nova-trophies
echo "// ------ 🔭 Updating package nova-trophies"
echo "// ------ Stashing your changes..."
git stash 
# origin = https://github.com/xavcz/nova-trophies.git
git pull origin
echo "// ------ 🔭 Package nova-trophies updated!"
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

echo ""

cd ../trn-rest-redux
echo "// ------ 🏉 Updating package trn-rest-redux"
echo "// ------ Stashing your changes..."
git stash 
# origin = https://github.com/dominictracey/trn-rest-redux.git
git pull origin
echo "// ------ 🏉 Package trn-rest-redux updated!"
echo "// ------ Applying your changes..."
git stash apply

echo ""

cd ../..
git reset # revert the original "git add ."
echo "// ------ 🚀 Ready to dev!"
