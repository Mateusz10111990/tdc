# Angular - Node.js - Oracle Stack

This is a sweet simple todo list application that lets you create, view and delete your todos. 
It has an Angular frontend, secure API w/JWT running on Node.js and connects to rest-enabled Oracle DB (visit cloud.oracle.com to get one ;)


## Requirements

* [Node.js](http://nodejs.org/)

## Installation Steps

After the git clone inside root directory lauch npm prerequisites install:

```
npm install
```

Your Angular frontend code is located inside the `angular-src`.

Do a `npm install @angular/cli@latest` and `npm install` inside the `angular-src` directory so that npm can install all the angular dependencies

Still inside `angular-src` run the Angular-CLI's build (using locally installed angular):

```
npm run-script ng build
```

this should compile the static code into the root `public` directory.

Finally, inside root directory run `npm start` to get this started!

## Custom configuration

If you wish to change connection parameters, check:
- `root_dir/config.js` and set your Oracle DB ORDS endpoint
- `root_dir/angular_src/src/environments/environment.ts` if you wish to have separate node runing api and a separate for angular

