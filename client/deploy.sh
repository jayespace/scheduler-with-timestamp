echo "Swtiching to branch master"
git checkout client

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -i ~/.ssh/my-ssh-key -r build/* jaye@34.168.137.190:/var/www/34.168.137.190/

echo "Done!"