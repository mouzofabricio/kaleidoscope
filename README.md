Kaleidoscope experiment using Pixi.js
========================

![Kaleidoscope Pixi.js](http://i.imgur.com/fQmcpuH.jpg "Example Result")


gulp & babel boilerplate
========================

Simple gulp boilerplate for front-end development.


## Features
* Live-reload
* Compile Scss files
* Autoprefix styles
* Compile Jade files
* Compile Coffee scripts files
* Support require of [bower](http://bower.io/) and [npm](https://www.npmjs.com/) modules
* JS and CSS compression


## Instal
```
$ git clone https://github.com/tsuyoshiwada/gulp-babel-boilerplate.git
$ cd gulp-babel-boilerplate
$ npm install && bower install
```


## Usage

### Start development
```
$ gulp
# or
$ gulp watch
```

### Create a build files
```
$ gulp build
# or
$ gulp build --env production
```

If you pass an environment variable to generate a file for production.

