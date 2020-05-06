echo "Getting last repository update";

source 'env_variables'

cd $HOME
git pull

echo "Building composer packages"

cd $HOME
COMPOSER_MEMORY_LIMIT=-1 composer install

echo "Importing config and updating database"

cd $HOME/docroot
../vendor/bin/drush cr
../vendor/bin/drush cim -y
../vendor/bin/drush updb -y

echo "Building theme"

cd $HOME/docroot/themes/custom/twelve_carnation
npm install
npm run build

echo "Building apps"

cd $HOME/docroot/modules/custom/twelve_app/bursts
npm install
npm run build

cd $HOME/docroot/modules/custom/twelve_app/puzzle
npm install
npm run build