echo "Swtiching to branch master"
git checkout prod-test

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -i ~/.ssh/ssh-key -r build/* jaye@35.230.6.124:/var/www/35.230.6.124/

echo "Done!"