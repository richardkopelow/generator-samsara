# <%= config.get('projectName') %>
<%= config.get('description') %>

##Getting started
After cloning this repo you will need to install the dependencies, run
```
npm install && bower install
```

##Usage
To run the project for development, run
```
grunt serve
```
the page will automatically reload if there are any changes to code.

To package the project for distribution, run
```
grunt
```
everything will be outputted into the 'dist' directory, ready for deployment to a web server.
