# Website in React with RestAPI in Backend Using Node.js & Express

## Author 
This project is authored by [Masudul Hasan Shawon](https://github.com/shawon3719)

## Installation

### Clone repo

``` bash
# clone the repo
$ git clone https://github.com/shawon3719/website_with_React_-_RestAPI_backend_node.js_express_swagger.git

# go into app's directory
$ cd my-project

# install app's dependencies
$ npm install
```

### Copy and Paste

Copy all your files to your project folder and then,

``` bash
# go into app's directory
$ cd my-project

# install app's dependencies
$ npm install
```

## Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

see also:
[CRA docs](https://create-react-app.dev/docs/getting-started)

### Basic usage

``` bash
# dev server with hot reload at http://localhost:3003
$ npm start
```

Navigate to [http://localhost:3003](http://localhost:3003). The app will automatically reload if you change any of the source files.

### Start Server
``` bash
# dev server with hot reload at http://localhost:3004/api-docs
$ npm run server
```

Navigate to [http://localhost:3004/api-docs](http://localhost:3004/api-docs). Here you will find swagger ui to get details about API. The app will automatically restrat with Nodemon if you change any of the source files.


### Build

Run `build` to build the project. The build artifacts will be stored in the `build/` directory.

```bash
# build for production with minification
$ npm run build
```

### Deploy To Docker

Run `docker build -t my-react-app .` to build the docker image of the project.  Run `docker ps -a` to view all the available image. Run `docker run -p 3007:3007 my-react-app` to run the image.

```bash
# You can also run this docker image from any docker enabled PC.
$ docker run -p 3007:3007 shawon3719/kyanc-react-website 
```

Docker images can be hosted and shared in special image registries. The most popular is Docker Hub, a GitHub among Docker registries, in which you can host private and public images. Let's push an image to Docker Hub now:

Sign up at `hub.docker.com`
Build the image again using your Docker Hub credentials:
```bash
 $ docker build -t [USERNAME]/hello-world .
#Log in to Docker Hub with your credentials:
 $ docker login
```
Push the image to Docker Hub:
```bash
 $ docker push [USERNAME]/hello-world
```
To delete a running image:
```bash
$ docker rmi imagename:tag
#Example: $ docker rmi kyanc-rect-website:latest
```
## What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
Shawon-React#v3.0.0
├── public/          #static files
│   └── index.html   #html template
│
├── api/                    #static files
│   ├── userAPI             #user API Setup
│   └── SliderAPI           #slider API Setup
│   └── academicCalendar    #academicCalendar API Setup
│   └── employeeCategory    #employeeCategory API Setup
│   └── employee            #employee API Setup
│   └── gallery             #gallery API Setup
│   └── notice              #notice API Setup
│   └── program             #program API Setup
│   └── sytemSetting        #sytemSetting API Setup
│   └── user                #user API Setup
├── auth/            #token validation
├── src/             #project root
│   ├── assets/      #assets - js icons object
│   ├── containers/  #container source - template layout
|   │   ├── _nav.js  #sidebar config
|   │   └── ...      
│   ├── scss/        #user scss/css source
│   ├── views/       #views source
│   ├── App.js
│   ├── App.test.js
│   ├── polyfill.js
│   ├── index.js
│   ├── routes.js    #routes config
│   └── store.js     #template state example 
├── validation/      #user request body validation
│
├── server.js/       #server config
├── package.json     #all-package config
└── Dockerfile       #docker config
```
## Creator

**Masudul Hasan Shawon**
* <https://github.com/shawon3719>

## Copyright and License

copyright 2020 Masudul Hasan Shawon.   