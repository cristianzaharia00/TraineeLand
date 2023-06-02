### How to start the server:

# For Development

    1. First you need to npm install in this folder and in /client
    2. "npm install" on main and client folder
    2. "npm run dev" on main folder

# For Production

    1. Go to the console on DigitalOcean
    2. "ls enna-baby-shoes"
    3. "git pull"
    4. Username : Cristi112277
       Password : 
    5. Go to the git folder
    6. "npm install"
    7. "cd client"
    8a. "npm install"
    8b. "npm install --force" (If on ubuntu home server  (node v19))
    9a. "npm run build" (In client to create static files)
    9b. "npm run build-linux" (In client to create static files, for the ubuntu home server (node v19))
    9c.  If there is an error regarding a package install it (for react-responsive-gallery the command is npm i react-responsive-gallery@2.0.1  )
    10. "pm2 stop all"
    11. "NODE_ENV=production pm2 restart server --update-env"

### Create a local backup

mongodump mongodb+srv://cluster0.wo0cz.mongodb.net/enna-baby-shoes -u Cristi11227 -p PASSWORD --verbose

### Restore Backup

mongorestore ./dump/enna-baby-shoes mongodb+srv://cluster0.wo0cz.mongodb.net/enna-baby-shoes-dev -u Cristi11227 -p PASSWORD --verbose
