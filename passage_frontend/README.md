Recommended : 
use Chrome Vue debugger extension to see component tree and props.

Node version
v7.7.2

Npm version
4.1.2

You can use nvm to manage node versions :)
nvm install stable

then run nvm use stable in your shell to activate node at the last version

Once this is done,

$ cd passage_frontend

// install global dependencies
npm run install ( see the script in package.json)

// install dev dependencies
npm install

// run all that shit
npm run start ( see the script in package.json)

The main vue script is in es6/vue.js
the master (controller) script is in master.js

the root script linking both is in index.js

Do not edit the scripts in dist/js, edit only the scripts in /es6 !


